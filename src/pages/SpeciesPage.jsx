import CardGrid from "../components/CardGrid";
import SideBar from "../components/SideBar";
import { getSpecies } from "../api";
import { useQuery } from "@tanstack/react-query";
import LoadingIcon from "../components/LoadingIcon";

const SpeciesPage = () => {
    const { data: speciesListData, isLoading } = useQuery({
        queryKey: ["getallspecies"],
        queryFn: getSpecies,
    });

    return (
        <div className="flex flex-col md:flex-row">
            <SideBar type={"species"} />
            {isLoading ? (
                <LoadingIcon />
            ) : speciesListData.data.length > 0 ? (
                <CardGrid data={speciesListData.data} resource={"species"} />
            ) : (
                <div>No species found</div>
            )}
        </div>
    );
};

export default SpeciesPage;
