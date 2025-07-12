"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const VolunteersPage = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterAvailability, setFilterAvailability] = useState("all")
  const navigate = useNavigate()

  const [volunteers] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Medical Professional",
      specialization: "Emergency Medicine",
      contact: "sarah.j@email.com",
      phone: "(555) 123-4567",
      availability: "available",
      location: "Downtown Medical Center",
      experience: "15 years",
      certifications: ["EMT", "CPR", "First Aid"],
      languages: ["English", "Spanish"],
      avatar: "👩‍⚕️",
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      role: "Search & Rescue",
      specialization: "Urban Search and Rescue",
      contact: "mike.r@email.com",
      phone: "(555) 987-6543",
      availability: "busy",
      location: "Fire Station 12",
      experience: "8 years",
      certifications: ["USAR", "Rope Rescue", "Confined Space"],
      languages: ["English", "Spanish"],
      avatar: "👨‍🚒",
    },
    {
      id: 3,
      name: "Lisa Chen",
      role: "Communications",
      specialization: "Emergency Communications",
      contact: "lisa.c@email.com",
      phone: "(555) 456-7890",
      availability: "available",
      location: "Emergency Operations Center",
      experience: "5 years",
      certifications: ["Ham Radio", "FEMA ICS"],
      languages: ["English", "Mandarin"],
      avatar: "👩‍💻",
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Logistics Coordinator",
      specialization: "Supply Chain Management",
      contact: "james.w@email.com",
      phone: "(555) 234-5678",
      availability: "available",
      location: "Distribution Center",
      experience: "12 years",
      certifications: ["Supply Chain", "Warehouse Management"],
      languages: ["English"],
      avatar: "👨‍💼",
    },
    {
      id: 5,
      name: "Maria Garcia",
      role: "Mental Health Support",
      specialization: "Crisis Counseling",
      contact: "maria.g@email.com",
      phone: "(555) 345-6789",
      availability: "offline",
      location: "Community Health Center",
      experience: "10 years",
      certifications: ["Licensed Counselor", "Crisis Intervention"],
      languages: ["English", "Spanish", "Portuguese"],
      avatar: "👩‍🎓",
    },
    {
      id: 6,
      name: "David Kim",
      role: "Transportation",
      specialization: "Emergency Transport",
      contact: "david.k@email.com",
      phone: "(555) 567-8901",
      availability: "available",
      location: "Transport Hub",
      experience: "6 years",
      certifications: ["CDL", "Defensive Driving", "First Aid"],
      languages: ["English", "Korean"],
      avatar: "👨‍✈️",
    },
    {
      id: 7,
      name: "Emily Brown",
      role: "Shelter Management",
      specialization: "Emergency Shelter Operations",
      contact: "emily.b@email.com",
      phone: "(555) 678-9012",
      availability: "busy",
      location: "Community Center",
      experience: "7 years",
      certifications: ["Shelter Management", "Food Safety"],
      languages: ["English", "French"],
      avatar: "👩‍🏫",
    },
    {
      id: 8,
      name: "Robert Taylor",
      role: "Technical Support",
      specialization: "IT & Communications",
      contact: "robert.t@email.com",
      phone: "(555) 789-0123",
      availability: "available",
      location: "Tech Operations Center",
      experience: "9 years",
      certifications: ["Network+", "Security+", "ITIL"],
      languages: ["English"],
      avatar: "👨‍💻",
    },
  ])

  const roles = [
    "Medical Professional",
    "Search & Rescue",
    "Communications",
    "Logistics Coordinator",
    "Mental Health Support",
    "Transportation",
    "Shelter Management",
    "Technical Support",
  ]

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const matchesSearch =
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || volunteer.role === filterRole
    const matchesAvailability = filterAvailability === "all" || volunteer.availability === filterAvailability
    return matchesSearch && matchesRole && matchesAvailability
  })

  const getAvailabilityBadge = (availability) => {
    switch (availability) {
      case "available":
        return { class: "badge-available", text: "🟢 Available", icon: "✅" }
      case "busy":
        return { class: "badge-busy", text: "🟡 Busy", icon: "⏳" }
      case "offline":
        return { class: "badge-offline", text: "🔴 Offline", icon: "❌" }
      default:
        return { class: "badge-offline", text: "❓ Unknown", icon: "❓" }
    }
  }

  const getAvailabilityStats = () => {
    const available = volunteers.filter((v) => v.availability === "available").length
    const busy = volunteers.filter((v) => v.availability === "busy").length
    const offline = volunteers.filter((v) => v.availability === "offline").length
    return { available, busy, offline }
  }

  const handleContactVolunteer = (volunteer) => {
    if (volunteer.availability === "offline") {
      alert("This volunteer is currently offline and cannot be contacted.")
      return
    }

    const message = `Hello ${volunteer.name}, I found your profile on DisasterWatch and would like to connect regarding emergency response coordination.`
    window.location.href = `mailto:${volunteer.contact}?subject=DisasterWatch Contact Request&body=${encodeURIComponent(message)}`
  }

  const handleCallVolunteer = (volunteer) => {
    if (volunteer.availability === "offline") {
      alert("This volunteer is currently offline and cannot be contacted.")
      return
    }

    window.location.href = `tel:${volunteer.phone}`
  }

  const handleViewProfile = (volunteer) => {
    alert(
      `Viewing detailed profile for ${volunteer.name}\n\nRole: ${volunteer.role}\nExperience: ${volunteer.experience}\nLocation: ${volunteer.location}\nSpecialization: ${volunteer.specialization}`,
    )
  }

  const stats = getAvailabilityStats()

  return (
    <div className={`volunteers-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-5 fw-bold mb-3">👥 Emergency Volunteers</h1>
          <p className="lead text-muted">
            Connect with trained volunteers ready to help during emergencies and disasters.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4 animate-fade-in-up">
          <div className="col-md-4 mb-3">
            <div className="card card-hover border-0 shadow-lg">
              <div className="card-body text-center p-4">
                <div className="display-4 mb-2">✅</div>
                <h3 className="text-success">{stats.available}</h3>
                <h6 className="text-muted">Available Now</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card card-hover border-0 shadow-lg">
              <div className="card-body text-center p-4">
                <div className="display-4 mb-2">⏳</div>
                <h3 className="text-warning">{stats.busy}</h3>
                <h6 className="text-muted">Currently Busy</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card card-hover border-0 shadow-lg">
              <div className="card-body text-center p-4">
                <div className="display-4 mb-2">👥</div>
                <h3 className="text-primary">{volunteers.length}</h3>
                <h6 className="text-muted">Total Volunteers</h6>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="card border-0 shadow-lg mb-4 animate-slide-in-left">
          <div className="card-body p-4">
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="input-group">
                  <span className="input-group-text">🔍</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search volunteers by name, role, or specialization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <select className="form-select" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                  <option value="all">All Roles</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <select
                  className="form-select"
                  value={filterAvailability}
                  onChange={(e) => setFilterAvailability(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted">
                Showing {filteredVolunteers.length} of {volunteers.length} volunteers
              </span>
              <button className="btn btn-success btn-sm" onClick={() => navigate("/volunteer-application")}>
                🚀 Become a Volunteer
              </button>
            </div>
          </div>
        </div>

        {/* Volunteers Grid */}
        <div className="row">
          {filteredVolunteers.map((volunteer, index) => (
            <div key={volunteer.id} className="col-lg-6 mb-4">
              <div
                className={`card card-hover h-100 border-0 shadow-lg animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-body p-4">
                  {/* Header */}
                  <div className="d-flex align-items-start mb-3">
                    <div className="me-3">
                      <div
                        className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "60px", height: "60px", fontSize: "24px" }}
                      >
                        {volunteer.avatar}
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="mb-1 fw-bold">{volunteer.name}</h5>
                          <p className="text-muted mb-1">{volunteer.role}</p>
                          <small className="text-muted">{volunteer.specialization}</small>
                        </div>
                        <span className={`badge ${getAvailabilityBadge(volunteer.availability).class}`}>
                          {getAvailabilityBadge(volunteer.availability).text}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mb-3">
                    <div className="row text-sm">
                      <div className="col-6 mb-2">
                        <strong>📍 Location:</strong>
                        <br />
                        <small className="text-muted">{volunteer.location}</small>
                      </div>
                      <div className="col-6 mb-2">
                        <strong>⏱️ Experience:</strong>
                        <br />
                        <small className="text-muted">{volunteer.experience}</small>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-3">
                    <strong className="small">🏆 Certifications:</strong>
                    <div className="d-flex flex-wrap gap-1 mt-1">
                      {volunteer.certifications.map((cert, idx) => (
                        <span key={idx} className="badge bg-secondary small">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-3">
                    <strong className="small">🌐 Languages:</strong>
                    <div className="d-flex flex-wrap gap-1 mt-1">
                      {volunteer.languages.map((lang, idx) => (
                        <span key={idx} className="badge bg-info small">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="d-grid gap-2 d-md-flex">
                    <button
                      className="btn btn-primary btn-sm flex-fill"
                      disabled={volunteer.availability === "offline"}
                      onClick={() => handleContactVolunteer(volunteer)}
                    >
                      📧 Contact
                    </button>
                    <button
                      className="btn btn-outline-primary btn-sm flex-fill"
                      disabled={volunteer.availability === "offline"}
                      onClick={() => handleCallVolunteer(volunteer)}
                    >
                      📞 Call
                    </button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => handleViewProfile(volunteer)}>
                      ℹ️ Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredVolunteers.length === 0 && (
          <div className="text-center py-5 animate-fade-in">
            <div className="display-1 mb-3">🔍</div>
            <h3>No volunteers found</h3>
            <p className="text-muted">Try adjusting your search criteria or filters.</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm("")
                setFilterRole("all")
                setFilterAvailability("all")
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="card border-0 shadow-lg mt-5 animate-fade-in-up">
          <div className="card-body p-5 text-center">
            <h3 className="mb-3">🚀 Join Our Volunteer Network</h3>
            <p className="lead mb-4">
              Make a difference in your community. Join thousands of volunteers helping during emergencies.
            </p>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light border-0">
                      <div className="card-body p-3">
                        <h6 className="fw-bold">📋 Requirements</h6>
                        <ul className="list-unstyled small mb-0">
                          <li>• 18+ years old</li>
                          <li>• Background check</li>
                          <li>• Basic training completion</li>
                          <li>• Commitment to help</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light border-0">
                      <div className="card-body p-3">
                        <h6 className="fw-bold">🎯 Benefits</h6>
                        <ul className="list-unstyled small mb-0">
                          <li>• Free training & certification</li>
                          <li>• Flexible scheduling</li>
                          <li>• Community impact</li>
                          <li>• Networking opportunities</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-success btn-lg btn-animated px-5"
                  onClick={() => navigate("/volunteer-application")}
                >
                  🚀 Apply to Volunteer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VolunteersPage
