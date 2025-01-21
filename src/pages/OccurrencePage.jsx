import CardGrid from "../components/CardGrid";
import SideBar from "../components/SideBar";
import { getOccurence } from "../api";
import { useQuery } from "@tanstack/react-query";

const OccurencePage = () => {
    const { data: occurenceListData, isLoading } = useQuery({
        queryKey: ["getalloccurences"],
        queryFn: getOccurence,
    });

    return (
        <div className="flex flex-col md:flex-row">
            <SideBar type={"species"} />
            {isLoading ? (
                <p>Loading...</p>
            ) : occurenceListData.length > 0 ? (
                <CardGrid data={occurenceListData} resource={"occurence"} />
            ) : (
                <div>No occurence found</div>
            )}
        </div>
    );
};

export default OccurencePage;
