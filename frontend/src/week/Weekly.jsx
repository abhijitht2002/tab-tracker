import React from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function Weekly() {

    const overallData = [
        { day: 'Fri', hours: 2.87 },
        { day: 'Sat', hours: 1.53 },
        { day: 'Sun', hours: 0 },
        { day: 'Mon', hours: 0 },
        { day: 'Tue', hours: 0 },
        { day: 'wed', hours: 0 },   
    ]

    return (
        <div className='bg-white border border-gray-100 rounded-2xl p-4 shadow-sm'>
            <div>
                <h1 className='text-sm font-medium text-gray-900'>Last 6 days</h1>
            </div>

            <ResponsiveContainer width="100%" height={260} className="mt-3">
                <BarChart data={overallData}>
                    <CartesianGrid />

                    <XAxis
                        dataKey="day"
                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip
                        cursor={{ fill: "rgba(0,0,0,0.03)" }}
                        contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                            fontSize: "12px"
                        }}
                    />

                    <Bar
                        dataKey="hours"
                        fill="#6366f1"
                        radius={[6, 6, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Weekly