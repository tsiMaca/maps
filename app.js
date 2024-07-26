let map;
let markers = [];
const sidebar = document.getElementById("sidebar");

const setListener = () => {
  const plazaNames = document.querySelectorAll(".plaza__individualNames");
  plazaNames.forEach((plazaName, index) => {
    plazaName.addEventListener("click", () => {
      google.maps.event.trigger(markers[index], "click");
    });
  });
};
const createPlazaList = () => {
  let plazaHtml = "";
  plazas.forEach((plaza) => {
    plazaHtml += `<h4 class="plaza__individualNames"> ${plaza.name}</h4>`;
  });
  document.getElementById("plazas__names").innerHTML = plazaHtml;
  setListener();
};
const updateVisiblePlazas = (bounds) => {
  const plazaNames = document.querySelectorAll(".plaza__individualNames");
  plazaNames.forEach((plazaName, index) => {
    const plaza = plazas[index];
    const lat = plaza.lat;
    const lng = plaza.lng;

    if (
      lat > bounds.getSouthWest().lat() &&
      lat < bounds.getNorthEast().lat() &&
      lng > bounds.getSouthWest().lng() &&
      lng < bounds.getNorthEast().lng()
    ) {
      plazaName.classList.add("visible");
    } else {
      plazaName.classList.remove("visible");
    }
  });
};
const highlightPlazaName = (index) => {
  const plazaNames = document.querySelectorAll(".plaza__individualNames");
  plazaNames.forEach((plazaName, i) => {
    if (i === index) {
      plazaName.classList.add("marked");
    } else {
      plazaName.classList.remove("marked");
    }
  });
};

const createMarker = (coord, name, index) => {
  let html = `<h3>${name}</h3>`;
  const marker = new google.maps.marker.AdvancedMarkerElement({
    map,
    position: coord,
  });

  google.maps.event.addListener(marker, "click", () => {
    console.log("index", index);
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
    highlightPlazaName(index);
  });
  markers.push(marker);
};

const createLocationMarkers = () => {
  plazas.forEach((plaza, index) => {
    let coord = new google.maps.LatLng(plaza.lat, plaza.lng);
    let name = plaza.name;
    createMarker(coord, name, index);
  });
};

const initMap = async () => {
  const myLatlng = { lat: -27.45120820580578, lng: -58.98650858468591 };

  const { Map, Polygon } = await google.maps.importLibrary("maps");
  await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    center: myLatlng,
    zoom: 15,
    mapId: "DEMO_MAP_ID",
  });
  const july9thCoords = [
    { lat: -27.45064698558212, lng: -58.9943148641353 },
    { lat: -27.451189673116403, lng: -58.9937247782049 },
    { lat: -27.451732357980475, lng: -58.994293406465104 },
    { lat: -27.451199193926517, lng: -58.99495859424119 },
  ];

  const july9thPark = new google.maps.Polygon({
    paths: july9thCoords,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  july9thPark.setMap(map);
  google.maps.event.addListener(map, "bounds_changed", function () {
    const bounds = map.getBounds();
    updateVisiblePlazas(bounds);
  });

  const octuber12thCoords = [
    { lat: -27.44427734799922, lng: -58.98712654411672 },
    { lat: -27.444810545510137, lng: -58.98651500051611 },
    { lat: -27.44420117671586, lng: -58.985839083904914 },
    { lat: -27.443693223116874, lng: -58.9864545346289 },
  ];

  const octuber12thPark = new google.maps.Polygon({
    paths: octuber12thCoords,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  octuber12thPark.setMap(map);

  const spainCoords = [
    { lat: -27.458075069268798, lng: -58.98719049000957 },
    { lat: -27.458618500347058, lng:  -58.986565308464876 },
    { lat: -27.457961854123713, lng:  -58.98585081527094 },
    { lat: -27.457429741384633,  lng:-58.986501514429705 },
  ];
  const spainPark = new google.maps.Polygon({
    paths: spainCoords,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  spainPark.setMap(map);
  const belgranoCoords = [
    { lat: -27.45035036976132,  lng: -58.98030678648613 },
    { lat: -27.4497579274506, lng:  -58.97960883473733 },
    { lat: -27.450416047511155, lng:  -58.97892105351696 },
    { lat: -27.450902415414017, lng: -58.97954814328091 },
  ];
  const belgranoPark = new google.maps.Polygon({
    paths: belgranoCoords,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  belgranoPark.setMap(map);

  createLocationMarkers();
  createPlazaList();
  infoWindow = new google.maps.InfoWindow();
};

initMap();
