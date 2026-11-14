// Import Mapbox as an ES module
import mapboxgl from 'https://cdn.jsdelivr.net/npm/mapbox-gl@2.15.0/+esm';

// Check that Mapbox GL JS is loaded
console.log('Mapbox GL JS Loaded:', mapboxgl);

// Public Mapbox access token
mapboxgl.accessToken =
  'pk.eyJ1IjoiZGEwdCIsImEiOiJjbXJmdnN2cXgwbW5vMnhvYmt4am80NDZ1In0.LOO55xwkY7vDKZ5Zm6hTDQ';

const BOSTON_LANES =
  'https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson';
const CAMBRIDGE_LANES =
  'https://raw.githubusercontent.com/cambridgegis/cambridgegis_data/main/Recreation/Bike_Facilities/RECREATION_BikeFacilities.geojson';

// Initialize the map
const map = new mapboxgl.Map({
  container: 'map', // ID of the div where the map will render
  style: 'mapbox://styles/mapbox/streets-v12', // Map style
  center: [-71.09415, 42.36027], // [longitude, latitude]
  zoom: 12, // Initial zoom level
  minZoom: 5, // Minimum allowed zoom
  maxZoom: 18, // Maximum allowed zoom
});

// One style object shared by both bike lane layers
const bikeLaneStyle = {
  'line-color': '#32D400',
  'line-width': 4,
  'line-opacity': 0.5,
};

map.on('load', async () => {
  // Step 2: bike lanes
  map.addSource('boston_route', { type: 'geojson', data: BOSTON_LANES });
  map.addLayer({
    id: 'bike-lanes-boston',
    type: 'line',
    source: 'boston_route',
    paint: bikeLaneStyle,
  });

  map.addSource('cambridge_route', { type: 'geojson', data: CAMBRIDGE_LANES });
  map.addLayer({
    id: 'bike-lanes-cambridge',
    type: 'line',
    source: 'cambridge_route',
    paint: bikeLaneStyle,
  });
});
