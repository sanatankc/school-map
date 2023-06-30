'use client';

import SchoolMap from "./components/Map";
import React from 'react'
import SearchBox from './components/SearchBox'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import schools, { markerColor } from './schools';
import Toolbar from './components/Toolbar';


export default function Home() {
  const [selected, setSelected] = React.useState<number>(-1);
  const [radius, setRadius] = React.useState<number>(6);

  return (
    <div className='flex flex-col w-screen h-screen'>
      <SearchBox 
        setSelectedSchool={setSelected}
        schools={schools}
      />
      <div className='flex flex-row w-screen overflow-hidden flex-1'>
        <Toolbar selected={selected} radius={radius} setRadius={setRadius} />
        <SchoolMap selected={selected} setSelected={setSelected} radius={radius} />
      </div>
    </div>
  )
}
