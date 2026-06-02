import styles from './Map.module.css'
import { useNavigate } from 'react-router-dom';

export default function Map() {
  const navigate = useNavigate()

  return (
  <>
  <div className={styles.mapContainer} onClick={() => navigate("form")}>Map</div>;
  </>
  )
}
