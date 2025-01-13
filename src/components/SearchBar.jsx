import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search action
  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className=" p-4 space-y-3 sticky top-0 sm:block w-100 md:w-100 flex-grow max-w-80" >
      <div className="relative">
        <div className="text-xl font-bold text-gray-700 mb-4 hidden md:block">Search</div>
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
