"use client";

import { divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

function FitBothMarkers({ points }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(points, { padding: [42, 42], maxZoom: 14 });
  }, [map, points]);
  return null;
}

const courierIcon = divIcon({ className: "delivery-map-marker courier", html: "<span aria-hidden='true'>🛵</span>", iconSize: [36, 36], iconAnchor: [18, 18] });
const destinationIcon = divIcon({ className: "delivery-map-marker destination", html: "<span aria-hidden='true'>📍</span>", iconSize: [36, 36], iconAnchor: [18, 34] });

export default function DeliveryMap({ courier, destination }) {
  const points = [courier, destination];
  return (
    <MapContainer center={courier} zoom={13} scrollWheelZoom className="delivery-map" aria-label="Map showing the courier and delivery destination">
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={courier} icon={courierIcon}><Popup>Courier Dawit</Popup></Marker>
      <Marker position={destination} icon={destinationIcon}><Popup>Delivery destination</Popup></Marker>
      <FitBothMarkers points={points} />
    </MapContainer>
  );
}
