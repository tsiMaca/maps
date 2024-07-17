let map;
let markers = [];

const displayPlazasList = () =>{
    let plazaHtml ="";
    plazas.forEach(plaza =>{
        plazaHtml += `<h4> ${plaza.name}</h4>`
    })
    document.getElementById("plazas__names").innerHTML = plazaHtml
}

const sidebar = document.getElementById("sidebar");

const createMarker = (coord, name) => {
  const marker = new google.maps.marker.AdvancedMarkerElement({ map, position: coord });
  markers.push(marker);
};

const createLocationMarkers = () => {
  plazas.forEach((plaza) => {
    let coord = new google.maps.LatLng(plaza.lat, plaza.lng);
    let name = plaza.name;
    createMarker(coord, name);
  });
};

const initMap = async () => {
  const myLatlng = { lat: -27.450752356733336, lng: -58.98624635360478 };

  const { Map } = await google.maps.importLibrary("maps");
  await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    center: myLatlng,
    zoom: 15,
    mapId: "DEMO_MAP_ID",
  });

  createLocationMarkers();
  displayPlazasList()
};

initMap();

