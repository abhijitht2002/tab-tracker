export const getTodayChartAPI = async () => {
    const res = await fetch("http://localhost:3000/api/analytics/today")
    return await res.json()
}