import { Link } from "react-router-dom";
import ImageCard from "./ImageCard";

const SpeciesCardGrid = ({ data, resource }) => {
    return (
        <div className="grid auto-cols-fr gap-3 p-4 auto-rows-fr w-100">
            {data.map((item) => (
                <Link to={"/" + resource + "/" + item._id}>
                    <ImageCard
                        key={item.id}
                        imageUrl={
                            item.image ||
                            item.spotId?.image ||
                            "https://placehold.co/400"
                        }
                        label={
                            item.speciesId.common_name ||
                            item.title ||
                            item.common_name ||
                            item.spotId.title
                        }
                    />
                </Link>
            ))}
        </div>
    );
};

export default SpeciesCardGrid;
