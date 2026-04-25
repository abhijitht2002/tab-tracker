let currentTabId = null
let currentWindowId = null
let startTime = null
let tabMap = {}
let isIdle = false
let limit = { "youtube.com": 30 }
let blockedDomain = {}

const checkDailyReset = () => {
    const today = new Date().toISOString().split("T")[0]

    chrome.storage.local.get(["domains", "lastResetDate"], (result) => {
        const domains = result.domains || {}
        const lastReset = result.lastResetDate

        if (!lastReset || lastReset !== today) {
            for (const domain in domains) {
                domains[domain].todayTime = 0
            }

            chrome.storage.local.set({
                domains,
                lastResetDate: today
            })

            console.log("Daily reset applied")
        }
    })
}

checkDailyReset()
setInterval(checkDailyReset, 60000)

setInterval(() => {
    // send entire domains object
    chrome.storage.local.get("domains", async result => {
        const domains = result.domains || {}
        try {
            await fetch("http://localhost:3000/api/time", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(domains)
            })
            // console.log("synced");
        } catch (err) {
            console.log("Sync failed", err)
        }
    })
}, 30000)

setInterval(() => {
    if (!isIdle && currentTabId !== null && startTime !== null) {
        saveTime()
    }
}, 15000)

const isTrackable = (url) => {
    if (!url) return false

    const blocked = [
        "chrome://",
        "chrome-extension://",
        "http://localhost:5173"
    ]

    return !blocked.some(b => url.includes(b))
}

const saveTime = () => {
    const now = Date.now()

    if (currentTabId === null || startTime === null) return

    const timeSpent = Math.floor((now - startTime) / 1000)
    if (timeSpent <= 0) return

    const tabData = tabMap[currentTabId]
    if (!tabData) return

    const url = tabData.url
    if (!isTrackable(url)) return
    const icon = tabData.icon

    try {
        const domain = new URL(url).hostname

        chrome.storage.local.get("domains", result => {
            const domains = result.domains || {}

            if (!domains[domain]) {
                domains[domain] = {
                    totalTime: 0,
                    todayTime: 0,
                    lastUpdated: now,
                    limit: null,
                    isBlocked: false,
                    icon: icon || null
                }
            }

            const last = domains[domain].lastUpdated
            const isNewDay = new Date(now).toDateString() !== new Date(last).toDateString()
            if (isNewDay) {
                domains[domain].todayTime = 0
            }

            // update times
            domains[domain].totalTime += timeSpent
            domains[domain].todayTime += timeSpent
            domains[domain].lastUpdated = now

            // save back
            chrome.storage.local.set({ domains })

            // chrome.storage.local.set({ [domain]: prevTime + timeSpent })
            // console.log(`Domains: ${domains.totalTime}`);
            // console.log(`Domain: ${domain} | Time: ${timeSpent}`);
        })
        startTime = now
    } catch (error) {
        console.log(error);
    }
}

const handleTabSwitch = (info) => {
    const newTabId = info.tabId

    if (newTabId === currentTabId) return

    if (!isIdle) {
        saveTime()
    }

    chrome.tabs.get(newTabId, (tab) => {
        console.log("tabs: ", tab);

        if (tab && tab.url) {
            tabMap[newTabId] = {
                url: tab.url,
                icon: tab.favIconUrl,
            }
        }

        currentTabId = newTabId

        if (!isIdle) {
            startTime = Date.now()
        }
    })
}

const handleTabClose = (tabId) => {
    if (tabId === currentTabId) {
        if (!isIdle) {
            saveTime()
        }

        currentTabId = null
    }
    delete tabMap[tabId]
}

const handleWindowSwitch = (winId) => {
    // User left Chrome (Alt+Tab / minimized)
    if (winId === chrome.windows.WINDOW_ID_NONE) {
        if (!isIdle) {
            saveTime()
        }

        startTime = null
    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            if (tab && tab.id && tab.url) {
                currentTabId = tab.id
                tabMap[tab.id] = {
                    url: tab.url,
                    icon: tab.favIconUrl,
                }
                if (!isIdle) {
                    startTime = Date.now()
                }
            }
        })
    }
}

chrome.idle.setDetectionInterval(60)

const handleTabIdle = (state) => {
    if (state === "idle" || state === "locked") {
        if (!isIdle) {
            saveTime()
        }
        isIdle = true
        startTime = null
    } else if (state === "active") {
        if (isIdle) {
            isIdle = false

            if (currentTabId !== null) {
                startTime = Date.now()
            }
        }
    }
}

chrome.tabs.onActivated.addListener(handleTabSwitch);
chrome.idle.onStateChanged.addListener(handleTabIdle)
chrome.tabs.onRemoved.addListener(handleTabClose);
chrome.windows.onFocusChanged.addListener(handleWindowSwitch)

