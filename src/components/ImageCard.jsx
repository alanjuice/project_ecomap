const ImageCard = ({ imageUrl, label }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md ">
      <img src={imageUrl} alt={label} className="w-full h-40 object-cover" />
      <div className="p-2 text-center font-semibold text-gray-700">{label}</div>
    </div>
  );
};

export default ImageCard;
