const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const axios = require('axios')
const port = process.env.PORT || 3000
const apiKey = "a7d1910d311c101e64ea11d3dc1e0c05"
//"a7d1910d311c101e64ea11d3dc1e0c05"
///Middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set("view engine" , "ejs")


app.get("/", async (req, res) => {
    res.render("index.ejs" , {data : result[0]})
  });
  
  app.post("/", async (req, res) => {
    try {
    let city = req.body.city;
    let state = req.body.state;
    let country = req.body.country;
    //console.log(req.body)
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${apiKey}`);
    const result = response.data;
    //console.log(result)
    res.render("index.ejs", {data : result})
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
      }
    });
  
app.listen(port , ()=>{
    try {
        console.log(`SERVER IS CONNECTED AT PORT ${port}`)
    } catch (error) {
        console.log(error)
    }
    
})