 import { useEffect } from "react";
import styles from "./City.module.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import useCities from "../hooks/citiesHook";
import Button from './Button'
import Spinner from './Spinner'


function City() {
  const { id } = useParams();

  const { currentCity, getCityDetail, isLoading } = useCities();
  const navigate = useNavigate();


  useEffect(
    function () {
      getCityDetail(id);
    },
    [id, getCityDetail],
  );

  function handleBack(e) {
    e.preventDefault();
    navigate(-1);
  }

  if (isLoading) return <Spinner />;

  const { cityName, emoji, notes } = currentCity;



  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        {/* <p>{formatDate(date || null)}</p> */}
      </div>
      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}
      <div className={styles.row}>
        <Link to={`https://en.wikipedia.org/wiki/${cityName}`} target="_blank">
          Check out {cityName} on Wikipedia &rarr;{" "}
        </Link>
      </div>
      <div>
        <Button type="back" onClick={handleBack}>
          {" "}
          &larr; back{" "}
        </Button>
      </div>
    </div>
  );
}

export default City;
