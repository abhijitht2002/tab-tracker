import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getTodayChartAPI } from './today.service'

function TodayChart() {
    const [todayData, setTodayData] = useState([])
    const [total, setTotal] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [loading, setLoading] = useState(true)
    const [usedDomains, setUsedDomains] = useState([])
    const [selected, setSelected] = useState("All")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getTodayChartAPI(selected)

                setTodayData(result.data)
                setUsedDomains(result.usedDomains)
                console.log(usedDomains);

            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [selected])

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
                <div className="flex items-center justify-between gap-2 mb-3">

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

                <div className='text-right'>
                    <select className='border py-1 px-2 rounded-md' value={selected} onChange={(e) => setSelected(e.target.value)}>
                        <option value="All">All</option>
                        {
                            usedDomains.map((d, i) => (
                                <option key={d} value={d}>{d}</option>
                            ))
                        }
                    </select>
                </div>

                <div className='overflow-x-auto'>
                    <div className='min-w-[800px]'>
                        <ResponsiveContainer width="100%" height={280} className='mt-4'>
                            <LineChart data={todayData} margin={{ left: -40 }}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#f1f5f9"
                                />

                                <XAxis
                                    dataKey="hour"
                                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                                    axisLine={false}
                                    tickLine={false}
                                    interval={2}
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

                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#6366f1"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div >
        </>
    )
}

export default TodayChart