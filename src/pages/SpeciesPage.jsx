import CardGrid from "../components/CardGrid";
import { speciesMinimialData } from "../utils/mockData";
import SideBar from "../components/SideBar";
import { getSpecies } from "../api";
import { useEffect, useState } from "react";

const SpeciesPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [speciesListData, setSpeciesListData] = useState(true);

    const getData = async () => {
        const response = await getSpecies();
        const mappedData = response.data.map((item) => ({
            id: item._id,
            label: item.common_name,
            imageUrl: item.photoUrl,
        }));
        setSpeciesListData(mappedData);
        setIsLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex flex-col md:flex-row">
            <SideBar type={"species"} />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <CardGrid data={speciesListData} resource={"species"} />
            )}
        </div>
    );
};

export default SpeciesPage;
