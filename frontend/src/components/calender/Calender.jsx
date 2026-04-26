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
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    useEffect(() => {
        const res = getCalender(year, month)
        setDays(res)
        setLoading(false)
    }, [year, month])

    const currentYear = today.getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i)

    return (
        <div className='bg-white border border-gray-100 rounded-2xl flex flex-col p-4 gap-2 h-full shadow-sm justify-between'>

            <h1 className='text-sm font-medium text-gray-900 mb-2'>
                Calendar
            </h1>

            <div className="flex  gap-2 justify-between items-center text-sm">
                <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className='px-2 py-1 border rounded-md'>
                    {
                        months.map((m, i) => <option key={i} value={i}>{m}</option>)
                    }
                </select>

                <select value={year} onChange={(e) => setYear(Number(e.target.value))} className='px-2 py-1 border rounded-md'>
                    {
                        years.map((y, i) => <option key={i} value={y}>{y}</option>)
                    }
                </select>
            </div>

            <div>
                {/* Weekdays */}
                <div className='grid grid-cols-7 gap-2 mb-2'>
                    {daysArr.map((d, i) => (
                        <div
                            key={i}
                            className='flex items-center justify-center text-gray-800'
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
          aspect-square flex items-center justify-center
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