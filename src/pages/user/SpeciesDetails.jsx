import { useParams } from "react-router-dom";
import { Map, Layer, Source } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useQuery } from "@tanstack/react-query";

import LoadingIcon from "../../components/LoadingIcon";
import Error from "../../components/Error";

import { getMapData, getSpeciesbyId } from "../../api";
import { heatmapLayerStyle, pointLayerStyle } from "../../utils/MapLayerStyle";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ImageCard from "@/components/ImageCard";

const SpeciesDetailsPage = () => {
    const { id } = useParams();
    const {
        data: speciesData,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ["getSpeciesById"],
        queryFn: () => getSpeciesbyId(id),
    });

    const {
        data: mapData,
        isLoading: isMapLoading,
        isError: isMapError,
        error: mapError,
    } = useQuery({
        queryKey: ["getMapData"],
        queryFn: () => getMapData(id),
    });

    if (isError || isMapError) {
        return <Error message={"Something went wrong"} />;
    }

    if (isLoading || isMapLoading) {
        return <LoadingIcon />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="container mx-auto space-y-8">
                {/* Image Card */}
                <ImageCard imageUrl={speciesData.data.image}/>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-yellow-200 shadow-md">
                        <CardHeader>
                            <CardTitle>Common Name</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                {speciesData.data.common_name}
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="bg-green-200 shadow-md">
                        <CardHeader>
                            <CardTitle>Scientific Name</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                {speciesData.data.scientific_name}
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="bg-orange-200 shadow-md">
                        <CardHeader>
                            <CardTitle>Taxonomic Class</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                {speciesData.data.taxonomy_class || "NA"}
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>

                {/* Map Section */}
                <div className="mt-8">
                    <Card className="shadow-lg overflow-hidden">
                        <CardHeader>
                            <CardTitle>Species Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Map
                                initialViewState={{
                                    longitude: -100,
                                    latitude: 40,
                                    zoom: 3.5,
                                }}
                                style={{ width: "100%", height: 500 }}
                                mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
                            >
                                <Source
                                    id="species-locations"
                                    type="geojson"
                                    data={mapData.data}
                                >
                                    <Layer {...heatmapLayerStyle}></Layer>
                                    <Layer {...pointLayerStyle}></Layer>
                                </Source>
                            </Map>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SpeciesDetailsPage;
