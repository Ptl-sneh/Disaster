const PrivacyPolicyPage = ({ darkMode }) => {
    return (
      <div className={`privacy-policy-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Header */}
              <div className="text-center mb-5 animate-fade-in">
                <h1 className="display-5 fw-bold mb-3">🔒 Privacy Policy</h1>
                <p className="lead text-muted">Last updated: January 1, 2024</p>
              </div>
  
              <div className="card border-0 shadow-lg animate-fade-in-up">
                <div className="card-body p-5">
                  <div className="mb-4">
                    <h3 className="fw-bold mb-3">Introduction</h3>
                    <p>
                      DisasterWatch ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                      explains how we collect, use, disclose, and safeguard your information when you use our disaster
                      reporting and volunteer coordination platform.
                    </p>
                  </div>
  
                  <div className="mb-4">
                    <h3 className="fw-bold mb-3">Information We Collect</h3>
  
                    <h5 className="fw-bold mb-2">Personal Information</h5>
                    <ul>
                      <li>Name, email address, and phone number</li>
                      <li>Location data and address information</li>
                      <li>Emergency contact details</li>
                      <li>Volunteer skills and certifications</li>
                      <li>Profile photos and identification documents</li>
                    </ul>
  
                    <h5 className="fw-bold mb-2">Disaster Report Information</h5>
                    <ul>
                      <li>Location coordinates and addresses</li>
                      <li>Photos and descriptions of disaster scenes</li>
                      <li>Severity assessments and impact details</li>
                      <li>Contact information of reporters</li>
                    </ul>
  
                    <h5 className="fw-bold mb-2">Technical Information</h5>
                    <ul>
                      <li>IP addresses and device identifiers</li>
                      <li>Browser type and operating system</li>
                      <li>Usage patterns and interaction data</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
  
                  <div className="mb-4">
                    <h3 className="fw-bold mb-3">How We Use Your Information</h3>
                    <ul>
                      <li>
                        <strong>Emergency Response:</strong> Coordinate disaster response and connect those in need with
                        available help
                      </li>
                      <li>
                        <strong>Volunteer Matching:</strong> Match volunteers with appropriate opportunities based on
                        skills and location
                      </li>
                      <li>
                        <strong>Communication:</strong> Send emergency alerts, updates, and important notifications
                      </li>
                      <li>
                        <strong>Platform Improvement:</strong> Analyze usage patterns to enhance our services
                      </li>
                      <li>
                        <strong>Safety & Security:</strong> Verify volunteer identities and maintain platform security
                      </li>
                      <li>
                        <strong>Legal Compliance:</strong> Meet legal obligations and respond to lawful requests
                      </li>
                    </ul>
                  </div>
  
                  <div className="mb-4">
                    <h3 className="fw-bold mb-3">Information Sharing</h3>
                    <p>We may share your information in the following circumstances:</p>
  
                    <h5 className="fw-bold mb-2">Emergency Situations</h5>
                    <p>
                      During active disasters, we may share relevant information with emergency responders, government
                      agencies, and relief organizations to facilitate rapid response and save lives.
                    </p>
  
                    <h5 className="fw-bold mb-2">Volunteer Coordination</h5>
                    <p>
                      We share volunteer contact information and skills with verified organizations requesting assistance
                      during emergencies.
                    </p>
  
                    <h5 className="fw-bold mb-2">Service Providers</h5>
                    <p>
                      We work with trusted third-party service providers who help us operate our platform, conduct
                      background checks, and provide technical support.
                    </p>
  
                    <h5 className="fw-bold mb-2">Legal Requirements</h5>
                    <p>
                      We may disclose information when required by law, court order, or to protect the rights and safety
                      of our users and the public.
                    </p>
                  </div>
  
                  <div className="mb-4">
                    <h3 className="fw-bold mb-3">Data Security</h3>
                    <p>We implement comprehensive security measures to protect your information:</p>
                    <ul>
                      <li>End-to-end encryption for sensitive communications</li>
                      <li>Secure data centers with 24/7 monitoring</li>
                      <li>Regular security audits and penetration testing</li>
                      <li>Multi-factor authentication for account access</li>
                      <li>Employee training on data protection best practices</li>
                    </ul>
                  </div>
  
                  <div className="mb-4">
                    <h3 className="fw-bold mb-3">Your Rights and Choices</h3>
  
                    <h5 className="fw-bold mb-2">Access and Control</h5>
                    <ul>
                      <li>View and update your personal information</li>
                      <li>Download a copy of your data</li>
                      <li>Delete your account and associated data</li>
                      <li>Opt out of non-essential communications</li>
                    </ul>
  
                    <h5 className="fw-bold mb-2">Location Services</h5>
                    <p>
                      You can control location sharing through your device settings. Note that location data is crucial
                      for emergency response effectiveness.
                    </p>
  
                    <h5 className="fw-bold mb-2">Marketing Communications</h5>
                    <p>
                      You can unsubscribe from marketing emails at any time. Emergency alerts and safety notifications
                      cannot be disabled.
                    </p>
                  </div>
  
                  <div className="mb-4">
                    <h3 className="fw-bold mb-3">Data Retention</h3>
                    <p>We retain your information for different periods based on its purpose:</p>
                    <ul>
                      <li>
                        <strong>Account Information:</strong> Until you delete your account
                      </li>
                      <li>
                        <strong>Disaster Reports:</strong> 7 years for historical analysis and legal compliance
                      </li>
                      <li>
                        <strong>Volunteer Records:</strong> 3 years after last activity
                      </li>
                      <li>
                        <strong>Communication Logs:</strong> 1 year for quality assurance
                      </li>
                      <li>
                        <strong>Technical Data:</strong> 90 days unless required for security purposes
                      </li>
                    </ul>
                  </div>
  
                  <div className="mb-4">
                    <h3 className="fw-bold mb-3">International Data Transfers</h3>
                    <p>
                      DisasterWatch operates globally. Your information may be transferred to and processed in countries
                      other than your own. We ensure appropriate safeguards are in place for international transfers,
                      including:
                    </p>
                    <ul>
                      <li>Adequacy decisions by relevant authorities</li>
                      <li>Standard contractual clauses</li>
                      <li>Binding corporate rules</li>
                      <li>Certification schemes</li>
                    </ul>
                  </div>
  
                  <div className="mb-4">
                    <h3 className="fw-bold mb-3">Children's Privacy</h3>
                    <p>
                      DisasterWatch is not intended for children under 13. We do not knowingly collect personal
                      information from children under 13. If we become aware that we have collected such information, we
                      will take steps to delete it promptly.
                    </p>
                  </div>
  
                  <div className="mb-4">
                    <h3 className="fw-bold mb-3">Changes to This Policy</h3>
                    <p>
                      We may update this Privacy Policy periodically. We will notify you of significant changes through
                      email or prominent notices on our platform. Your continued use of DisasterWatch after changes become
                      effective constitutes acceptance of the updated policy.
                    </p>
                  </div>
  
                  <div className="mb-4">
                    <h3 className="fw-bold mb-3">Contact Us</h3>
                    <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                    <ul className="list-unstyled">
                      <li>
                        <strong>Email:</strong> privacy@disasterwatch.org
                      </li>
                      <li>
                        <strong>Phone:</strong> +1 (555) 123-4567
                      </li>
                      <li>
                        <strong>Mail:</strong> DisasterWatch Privacy Team
                        <br />
                        123 Emergency Ave, Safety City, SC 12345
                      </li>
                    </ul>
                  </div>
  
                  <div className="alert alert-info">
                    <h5 className="fw-bold">Emergency Disclosure Notice</h5>
                    <p className="mb-0">
                      In life-threatening emergencies, we may share your information with emergency responders without
                      prior consent to protect lives and ensure rapid response. This includes location data, medical
                      information, and contact details necessary for rescue operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default PrivacyPolicyPage
  