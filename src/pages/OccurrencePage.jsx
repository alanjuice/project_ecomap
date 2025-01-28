import CardGrid from "../components/CardGrid";
import SideBar from "../components/SideBar";
import { getOccurence } from "../api";
import { useQuery } from "@tanstack/react-query";
import LoadingIcon from "../components/LoadingIcon";
import Error from "../components/Error";
import FilterContent from "../components/FilterContent";
import { FilterProvider, useFilter } from "../context/FilterContext";

const OccurenceContent = () => {
    const { filter } = useFilter();

    const {
        data: occurenceListData,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ["getalloccurences", filter],
        queryFn: () => getOccurence(filter),
    });

    if (isError) {
        return <Error message={error.message} />;
    }

    return (
        <div className="flex flex-col md:flex-row">
            <SideBar type={"occurence"} />
            {isLoading ? (
                <LoadingIcon />
            ) : occurenceListData.data.length > 0 ? (
                <CardGrid
                    data={occurenceListData.data}
                    resource={"occurence"}
                />
            ) : (
                <div>No occurence found</div>
            )}
        </div>
    );
};

export default function OccurrencePage() {
    return (
        <FilterProvider>
            <OccurenceContent />
        </FilterProvider>
    );
}
