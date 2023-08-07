'use client';

import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import Map from './components/Map';
import useDotStore from './store';
import Header from './rootPage/Header';
import CurrentSchoolInfo from './rootPage/CurrentSchoolInfo';
import SchoolTable from './rootPage/SchoolTable';
import SchoolTabsInfo from './rootPage/SchoolTabsInfo';
import Loader from './Loader';

const App = () => {
  const schools = useDotStore((state) => state.schools)
  const radius = useDotStore((state) => state.radius)
  const fetchingSchools = useDotStore((state) => state.fetchingSchools)

  const hasSchools = schools && schools.length > 0 && !fetchingSchools

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAIyVF44QhoXfwwKHLd1h3N49cQTHS0Yvw"
      libraries={[
        'drawing',
        'geometry',
        'places'
      ]}
      loadingElement={
        <div className='w-full h-screen'>
          <Loader />
        </div>
      }
    >
    <div className='px-10'>
      <Header />
    </div>
    {fetchingSchools && (
      <div className='w-full h-screen'>
        <Loader />
      </div>
    )}
    <div className='px-10 flex flex-col min-h-screen pb-10'>
      <CurrentSchoolInfo />

      {hasSchools && (
        <>
          <div className='w-full flex mt-4 gap-4'>
            <div className='flex-1'>
              <SchoolTabsInfo />
            </div>
            <div className='flex-1 w-full min-w-max bg-slate-50 p-2 rounded-md h-[611px]'>
              <Map
                schools={schools.map(school => ({
                  id: school.affiliationCode,
                  ...school,
                }))}
                selected={schools.find((school) => school.isSearchedSchool).affiliationCode}
                setSelected={() => {}}
                radius={radius}
              />
            </div>
          </div>
          <SchoolTable />
        </>
      )}
    </div>
  </LoadScript>
  )
}
export default App

