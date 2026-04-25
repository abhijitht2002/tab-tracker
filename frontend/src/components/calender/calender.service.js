
export const getCalender = (year, month) => {
    // const year = 2026
    // const month = 4
    // const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const firstDay = new Date(year, month, 1).getDay()
    const lastDate = new Date(year, month + 1, 0).getDate()
    const prevLastDate = new Date(year, month, 0).getDate()
    const total = firstDay + lastDate
    const rows = total % 7 === 0 ? total / 7 : Math.floor(total / 7) + 1
    const totalCells = rows * 7

    const days = []
    const today = new Date()

    for (let i = firstDay - 1; i >= 0; i--) {
        days.push({ value: prevLastDate - i, isCurrentMonth: false, isToday: false })
    }

    for (let d = 1; d <= lastDate; d++) {
        const checkToday = year === today.getFullYear() && month === today.getMonth() && d === today.getDate()
        days.push({ value: d, isCurrentMonth: true, isToday: checkToday })
    }

    const remaining = totalCells - days.length

    for (let i = 1; i <= remaining; i++) {
        days.push({ value: i, isCurrentMonth: false, isToday: false })
    }

    return days
}

