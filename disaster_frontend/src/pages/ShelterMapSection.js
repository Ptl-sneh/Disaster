/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Leaflet setup
import L from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// ✅ Custom house icon using PUBLIC folder path (no import needed)
const customHouseIcon = new L.Icon({
  iconUrl: "/assets/hm.png", // correct relative path from public/
  iconSize: [32, 45],
  iconAnchor: [19, 45],
  popupAnchor: [0, -45],
  shadowUrl: markerShadow,
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

const shelterMapSection = () => {
  const [Shelters, setShelters] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/shelters/")
      .then((res) => setShelters(res.data))
      .catch((err) => console.error("Error fetching Shelters:", err));
  }, []);

  return (
    <div className="col-lg-12" style={{ height: "400px", marginBottom: "100px" }}>
      <div className="card border-0 shadow-lg animate-slide-in-right">
        <div className="card-body">
          <div className="rounded-3 mb-3">
            <MapContainer
              center={[23.0225, 72.5714]} // Ahmedabad
              zoom={13}
              scrollWheelZoom={true}
              style={{
                height: "400px",
                width: "100%",
                borderRadius: "0.5rem",
              }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {Shelters.filter(
                (shelter) =>
                  shelter.latitude !== null &&
                  shelter.longitude !== null &&
                  !isNaN(parseFloat(shelter.latitude)) &&
                  !isNaN(parseFloat(shelter.longitude))
              ).map((shelter) => (
                <Marker
                  key={shelter.id}
                  position={[
                    parseFloat(shelter.latitude),
                    parseFloat(shelter.longitude),
                  ]}
                  icon={customHouseIcon}
                >
                  <Popup>
                    <strong>{shelter.shelter_type}</strong>
                    <br />
                    {shelter.location || "Unknown Location"}
                    <br />
                    Status: {shelter.description || "No details"}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default shelterMapSection;
