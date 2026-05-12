import React from 'react'
import { Link } from 'react-router-dom';
import Bus1 from '../../assets/Bus1.png'
import Bus2 from '../../assets/Bus2.png'
import Bus3 from '../../assets/Bus3.png'
import Bus4 from '../../assets/Bus4.png'
import Bus5 from '../../assets/Bus5.png'
import Bus6 from '../../assets/Bus6.png'
import Bus7 from '../../assets/Bus7.png'
import Bus0 from '../../assets/Bus.png'
import { Fa0 } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';




function Bus() {
    return (
        <div className='w-full lp:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[8ch] space-y-14'>
            {/* search and filter */}
            <div className="w-full grid grid-cols-6 gap-14 gb-neutral-200/60 block dark:bg-neutral-900/40 rounded-md px-6 py-5 items-center justify-between">
                <div className='flex items-center gap-x-2.5 col-span-2'>
                    <input type="text" id='seat' placeholder='Search Buses...' name='seat' className="w-full appearence-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900" />
                    <button className="bg-violet-600 h-11 px-4 rounded-md text-base text-neutral-50 font-normal">
                        <FaSearch />
                    </button>
                </div>
                <div className='col-span-2'></div>

                <div className='col-span-2'>

                    <select className="w-full appearence-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900">
                        <option value="">Select Bus Type</option>
                        <option value="touristbus">Tourist Bus</option>
                        <option value="privatebus">Private Bus</option>
                        <option value="luxurybus">Luxury Bus</option>
                        <option value="deluxebus">Deluxe Bus</option>
                    </select>
                </div>
            </div>
            {/*Bus card*/}
            <div className='w-full grid grid-cols-3 gap-10'>
                <Link to={"/bus/bus-details"} className='w-full bg-neutral-200/60 dark:bg-neutral-900/40 rounded-xl p-4'>
                <img src={Bus1} alt="bus img" className="w-full aspect-video object-contain object-center" />
                <div className='px-3 py-4 space-y-5'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl font-semibold text-neutral-800 dark:text-neutral-50'>
                            Tourist Bus
                        </h1>
                        <p className='text-sm font-normal text-neutral-800 dark:text-neutral-50'>
                            60 passengers
                        </p>
                    </div>
                </div>
                </Link>
                 <Link to={"/bus/bus-details"} className='w-full bg-neutral-200/60 dark:bg-neutral-900/40 rounded-xl p-4'>
                <img src={Bus0} alt="bus img" className="w-full aspect-video object-contain object-center" />
                <div className='px-3 py-4 space-y-5'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl font-semibold text-neutral-800 dark:text-neutral-50'>
                            Tourist Bus
                        </h1>
                        <p className='text-sm font-normal text-neutral-800 dark:text-neutral-50'>
                            60 passengers
                        </p>
                    </div>
                </div>
                </Link>
                 <Link to={"/bus/bus-details"} className='w-full bg-neutral-200/60 dark:bg-neutral-900/40 rounded-xl p-4'>
                <img src={Bus3} alt="bus img" className="w-full aspect-video object-contain object-center" />
                <div className='px-3 py-4 space-y-5'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl font-semibold text-neutral-800 dark:text-neutral-50'>
                            Tourist Bus
                        </h1>
                        <p className='text-sm font-normal text-neutral-800 dark:text-neutral-50'>
                            60 passengers
                        </p>
                    </div>
                </div>
                </Link>
                 <Link to={"/bus/bus-details"} className='w-full bg-neutral-200/60 dark:bg-neutral-900/40 rounded-xl p-4'>
                <img src={Bus4} alt="bus img" className="w-full aspect-video object-contain object-center" />
                <div className='px-3 py-4 space-y-5'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl font-semibold text-neutral-800 dark:text-neutral-50'>
                            Tourist Bus
                        </h1>
                        <p className='text-sm font-normal text-neutral-800 dark:text-neutral-50'>
                            60 passengers
                        </p>
                    </div>
                </div>
                </Link>
                 <Link to={"/bus/bus-details"} className='w-full bg-neutral-200/60 dark:bg-neutral-900/40 rounded-xl p-4'>
                <img src={Bus7} alt="bus img" className="w-full aspect-video object-contain object-center" />
                <div className='px-3 py-4 space-y-5'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl font-semibold text-neutral-800 dark:text-neutral-50'>
                            Tourist Bus
                        </h1>
                        <p className='text-sm font-normal text-neutral-800 dark:text-neutral-50'>
                            60 passengers
                        </p>
                    </div>
                </div>
                </Link>
                 <Link to={"/bus/bus-details"} className='w-full bg-neutral-200/60 dark:bg-neutral-900/40 rounded-xl p-4'>
                <img src={Bus6} alt="bus img" className="w-full aspect-video object-contain object-center" />
                <div className='px-3 py-4 space-y-5'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl font-semibold text-neutral-800 dark:text-neutral-50'>
                            Tourist Bus
                        </h1>
                        <p className='text-sm font-normal text-neutral-800 dark:text-neutral-50'>
                            60 passengers
                        </p>
                    </div>
                </div>
                </Link>
            </div>
        </div>
    )
}

export default Bus