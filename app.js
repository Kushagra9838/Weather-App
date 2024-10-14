const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { urlencoded } = require("express");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

    const city=req.body.city;
    const unit="metric";
    const APIkey="a2c6ba91fa4aa1da9b449cb441ea9631";

    const url = "https://api.openweathermap.org/data/2.5/weather?units="+unit+"&appid="+APIkey+"&q="+city;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const WeatherData = JSON.parse(data);
            const description = WeatherData.weather[0].description;
            const temp = WeatherData.main.temp;
            const icon = WeatherData.weather[0].icon;
            var imageURL = "http://openweathermap.org/img/w/" + icon + ".png";
            console.log(description);
            console.log(temp);
            res.write("<h1>The weather in "+city+" is " + temp +" Degree Celsius<h1/>");
            res.write("<p>The weather description is " + description + "<\p><br>");
            res.write("<img src="+imageURL+"  >")
            res.send();
        });
    });
})


app.listen(3000, function(){
    console.log("server is running on port 3 000");
});