import React from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function Weekly() {

    const overallData = [
        { day: 'Fri', hours: 20 },
        { day: 'Sat', hours: 50 },
        { day: 'Sun', hours: 0 },
        { day: 'Mon', hours: 90 },
        { day: 'Tue', hours: 16 },
        { day: 'wed', hours: 95 },
        { day: 'Thu', hours: 6 },
    ]
    const max = Math.max(...overallData.map(d => d.hours));

    return (
        <div className='bg-white border border-gray-100 rounded-2xl h-full shadow-sm flex flex-col p-4'>
            <h1 className='text-sm font-medium text-gray-900'>Last 7 days</h1>

            <div className="flex items-end gap-3 mt-3 flex-1">
                {overallData.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center w-full h-full">
                        {/* Label */}
                        <span className="text-xs text-gray-500 mb-1">{`${Math.floor((d.hours / max) * 100)}%`}</span>

                        {/* Bar */}
                        <div className="w-full h-full bg-gray-100 rounded overflow-hidden flex items-end">
                            <div
                                className="w-full bg-indigo-500 transition-all duration-300"
                                style={{ height: `${(d.hours / max) * 100}%` }}
                            />
                        </div>

                        {/* Label */}
                        <span className="text-xs text-gray-500 mt-2">{d.day}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Weekly