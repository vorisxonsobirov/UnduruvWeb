import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import L from 'leaflet';

// Кастомный маркер (иначе будет пустой маркер по умолчанию)
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const ChangeView = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const Map = () => {
  const [position, setPosition] = useState([41.3111, 69.2797]); // По умолчанию: Ташкент
  const [found, setFound] = useState(false);
  const mapRef = useRef();

  const handleFindMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation не поддерживается в этом браузере.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
        setFound(true);
        mapRef.current?.flyTo([latitude, longitude], 14);
      },
      (error) => {
        console.error("Ошибка геолокации:", error);
        alert("Не удалось определить ваше местоположение. Разрешите доступ.");
      }
    );
  };

  return (
    <div className="map-wrapper">
      <h2>📍 Мое местоположение</h2>
      <button className="btn-find-me" onClick={handleFindMe}>
        Найти меня
      </button>

      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '400px', width: '100%' }}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={position} />
        <Marker position={position} icon={customIcon}>
          <Popup>{found ? 'Вы здесь 🧭' : 'Начальная точка'}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
