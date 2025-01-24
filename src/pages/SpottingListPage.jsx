import { useQuery } from "@tanstack/react-query";
import CardGrid from "../components/CardGrid";
import { getSpottings } from "../api";
import LoadingIcon from "../components/LoadingIcon";
import Error from "../components/Error";

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
            {isLoading ? (
                <p>Loading...</p>
            ) : spottingListData.data.length > 0 ? (
                <CardGrid
                    data={spottingListData.data}
                    resource={"expert/spottings"}
                />
            ) : (
                <div>No spottings found</div>
            )}
        </div>
    );
};

export default SpottingListPage;
