import { useParams } from "react-router-dom";
import { Map, Marker } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useQuery } from "@tanstack/react-query";

import LoadingIcon from "../../components/LoadingIcon";
import Error from "../../components/Error";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { getOccurencebyId } from "../../api";
import ImageCard from "@/components/ImageCard";

const OccurenceDetails = () => {
    const { id } = useParams();

    const mapTileUrl = import.meta.env.VITE_MAP_TILER_KEY;

    const {
        data: occurenceData,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ["getOccurenceById", id],
        queryFn: () => getOccurencebyId(id),
    });

    if (isError) {
        return <Error message={error.message} />;
    }

    if (isLoading) {
        return <LoadingIcon />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="container mx-auto space-y-8">
                {/* Image Card */}
                <ImageCard imageUrl={occurenceData.data.spotId.image} />

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-green-200 shadow-md">
                        <CardHeader>
                            <CardTitle>Species Name</CardTitle>
                            <CardDescription>
                                {occurenceData.data.speciesId.common_name}
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="bg-orange-200 shadow-md">
                        <CardHeader>
                            <CardTitle>Spotted By</CardTitle>
                            <CardDescription>
                                {occurenceData.data.userId.name}
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="bg-blue-200 shadow-md">
                        <CardHeader>
                            <CardTitle>Spotted At</CardTitle>
                            <CardDescription>
                                {occurenceData.data.spotId.date.split("T")[0]}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                <Separator className="my-6" />

                {/* Map Section */}
                <Card className="shadow-lg overflow-hidden">
                    <CardHeader>
                        <CardTitle>Location</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Map
                            initialViewState={{
                                longitude:
                                    occurenceData.data.spotId.location
                                        .coordinates[0],
                                latitude:
                                    occurenceData.data.spotId.location
                                        .coordinates[1],
                                zoom: 5,
                            }}
                            style={{ width: "100%", height: 500 }}
                            mapStyle={mapTileUrl}
                        >
                            <Marker
                                longitude={
                                    occurenceData.data.spotId.location
                                        .coordinates[0]
                                }
                                latitude={
                                    occurenceData.data.spotId.location
                                        .coordinates[1]
                                }
                                anchor="bottom"
                            />
                        </Map>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OccurenceDetails;
