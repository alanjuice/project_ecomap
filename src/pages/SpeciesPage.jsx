import CardGrid from "../components/CardGrid";
import SideBar from "../components/SideBar";
import { getSpecies } from "../api";
import { useQuery } from "@tanstack/react-query";
import LoadingIcon from "../components/LoadingIcon";
import Error from "../components/Error";

const SpeciesPage = () => {
    const {
        data: speciesListData,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ["getallspecies"],
        queryFn: getSpecies,
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
                <div>No species found</div>
            )}
        </div>
    );
};

export default SpeciesPage;
