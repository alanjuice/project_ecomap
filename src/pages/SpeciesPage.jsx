import CardGrid from "../components/CardGrid";
import FilterContent from "../components/FilterContent";

const SpeciesPage = () => {
  return (
    <>
      <div className="flex ">
        <FilterContent />
        <CardGrid/>
      </div>
    </>
  );
};

export default SpeciesPage;
