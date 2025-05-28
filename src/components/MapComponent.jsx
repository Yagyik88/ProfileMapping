import React, { useEffect, useRef } from 'react';
import './MapComponent.css';

const MapComponent = ({ latitude, longitude, address }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 14
      });

      markerRef.current = new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: address || "Profile Location"
      });

      if (address) {
        new window.google.maps.InfoWindow({
          content: address
        }).open(map, markerRef.current);
      }
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `AIzaSyCLm6-I9DhHzyQZ2541ONxD6d7thNxqV4A`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [latitude, longitude, address]);

  if (!latitude || !longitude) {
    return <div className="map-error">No location data available</div>;
  }

  return (
    <div className="map-container">
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default MapComponent;