import React, { createContext, useContext, useState } from "react";

const CalendarContext = createContext();

function CalendarContextProvider({ children }) {
    const [open, setOpen] = useState(false);
    return (
        <CalendarContext.Provider value={[open, setOpen]}>
                {children}
        </CalendarContext.Provider>
    );
};


export function useCalendar() {
    return useContext(CalendarContext);
}

export default CalendarContextProvider;
