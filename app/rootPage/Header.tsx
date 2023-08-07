import Image from 'next/image'
import React, { useRef } from 'react'
import { Autocomplete } from '@react-google-maps/api';

import logo from '../../public/img/logo.png'

import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import SearchSchool from './SearchSchool'

import useDotStore from '../store'
import { 
  forceLink
} from '../utils';


const Header = () => {
  const schools = useDotStore((state) => state.schools)
  const getSchools = useDotStore((state) => state.getSchools)

  const radius = useDotStore((state) => state.radius)
  const setRadius = useDotStore((state) => state.setRadius)
  const currentSchool = schools.find((school) => school.isSearchedSchool)
  const fetchingSchools = useDotStore((state) => state.fetchingSchools)
  const hasSchools = schools && schools.length > 0 && !fetchingSchools

  const autocompleteRef = useRef(null);
  const onLoad = (autocomplete: any) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      console.log(autocompleteRef.current.getPlace());
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <div className='w-full border-b py-4'>
        <div className='flex flex-row justify-between items-center w-full'>
          <div className='flex flex-row items-center min-w-fit'>
            <div className="min-w-[74.65px] min-h-[74.65px] relative">
              <Image
                alt="The Dot Studio Logo"
                src={logo}
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          <div className="min-w-fit cotext-slate-900 text-2xl ml-3 font-bold leading-loose">The Map</div>
          </div>
          <div className='flex flex-row items-end'>
            <SearchSchool onSubmit={(affiliationCode: string) => {
              getSchools(affiliationCode, radius)
            }} />
            <div className="text-black text-base font-normal leading-normal relative -top-3 mx-6">or</div>

            {/* <div className="text-slate-500 text-sm font-medium leading-tight relative -top-4 mx-6">or</div> */}
            {/* <span class=''>or</span> */}
            <div>
              <Label htmlFor={'location'} className="text-slate-500 text-sm font-medium mb-2 block">
                Location
              </Label>
              <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
              >
                <Input placeholder='Search Location' id='location' className='w-[300px]' />
              </Autocomplete>
            </div>
            <div className='ml-12'>
              <Label htmlFor={'radius'} className="text-slate-500 text-sm font-medium mb-2 block">Radius</Label>
              <Input id='radius' type='number' min="1" max="30" className='w-16 h-12' value={radius} onChange={(e) => {
                setRadius(Number(e.target.value))
              }} />
            </div>
            <div className="text-black text-base font-normal leading-normal ml-3 relative -top-3">km</div>
            <Button className='ml-12'>Search</Button>
          </div>
          {hasSchools ? (
            <a className="text-indigo-500 text-sm gap-2 font-medium leading-normal min-w-fit h-6 border-b border-indigo-500 flex flex-row" href={forceLink(currentSchool.website)} target="_blank">
              <span>Launch School Website</span>
              <div className="w-5 h-5 relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <path d="M4.27344 10.5H16.0426" stroke="#6165CE" stroke-width="1.68131" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10.1562 4.61621L16.0409 10.5008L10.1562 16.3854" stroke="#6165CE" stroke-width="1.68131" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </a>
          ) : <div />}
        </div>
      </div>    
  )
}

export default Header