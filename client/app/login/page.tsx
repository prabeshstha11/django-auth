"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://127.0.0.1:8000/api/login/", {
                username: formData.username,
                password: formData.password,
            });

            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);

            console.log("Login successful:", data);
            alert("Login successful!");

            router.push("/profile");
        } catch (err) {
            if (err.response) {
                alert(err.response.data.detail || "Invalid credentials");
            } else {
                alert("Something went wrong. Try again.");
            }
            console.error(err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="input input-bordered w-full mb-4" required />

                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input input-bordered w-full mb-6" required />

                <button type="submit" className="btn btn-primary w-full">
                    Login
                </button>

                <span className="block mt-6 text-center">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-primary font-semibold">
                        Register
                    </Link>
                </span>
            </form>
        </div>
    );
};

export default Page;
