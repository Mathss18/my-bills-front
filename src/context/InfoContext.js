import React, { createContext, useContext, useState } from "react";

const InfoContext = createContext();

function InfoContextProvider({ children }) {
    const [info, setInfo] = useState({});
    return (
        <InfoContext.Provider value={[info, setInfo]}>
            {children}
        </InfoContext.Provider>
    );
};


export function useInfo() {
    return useContext(InfoContext);
}

export default InfoContextProvider;
