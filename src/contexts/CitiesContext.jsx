import { createContext, useCallback, useEffect, useState} from "react";

const CitiesContext =  createContext()

function CitiesProvider ({children}) {

const [cities, setCity] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [currentCity, setCurrentCity] = useState({});

useEffect(function () {
  async function getCity() {
    setIsLoading(true);
    const res = await fetch("http://localhost:8000/cities");
    const data = await res.json();
    setCity(data);
    setIsLoading(false);
  }
  getCity();
}, []);



const getCityDetail = useCallback(async function getCityDetail(id) {
    setIsLoading(true)
     const res = await fetch(`http://localhost:8000/cities/${id}`);
     const data = await res.json()
     setCurrentCity(data)
     setIsLoading(false)
  },[])





    return (
        <CitiesContext.Provider value={
            {
                cities,
                isLoading,
                currentCity,
                getCityDetail
            }
        }>{children}</CitiesContext.Provider>
    )
}


export { CitiesProvider,CitiesContext };