"use client"

import { useState,useEffect } from "react"
import axios from "axios"
import ShelterMapSection from "./ShelterMapSection"

const SheltersPage = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [shelters, setShelters] = useState([])

useEffect(() => {
  axios.get("http://127.0.0.1:8000/api/shelters/")
    .then((res) => {
      const transformed = res.data.map((shelter) => ({
        ...shelter,
        location: shelter.location || "Unknown location",
        currentOccupancy: shelter.current_occupancy || 0,
        contact: shelter.contact || "(N/A)",
        verified: shelter.verified || false,
        amenities: shelter.amenities || [],
        type: shelter.shelter_type,
        coordinates: {
          lat: shelter.latitude,
          lng: shelter.longitude,
        }
      }))
      setShelters(transformed)
    })
    .catch((err) => {
      console.error("Error fetching shelters:", err)
    })
}, [])


  const filteredShelters = shelters.filter((shelter) => {
    const matchesSearch =
      shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shelter.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterType === "all" ||
      (filterType === "verified" && shelter.verified) ||
      (filterType === "available" && shelter.current_occupancy < shelter.capacity) ||
      shelter.type === filterType
    console.log(shelter.type + filterType)
    return matchesSearch && matchesFilter
  })

  const getOccupancyColor = (current, capacity) => {
    const percentage = (current / capacity) * 100
    if (percentage < 50) return "success"
    if (percentage < 80) return "warning"
    return "danger"
  }

  const getOccupancyPercentage = (current, capacity) => {
    return Math.round((current / capacity) * 100)
  }

  return (
    <div className={`shelters-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-5 fw-bold mb-3">🏠 Emergency Shelters</h1>
          <p className="lead text-muted">
            Find safe, verified emergency shelters in your area with real-time availability.
          </p>
        </div>

        {/* Map Section */}
        <ShelterMapSection/>

        {/* Search and Filter */}
        <div className="card border-0 shadow-lg mb-4 animate-slide-in-left">
          <div className="card-body p-4">
            <div className="row">
              <div className="col-md-8 mb-3">
                <div className="input-group">
                  <span className="input-group-text">🔍</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search shelters by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option value="all">All Shelters</option>
                  <option value="verified">Verified Only</option>
                  <option value="available">Available Space</option>
                  <option value="community">Community Centers</option>
                  <option value="emergency">Emergency Shelters</option>
                  <option value="school">School Facilities</option>
                  <option value="religious">Religious Centers</option>
                  <option value="hotel">Hotel Housing</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted">
                Showing {filteredShelters.length} of {shelters.length} shelters
              </span>
              <div className="d-flex gap-2">
                <span className="badge bg-success">🟢 Available</span>
                <span className="badge bg-warning">🟡 Limited</span>
                <span className="badge bg-danger">🔴 Full</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shelters Grid */}
        <div className="row">
          {filteredShelters.map((shelter, index) => (
            <div key={shelter.id} className="col-lg-6 mb-4">
              <div
                className={`card card-hover h-100 border-0 shadow-lg animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-header bg-transparent border-0 p-4">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="mb-1 fw-bold">{shelter.name}</h5>
                      <p className="text-muted mb-0">📍 {shelter.location}</p>
                    </div>
                    <div className="text-end">
                      {shelter.verified && <span className="badge bg-success m-2">✅ Verified</span>}
                      <div className={`badge bg-${getOccupancyColor(shelter.current_occupancy, shelter.capacity)}`}>
                        {getOccupancyPercentage(shelter.current_occupancy, shelter.capacity)}% Full
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body p-4 pt-0">
                  {/* Capacity Info */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Occupancy</span>
                      <span>
                        {shelter.current_occupancy}/{shelter.capacity}
                      </span>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className={`progress-bar bg-${getOccupancyColor(shelter.current_occupancy, shelter.capacity)}`}
                        style={{ width: `${getOccupancyPercentage(shelter.current_occupancy, shelter.capacity)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mb-3">
                    <p className="mb-1">
                      <strong>📞 Contact:</strong>
                      <a href={`tel:${shelter.contact}`} className="text-decoration-none ms-1">
                        {shelter.contact}
                      </a>
                    </p>
                  </div>

                  {/* Amenities */}
                  <div className="mb-3">
                    <p className="mb-2">
                      <strong>🏷️ Amenities:</strong>
                    </p>
                    <div className="d-flex flex-wrap gap-1">
                      {shelter.amenities.map((amenity, idx) => (
                        <span key={idx} className="badge bg-secondary">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-grid gap-2 d-md-flex">
                    <button className="btn btn-primary btn-sm flex-fill">📍 Get Directions</button>
                    <button className="btn btn-outline-primary btn-sm flex-fill">📞 Call Now</button>
                    <button className="btn btn-outline-secondary btn-sm">ℹ️ More Info</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredShelters.length === 0 && (
          <div className="text-center py-5 animate-fade-in">
            <div className="display-1 mb-3">🔍</div>
            <h3>No shelters found</h3>
            <p className="text-muted">Try adjusting your search criteria or filters.</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm("")
                setFilterType("all")
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Emergency Info */}
        <div className="card border-0 shadow-lg mt-5 animate-fade-in-up">
          <div className="card-header bg-info text-white p-4">
            <h4 className="mb-0">ℹ️ Important Information</h4>
          </div>
          <div className="card-body p-4">
            <div className="row">
              <div className="col-md-6 mb-3">
                <h6 className="fw-bold">🎒 What to Bring:</h6>
                <ul className="list-unstyled">
                  <li>• Valid ID and important documents</li>
                  <li>• Medications and medical supplies</li>
                  <li>• Change of clothes and personal items</li>
                  <li>• Phone charger and emergency contacts</li>
                </ul>
              </div>
              <div className="col-md-6 mb-3">
                <h6 className="fw-bold">📋 Shelter Rules:</h6>
                <ul className="list-unstyled">
                  <li>• No alcohol, drugs, or weapons</li>
                  <li>• Respect other residents and staff</li>
                  <li>• Follow check-in/check-out procedures</li>
                  <li>• Keep personal belongings secure</li>
                </ul>
              </div>
            </div>
            <div className="alert alert-warning mt-3" role="alert">
              <strong>⚠️ Note:</strong> Shelter availability changes rapidly during emergencies. Call ahead to confirm
              space before traveling.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SheltersPage
    