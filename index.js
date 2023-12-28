const express= require("express")
const bodyParser = require('body-parser')
const connectDB = require('./db/db')
require('dotenv').config()
const {formSubmit} =require('./form')
const port = process.env.PORT||3000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit', formSubmit)

const start = async ()=> {
    try {
        await connectDB(process.env.URI)
        app.listen(port, ()=>{
            console.log(`connected to the db sucessfully`);
            console.log(`app is listening on port ${port}`);
        })
    } catch (error) {
        console.log("error starting app", error)
    }
    
}

start()