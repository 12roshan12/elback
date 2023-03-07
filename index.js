const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.port || 5000
const app = express()
const conn = require('./db/db')
var cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use('/api/category', require('./routes/category.route'))
app.use('/api/trip', require('./routes/trip.route'))
app.use('/api/query', require('./routes/query.route'))
app.use('/api/booking', require('./routes/booking.route'))


app.listen(port, () => {
    console.log(`Server running at port : ${port}`);
})