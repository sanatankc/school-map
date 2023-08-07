// @ts-nocheck
import React from "react";
import { Chart } from "react-google-charts";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';


const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const data02 = [
  { name: 'Group A', value: 2400 },
  { name: 'Group B', value: 4567 },
  { name: 'Group C', value: 1398 },
  { name: 'Group D', value: 9800 },
  { name: 'Group E', value: 3908 },
  { name: 'Group F', value: 4800 },
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

interface Props {
  data: any
  colors: string[]
  format: (value: number | string) => string
}

export default function PieChart1 ({ data, colors, format }: Props) {
  // const slice = data.findIndex(row => !!row[2])
  // let sliceOptions = {}
  // if (slice !== -1) {
  //   sliceOptions = {
  //     slices: {
  //       [slice]: { offset: 0.1 },
  //     }
  //   }
  // }
  console.log('data....', data)
  return (
    <div className='w-48 h-48'>
      {/* <Chart
        chartType="PieChart"
        data={data}
        options={{...options, colors}}
      /> */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            cx="50%"
            cy="50%"
            colo
            outerRadius={80}
            fill="#8884d8"
          />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="p-2 rounded-lg shadow-md bg-white">
                    <span className='font-semibold'>{payload[0].name}</span>
                    {': '}
                    <span className=''>{format(payload[0].value)}</span>
                  </div>
                )
              }
              return <div />
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}