const submitButton = document.querySelector('#submit');
const baseURL = `https://infinite-chamber-21931.herokuapp.com/data`;
const responseSection = document.querySelector('#response-section');

const locationButton = document.querySelector('#location');

// this key is restricted
const KEY = 'AIzaSyAu44VqU4eP5QFVUKg1DSSGc9yzXFZOHlI';
const url = 'https://maps.googleapis.com/maps/api/place/photo';


function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  document.querySelector('#lat').value = latitude;
  document.querySelector('#lng').value = longitude;
}

function error() {
 console.log('OOppppssssss!!!!');
}

function currentLocation(){
  if (!navigator.geolocation) {
    console.log('Some error in location');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

locationButton.addEventListener('click', currentLocation);

async function data(event) {

  event.preventDefault();

  submitButton.textContent = 'Loading...';

  lat = document.querySelector('#lat').value;
  lng = document.querySelector('#lng').value;
  let type = document.querySelector('#type').value;
  const radius = document.querySelector('#radius').value;

  type = type.toLowerCase()

  const formData = { lat, lng, type, radius };
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(formData)
  }
  const response = await fetch(baseURL, options);
  const respData = await response.json()

  submitButton.textContent = 'Submit';
  let output = ``;
  respData.forEach(async element => {
   output += `<div class="wrapper card">
        <div class="img">
          <img src="${url}?maxwidth=400&photoreference=${element.photos[0].photo_reference}&key=${KEY}" alt="">
        </div>
        <ul>
          <li><b>${element.name}</b></li>
          <li>Rating-  ${element.rating}</li>
          <li>Address- ${element.vicinity}</li>
        </ul>
      </div>`;
  });
  responseSection.innerHTML = output;
}



submitButton.addEventListener('click', data);
