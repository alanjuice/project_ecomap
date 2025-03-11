import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getPendingUsers, approveUser, rejectUser } from "../../api";

import LoadingIcon from "../../components/LoadingIcon";
import Error from "../../components/Error";

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

const PendingUsers = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["pendingUsers"],
        queryFn: getPendingUsers,
    });

    const [search, setSearch] = useState("");
    const [filteredContent, setFilteredContent] = useState([]);

    // Approve mutation
    const approveMutation = useMutation({
        mutationFn: approveUser,
        onSuccess: () => {
            toast({
                title: "Success",
                description: "User has been approved",
                variant: "success",
            });
            queryClient.invalidateQueries({ queryKey: ["pendingUsers"] });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message || "Failed to approve user",
                variant: "destructive",
            });
        },
    });

    // Reject mutation
    const rejectMutation = useMutation({
        mutationFn: rejectUser,
        onSuccess: () => {
            toast({
                title: "Success",
                description: "User has been rejected",
                variant: "success",
            });
            queryClient.invalidateQueries({ queryKey: ["pendingUsers"] });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message || "Failed to reject user",
                variant: "destructive",
            });
        },
    });

    useEffect(() => {
        if (data) {
            setFilteredContent(
                data.filter(
                    (item) =>
                        item?.name
                            ?.toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item?.email
                            ?.toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item?._id?.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [search, data]);

    const handleSearch = (event) => setSearch(event.target.value);

    const handleApprove = (userId) => {
        approveMutation.mutate(userId);
    };

    const handleReject = (userId) => {
        rejectMutation.mutate(userId);
    };

    if (isLoading) return <LoadingIcon />;
    if (isError) return <Error message={error.message} />;

    return (
        <div className="w-full md:w-2/3 sm:m-2 p-4 bg-white sm:w-3/4 mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
                Pending Users
            </h1>

            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 sm:w-1/3 w-2/3"
                />
            </div>

            {/* Scrollable Table */}
            <div className="overflow-x-auto border rounded-lg shadow-md">
                <Table>
                    <TableHeader className="bg-green-100 text-white">
                        <TableRow>
                            <TableHead className="p-3">Name</TableHead>
                            <TableHead className="p-3">Email</TableHead>
                            <TableHead className="p-3">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredContent && filteredContent.length > 0 ? (
                            filteredContent.map((item) => (
                                <TableRow
                                    key={item._id}
                                    className="border hover:bg-gray-100 transition duration-200"
                                >
                                    <TableCell className="p-3">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="p-3">
                                        {item.email}
                                    </TableCell>
                                    <TableCell className="p-3 flex gap-2">
                                        <Button
                                            onClick={() =>
                                                handleApprove(item._id)
                                            }
                                            variant="default"
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            Approve
                                        </Button>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive">
                                                    Reject
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Confirm Reject
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to
                                                        reject this user?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <Button
                                                        onClick={() =>
                                                            handleReject(
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
                                    colSpan="3"
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

export default PendingUsers;
