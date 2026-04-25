import React, { useEffect, useState } from 'react'
import { IoCalendarOutline } from "react-icons/io5";
import { getCalender } from './calender.service'

function Calender() {
    const today = new Date()
    const [days, setDays] = useState([])
    const [year, setYear] = useState(today.getFullYear())
    const [month, setMonth] = useState(today.getMonth())
    const [loading, setLoading] = useState(true)

    const daysArr = ["S", "M", "T", "W", "T", "F", "S"]

    useEffect(() => {
        const res = getCalender(year, month)
        setDays(res)
        setLoading(false)

    }, [year, month])

    return (
        <div className='bg-white border border-gray-100 rounded-2xl flex flex-col p-4 gap-2 shadow-sm h-full justify-between'>

            <h1 className='text-sm font-medium text-gray-900 '>
                Calendar
            </h1>

            <div className="flex flex-col gap-2 items-center text-sm">
                <span className="font-medium">Apr</span>
                <span className="text-gray-500">2026</span>
            </div>

            <div>
                {/* Weekdays */}
                <div className='grid grid-cols-7 gap-2 mb-2'>
                    {daysArr.map((d, i) => (
                        <div
                            key={i}
                            className='h-8 flex items-center justify-center text-gray-500'
                        >
                            {d}
                        </div>
                    ))}
                </div>

                {/* Dates */}
                <div className='grid grid-cols-7 gap-2'>
                    {days.map((day, i) => (
                        <div
                            key={i}
                            className={`
          h-8 flex items-center justify-center
          ${day.isCurrentMonth ? "text-gray-900" : "text-gray-400"}
          ${day.isToday ? "bg-blue-500 text-white rounded-full" : ""}
        `}
                        >
                            {day.value}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Calender