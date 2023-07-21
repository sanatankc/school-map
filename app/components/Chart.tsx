// @ts-nocheck
import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "",
  legend: "none",
  width: 225,
  height: 225,
  chartArea: {
    width: "100%",
    height: "100%",
  }
};

export default function PieChart({ data, colors }) {
  const slice = data.findIndex(row => !!row[2])
  let sliceOptions = {}
  if (slice !== -1) {
    sliceOptions = {
      slices: {
        [slice]: { offset: 0.1 },
      }
    }
  }
  return (
    <Chart
      chartType="PieChart"
      data={[["Task", "Hours per Day"], ...data.map(row => [row[0], Number(row[1].replaceAll(',', ''))])]}
      options={{...options, ...sliceOptions, colors}}
    />
  );
}
