import React, { useState } from 'react'
import { useEffect } from 'react'
import AppCard from './components/AppCard'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function App() {
  const [data, setData] = useState([])
  const [todayData, setTodayData] = useState([])
  const [total, setTotal] = useState("")
  const [overallData, setOverallData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [appsRes, todayRes, overallRes] = await Promise.all([
          fetch("http://localhost:3000/api/apps"),
          fetch("http://localhost:3000/api/analytics/today"),
          fetch("http://localhost:3000/api/analytics/overall")
        ])

        const appsData = await appsRes.json()
        const todayData = await todayRes.json()
        const overallData = await overallRes.json()

        setData(appsData.domains)
        setTodayData(todayData.data)
        setTotal(todayData.total)
        setOverallData(overallData.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  return (
    <div className='md:max-w-5xl mx-auto p-5'>
      <section className=''>
        <h1 className="text-sm font-medium text-gray-500 mb-3">
          Last 7 Days
        </h1>

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
      </section>

      <section className='bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mt-6'>

        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-3">

            {/* Date */}
            <div>
              <h2 className="text-sm font-medium text-gray-900">
                Friday, April 17 2026
              </h2>
              <p className="text-xs text-gray-400">
                Today
              </p>
            </div>

            {/* Time mock */}
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                01:26 PM
              </p>
              <p className="text-xs text-gray-400">
                Local Time
              </p>
            </div>
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

        <div className="flex gap-2 mt-3">
          <div className="px-3 py-1 bg-gray-50 rounded-lg text-xs text-gray-600">
            ⏱ Total: {total}
          </div>

          {/* <div className="px-3 py-1 bg-gray-50 rounded-lg text-xs text-gray-600">
            📊 6 apps used
          </div> */}
        </div>
      </section>

      <section className='mt-6'>
        <h1 className="font-medium text-gray-500 mb-3">Your Apps</h1>
        <div className='flex flex-col gap-4'>
          {
            data.map((d, i) => (
              <AppCard key={d.domain} d={d} />
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default App