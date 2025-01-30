import { Link } from "react-router-dom";
import ImageCard from "./ImageCard";

const CardGrid = ({ data, resource }) => {
    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data.map((item, index) => (
                    <Link 
                        key={item._id || index} 
                        to={`/${resource}/${item._id}`} 
                        className="block"
                    >
                        <div className="h-[250px]">
                            <ImageCard
                                imageUrl={
                                    item.image ||
                                    item.spotId?.image ||
                                    "https://placehold.co/400"
                                }
                                label={
                                    item.title ||
                                    item.common_name ||
                                    item.speciesId?.common_name ||
                                    item.spotId?.title ||
                                    "Untitled"
                                }
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CardGrid;
