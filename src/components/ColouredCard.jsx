const ColouredCard = ({ title, value, color, extraStyle }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-6 text-center border-t-4 border ${extraStyle}`}
      style={{ borderColor: color }}
    >
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default ColouredCard;
