import CardGrid from "../../components/CardGrid";
import SideBar from "./SideBar";
import { getSpecies } from "../../api";
import { useQuery } from "@tanstack/react-query";
import LoadingIcon from "../../components/LoadingIcon";
import Error from "../../components/Error";
import { FilterProvider, useFilter } from "../../context/FilterContext";
import NoResourceFound from "../../components/NoResourceFound";

const SpeciesContent = () => {
    const { filter } = useFilter();

    const {
        data: speciesListData,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ["getallspecies", filter],
        queryFn: () => getSpecies(filter),
    });

    if (isError) {
        return <Error message={error.message} />;
    }

    return (
        <div className="flex flex-col md:flex-row">
            <SideBar type={"species"} />
            {isLoading ? (
                <LoadingIcon />
            ) : speciesListData.data.length > 0 ? (
                <CardGrid data={speciesListData.data} resource={"species"} />
            ) : (
                <NoResourceFound resource={"Species"} />
            )}
        </div>
    );
};

export default function Species() {
    return (
        <FilterProvider>
            <SpeciesContent />
        </FilterProvider>
    );
}
