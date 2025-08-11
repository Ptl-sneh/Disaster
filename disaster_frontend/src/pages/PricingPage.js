/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
const stripePromise = loadStripe('pk_test_51Rtd171yRBtzWAxgUOmQdUViaHo1srTcLlXy54GbArsUVkXkF49bJWsiJFHKqWy7dADyhttYNACtL7c4ZUSxA5Z300ayMcDTeC')


const PricingPage = ({ darkMode }) => {
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [selectedPlan, setSelectedPlan] = useState(null)

  const plans = [
    {
      id: "free",
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "For individuals and small communities to access disaster info and connect",
      features: [
        "Unlimited disaster reporting",
        "Real-time alerts",
        "Public shelter directory (auto-sorted by safety & proximity)",
        "Volunteer directory",
        "Community forums"
      ],
      limitations: [
        "No organization verification badge",
        "No promotional placement in non-emergency mode",
        "Basic analytics only"
      ],
      popular: false,
      buttonText: "Get Started Free",
      buttonClass: "btn-secondary",
    },
    {
      id: "verified-org",
      name: "Verified Organization",
      price: { monthly: 1999, yearly: 19990 }, // INR
      description: "For NGOs and community groups to build trust and coordinate effectively",
      features: [
        "Verified badge & trust seal",
        "Manage and update shelter details",
        "Volunteer coordination tools",
        "Priority in non-emergency searches",
        "Basic analytics dashboard"
      ],
      limitations: [],
      popular: true,
      buttonText: "Verify Organization",
      buttonClass: "btn-primary",
    },
    {
      id: "shelter-promo",
      name: "Shelter Awareness Promotion",
      price: { monthly: 2999, yearly: 29990 }, // INR
      description: "Highlight your shelter for fundraising, volunteer drives, or awareness campaigns (does not override emergency safety sorting)",
      features: [
        "Everything in Verified Organization",
        "Featured placement in community & awareness sections",
        "Highlighted on non-emergency maps",
        "Custom call-to-action button (e.g. Donate, Volunteer)",
        "Monthly visibility & engagement report"
      ],
      limitations: [],
      popular: false,
      buttonText: "Promote My Shelter",
      buttonClass: "btn-warning",
    },
    {
      id: "analytics",
      name: "Data & Analytics Dashboard",
      price: { monthly: 14999, yearly: 149990 }, // INR
      description: "For organizations needing advanced insights and operational intelligence",
      features: [
        "Advanced analytics with heatmaps",
        "Disaster trend forecasting",
        "Volunteer movement mapping",
        "API access for custom integrations",
        "Custom data reports"
      ],
      limitations: [],
      popular: false,
      buttonText: "Get Analytics",
      buttonClass: "btn-info",
    },
    {
      id: "enterprise",
      name: "White-label Platform",
      price: { monthly: null, yearly: 500000 }, // INR, yearly contract only
      description: "Fully branded disaster management platform for governments or large-scale agencies",
      features: [
        "All Analytics features",
        "Full platform branding",
        "Multi-region deployment",
        "Enterprise-grade security & compliance",
        "Dedicated account & technical manager"
      ],
      limitations: [],
      popular: false,
      buttonText: "Contact Sales",
      buttonClass: "btn-success",
    }
  ];

const handlePlanSelect = async (planId) => {
  setSelectedPlan(planId)

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/create_checkout_session/', {
      planId: planId
    })

    const data = response.data
    console.log(data)

    if (data.error) {
      alert('Error: ' + data.error)
      return
    }

    const stripe = await stripePromise
    const { error } = await stripe.redirectToCheckout({ sessionId: data.id })
    if (error) {
      alert(error.message)
    }
  } catch (err) {
    alert('Payment failed: ' + err.message)
    console.log(err)
  }
}


  const calculateSavings = (monthly, yearly) => {
    if (monthly === 0) return 0
    const monthlyCost = monthly * 12
    const savings = monthlyCost - yearly
    return Math.round((savings / monthlyCost) * 100)
  }

  return (
    <div className={`pricing-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-4 fw-bold mb-3">💰 Choose Your Plan</h1>
          <p className="lead text-muted mb-4">
            Flexible pricing for individuals, organizations, and enterprises. Start free and scale as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="d-flex justify-content-center mb-4">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${billingCycle === "monthly" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`btn ${billingCycle === "yearly" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setBillingCycle("yearly")}
              >
                Yearly
                <span className="badge bg-success ms-2">Save 20%</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="row justify-content-center mb-5">
          {plans.map((plan, index) => (
            <div key={plan.id} className="col-lg-4 col-md-6 mb-4">
              <div
                className={`card card-hover h-100 border-0 shadow-lg position-relative animate-fade-in-up ${plan.popular ? "border-primary" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="position-absolute top-0 start-50 translate-middle">
                    <span className="badge bg-primary px-3 py-2">🌟 Most Popular</span>
                  </div>
                )}

                <div className="card-body p-4 text-center">
                  <h3 className="fw-bold mb-3">{plan.name}</h3>
                  <div className="mb-3">
                    <span className="display-4 fw-bold text-primary">₹{plan.price[billingCycle]}</span>
                    {plan.price.monthly > 0 && (
                      <span className="text-muted">/{billingCycle === "monthly" ? "month" : "year"}</span>
                    )}
                  </div>

                  {billingCycle === "yearly" && plan.price.monthly > 0 && (
                    <div className="mb-3">
                      <span className="badge bg-success">
                        Save {calculateSavings(plan.price.monthly, plan.price.yearly)}%
                      </span>
                    </div>
                  )}

                  <p className="text-muted mb-4">{plan.description}</p>

                  <button
                    className={`btn ${plan.buttonClass} btn-lg w-100 mb-4 btn-animated`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {plan.buttonText}
                  </button>

                  <div className="text-start">
                    <h6 className="fw-bold mb-3">✅ Features included:</h6>
                    <ul className="list-unstyled">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="mb-2">
                          <span className="text-success me-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <>
                        <h6 className="fw-bold mb-3 text-muted">⚠️ Limitations:</h6>
                        <ul className="list-unstyled">
                          {plan.limitations.map((limitation, idx) => (
                            <li key={idx} className="mb-2 text-muted">
                              <span className="me-2">•</span>
                              {limitation}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>



        {/* Call to Action */}
        <div className="text-center animate-fade-in-up">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-5">
              <h3 className="mb-3">🚀 Ready to Get Started?</h3>
              <p className="lead mb-4">
                Join thousands of organizations already using JanSanket to save lives and coordinate emergency
                response.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <button className="btn btn-primary btn-lg btn-animated" onClick={() => handlePlanSelect("free")}>
                  Start Free Trial
                </button>
                <Link to="/contact" className="btn btn-outline-primary btn-lg btn-animated">
                  Contact Sales
                </Link>
                <Link to="/auth" className="btn btn-success btn-lg btn-animated">
                  Sign Up Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingPage
