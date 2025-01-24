import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Map, Marker } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import LoadingIcon from "../components/LoadingIcon";

import ColouredCard from "../components/ColouredCard";
import { getOccurencebyId } from "../api";
import { useQuery } from "@tanstack/react-query";
import Error from "../components/Error";

const OccurenceDetailsPage = () => {
    const { id } = useParams();

    const {
        data: occurenceData,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ["getOccurenceById"],
        queryFn: () => getOccurencebyId(id),
    });

    if (isError) {
        return <Error message={error.message} />;
    }

    if (isLoading) {
        return <LoadingIcon />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}

            <div className="relative w-full h-96 bg-gradient-to-br from-gray-800 to-gray-600">
                <img
                    src={
                        occurenceData.data.image ||
                        "https://placehold.co/600x400"
                    }
                    alt={occurenceData.data.speciesId.common_name}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                    <h1 className="text-4xl font-extrabold mb-2">
                        {occurenceData.data.speciesId.name}
                    </h1>
                    <h2 className="text-lg font-semibold italic">
                        {occurenceData.data.speciesId.scientific_name}
                    </h2>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto p-6 space-y-8">
                {/* Info Grid */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Taxonomic Class */}
                    <ColouredCard
                        title={"Spotted By"}
                        color={"lightgreen"}
                        value={occurenceData.data.userId.name}
                    />

                    <ColouredCard
                        title={"Spotted At"}
                        color={"orange"}
                        value={occurenceData.data.spotId.date}
                    />
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Spotted At
                    </h2>
                    <Map
                        initialViewState={{
                            longitude: 78.9629,
                            latitude: 78.9629,
                            zoom: 4,
                        }}
                        style={{ width: "100%", height: 500 }}
                        mapStyle="https://demotiles.maplibre.org/style.json"
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
                        ></Marker>
                    </Map>
                    ;
                </div>
            </div>
        </div>
    );
};

export default OccurenceDetailsPage;
