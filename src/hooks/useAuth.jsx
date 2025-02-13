import { createContext, useContext } from 'react';


export const myContext = createContext();

export const useFirebaseAuth = () => {
    return useContext(myContext)  || {};
};