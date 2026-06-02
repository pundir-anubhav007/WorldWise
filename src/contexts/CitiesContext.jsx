import { createContext} from "react";

const CitiesContext =  createContext

function CitiesProvider ({children}) {
    return (
        <CitiesContext.Provider>{children}</CitiesContext.Provider>
    )
}


export { CitiesProvider,CitiesContext };