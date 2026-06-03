import { useSearchParams } from "react-router-dom";

function useUrlPositions() {
  const [searchParams] = useSearchParams();

  const Lat = Number(searchParams.get("lat"));
  const Lng = Number(searchParams.get("lng"));

return [Lat, Lng]
}

export default useUrlPositions;