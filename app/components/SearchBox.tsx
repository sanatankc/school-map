import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { School } from '../schools'
import Image from 'next/image'
import logo from '../logo.jpg'

interface Props {
  schools: School[],
  setSelectedSchool: (newValue: number) => void,
}

const SearchBox = ({ setSelectedSchool, schools }: Props)  => {
  console.log(schools.length)
  return (
    <div className='p-4 w-full bg-white flex justify-between border-box'>
       <Image src={logo} alt="Logo" width={60} height={60} className='rounded-lg'  />
       <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={schools}
        onChange={(event, newValue) => {
          setSelectedSchool(newValue?.id || -1)
        }}
        filterOptions={(options, state) => {
          return options.filter((option) => option.name.replaceAll('.', '').toLowerCase().includes(state.inputValue.toLowerCase()))
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select School" />}
      />
      <div />
    </div>
  )
}

export default SearchBox