import countries from './countries';

declare global {
    interface Window {
        L: typeof import('leaflet');
    }
}

let previousMarker: L.Marker | null = null;
const map = L.map('Map', { zoomControl: false, minZoom: 1.1 }).setView([0, 0], 5);

document.addEventListener('DOMContentLoaded', () => {
    const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileURL, { attribution });
    tiles.addTo(map);
});

document.getElementById('submit')?.addEventListener('click', async(event)=>{
    event.preventDefault();
    const data: string[] = ['hi', 'iam', 'good'];
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    const fetching = await fetch('/weather', options);
    const json = await fetching.json();
    console.log(json);
});
