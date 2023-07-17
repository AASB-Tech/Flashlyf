"use client"

/*
    This context is used to determine if the component is running on the client side or the server side.
*/

/*
    Example usage:  

    const isClient = useIsClient();
    return (
        <>
        {scrollPosition >= 0 && <FirstModule />}

        {isClient && scrollPosition >= window.innerHeight * 2 && <SecondModule />}
        </>
    );
*/

import { createContext, useContext, useEffect, useState } from "react";

const IsClientCtx = createContext(false);

export const IsClientCtxProvider = ({ children }) => {
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => 
        setIsClient(true), 
    []);

    return (
        <IsClientCtx.Provider value={isClient}>{children}</IsClientCtx.Provider>
    );
};

export function useIsClient() {
    return useContext(IsClientCtx);
}
