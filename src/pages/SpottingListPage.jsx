import CardGrid from "../components/CardGrid";
import Pagination from "../components/Pagination";
import { speciesMinimialData } from "../utils/mockData";

const SpottingListPage = () => {
  return (
    <div className="">
      <CardGrid data={speciesMinimialData} resource={"expert/spotting"} />
      <Pagination />
    </div>
  );
};

export default SpottingListPage;
