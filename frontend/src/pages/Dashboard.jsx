import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import AppCard from '../components/AppCard'
import TodayChart from '../today/TodayChart'
import Calender from '../components/calender/Calender'
import Weekly from '../week/Weekly'
import YourApps from '../features/YourApps'
import TodayOverall from '../today/TodayOverall'
import AppUsage from '../today/AppUsage'
import Navbar from '../components/Navbar'

function Dashboard() {
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
                // console.log(appsData);

                const todayData = await todayRes.json()
                const overallData = await overallRes.json()

                setData(appsData.domains)
                setTodayData(todayData.data)
                setTotal(todayData.total)
                setOverallData(overallData.data)
                // console.log("data: ", data);

            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchAll()
    }, [])

    return (
        <>
            <div className='flex-1 overflow-y-auto py-5 px-8'>

                <Navbar />

                <div className='grid flex-1 grid-cols-4 gap-4 overflow-hidden'>
                    <div className='col-span-4 md:col-span-3 h-full'>
                        <h1>Hello, user</h1>
                    </div>

                    <div className='hidden lg:grid md:col-span-1 md:row-span-3 h-full'>
                        <TodayOverall />
                    </div>


                    <div className='col-span-4 md:col-span-2 h-full'>
                        <TodayChart />
                    </div>

                    <div className='col-span-2 md:col-span-1 h-full'>
                        <Calender />
                    </div>


                    <div className='col-span-2 md:col-span-1 h-full'>
                        <Weekly />
                    </div>

                    <div className='col-span-4 md:col-span-2 h-full'>
                        <YourApps />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard