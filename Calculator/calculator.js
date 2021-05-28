//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/calculator", function(req, res){
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/", function(req, res){

  var num1 = Number(req.body.n1);
  var num2 = Number(req.body.n2);

  var result = num1 + num2;

  res.send("Result of Summation: " + result);
});

app.post("/calculator", function(req, res){

  var h1 = parseFloat(req.body.h);
  var w1 = parseFloat(req.body.w);

  var result = w1 / (h1 * h1);

  res.send("BMI: " + result);
});

app.listen(3000, function(){
  console.log("Server started at port: 3000");
});
