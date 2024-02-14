var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import countries from './countries.js';
// import * as L from 'leaflet';
let previousMarker = null;
const map = L.map('Map', { zoomControl: false, minZoom: 1.1 }).setView([0, 0], 5);
document.addEventListener('DOMContentLoaded', () => {
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileURL, { attribution });
    tiles.addTo(map);
});
const selects = document.querySelectorAll("select");
selects.forEach((select, index) => {
    for (let country_code in countries) {
        let selected = index === 0 && country_code === "QS" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        select.insertAdjacentHTML("beforeend", option);
    }
});
(_a = document.getElementById('submit')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    event.preventDefault();
    // const data: string[] = ['hi', 'iam', 'good'];
    const cityID = (_b = document.getElementById('inputs')) === null || _b === void 0 ? void 0 : _b.value;
    const countryID = (_c = document.getElementById('country')) === null || _c === void 0 ? void 0 : _c.value;
    if (cityID && countryID) {
        const data = { cityID, countryID };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const options2 = Object.assign({}, options);
        try {
            const fetching = yield fetch('/weather', options);
            if (!fetching.ok) {
                throw new Error(`HTTP ERROR Status:${fetching.status}`);
            }
            const json = yield fetching.json();
            console.log(json);
            // DisplayWeather(json.data.weatherData);
            const fetching2 = yield fetch('/location', options2);
            if (!fetching2.ok) {
                throw new Error(`HTTP ERROR Status:${fetching.status}`);
            }
            const json2 = yield fetching2.json();
            // ObtainCoords(json2.data.locationData[0]);
        }
        catch (e) {
            console.log('Error in fetch GERE:', e);
            const output = document.querySelector('.output');
            if (output) {
                const err = document.createElement('p');
                err.innerHTML = 'City Does Not Exist In This Country!';
                err.classList.add("error-class");
                output.innerHTML = '';
                output.appendChild(err);
            }
        }
    }
}));
function DisplayWeather() {
    console.log('unfinished');
}
function ObtainCoords() {
    console.log('obese');
}
