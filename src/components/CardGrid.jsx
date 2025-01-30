import { Link } from "react-router-dom";
import ImageCard from "./ImageCard";

const CardGrid = ({ data, resource }) => {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,200px)] gap-3 p-4 w-full justify-center">
            {data.map((item) => (
                <Link to={"/" + resource + "/" + item._id}>
                    <ImageCard
                        imageUrl={
                            item.image ||
                            item.spotId?.image ||
                            "https://placehold.co/400"
                        }
                        label={
                            item.title ||
                            item.common_name ||
                            item.speciesId.common_name ||
                            item.spotId.title
                        }
                    />
                </Link>
            ))}
        </div>
    );
};

export default CardGrid;
