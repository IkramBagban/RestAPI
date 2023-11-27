const express = require('express')
const app = express();

const feedRoutes = require('./routes/feed')

app.use('/feed',feedRoutes)

app.listen(8080, ()=>{
    console.log("PORT is Listing at ", 8080)
})