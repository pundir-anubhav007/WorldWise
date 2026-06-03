import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import useCities from "../hooks/citiesHook";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGeolocation from "../hooks/geoLocationHook";
import Button from "./Button";
import useUrlPositions from "../hooks/urlForm";

export default function Map() {
  const { cities } = useCities();
  const {
    isLoading: isGeoLoading,
    position: GeoPosition,
    getPosition,
  } = useGeolocation();

    const [mapPosition, setmapPosition] = useState([21.7679, 78.8718]);
  const [mapLat,mapLng] = useUrlPositions()


  useEffect(
    function () {
      function setLocationInMap() {
        if (mapLat !== null && mapLng !== null) {
          setmapPosition([mapLat, mapLng]);
        }
      }
      setLocationInMap();
    },
    [mapLat, mapLng],
  );

  useEffect(
    function () {
      function setLocationInMap() {
        if (GeoPosition) {
          setmapPosition([GeoPosition.lat, GeoPosition.lng]);
        }
      }
      setLocationInMap();
    },
    [GeoPosition],
  );

  return (
    <div className={styles.mapContainer}>
      {!GeoPosition && (
        <Button type="position" onClick={getPosition}>
          {" "}
          {isGeoLoading ? "Loading..." : "Use your Position"}{" "}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={4}
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
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  useEffect(
    function () {
      function MapViewSetter() {
        map.setView(position);
      }
      MapViewSetter();
    },
    [map, position],
  );
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
