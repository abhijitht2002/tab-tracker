import React, { useEffect, useState } from 'react'
import AppCard from '../components/AppCard'

function AppUsage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/apps")
                const appsData = await res.json()

                setData(appsData.domains)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])


    return (
        <div className='bg-white border border-gray-100 rounded-2xl p-4 shadow-sm '>
            <div className=''>
                <h1 className='text-sm font-medium'>Usage</h1>

                <div className=''>
                    {data.map((d) => (
                        <div>
                            <h1>{d.domain}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AppUsage