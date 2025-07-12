"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ReportPage = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    disasterType: "",
    description: "",
    latitude: "",
    longitude: "",
    severity: "",
    contactInfo: "",
    image: null,
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const disasterTypes = [
    "Earthquake",
    "Flood",
    "Fire",
    "Storm/Hurricane",
    "Tornado",
    "Landslide",
    "Tsunami",
    "Volcanic Eruption",
    "Drought",
    "Other",
  ]

  const severityLevels = [
    { value: "low", label: "Low - Minor damage, no immediate danger" },
    { value: "medium", label: "Medium - Moderate damage, some risk" },
    { value: "high", label: "High - Significant damage, immediate attention needed" },
    { value: "critical", label: "Critical - Life-threatening, emergency response required" },
  ]

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
          }))
        },
        (error) => {
          alert("Unable to get your location. Please enter coordinates manually.")
        },
      )
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.disasterType) {
      newErrors.disasterType = "Please select a disaster type"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters"
    }

    if (!formData.latitude) {
      newErrors.latitude = "Latitude is required"
    } else if (isNaN(formData.latitude) || Math.abs(formData.latitude) > 90) {
      newErrors.latitude = "Please enter a valid latitude (-90 to 90)"
    }

    if (!formData.longitude) {
      newErrors.longitude = "Longitude is required"
    } else if (isNaN(formData.longitude) || Math.abs(formData.longitude) > 180) {
      newErrors.longitude = "Please enter a valid longitude (-180 to 180)"
    }

    if (!formData.severity) {
      newErrors.severity = "Please select severity level"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success message
      alert("Disaster report submitted successfully! Emergency services have been notified.")

      // Redirect to dashboard
      navigate("/dashboard")
    } catch (error) {
      alert("Error submitting report. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`report-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Header */}
            <div className="text-center mb-5 animate-fade-in">
              <h1 className="display-5 fw-bold mb-3">🚨 Report Emergency</h1>
              <p className="lead text-muted">
                Provide detailed information to help emergency responders act quickly and effectively.
              </p>
              <div className="alert alert-warning" role="alert">
                <strong>⚠️ Emergency?</strong> If this is a life-threatening emergency, call 911 immediately!
              </div>
            </div>

            {/* Report Form */}
            <div className="card border-0 shadow-lg animate-fade-in-up">
              <div className="card-header bg-danger text-white p-4">
                <h4 className="mb-0">📋 Disaster Report Form</h4>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Disaster Type */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="disasterType" className="form-label fw-bold">
                        🏷️ Disaster Type *
                      </label>
                      <select
                        className={`form-select ${errors.disasterType ? "is-invalid" : ""}`}
                        id="disasterType"
                        name="disasterType"
                        value={formData.disasterType}
                        onChange={handleInputChange}
                      >
                        <option value="">Select disaster type...</option>
                        {disasterTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.disasterType && <div className="invalid-feedback">{errors.disasterType}</div>}
                    </div>

                    {/* Severity */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="severity" className="form-label fw-bold">
                        ⚠️ Severity Level *
                      </label>
                      <select
                        className={`form-select ${errors.severity ? "is-invalid" : ""}`}
                        id="severity"
                        name="severity"
                        value={formData.severity}
                        onChange={handleInputChange}
                      >
                        <option value="">Select severity...</option>
                        {severityLevels.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                      {errors.severity && <div className="invalid-feedback">{errors.severity}</div>}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label fw-bold">
                      📝 Description *
                    </label>
                    <textarea
                      className={`form-control ${errors.description ? "is-invalid" : ""}`}
                      id="description"
                      name="description"
                      rows="4"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Provide detailed information about the disaster, including what happened, current situation, number of people affected, etc."
                    ></textarea>
                    <div className="form-text">{formData.description.length}/500 characters</div>
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                  </div>

                  {/* Location */}
                  <div className="row">
                    <div className="col-md-5 mb-3">
                      <label htmlFor="latitude" className="form-label fw-bold">
                        📍 Latitude *
                      </label>
                      <input
                        type="number"
                        step="any"
                        className={`form-control ${errors.latitude ? "is-invalid" : ""}`}
                        id="latitude"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleInputChange}
                        placeholder="e.g., 40.7128"
                      />
                      {errors.latitude && <div className="invalid-feedback">{errors.latitude}</div>}
                    </div>
                    <div className="col-md-5 mb-3">
                      <label htmlFor="longitude" className="form-label fw-bold">
                        📍 Longitude *
                      </label>
                      <input
                        type="number"
                        step="any"
                        className={`form-control ${errors.longitude ? "is-invalid" : ""}`}
                        id="longitude"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleInputChange}
                        placeholder="e.g., -74.0060"
                      />
                      {errors.longitude && <div className="invalid-feedback">{errors.longitude}</div>}
                    </div>
                    <div className="col-md-2 mb-3">
                      <label className="form-label">&nbsp;</label>
                      <button type="button" className="btn btn-outline-primary w-100" onClick={getCurrentLocation}>
                        📱 Get Location
                      </button>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mb-3">
                    <label htmlFor="contactInfo" className="form-label fw-bold">
                      📞 Contact Information (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contactInfo"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleInputChange}
                      placeholder="Phone number or email for follow-up"
                    />
                    <div className="form-text">
                      Provide contact info if you're willing to be contacted for additional information.
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="mb-4">
                    <label htmlFor="image" className="form-label fw-bold">
                      📷 Upload Image (Optional)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleInputChange}
                    />
                    <div className="form-text">
                      Upload a photo of the disaster scene to help responders assess the situation.
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-danger btn-lg btn-animated" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Submitting Report...
                        </>
                      ) : (
                        "🚨 Submit Emergency Report"
                      )}
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/dashboard")}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="card border-0 shadow-lg mt-4 animate-fade-in-up">
              <div className="card-header bg-warning text-dark p-3">
                <h5 className="mb-0">📞 Emergency Contacts</h5>
              </div>
              <div className="card-body p-3">
                <div className="row text-center">
                  <div className="col-md-3 mb-2">
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="me-2">🚑</span>
                      <div>
                        <strong>Emergency</strong>
                        <br />
                        <span className="text-danger">911</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-2">
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="me-2">🚒</span>
                      <div>
                        <strong>Fire Dept</strong>
                        <br />
                        <span className="text-danger">(555) 123-4567</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-2">
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="me-2">👮</span>
                      <div>
                        <strong>Police</strong>
                        <br />
                        <span className="text-primary">(555) 987-6543</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-2">
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="me-2">🏥</span>
                      <div>
                        <strong>Hospital</strong>
                        <br />
                        <span className="text-success">(555) 456-7890</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportPage
