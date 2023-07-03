// @ts-nocheck
import React from 'react'
import schools, { getSchoolsByRadius } from '../schools'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import OutlinedInput from '@mui/material/OutlinedInput'
import Autocomplete from '@mui/material/Autocomplete'
import { PieChart } from 'react-minimal-pie-chart';
import { Theme, useTheme } from '@mui/material/styles';
import MultipleSelectChip from './ChipSelect'
import Table from './Table'
import Chart from './Chart';

const categories = [
  'A (1,20,000+)',
  'B (80,000 - 1,20,000)',
  'C (40,000 - 80,000)',
  'D (0 - 40,000)',
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(category: string, categories: readonly string[], theme: Theme) {
  console.log('getStyles', category, categories)
  if (!categories || !(categories.length > 0)) return 
  return {
    fontWeight:
      categories.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const f = (value: number) => new Intl.NumberFormat('en-IN').format(Math.floor(value))

const Toolbar = ({ selected, radius, setRadius }: { 
  selected: number, 
  radius: number, 
  setRadius: (radius: number) => void
}) => {
  const theme = useTheme();
  const [selectBy, setSelectBy] = React.useState(1)
  const [category, setCategories] = React.useState<string[]>([
    'A (1,20,000+)',
    'B (80,000 - 1,20,000)',
  ]);
  const [compareSchools, setCompareSchools] = React.useState<number[]>([]);
  if (!(selected > -1)) {
    return <></>
  }

  const selectedSchool = schools.find(school => school.id === selected)

  let schoolsInRadius = getSchoolsByRadius(selectedSchool?.lat, selectedSchool?.long, radius)

  const strippedCategory = category.map(c => c.split(' ')[0])

  schoolsInRadius = schoolsInRadius.filter(school => category.length === 0 || strippedCategory.includes(school.category))
  console.log('schoolsInRadius', schoolsInRadius, category)
  

  const averageRevenue = schoolsInRadius.reduce((acc, school) => acc + school.revenue, 0) / schoolsInRadius.length
  const averageStudentCount = schoolsInRadius.reduce((acc, school) => acc + school.studentCount, 0) / schoolsInRadius.length

  let compareData = {
    [selectedSchool?.name || '']: {
      'Revenue': selectedSchool?.revenue,
      'Student Count': selectedSchool?.studentCount,
      style: {
        border: '1px solid rgba(0, 240, 0, 0.7)',
        backgroundColor: 'rgba(0, 240, 0, 0.2)'
      }
    }
  }

  for (const school of schoolsInRadius) {
    compareData[school?.name || ''] = {
      ...compareData[school?.name || ''],
      'Revenue': school?.revenue,
      'Student Count': school?.studentCount,
    }
  }


  compareData = Object.fromEntries(Object.entries(compareData).sort((a, b) => {
    return (b[1]['Revenue'] as number) - (a[1]['Revenue'] as number)
  }))

  console.log('sortedCompareData ---> ', compareData)
  compareData = Object.fromEntries(Object.entries(compareData).map(([key, value]) => {
    return [key, Object.fromEntries(Object.entries(value).map(([key, value]) => {
      if (key === 'style') return [key, value]
      return [key, f(value as number)]
    }))]
  }))
  
  // compareData = {
  //   'Average School': {
  //     'Revenue': f(averageRevenue),
  //     'Student Count': f(averageStudentCount),
  //     style: {
  //       border: '1px solid #000',
  //     }
  //   },
  //   ...compareData
  // }

  // console.log('compareData ---> ', compareData)
  // console.log('formattedCurrencyCompareData ---> ', formattedCurrencyCompareData)

  return (
    <div id="toolbar" className={"h-screen w-[500px] bg-white z-40 flex flex-col p-6 overflow-scroll -ml-[500px] transition-all pb-32 " + (selected > -1 ? '!ml-0' : '')}>
        <h2 className='font-bold text-gray-500 text-xl min-w-max mb-4'>Details &nbsp;</h2>
      <div className="flex flex-row items-start">
        <h2 className='font-bold flex-1  flex-shrink-0 min-w-max'>Name: &nbsp;</h2>
        <span className="text-sm">{selectedSchool?.name}</span>
      </div>
      <div className="flex flex-row mt-2 items-center">
        <h2 className='font-bold min-w-max'>Year Established: &nbsp;</h2>
        <span className="text-sm">{selectedSchool?.yearEstablished}</span>
      </div>
      <div className="flex flex-row mt-2 items-center">
        <h2 className='font-bold min-w-max'>Total Students: &nbsp;</h2>
        <span className="text-sm">{selectedSchool?.studentCount}</span>
      </div>
      {/* <div className="flex flex-row mt-2 items-center">
        <h2 className='font-bold min-w-max'>Total Teachers: &nbsp;</h2>
        <span className="text-sm">{selectedSchool?.teacherCount}</span>
      </div> */}
      <div className="flex flex-row mt-2 items-center">
        <h2 className='font-bold min-w-max'>Fees: &nbsp;</h2>
        <span className="text-sm">{selectedSchool?.fees}</span>
      </div>
      <div className="flex flex-row mt-2 items-center">
        <h2 className='font-bold min-w-max'>Website: &nbsp;</h2>
        <span className="text-sm">{selectedSchool?.website}</span>
      </div>

      <div className='w-full h-[1px] my-4 bg-black/30'></div>
      <div className="flex flex-row mt-2 items-center justify-between">
        <h2 className='font-bold text-xl min-w-max text-gray-500'>In the Radius &nbsp;</h2>
      </div>

      <div className='w-full h-[1px] my-5 bg-black/30'></div>
      <div className='flex flex-col w-full justify-between items-start'>
        <MultipleSelectChip category={category} setCategories={setCategories} />
      {/* <FormControl size='small' sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={category}
          onChange={(e: SelectChangeEvent<typeof category>) => {
            const {
              target: { value },
            } = event;
            console.log('value', value, typeof value)
            setCategories(
              // On autofill we get a stringified value.
              typeof value === 'string' 
                ? value.split(',') 
                : typeof value === 'number' 
                  ? [categories[value]]
                  : value
            );
          }}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => {
            console.log('render-Value -->', selected)
            return (
              selected && selected.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )
            )
          }}
          MenuProps={MenuProps}
        >
          {categories.map((categoryX) => (
            <MenuItem
              key={categoryX}
              value={categoryX}
              style={getStyles(categoryX, category, theme)}
            >
              {categoryX}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
        {/* <FormControl size='small' variant='standard' className='flex flex-row justify-between'>
          <InputLabel id="demo-simple-select-label">Select By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectBy}
            label=""
            placeholder=''
            onChange={(e) => setSelectBy(e.target.value)}
          >
            <MenuItem value={1}>Students</MenuItem>
            <MenuItem value={2}>Revenue</MenuItem>
          </Select>
        </FormControl> */}
        <div className='flex flex-row items-center'>
          <TextField
            id="outlined-number"
            label="Radius"
            type="number"
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            style={{
              width: '100px',
              marginRight: '10px'
            }}
          />
          <div>km</div>
        </div>
      </div>
      <div className='w-full h-[1px] my-3 bg-black/30'></div>

      <div>There are {schoolsInRadius.length} schools in a {radius} km radius</div>

      {/* <Autocomplete
        disablePortal
        id="combo-box-demo"
        className='mt-4'
        options={schoolsInRadius.filter((school) => school.id !== selectedSchool?.id)}
        onChange={(event, newValue) => {
          if (newValue) {
            if (!compareSchools.includes(newValue.id)) {
              setCompareSchools((prev) => [...compareSchools, newValue.id])
            }
          }
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Compare School" />}
      /> */}
      <h2 className='font-bold text-2xl flex-shrink-0 min-w-max mr-3'>Market Value</h2>
      <Chart data={Object.keys(compareData).map((key) => {
        if (key === 'Average') return null
        return [key, compareData[key]['Revenue'], compareData[key]['style']]
      })} />

      <div className="flex flex-row items-center justify-start">
        <h2 className='font-bold flex-shrink-0 min-w-max mr-3'>Total Market Value:</h2>
        <span className="text-sm">{
        f(Object.values(compareData).map(data => {
          return data['Revenue']
        })
        .map(cost => Number(cost?.replaceAll(',', '')))
        .reduce((a, b) => a + b, 0))
      }</span>
      </div>
      <div className="flex flex-row items-center justify-start">
        <h2 className='font-bold flex-shrink-0 min-w-max mr-3'>Average Revenue:</h2>
        <span className="text-sm">{
        f(averageRevenue)
      }</span>
      </div>

      <h2 className='font-bold text-2xl flex-shrink-0 min-w-max mr-3'>Student Count</h2>
      <Chart data={Object.keys(compareData).map((key) => {
        if (key === 'Average') return null
        return [key, compareData[key]['Student Count'], compareData[key]['style']]
      })} />
      <div className="flex flex-row items-center justify-start">
        <h2 className='font-bold flex-shrink-0 min-w-max mr-3'>Total Students:</h2>
        <span className="text-sm">{
        f(Object.values(compareData).map(data => {
          return data['Student Count']
        })
        .map(count => Number(count?.replaceAll(',', '')))
        .reduce((a, b) => a + b, 0))
      }</span>
      </div>
      <div className="flex flex-row items-center justify-start">
        <h2 className='font-bold flex-shrink-0 min-w-max mr-3'>Average Students per School:</h2>
        <span className="text-sm">{
        f(averageRevenue)
      }</span>
      </div>
      <Table data={compareData} />
      {/* <div className='mb-96'></div> */}
      {/* <PieChart
        data={[
        { title: 'One', value: 10, color: '#E38627' },
        { title: 'Two', value: 15, color: '#C13C37' },
        { title: 'Three', value: 20, color: '#6A2135' },
        ]}
      /> */}

    </div>
  )
}

export default Toolbar