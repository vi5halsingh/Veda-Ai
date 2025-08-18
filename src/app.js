const express = require("express")
const cookieParser = require("cookie-parser")
const connectDB = require("./db/db")
const app = express()
app.use(express.json())
app.use(cookieParser())
connectDB()

const authRoutes = require('./routes/auth.routes')
const chatRoutes = require('./routes/chat.routes')

app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)


module.exports = app