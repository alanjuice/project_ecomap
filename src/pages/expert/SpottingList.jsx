import { useInfiniteQuery } from "@tanstack/react-query";
import { getSpottings } from "../../api";

import LoadingIcon from "../../components/LoadingIcon";
import Error from "../../components/Error";
import NoResourceFound from "../../components/NoResourceFound";
import CardGrid from "../../components/CardGrid";
import { Button } from "@/components/ui/button";

const SpottingList = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ["getallspottings"],
        queryFn: ({ pageParam = 1 }) => getSpottings({ page: pageParam }),
        getNextPageParam: (data) => {
            const { page, totalPages } = data.data;
            return page < totalPages ? page + 1 : undefined;
        },
    });

    const spottingItems =
        data?.pages.flatMap((page) => page.data?.data || []) || [];

    if (isError) return <Error message={error.message} />;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen w-screen">
                <LoadingIcon />
            </div>
        );
    }

    if (!spottingItems.length) {
        return <NoResourceFound resource={"Spotting"} />;
    }

    return (
        <div className="flex flex-col">
            <CardGrid
                data={spottingItems}
                resource={"expert/spottings"}
                imageScale={2}
            />

            {/* Load More Button */}
            {hasNextPage && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50 my-2"
                    >
                        {isFetchingNextPage ? "Loading..." : "Load More"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default SpottingList;
