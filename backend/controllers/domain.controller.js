const Domain = require("../Domain")

const saveAndUpdateData = async (req, res) => {
    try {
        const domains = req.body
        const now = Date.now()

        for (const domain in domains) {
            const data = domains[domain]

            let doc = await Domain.findOne({ domain })
            if (!doc) {
                doc = new Domain({
                    domain,
                    icon: null,
                    todayTime: 0,
                    totalTime: 0,
                    lastUpdated: now,
                    isBlocked: false
                })
            }

            const last = doc.lastUpdated
            const isNewDay =
                new Date(now).toDateString() !== new Date(last).toDateString()

            if (isNewDay) {
                doc.history.push({
                    date: new Date(last).toDateString(),
                    timeSpent: doc.todayTime
                })

                doc.todayTime = 0
                doc.isBlocked = false
            }

            doc.todayTime = data.todayTime
            doc.totalTime = data.totalTime
            doc.lastUpdated = data.lastUpdated
            doc.limit = data.limit
            doc.isBlocked = data.isBlocked
            doc.icon = data.icon

            await doc.save()
        }

        res.json({ success: true, })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message })
    }
}

const getAllApps = async (req, res) => {
    try {
        const domains = await Domain.find()
            .select("domain todayTime totalTime icon")
            .sort({ todayTime: -1 })

        const total = domains.reduce((sum, d) => sum + d.todayTime, 0)

        const formatted = domains.map(d => ({
            domain: d.domain,
            name: formatDomainName(d.domain),
            icon: d.icon,
            todayTime: d.todayTime,
            displayTime: formatTime(d.todayTime),

            percentage: total
                ? (d.todayTime / total) * 100
                : 0
        }))

        console.log(formatted);
        res.json({ domains: formatted })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message })
    }
}

const getAnalytics = async (req, res) => {
    try {
        const domains = await Domain.find().select("domain todayTime")

        const formatted = domains.filter(d => d.todayTime > 0)
            .map(d => ({
                name: formatDomainName(d.domain),
                value: +(d.todayTime / 3600).toFixed(2)
            })).sort((a, b) => b.value - a.value)

        const total = formatTime(domains.reduce((sum, d) => sum + (d.todayTime || 0), 0))

        console.log(formatted);
        res.json({ total, data: formatted })
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: err.message })
    }
}

const getOverallAnalytics = async (req, res) => {
    try {
        const domains = await Domain.find().select("todayTime history")

        const now = new Date()

        const todayKey = getLocalDate(now)

        const yesterday = new Date()
        yesterday.setDate(now.getDate() - 1)
        const yesterdayKey = getLocalDate(yesterday)

        const last7Days = {}

        // last7days map
        for (let i = 7; i > 0; i--) {
            const d = new Date()
            d.setDate(now.getDate() - i)

            const key = getLocalDate(d)
            last7Days[key] = 0
        }


        domains.forEach(domain => {
            // if (last7Days[todayKey] !== undefined) {
            //     last7Days[todayKey] += domain.todayTime || 0
            // }

            domain.history.forEach(entry => {
                const entryKey = getLocalDate(new Date(entry.date))

                if (last7Days.hasOwnProperty(entryKey)) {
                    last7Days[entryKey] += entry.timeSpent
                }
            })
        });

        const formatted = Object.entries(last7Days).map(([date, time]) => {
            console.log(date, todayKey);

            let dayName
            if (date === yesterdayKey) {
                dayName = "Yesterday"
            } else {
                dayName = new Date(date).toLocaleDateString("en-US", {
                    weekday: "short"
                })
            }

            return {
                day: dayName,
                hours: +(time / 3600).toFixed(2)
            }
        })

        console.log(formatted);
        res.json({ data: formatted })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message })
    }
}

const getLocalDate = (date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0]
}

const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)

    return `${h.toString().padStart(2, "0")}hr ${m
        .toString()
        .padStart(2, "0")}min`
}

const formatDomainName = (domain) => {
    try {
        const url = domain.startsWith("http")
            ? domain
            : `https://${domain}`

        const hostname = new URL(url).hostname.replace(/^www\./, "")

        return hostname
    } catch (err) {
        return domain
    }
}

module.exports = { saveAndUpdateData, getAllApps, getAnalytics, getOverallAnalytics }