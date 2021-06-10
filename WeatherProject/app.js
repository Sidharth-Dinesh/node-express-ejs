//jshint esversion:6

const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req,res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=a60079d11da19cd97300749d1489d16d&units=metric";
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

      res.write("<h1>The temperature in Mumbai is: " + temp + " degree celcius</h1>");
      res.write("<p>The weather in Mumbai is currently: " + weatherDescp + "</p>");

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
