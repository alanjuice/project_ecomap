import CardGrid from "../components/CardGrid";
import SearchSpecies from "../components/SearchSpecies";

const SpeciesPage = () => {
  return (
    <>
      <div className="flex ">
        <SearchSpecies />
        <CardGrid/>
      </div>
    </>
  );
};

export default SpeciesPage;
