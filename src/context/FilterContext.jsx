import React, { createContext, useState, useContext, useEffect } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filter, setFilter] = useState({
        searchTerm: "",
    });

    const updateFilter = (newFilter) => {
        setFilter((prev) => ({ ...prev, ...newFilter }));
    };

    useEffect(() => {
        console.log(filter);
    }, [filter]);

    return (
        <FilterContext.Provider
            value={{
                filter,
                updateFilter,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    return useContext(FilterContext);
};
