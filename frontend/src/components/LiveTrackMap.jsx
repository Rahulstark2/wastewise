// src/components/LiveTrackMap.js
import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import truckIconUrl from '../assets/truck-icon.png';

const truckIcon = new L.Icon({
  iconUrl: truckIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Loader = () => (
  <div className="flex justify-center items-center h-[300px] bg-gray-100 rounded-lg">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const LocationButton = ({ setTruckPositions }) => {
  const map = useMap();

  const handleLocationFound = useCallback((e) => {
    setTruckPositions(prev => {
      const newPositions = [...prev];
      newPositions[0] = [e.latlng.lat, e.latlng.lng];
      return newPositions;
    });
    map.flyTo(e.latlng, map.getZoom());
  }, [map, setTruckPositions]);

  const handleClick = useCallback(() => {
    map.locate({ setView: false });
  }, [map]);

  useEffect(() => {
    map.on('locationfound', handleLocationFound);
    return () => {
      map.off('locationfound', handleLocationFound);
    };
  }, [map, handleLocationFound]);

  return (
    <button
      className="leaflet-control leaflet-bar custom-location-button"
      onClick={handleClick}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        backgroundColor: 'white',
        border: '2px solid rgba(0,0,0,0.2)',
        borderRadius: '4px',
        padding: '5px',
        cursor: 'pointer',
        fontSize: '14px',
      }}
    >
      📍 Truck's Location
    </button>
  );
};

const LiveTrackMap = () => {
  const [truckPositions, setTruckPositions] = useState([]);
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);

  useEffect(() => {
    if (!isLocationLoaded) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const offsets = [
          { lat: 0.005, lng: 0.005 },
          { lat: -0.005, lng: -0.005 },
          { lat: 0.005, lng: -0.005 },
        ];

        const initialPositions = offsets.map(offset => [
          latitude + offset.lat,
          longitude + offset.lng,
        ]);

        setTruckPositions(initialPositions);
        setIsLocationLoaded(true);
      }, (error) => {
        console.error("Error getting location: ", error);
      });
    }
  }, [isLocationLoaded]);

  useEffect(() => {
    if (isLocationLoaded) {
      const interval = setInterval(() => {
        setTruckPositions(prev => prev.map((pos, index) => {
          const speed = 0.0001; // Adjust speed as needed
          const direction = index % 2 === 0 ? 1 : -1; // Alternate direction for different trucks
          return [pos[0] + speed * direction, pos[1] + speed];
        }));
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [isLocationLoaded]);

  if (!isLocationLoaded) return <Loader />;

  return (
    <div className="bg-white p-4 rounded shadow-lg w-full max-w-screen-lg mx-auto">
      <h2 className="font-bold text-lg sm:text-xl mb-4">Live Track</h2>
      <MapContainer center={truckPositions[0]} zoom={13} scrollWheelZoom={false} style={{ height: '300px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {truckPositions.map((position, index) => (
          <Marker key={index} position={position} icon={truckIcon}>
            <Popup>
              Truck {index + 1} is here.
            </Popup>
          </Marker>
        ))}
        <LocationButton setTruckPositions={setTruckPositions} />
      </MapContainer>
    </div>
  );
};

export default LiveTrackMap;
