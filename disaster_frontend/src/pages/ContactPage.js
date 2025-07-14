/* eslint-disable jsx-a11y/anchor-is-valid */
"use client"

import { useState } from "react"
import axios from "axios"

const ContactPage = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    urgency: "normal",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    if (!validateForm()) return
  
    setIsSubmitting(true)
  
    try {
      await axios.post("http://127.0.0.1:8000/api/contact/", formData)
      alert("Message sent successfully! We'll get back to you within 24 hours.")
  
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        urgency: "normal",
      })
    } catch (error) {
      console.error(error.response?.data || error.message)
      alert("Error sending message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Support",
      info: "support@disasterwatch.org",
      description: "General inquiries and support",
      action: "mailto:support@disasterwatch.org",
    },
    {
      icon: "🚨",
      title: "Emergency Hotline",
      info: "+1 (555) 911-HELP",
      description: "24/7 emergency assistance",
      action: "tel:+15559114357",
    },
    {
      icon: "💼",
      title: "Business Inquiries",
      info: "partnerships@disasterwatch.org",
      description: "Partnerships and collaborations",
      action: "mailto:partnerships@disasterwatch.org",
    },
    {
      icon: "📱",
      title: "Technical Support",
      info: "tech@disasterwatch.org",
      description: "Platform issues and bugs",
      action: "mailto:tech@disasterwatch.org",
    },
  ]

  const officeLocations = [
    {
      city: "San Francisco",
      address: "123 Emergency Ave, Suite 100",
      phone: "(555) 123-4567",
      hours: "Mon-Fri: 9AM-6PM PST",
    },
    {
      city: "New York",
      address: "456 Response Blvd, Floor 15",
      phone: "(555) 987-6543",
      hours: "Mon-Fri: 9AM-6PM EST",
    },
    {
      city: "Atlanta",
      address: "789 Relief Road, Building C",
      phone: "(555) 456-7890",
      hours: "Mon-Fri: 9AM-6PM EST",
    },
  ]

  const faqs = [
    {
      question: "How quickly do you respond to emergency reports?",
      answer:
        "Emergency reports are processed immediately and forwarded to relevant authorities within 2-5 minutes. Our system operates 24/7.",
    },
    {
      question: "Is DisasterWatch free to use?",
      answer:
        "Yes, DisasterWatch is completely free for individuals and communities. We believe emergency response should be accessible to everyone.",
    },
    {
      question: "How do you verify shelter and volunteer information?",
      answer:
        "We have a rigorous verification process involving background checks, site visits, and ongoing monitoring to ensure all information is accurate and current.",
    },
    {
      question: "Can I use DisasterWatch internationally?",
      answer:
        "Yes, DisasterWatch operates globally with localized support in multiple languages and partnerships with international relief organizations.",
    },
  ]

  return (
    <div className={`contact-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-5 fw-bold mb-3">📞 Contact Us</h1>
          <p className="lead text-muted">
            We're here to help 24/7. Reach out for support, partnerships, or emergency assistance.
          </p>
          <div className="alert alert-danger" role="alert">
            <strong>🚨 Emergency?</strong> If this is a life-threatening emergency, call 911 immediately!
          </div>
        </div>

        <div className="row">
          {/* Contact Form */}
          <div className="col-lg-8 mb-5">
            <div className="card border-0 shadow-lg animate-slide-in-left">
              <div className="card-header bg-primary text-white p-4">
                <h4 className="mb-0">💬 Send us a Message</h4>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label fw-bold">
                        👤 Full Name *
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label fw-bold">
                        📧 Email Address *
                      </label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label htmlFor="subject" className="form-label fw-bold">
                        📝 Subject *
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this regarding?"
                      />
                      {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="urgency" className="form-label fw-bold">
                        ⚡ Urgency Level
                      </label>
                      <select
                        className="form-select"
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                      >
                        <option value="low">Low - General inquiry</option>
                        <option value="normal">Normal - Standard support</option>
                        <option value="high">High - Urgent issue</option>
                        <option value="critical">Critical - Emergency</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label fw-bold">
                      💬 Message *
                    </label>
                    <textarea
                      className={`form-control ${errors.message ? "is-invalid" : ""}`}
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please provide detailed information about your inquiry..."
                    ></textarea>
                    <div className="form-text">{formData.message.length}/1000 characters</div>
                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg btn-animated" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Sending Message...
                        </>
                      ) : (
                        "📤 Send Message"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-lg-4 mb-5">
            <div className="animate-slide-in-right">
              {/* Contact Methods */}
              <div className="card border-0 shadow-lg mb-4">
                <div className="card-header bg-transparent border-0 p-4">
                  <h5 className="mb-0">📞 Get in Touch</h5>
                </div>
                <div className="card-body p-0">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="p-4 border-bottom">
                      <div className="d-flex align-items-start">
                        <div className="me-3">
                          <div
                            className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: "40px", height: "40px" }}
                          >
                            <span className="text-white">{method.icon}</span>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="fw-bold mb-1">{method.title}</h6>
                          <a href={method.action} className="text-decoration-none">
                            {method.info}
                          </a>
                          <p className="text-muted small mb-0">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <div className="card border-0 shadow-lg mb-4">
                <div className="card-header bg-transparent border-0 p-4">
                  <h5 className="mb-0">🕒 Office Hours</h5>
                </div>
                <div className="card-body p-4">
                  <div className="mb-3">
                    <strong>Emergency Support:</strong>
                    <br />
                    <span className="text-success">24/7 Available</span>
                  </div>
                  <div className="mb-3">
                    <strong>General Support:</strong>
                    <br />
                    Monday - Friday: 9AM - 6PM
                    <br />
                    Saturday: 10AM - 4PM
                    <br />
                    Sunday: Closed
                  </div>
                  <div className="mb-0">
                    <strong>Response Time:</strong>
                    <br />
                    <span className="text-info">Within 24 hours</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="card border-0 shadow-lg">
                <div className="card-header bg-transparent border-0 p-4">
                  <h5 className="mb-0">🌐 Follow Us</h5>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-around">
                    <a href="#" className="social-icon">
                      📘
                    </a>
                    <a href="#" className="social-icon">
                      🐦
                    </a>
                    <a href="#" className="social-icon">
                      📷
                    </a>
                    <a href="#" className="social-icon">
                      💼
                    </a>
                    <a href="#" className="social-icon">
                      📺
                    </a>
                  </div>
                  <p className="text-center text-muted small mt-3 mb-0">
                    Stay updated with the latest emergency alerts and community news.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mb-5 animate-fade-in-up">
          <h2 className="text-center mb-4">🏢 Our Offices</h2>
          <div className="row">
            {officeLocations.map((office, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card card-hover border-0 shadow-lg h-100">
                  <div className="card-body p-4 text-center">
                    <h5 className="fw-bold mb-3">{office.city}</h5>
                    <p className="mb-2">📍 {office.address}</p>
                    <p className="mb-2">📞 {office.phone}</p>
                    <p className="text-muted mb-0">🕒 {office.hours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-fade-in-up">
          <h2 className="text-center mb-4">❓ Frequently Asked Questions</h2>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="accordion" id="faqAccordion">
                {faqs.map((faq, index) => (
                  <div key={index} className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fw-bold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq${index}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div id={`faq${index}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
