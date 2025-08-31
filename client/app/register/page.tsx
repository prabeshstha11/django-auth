"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        dob: "",
        password: "",
        password2: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.password2) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const { data } = await axios.post("http://127.0.0.1:8000/api/register/", {
                username: formData.username,
                email: formData.email,
                dob: formData.dob,
                password: formData.password,
                password2: formData.password2,
            });

            console.log("Registration successful:", data);
            alert("Registration successful! You can now login.");
            router.push("/login"); // Next.js client-side redirect
        } catch (err) {
            if (err.response) {
                // Django returns validation errors in JSON
                alert(err.response.data.detail || JSON.stringify(err.response.data));
            } else {
                alert("Something went wrong. Try again.");
            }
            console.error(err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="input input-bordered w-full mb-4" required />

                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input input-bordered w-full mb-4" required />

                <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} className="input input-bordered w-full mb-4" required />

                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input input-bordered w-full mb-4" required />

                <input type="password" name="password2" placeholder="Confirm Password" value={formData.password2} onChange={handleChange} className="input input-bordered w-full mb-6" required />

                <button type="submit" className="btn btn-primary w-full">
                    Register
                </button>

                <span className="block mt-6 text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-semibold">
                        Login
                    </Link>
                </span>
            </form>
        </div>
    );
};

export default Page;
