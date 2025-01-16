import { Link } from "react-router-dom";
import ImageCard from "./ImageCard";

const CardGrid = ({ data, resource }) => {
    console.log(data);
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 p-4 grid-rows-3">
            {data.map((item, index) => (
                <Link to={"/" + resource + "/" + item.id}>
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
