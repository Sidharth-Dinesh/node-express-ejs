//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){

  const query = req.body.cityName;
  const apiKey = "a60079d11da19cd97300749d1489d16d";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
  https.get(url, function(response){
    //console.log(response);
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      //console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log(temp);

      const weatherDescp = weatherData.weather[0].description;
      console.log(weatherDescp);

      //res.send("The temperature in Mumbai is: " + temp + " degree celcius");
      //res.send("<h1>The temperature in Mumbai is: " + temp + " degree celcius</h1>");

      res.write("<h1>The temperature in " + req.body.cityName + " is: " + temp + " degree celcius</h1>");
      res.write("<p>The weather in " + req.body.cityName + " is currently: " + weatherDescp + "</p>");

      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<img src=" + imageURL + ">");

      res.send();

    });

  });

  //res.send("Server is up and running.");
});

app.listen(3000, function(){
  console.log("Server is running on port: 3000");
});
