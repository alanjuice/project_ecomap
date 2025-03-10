import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    getExperts,
    getSpeciesAdmin,
    getUsers,
    deleteExpert,
    deleteSpecies,
    deleteUser,
} from "../../api";

import UserRegistrationModal from "../../components/modals/RegistrationModal";
import LoadingIcon from "../../components/LoadingIcon";
import Error from "../../components/Error";
import AddSpeciesModal from "../../components/modals/AddSpeciesModal";

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
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/context/ToastContext";
import { Link } from "react-router-dom";

const AdminListPage = ({ resource }) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const fetchData = (resource) => {
        if (resource === "Species") {
            return getSpeciesAdmin();
        } else if (resource === "Expert") {
            return getExperts();
        } else if (resource === "User") {
            return getUsers();
        } else {
            throw new Error("Invalid resource type");
        }
    };

    const deleteData = async (id) => {
        if (resource === "Species") {
            await deleteSpecies(id);
        } else if (resource === "Expert") {
            await deleteExpert(id);
        } else if (resource === "User") {
            await deleteUser(id);
        } else {
            throw new Error("Invalid resource type");
        }
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [resource],
        queryFn: () => fetchData(resource),
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => deleteData(id),
        onSuccess: () => {
            queryClient.invalidateQueries([resource]);
            toast.success("Deletion Successful");
        },
        onError: () => {
            toast.error("Deletion UnSuccessful");
        },
    });

    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [filteredContent, setFilteredContent] = useState([]);

    useEffect(() => {
        //Temp Fix, I forgot what this does, but dont remove..it just works
        let d = data;

        if (resource === "Species") {
            d = data?.data;
        }

        if (d) {
            setFilteredContent(
                d.filter((item) =>
                    resource === "Species"
                        ? item?.common_name
                              ?.toLowerCase()
                              .includes(search.toLowerCase()) ||
                          item?.scientific_name
                              ?.toLowerCase()
                              .includes(search.toLowerCase()) ||
                          item?._id
                              ?.toLowerCase()
                              .includes(search.toLowerCase())
                        : item?.name
                              ?.toLowerCase()
                              .includes(search.toLowerCase()) ||
                          item?.email
                              ?.toLowerCase()
                              .includes(search.toLowerCase()) ||
                          item?._id
                              ?.toLowerCase()
                              .includes(search.toLowerCase())
                )
            );
        }
    }, [search, data, resource]);

    const handleSearch = (event) => setSearch(event.target.value);

    const handleDelete = (id) => {
        deleteMutation.mutate(id);
    };

    if (isLoading) return <LoadingIcon />;
    if (isError) return <Error message={error.message} />;

    return (
        <div className="w-full md:w-2/3 sm:m-2 p-4 bg-white sm:w-3/4 mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
                {resource} List
            </h1>

            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 sm:w-1/3 w-2/3"
                />
                {resource === "User" ? (
                    <Link to="/admin/users/pending">
                        <Button>Pending Users</Button>
                    </Link>
                ) : (
                    ""
                )}
                <Button onClick={() => setModalOpen(true)}>
                    Add {resource}
                </Button>
            </div>

            {resource === "Species" ? (
                <AddSpeciesModal
                    isOpen={modalOpen}
                    toggle={() => setModalOpen(!modalOpen)}
                    type={"admin"}
                />
            ) : (
                <UserRegistrationModal
                    isOpen={modalOpen}
                    toggle={() => setModalOpen(!modalOpen)}
                    userType={resource}
                />
            )}

            {/* Scrollable Table */}
            <div className="overflow-x-auto border rounded-lg shadow-md">
                <Table>
                    <TableHeader className="bg-green-100 text-white">
                        <TableRow>
                            {resource === "Species" ? (
                                <>
                                    <TableHead className="p-3">
                                        Common Name
                                    </TableHead>
                                    <TableHead className="p-3">
                                        Scientific Name
                                    </TableHead>
                                    <TableHead className="p-3">
                                        Conservation Status
                                    </TableHead>
                                    <TableHead className="p-3">
                                        Actions
                                    </TableHead>
                                </>
                            ) : (
                                <>
                                    <TableHead className="p-3">Name</TableHead>
                                    <TableHead className="p-3">Email</TableHead>
                                    <TableHead className="p-3">
                                        Actions
                                    </TableHead>
                                </>
                            )}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredContent.length > 0 ? (
                            filteredContent.map((item) => (
                                <TableRow
                                    key={item._id}
                                    className="border hover:bg-gray-100 transition duration-200"
                                >
                                    {resource === "Species" ? (
                                        <>
                                            <TableCell className="p-3">
                                                {item.common_name}
                                            </TableCell>
                                            <TableCell className="p-3">
                                                {item.scientific_name ||
                                                    item.spotId
                                                        ?.scientific_name}
                                            </TableCell>
                                            <TableCell className="p-3">
                                                {item.conservation_status ||
                                                    "N/A"}
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell className="p-3">
                                                {item.name}
                                            </TableCell>
                                            <TableCell className="p-3">
                                                {item.email}
                                            </TableCell>
                                        </>
                                    )}
                                    <TableCell className="p-3">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive">
                                                    Delete
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Confirm Delete
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to
                                                        delete this {resource}?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <Button
                                                        onClick={() =>
                                                            handleDelete(
                                                                item._id
                                                            )
                                                        }
                                                        variant="destructive"
                                                    >
                                                        Confirm
                                                    </Button>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan="4"
                                    className="p-4 text-center text-gray-500"
                                >
                                    No records found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminListPage;
