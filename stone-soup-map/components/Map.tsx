// components/Map.tsx

import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

interface UserPlacement {
    latitude: number,
    longitude: number,
}

interface Pin {
  coordinates: [number, number];
  user: string;
  ingredients: string[];
  contact: string;
}

interface MapProps {
  pins: Pin[];
  onPinClick: (pin: Pin) => void;
  onAddPin: (newPin: Pin) => void;
}

const Map: React.FC<MapProps> = ({ pins, onPinClick, onAddPin }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null); // TODO: How safe is this?

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2hhbGlkcmljaGFyZHMiLCJhIjoiY2xzaWZ5bzEwMmhwcTJxcWwxYWplMHJhdCJ9.5JWRVq9CU_yD2HXUcZOTGw';
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });

    // Get user's location and center the map
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        map.setCenter([longitude, latitude]);
        map.setZoom(14); // Going to set this as a default and see where we end up.
        // Adding marker for user's locations
        userMarkerRef.current = new mapboxgl.Marker({ color: 'red' }).setLngLat([longitude, latitude]);
        console.log(`my coords: ${latitude}, ${longitude}`);
      });
    }

    map.on('load', () => {
        if (userMarkerRef.current) {
            userMarkerRef.current.addTo(map);
        }
      // Add pins to the map
      pins.forEach((pin) => {
        console.log(`Creating pin for ${pin.user}`);
        const popup = new mapboxgl.Popup().setHTML(
          `<h3>${pin.user}</h3><p>Ingredients: ${pin.ingredients.join(', ')}</p><p>Contact: ${pin.contact}</p>`
        );
        new mapboxgl.Marker({ color: 'green' })
          .setLngLat(pin.coordinates)
          .setPopup(popup)
          .addTo(map);
      });

      // Handle click on the map to add a new pin
      map.on('click', (e) => {
        const newPin: Pin = {
          coordinates: [e.lngLat.lng, e.lngLat.lat],
          user: 'New User',
          ingredients: ['New Ingredient'],
          contact: 'newuser@example.com',
        };
        onAddPin(newPin);
      });
    });

    return () => map.remove();
  }, [pins, onAddPin]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '600px' }} />;
};

export default Map;