import { Link } from "react-router-dom";
import ImageCard from "./ImageCard";

const SpeciesCardGrid = ({ data, resource }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 p-4">
            {data.map((item) => (
                <Link to={"/" + resource + "/" + item._id}>
                    <ImageCard
                        key={item._id}
                        imageUrl={item.imageUrl || "https://placehold.co/400"}
                        label={item.common_name}
                    />
                </Link>
            ))}
        </div>
    );
};

export default SpeciesCardGrid;
