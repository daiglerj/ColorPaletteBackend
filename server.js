//initialize dependencies
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//create an express app
const app = express()

//middleware that allows reactjs app to access api from a different port
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

//parse requests of Content-Type
app.use(bodyParser.urlencoded({extended:true}))

//parse requests of content-type application/json
app.use(bodyParser.json())

//Connect to mongodb
const dbConfig = require('./config/database.config.js')
mongoose.connect(dbConfig.url,{
	useMongoClient:true
})

mongoose.connection.on('error',()=>{
	console.log("Could not connect to mongodb")
	process.exit()
})

mongoose.connection.once('open',()=>{
	console.log("Successfully connected to mongodb")
})


//define a simple route
app.get('/',(req,res)=>{
	res.json({"message":"Welcome to the color card applications."})

})
require("./app/routes/colorcards.routes.js")(app)
//Require Pallate routes



//listen for requests
const port = 8080
app.listen(port,()=>{
	console.log("Server is running on port " + port)
})