import React, { useState, useEffect } from "react";
import UserRegistrationModal from "../components/RegistrationModal";
import { useQuery } from "@tanstack/react-query";
import { getExperts, getSpecies, getUsers } from "../api";
import LoadingIcon from "../components/LoadingIcon";
import Error from "../components/Error";
import AddSpeciesModal from "../components/AddSpeciesModal";

const AdminListPage = ({ resource }) => {
    const fetchData = (resource) => {
        if (resource === "Species") {
            return getSpecies();
        } else if (resource === "Expert") {
            return getExperts();
        } else if (resource === "User") {
            return getUsers();
        } else {
            throw new Error("Invalid resource type");
        }
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [resource],
        queryFn: () => fetchData(resource),
    });

    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [filteredContent, setFilteredContent] = useState([]);

    useEffect(() => {
        let d = data;

        if (resource === "Species") {
            d = data?.data; // Adjusting for Species
        }

        if (d) {
            setFilteredContent(
                d.filter((item) =>
                    // Adjust filtering based on resource type
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

    if (isLoading) return <LoadingIcon />;
    if (isError) return <Error message={error.message} />;

    // Determine the table columns dynamically based on the resource
    const renderTableHeaders = () => {
        if (resource === "Species") {
            return (
                <>
                    <th className="p-3 border">Id</th>
                    <th className="p-3 border">Common Name</th>
                    <th className="p-3 border">Scientific Name</th>
                    <th className="p-3 border">Conservation Status</th>
                </>
            );
        }
        return (
            <>
                <th className="p-3 border">Id</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
            </>
        );
    };

    const renderTableRows = () => {
        if (filteredContent.length > 0) {
            return filteredContent.map((item) => (
                <tr
                    key={item._id}
                    className="border hover:bg-gray-100 transition duration-200"
                >
                    <td className="p-3 border">{item._id}</td>
                    {resource === "Species" ? (
                        <>
                            <td className="p-3 border">{item.common_name}</td>
                            <td className="p-3 border">
                                {item.scientific_name ||
                                    item.spotId?.scientific_name}
                            </td>
                            <td className="p-3 border">
                                {item.conservation_status || item.spe}
                            </td>
                        </>
                    ) : (
                        <>
                            <td className="p-3 border">{item.name}</td>
                            <td className="p-3 border">{item.email}</td>
                        </>
                    )}
                </tr>
            ));
        }

        return (
            <tr>
                <td
                    colSpan={resource === "Species" ? 4 : 3}
                    className="p-4 text-center text-gray-500"
                >
                    No resource found.
                </td>
            </tr>
        );
    };

    return (
        <div className="w-100 sm:m-2 p-4 bg-white sm:w-1/2">
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
                <button
                    onClick={() => setModalOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition"
                >
                    Add {resource}
                </button>
            </div>

            {resource === "Species" ? (
                <AddSpeciesModal
                    isOpen={modalOpen}
                    toggle={() => setModalOpen(!modalOpen)}
                />
            ) : (
                <UserRegistrationModal
                    isOpen={modalOpen}
                    toggle={() => setModalOpen(!modalOpen)}
                    userType={resource}
                />
            )}

            {/* Wrap the table inside a scrollable container */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-800 text-white">
                        <tr>{renderTableHeaders()}</tr>
                    </thead>
                    <tbody>{renderTableRows()}</tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminListPage;
