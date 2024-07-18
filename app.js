let map;
let markers = [];

const setListener = () =>{
  document.querySelectorAll(".plaza__individualNames").forEach((plazaName, index)=>{
    plazaName.addEventListener("click", ()=>{
      google.maps.event.trigger(markers[index], "click")
    })
  })
}

const displayPlazasList = () => {
  let plazaHtml = "";
  plazas.forEach((plaza) => {
    plazaHtml += `<h4 class="plaza__individualNames"> ${plaza.name}</h4>`;
  });
  document.getElementById("plazas__names").innerHTML = plazaHtml;
};

const sidebar = document.getElementById("sidebar");

const createMarker = (coord, name) => {
  let html = `<h3>${name}</h3>`;
  const marker = new google.maps.marker.AdvancedMarkerElement({
    map,
    position: coord,
  });

  google.maps.event.addListener(marker, "click", () => {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
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
  const myLatlng = { lat: -27.45120820580578, lng: -58.98650858468591 };

  const { Map } = await google.maps.importLibrary("maps");
  await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    center: myLatlng,
    zoom: 15,
    mapId: "DEMO_MAP_ID",
  });

  createLocationMarkers();

  infoWindow = new google.maps.InfoWindow();
  let html = `<h3>Centro de la ciudad</h3>`;

  displayPlazasList();
  setListener();
};

initMap();
