import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Map, Layer, Source } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import ColouredCard from "../components/ColouredCard";
import { getSpeciesDatabyID } from "../api";

import { heatmapLayerStyle, pointLayerStyle } from "../utils/MapLayerStyle";

const SpeciesDetailsPage = () => {
    const { id } = useParams();

    const [speciesData, setSpeciesData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isMapLoading, setIsMapLoading] = useState(true);
    const [mapData, setMapData] = useState("");

    const getSpeciesData = async (id) => {
        const response = await getSpeciesDatabyID(id);
        setIsLoading(false);
        setSpeciesData(response.data);
    };

    const getMapData = (id) => {
        useEffect(() => {
            // Simulate fetching map data based on species ID
            console.log("Fetching details of Species id: " + id);

            // Example data for now

            const data =
                "https://maplibre.org/maplibre-gl-js/docs/assets/earthquakes.geojson";
            setMapData(data);
            setIsMapLoading(false);
        }, [id]);
    };

    getSpeciesData(id);
    getMapData(id);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <span className="text-lg font-semibold text-gray-600">
                    Loading...
                </span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative w-full h-96 bg-gradient-to-br from-gray-800 to-gray-600">
                <img
                    src={speciesData.Image_URL}
                    alt={speciesData.Common_Name}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                    <h1 className="text-4xl font-extrabold mb-2">
                        {speciesData.Common_Name}
                    </h1>
                    <h2 className="text-lg font-semibold italic">
                        {speciesData.Scientific_Name}
                    </h2>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto p-6 space-y-8">
                {/* Info Grid */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ColouredCard
                        title={"Scientific Name"}
                        color={"lightblue"}
                        value={"Leos"}
                    />
                    <ColouredCard
                        title={"Taxonomic Class"}
                        color={"orange"}
                        value={"Mammalia"}
                    />
                    <ColouredCard
                        title={"Taxonomic Class"}
                        color={"yellow"}
                        value={"Mammalia"}
                    />
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Density Map
                    </h2>
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
                            data={mapData}
                        >
                            <Layer {...heatmapLayerStyle}></Layer>
                            <Layer {...pointLayerStyle}></Layer>
                        </Source>
                    </Map>
                    ;
                </div>
            </div>
        </div>
    );
};

export default SpeciesDetailsPage;
