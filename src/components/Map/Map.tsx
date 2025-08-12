
import styled from './Map.module.css';  
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import type { Location, Weather } from "../../types/Weather";

// Fix leaflet's default icon image issue in React bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});


type Props = {
  locationData: Location | null;
  currentWeather: Weather | null;
};
//props destructuring 
const Map = ({ locationData, currentWeather }: Props) => {
  if (!locationData || !currentWeather) return null;

  const position: [number, number] = [locationData.lat, locationData.lon];

  return (
    <MapContainer
      center={position}
      zoom={10}
      scrollWheelZoom={false}
      className={styled.mapContainer}   
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <div className={styled.popupColor}>
            <strong>{locationData.name}, {locationData.country}</strong><br />
            Temp: {currentWeather.temp_c}°C<br />
            Condition: {currentWeather.condition.text}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
