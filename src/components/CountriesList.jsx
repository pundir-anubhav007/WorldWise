import styles from './CountriesList.module.css'
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem'

function CountriesList({ cities, loading }) {
  if (loading) return <Spinner />;

  if (!cities.length === 0)
    return <Message message="Add your first city by clicking on the Map" />;

  const countries = cities.reduce((acc, cur) => {
    if(!acc.map(el => el.country).includes(cur.country))

      return [...acc,{country: cur.country, emoji: cur.emoji}]

      else {
        return acc
      }

  },[])

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => {
        return <CountryItem country={country} />;
      })}
    </ul>
  );
}
export default CountriesList