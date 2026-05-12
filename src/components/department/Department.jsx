import React, { useState } from 'react'

function Department() {


    const [departBus, setDepartBus] = useState('');
    

    const handleDepartBusChange = (e) => {
        setDepartBus(e.target.value);
    }



    return (
        <div className='w-full space-y-4'>
            {
                !departBus ? (
                    <div className='w-full grid grid-cols-2 gap-10'>

                        {/* FROM */}
                        <div>
                            <label htmlFor="departbus" className="block mb-2 font-semibold">
                                Depart Time
                            </label>
                            <select
                                id="departbus"
                                name="departbus"
                                value={departBus}
                                onChange={handleDepartBusChange}
                                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-11 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
                            >
                                <option value="">Select a Time</option>
                                <option value="04:00 AM">04:00 AM</option>
                                <option value="04:00 AM">04:00 AM</option>
                                <option value="04:00 AM">04:00 AM</option>
                            </select>
                        </div>
                    </div>
                 )      
                : (
                    <div className='space-y-5'>
                        <div className='w-full flex items-center gap-x-3'>
                            <div className='w-fit text-base font-semibold'>
                                Bus Depart at:- <span className="ml-1.5 font-medium">{departBus}</span>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default Department