import React, { useState } from 'react'

function Destination() {

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const handleFromChange = (e) => {
        setFrom(e.target.value);
    }

     const handleTOChange = (e) => {
        setFrom(e.target.value);
    }

    const isDestinationSelected = from && to;

    return (
        <div className='w-full space-y-4'>
            {
                !isDestinationSelected ? (
                    <div className='w-full grid grid-cols-2 gap-10'>

                        {/* FROM */}
                        <div>
                            <label htmlFor="from" className="block mb-2 font-semibold">
                                From
                            </label>
                            <select
                                id="from"
                                name="from"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-11 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
                            >
                                <option value="">Select Location</option>
                                <option value="location1">Location 1</option>
                                <option value="location2">Location 2</option>
                                <option value="location3">Location 3</option>
                            </select>
                        </div>

                        {/* TO */}
                        <div>
                            <label htmlFor="to" className="block mb-2 font-semibold">
                                To
                            </label>
                            <select
                                id="to"
                                name="to"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-11 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
                            >
                                <option value="">Select Location</option>
                                <option value="location4">Location 4</option>
                                <option value="location5">Location 5</option>
                                <option value="location6">Location 6</option>
                            </select>
                        </div>

                    </div>
                ) : (
                    <div className='space-y-5'>
                        <h1 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
                            Your Destination
                        </h1>

                        <div className='w-full flex items-center gap-x-3'>
                            <div className='text-base font-semibold'>
                                From: <span className="ml-1.5 font-medium">{from}</span>
                            </div>

                            <div className='flex-1 border-t border-dashed border-neutral-200 dark:border-neutral-800/80'></div>

                            <div className='text-base font-semibold'>
                                To: <span className="ml-1.5 font-medium">{to}</span>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
        
    )
}

export default Destination
