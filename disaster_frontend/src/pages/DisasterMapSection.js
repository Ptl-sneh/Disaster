import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// ✅ FIX: Import Leaflet and default marker icons
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// ✅ Override the default icon path resolution
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const DisasterMapSection = () => {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/disasters/")
      .then((res) => setDisasters(res.data))
      .catch((err) => console.error("Error fetching disasters:", err));
  }, []);

  return (
    <div className="col-lg-12" style={{ height: "650px", marginBottom: '125px' }}>
      <div className="card border-0 shadow-lg animate-slide-in-right">
        <div className="card-body">
          <div className="rounded-3 mb-3">
            <MapContainer
              center={[23.0225, 72.5714]} // Ahmedabad
              zoom={6}
              scrollWheelZoom={true}
              style={{
                height: "650px",
                width: "100%",
                borderRadius: "0.5rem",
              }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {disasters
                .filter(
                  (disaster) =>
                    disaster.latitude !== null &&
                    disaster.longitude !== null &&
                    !isNaN(parseFloat(disaster.latitude)) &&
                    !isNaN(parseFloat(disaster.longitude))
                )
                .map((disaster) => (
                  <Marker
                    key={disaster.id}
                    position={[
                      parseFloat(disaster.latitude),
                      parseFloat(disaster.longitude),
                    ]}
                  >
                    <Popup>
                      <strong>{disaster.type}</strong>
                      <br />
                      {disaster.location}
                      <br />
                      Status: {disaster.description}
                      <br />
                      Time: {disaster.timestamp}
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

export default DisasterMapSection;
