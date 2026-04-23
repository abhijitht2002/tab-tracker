import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts"

const COLORS = [
    "#6366f1",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#14b8a6"
]

function UsagePieChart({ dummyData }) {
    const total = dummyData.reduce((sum, d) => sum + d.value, 0)

    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                    data={dummyData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                // innerRadius={60} // donut style
                // paddingAngle={3}
                >
                    {dummyData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>

                {/* Center total */}
                {/* <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        fill: "#0f172a"
                    }}
                >
                    {total.toFixed(1)}h
                </text> */}

                <Legend layout='vertical' align='right' verticalAlign='middle' />

                <Tooltip
                    formatter={(value) => `${value} hrs`}
                    contentStyle={{
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                        fontSize: "12px"
                    }}
                />

            </PieChart>
        </ResponsiveContainer>
    )
}

export default UsagePieChart