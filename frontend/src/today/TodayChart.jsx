import React, { useEffect, useState } from 'react'
import { getTodayChartAPI } from '../api/api'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function TodayChart() {
    const [todayData, setTodayData] = useState([])
    const [total, setTotal] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getTodayChartAPI()

                setTodayData(result.data)
                setTotal(result.total)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const formatDate = () => {
        const now = new Date()

        return now.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    }

    const formatTime = () => {
        const now = new Date()

        return now.toLocaleTimeString("en-US", {
            timeStyle: "short"
        })
    }

    useEffect(() => {
        setDate(formatDate())
    }, [])

    useEffect(() => {
        setTime(formatTime())

        const timer = setInterval(() => {
            setTime(formatTime())
        }, 1000);

        return () => {
            clearInterval(timer)
        }
    }, [])


    return (
        <>
            <div className='bg-white border border-gray-100 rounded-2xl p-4 shadow-sm h-full'>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">

                    {/* Date */}
                    <div>
                        <h2 className="text-sm font-medium text-gray-900">
                            {date}
                        </h2>
                        <p className="text-xs text-gray-400">
                            Today
                        </p>
                    </div>

                    {/* Time */}
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                            {time}
                        </p>
                        <p className="text-xs text-gray-400">
                            Local Time
                        </p>
                    </div>
                </div>


                <ResponsiveContainer width="100%" height={280} className='mt-4'>
                    <BarChart data={todayData}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#f1f5f9"
                        />

                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 11, fill: "#94a3b8" }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{ fontSize: 11, fill: "#94a3b8" }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            cursor={{ fill: "rgba(99,102,241,0.05)" }}
                            contentStyle={{
                                borderRadius: "10px",
                                border: "1px solid #e2e8f0",
                                fontSize: "12px"
                            }}
                        />

                        <Bar
                            dataKey="value"
                            fill="#6366f1"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div >
        </>
    )
}

export default TodayChart