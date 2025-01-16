import { useEffect, useState } from "react";

const FilterContent = ({ type, viewFilter }) => {
  const conservationStatuses = [
    "Endangered",
    "Vulnerable",
    "Near Threatened",
    "Least Concern",
    "Critically Endangered",
  ];

  const [filterStyle, setFilterStyle] = useState(viewFilter ? "" : "hidden");

  useEffect(() => {
    setFilterStyle(viewFilter ? "" : "hidden");
  }, [viewFilter]);

  // State for sorting options
  const [sortOption, setSortOption] = useState(
    type === "occurrence" ? "recent" : "alphabetic"
  );

  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
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
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={status}
                  name="conservationStatus"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={status} className="text-gray-700 font-medium">
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Time Range For Occurrences */}
      {type === "occurrence" && (
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
                className="p-2 border border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sorting Options */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Sort By</h3>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
        >
          {type === "occurrence" ? (
            <>
              <option value="recent">Recently Added</option>
              <option value="old">Oldest First</option>
            </>
          ) : (
            <>
              <option value="alphabetic">Alphabetic (A-Z)</option>
              <option value="descending">Alphabetic (Z-A)</option>
            </>
          )}
        </select>
      </div>
    </div>
  );
};

export default FilterContent;
