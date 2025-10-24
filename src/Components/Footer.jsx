import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col w-full h-[7vw] gap-3 md:gap-0 items-center justify-center mt-40 md:mt-0'>
        <h1 className='logo text-3xl text-white'>Nexura</h1>
        <div className='text-zinc-500 flex flex-col md:flex-row  w-full items-center justify-center gap-2 md:gap-5'>
            <p>Created By Manas Saha</p>
            <p>manassaha425@gmail.com</p>
        </div>
    </div>
  )
}
export default Footer;