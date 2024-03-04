'use client';

import Image from 'next/image'
import React, { useState } from 'react';
import Map from '../components/Map';

/**
 * Adds a new pin to the map.
 * 
 * @param currentPins A list of current pins on the map.
 * @param newPin A new Pin object (TODO: Actually use the pin definition).
 */
function setPinsFn(currentPins: any[], newPin: any) {
  if (!newPin) {
    currentPins.push(newPin);
  } 
}

function getAsLngLat(lng: number, lat: number): [number, number] {
  return [lng, lat];
}

/**
 * A temporary function to return test pin data for the map.
 * 
 * @returns An array of test pins.
 */
function getTestPinData() {
  return [
    {
      coordinates: getAsLngLat(-73.9582527, 40.6513689),
      user: 'Q',
      ingredients: ['carrots', 'beef', 'chicken'],
      contact: 'q@flatbushmixtape.com'
    },
    {
      coordinates: getAsLngLat(-73.9581026,40.6504027),
      user: 'Gen',
      ingredients: ['carrots', 'beef', 'chicken'],
      contact: 'gen@flatbushmixtape.com'
    },
    {
      coordinates: getAsLngLat(-73.9596,40.6534),
      user: 'Bilal',
      ingredients: ['carrots', 'beef', 'chicken'],
      contact: 'bilal@flatbushmixtape.com'
    }
  ]
}

export default function Home() {
    // const [pins, setPins] = useState<any[]>([]);
    const [ pins, setPins ] = [ getTestPinData(), setPinsFn ];
  
    const handlePinClick = (pin: any) => {
      // Handle pin click, e.g., show pin details
      console.log(`showing pin details: ${pin}`);
    };
  
    const handleAddPin = (newPin: any) => {
      // Handle adding a new pin to the map
      setPins(pins, newPin);
    };

  return (
    <div>
      <h1>Stone Soup Map</h1>
      <Map pins={pins} onPinClick={handlePinClick} onAddPin={handleAddPin} />
    </div>
  );
}
