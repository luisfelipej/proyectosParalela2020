const express = require(`express`)
const router = express.Router()

router.post(`/postulation`, (req, res, next) => {
  res.status(200).json({
    success: true,
    result: `good`,
  })
})

module.exports = router
