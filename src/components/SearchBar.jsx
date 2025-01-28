import { useState } from "react";
import { useFilter } from "../context/FilterContext";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const { updateFilter } = useFilter();

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        updateFilter({ searchTerm: e.target.value });
    };

    return (
        <div className=" p-4 space-y-3 sticky top-0 sm:block w-100 md:w-100 flex-grow max-w-80">
            <div className="relative">
                <div className="text-xl font-bold text-gray-700 mb-4 hidden md:block">
                    Search
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
                />
            </div>
        </div>
    );
};

export default SearchBar;
