import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
    console.log(localStorage.getItem('token'));
    const [token, setToken] = useState(localStorage.getItem('token'));
    return (
        <AuthContext.Provider value={[token, setToken]}>
            {children}
        </AuthContext.Provider>
    );
};


export function useAuth() {
    return useContext(AuthContext);
}

export default AuthContextProvider;
