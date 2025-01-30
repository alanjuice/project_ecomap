import { useQuery } from "@tanstack/react-query";
import CardGrid from "../components/CardGrid";
import { getSpottings } from "../api";
import LoadingIcon from "../components/LoadingIcon";
import Error from "../components/Error";
import NoResourceFound from "../components/NoResourceFound";

const SpottingListPage = () => {
    const {
        data: spottingListData,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ["getallspottings"],
        queryFn: getSpottings,
    });

    if (isError) {
        return <Error message={error.message} />;
    }

    if (isLoading) {
        return (
            <>
                <LoadingIcon />
            </>
        );
    }
    return (
        <div className="flex flex-col md:flex-row">
            {spottingListData.data.length > 0 ? (
                <CardGrid
                    data={spottingListData.data}
                    resource={"expert/spottings"}
                />
            ) : (
                <NoResourceFound resource={"Spotting"} />
            )}
        </div>
    );
};

export default SpottingListPage;
