import React from 'react'
import Image from 'next/image'

import graduationHatIcon from '../../public/img/graduationHatIcon.png'
import { 
  convertToWord, 
  approxPlus,
  approxPlus10k,
  approxPlus10kRound,
  getFees,
  getRevenue
} from '../utils';

import useDotStore from '../store';

const CurrentSchoolInfo = () => {
  const schools = useDotStore((state) => state.schools)
  const currentSchool = schools.find((school) => school.isSearchedSchool)
  const fetchingSchools = useDotStore((state) => state.fetchingSchools)

  if (!currentSchool) return null
  if (fetchingSchools) return null
  return (
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
  )
}

export default CurrentSchoolInfo
