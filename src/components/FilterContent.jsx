import { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";

const FilterContent = ({ type, viewFilter }) => {
    const conservationStatuses = [
        "Endangered",
        "Vulnerable",
        "Near Threatened",
        "Least Concern",
        "Critically Endangered",
    ];

    const { updateFilter } = useFilter();
    const [filterStyle, setFilterStyle] = useState(viewFilter ? "" : "hidden");

    useEffect(() => {
        setFilterStyle(viewFilter ? "" : "hidden");
    }, [viewFilter]);

    const [sortOption, setSortOption] = useState(
        type === "occurence" ? "recent" : "alphabetic"
    );

    const [selectedConservationStatus, setSelectedConservationStatus] =
        useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortOption(value);
        updateFilter({ sortBy: value });
    };

    const handleStatusChange = (e) => {
        const value = e.target.value;
        setSelectedConservationStatus(value);
        updateFilter({ conservationStatus: value });
    };

    const handleStartDateChange = (e) => {
        const value = e.target.value;
        setStartDate(value);
        updateFilter({ startDate: value });
    };

    const handleEndDateChange = (e) => {
        const value = e.target.value;
        setEndDate(value);
        updateFilter({ endDate: value });
    };

    return (
        <div
            className={`h-screen bg-gray-100 p-4 space-y-6 block md:block ${
                viewFilter ? "" : "sm:hidden"
            } ${filterStyle}`}
        >
            <div className="text-xl font-bold text-gray-700">Filter</div>

            {/* Conservation Status Selector for Species */}
            {type === "species" && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Conservation Status
                    </h3>
                    <div className="space-y-2">
                        {conservationStatuses.map((status, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2"
                            >
                                <input
                                    type="radio"
                                    id={status}
                                    name="conservationStatus"
                                    value={status}
                                    checked={
                                        selectedConservationStatus === status
                                    }
                                    onChange={handleStatusChange}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label
                                    htmlFor={status}
                                    className="text-gray-700 font-medium"
                                >
                                    {status}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Time Range For Occurrences */}
            {type === "occurence" && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Time Range
                    </h3>
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <label
                                htmlFor="startDate"
                                className="text-gray-700 font-medium mb-1"
                            >
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={handleStartDateChange}
                                className="p-2 border border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="endDate"
                                className="text-gray-700 font-medium mb-1"
                            >
                                End Date
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                value={endDate}
                                onChange={handleEndDateChange}
                                className="p-2 border border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Sorting Options */}
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Sort By
                </h3>
                <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
                >
                    {type === "occurence" ? (
                        <>
                            <option value="recent">Recently Added</option>
                            <option value="oldest">Oldest First</option>
                        </>
                    ) : (
                        <>
                            <option value="asc">Alphabetic (A-Z)</option>
                            <option value="desc">Alphabetic (Z-A)</option>
                        </>
                    )}
                </select>
            </div>
        </div>
    );
};

export default FilterContent;
