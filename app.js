const express = require('express')
const bodyParser = require('body-parser')
const feedRoutes = require('./routes/feed')
const app = express();

app.use(bodyParser.json()) // for json body
app.use('/feed',feedRoutes) 

app.listen(8080, ()=>{
    console.log("PORT is Listing at ", 8080)
})