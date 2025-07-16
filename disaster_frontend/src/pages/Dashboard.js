/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import DisasterMapSection from './DisasterMapSection'
import axios from 'axios'

const Dashboard = ({ darkMode }) => {
  const [stats, setStats] = useState({
    totalDisasters: 247,
    verifiedShelters: 1834,
    registeredVolunteers: 5692,
    activeReports: 23,
  })

  const [disasterReports, setDisasterReports] = useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/disasters/")
      .then((response) => {
        // Sort disasters by most recent
        const sorted = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        setDisasterReports(sorted)
        console.log(sorted)
      })
      .catch((error) => {
        console.error("Error fetching disaster reports:", error)
      })
  }, [])

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-danger"
      case "High":
        return "bg-warning"
      case "Moderate":
        return "bg-info"
      case "Low":
        return "bg-secondary"
      default:
        return "bg-secondary"
    }
  }

  return (
    <div className={`dashboard-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className="container">
        {/* Header */}
        <div className="row mb-4 animate-fade-in">
          <div className="col-md-8">
            <h1 className="display-5 fw-bold mb-2">📊 Emergency Dashboard</h1>
            <p className="lead text-muted">Real-time disaster monitoring and response coordination</p>
          </div>
          <div className="col-md-4 text-md-end">
            <Link
              to="/report"
              className="btn btn-lg btn-animated "
              style={{
                position: "fixed",
                bottom: "40px",
                right: "40px",
                zIndex: 9999,
                borderRadius: "50px",
                padding: "12px 20px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                backgroundColor: "rgba(116, 113, 113, 0.63)"
              }}
            >
              🚨 Report
            </Link>
          </div>
        </div>

        {/* Map Section */}
        <DisasterMapSection />

        <div className="row mb-4">
          {/* Recent Reports */}
          <div className="col-lg-9 mb-4">
            <div className="card border-0 shadow-lg animate-slide-in-left">
              <div className="card-header bg-transparent border-0 p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0 mx-auto">📋 Recent Disaster Reports</h4>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0 text-center">
                    <thead className={darkMode ? "table-dark" : "table-light"}>
                      <tr>
                        <th className="text-center">Type</th>
                        <th className="text-center">Description</th>
                        <th className="text-center">Location</th>
                        <th className="text-center">Severity</th>
                        <th className="text-center">Reporter</th>
                      </tr>
                    </thead>
                    <tbody>
                      {disasterReports.slice(0, 5).map((report) => (
                        <tr key={report.id}>
                          <td className="text-center fw-bold">{report.type}</td>
                          <td className="text-center">{report.description}</td>
                          <td className="text-center">{report.address}</td>
                          <td className="text-center">
                            <span className={`badge ${getSeverityBadge(report.severity_level)}`}>
                              {report.severity_level}
                            </span>
                          </td>
                          <td className="text-center">{report.reported_by || "Unknown"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-lg-3 mb-4">
            <div className="card border-0 shadow-lg animate-slide-in-right">
              <div className="card-header bg-transparent border-0 p-3">
                <h5 className="mb-0">⚡ Quick Actions</h5>
              </div>
              <div className="card-body p-2">
                <div className="d-grid gap-2">
                  <Link to="/report" className="btn btn-danger btn-animated">
                    🚨 Report Emergency
                  </Link>
                  <Link to="/shelters" className="btn btn-primary btn-animated">
                    🏠 Find Shelter
                  </Link>
                  <Link to="/volunteers" className="btn btn-success btn-animated">
                    🤝 Join Volunteers
                  </Link>
                  <button className="btn btn-warning btn-animated">📞 Emergency Contacts</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row animate-fade-in-up">
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card card-hover h-100 border-0 shadow-lg">
              <div className="card-body text-center p-4">
                <div className="display-4 mb-3">🚨</div>
                <h3 className="stats-counter text-danger">{stats.totalDisasters}</h3>
                <h6 className="text-muted">Total Disasters</h6>
                <small className="text-success">↑ 12% from last month</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card card-hover h-100 border-0 shadow-lg">
              <div className="card-body text-center p-4">
                <div className="display-4 mb-3">🏠</div>
                <h3 className="stats-counter text-primary">{stats.verifiedShelters}</h3>
                <h6 className="text-muted">Verified Shelters</h6>
                <small className="text-success">↑ 8% from last month</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card card-hover h-100 border-0 shadow-lg">
              <div className="card-body text-center p-4">
                <div className="display-4 mb-3">👥</div>
                <h3 className="stats-counter text-success">{stats.registeredVolunteers}</h3>
                <h6 className="text-muted">Active Volunteers</h6>
                <small className="text-success">↑ 15% from last month</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card card-hover h-100 border-0 shadow-lg">
              <div className="card-body text-center p-4">
                <div className="display-4 mb-3">📋</div>
                <h3 className="stats-counter text-warning">{stats.activeReports}</h3>
                <h6 className="text-muted">Active Reports</h6>
                <small className="text-danger">↑ 23% from yesterday</small>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
