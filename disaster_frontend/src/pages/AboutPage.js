const AboutPage = ({ darkMode }) => {
    const teamMembers = [
      {
        name: "Dr. Emily Rodriguez",
        role: "Founder & CEO",
        photo: "👩‍💼",
        bio: "Emergency medicine physician with 20+ years of disaster response experience.",
        specialties: ["Emergency Medicine", "Disaster Response", "Public Health"],
      },
      {
        name: "Michael Chen",
        role: "CTO",
        photo: "👨‍💻",
        bio: "Former FEMA technology director specializing in emergency communication systems.",
        specialties: ["Emergency Tech", "System Architecture", "Crisis Communications"],
      },
      {
        name: "Sarah Johnson",
        role: "Operations Director",
        photo: "👩‍🚀",
        bio: "Red Cross veteran with expertise in volunteer coordination and shelter management.",
        specialties: ["Operations Management", "Volunteer Coordination", "Logistics"],
      },
      {
        name: "David Kim",
        role: "Community Outreach",
        photo: "👨‍🎓",
        bio: "Community organizer focused on building resilient neighborhoods and emergency preparedness.",
        specialties: ["Community Building", "Public Relations", "Training Programs"],
      },
      {
        name: "Dr. Maria Santos",
        role: "Medical Advisor",
        photo: "👩‍⚕️",
        bio: "Trauma surgeon and disaster medicine specialist with international relief experience.",
        specialties: ["Trauma Medicine", "International Relief", "Medical Training"],
      },
      {
        name: "James Wilson",
        role: "Data Scientist",
        photo: "👨‍🔬",
        bio: "Predictive analytics expert helping optimize emergency response through data insights.",
        specialties: ["Data Analytics", "Predictive Modeling", "Risk Assessment"],
      },
    ]
  
    const milestones = [
      {
        year: "2020",
        title: "DisasterWatch Founded",
        description: "Started as a small team of emergency responders and tech experts.",
        icon: "🚀",
      },
      {
        year: "2021",
        title: "First Major Deployment",
        description: "Successfully coordinated response to Hurricane Delta, helping 10,000+ people.",
        icon: "🌪️",
      },
      {
        year: "2022",
        title: "National Expansion",
        description: "Expanded to cover all 50 states with 1,000+ verified shelters.",
        icon: "🇺🇸",
      },
      {
        year: "2023",
        title: "AI Integration",
        description: "Launched predictive analytics for early disaster detection and response.",
        icon: "🤖",
      },
      {
        year: "2024",
        title: "Global Impact",
        description: "Reached 1 million users and partnered with international relief organizations.",
        icon: "🌍",
      },
    ]
  
    const stats = [
      { number: "1M+", label: "Lives Impacted", icon: "❤️" },
      { number: "50K+", label: "Volunteers", icon: "👥" },
      { number: "2.5K+", label: "Shelters", icon: "🏠" },
      { number: "500+", label: "Disasters Responded", icon: "🚨" },
    ]
  
    return (
      <div className={`about-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
        <div className="container">
          {/* Hero Section */}
          <div className="text-center mb-5 animate-fade-in">
            <h1 className="display-4 fw-bold mb-4">Our Mission: Saving Lives Together</h1>
            <p className="lead mb-4">
              DisasterWatch was born from a simple belief: when disaster strikes, every second counts, and communities are
              strongest when they work together.
            </p>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card border-0 shadow-lg">
                  <div className="card-body p-5">
                    <h3 className="mb-3">🎯 Our Vision</h3>
                    <p className="lead">
                      To create a world where no community faces disaster alone, where technology bridges the gap between
                      those who need help and those ready to provide it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Stats Section */}
          <div className="row mb-5 animate-fade-in-up">
            {stats.map((stat, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="card card-hover h-100 border-0 shadow-lg text-center">
                  <div className="card-body p-4">
                    <div className="display-4 mb-3">{stat.icon}</div>
                    <h2 className="stats-counter text-primary">{stat.number}</h2>
                    <h6 className="text-muted">{stat.label}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Story Section */}
          <div className="row mb-5 animate-slide-in-left">
            <div className="col-lg-6 mb-4">
              <div className="card border-0 shadow-lg h-100">
                <div className="card-body p-5">
                  <h3 className="mb-4">📖 Our Story</h3>
                  <p className="mb-3">
                    DisasterWatch began in 2020 when Dr. Emily Rodriguez, an emergency physician, witnessed the
                    communication breakdown during a major flood. Families were separated, volunteers couldn't find where
                    help was needed most, and critical resources sat unused while people suffered just miles away.
                  </p>
                  <p className="mb-3">
                    "Technology should serve humanity's greatest needs," she said. "In disasters, information is as vital
                    as food, water, and shelter."
                  </p>
                  <p className="mb-0">
                    Today, DisasterWatch connects millions of people worldwide, turning individual acts of courage into
                    coordinated waves of hope and healing.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="card border-0 shadow-lg h-100">
                <div className="card-body p-5">
                  <h3 className="mb-4">🌟 Our Values</h3>
                  <div className="mb-3">
                    <h6 className="fw-bold">🚀 Speed & Efficiency</h6>
                    <p className="small text-muted">
                      Every second matters in emergencies. We optimize for rapid response.
                    </p>
                  </div>
                  <div className="mb-3">
                    <h6 className="fw-bold">🤝 Community First</h6>
                    <p className="small text-muted">Local communities know their needs best. We amplify their voices.</p>
                  </div>
                  <div className="mb-3">
                    <h6 className="fw-bold">🔒 Trust & Transparency</h6>
                    <p className="small text-muted">
                      Verified information saves lives. We maintain the highest standards.
                    </p>
                  </div>
                  <div className="mb-3">
                    <h6 className="fw-bold">🌍 Inclusive Access</h6>
                    <p className="small text-muted">
                      Help should reach everyone, regardless of technology or language barriers.
                    </p>
                  </div>
                  <div className="mb-0">
                    <h6 className="fw-bold">💡 Innovation for Good</h6>
                    <p className="small text-muted">We harness cutting-edge technology to solve humanity's challenges.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Timeline */}
          <div className="mb-5 animate-fade-in-up">
            <h2 className="text-center mb-5">🏆 Our Journey</h2>
            <div className="row">
              {milestones.map((milestone, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4">
                  <div className="card card-hover border-0 shadow-lg h-100">
                    <div className="card-body p-4 text-center">
                      <div className="display-4 mb-3">{milestone.icon}</div>
                      <div className="badge bg-primary mb-3">{milestone.year}</div>
                      <h5 className="fw-bold mb-3">{milestone.title}</h5>
                      <p className="text-muted">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Team Section */}
          <div className="mb-5 animate-slide-in-right">
            <h2 className="text-center mb-5">👥 Meet Our Team</h2>
            <div className="row">
              {teamMembers.map((member, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4">
                  <div className="card card-hover border-0 shadow-lg h-100">
                    <div className="card-body p-4 text-center">
                      <div
                        className="bg-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                        style={{ width: "80px", height: "80px", fontSize: "32px" }}
                      >
                        {member.photo}
                      </div>
                      <h5 className="fw-bold mb-1">{member.name}</h5>
                      <p className="text-primary mb-3">{member.role}</p>
                      <p className="text-muted mb-3">{member.bio}</p>
                      <div className="d-flex flex-wrap justify-content-center gap-1">
                        {member.specialties.map((specialty, idx) => (
                          <span key={idx} className="badge bg-secondary small">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Impact Section */}
          <div className="card border-0 shadow-lg mb-5 animate-fade-in-up">
            <div className="card-body p-5">
              <div className="row align-items-center">
                <div className="col-lg-6 mb-4">
                  <h3 className="mb-4">🌍 Global Impact</h3>
                  <p className="mb-3">
                    Since our founding, DisasterWatch has facilitated emergency response across six continents, helping
                    communities prepare for, respond to, and recover from natural and man-made disasters.
                  </p>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <div className="text-center">
                        <h4 className="text-success">98%</h4>
                        <small className="text-muted">Response Time Improvement</small>
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <div className="text-center">
                        <h4 className="text-info">24/7</h4>
                        <small className="text-muted">Emergency Monitoring</small>
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <div className="text-center">
                        <h4 className="text-warning">15min</h4>
                        <small className="text-muted">Average Response Time</small>
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <div className="text-center">
                        <h4 className="text-danger">99.9%</h4>
                        <small className="text-muted">Platform Uptime</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-4">
                  <div className="bg-light rounded-3 p-4 text-center">
                    <h4 className="mb-3">🏆 Recognition</h4>
                    <div className="mb-3">
                      <span className="badge bg-warning mb-2">🥇 UN Innovation Award 2023</span>
                      <br />
                      <span className="badge bg-info mb-2">🏅 Red Cross Partnership</span>
                      <br />
                      <span className="badge bg-success mb-2">⭐ FEMA Technology Excellence</span>
                      <br />
                      <span className="badge bg-primary mb-2">🌟 Google.org Grant Recipient</span>
                    </div>
                    <p className="small text-muted">
                      Recognized by leading humanitarian organizations for innovation in emergency response technology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Call to Action */}
          <div className="text-center animate-fade-in-up">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <h3 className="mb-3">🚀 Join Our Mission</h3>
                <p className="lead mb-4">
                  Whether you're a developer, emergency responder, community leader, or someone who simply wants to help,
                  there's a place for you in the DisasterWatch community.
                </p>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <button className="btn btn-primary btn-lg btn-animated" >🤝 Become a Volunteer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default AboutPage
  