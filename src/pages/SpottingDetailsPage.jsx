import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Map, Marker } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { addSpecies } from "../api";
import { ToastContainer, toast } from "react-toastify";

const SpottingDetailsPage = () => {
    const { id } = useParams();

    const [spottingData, setSpottingData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSpecies, setSelectedSpecies] = useState("");
    const [showForm, setShowForm] = useState(false);

    const [newSpecies, setNewSpecies] = useState({
        name: "",
        scientificName: "",
        class: "",
        conservationStatus: "",
        imageUrl: "",
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

    useEffect(() => {
        // Simulate fetching data based on spotting ID
        console.log("Fetching details of Spotting id: " + id);

        // Example data
        const data = {
            Spotting_ID: id,
            Spotted_By: "John Doe",
            Spotted_At: "2024-12-30",
            Coordinates: [78.9629, 20.5937],
            Description:
                "A majestic tiger was spotted in the wilderness. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            Image_URL:
                "https://upload.wikimedia.org/wikipedia/commons/3/3f/Walking_tiger_female.jpg",
        };

        setSpottingData(data);
        setIsLoading(false);
    }, [id]);

    const handleIdentify = () => {
        alert(`Identified as: ${selectedSpecies}`);
    };

    const handleAddSpecies = async (e) => {
        e.preventDefault();
        const response = await addSpecies({
            common_name: newSpecies.name,
            scientific_name: newSpecies.scientificName,
            taxonomy_class: newSpecies.class,
            conservation_status: newSpecies.conservationStatus,
        });
        if (!response.success) {
            toast.error(response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                theme: "light",
            });
            return 0;
        } else {
            toast(response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                theme: "light",
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <span className="text-lg font-semibold text-gray-600">
                    Loading...
                </span>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 p-4 w-screen">
            <h1 className="text-2xl font-bold mb-4">Spotting Details</h1>

            {/* Image Section */}
            <div className="flex justify-center mb-6">
                <img
                    src={spottingData.Image_URL}
                    alt="Spotted Animal"
                    className="w-full max-w-md rounded-lg shadow-md"
                />
            </div>

            {/* Table Section */}
            <table className="table-auto w-full border border-gray-300 text-left mb-8">
                <tbody>
                    <tr className="border-b">
                        <th className="p-2">Spotting ID</th>
                        <td className="p-2">{spottingData.Spotting_ID}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="p-2">Spotted By</th>
                        <td className="p-2">{spottingData.Spotted_By}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="p-2">Spotted At</th>
                        <td className="p-2">{spottingData.Spotted_At}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="p-2">Description</th>
                        <td className="p-2">{spottingData.Description}</td>
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
                        {speciesOptions.map((species, index) => (
                            <option key={index} value={species}>
                                {species}
                            </option>
                        ))}
                    </select>
                    <button
                        className="px-3 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleIdentify}
                    >
                        Identify
                    </button>
                    <button
                        className="px-3 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => setShowForm(!showForm)}
                    >
                        Can't Find Species?
                    </button>
                </div>
            </div>

            {/* Add New Species Form */}
            {showForm && (
                <form
                    className="bg-white p-4 rounded shadow-md space-y-4 w-1/2"
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
                            value={newSpecies.name}
                            onChange={(e) =>
                                setNewSpecies({
                                    ...newSpecies,
                                    name: e.target.value,
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
                            value={newSpecies.scientificName}
                            onChange={(e) =>
                                setNewSpecies({
                                    ...newSpecies,
                                    scientificName: e.target.value,
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
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Location on Map</h2>
                <Map
                    initialViewState={{
                        longitude: spottingData.Coordinates[0],
                        latitude: spottingData.Coordinates[1],
                        zoom: 5,
                    }}
                    style={{ width: "100%", height: 400 }}
                    mapStyle="https://demotiles.maplibre.org/style.json"
                >
                    <Marker
                        longitude={spottingData.Coordinates[0]}
                        latitude={spottingData.Coordinates[1]}
                        anchor="bottom"
                    />
                </Map>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SpottingDetailsPage;
