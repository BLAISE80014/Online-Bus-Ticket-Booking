import React from 'react'
import Bus2 from '../../assets/Bg1.jpg'
import Bus3 from '../../assets/Bus5.png'
import { motion } from "framer-motion";

function Hero() {

    const imageVariants = {
        initial: {
            x: 200,       // start outside (right)
            opacity: 0
        },
        animate: {
            x: 0,         // move inside
            opacity: 1,
            transition: {
                duration: 2,
                ease: "easeInOut"
            }
        }
    }

    return (
        <div className="relative w-full h-screen mt-[8ch] overflow-hidden">

            {/* background image */}
            <img
                src={Bus2}
                alt="bus background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* content */}
            <div className="relative z-10 w-full h-full flex items-center justify-between gap-12 lg:px-28 md:px-16 px-4">

                {/* text section */}
                <motion.dev
                    className="w-[40%] flex flex-col space-y-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-7xl font-bold text-white leading-tight">
                        Reserve Your Bus
                        <span className="text-violet-400"> Ticket</span>
                        Now
                    </h1>

                    <p className="text-xl text-neutral-300">
                        Find and book bus tickets with just a few clicks.We
                        <br></br> offer a wide range of bus routes and schedules to suit<br></br> your needs.
                    </p>

                    <button className="w-fit bg-violet-700 hover:bg-violet-800 text-white px-6 py-3 rounded-md">
                        Reserve Seat Now
                    </button>
                </motion.dev>

                {/* bus image section */}
                <div className="w-[45%] h-full flex items-end justify-end overflow-hidden mt-[-10rem]">
                    <motion.img
                        src={Bus3}
                        alt="bus"
                        className="w-full h-[20rem] object-contain translate-y-12"
                        variants={imageVariants}
                        initial="initial"
                        animate="animate"
                    />
                </div>

            </div>
        </div>
    )
}

export default Hero
