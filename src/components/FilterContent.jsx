const FilterObservation = () => {
    return (
      <div className="h-screen bg-gray-100 shadow-lg p-4 space-y-6 sticky top-0">
        <div className="text-xl font-bold text-gray-700">Filter</div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2  border border-gray-300 focus:ring-blue-500"
          />
        </div>
  
        <div className="space-y-2">
          <button className="w-full bg-green-500 text-white p-2  hover:bg-green-600 transition">
            Search
          </button>
        </div>
      </div>
    );
  };
  
  export default FilterObservation;
  