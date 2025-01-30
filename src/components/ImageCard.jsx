const ImageCard = ({ imageUrl, label }) => {
    return (
        <div className="h-full w-full overflow-hidden shadow-md transition-transform hover:scale-105 m-2 border ">
            <div className="h-[85%] w-full">
                <img 
                    src={imageUrl} 
                    alt={label} 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="h-[15%] bg-gray-100 p-2 text-center">
                <p className="text-sm font-semibold truncate ">
                    {label}
                </p>
            </div>
        </div>
    );
};

export default ImageCard;
