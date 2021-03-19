import axios from "axios";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { useEffect, useState } from "react";
export default function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("");

  const url = "https://covid19.mathdro.id/api";
  let changableURL = url;
  if (country) {
    changableURL = `${url}/countries/${country}`;
  }
  //totale
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(changableURL)
        .then(({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
          setData({ confirmed, recovered, deaths, lastUpdate });
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [country]);
  //handle country
  const changeCountry = (mycountry) => {
    setCountry(mycountry);
  };
  return (
    <div className={styles.container}>
      <img
        src="https://i.ibb.co/7QpKsCX/image.png"
        className={styles.img}
        alt="COVID-19"
      />
      <Cards data={data} />
      <CountryPicker changeCountry={changeCountry} />
      <Chart url={changableURL} data={data} country={country} />
    </div>
  );
}
