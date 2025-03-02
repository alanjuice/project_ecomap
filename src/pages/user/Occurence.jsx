import { getOccurence } from "../../api";
import { useQuery } from "@tanstack/react-query";

import { FilterProvider, useFilter } from "../../context/FilterContext";

import NoResourceFound from "../../components/NoResourceFound";
import CardGrid from "../../components/CardGrid";
import SideBar from "./SideBar";
import LoadingIcon from "../../components/LoadingIcon";
import Error from "../../components/Error";

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
                <NoResourceFound resource={"Occurence"} />
            )}
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
