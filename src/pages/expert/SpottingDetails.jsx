import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";

import { Map, Marker } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import { getSpecies, getSpottingById, identifySpecies } from "../../api";
import LoadingIcon from "../../components/LoadingIcon";
import AddSpeciesModal from "../../components/AddSpeciesModal";
import Error from "../../components/Error";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const SpottingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

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
        queryFn: () => getSpecies(null),
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
        onSuccess: () => {
            toast.success("Species Identified Successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
            navigate("/expert/spottings");
        },
        onError: (error) => {
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

                {/* Added Combobox */}
                <div className="flex items-center space-x-4">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between"
                            >
                                {value
                                    ? speciesOptions.data.find(
                                          (species) => species._id === value
                                      )?.common_name
                                    : "Select species..."}
                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput
                                    placeholder="Search species..."
                                    className="h-9"
                                />
                                <CommandList>
                                    <CommandEmpty>
                                        No species found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {speciesOptions.data.map((species) => (
                                            <CommandItem
                                                key={species._id}
                                                onSelect={() => {
                                                    setValue(
                                                        species._id === value
                                                            ? ""
                                                            : species._id
                                                    );
                                                    setSelectedSpecies(
                                                        species._id
                                                    );
                                                    setOpen(false);
                                                }}
                                            >
                                                {species.common_name}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        value === species._id
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    <Button onClick={handleIdentify}>Identify</Button>
                    <Button
                        onClick={() => {
                            setModalOpen(true);
                        }}
                    >
                        Can't Find Species
                    </Button>
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
                {console.log(spottingData)}
                <Marker
                    longitude={spottingData.data.location.coordinates[0]}
                    latitude={spottingData.data.location.coordinates[1]}
                    anchor="bottom"
                />
            </Map>
            <ToastContainer />
        </div>
    );
};

export default SpottingDetails;
