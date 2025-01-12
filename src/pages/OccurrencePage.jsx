import CardGrid from "../components/CardGrid";
import { occurenceMinimalData } from "../utils/mockData";
import SideBar from "../components/SideBar";

const OccurencePage = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row">
                <SideBar type={"occurrence"}/>
                <CardGrid data={occurenceMinimalData} resource={"occurence"} />
            </div>
        </>
    );
};

export default OccurencePage;
