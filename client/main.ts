import countries from './countries.js';
// import * as L from 'leaflet';

let previousMarker: L.Marker | null = null;
const map = L.map('Map', { zoomControl: false, minZoom: 1.1 }).setView([0, 0], 5);

document.addEventListener('DOMContentLoaded', () => {
    const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileURL, { attribution });
    tiles.addTo(map);
});

const selects: NodeListOf<HTMLSelectElement> = document.querySelectorAll("select");

selects.forEach((select:HTMLSelectElement, index:number) => {
    for(let country_code in countries) {
        let selected = index === 0 && country_code === "QS"? "selected" : ""; 
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        select.insertAdjacentHTML("beforeend", option);
    }
});

document.getElementById('submit')?.addEventListener('click', async(event)=>{
    event.preventDefault();
    // const data: string[] = ['hi', 'iam', 'good'];
    const cityID: string | null = (document.getElementById('inputs') as HTMLInputElement)?.value;
    const countryID: string | null = (document.getElementById('country') as HTMLInputElement)?.value;

    if (cityID && countryID){
        const data : {cityID:string; countryID:string} = {cityID , countryID};
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const options2: RequestInit = { ...options};

        try{
            const fetching = await fetch('/weather', options);
            if (!fetching.ok) {
                throw new Error(`HTTP ERROR Status:${fetching.status}`);
            }

            const json = await fetching.json();
            console.log(json);
            // DisplayWeather(json.data.weatherData);

            const fetching2 = await fetch('/location', options2);
            if (!fetching2.ok) {
                throw new Error(`HTTP ERROR Status:${fetching.status}`);
            }

            const json2 = await fetching2.json();
            // ObtainCoords(json2.data.locationData[0]);
        }catch(e){
            console.log('Error in fetch:', e);
            const output = document.querySelector('.output');
            if (output) {
                const err = document.createElement('p');
                err.innerHTML = 'City Does Not Exist In This Country!';
                err.classList.add("error-class");
        
                output.innerHTML = '';
                output.appendChild(err);
            }
        }
}});


function DisplayWeather(){
    console.log('unfinished')
}

function ObtainCoords(){
    console.log('obese')
}