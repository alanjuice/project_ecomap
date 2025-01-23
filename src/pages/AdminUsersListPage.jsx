import React, { useState, useEffect } from "react";
import UserRegistrationModal from "../components/RegistrationModal";
import { useQuery } from "@tanstack/react-query";
import { getExperts, getUsers } from "../api";
import LoadingIcon from "../components/LoadingIcon";

const AdminUsersList = ({ userType }) => {
    const {
        data: users,
        isLoading,
        isError,
    } = useQuery({
        queryKey: [userType],
        queryFn: userType === "Expert" ? getExperts : getUsers,
    });

    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        if (users) {
            setFilteredUsers(
                users.filter(
                    (user) =>
                        user?.name
                            ?.toLowerCase()
                            .includes(search.toLowerCase()) ||
                        user?.email
                            ?.toLowerCase()
                            .includes(search.toLowerCase())
                )
            );
        }
    }, [search, users]);

    const handleSearch = (event) => setSearch(event.target.value);

    if (isLoading) return <LoadingIcon />;
    if (isError)
        return (
            <p className="text-red-500 text-center">
                Failed to load {userType}s. Please try again.
            </p>
        );

    return (
        <div className="w-screen sm:m-2 p-4 bg-white sm:w-1/2">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
                {userType}s List
            </h1>

            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 sm:w-1/3 w-2/3"
                />
                <button
                    onClick={() => setModalOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition"
                >
                    Add {userType}
                </button>
            </div>

            <UserRegistrationModal
                isOpen={modalOpen}
                toggle={() => setModalOpen(!modalOpen)}
                userType={userType}
            />

            <table className="min-w-full table-auto">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-3 border">No</th>
                        <th className="p-3 border">Name</th>
                        <th className="p-3 border">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                            <tr
                                key={user._id}
                                className="border hover:bg-gray-100 transition duration-200"
                            >
                                <td className="p-3 border">{index + 1}</td>
                                <td className="p-3 border">{user.name}</td>
                                <td className="p-3 border">{user.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="3"
                                className="p-4 text-center text-gray-500"
                            >
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsersList;
