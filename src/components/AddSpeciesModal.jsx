import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import {  addSpeciesAdmin,addSpecies } from "../api";
import { useToast } from "@/context/ToastContext";
import { Button } from "./ui/button";

const AddSpeciesModal = ({ isOpen, toggle,type }) => {

    const {toast} = useToast();

    const mutationfn = type === "admin" ? addSpeciesAdmin : addSpecies;

    const mutation = useMutation({
        mutationFn: mutationfn,
        onSuccess: () => {
            toast.success("Species added successfully!", { autoClose: 3000 });
            setFormData({
                common_name: "",
                scientific_name: "",
                taxonomy_class: "",
                conservation_status: "",
                imageFile: null,
            });
            toggle();
        },
        onError: (error) => {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Error adding species"
            );
        },
    });

    const [formData, setFormData] = useState({
        common_name: "",
        scientific_name: "",
        taxonomy_class: "",
        conservation_status: "", 
        imageFile: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value, 
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            imageFile: e.target.files[0],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.imageFile) {
            toast.error("Please upload an image.");
            return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append("common_name", formData.common_name);
        formDataToSend.append("scientific_name", formData.scientific_name);
        formDataToSend.append("taxonomy_class", formData.taxonomy_class);
        formDataToSend.append(
            "conservation_status",
            formData.conservation_status
        );
        formDataToSend.append("image", formData.imageFile);
        console.log(formDataToSend);
        mutation.mutate(formDataToSend);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add New Species</h2>
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
                            Common Name
                        </label>
                        <input
                            type="text"
                            name="common_name"
                            value={formData.common_name}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Scientific Name
                        </label>
                        <input
                            type="text"
                            name="scientific_name"
                            value={formData.scientific_name}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Taxonomic Class
                        </label>
                        <input
                            type="text"
                            name="taxonomy_class"
                            value={formData.taxonomy_class}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Conservation Status Dropdown */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Conservation Status
                        </label>
                        <select
                            name="conservation_status" 
                            value={formData.conservation_status}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                            required
                        >
                            <option value="">Select Conservation Status</option>
                            <option value="Least Concern">Least Concern</option>
                            <option value="Near Threatened">
                                Near Threatened
                            </option>
                            <option value="Vulnerable">Vulnerable</option>
                            <option value="Endangered">Endangered</option>
                            <option value="Extinct">Extinct</option>
                        </select>
                    </div>

                    {/* File Upload */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className=" px-4 py-2"
                            disabled={mutation.isLoading}
                        >
                            {mutation.isLoading ? "Adding..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSpeciesModal;
