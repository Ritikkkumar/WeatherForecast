const searchButton=document.getElementById("searchButton");
const locationButton=document.getElementById("locationButton");
const input=document.querySelector("input");
const temp=document.getElementsByTagName("p");
const days=document.getElementsByClassName("days");
const wheatherBox=document.getElementsByClassName("wheatherBox");
const cities=document.getElementById("cities");
var place1;
var increase=0;
var check=true;
localStorage.clear();
console.log(localStorage);
var h;
function loadPrevious(){
    h=0
    if(check==false)
        {
            let option=document.getElementsByTagName("option");
            let gg=0;
            console.log(option.length);
            var lengthh=option.length;
            while(gg<lengthh)
            {
                option[gg].remove();
                gg++;
            }
            
            console.log("yes");
        }
while(h<localStorage.length)
{
    
    const newOption=document.createElement("option");
    newOption.innerHTML=localStorage.getItem(`citiy${h}`);
    console.log("loop");
    cities.appendChild(newOption);
    h++;
    
}
if(check){
    check=false;
    console.log("true");
}
increase=localStorage.length;
}
loadPrevious();
cities.addEventListener("change",function(){callWeather(true,0,0,cities.value);});
searchButton.addEventListener("click",function(){callWeather(true,0,0,input.value)});
locationButton.addEventListener("click",callLocationWeather);
function callWeather(condition,lat,lang,place1){
    if(condition)
    {
        //caling API fetch
    var result=fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place1}?key=74292CYK7RZSTD4TJUGW92ECR`);
    localStorage.setItem(`citiy${increase++}`,input.value);
    loadPrevious();
    //h=0;
    }
    else
    {
    var result=fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lang}?key=74292CYK7RZSTD4TJUGW92ECR`);
    }
    result.then(response=>response.json()).then(response2=>{
        if(response2.currentConditions.icon=="snow")
        {
            temp[0].innerHTML="🌨️";
        }
        else if(response2.currentConditions.icon=="rain")
            {
                temp[0].innerHTML="🌧️";
            }
        else if(response2.currentConditions.icon=="fog")
            {
                temp[0].innerHTML="🌫️";
            }
        else if(response2.currentConditions.icon=="wind")
            {
                temp[0].innerHTML="🍃";
            }
        else if(response2.currentConditions.icon=="cloudy")
            {
                temp[0].innerHTML="☁️";
            }
        else if(response2.currentConditions.icon=="partly-cloudy-day")
            {
                temp[0].innerHTML="🌥️";
            }
        else if(response2.currentConditions.icon=="partly-cloudy-night")
            {
                temp[0].innerHTML="☁️";
            }
        else if(response2.currentConditions.icon=="clear-day")
            {
                temp[0].innerHTML="☀️";
            }
        else if(response2.currentConditions.icon=="clear-day")
            {
                temp[0].innerHTML="🌙";
            }
        temp[1].innerHTML=`${response2.address.charAt(0).toUpperCase()}${response2.address.slice(1,response2.address.length)}(${response2.days[0].datetime})`;    
        temp[2].innerHTML=`Tempreture: ${response2.currentConditions.feelslike}F`;
        temp[3].innerHTML=`Wind: ${response2.currentConditions.windspeed} M/S`;
        temp[4].innerHTML=`Hummidity: ${response2.currentConditions.humidity}`;
        let value=5;
        for(i=1;i<7;i++)
        {
                temp[value].innerHTML=response2.days[i].datetime;
                value++;
                if(response2.days[i].icon=="snow")
                    {
                        temp[value].innerHTML="🌨️";
                          value++;
                    }
                    else if(response2.days[i].icon=="rain")
                        {
                            temp[value].innerHTML="🌧️";
                            value++;          
                        }
                    else if(response2.days[i].icon=="fog")
                        {
                            temp[value].innerHTML="🌫️";
                            value++;
                        }
                    else if(response2.days[i].icon=="wind")
                        {
                            temp[value].innerHTML="🍃";
                            value++;  
                        }
                    else if(response2.days[i].icon=="cloudy")
                        {
                            temp[value].innerHTML="☁️";
                            value++;
                        }
                    else if(response2.days[i].icon=="partly-cloudy-day")
                        {
                            temp[value].innerHTML="🌥️";
                            value++;
                        }
                    else if(response2.days[i].icon=="partly-cloudy-night")
                        {
                            temp[value].innerHTML="☁️";
                            value++;
                        }
                    else if(response2.days[i].icon=="clear-day")
                        {
                            temp[value].innerHTML="☀️";
                            value++; 
                        }
                    else if(response2.days[i].icon=="clear-day")
                        {
                            temp[value].innerHTML="🌙";
                            value++;  
                        }
                temp[value].innerHTML=`Temp:${response2.days[i].feelslike} F`;
                value++;
                temp[value].innerHTML=`Wind:${response2.days[i].windspeed} M/S`;
                value++;
                temp[value].innerHTML=`Hummidity:${response2.days[i].humidity}%`;
                value++;
            
        
        }
        console.log(response2);
    });
    result.catch(err=>console.log(err));
    for(i=0;i<4;i++)
    {
        wheatherBox[i].style.display="flex";
    }
    
}

function callLocationWeather(){
    navigator.geolocation.getCurrentPosition(position=>{console.log(`${position.coords.latitude},${position.coords.longitude}`);
    callWeather(false,position.coords.latitude,position.coords.longitude,0)});
    
}
