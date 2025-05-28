import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const Map = ({ location }) => {
  if (!location) return <div className="map-error">No location data</div>;

  return (
    <LoadScript 
      googleMapsApiKey="AIzaSyCLm6-I9DhHzyQZ2541ONxD6d7thNxqV4A" 
      loadingElement={<div className="map-loading">Loading Map...</div>}
    >
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={location}
        zoom={12}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;


