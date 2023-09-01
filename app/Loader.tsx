import React from 'react'
import Logo from './logo'

const Loader = () => {
  return (
    <div className='w-screen h-full flex justify-center items-center bg-animation'>
      <div className='logo-animation'>
        <div className='relative w-12 h-48'>
          <div className='w-12 h-12 absolute rounded-full bg-[#272542] z-20'></div>
          <div className='w-12 h-12 absolute rounded-full bg-[#272542]/60 top-3'></div>
          <div className='w-12 h-12 absolute rounded-full bg-[#272542]/60 top-6'></div>
        </div>
      </div>
    </div>
  )
}

export default Loader