import SpeciesCard from "./SpeciesCard";

const speciesData = [
  {
    label: "Tiger",
  },
  {
    label: "Peguin",
  },
  {
    label: "Lion",
  },
  {
    label: "Mumal",
  },
  {
    label: "Fish",
  }]


const CardGrid = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
        {speciesData.map((species, index) => (
          <SpeciesCard
            key={index}
            imageUrl={species.imageUrl || "https://placehold.co/400"}
            label={species.label}
          />
        ))}
      </div>
    );
};

export default CardGrid;
