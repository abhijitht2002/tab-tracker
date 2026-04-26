import React from 'react'
import { PiChartPieSliceDuotone } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import { FaCalendarWeek } from "react-icons/fa";
import { AiTwotoneAppstore } from "react-icons/ai";

function Sidebar() {
    return (
        <div className='w-16 bg-white border-r flex flex-col items-center py-4 gap-6'>
            <h1 className='text-xl font-bold'><PiChartPieSliceDuotone /></h1>

            <ul className='flex flex-col items-center gap-4'>
                <li><FaHome /></li>
                <li><FaCalendarWeek /></li>
                <li><AiTwotoneAppstore /></li>
            </ul>
        </div>
    )
}

export default Sidebar