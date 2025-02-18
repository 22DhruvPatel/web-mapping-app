let map;
let userMarker;
let markers = [];

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 43.2557, lng: -79.8711 },
    zoom: 8,
  });
}

initMap();


