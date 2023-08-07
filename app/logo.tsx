import React, { FC } from 'react'

const SvgComponent: FC<{ className?: string }> = ({className}) => (
  <div className='rounded'>
    <div className='relative w-12 h-48'>
      <div className='w-12 h-12 absolute rounded-full bg-[#272542] z-20'></div>
      <div className='w-12 h-12 absolute rounded-full bg-[#272542]/60 top-3'></div>
      <div className='w-12 h-12 absolute rounded-full bg-[#272542]/60 top-6'></div>
    </div>
  </div>
)
export default SvgComponent
