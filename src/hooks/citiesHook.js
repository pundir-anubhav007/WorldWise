import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesContext";

function useCities() {
  const context = useContext(CitiesContext);
  if (!context) throw new Error("Context access outside provider");

  return context;
}

export default useCities;
