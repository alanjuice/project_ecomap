import SearchBar from "./SearchBar";
import FilterContent from "./FilterContent";
import { useState } from "react";

const SideBar = () => {
    const [mobileFilterVisible,setMobileFilterVisible] = useState(false)

  return (
    <div className="md:h-screen bg-gray-100 shadow-lg p-2 space-y-6 sticky top-0 sm:block h-24">
        <div className="flex flex-row">
        <SearchBar/>
            <button className="md:hidden" onClick={()=>{setMobileFilterVisible(!mobileFilterVisible)
            console.log(mobileFilterVisible)
            }}>View</button>
        </div>
        
        <FilterContent type={"species"} viewFilter={mobileFilterVisible}/>
    </div>
  );
};

export default SideBar;
