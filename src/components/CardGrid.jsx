import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const CardGrid = ({ data, resource,imageScale=1 }) => {
    return (
        <div className="container mx-auto px-4 m-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data.map((item, index) => (
                    <Link
                        key={item._id || index}
                        to={`/${resource}/${item._id}`}
                        className="block transform scale-105 transition hover:scale-110 m-2"
                        style={{ transformOrigin: "center" }}
                    >
                        <Card className="rounded-lg overflow-hidden shadow-md transition hover:shadow-lg">
                            <CardContent className="p-0">
                                <img
                                    src={
                                        item.image ||
                                        item.spotId?.image ||
                                        "https://placehold.co/800"
                                    }
                                    alt={item.title || "Image"}
                                    className={`w-full h-${48*imageScale} object-cover`}
                                />
                            </CardContent>
                            <CardFooter className="p-3 text-center font-semibold text-gray-700">
                                {item.title ||
                                    item.common_name ||
                                    item.speciesId?.common_name ||
                                    item.spotId?.title ||
                                    "Untitled"}
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CardGrid;
