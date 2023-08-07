import useDotStore from "@/app/store";
import { getRevenue } from "@/app/utils";
import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Text,
  CartesianGrid,
  Tooltip
} from "recharts";

// import "./styles.css";

const blues = [
  ["#457AA6"],
  ["#457AA6", "#E3EBF2"],
  ["#264F73", "#457AA6", "#E3EBF2"],
  ["#264F73", "#457AA6", "#A2BBD2", "#E3EBF2"],
  ["#1A334A", "#264F73", "#457AA6", "#A2BBD2", "#E3EBF2"]
];

const getColor = (length, index) => {
  if (length <= blues.length) {
    return blues[length - 1][index];
  }

  return blues[blues.length - 1][index % blues.length];
};


const YAxisLeftTick = ({ y, payload: { value } }) => {
  return (
    <Text x={0} y={y} textAnchor="start" verticalAnchor="middle" scaleToFit>
      {value}
    </Text>
  );
};

let ctx;

export const measureText14HelveticaNeue = text => {
  if (!ctx) {
    ctx = document.createElement("canvas").getContext("2d");
    ctx.font = "14px 'Helvetica Neue";
  }

  return ctx.measureText(text).width;
};

const BAR_AXIS_SPACE = 10;


let xKey="name"
let yKey="pv"
const CompetitorAnalysis = () => {
  let schools = useDotStore((state) => state.schools)

  schools = schools.map((school) => ({
    ...school,
    revenue: getRevenue(school)
  }))

  let xKey="name"
  let yKey="revenue"

  const maxTextWidth = useMemo(
    () =>
    schools.reduce((acc, cur) => {
        const value = cur[yKey];
        const width = measureText14HelveticaNeue(value.toLocaleString());
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    [schools, yKey]
  );

  return (
    <ResponsiveContainer width={"100%"} height={50 * schools.length} debounce={50}>
      <BarChart
        data={schools}
        layout="vertical"
        margin={{ left: 10, right: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis axisLine={false} orientation="top" type="number" />
        <YAxis
          yAxisId={0}
          dataKey={xKey}
          type="category"
          width={300}
        />
        <Tooltip />
        {/* <YAxis
          orientation="left"
          yAxisId={1}
          dataKey={yKey}
          type="category"
          tickFormatter={value => value.toLocaleString()}
          mirror
        /> */}
        <Bar dataKey={yKey} minPointSize={2} barSize={32}>
          {schools.map((d, idx) => {
            return <Cell key={d[xKey]} fill={getColor(schools.length, idx)} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CompetitorAnalysis;