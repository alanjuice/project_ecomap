import FilterContent from "../components/FilterContent";
import CardGrid from "../components/CardGrid";
import { occurenceMinimalData } from "../utils/mockData";

const OccurencePage = () => {
    return (
        <>
            <div className="flex ">
                <FilterContent type={"occurrence"}/>
                <CardGrid data={occurenceMinimalData} resource={"occurence"} />
            </div>
        </>
    );
};

export default OccurencePage;
