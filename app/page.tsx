// const searchClient = algoliasearch('PMMWBPYRRV', '362d746fd5c64fa6e997392388673fae');
'use client';

import React, { useCallback, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, useSearchBox, useHits } from 'react-instantsearch-hooks-web';
import { Label } from "@/components/ui/label"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  useCommandState
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal, ArrowUp, ArrowDown } from "lucide-react"

import Image from 'next/image'
import logo from '../public/img/logo.png'
import graduationHatIcon from '../public/img/graduationHatIcon.png'
import Map from './components/Map';
import Chart from './components/Chart';
import useDotStore from './store';


const searchClient = algoliasearch(
  'PMMWBPYRRV',
  '362d746fd5c64fa6e997392388673fae'
);

const chartColors = [
  '#2AABE3',
  '#0072BD',
  '#2D3193',
  '#94268F',
  '#04BFDA',
]

const chartData = [
  ['A', '50',],
  ['B', '30'],
  ['C', '10'],
  ['D', '5'],
]

export type SchoolTable = {
  schoolName: string;
  yoe: number;
  studentCount: number;
  revenue: string;
  marketShare: string;
}
 
const SortingIcon = ({ sortType })  => {
  if (sortType === "asc") {
    return <ArrowUp className="ml-2 h-4 w-4" />
  }
  if (sortType === "desc") {
    return <ArrowDown className="ml-2 h-4 w-4" />
  }
  return null
}

const approxPlus = (value: number, modulo = 50, floor = true) => {
  // if a value is like 789, we want to make it like 750+, basically closest 50
  const reaminder = value % modulo
  console.log('value...,', value, reaminder)
  if (reaminder === 0) return value
  if (!floor) {
    return value + modulo - reaminder
  }
  return value - reaminder
}

const approxPlus50 = (value: number)  => approxPlus(value, 50)

const approxPlus10k = (value: number)  => approxPlus(value, 10000)
const approxPlus10kRound = (value: number)  => approxPlus(value, 10000, false)


export const schoolTableColumn: ColumnDef<SchoolTable>[] = [
  {
    accessorKey: 'schoolName',
    header: ({ column }) => { 
      return (
        <Button
          variant="ghost"
          className='w-full flex flex-row justify-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          School Name
          <SortingIcon sortType={column.getIsSorted()} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'yoe',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='w-full flex flex-row justify-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          YOE
          <SortingIcon sortType={column.getIsSorted()} />
        </Button>
      )
    }

  },
  {
    accessorKey: 'studentCount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='w-full flex flex-row justify-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Count
          <SortingIcon sortType={column.getIsSorted()} />
        </Button>
      )
    }
  },
  {
    accessorKey: 'revenue',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='w-full flex flex-row justify-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Revenue
          <SortingIcon sortType={column.getIsSorted()} />
        </Button>
      )
    }
  },
  {
    accessorKey: 'marketShare',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='w-full flex flex-row justify-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Market Share
          <SortingIcon sortType={column.getIsSorted()} />
        </Button>
      )
    }
  },
]


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
 
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })
 
  return (
    <div className="border-y">
      <Table className='text-center'>
        <TableHeader className='bg-gray-50'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                    }
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, i) => (
                  <TableCell key={cell.id} className={i === 0 ? "text-left" : "text-center"}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}




const SearchBox = ({
  value,
  setValue,
  options,
  placeholder,
  label,
  onSubmit
}) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={cn('relative w-64', isOpen && 'z-[9999]')}>
        <Label htmlFor={'search' + label} className="text-slate-500 text-sm font-medium mb-2 block">{label}</Label>
        <Command 
          shouldFilter={false}
          className='border rounded'
          loop
        >
          
          <CommandInput 
            placeholder={placeholder}
            value={value}
            onValueChange={(val) => {
              setIsOpen(true)
              setValue(val)
            }}
            id={'search' + label} 
          />
          {value.length > 0 && isOpen && (
            <CommandList className='absolute w-full bg-white border top-[75px] z-50'>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map(({ label, value }) => (
                  <CommandItem onSelect={() => {
                    setValue(label)
                    onSubmit(value)
                    setIsOpen(false)
                  }}>
                    {label}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
          )}
        </Command>
      </div>
      {isOpen && (
        <div className='w-screen h-screen fixed z-[999] top-0 left-0'
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

const SearchSchool = ({ onSubmit }) => {
  const { hits } = useHits();
  const [value, setValue] = useState('')
  const [results, setResults] = useState([])
  const memoizedSearch = useCallback((query, search) => {
    search(query);
  }, []);
  

  const { refine } = useSearchBox({
    queryHook: memoizedSearch,
  });

  useEffect(() => {
    refine(value);
  }, [value])


  // console.log('hits', hits)

  return (
      <SearchBox
        label="School"
        placeholder="Search School"
        value={value}
        setValue={setValue}
        onSubmit={(affiliationCode: string) => {
          onSubmit(affiliationCode)
        }}
        options={hits && hits.length > 0 ? hits.map((hit) => ({ 
          label: hit.name,
          value: Number(hit.objectID),
         })) : []}
      />
  )
}

const average = (...args) => {
  const filteredValues = args.filter((value) => value !== null && value !== undefined && value !== 0)
  console.log('filteredValues...', filteredValues)
  if (filteredValues.length === 0) return 0
  return filteredValues.reduce((acc, curr) => acc + curr, 0) / filteredValues.length
}


// function to take a number, and convert it to word like 6cr+

function convertToWord(num: number | string, suffix: string = '+', precision: number = 0) {
  let numString = ''
  if (typeof num !== 'number') return num
  if (num < 1000) {
    numString = num.toString()
  }
  // for 1000 let's ad K+
  if (num < 100000) {
    // numString = Math.round(num / 1000) + 'k' + suffix
    numString = (num / 1000).toFixed(precision) + 'k' + suffix
  } else if (num < 10000000) {
    // numString = Math.round(num / 100000) + 'L' + suffix
    numString = (num / 100000).toFixed(precision) + 'L' + suffix
  } else {
    // numString = Math.round(num / 10000000) + ' cr' + suffix
    numString = (num / 10000000).toFixed(precision) + ' cr' + suffix
  }
  numString = numString.replace('.00', '')
  numString = '₹ ' + numString
  return numString
}
const getFees = ({
  tuitionFeePrimary,
  tuitionFeeMiddle,
  tuitionFeeSecondary,
  tuitionFeeSeniorSecondary,
  otherFeePrimary,
  otherFeeMiddle,
  otherFeeSecondary,
  otherFeeSeniorSecondary,
  yearlyFeesPrimary,
  yearlyFeesMiddle,
  yearlyFeesSecondary,
  yearlyFeesSeniorSecondary,
  admissionFeePrimary,
  admissionFeeMiddle,
  admissionFeeSecondary,
  admissionFeeSeniorSecondary,
}) => {
  const averageTuitionFee = average(tuitionFeePrimary, tuitionFeeMiddle, tuitionFeeSecondary, tuitionFeeSeniorSecondary)
  const averageOtherFee = average(otherFeePrimary, otherFeeMiddle, otherFeeSecondary, otherFeeSeniorSecondary)
  const averageYearlyFees = average(yearlyFeesPrimary, yearlyFeesMiddle, yearlyFeesSecondary, yearlyFeesSeniorSecondary)
  const averageAdmissionFee = average(admissionFeePrimary, admissionFeeMiddle, admissionFeeSecondary, admissionFeeSeniorSecondary)
  return {
    yearlyFees: averageTuitionFee + averageOtherFee + averageYearlyFees,
    admissionFee: averageAdmissionFee,
  }
}

const getRevenue = (school) => {
  const { yearlyFees, admissionFee } = getFees(school)
  console.log('fees...', yearlyFees, admissionFee)
  return (yearlyFees * Number(school.studentCount)) + (admissionFee * Number(school.studentCount))
}


const dashZero = (value: number) => {
  if (value === 0) return '-'
  return value
}


const forceLink = (url: string) => {
  if (url && !url.startsWith('http') || url.startsWith('https')) {
    return 'https://' + url
  }
}

// What can be a better and shorter name for hyphenIfZero
// Answer: hyphenIfZero 

const App = () => {
  const schools = useDotStore((state) => state.schools)
  const getSchools = useDotStore((state) => state.getSchools)
  const radius = useDotStore((state) => state.radius)
  const setRadius = useDotStore((state) => state.setRadius)
  const fetchingSchools = useDotStore((state) => state.fetchingSchools)

  const hasSchools = schools && schools.length > 0 && !fetchingSchools

  const currentSchool = schools.find((school) => school.isSearchedSchool)

  return (
    <div className='px-10 flex flex-col min-h-screen'>
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
            <InstantSearch
            indexName="dotstudio"
            searchClient={searchClient}
            >
              <SearchSchool onSubmit={(affiliationCode: string) => {
                getSchools(affiliationCode, radius)
              }} />
            </InstantSearch>
            <div className="text-black text-base font-normal leading-normal relative -top-3 mx-6">or</div>

            {/* <div className="text-slate-500 text-sm font-medium leading-tight relative -top-4 mx-6">or</div> */}
            {/* <span class=''>or</span> */}
            <SearchBox
              label="Location"
              placeholder="Search location"
              value={""}
              setValue={() => {}}
              options={[]}
              onSubmit={() => {}}
            />
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
        {hasSchools && (
          <div className="w-full p-2 px-4 bg-slate-50 rounded-md mt-6 flex flex-row">
            <div className='bg-white py-1 px-2 rounded-md mr-2'>
              <Image
                src={graduationHatIcon}
                alt="Graduation Hat Icon"
                className='mr-2'
                width={23}
              />
            </div>
            <div className='flex flex-row justify-between w-full'>
              <div className='flex flex-row'>
                <div className="text-slate-900 text-base font-bold leading-7">School Name :</div>
                <div className="text-slate-900 text-base font-normal leading-7 ml-2">{currentSchool.name}</div>
              </div>
              <div className='flex flex-row'>
                <div className="text-slate-900 text-base font-bold leading-7">YOE :</div>
                <div className="text-slate-900 text-base font-normal leading-7 ml-2">{currentSchool.establishmentYear}</div>
              </div>
              <div className='flex flex-row'>
                <div className="text-slate-900 text-base font-bold leading-7">Students :</div>
                <div className="text-slate-900 text-base font-normal leading-7 ml-2">{approxPlus(Number(currentSchool.studentCount))}+</div>
              </div>
              <div className='flex flex-row'>
                <div className="text-slate-900 text-base font-bold leading-7">Fees :</div>
                <div className="text-slate-900 text-base font-normal leading-7 ml-2">
                  {convertToWord(approxPlus10k(getFees(currentSchool).yearlyFees), '', 2)} - {' '}
                  {convertToWord(approxPlus10kRound(getFees(currentSchool).yearlyFees), '', 2)}
                </div>
              </div>
              <div className='flex flex-row'>
                <div className="text-slate-900 text-base font-bold leading-7">Revenue :</div>
                <div className="text-slate-900 text-base font-normal leading-7 ml-2">
                  {convertToWord(getRevenue(currentSchool))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {fetchingSchools && (
        <div className='w-full flex-1 flex flex-col justify-center items-center animate-pulse'>
          Loading ...
        </div>
      )}
      {hasSchools && (
        <>
          <div className='w-full flex mt-4 gap-4'>
            <div className='flex-1'>
              <Tabs defaultValue="marketOverview">
                <TabsList className='w-full bg-slate-50 justify-between'>
                  <TabsTrigger className='text-slate-600 data-[state=active]:text-[#7376B8]' value="marketOverview">Market Overview</TabsTrigger>
                  <TabsTrigger className='text-slate-600 data-[state=active]:text-[#7376B8]' value="competitorAnalysis">Competitor Analysis</TabsTrigger>
                  <TabsTrigger className='text-slate-600 data-[state=active]:text-[#7376B8]' value="academics">Academics</TabsTrigger>
                  <TabsTrigger className='text-slate-600 data-[state=active]:text-[#7376B8]' value="facilities">Facilities</TabsTrigger>
                  <TabsTrigger className='text-slate-600 data-[state=active]:text-[#7376B8]' value="coCurricular">Co-curricular</TabsTrigger>
                </TabsList>
                <TabsContent value="marketOverview">
                  <div className='w-full min-w-max bg-slate-100 p-2 rounded-md'>
                    <div className="w-full bg-white rounded-md shadow border border-slate-200 relative border-opacity-60 flex flex-row items-center justify-center py-5">
                      <div className="bg-blue-200 rounded-tl-md z-10 py-1 px-2 absolute top-0 left-0">
                        <div className="text-black text-opacity-70 text-sm font-bold uppercase leading-tight">Revenue share</div>
                      </div>
                      <div className="right-2 top-2 absolute bg-slate-50 p-2 rounded-md text-slate-700 text-sm font-medium leading-tight">
                        Total:₹ 209Cr+
                      </div>
                      <Chart data={chartData} colors={chartColors} />
                      <div className='ml-16'>
                        <div className='flex flex-row'>
                          <div className='flex flex-row items-center'>
                            <div className='w-4 h-3 rounded-sm' style={{ backgroundColor: chartColors[0]}}></div>
                            <div className="text-black text-xs font-normal ml-2">Category A<br/>(₹ 21Cr)</div>
                          </div>
                          <div className='flex flex-row items-center ml-10'>
                            <div className='w-4 h-3 rounded-sm' style={{ backgroundColor: chartColors[2]}}></div>
                            <div className="text-black text-xs font-normal ml-2">Category C<br/>(₹ 60Cr)</div>
                          </div>
                        </div>
                        <div className='flex flex-row mt-8'>
                          <div className='flex flex-row items-center'>
                            <div className='w-4 h-3 rounded-sm' style={{ backgroundColor: chartColors[1]}}></div>
                            <div className="text-black text-xs font-normal ml-2">Category B<br/>(₹ 60Cr)</div>
                          </div>
                          <div className='flex flex-row items-center ml-10'>
                            <div className='w-4 h-3 rounded-sm' style={{ backgroundColor: chartColors[3]}}></div>
                            <div className="text-black text-xs font-normal ml-2">Category D<br/>(₹ 21Cr)</div>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="w-full bg-white rounded-md shadow border border-slate-200 relative border-opacity-60 mt-3 flex flex-row items-center justify-center py-5">
                      <div className="bg-blue-200 rounded-tl-md z-10 py-1 px-2 absolute top-0 left-0">
                        <div className="text-black text-opacity-70 text-sm font-bold uppercase leading-tight">Student Share</div>
                      </div>
                      <div className="right-2 top-2 absolute bg-slate-50 p-2 rounded-md text-slate-700 text-sm font-medium leading-tight">
                        Total:₹ 209Cr+
                      </div>
                      <Chart data={chartData} colors={chartColors} />
                      <div className='ml-16'>
                        <div className='flex flex-row'>
                          <div className='flex flex-row items-center'>
                            <div className='w-4 h-3 rounded-sm' style={{ backgroundColor: chartColors[0]}}></div>
                            <div className="text-black text-xs font-normal ml-2">Category A<br/>(₹ 21Cr)</div>
                          </div>
                          <div className='flex flex-row items-center ml-10'>
                            <div className='w-4 h-3 rounded-sm' style={{ backgroundColor: chartColors[2]}}></div>
                            <div className="text-black text-xs font-normal ml-2">Category C<br/>(₹ 60Cr)</div>
                          </div>
                        </div>
                        <div className='flex flex-row mt-8'>
                          <div className='flex flex-row items-center'>
                            <div className='w-4 h-3 rounded-sm' style={{ backgroundColor: chartColors[1]}}></div>
                            <div className="text-black text-xs font-normal ml-2">Category B<br/>(₹ 60Cr)</div>
                          </div>
                          <div className='flex flex-row items-center ml-10'>
                            <div className='w-4 h-3 rounded-sm' style={{ backgroundColor: chartColors[3]}}></div>
                            <div className="text-black text-xs font-normal ml-2">Category D<br/>(₹ 21Cr)</div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="competitorAnalysis">Competitor Analysis</TabsContent>
                <TabsContent value="academics">Academics</TabsContent>
                <TabsContent value="facilities">Facilities</TabsContent>
                <TabsContent value="coCurricular">Co-curricular</TabsContent>
              </Tabs>
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
          <div className="w-full bg-white mt-3 rounded-md shadow border border-slate-200 relative border-opacity-60 py-5">
            <div className="bg-blue-200 rounded-tl-md z-10 py-1 px-2 absolute top-0 left-0">
              <div className="text-black text-opacity-70 text-sm font-bold uppercase leading-tight">School Table</div>
            </div>
            <div className='ml-6 mt-3 mb-3'>
              <span className="text-fuchsia-800 text-base font-bold underline leading-7">{schools.length} Schools</span>
              <span className="text-slate-700 text-base font-medium leading-7">{' '}found in {radius}km radius</span>
            </div>
            <DataTable 
              columns={schoolTableColumn}
              data={schools.map((school) => ({
                schoolName: school.name,
                yoe: school.establishmentYear,
                studentCount: dashZero(Number(school.studentCount)),
                revenue: convertToWord(dashZero(getRevenue(school))),
                marketShare: '20%',
              }))}
            />
          </div>
        </>
      )}
    </div>
  )
}
export default App

