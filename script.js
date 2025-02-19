let map;
let userMarker;
let markers = [];

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 43.2557, lng: -79.8711 },
    zoom: 8,
  });

  addMarkers();
}

initMap();

const locations = [
  { name: "Gage Park", lat: 43.2413, lng: -79.8305, category: "parks" },
  { name: "Dundurn Castle", lat: 43.2733, lng: -79.8840, category: "museums" },
  { name: "Art Gallery of Hamilton", lat: 43.2579, lng: -79.8736, category: "museums" },
];

function addMarkers() {
  locations.forEach((location) => {
      const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map,
          title: location.name,
          category: location.category,
      });

      const infoWindow = new google.maps.InfoWindow({
          content: `<h3>${location.name}</h3>`,
      });

      marker.addListener("click", () => {
          infoWindow.open(map, marker);
      });

      markers.push(marker);
  });
}



function filterMarkers(category) {
  markers.forEach((marker) => {
      if (category === "all" || marker.category === category) {
          marker.setMap(map);
      } else {
          marker.setMap(null);
      }
  });
}



document.getElementById("geo-btn").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        if (userMarker) {
          userMarker.setMap(null);
        }

        userMarker = new google.maps.Marker({
          position: pos,
          map,
          icon: "assets/icons/map-marker.png",
        });
        map.setCenter(pos);
      },
      () => alert("Geolocation failed")

    );
  } else {
    alert("Geolocation is not supported by this brower.");
  }
})


