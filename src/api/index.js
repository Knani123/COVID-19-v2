import axios from "axios";

const url = "https://covid19.mathdro.id/api/countries";
export const countries = async () => {
  try {
    const {
      data: { countries }
    } = await axios.get(url);
    return countries.map(({ name }) => name);
  } catch (err) {
    console.log(err);
  }
};
