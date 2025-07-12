"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const VolunteerApplicationPage = ({ darkMode, user }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContact: "",
    emergencyPhone: "",

    // Volunteer Preferences
    volunteerType: "",
    availability: [],
    skills: [],
    experience: "",
    languages: [],
    transportation: "",
    travelDistance: "",

    // Background & Certifications
    backgroundCheck: false,
    certifications: [],
    medicalTraining: [],
    previousVolunteer: "",
    references: [
      { name: "", phone: "", relationship: "" },
      { name: "", phone: "", relationship: "" },
    ],

    // Additional Information
    motivation: "",
    specialNeeds: "",
    agreement: false,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const volunteerTypes = [
    "Medical Professional",
    "Search & Rescue",
    "Communications",
    "Logistics Coordinator",
    "Mental Health Support",
    "Transportation",
    "Shelter Management",
    "Technical Support",
    "General Volunteer",
  ]

  const availabilityOptions = ["Weekdays", "Weekends", "Evenings", "24/7 On-Call", "Emergency Only", "Scheduled Events"]

  const skillsOptions = [
    "First Aid/CPR",
    "Medical Training",
    "Heavy Equipment Operation",
    "Construction/Repair",
    "Food Service",
    "Childcare",
    "Translation",
    "IT/Technology",
    "Photography/Documentation",
    "Administrative",
    "Public Speaking",
    "Social Media",
  ]

  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "Mandarin",
    "Arabic",
    "Portuguese",
    "Russian",
    "German",
    "Japanese",
    "Korean",
  ]

  const certificationOptions = [
    "CPR Certified",
    "First Aid Certified",
    "EMT License",
    "Nursing License",
    "Ham Radio License",
    "CDL License",
    "CERT Training",
    "FEMA ICS Training",
    "Red Cross Training",
    "Search & Rescue Certified",
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      if (
        name === "availability" ||
        name === "skills" ||
        name === "languages" ||
        name === "certifications" ||
        name === "medicalTraining"
      ) {
        setFormData((prev) => ({
          ...prev,
          [name]: checked ? [...prev[name], value] : prev[name].filter((item) => item !== value),
        }))
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }))
      }
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

  const handleReferenceChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.map((ref, i) => (i === index ? { ...ref, [field]: value } : ref)),
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
      if (!formData.address.trim()) newErrors.address = "Address is required"
      if (!formData.city.trim()) newErrors.city = "City is required"
      if (!formData.state.trim()) newErrors.state = "State is required"
      if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = "Emergency contact is required"
      if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = "Emergency phone is required"
    }

    if (step === 2) {
      if (!formData.volunteerType) newErrors.volunteerType = "Please select volunteer type"
      if (formData.availability.length === 0) newErrors.availability = "Please select availability"
      if (!formData.transportation) newErrors.transportation = "Please specify transportation"
      if (!formData.travelDistance) newErrors.travelDistance = "Please specify travel distance"
    }

    if (step === 3) {
      if (!formData.backgroundCheck) newErrors.backgroundCheck = "Background check consent is required"
      if (!formData.previousVolunteer) newErrors.previousVolunteer = "Please specify previous volunteer experience"
    }

    if (step === 4) {
      if (!formData.motivation.trim()) newErrors.motivation = "Please explain your motivation"
      if (!formData.agreement) newErrors.agreement = "You must agree to the terms"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateStep(4)) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      alert(
        "Volunteer application submitted successfully! We'll review your application and contact you within 48 hours.",
      )
      navigate("/volunteers")
    } catch (error) {
      alert("Error submitting application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepIndicator = () => (
    <div className="row mb-4">
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="d-flex flex-column align-items-center">
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center ${
                  step <= currentStep ? "bg-primary text-white" : "bg-light text-muted"
                }`}
                style={{ width: "40px", height: "40px" }}
              >
                {step}
              </div>
              <small className={`mt-1 ${step <= currentStep ? "text-primary" : "text-muted"}`}>
                {step === 1 && "Personal Info"}
                {step === 2 && "Preferences"}
                {step === 3 && "Background"}
                {step === 4 && "Review"}
              </small>
            </div>
          ))}
        </div>
        <div className="progress mt-3" style={{ height: "4px" }}>
          <div className="progress-bar bg-primary" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
        </div>
      </div>
    </div>
  )

  const renderStep1 = () => (
    <div className="animate-fade-in">
      <h4 className="mb-4">👤 Personal Information</h4>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">First Name *</label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Last Name *</label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Email Address *</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Phone Number *</label>
          <input
            type="tel"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="(555) 123-4567"
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Date of Birth *</label>
        <input
          type="date"
          className={`form-control ${errors.dateOfBirth ? "is-invalid" : ""}`}
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
        />
        {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Street Address *</label>
        <input
          type="text"
          className={`form-control ${errors.address ? "is-invalid" : ""}`}
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="123 Main Street"
        />
        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label fw-bold">City *</label>
          <input
            type="text"
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
          />
          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label fw-bold">State *</label>
          <input
            type="text"
            className={`form-control ${errors.state ? "is-invalid" : ""}`}
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="State"
          />
          {errors.state && <div className="invalid-feedback">{errors.state}</div>}
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label fw-bold">ZIP Code *</label>
          <input
            type="text"
            className={`form-control ${errors.zipCode ? "is-invalid" : ""}`}
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            placeholder="12345"
          />
          {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Emergency Contact Name *</label>
          <input
            type="text"
            className={`form-control ${errors.emergencyContact ? "is-invalid" : ""}`}
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleInputChange}
            placeholder="Emergency contact name"
          />
          {errors.emergencyContact && <div className="invalid-feedback">{errors.emergencyContact}</div>}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Emergency Contact Phone *</label>
          <input
            type="tel"
            className={`form-control ${errors.emergencyPhone ? "is-invalid" : ""}`}
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={handleInputChange}
            placeholder="(555) 123-4567"
          />
          {errors.emergencyPhone && <div className="invalid-feedback">{errors.emergencyPhone}</div>}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="animate-fade-in">
      <h4 className="mb-4">🎯 Volunteer Preferences</h4>

      <div className="mb-4">
        <label className="form-label fw-bold">Preferred Volunteer Role *</label>
        <select
          className={`form-select ${errors.volunteerType ? "is-invalid" : ""}`}
          name="volunteerType"
          value={formData.volunteerType}
          onChange={handleInputChange}
        >
          <option value="">Select volunteer type...</option>
          {volunteerTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.volunteerType && <div className="invalid-feedback">{errors.volunteerType}</div>}
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Availability *</label>
        <div className="row">
          {availabilityOptions.map((option) => (
            <div key={option} className="col-md-6 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="availability"
                  value={option}
                  checked={formData.availability.includes(option)}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">{option}</label>
              </div>
            </div>
          ))}
        </div>
        {errors.availability && <div className="text-danger small">{errors.availability}</div>}
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Skills & Expertise</label>
        <div className="row">
          {skillsOptions.map((skill) => (
            <div key={skill} className="col-md-6 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="skills"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">{skill}</label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Languages Spoken</label>
        <div className="row">
          {languageOptions.map((language) => (
            <div key={language} className="col-md-4 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="languages"
                  value={language}
                  checked={formData.languages.includes(language)}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">{language}</label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Previous Experience</label>
        <textarea
          className="form-control"
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          rows="4"
          placeholder="Describe any previous volunteer or emergency response experience..."
        ></textarea>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Transportation *</label>
          <select
            className={`form-select ${errors.transportation ? "is-invalid" : ""}`}
            name="transportation"
            value={formData.transportation}
            onChange={handleInputChange}
          >
            <option value="">Select transportation...</option>
            <option value="own-vehicle">Own Vehicle</option>
            <option value="public-transport">Public Transportation</option>
            <option value="bicycle">Bicycle</option>
            <option value="walking">Walking Only</option>
            <option value="need-transport">Need Transportation</option>
          </select>
          {errors.transportation && <div className="invalid-feedback">{errors.transportation}</div>}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Willing to Travel *</label>
          <select
            className={`form-select ${errors.travelDistance ? "is-invalid" : ""}`}
            name="travelDistance"
            value={formData.travelDistance}
            onChange={handleInputChange}
          >
            <option value="">Select distance...</option>
            <option value="5-miles">Within 5 miles</option>
            <option value="10-miles">Within 10 miles</option>
            <option value="25-miles">Within 25 miles</option>
            <option value="50-miles">Within 50 miles</option>
            <option value="statewide">Statewide</option>
            <option value="nationwide">Nationwide</option>
          </select>
          {errors.travelDistance && <div className="invalid-feedback">{errors.travelDistance}</div>}
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="animate-fade-in">
      <h4 className="mb-4">🔍 Background & Certifications</h4>

      <div className="mb-4">
        <div className="form-check">
          <input
            className={`form-check-input ${errors.backgroundCheck ? "is-invalid" : ""}`}
            type="checkbox"
            name="backgroundCheck"
            checked={formData.backgroundCheck}
            onChange={handleInputChange}
          />
          <label className="form-check-label fw-bold">I consent to a background check *</label>
          {errors.backgroundCheck && <div className="invalid-feedback d-block">{errors.backgroundCheck}</div>}
        </div>
        <small className="text-muted">
          Background checks are required for all volunteers working directly with vulnerable populations.
        </small>
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Certifications & Licenses</label>
        <div className="row">
          {certificationOptions.map((cert) => (
            <div key={cert} className="col-md-6 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="certifications"
                  value={cert}
                  checked={formData.certifications.includes(cert)}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">{cert}</label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Medical Training</label>
        <div className="row">
          {["Basic First Aid", "CPR", "AED", "EMT", "Paramedic", "Nursing", "Medical Doctor", "Mental Health"].map(
            (training) => (
              <div key={training} className="col-md-4 mb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="medicalTraining"
                    value={training}
                    checked={formData.medicalTraining.includes(training)}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">{training}</label>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Previous Volunteer Experience *</label>
        <select
          className={`form-select ${errors.previousVolunteer ? "is-invalid" : ""}`}
          name="previousVolunteer"
          value={formData.previousVolunteer}
          onChange={handleInputChange}
        >
          <option value="">Select experience level...</option>
          <option value="none">No previous experience</option>
          <option value="some">Some volunteer experience</option>
          <option value="extensive">Extensive volunteer experience</option>
          <option value="professional">Professional emergency responder</option>
        </select>
        {errors.previousVolunteer && <div className="invalid-feedback">{errors.previousVolunteer}</div>}
      </div>

      <div className="mb-4">
        <h5 className="fw-bold mb-3">References</h5>
        {formData.references.map((ref, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h6>Reference {index + 1}</h6>
              <div className="row">
                <div className="col-md-4 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={ref.name}
                    onChange={(e) => handleReferenceChange(index, "name", e.target.value)}
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone Number"
                    value={ref.phone}
                    onChange={(e) => handleReferenceChange(index, "phone", e.target.value)}
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Relationship"
                    value={ref.relationship}
                    onChange={(e) => handleReferenceChange(index, "relationship", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="animate-fade-in">
      <h4 className="mb-4">📝 Final Details</h4>

      <div className="mb-4">
        <label className="form-label fw-bold">Why do you want to volunteer with DisasterWatch? *</label>
        <textarea
          className={`form-control ${errors.motivation ? "is-invalid" : ""}`}
          name="motivation"
          value={formData.motivation}
          onChange={handleInputChange}
          rows="4"
          placeholder="Tell us about your motivation to help during emergencies and disasters..."
        ></textarea>
        {errors.motivation && <div className="invalid-feedback">{errors.motivation}</div>}
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Special Needs or Accommodations</label>
        <textarea
          className="form-control"
          name="specialNeeds"
          value={formData.specialNeeds}
          onChange={handleInputChange}
          rows="3"
          placeholder="Any special accommodations or considerations we should be aware of..."
        ></textarea>
      </div>

      <div className="mb-4">
        <div className="card">
          <div className="card-body">
            <h6 className="fw-bold mb-3">Application Summary</h6>
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Name:</strong> {formData.firstName} {formData.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {formData.phone}
                </p>
                <p>
                  <strong>Volunteer Type:</strong> {formData.volunteerType}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Availability:</strong> {formData.availability.join(", ")}
                </p>
                <p>
                  <strong>Skills:</strong> {formData.skills.slice(0, 3).join(", ")}
                  {formData.skills.length > 3 ? "..." : ""}
                </p>
                <p>
                  <strong>Languages:</strong> {formData.languages.join(", ")}
                </p>
                <p>
                  <strong>Transportation:</strong> {formData.transportation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="form-check">
          <input
            className={`form-check-input ${errors.agreement ? "is-invalid" : ""}`}
            type="checkbox"
            name="agreement"
            checked={formData.agreement}
            onChange={handleInputChange}
          />
          <label className="form-check-label fw-bold">I agree to the terms and conditions *</label>
          {errors.agreement && <div className="invalid-feedback d-block">{errors.agreement}</div>}
        </div>
        <small className="text-muted">
          By checking this box, I agree to DisasterWatch's volunteer terms, privacy policy, and code of conduct.
        </small>
      </div>
    </div>
  )

  return (
    <div className={`volunteer-application-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-5 fw-bold mb-3">🤝 Volunteer Application</h1>
          <p className="lead text-muted">
            Join our network of heroes making a difference in emergency response and disaster relief.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                {renderStepIndicator()}

                <form onSubmit={handleSubmit}>
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                  {currentStep === 4 && renderStep4()}

                  {/* Navigation Buttons */}
                  <div className="d-flex justify-content-between mt-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                    >
                      ← Previous
                    </button>

                    {currentStep < 4 ? (
                      <button type="button" className="btn btn-primary" onClick={nextStep}>
                        Next →
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-success btn-lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Submitting Application...
                          </>
                        ) : (
                          "🚀 Submit Application"
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <div className="card card-hover border-0 shadow h-100">
              <div className="card-body p-4 text-center">
                <div className="display-4 mb-3">📋</div>
                <h5 className="fw-bold">Application Process</h5>
                <p className="text-muted">Complete application → Background check → Training → Active volunteer</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card card-hover border-0 shadow h-100">
              <div className="card-body p-4 text-center">
                <div className="display-4 mb-3">🎓</div>
                <h5 className="fw-bold">Free Training</h5>
                <p className="text-muted">Comprehensive training programs and certifications provided at no cost</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card card-hover border-0 shadow h-100">
              <div className="card-body p-4 text-center">
                <div className="display-4 mb-3">🌟</div>
                <h5 className="fw-bold">Make Impact</h5>
                <p className="text-muted">Join thousands of volunteers making a real difference in communities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VolunteerApplicationPage
