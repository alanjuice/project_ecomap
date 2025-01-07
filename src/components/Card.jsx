const Card = ({ title, value }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 text-center border border-green-200 sm:w-1/4">
            <h3 className="text-lg font-bold text-gray-700 mb-2">{title}</h3>
            <h6 className="text-2xl font-extrabold text-green-700">
                {value.toLocaleString()}
            </h6>
        </div>
    );
};

export default Card;
