import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Map, Marker } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import { heatmapLayerStyle, pointLayerStyle } from "../utils/MapLayerStyle";

const OccurenceDetailsPage = () => {
    const { id } = useParams();

    const [occurenceData, setOccurenceData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getOccurenceData = (id) => {
        useEffect(() => {
            // Simulate fetching data based on species ID
            console.log("Fetching details of Occurence id: " + id);

            // Example data for now

            const data = {
                Occurence_ID: 1,
                Common_Name: "Lion",
                Scientific_Name: "Panthera leo",
                Image_URL:
                    "https://upload.wikimedia.org/wikipedia/commons/3/3f/Walking_tiger_female.jpg",
                Coordinates: [78, 20],
                Date_Spotted: "19-01-2022",
                Spotted_By: "Alfredo",
            };

            setOccurenceData(data);
            setIsLoading(false);
        }, [id]);
    };

    getOccurenceData(id);

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
                    src={occurenceData.Image_URL}
                    alt={occurenceData.Common_Name}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                    <h1 className="text-4xl font-extrabold mb-2">
                        {occurenceData.Common_Name}
                    </h1>
                    <h2 className="text-lg font-semibold italic">
                        {occurenceData.Scientific_Name}
                    </h2>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto p-6 space-y-8">
                {/* Info Grid */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Taxonomic Class */}
                    <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-indigo-500">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Spotted By
                        </h3>
                        <p className="text-2xl font-bold text-gray-900">
                            {occurenceData.Spotted_By}
                        </p>
                    </div>

                    {/* Scientific Name */}
                    <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-yellow-500">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Spotted At
                        </h3>
                        <p className="text-2xl font-bold text-gray-900">
                            {occurenceData.Date_Spotted}
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Spotted At
                    </h2>
                    <Map
                        initialViewState={{
                            longitude: 78.9629,
                            latitude: 20.5937,
                            zoom: 4,
                        }}
                        style={{ width: "100%", height: 500 }}
                        mapStyle="https://demotiles.maplibre.org/style.json"
                    >
                        <Marker
                            longitude={occurenceData.Coordinates[0]}
                            latitude={occurenceData.Coordinates[1]}
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
