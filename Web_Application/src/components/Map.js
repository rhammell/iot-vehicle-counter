import { Box } from '@chakra-ui/react'
import L from "leaflet";
import { useEffect, useRef } from 'react';

import map_icon from '../img/camera.png';

import 'leaflet/dist/leaflet.css';
import '../css/iconStyle.css'

const Map = ({ devices, selectedDevice, handleSelect }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const groupRef = useRef(null);
  const menuOffset = 510

  // Function to create map icon with device count
  // and selection status
  const createMapIcon = (device) => {
    const isActive = device.device_id == selectedDevice;
    return L.divIcon({
      html: `<center>
              <img class="iconImage" src="${map_icon}" />
              <h1 class="iconLabel ${isActive ? "iconActive" : ""}">
                ${device.vehicle_count}
              </h1>
            </center>`,
      iconSize: [100, 100]
    })
  };

  // Center map on map input layer
  const centerMap = (layer) => {
    if (layer instanceof L.Marker) {
      const bounds = L.latLngBounds([layer.getLatLng()]);
      mapRef.current.fitBounds(bounds, {
        paddingTopLeft: [menuOffset, 0],
        maxZoom: mapRef.current.getZoom()
      });
    } else {
      const bounds = layer.getBounds();
      mapRef.current.fitBounds(bounds, {
        paddingTopLeft: [menuOffset, 0]
      });
    }
  }

  // Effect ran on initialization 
  useEffect(() => { 
    // Create map - store reference
    const map = L.map(mapContainerRef.current, {
      center: [37, -118],
      zoom: 4,
      zoomControl: false,
      attributionControl: false
    });
    mapRef.current = map;

    // Create layer group - store reference
    const featureGroup = L.featureGroup().addTo(map);
    groupRef.current = featureGroup;

    // OpenStreetMap layersadf
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Attribution
    L.control.attribution({
      position: 'topright',
      prefix: '<a href="https://leafletjs.com/">Leaflet</a>'
    }).addTo(map);

    // Zoom control
    L.control.zoom({
      position: 'topright'
    }).addTo(map);

    // Cleanup function
    return () => {
      mapRef.current.remove();
    };
  }, []);

  // Effect called each devices data is updated
  useEffect(() => {
    if (devices.length > 0) {
      // Clear layer group
      groupRef.current.clearLayers();

      // Loop through each product
      for (let device of devices) {
        // Create device map marker
        const lat = device.latitude;
        const lon = device.longitude
        const layer = L.marker([lat, lon], { 
          icon: createMapIcon(device)
        })
        layer.device = device;
        groupRef.current.addLayer(layer)
          
        // Set click callback for maker layer
        layer.on('click', () => handleSelect(device.device_id))          
      }

      // Center map on group
      centerMap(groupRef.current)
    }
  }, [devices])

  // Effect called each time selectedDevice is updated
  useEffect(() => {
    // Fit map to selected device and update map icons
    if (selectedDevice) {
      groupRef.current.eachLayer(layer => {
        if (layer.device.device_id == selectedDevice) {
          centerMap(layer);
        }
        layer.setIcon(createMapIcon(layer.device))
      });
    }
   }, [selectedDevice])

  return (
    <Box w={'100%'}>
      <Box
        ref={mapContainerRef}
        height='100vh'
        zIndex={1}
      />
    </Box>
  );
};

export default Map;