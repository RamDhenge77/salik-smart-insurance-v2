import React, { useState, useEffect } from 'react';

interface MapPlaceholderProps {
  className?: string;
  location?: string;
  coordinates?: { lat: number; lng: number };
  height?: string;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ 
  className = '', 
  location = 'Dubai Mall', 
  coordinates,
  height = '100vh' // Changed default to 100vh to use full height
}) => {
  const [mapUrl, setMapUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    if (coordinates) {
      // If coordinates are provided, use them - ensuring correct format for Google Maps embed
      setMapUrl(`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`);
    } else if (location) {
      // If only location name is provided, use that
      setMapUrl(`https://www.google.com/maps?q=${encodeURIComponent(location)}&z=15&output=embed`);
    }
  }, [location, coordinates]);

  const handleMapLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-salik-lightGray z-10">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-salik-gray border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-salik-darkGray">Loading map...</p>
          </div>
        </div>
      )}
      
      {mapUrl && (
        <iframe
          src={mapUrl}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
          onLoad={handleMapLoaded}
        />
      )}
    </div>
  );
};

export default MapPlaceholder;
