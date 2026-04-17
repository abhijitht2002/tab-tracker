const express = require("express")
const { saveAndUpdateData, getAllApps, getOverallAnalytics, getAnalytics } = require("../controllers/domain.controller")
const router = express.Router()

router.post("/time", saveAndUpdateData)
router.get("/apps", getAllApps)
router.get("/analytics/today", getAnalytics)
router.get("/analytics/overall", getOverallAnalytics)

module.exports = router