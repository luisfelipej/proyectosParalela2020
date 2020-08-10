const express = require(`express`)
const router = express.Router()
const { careerByCode, careersByName, topCareers } = require(`../controllers`)

router.get(`/careerByCode/:code`, careerByCode)
router.get(`/careersByName`, careersByName)
router.post(`/topCareers`, topCareers)

module.exports = router
