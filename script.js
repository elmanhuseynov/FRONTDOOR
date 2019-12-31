    document.addEventListener('DOMContentLoaded', ()=>{
        let url = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=8263";
        fetch(url)
        .then(response=>response.text())
        .then(data=>{
            let parser = new DOMParser();
            xml = parser.parseFromString(data, "application/xml");
            //document.getElementById('output').textContent = data;
            buildBusList(xml, "west");
        })
    })

    document.addEventListener('DOMContentLoaded', ()=>{
        let url = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=8262";
        fetch(url)
        .then(response=>response.text())
        .then(data=>{
            let parser = new DOMParser();
            xml = parser.parseFromString(data, "application/xml");
            //document.getElementById('output').textContent = data;
            buildBusList(xml, "east");
        })
    })


function buildBusList(x, dir){
    //console.log(x);
    var output = "output" + dir;
    let list = document.getElementById(output);
    let predictions = x.getElementsByTagName('predictions'); //THE ROUTE 353West or 60West
    let directions = x.getElementsByTagName('direction'); //The final destanation of some buses.
    let prediction = x.getElementsByTagName('prediction'); //Information about a certain bus.
    //console.log(predictions);
    //console.log(directions);
    //console.log(prediction);
    let d = 0; //Number of directions we went through
    let b = 0; //number of buses we went through
    for(let i = 0; i < predictions.length; i++){
       let p = document.createElement('p');
       let route = predictions[i].attributes[1].value;
       p.textContent = route;
       list.append(p);
       for(let j = 0; j < (predictions[i].childElementCount); j++){
           let p = document.createElement('p');
           let finalDest = directions[d].attributes.title.value;
           p.textContent = finalDest;
           list.append(p);
           d++;
           for(let k = 0; k < directions[j].childElementCount; k++){
            let p = document.createElement('p');
            let bus = "Bus " + (k + 1) + " in " + prediction[b].attributes[1].value + " seconds.";
            p.textContent = bus;
            list.append(p);
            b++;
           }
       }
       
    }
}





$.getJSON("https://api.darksky.net/forecast/7962416c31705d9d822ba862a614cb4d/43.6529,-79.3849?units=si", function(datatwo){
    console.log(datatwo);

    //var icon = "https://openweathermap.org/img/w/" + datatwo.weather[0].icon + ".png"; 
    var weather = "Currently in Toronto is " + datatwo.currently.summary;
    var temp = "The temperature is currently " + Math.round(datatwo.currently.temperature) + String.fromCharCode(176) + " and it feels like " + Math.round(datatwo.currently.apparentTemperature) + String.fromCharCode(176)+ ".";

    //$('.icon').attr('src', icon);
    $('.weather').append(weather);
    $('.temp').append(temp);
    

});

$.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=toronto,ca&units=metric&APPID=20a832695c4074d7aaf2450f887d6288", function(datathree){
    console.log(datathree);

    for(var i = 1; i < 10; i++){
        var timeslot = "." + i;
        var iconslot = ".icon" + i;
        var temp = Math.round(datathree.list[i-1].main.temp) + String.fromCharCode(176);
        var icon = "https://openweathermap.org/img/w/" + datathree.list[i-1].weather[0].icon + ".png"; 
        $(timeslot).append(temp);
        $(iconslot).attr('src', icon);
    }
    var Rain = 0;
    var Snow = 0;

    for(var i = 0; i < 10; i++){
        var weather = datathree.list[i].weather[0].main;
        if(weather == "Rain"){
            Rain = 1;
        }
        if(weather == "Snow"){
            Snow = 1;
        }
    }

    var weatherString = "";

    if((Snow == 1) && (Rain == 1)){
        weatherString = "It looks like it will rain and snow tomorrow"
    }
    else if(Rain == 1){
        weatherString = "It looks like it will rain tomorrow";
    }
    else if(Snow == 1){
        weatherString = "It looks like it will snow tomorrow.";
    }
    else{
        weatherString = "Looks like it will be clear tomorrow";
    }

    $(".weather_tomorrow").append(weatherString);
    


})

