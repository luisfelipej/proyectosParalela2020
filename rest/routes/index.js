const express = require(`express`)
const router = express.Router()
const { managePostulation } = require(`../controllers`)

router.post(`/postulation`, managePostulation)

module.exports = router
