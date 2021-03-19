import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl, MenuItem } from "@material-ui/core";
import style from "./CountryPicker.module.css";
import { countries } from "../../api";
const CountryPicker = ({ changeCountry }) => {
  const [fetchCountries, setFetchCountries] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setFetchCountries(await countries());
    };
    getData();
  }, [countries()]);

  return (
    <FormControl className={style.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => changeCountry(e.target.value)}
      >
        <option value="">Global</option>
        {fetchCountries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
export default CountryPicker;
