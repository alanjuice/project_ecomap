import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Map, Marker } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { getSpecies, getSpottingById, identifySpecies } from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import LoadingIcon from "../components/LoadingIcon";
import AddSpeciesModal from "../components/AddSpeciesModal";
import Error from "../components/Error";

const SpottingDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data: spottingData,
        isLoading,
        isError: isSpottingLoadingError,
        error: spottingerror,
    } = useQuery({
        queryKey: ["getspottingbyid", id],
        queryFn: () => getSpottingById(id),
    });

    const {
        data: speciesOptions,
        isDropDownDataLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["getallspecies"],
        queryFn: getSpecies,
    });

    if (isSpottingLoadingError) {
        return <Error message={spottingerror.message} />;
    }

    if (isError) {
        return <Error message={error.message} />;
    }

    const identificationMutation = useMutation({
        mutationFn: ({ spotId, userId, speciesId }) =>
            identifySpecies({ spotId, userId, speciesId }),
        onSuccess: (data) => {
            toast.success("Species Identified Successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
            navigate("/expert/spottings");
        },
        onError: (error) => {
            console.log(error);
            toast.error(
                error?.response?.data?.message || "Failed to identify species!",
                {
                    position: "top-right",
                    autoClose: 3000,
                }
            );
        },
    });

    const [selectedSpecies, setSelectedSpecies] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const handleIdentify = (e) => {
        e.preventDefault();
        if (!selectedSpecies) {
            toast.error("Please select a species!", { autoClose: 3000 });
            return;
        }
        identificationMutation.mutate({
            spotId: id,
            userId: spottingData.data.user._id,
            speciesId: selectedSpecies,
        });
    };

    if (isLoading || isDropDownDataLoading) {
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
                        {speciesOptions.data.length > 0 ? (
                            speciesOptions.data.map((species) => (
                                <option key={species._id} value={species._id}>
                                    {species.common_name}
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
                        onClick={() => setModalOpen(true)}
                    >
                        Can't Find Species?
                    </button>
                </div>
            </div>

            <AddSpeciesModal
                isOpen={modalOpen}
                toggle={() => setModalOpen(false)}
            />

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
