
import React, { useState, useEffect } from 'react';

const LocationDisplay = () => {
  const [message, setMessage] = useState<string>('Detecting location...');

  useEffect(() => {
    if (!navigator.geolocation) {
      setMessage('Geolocation not supported.');
      return;
    }

    const successCallback = async (position: GeolocationPosition) => {
      try {
        const { latitude, longitude } = position.coords;
        // Using OpenStreetMap's free Nominatim API for reverse geocoding
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
        if (!response.ok) {
          throw new Error('Reverse geocoding failed');
        }
        
        const data = await response.json();
        const { address } = data;
        const locationName = address.village || address.town || address.suburb || address.city || address.state;
        
        setMessage(`Your current location: ${locationName || 'your area'}`);
      } catch (error) {
        console.error('Error fetching location name:', error);
        setMessage('Could not determine location name.');
      }
    };

    const errorCallback = (error: GeolocationPositionError) => {
      if (error.code === error.PERMISSION_DENIED) {
        setMessage('Location access denied.');
      } else {
        setMessage('Unable to retrieve your location.');
      }
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="text-center mt-2 text-sm text-[#555]">
      <span>📍 {message}</span>
    </div>
  );
};

export default LocationDisplay;
