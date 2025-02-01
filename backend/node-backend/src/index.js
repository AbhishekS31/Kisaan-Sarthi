import dotenv from 'dotenv'
dotenv.config({
    path: "./.env"
})



import express, { urlencoded } from "express";
import cors from 'cors'
import {sendRealTimeWeatherUpdate} from "../src/controllers/Weather.controller.js"


const app = express()




// MiddleWares

app.use(cors({
    origin : process.env.CORS_ORIGIN , 
    credentials :  true 
}))




app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))


app.listen(8000 , ()=> {
    console.log("Server is running on port 8000")
})


app.get("/weather-update" , sendRealTimeWeatherUpdate)