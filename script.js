
let  button=document.querySelector(".button");
let text=document.querySelector(".text");
  let humidity=document.querySelector(".humidity");
let windSpeed=document.querySelector(".wind");
let icon=document.querySelector(".icon2");
let letterh=document.querySelector(".letterh");
let letterw=document.querySelector(".letterw");
let weather=document.querySelector(".weather");



let input = document.querySelector(".searching");






input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    button.click(); // Trigger search on Enter key
  }
});






button.addEventListener("click", async ()=>{
  let search=document.querySelector(".searching").value.trim();
  if(search===""){
    alert("Error: Enter city name");
  }

  else {
let datal=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search}`);
let datals= await datal.json();


if (!datals.results || datals.results.length === 0) {
  alert("❌ City not found! Please enter a valid city name.");
}

else {
const { latitude, longitude, name, country }=datals.results[0];
 const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
 const weathergeo= await weatherRes.json();
 const weatherCurrent=weathergeo.current_weather;

text.innerHTML=` <div>
   <h1 >${name}</h1>
  <h2> ${getTempEmoji(weatherCurrent.temperature)} ${weatherCurrent.temperature}°C</h2>
  </div>`

weather.innerHTML=`<img src="${getWeatherImage(weatherCurrent.temperature)}" alt="" class="image">`




let speed=winddirection(weatherCurrent.winddirection);



letterh.innerHTML=`<div class="icon icon2">${symbol(weatherCurrent.winddirection)}</div>
    <div class="letter">
      <h3 class="humidity">${speed}</h3>
      <h5>Wind direction</h5>
    </div>`


    letterw.innerHTML=`<div class="icon"><i class="fa-solid fa-wind"></i></div>
    <div class="letter">
      <h3 class="wind">${weatherCurrent.windspeed} Km/h</h3>
      <h5>Wind Speed</h5>
    </div>`

  } }

})


function winddirection (deg) {
 if (deg >= 337.5 || deg < 22.5) return "N";
  if (deg >= 22.5 && deg < 67.5) return "NE";
  if (deg >= 67.5 && deg < 112.5) return "E";
  if (deg >= 112.5 && deg < 157.5) return "SE";
  if (deg >= 157.5 && deg < 202.5) return "S";
  if (deg >= 202.5 && deg < 247.5) return "SW";
  if (deg >= 247.5 && deg < 292.5) return "W";
  if (deg >= 292.5 && deg < 337.5) return "NW";
}

function symbol (deg) {
 if (deg >= 337.5 || deg < 22.5) return "↑";
  if (deg >= 22.5 && deg < 67.5) return "↗️";
  if (deg >= 67.5 && deg < 112.5) return "→";
  if (deg >= 112.5 && deg < 157.5) return "↘️";
  if (deg >= 157.5 && deg < 202.5) return "↓";
  if (deg >= 202.5 && deg < 247.5) return "↙️";
  if (deg >= 247.5 && deg < 292.5) return "←";
  if (deg >= 292.5 && deg < 337.5) return "↖️";
}


function getTempEmoji(temp) {
  if (temp > 35) return "🔥";         // Hot
  else if (temp >= 20) return "🌡️";   // Normal
  else if (temp < 20) return "❄️";    // Cold
}


function getWeatherImage(temp) {
  if (temp > 35) return "https://png.pngtree.com/png-clipart/20230510/original/pngtree-cartoon-hot-sun-with-sweat-png-image_9156968.png";
  else if (temp > 25) return "https://png.pngtree.com/png-clipart/20230802/original/pngtree-cute-funny-sun-with-sunglasses-sunny-warm-look-vector-picture-image_9236446.png";
  else if (temp >= 15) return "https://static.vecteezy.com/system/resources/thumbnails/015/271/870/small_2x/3d-sun-and-cloud-white-3d-weather-element-png.png";
  else if (temp >= 5) return "https://static.vecteezy.com/system/resources/thumbnails/012/629/893/small_2x/cold-cloudy-day-3d-weather-icon-illustration-png.png";
  else return "https://cdn.pixabay.com/photo/2012/04/18/13/23/cloudy-37012_640.png";
}

