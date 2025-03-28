import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";

import { loginAdmin } from "../../api";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/context/ToastContext";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const {toast} = useToast();

    useEffect(() => {
        if (localStorage.getItem("token") && localStorage.getItem("role") === "admin") {
            navigate("/admin/experts");
        }
    }, [navigate]);

    const mutation = useMutation({
        mutationFn: loginAdmin,
        onSuccess: (response) => {
            if (response.data.token) {
                login(response.data.token, "admin");
                toast.success("Login Successful", { autoClose: 3000 });
                navigate("/admin/experts");
            }
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Login failed!", {
                position: "top-right",
                autoClose: 3000,
            });
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate({ email, password });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-md">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Admin Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600">Email</label>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Password</label>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            {mutation.isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLogin;
