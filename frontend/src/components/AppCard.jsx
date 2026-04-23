import React from 'react'
import AppUsageChart from './AppUsageChart'

function AppCard({ d }) {
    return (
        <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">

            {/* Icon */}
            <img
                src={d.icon}
                alt={d.name}
                className="w-10 h-10 rounded-md object-cover"
            />

            {/* Content */}
            <div className="flex-1 min-w-0">

                {/* Top row */}
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900 truncate">
                        {d.name}
                    </h2>

                    <p className="text-xs text-gray-500">
                        {d.displayTime}
                    </p>
                </div>

                {/* Bottom row */}
                <div className="flex items-center gap-2 mt-2">

                    {/* Progress bar */}
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-500 transition-all duration-300"
                            style={{ width: `${Math.max(d.percentage, 0)}%` }}
                        />
                    </div>

                    {/* Percentage */}
                    <span className="text-xs text-gray-400 w-10 text-right">
                        {Math.floor(d.percentage)}%
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AppCard