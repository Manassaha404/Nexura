import { createContext, useState } from "react";


export const SearchContext = createContext();
const Context = ({ children }) => {
    const [data, setdata] = useState([]);
    return (
        <SearchContext.Provider value={{ data, setdata }}>
            {children}
        </SearchContext.Provider>
    );
};

export default Context;