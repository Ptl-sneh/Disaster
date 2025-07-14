"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const PricingPage = ({ darkMode }) => {
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [selectedPlan, setSelectedPlan] = useState(null)

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for individuals and small communities",
      features: [
        "Report up to 5 disasters per month",
        "Access to shelter directory",
        "Basic volunteer coordination",
        "Email support",
        "Mobile app access",
        "Community forums",
      ],
      limitations: ["Limited to 5 reports/month", "Basic analytics only", "Standard support"],
      popular: false,
      buttonText: "Get Started Free",
      buttonClass: "btn-outline-primary",
    },
    {
      id: "pro",
      name: "Professional",
      price: { monthly: 29, yearly: 290 },
      description: "Ideal for organizations and emergency services",
      features: [
        "Unlimited disaster reporting",
        "Advanced analytics dashboard",
        "Priority volunteer matching",
        "24/7 phone support",
        "Custom shelter management",
        "API access",
        "Team collaboration tools",
        "Real-time notifications",
        "Custom branding",
      ],
      limitations: [],
      popular: true,
      buttonText: "Start Pro Trial",
      buttonClass: "btn-primary",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: { monthly: 99, yearly: 990 },
      description: "For large organizations and government agencies",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security features",
        "Multi-region deployment",
        "Custom training programs",
        "SLA guarantees",
        "White-label solutions",
        "Advanced reporting",
        "Compliance certifications",
      ],
      limitations: [],
      popular: false,
      buttonText: "Contact Sales",
      buttonClass: "btn-success",
    },
  ]

  const addOns = [
    {
      name: "Advanced Analytics",
      price: 15,
      description: "Detailed reporting",
    },
    {
      name: "SMS Notifications",
      price: 10,
      description: "Emergency alerts via SMS",
    },
    {
      name: "Custom Training",
      price: 50,
      description: "Personalized training for your team",
    },
    {
      name: "Priority Support",
      price: 25,
      description: "24/7 priority technical support",
    },
  ]

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId)
    // Here you would typically redirect to payment processing
    alert(`Selected ${plans.find((p) => p.id === planId).name} plan! Redirecting to payment...`)
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
                    <span className="display-4 fw-bold text-primary">${plan.price[billingCycle]}</span>
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

        {/* Add-ons Section */}
        <div className="mb-5 animate-fade-in-up">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-3">🔧 Add-ons & Extensions</h2>
            <p className="lead text-muted">Enhance your plan with additional features</p>
          </div>

          <div className="row">
            {addOns.map((addon, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="card card-hover h-100 border-0 shadow">
                  <div className="card-body p-4 text-center">
                    <h5 className="fw-bold mb-3">{addon.name}</h5>
                    <div className="mb-3">
                      <span className="h4 text-primary">${addon.price}</span>
                      <span className="text-muted">/month</span>
                    </div>
                    <p className="text-muted mb-3">{addon.description}</p>
                    <button className="btn btn-outline-primary btn-sm w-100">Add to Plan</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-5 animate-fade-in-up">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-3">📊 Feature Comparison</h2>
          </div>

          <div className="card border-0 shadow-lg">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className={darkMode ? "table-dark" : "table-light"}>
                    <tr>
                      <th>Feature</th>
                      <th className="text-center">Basic</th>
                      <th className="text-center">Professional</th>
                      <th className="text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Disaster Reports</td>
                      <td className="text-center">5/month</td>
                      <td className="text-center">Unlimited</td>
                      <td className="text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td>Analytics Dashboard</td>
                      <td className="text-center">Basic</td>
                      <td className="text-center">Advanced</td>
                      <td className="text-center">Enterprise</td>
                    </tr>
                    <tr>
                      <td>Support</td>
                      <td className="text-center">Email</td>
                      <td className="text-center">24/7 Phone</td>
                      <td className="text-center">Dedicated Manager</td>
                    </tr>
                    <tr>
                      <td>API Access</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">✅</td>
                    </tr>
                    <tr>
                      <td>Custom Branding</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">✅</td>
                    </tr>
                    <tr>
                      <td>SLA Guarantee</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">99.9%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-5 animate-fade-in-up">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-3">❓ Pricing FAQ</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="pricingFAQ">
                <div className="accordion-item border-0 shadow-sm mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed fw-bold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq1"
                    >
                      Can I change my plan anytime?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#pricingFAQ">
                    <div className="accordion-body">
                      Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and
                      we'll prorate any billing differences.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 shadow-sm mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed fw-bold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq2"
                    >
                      Is there a free trial for paid plans?
                    </button>
                  </h2>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#pricingFAQ">
                    <div className="accordion-body">
                      Yes! We offer a 14-day free trial for all paid plans. No credit card required to start your trial.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 shadow-sm mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed fw-bold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq3"
                    >
                      Do you offer discounts for non-profits?
                    </button>
                  </h2>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#pricingFAQ">
                    <div className="accordion-body">
                      We offer 50% discounts for verified non-profit organizations and educational institutions. Contact
                      our sales team for details.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 shadow-sm mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed fw-bold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq4"
                    >
                      What payment methods do you accept?
                    </button>
                  </h2>
                  <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#pricingFAQ">
                    <div className="accordion-body">
                      We accept all major credit cards, PayPal, bank transfers, and can accommodate purchase orders for
                      enterprise customers.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-up">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-5">
              <h3 className="mb-3">🚀 Ready to Get Started?</h3>
              <p className="lead mb-4">
                Join thousands of organizations already using DisasterWatch to save lives and coordinate emergency
                response.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <button className="btn btn-primary btn-lg btn-animated" onClick={() => handlePlanSelect("pro")}>
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
