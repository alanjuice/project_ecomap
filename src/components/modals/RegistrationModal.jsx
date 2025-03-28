import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { registerExpert, registerUser } from "../../api";
import { useToast } from "@/context/ToastContext";
import { Button } from ".././ui/button";

const RegistrationModal = ({ isOpen, toggle, userType }) => {
    const {toast} = useToast();
    const mutation = useMutation({
        mutationFn: userType == "Expert" ? registerExpert : registerUser,
        onSuccess: (resp) => {
            console.log(resp);
            toast.success(userType + " created", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: true,
                theme: "light",
            });
            setFormData({
                name: "",
                email: "",
                password: "",
            });
            toggle();
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

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        Register {userType}
                    </h2>
                    <button
                        onClick={toggle}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✖
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className= " px-4 py-2 "
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationModal;
