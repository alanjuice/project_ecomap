import CardGrid from "../components/CardGrid";
import SideBar from "../components/SideBar";
import { getSpecies } from "../api";
import { useQuery } from "@tanstack/react-query";

const SpeciesPage = () => {
    const { data: speciesListData, isLoading, } = useQuery({
        queryKey: ["getallspecies"],
        queryFn: getSpecies,
    });

    return (
        <div className="flex flex-col md:flex-row">
            <SideBar type={"species"} />
            {isLoading ? (
                <p>Loading...</p>
            ) : speciesListData.length > 0 ? (
                <CardGrid data={speciesListData} resource={"species"} />
            ) : (
                <div>No species found</div>
            )}
        </div>
    );
    
};

export default SpeciesPage;
