//jshint esversion : 6
 const express = require("express");
 const https = require("https");
 const app = express();
 const bodyParser = require("body-parser");
 app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
  const query = req.body.cityName;
  const appkey = "d81ac211daafb90ff66a3ee584f62e75";
  const unit = "metric";   //for celcius
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appkey +"&units="+ unit;
   https.get(url,function(response){
     console.log(response.satusCode);
     response.on("data",function(data){
       const weatherData = JSON.parse(data);
       console.log(weatherData);
       const temp = weatherData.main.temp;
       console.log("the temp of "+ query + " is "+temp + "°C");
       const description = weatherData.weather[0].description;
       console.log(weatherData.name+" will have a " + description);
       const icon = weatherData.weather[0].icon;
       const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
       res.write("<h1> the temp of "+ query +" : "+ temp + " degree celcius. </h1>");
      res.write(query+" will have a  " + description);
      res.write("<img src =" + imageURL +">");
      res.write("<p>humidity: " + weatherData.main.humidity + "<p>");
      res.write("<p>pressure: "+weatherData.main.pressure+ "<p>");
      res.write("<p>cloud count: "+weatherData.clouds.all+"<p>");
      res.write("<p>Wind Speed: "+weatherData.wind.speed+"<p>");

      res.send();
     });
   });


});




 app.listen(3000,function(){
   console.log("the server is running on port 3000.");
 });
