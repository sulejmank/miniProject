const express = require ('express');
const app = express ();
const bodyParser = require('body-parser');
const request = require('request');

  const apiKey = '3922645790db2bcb62b0bdc361424874';

  app.set('view engine','ejs');
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({extend:true}));

  app.get('/', function(req,res){
      res.render('index',{weather:null,error:null});
  });



  app.post('/', function(req,res){
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    request(url, function(err,response,body){
      if(err){

        res.render('index',{weather:null, error:'Error,please try again'});

      } else {

        let weather = JSON.parse(body);

        if(weather.main == undefined){

          res.render('index',{weather:null, error:'Error please try again'});

        } else {

          let weatherText = "Its " + ((weather.main.temp - 32)/ (1.8)) + "  degrees in " +   weather.name + " " +"pressure is: " + weather.main.pressure +
                           " " +  "max temperature of the day is : " + " " + ((weather.main.temp_max - 32)/1.8) + " " + "and the minimum is " + " " +  ((weather.main.temp_min-32)/1.8);
          res.render('index',{weather:weatherText, error:null});
         

        }
      }
    });
  });

  app.listen(3000,function () {
    console.log('listening on port 3000');
  });
