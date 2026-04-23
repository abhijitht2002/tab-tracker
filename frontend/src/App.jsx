import React, { useState } from 'react'
import { useEffect } from 'react'
import AppCard from './components/AppCard'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import TodayChart from './today/TodayChart'
import Calender from './components/calender'
import Weekly from './week/Weekly'
import YourApps from './features/YourApps'
import TodayOverall from './today/TodayOverall'
import AppUsage from './today/AppUsage'

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
        console.log(appsData);

        const todayData = await todayRes.json()
        const overallData = await overallRes.json()

        setData(appsData.domains)
        setTodayData(todayData.data)
        setTotal(todayData.total)
        setOverallData(overallData.data)
        console.log("data: ", data);

      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  return (
    <div className='py-5 px-8'>
      <section>
        <h1>Hello, User</h1>
      </section>

      <div className='grid grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]'>
        <div className='col-span-2 '>
          <TodayChart />
        </div>

        <div className='col-span-1 '>
          <Calender />
        </div>

        <div className='col-span-1 row-span-2 '>
          <TodayOverall />
        </div>

        <div className='col-span-1 '>
          <Weekly />
        </div>

        <div className='col-span-2 '>
          <YourApps />
        </div>

        <div className='col-span-4 '>
          <AppUsage />
        </div>
      </div>
    </div>
  )
}

export default App