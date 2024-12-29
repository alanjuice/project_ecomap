const SearchSpecies = () => {
  return (
    <div className="w-full lg:w-64  h-screen bg-gray-100 shadow-lg p-6 space-y-6 overflow-y-auto">
      <div className="text-xl font-bold text-gray-700">Search</div>

      <div className="relative">
        <input
          type="text"
          placeholder="Name..."
          className="w-full p-3  border border-gray-300 rounded-lg focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchSpecies;
