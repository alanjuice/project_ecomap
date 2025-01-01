import CardGrid from "../components/CardGrid";
import FilterContent from "../components/FilterContent";
import { speciesMinimialData } from "../utils/mockData";

const SpeciesPage = () => {
    const speciesData = speciesMinimialData;

    return (
        <>
            <div className="flex ">
                <FilterContent />
                <CardGrid data={speciesData} resource={"species"} />
            </div>
        </>
    );
};

export default SpeciesPage;
