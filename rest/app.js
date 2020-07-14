const express = require(`express`)
const cookieParser = require(`cookie-parser`)
const logger = require(`morgan`)
const jwt = require(`express-jwt`)
const cors = require(`cors`)

const indexRouter = require(`./routes/index`)

const app = express()

require(`dotenv`).config()
app.use(cors())
app.use(jwt({ secret: process.env.SECRET || `secret_token` }))
app.use(logger(`dev`))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(`/`, indexRouter)

module.exports = app
