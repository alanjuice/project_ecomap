import CardGrid from "../components/CardGrid";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { getSpecies } from "../api";

const SpeciesPage = () => {
    const [speciesData, setSpeciesData] = useState([]);

    useEffect(() => {
        getSpeciesData();
    }, []);

    const getSpeciesData = async () => {
        const response = await getSpecies();
        console.log(response);
        setSpeciesData(response.data);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <SideBar type={"species"} />
                <CardGrid data={speciesData} resource={"species"} />
            </div>
        </>
    );
};

export default SpeciesPage;
