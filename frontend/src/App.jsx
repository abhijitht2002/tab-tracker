import React, { useState } from 'react'
import { useEffect } from 'react'
import AppCard from './components/AppCard'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import TodayChart from './components/TodayChart'

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

      <TodayChart />

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