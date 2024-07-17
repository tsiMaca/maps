let map;
const initMap = async () => {
  const myLatlng = { lat: -27.450752356733336, lng: -58.98624635360478 };
  const myLatlng2 = { lat: -27.45037835821434, lng: -58.979428779650746 };
  const myLatlng3 = { lat: -27.44424020133436, lng: -58.98654384774095 };
  const myLatlng4 = { lat: -27.45117035357736, lng: -58.99417953056948 };
  const myLatlng5 = { lat: -27.45805607357223, lng: -58.98634551831683 };

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    center: myLatlng,
    zoom: 15,
    mapId: "DEMO_MAP_ID",
  });

  const sidebar = document.getElementById("sidebar");

  const markers = [
    new AdvancedMarkerElement({ map, position: myLatlng, title: "Click to zoom" }),
    new AdvancedMarkerElement({ map, position: myLatlng2, title: "Click to zoom" }),
    new AdvancedMarkerElement({ map, position: myLatlng3, title: "Click to zoom" }),
    new AdvancedMarkerElement({ map, position: myLatlng4, title: "Click to zoom" }),
    new AdvancedMarkerElement({ map, position: myLatlng5, title: "Click to zoom" })
  ];

  map.addListener("center_changed", () => {
    window.setTimeout(() => {
      map.panTo(markers[0].position);
    }, 3000);
  });

  markers.forEach((marker, index) => {
    marker.addListener("click", (event) => {
      console.log(`Marker ${index + 1} clicked`);
      let latitude = event.latLng.lat();
      let longitude = event.latLng.lng();
      console.log(`Latitude: ${latitude} Longitude: ${longitude}`);
      map.setZoom(8);
      map.setCenter(marker.position);
    });
  });
};

initMap();
