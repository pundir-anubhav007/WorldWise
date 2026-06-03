import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import styles from "./Map.module.css";
import useCities from "../hooks/citiesHook";
import { useSearchParams } from "react-router-dom";

export default function Map() {
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  const defaultValue = [21.7679, 78.8718];

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={(mapLat !== null && mapLng !== null) ? [mapLat, mapLng] : defaultValue}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter
          position={
            (mapLat !== null && mapLng !== null) ? [mapLat, mapLng] : defaultValue
          }
        />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
