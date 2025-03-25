import { getOccurence } from "../../api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FilterProvider, useFilter } from "../../context/FilterContext";
import NoResourceFound from "../../components/NoResourceFound";
import CardGrid from "../../components/CardGrid";
import SideBar from "./SideBar";
import LoadingIcon from "../../components/LoadingIcon";
import Error from "../../components/Error";

const OccurenceContent = () => {
    const { filter } = useFilter();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ["getalloccurences", filter],
        queryFn: ({ pageParam = 1 }) =>
            getOccurence({ ...filter, page: pageParam }),
        getNextPageParam: (data) => {
            console.log(data);
            const { page, totalPages } = data.data;
            return page < totalPages ? page + 1 : undefined;
        },
    });

    const occurenceItems =
        data?.pages.flatMap((page) => page.data?.data || []) || [];

    if (isError) return <Error error={error} />;

    return (
        <div className="flex flex-col md:flex-row">
            <SideBar type={"occurence"} />
            <div className="w-full">
                {isLoading ? (
                    <LoadingIcon />
                ) : occurenceItems.length > 0 ? (
                    <>
                        <CardGrid
                            data={occurenceItems}
                            resource={"occurence"}
                        />

                        {/* Load More Button */}
                        {hasNextPage && (
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50 my-2"
                                >
                                    {isFetchingNextPage
                                        ? "Loading..."
                                        : "Load More"}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <NoResourceFound resource={"Occurence"} />
                )}
            </div>
        </div>
    );
};

export default function Occurrence() {
    return (
        <FilterProvider>
            <OccurenceContent />
        </FilterProvider>
    );
}
