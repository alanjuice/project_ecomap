import { Link } from "react-router-dom";
import ImageCard from "./ImageCard";

const CardGrid = ({ data }) => {
    console.log(data);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 p-4">
            {data.map((item, index) => (
                <Link to={"/species/" + item.id}>
                    <ImageCard
                        key={index}
                        imageUrl={item.imageUrl || "https://placehold.co/400"}
                        label={item.label}
                    />
                </Link>
            ))}
        </div>
    );
};

export default CardGrid;
