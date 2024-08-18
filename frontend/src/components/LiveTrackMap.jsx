import React, { useState, useEffect, useCallback, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import truckIconUrl from '../assets/truck-icon.png';
import { AddressContext } from '../context/AddressContext';
import { useToast } from '@chakra-ui/react';

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
  const [locationNotFound, setLocationNotFound] = useState(false);

  const { address } = useContext(AddressContext);
  const toast = useToast();

  useEffect(() => {
    setIsLocationLoaded(false);
    setLocationNotFound(false);
    setTruckPositions([]);
  }, [address]);

  useEffect(() => {
    if (!isLocationLoaded) {
      if (address) {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
          .then(response => response.json())
          .then(data => {
            if (data.length > 0) {
              const { lat, lon } = data[0];

              const offsets = [
                { lat: 0.005, lng: 0.005 },
                { lat: -0.005, lng: -0.005 },
                { lat: 0.005, lng: -0.005 },
              ];

              const initialPositions = offsets.map(offset => [
                parseFloat(lat) + offset.lat,
                parseFloat(lon) + offset.lng,
              ]);

              setTruckPositions(initialPositions);
              setIsLocationLoaded(true);
            } else {
              console.error("No results found for the address");
              setIsLocationLoaded(true);
              setLocationNotFound(true);

              // Trigger toast when location is not found
              toast({
                title: 'Map Not Available',
                description: 'Map is not available for the provided address.',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'bottom',
              });
            }
          })
          .catch(error => {
            console.error("Error fetching address data: ", error);
          });
      } else {
        console.error("No address found in AddressContext");
      }
    }
  }, [isLocationLoaded, address, toast]);

  useEffect(() => {
    if (isLocationLoaded) {
      const interval = setInterval(() => {
        setTruckPositions(prev => prev.map((pos, index) => {
          const speed = 0.0001;
          const direction = index % 2 === 0 ? 1 : -1;
          return [pos[0] + speed * direction, pos[1] + speed];
        }));
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [isLocationLoaded]);

  if (!isLocationLoaded) {
    if (locationNotFound) {
      return <div>Location not found for the provided address.</div>;
    }
    return <Loader />;
  }

  return (
    <div className="bg-white p-4 rounded shadow-lg w-full max-w-screen-lg mx-auto z-30">
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
