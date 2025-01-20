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
        <div className="">
            <CardGrid data={spottingListData} resource={"expert/spottings"} />
        </div>
    );
};

export default SpottingListPage;
