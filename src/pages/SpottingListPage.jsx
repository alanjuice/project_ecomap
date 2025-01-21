import { useQuery } from "@tanstack/react-query";
import CardGrid from "../components/CardGrid";
import { getSpottings } from "../api";

const SpottingListPage = () => {
    const { data: spottingListData, isLoading } = useQuery({
        queryKey: ["getallspottings"],
        queryFn: getSpottings,
    });
    console.log(spottingListData);

    if (isLoading) {
        return <>Loading</>;
    }
    return (
        <div className="flex flex-col md:flex-row">
            {isLoading ? (
                <p>Loading...</p>
            ) : spottingListData.length > 0 ? (
                <CardGrid
                    data={spottingListData}
                    resource={"expert/spotting"}
                />
            ) : (
                <div>No spottings found</div>
            )}
        </div>
    );
};

export default SpottingListPage;
