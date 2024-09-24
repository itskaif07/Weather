const input = document.querySelector("#cityInput");  // Now select the input field
const apiKey = "0acf0cf7c09035ada45a67a735ae1cfd";
const button = document.querySelector("button");
const warning  =  document.querySelector("#warning")
const itemsdiv  =  document.querySelector("#itemsdiv")

button.addEventListener('click', weather)


input.addEventListener('keydown', (event)=>{
    if(event.key == 'Enter'){
        weather();
    }
})

async function weather(params) {
    
    const city = input.value;

    if(city === ""){
       warning.classList.remove('hidden')
       warning.innerHTML = 'Please enter a city!'
       itemsdiv.classList.add('hidden')
        return;
    }
    else{
        warning.classList.add('hidden')
    }

    itemsdiv.classList.remove('hidden')

    try {
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)

        if (response.ok) {
            warning.classList.add('hidden');
        }
        else{
            if(!(itemsdiv.classList.contains('hidden'))){
                itemsdiv.classList.add('hidden')
            }
            throw new Error('City not found');
        }

        const data = await response.json();

    

        document.querySelector("#temp").innerHTML = `${data.main.temp} °C`;
        document.querySelector("#feels_like").innerHTML = `${data.main.feels_like} °C`

        document.querySelector("#min").innerHTML = `${data.main.temp_min} °C`
        document.querySelector("#max").innerHTML =  `${data.main.temp_max} °C`

        document.querySelector("#sky").innerHTML = data.weather[0].description
        document.querySelector("#humidity").innerHTML = `${data.main.humidity} %`
        document.querySelector("#winds").innerHTML = `${data.wind.speed} m/s`

      
    }
     catch (error) {
        warning.classList.remove('hidden');
        warning.innerHTML = error.message; // Show the error message to the user
        return;
    }
}