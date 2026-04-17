import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const AppUsageChart = ({ data }) => {
    return (
        <div className="w-full h-80">
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                >
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />

                    <Tooltip />

                    {/* Today */}
                    <Bar dataKey="percentage" fill="#4CAF50" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AppUsageChart;