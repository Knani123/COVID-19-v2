import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import style from "./Chart.module.css";
const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const url = "https://covid19.mathdro.id/api";
  //daily
  const [daily, setDaily] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${url}/daily`)
        .then(({ data }) => {
          setDaily(data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)"
            ],
            data: [confirmed.value, recovered.value, deaths.value]
          }
        ]
      }}
      options={{
        legend: { dispalay: false },
        title: { display: true, text: `Current state in ${country}` }
      }}
    />
  ) : null;

  const lineChart = daily[0] ? (
    <Line
      data={{
        labels: daily.map(({ reportDate }) => reportDate),
        datasets: [
          {
            data: daily.map(({ confirmed }) => confirmed.total),
            label: "infected",
            borderColor: "#3333ff",
            fill: true
          },
          {
            data: daily.map(({ deaths }) => deaths.total),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true
          }
        ]
      }}
    />
  ) : null;
  return (
    <div className={style.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
