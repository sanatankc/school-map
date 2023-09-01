import React from 'react'
import Chart from '../../components/Chart'
import useDotStore from '@/app/store'
import { approxPlus, convertToWord, getCategory, getFees, getRevenue } from '@/app/utils'

const chartColors = [
  '#2AABE3',
  '#0072BD',
  '#2D3193',
  '#94268F',
]
const chartColorsByCategory = {
  'A': '#2AABE3',
  'B': '#0072BD',
  'C': '#2D3193',
  'D': '#94268F',
}

const chartData = [
  ['A', '50',],
  ['B', '30'],
  ['C', '10'],
  ['D', '5'],
]

const MarketOverview = () => {
  const schools = useDotStore((state) => state.schools)

  const sortCateories = (a, b) => {
    if (a.category < b.category) return -1
    if (a.category > b.category) return 1
    return 0
  }
  const currentSchool = schools.find((school) => school.isSearchedSchool)

  const categoryWiseSchools = schools.reduce((acc, curr) => {
    const fees = getFees(curr).yearlyFees
    const category = getCategory({ fees })
    if (!acc[category]) {
      acc[category] = {
        category,
        revenue: 0,
        studentCount: 0,
        schools: [],
      }
    }
    acc[category].schools.push(curr)
    acc[category].revenue += getRevenue(curr)
    acc[category].studentCount += Number(curr.studentCount)
    return acc
  }, {})

  const categoryWiseSchoolsChartRevenueData = Object.values(
    categoryWiseSchools
  ).map((category, i) => ({ 
    name: category?.category,
    value: category?.revenue,
    fill: chartColorsByCategory[category?.category]
  }))

  const categoryWiseSchoolsChartStudentData = Object.values(
    categoryWiseSchools
  ).map((category, i) => ({ 
    name: category?.category,
    value: category?.studentCount,
    fill: chartColorsByCategory[category?.category]
  }))
    
  

  const totalRevenue = convertToWord(
    Object.values(categoryWiseSchools)
      .reduce((acc, curr) => acc + curr.revenue, 0)
  )


  const totalStudentCount = approxPlus(
    Object.values(categoryWiseSchools)
      .reduce((acc, curr) => acc + curr.studentCount, 0)
  )
  
    
  
  return (
    <div className='w-full min-w-max bg-slate-100 p-2 rounded-md'>
      <div className="w-full bg-white rounded-md shadow border border-slate-200 relative border-opacity-60 flex flex-row items-center justify-center py-8">
        <div className="bg-blue-200 rounded-tl-md z-10 py-1 px-2 absolute top-0 left-0">
          <div className="text-black text-opacity-70 text-sm font-bold uppercase leading-tight">Revenue share</div>
        </div>
        <div className="right-2 top-2 absolute bg-slate-50 p-2 rounded-md text-slate-700 text-sm font-medium leading-tight">
          Total: {totalRevenue}
        </div>
        <Chart
          id={currentSchool.affiliationCode}
          data={categoryWiseSchoolsChartRevenueData}
          colors={chartColors}
          format={convertToWord}
        />
        <div className='ml-16'>
          <div className='flex flex-row'>
            <div className='flex flex-row items-center'>
              <div className='w-4 h-3 rounded-sm' style={{ backgroundColor: chartColors[0]}}></div>
              <div className="text-black text-xs font-normal ml-2">Category A<br/>({convertToWord(categoryWiseSchools['A']?.revenue)})</div>
            </div>
            <div className='flex flex-row items-center ml-10'>
              <div className='w-4 h-3 rounded-sm' style={{ backgroundColor: chartColors[2]}}></div>
              <div className="text-black text-xs font-normal ml-2">Category C<br/>({convertToWord(categoryWiseSchools['C']?.revenue)})</div>
            </div>
          </div>
          <div className='flex flex-row mt-8'>
            <div className='flex flex-row items-center'>
              <div className='w-4 h-3 rounded-sm' style={{ backgroundColor: chartColors[1]}}></div>
              <div className="text-black text-xs font-normal ml-2">Category B<br/>({convertToWord(categoryWiseSchools['B']?.revenue)})</div>
            <div className='flex flex-row items-center ml-10'>
              <div className='w-4 h-3 rounded-sm' style={{ backgroundColor: chartColors[3]}}></div>
              <div className="text-black text-xs font-normal ml-2">Category D<br/>({convertToWord(categoryWiseSchools['D']?.revenue)})</div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-md shadow border border-slate-200 relative border-opacity-60 mt-3 flex flex-row items-center justify-center py-8">
        <div className="bg-blue-200 rounded-tl-md z-10 py-1 px-2 absolute top-0 left-0">
          <div className="text-black text-opacity-70 text-sm font-bold uppercase leading-tight">Student Share</div>
        </div>
        <div className="right-2 top-2 absolute bg-slate-50 p-2 rounded-md text-slate-700 text-sm font-medium leading-tight">
          Total: {totalStudentCount}+
        </div>
        <Chart 
          data={categoryWiseSchoolsChartStudentData} 
          colors={chartColors}
          format={val => `${approxPlus(Number(val))}+`}
        />
        <div className='ml-16'>
          <div className='flex flex-row'>
            <div className='flex flex-row items-center'>
              <div className='w-4 h-3 rounded-sm' style={{ backgroundColor: chartColors[0]}}></div>
              <div className="text-black text-xs font-normal ml-2">Category A<br/>({approxPlus(Number(categoryWiseSchools['A']?.studentCount))}+)</div>
            </div>
            <div className='flex flex-row items-center ml-10'>
              <div className='w-4 h-3 rounded-sm' style={{ backgroundColor: chartColors[2]}}></div>
              <div className="text-black text-xs font-normal ml-2">Category C<br/>({approxPlus(Number(categoryWiseSchools['C']?.studentCount))}+)</div>
            </div>
          </div>
          <div className='flex flex-row mt-8'>
            <div className='flex flex-row items-center'>
              <div className='w-4 h-3 rounded-sm' style={{ backgroundColor: chartColors[1]}}></div>
              <div className="text-black text-xs font-normal ml-2">Category B<br/> ({approxPlus(Number(categoryWiseSchools['B']?.studentCount))}+)</div>
            </div>
            <div className='flex flex-row items-center ml-10'>
              <div className='w-4 h-3 rounded-sm' style={{ backgroundColor: chartColors[3]}}></div>
              <div className="text-black text-xs font-normal ml-2">Category D<br/> ({approxPlus(Number(categoryWiseSchools['D']?.studentCount))}+)</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MarketOverview