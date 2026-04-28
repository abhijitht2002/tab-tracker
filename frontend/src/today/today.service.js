export const getTodayChartAPI = async (domain) => {
    const res = await fetch(`http://localhost:3000/api/analytics/hourly/${domain}`)
    return await res.json()
}