import CardGrid from "../components/CardGrid";
import { speciesMinimialData } from "../utils/mockData";
import SideBar from "../components/SideBar";

const SpeciesPage = () => {
    const speciesData = speciesMinimialData;

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <SideBar type={"species"}/>
                <CardGrid data={speciesMinimialData} resource={"species"} />
            </div>
        </>
    );
};

export default SpeciesPage;
