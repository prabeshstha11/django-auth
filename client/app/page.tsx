import Image from "next/image";

export default function Home() {
    return (
        <div className="p-3 flex gap-3">
            <button className="btn">
                <a href="/register">Register</a>
            </button>

            <button className="btn">
                <a href="/login">Login</a>
            </button>

            <button className="btn">
                <a href="/profile">Profile</a>
            </button>
        </div>
    );
}
