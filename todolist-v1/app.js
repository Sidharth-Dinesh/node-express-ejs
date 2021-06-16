//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

//var item = "";
var items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  // var today = new Date();
  //
  // var options = {
  //   weekday: "long",
  //   day: "numeric",
  //   month: "long"
  // };
  //
  // var day = today.toLocaleDateString("en-US", options);

  //Get both date and day:
  let day = date.getDate();

  //Get only day:
  //let day = date.getDay();

  // var currentDay = today.getDay();
  // var day = "";
  //
  // switch (currentDay) {
  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //     day = "Monday";
  //     break;
  //   case 2:
  //     day = "Tueday";
  //     break;
  //   case 3:
  //     day = "Wednesday";
  //     break;
  //   case 4:
  //     day = "Thursday";
  //     break;
  //   case 5:
  //     day = "Friday";
  //     break;
  //   case 6:
  //     day = "Saturday";
  //     break;
  //   default:
  //     console.log("Error: current day is equal to: " + currentDay);
  // }

  // res.render("list", {kindOfDay: day, newListItem: items});
  res.render("list", {listTitle: day, newListItem: items});

});

app.post("/", function(req, res){
  //item = req.body.newItem;
  //console.log(item);

  var item = req.body.newItem;

  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }
  //res.render("list", {newListItem: item});

});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItem: workItems});
});

app.post("/work", function(req, res){

  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
  //res.render("list", {newListItem: item})
});


app.listen(3000, function() {
  console.log("Server is running on port: 3000");
});
