import SearchBar from "./SearchBar";
import FilterContent from "./FilterContent";
import { useState } from "react";

import FilterIcon from "../assets/filter.png";
import CancelIcon from "../assets/cancel.png";

const SideBar = ({ type }) => {
    const [mobileFilterVisible, setMobileFilterVisible] = useState(false);

    return (
        <div className="md:h-screen bg-gray-100 shadow-lg p-2 sticky top-0 sm:block h-24">
            <div className="flex flex-row justify-evenly">
                <SearchBar />
                <button
                    className="md:hidden"
                    onClick={() => {
                        setMobileFilterVisible(!mobileFilterVisible);
                        console.log(mobileFilterVisible);
                    }}
                >
                    <img
                        src={mobileFilterVisible ? CancelIcon : FilterIcon}
                        className="size-6"
                        alt=""
                    />
                </button>
            </div>

            <FilterContent type={type} viewFilter={mobileFilterVisible} />
        </div>
    );
};

export default SideBar;
