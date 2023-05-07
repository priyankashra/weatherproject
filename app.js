const express= require ("express");
const https =require("node:https");  
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname +"/index.html");  
    
    
})
app.post("/",function(req,res){
    console.log(req.body.cityName);
    const city =req.body.cityName;
    const appid = "18c8a23ad2883e647aca661d1f279bc0";
    const unit = "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"&units="+ unit;
    https.get( url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherdata =    JSON.parse(data);
            const temp =weatherdata.main.temp;
            const icon =weatherdata.weather[0].icon;
            const weatherdescription =weatherdata.weather[0].description;
            const imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>Temp in "+ city +" is " + temp + " degree C</h1> ");
            res.write("<p>weather description " + weatherdescription +"</p>");
            res.write("<img src = "+imageurl+">" );
            res.send();

        })

    })
})


app.listen(3000,function(){
    console.log("server is running on port 3000 ");
})