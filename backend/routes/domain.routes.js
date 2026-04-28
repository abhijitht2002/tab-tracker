const express = require("express")
const { saveAndUpdateData, getAllApps, getOverallAnalytics, getAnalytics, getHourlyAnalytics } = require("../controllers/domain.controller")
const router = express.Router()

router.post("/time", saveAndUpdateData)
router.get("/apps", getAllApps)
router.get("/analytics/hourly/:domain", getHourlyAnalytics)
router.get("/analytics/overall", getOverallAnalytics)

module.exports = router