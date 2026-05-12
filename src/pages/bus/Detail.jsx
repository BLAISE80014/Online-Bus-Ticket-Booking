import React from 'react'
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom"
import Bus1 from '../../assets/Bus9.png'
import Destination from '../../components/destination/Destination';
import Department from '../../components/department/Department';

function Detail() {
  return (
    <div className='w-full lp:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[10ch]'>
        <div className='w-full grid grid-cols-2 gap-16 items-center'>
            <div className='col-span-1 space-y-8'>
                <img src={Bus1} alt="Detail img" className="w-full aspect-[3/2] rounded-md object-contain" />
            </div><br></br>
            <div className='space-y-4'>
              <h1 className='text-4xl font-bold text-neutral-900 dark:text-neutral-50'>
                Luxury Bus
                <span className='text-base font-normal text-neutral-400 dark:text-neutral-500 ml-3'>
                  (Bus Number Plate)
                </span>
              </h1>
              <div className='flex items-center gap-x-2'>
                <div className='flex items-center gap-x-1 text-sm text-yellow-500 dark:text-yellow-600'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
                  (4.5)
                </p>
              </div>
              <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis a assumenda esse praesentium perferendis laborum perspiciatis, tempore delectus dolore rerum? Quidem architecto minima voluptatum nihil blanditiis magnam voluptatibus culpa veritatis?
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque nam labore voluptates nobis sapiente magni nisi voluptas laboriosam laudantium culpa, reiciendis non consequatur aliquam adipisci modi voluptatibus facilis corporis reprehenderit!
              
                </p>
            </div>
            <div className='col-span-1 space-y-10'>
                <div className="space-y-6">
                  {/* Destination card*/}
                    <Destination />
                  {/* Departure card */}
                  <Department />

                </div>

                {/* Seat section */}

                {/* checkout Btn */}

                <div className="flex">
                  <Link to={'/bus/bus-detail/checkout'} className="w-fit bg-violet-600 text-neutral-50 font-medium text-base px-6 py-3 rounded-md hover:bg-violet-700 ease-in-out duration-300">
                  Process to Checkout</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Detail