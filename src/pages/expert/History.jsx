import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getExpertOccurences,
    getSpecies,
    updateOccurence,
    deleteOccurrence,
} from "@/api";
import LoadingIcon from "@/components/LoadingIcon";
import { useToast } from "@/context/ToastContext";
import { Trash } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { X } from "lucide-react";

export default function ExpertHistory() {
    const queryClient = useQueryClient();
    const [editingId, setEditingId] = useState(null);
    const [selectedSpecies, setSelectedSpecies] = useState(null);

    const { toast } = useToast();

    // Fetch occurrences data
    const {
        data: occurrenceListData,
        isLoading: isOccurrencesLoading,
        error: occurrencesError,
        isError: isOccurrencesError,
    } = useQuery({
        queryKey: ["expertOccurrences"],
        queryFn: getExpertOccurences,
    });

    // Fetch species options
    const {
        data: speciesOptions,
        isLoading: isSpeciesLoading,
        error: speciesError,
        isError: isSpeciesError,
    } = useQuery({
        queryKey: ["allSpecies"],
        queryFn: () => getSpecies(null),
    });

    // Mutation to update a species
    const updateSpeciesMutation = useMutation({
        mutationFn: ({ id, species }) => updateOccurence(id, species),
        onSuccess: () => {
            // Invalidate and refetch occurrences after successful update
            queryClient.invalidateQueries({ queryKey: ["expertOccurrences"] });
            toast({
                title: "Success",
                description: "Species updated successfully",
                variant: "success",
            });
            setEditingId(null);
            setSelectedSpecies(null);
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: `Failed to update species: ${error.message}`,
                variant: "destructive",
            });
        },
    });

    // Mutation to delete an occurrence
    const deleteOccurrenceMutation = useMutation({
        mutationFn: (id) => deleteOccurrence(id),
        onSuccess: () => {
            // Invalidate and refetch occurrences after successful deletion
            queryClient.invalidateQueries({ queryKey: ["expertOccurrences"] });
            toast({
                title: "Success",
                description: "Occurrence deleted successfully",
                variant: "success",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: `Failed to delete occurrence: ${error.message}`,
                variant: "destructive",
            });
        },
    });

    // Handle edit button click
    const handleEdit = (id, currentSpeciesId) => {
        setEditingId(id);
        setSelectedSpecies(currentSpeciesId);
    };

    // Handle species selection
    const handleSpeciesSelection = (value) => {
        setSelectedSpecies(value);
    };

    // Handle save button click
    const handleSave = (id) => {
        if (selectedSpecies) {
            updateSpeciesMutation.mutate({ id, species: selectedSpecies });
        } else {
            toast({
                title: "Warning",
                description: "Please select a species before saving",
                variant: "warning",
            });
        }
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        setEditingId(null);
        setSelectedSpecies(null);
    };

    // Handle delete button click
    const handleDelete = (id) => {
        if (
            confirm(
                "Are you sure you want to delete this occurrence? This action cannot be undone."
            )
        ) {
            deleteOccurrenceMutation.mutate(id);
        }
    };

    // Display loading state
    if (isOccurrencesLoading || isSpeciesLoading) {
        return <LoadingIcon />;
    }

    // Display error state
    if (isOccurrencesError || isSpeciesError) {
        return (
            <div className="p-6 text-red-500">
                <h2 className="text-xl font-bold mb-2">Error</h2>
                <p>{occurrencesError?.message || speciesError?.message}</p>
            </div>
        );
    }

    return (
        <div className="p-6 w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Expert History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Spotted By</TableHead>
                                    <TableHead>Species</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {occurrenceListData.data.map((occurrence) => (
                                    <TableRow key={occurrence._id}>
                                        <TableCell>
                                            <Zoom
                                                IconUnzoom={X}
                                                classDialog="custom-zoom"
                                                className="custom-zoom"
                                            >
                                                <img
                                                    src={
                                                        occurrence.spotId.image
                                                    }
                                                    alt="species"
                                                    className="w-12 h-12 rounded-md object-cover"
                                                />
                                            </Zoom>
                                        </TableCell>
                                        <TableCell>
                                            {occurrence.userId.name}
                                        </TableCell>
                                        <TableCell>
                                            {editingId === occurrence._id ? (
                                                <div className="flex space-x-2">
                                                    <Select
                                                        defaultValue={
                                                            occurrence.speciesId
                                                                ._id
                                                        }
                                                        onValueChange={
                                                            handleSpeciesSelection
                                                        }
                                                    >
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Select species" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {speciesOptions.data.map(
                                                                (species) => (
                                                                    <SelectItem
                                                                        key={
                                                                            species._id
                                                                        }
                                                                        value={
                                                                            species._id
                                                                        }
                                                                    >
                                                                        {
                                                                            species.common_name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            ) : (
                                                occurrence.speciesId.common_name
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editingId === occurrence._id ? (
                                                <div className="flex space-x-2">
                                                    <Button
                                                        size="sm"
                                                        variant="default"
                                                        onClick={() =>
                                                            handleSave(
                                                                occurrence._id
                                                            )
                                                        }
                                                        disabled={
                                                            updateSpeciesMutation.isPending
                                                        }
                                                    >
                                                        {updateSpeciesMutation.isPending
                                                            ? "Saving..."
                                                            : "Save"}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={
                                                            handleCancelEdit
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex space-x-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() =>
                                                            handleEdit(
                                                                occurrence._id,
                                                                occurrence
                                                                    .speciesId
                                                                    ._id
                                                            )
                                                        }
                                                        disabled={
                                                            updateSpeciesMutation.isPending ||
                                                            deleteOccurrenceMutation.isPending
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            handleDelete(
                                                                occurrence._id
                                                            )
                                                        }
                                                        disabled={
                                                            updateSpeciesMutation.isPending ||
                                                            deleteOccurrenceMutation.isPending
                                                        }
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
