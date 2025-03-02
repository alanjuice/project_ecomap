import { useState } from "react";
import { useFilter } from "../../context/FilterContext";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {  X,Filter } from "lucide-react";
import { conservationStatuses } from "@/constants";

const Sidebar = ({ type }) => {
    

    const { updateFilter } = useFilter();
    const [filters, setFilters] = useState({
        sortBy: type === "occurence" ? "recent" : "asc",
        conservationStatus: "",
        startDate: "",
        endDate: "",
    });

    const [mobileFilterVisible, setMobileFilterVisible] = useState(false);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        updateFilter({ [key]: value });
    };

    return (
        <div className="md:h-screen bg-gray-100 shadow-lg p-4 sticky top-0 sm:w-64 w-full">
            {/* Search Bar & Mobile Filter Toggle */}
            <div className="flex justify-between items-center mb-4">
                <Input
                    placeholder="Search..."
                    className="w-full"
                    onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                />
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="ghost" className="md:hidden">
                            {mobileFilterVisible ? <X size={20} /> : <Filter/> }
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className="p-4">
                        <FilterContent
                            type={type}
                            filters={filters}
                            onFilterChange={handleFilterChange}
                        />
                    </DrawerContent>
                </Drawer>
            </div>

            {/* Desktop Sidebar Filters */}
            <div className="hidden md:block">
                <FilterContent
                    type={type}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />
            </div>
        </div>
    );
};

const FilterContent = ({ type, filters, onFilterChange }) => {

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-700">Filters</h2>

            {/* Conservation Status (For Species) */}
            {type === "species" && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Conservation Status</h3>
                    <div className="space-y-2">
                        {conservationStatuses.map(
                            (status) => (
                                <div key={status} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={status}
                                        checked={filters.conservationStatus === status}
                                        onCheckedChange={() => onFilterChange("conservationStatus", status)}
                                    />
                                    <label htmlFor={status} className="text-gray-700 font-medium">
                                        {status}
                                    </label>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}

            {/* Time Range (For Occurrences) */}
            {type === "occurence" && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Time Range</h3>
                    <Input
                        type="date"
                        placeholder="Start Date"
                        value={filters.startDate}
                        onChange={(e) => onFilterChange("startDate", e.target.value)}
                        className="mb-2"
                    />
                    <Input
                        type="date"
                        placeholder="End Date"
                        value={filters.endDate}
                        onChange={(e) => onFilterChange("endDate", e.target.value)}
                    />
                </div>
            )}

            {/* Sorting Options */}
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Sort By</h3>
                <Select
                    value={filters.sortBy}
                    defaultValue= {type === "occurence" ? "recent" : "asc"}
                    onValueChange={(value) => onFilterChange("sortBy", value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        {type === "occurence" ? (
                            <>
                                <SelectItem value="recent">Recently Added</SelectItem>
                                <SelectItem value="oldest">Oldest First</SelectItem>
                            </>
                        ) : (
                            <>
                                <SelectItem value="asc">Alphabetic (A-Z)</SelectItem>
                                <SelectItem value="desc">Alphabetic (Z-A)</SelectItem>
                            </>
                        )}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default Sidebar;
