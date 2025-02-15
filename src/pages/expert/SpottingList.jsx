import { useQuery } from "@tanstack/react-query";

import { getSpottings } from "../../api";

import LoadingIcon from "../../components/LoadingIcon";
import Error from "../../components/Error";
import NoResourceFound from "../../components/NoResourceFound";
import CardGrid from "../../components/CardGrid";

const SpottingList = () => {
  const {
    data: spottingListData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["getallspottings"],
    queryFn: getSpottings,
  });

  if (isError) {
    return <Error message={error.message} />;
  }

  if (isLoading) {
    return (
      <>
        <LoadingIcon />
      </>
    );
  }

  if (!spottingListData.data.length > 0) {
    return <NoResourceFound resource={"Spotting"} />;
  }
  
  return (
    <div className="flex flex-col md:flex-row">
      <CardGrid data={spottingListData.data} resource={"expert/spottings"} imageScale={2}/>
    </div>
  );
};

export default SpottingList;
