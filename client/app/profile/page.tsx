"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProfilePage = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            setError("Please login first!");
            setLoading(false);
            return;
        }

        axios
            .get("http://127.0.0.1:8000/api/me/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Please login first!");
                setLoading(false);
                console.error(err);
            });
    }, []);

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
            router.push("/login");
            return;
        }

        try {
            await axios.post(
                "http://127.0.0.1:8000/api/logout/",
                { refresh: refreshToken },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");

            router.push("/login");
        } catch (err) {
            console.error("Logout failed:", err);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            router.push("/login");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
                <p className="text-red-600 text-xl mb-4">{error}</p>
                <button onClick={() => router.push("/login")} className="btn btn-primary">
                    Go to Login
                </button>
            </div>
        );
    }

    const dob = new Date(user.dob);
    const age = new Date().getFullYear() - dob.getFullYear();

    return (
        <div className="flex flex-col justify-center items-center min-h-screen ">
            <div className="p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Hello {user.username}!</h2>
                <p className="mb-6">You are {age} years old.</p>
                <button onClick={handleLogout} className="btn btn-primary w-full">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
