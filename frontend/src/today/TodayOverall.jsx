import React from 'react'
import UsagePieChart from '../components/UsagePieChart'
import AppCard from '../components/AppCard'

function TodayOverall() {

    const dummyData = [
        { name: "YouTube", value: 2.5 },
        { name: "GitHub", value: 1.2 },
        { name: "Instagram", value: 1.8 },
        { name: "LinkedIn", value: 0.6 },
        { name: "Docs", value: 0.9 }
    ]

    const data = [
        // {
        //     displayTime: "01hr 00min",
        //     domain: "www.youtube.com",
        //     icon: "https://www.youtube.com/s/desktop/2c918e63/img/favicon_32x32.png",
        //     name: "youtube.com",
        //     percentage: 40.81286086267406,
        //     todayTime: 3605,
        // },
        // {
        //     displayTime: "01hr 00min",
        //     domain: "www.youtube.com",
        //     icon: "https://www.youtube.com/s/desktop/2c918e63/img/favicon_32x32.png",
        //     name: "youtube.com",
        //     percentage: 40.81286086267406,
        //     todayTime: 3605,
        // },
        {
            displayTime: "01hr 00min",
            domain: "www.youtube.com",
            icon: "https://www.youtube.com/s/desktop/2c918e63/img/favicon_32x32.png",
            name: "youtube.com",
            percentage: 40.81286086267406,
            todayTime: 3605,
        },
        {
            displayTime: "01hr 00min",
            domain: "www.youtube.com",
            icon: "https://www.youtube.com/s/desktop/2c918e63/img/favicon_32x32.png",
            name: "youtube.com",
            percentage: 40.81286086267406,
            todayTime: 3605,
        },

    ]


    return (
        <div className='bg-white border border-gray-100 rounded-2xl p-4 shadow-sm h-full flex flex-col'>

            {/* Header */}
            <h1 className='text-sm font-medium'>Today</h1>

            {/* Chart */}
            <div className=''>
                <UsagePieChart dummyData={dummyData} />
            </div>

            {/* List section */}
            <section className='flex flex-col flex-1 min-h-0'>
                <h1 className="text-sm font-medium text-gray-500 mb-3">
                    Most Used Apps
                </h1>

                {/* Scrollable list */}
                <div className='flex flex-col gap-3 overflow-y-auto pr-1'>
                    {data.map((d, i) => (
                        <AppCard key={`${d.domain} - ${i}`} d={d} />
                    ))}
                </div>
            </section>

            {/* <p className="text-xs text-indigo-500 cursor-pointer">
                View all →
            </p> */}

        </div>
    )
}

export default TodayOverall