import * as L from 'leaflet';
import countries from './countries';

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
