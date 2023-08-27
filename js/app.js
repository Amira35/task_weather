let btn = document.querySelector('.btn');
let inputNameCountry = document.querySelector('[name="nameCountry"]')
let ulList = document.querySelector('.list')

btn.addEventListener('click' , function(e){
    if( inputNameCountry.value !== ''){
        e.preventDefault()
        let request = new XMLHttpRequest();
        request.open('get' , `https://api.openweathermap.org/data/2.5/weather?q= ${inputNameCountry.value} &appid=4d8fb5b93d4af21d66a2948710284366&units=metric` , true)
        request.send()
        request.onreadystatechange= function(){
        if(request.readyState == 4 && request.status == 200){
            let jsData = JSON.parse(request.responseText);
            let icon = new XMLHttpRequest();
            icon.open('get' , `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${jsData.weather[0].icon}.svg` , true)
            icon.send()
            icon.onreadystatechange= function(){
                if(icon.readyState == 4 && icon.status == 200){
                    console.log(icon.responseURL);
                    ulList.innerHTML += `
                    <li>
                        <h2>${jsData.name} <sup><span>${jsData.sys.country}</span></sup></h2>
                        <div class = 'temp'>${Math.ceil(jsData.main.temp)} <sup>°C</sup></div>
                        <img src='${icon.responseURL}'>
                    </li> `
         
                }
            }
        }
        inputNameCountry.value = ''

    }
}
    
})