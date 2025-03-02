import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Map, Marker } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import { getSpecies, getSpottingById, identifySpecies,rejectSpotting } from "../../api";
import LoadingIcon from "../../components/LoadingIcon";
import AddSpeciesModal from "../../components/modals/AddSpeciesModal";
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
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import ImageCard from "@/components/ImageCard";
import { useToast } from "@/context/ToastContext";

const SpottingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {toast} = useToast();
    
    const mapTileUrl = import.meta.env.VITE_MAP_TILER_KEY 

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

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
        isLoading: isDropDownDataLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["getallspecies"],
        queryFn: () => getSpecies(null),
    });

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

    const rejectionMutation = useMutation({
        mutationFn: ({ spotId }) =>
            rejectSpotting({ spotId }),
        onSuccess: () => {
            toast.success("Spotting Rejected !", {
                position: "top-right",
                autoClose: 3000,
            });
            navigate("/expert/spottings");
        },
        onError: (error) => {
            console.log(error)
            toast.error(
                error?.response?.data?.message || "Failed to identify species!",
                {
                    position: "top-right",
                    autoClose: 3000,
                }
            );
        },
    });

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

    const rejectUpload = (e)=>{
        e.preventDefault();
        console.log(e)
        rejectionMutation.mutate({spotId:id})
    }

    if (isSpottingLoadingError) {
        return (
            <Error
                message={
                    spottingerror?.message || "Failed to load spotting details."
                }
            />
        );
    }

    if (isError) {
        return (
            <Error
                message={error?.message || "Failed to load species options."}
            />
        );
    }

    if (isLoading || isDropDownDataLoading) {
        return <LoadingIcon />;
    }

    return (
        <div className="bg-gray-50 p-6 w-screen">
            <h1 className="text-3xl font-bold mb-6">Spotting Details</h1>

            <ImageCard imageUrl={spottingData.data.image}/>

            <Table className="mb-8">
                <TableBody>
                    <TableRow>
                        <TableCell> ID</TableCell>
                        <TableCell>{spottingData.data._id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Spotted By</TableCell>
                        <TableCell>{spottingData.data.user.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Spotted At</TableCell>
                        <TableCell>{spottingData.data.date}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>{spottingData.data.description}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <div className="mb-8 mt-4">
                <h2 className="text-xl font-semibold mb-4">
                    Identify the Species
                </h2>

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
                                    ? speciesOptions?.data?.find(
                                          (species) =>
                                              species._id === value
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
                                        {speciesOptions?.data?.map(
                                            (species) => (
                                                <CommandItem
                                                    key={species._id}
                                                    onSelect={() => {
                                                        setValue(
                                                            species._id ===
                                                                value
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
                                                            value ===
                                                                species._id
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            )
                                        )}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    <Button onClick={handleIdentify}>Identify</Button>
                </div>
                <div className="mt-4 ">
                <Button onClick={() => setModalOpen(true)} className="mr-8">
                        Can't Find Species
                </Button>
                <Button onClick={rejectUpload} variant="destructive">
                        Reject
                </Button>
                </div>
                
            </div>

            <AddSpeciesModal
                isOpen={modalOpen}
                toggle={() => setModalOpen(false)}
                type={"expert"}
            />

            <Map
                initialViewState={{
                    longitude:
                        spottingData?.data?.location?.coordinates?.[0] ||
                        78.9629,
                    latitude:
                        spottingData?.data?.location?.coordinates?.[1] ||
                        20.5937,
                    zoom: 5,
                }}
                style={{ width: "100%", height: 400 }}
                mapStyle={mapTileUrl}
            >
                <Marker
                    longitude={
                        spottingData.data.location.coordinates[0]
                    }
                    latitude={
                        spottingData.data.location.coordinates[1]
                    }
                    anchor="bottom"
                />
            </Map>
        </div>
    );
};

export default SpottingDetails;
