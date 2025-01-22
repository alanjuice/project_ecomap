import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Map, Marker } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { addSpecies, getSpottingById, identifySpecies } from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import LoadingIcon from "../components/LoadingIcon";

const SpottingDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: spottingData, isLoading } = useQuery({
        queryKey: ["getspottingbyid", id],
        queryFn: () => getSpottingById(id),
    });

    const mutation = useMutation({
        mutationFn: (formData) => addSpecies(formData),
        onSuccess: () => {
            toast.success("Species added successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
            setShowForm(false);
            resetForm();
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.message || "Failed to add species!",
                {
                    position: "top-right",
                    autoClose: 3000,
                }
            );
        },
    });

    const identificationMutation = useMutation({
        mutationFn: (formData) => identifySpecies(formData),
        onSuccess: () => {
            toast.success("Species Identified", {
                position: "top-right",
                autoClose: 3000,
            });
            navigate("expert/spotting");
        },
        onError: (error) => {
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 3000,
            });
        },
    });

    const [selectedSpecies, setSelectedSpecies] = useState("");
    const [showForm, setShowForm] = useState(false);

    const [newSpecies, setNewSpecies] = useState({
        common_name: "",
        scientific_name: "",
        class: "",
        conservationStatus: "",
        imageUrl: null,
    });

    const speciesOptions = [
        "Tiger",
        "Lion",
        "Elephant",
        "Leopard",
        "Deer",
        "Zebra",
        "Giraffe",
    ];

    const handleIdentify = (e) => {
        if (!selectedSpecies) {
            toast.error("Please select a species!", { autoClose: 3000 });
            return;
        }
        e.preventDefault();
        identificationMutation.mutate({
            spotId: id,
            userId: spottingData.data.user._id,
            speciesId: selectedSpecies,
        });
    };

    const handleAddSpecies = (e) => {
        e.preventDefault();
        mutation.mutate(newSpecies);
    };

    const resetForm = () => {
        setNewSpecies({
            common_name: "",
            scientific_name: "",
            class: "",
            conservationStatus: "",
            imageUrl: null,
        });
    };

    if (isLoading) {
        return <LoadingIcon />;
    }

    return (
        <div className="bg-gray-50 p-4 w-screen">
            <h1 className="text-2xl font-bold mb-4">Spotting Details</h1>

            {/* Image Section */}
            <div className="flex justify-center mb-6">
                <img
                    src={spottingData.data.image || "https://placehold.co/400"}
                    alt="Spotted Animal"
                    className="w-full max-w-md rounded-lg shadow-md"
                />
            </div>

            {/* Table Section */}
            <table className="table-auto w-full md:w-3/4 border border-gray-300 text-left mb-8">
                <tbody>
                    <tr className="border-b">
                        <th className="p-2">Spotting ID</th>
                        <td className="p-2">
                            {spottingData.data._id || "N/A"}
                        </td>
                    </tr>
                    <tr className="border-b">
                        <th className="p-2">Spotted By</th>
                        <td className="p-2">
                            {spottingData.data.user.name || "Unknown"}
                        </td>
                    </tr>
                    <tr className="border-b">
                        <th className="p-2">Spotted At</th>
                        <td className="p-2">
                            {spottingData.data.date || "N/A"}
                        </td>
                    </tr>
                    <tr className="border-b">
                        <th className="p-2">Description</th>
                        <td className="p-2">
                            {spottingData.data.description ||
                                "No description available."}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Identification Section */}
            <div className="mb-8 mt-4">
                <h2 className="text-xl font-semibold mb-4">
                    Identify the Species
                </h2>
                <div className="flex items-center space-x-4">
                    <select
                        className="p-2 border border-gray-300 rounded"
                        value={selectedSpecies}
                        onChange={(e) => setSelectedSpecies(e.target.value)}
                    >
                        <option value="" disabled>
                            Select Species
                        </option>
                        {speciesOptions.length > 0 ? (
                            speciesOptions.map((species, index) => (
                                <option key={index} value={species}>
                                    {species}
                                </option>
                            ))
                        ) : (
                            <option disabled>No species available</option>
                        )}
                    </select>
                    <button
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleIdentify}
                    >
                        Identify
                    </button>

                    <button
                        className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => setShowForm(!showForm)}
                    >
                        Can't Find Species?
                    </button>
                </div>
            </div>

            {/* Add New Species Form */}
            {showForm && (
                <form
                    className="bg-white p-4 rounded shadow-md space-y-4 w-full md:w-1/2"
                    onSubmit={handleAddSpecies}
                >
                    <h3 className="text-lg font-semibold text-gray-700">
                        Add New Species
                    </h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Species Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={newSpecies.common_name}
                            onChange={(e) =>
                                setNewSpecies({
                                    ...newSpecies,
                                    common_name: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Scientific Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={newSpecies.scientific_name}
                            onChange={(e) =>
                                setNewSpecies({
                                    ...newSpecies,
                                    scientific_name: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Taxonomic Class
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={newSpecies.class}
                            onChange={(e) =>
                                setNewSpecies({
                                    ...newSpecies,
                                    class: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Conservation Status
                        </label>
                        <select
                            className=" p-3 border border-gray-300 rounded-lg shadow-sm "
                            value={newSpecies.conservationStatus || ""}
                            onChange={(e) =>
                                setNewSpecies({
                                    ...newSpecies,
                                    conservationStatus: e.target.value,
                                })
                            }
                            required
                        >
                            <option value="" disabled>
                                Select Conservation Status
                            </option>
                            <option value="Least Concern">Least Concern</option>
                            <option value="Near Threatened">
                                Near Threatened
                            </option>
                            <option value="Vulnerable">Vulnerable</option>
                            <option value="Endangered">Endangered</option>
                            <option value="Extinct">Extinct</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Image URL
                        </label>
                        <input
                            type="file"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={newSpecies.imageUrl}
                            onChange={(e) =>
                                setNewSpecies({
                                    ...newSpecies,
                                    imageUrl: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Submit
                    </button>
                </form>
            )}

            {/* Map Section */}
            <Map
                initialViewState={{
                    longitude: spottingData?.Coordinates?.[0] || 78.9629,
                    latitude: spottingData?.Coordinates?.[1] || 20.5937,
                    zoom: 5,
                }}
                style={{ width: "100%", height: 400 }}
                mapStyle="https://demotiles.maplibre.org/style.json"
            >
                <Marker
                    longitude={spottingData?.Coordinates?.[0] || 78.9629}
                    latitude={spottingData?.Coordinates?.[1] || 20.5937}
                    anchor="bottom"
                />
            </Map>
            <ToastContainer />
        </div>
    );
};

export default SpottingDetailsPage;
