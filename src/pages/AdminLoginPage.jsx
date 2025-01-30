import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

const AdminLoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (
            localStorage.getItem("token") &&
            localStorage.getItem("role") == "admin"
        ) {
            navigate("/admin/experts");
        }
    });

    const mutation = useMutation({
        mutationFn: loginAdmin,
        onSuccess: (response) => {
            if (response.data.token) {
                // localStorage.setItem("token", response.data.token);
                // localStorage.setItem("role", "admin");
                login(response.data.token, "admin");
                navigate("/admin/experts");
            }
        },
        onError: (error) => {
            console.log(error);
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: true,
                theme: "light",
            });
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate({ email, password });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                    Admin Login
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 mt-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 mt-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2  hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AdminLoginPage;
