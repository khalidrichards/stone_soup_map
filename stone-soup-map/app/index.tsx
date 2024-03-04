// pages/index.tsx

import React, { useState } from 'react';
import Map from '../components/Map';

const IndexPage: React.FC = () => {
  const [pins, setPins] = useState<any[]>([]);

  const handlePinClick = (pin: any) => {
    // Handle pin click, e.g., show pin details
    console.log(pin);
  };

  const handleAddPin = (newPin: any) => {
    // Handle adding a new pin to the map
    setPins([...pins, newPin]);
  };

  return (
    <div>
      <h1>Stone Soup Map</h1>
      <Map pins={pins} onPinClick={handlePinClick} onAddPin={handleAddPin} />
    </div>
  );
};

export default IndexPage;