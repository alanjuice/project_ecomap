import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Map, Layer, Source } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import ColouredCard from "../components/ColouredCard";
import { getMapData, getSpeciesbyId, getSpeciesDatabyID } from "../api";

import { heatmapLayerStyle, pointLayerStyle } from "../utils/MapLayerStyle";
import LoadingIcon from "../components/LoadingIcon";
import { useQuery } from "@tanstack/react-query";
import Error from "../components/Error";

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
        queryFn: getMapData,
    });

    console.log(speciesData);

    if (isError || isMapError) {
        return <Error message={"Something went wrong"} />;
    }

    if (isLoading || isMapLoading) {
        return <LoadingIcon />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative w-full h-96 bg-gradient-to-br from-gray-800 to-gray-600">
                <img
                    src={speciesData.data.image}
                    alt={speciesData.data.common_name}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                    <h1 className="text-4xl font-extrabold mb-2">
                        {speciesData.data.common_name}
                    </h1>
                    <h2 className="text-lg font-semibold italic">
                        {speciesData.data.scientific_name}
                    </h2>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto p-6 space-y-8">
                {/* Info Grid */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ColouredCard
                        title={"Common Name"}
                        color={"yellow"}
                        value={speciesData.data.common_name}
                    />
                    <ColouredCard
                        title={"Scientific Name"}
                        color={"lightblue"}
                        value={speciesData.data.scientific_name}
                    />
                    <ColouredCard
                        title={"Taxonomic Class"}
                        color={"orange"}
                        value={speciesData.data.taxonomy_class || "NA"}
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
                        {console.log(mapData)}
                        <Source
                            id="species-locations"
                            type="geojson"
                            data={mapData.data}
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
