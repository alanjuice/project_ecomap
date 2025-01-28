const NoResourceFound = ({ resource }) => {
    return (
        <div className="flex items-center justify-center h-64 text-gray-500 text-xl font-semibold w-screen">
            No {resource} Found
        </div>
    );
};

export default NoResourceFound;
