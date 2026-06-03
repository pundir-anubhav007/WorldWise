// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import SpinnerFullPage from "./SpinnerFullPage";
import Message from "./Message";
import { useNavigate } from "react-router-dom";
import useUrlPositions from "../hooks/urlForm";

//  function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [isLoadingGeoCodingData, setIsLoadingGeoCodingData] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const [geoCodingError, setGeoCodingError] = useState("");
  console.log(geoCodingError);

  const navigate = useNavigate();
  const [Lat, Lng] = useUrlPositions();

  // const emoji = convertToEmoji(countryEmoji)

  useEffect(
    function () {
      if (!Lat && !Lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingGeoCodingData(true);
          setGeoCodingError("");

          const res = await fetch(
            `${BASE_URL}?latitude=${Lat}&longitude=${Lng}`,
          );
          console.log(`${BASE_URL}?latitude=${Lat}&longitude=${Lng}`);

          const data = await res.json();

          if (data.countryCode === "")
            throw new Error(
              "This doesn't seem to be a country. Try clicking somewhere else.",
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
        } catch (err) {
          setGeoCodingError(err.message);
        } finally {
          setIsLoadingGeoCodingData(false);
        }
      }
      fetchCityData();
    },
    [Lat, Lng],
  );

  function handleBack(e) {
    e.preventDefault();
    navigate("/app");
  }

  if (!Lat && !Lng)
    return <Message message={"Start by clicking somewhere on the map 🛩️"} />;

  if (isLoadingGeoCodingData) return <SpinnerFullPage />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary"> Add </Button>
        <Button type="back" onClick={handleBack}>
          {" "}
          &larr; back{" "}
        </Button>
      </div>
    </form>
  );
}

export default Form;
