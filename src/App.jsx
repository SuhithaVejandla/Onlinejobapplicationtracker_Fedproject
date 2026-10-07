import { useState } from "react";
import "./App.css";

const quotes = [
  "Success is the sum of small efforts repeated every day.",
  "Your future depends on what you do today.",
  "Every application is one step closer to your dream job.",
  "Believe you can and you're halfway there.",
  "Great things take time. Keep going.",
  "The secret of getting ahead is getting started.",
  "Don't watch the clock. Keep going.",
  "Your only limit is your mind.",
  "Dream big. Work hard. Stay focused.",
  "Success begins with self-belief.",
  "Small progress is still progress.",
  "Stay patient and trust your journey.",
  "Opportunities don't happen. You create them.",
  "Focus on progress, not perfection.",
  "Your career is your story. Make it meaningful.",
  "Keep learning. Keep growing.",
  "Consistency creates results.",
  "One day or day one. You decide.",
  "Hard work always creates opportunities.",
  "Make today count.",
  "The best way to predict your future is to create it.",
  "Stay focused on your goals.",
  "Every expert was once a beginner.",
  "Don't stop until you're proud.",
  "Your effort today builds your tomorrow.",
  "Success starts with showing up.",
  "Keep moving forward.",
  "You are closer than you think.",
  "Turn your goals into plans.",
  "Your next opportunity could be the one."
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function App() {
  const [page, setPage] = useState("home");
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [applications, setApplications] = useState(
    JSON.parse(localStorage.getItem("applications")) || []
  );

  function saveApplications(data) {
    setApplications(data);
    localStorage.setItem("applications", JSON.stringify(data));
  }

  function logoutUser() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setPage("home");
  }

  function logoutAdmin() {
    setAdminLoggedIn(false);
    setPage("home");
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo" onClick={() => setPage("home")}>
          <img src="/Onlinejobapplicationtracker_Fedproject/jobtrack-logo.svg" alt="JobTrack" />
        </div>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>

          {!currentUser && (
            <>
              <button
                className="nav-login"
                onClick={() => setPage("login")}
              >
                Login
              </button>

              <button
                className="nav-button"
                onClick={() => setPage("signup")}
              >
                Get Started
              </button>
            </>
          )}

          {currentUser && (
            <>
              <button onClick={() => setPage("dashboard")}>
                Dashboard
              </button>

              <button onClick={logoutUser}>
                Logout
              </button>
            </>
          )}

          {!adminLoggedIn && (
            <button
              className="admin-link"
              onClick={() => setPage("admin")}
            >
              Admin
            </button>
          )}

          {adminLoggedIn && (
            <button onClick={logoutAdmin}>
              Admin Logout
            </button>
          )}
        </div>
      </nav>

      {page === "home" && <Home setPage={setPage} />}

      {page === "signup" && (
        <Signup
          setPage={setPage}
          setCurrentUser={setCurrentUser}
        />
      )}

      {page === "login" && (
        <Login
          setPage={setPage}
          setCurrentUser={setCurrentUser}
        />
      )}

      {page === "dashboard" && currentUser && (
        <UserDashboard
          currentUser={currentUser}
          applications={applications}
          saveApplications={saveApplications}
        />
      )}

      {page === "admin" && (
        <AdminLogin
          setPage={setPage}
          setAdminLoggedIn={setAdminLoggedIn}
        />
      )}

      {page === "adminDashboard" && adminLoggedIn && (
        <AdminDashboard applications={applications} />
      )}
    </>
  );
}


/* HOME */

function Home({ setPage }) {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="welcome-tag">
            YOUR CAREER, ORGANIZED
          </span>

          <h1>
            Build your career.
            <br />
            <span>Track every opportunity.</span>
          </h1>

          <p>
            Keep your job applications organized, monitor interview
            progress, and stay focused on your next opportunity.
          </p>

          <div className="hero-buttons">
            <button
              className="btn"
              onClick={() => setPage("signup")}
            >
              Start Tracking
            </button>

            <button
              className="secondary-btn"
              onClick={() => setPage("login")}
            >
              Already have an account?
            </button>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-heading">
          <span>WHY JOBTRACK</span>
          <h2>
            Everything you need to stay on top of your job search.
          </h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">✓</div>
            <h3>Track Applications</h3>
            <p>
              Save company names, job roles, locations and
              application dates in one place.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">↗</div>
            <h3>Monitor Progress</h3>
            <p>
              Track whether an application is applied, interview,
              offer or rejected.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">◆</div>
            <h3>Stay Organized</h3>
            <p>
              Keep your complete job search organized and easy
              to manage.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}


/* SIGNUP */

function Signup({ setPage, setCurrentUser }) {
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  function handleSignup(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(user => user.email === signupEmail)) {
      alert("Email already registered. Please login.");
      return;
    }

    const newUser = {
      name: signupName,
      email: signupEmail,
      password: signupPassword
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert("Account created successfully!");

    setCurrentUser(newUser);
    setPage("dashboard");
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <img
            className="auth-logo"
            src="/Onlinejobapplicationtracker_Fedproject/jobtrack-logo.svg"
            alt="JobTrack"
          />

          <h1>Create Account</h1>
          <p>Start organizing your career journey.</p>
        </div>

        <form onSubmit={handleSignup}>
          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={signupName}
            onChange={e => setSignupName(e.target.value)}
            required
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={signupEmail}
            onChange={e => setSignupEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={signupPassword}
            onChange={e => setSignupPassword(e.target.value)}
            required
          />

          <button className="btn full-btn" type="submit">
            Create Account
          </button>
        </form>

        <div className="auth-switch">
          Already have an account?

          <button onClick={() => setPage("login")}>
            Login
          </button>
        </div>
      </div>
    </section>
  );
}


/* LOGIN */

function Login({ setPage, setCurrentUser }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      user =>
        user.email === loginEmail &&
        user.password === loginPassword
    );

    if (!user) {
      alert("No account found or recheck your details.");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    setCurrentUser(user);
    setPage("dashboard");
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <img
            className="auth-logo"
          src="/Onlinejobapplicationtracker_Fedproject/jobtrack-logo.svg"
            alt="JobTrack"
          />

          <h1>Welcome Back</h1>
          <p>
            Login to continue tracking your applications.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={loginEmail}
            onChange={e => setLoginEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={loginPassword}
            onChange={e => setLoginPassword(e.target.value)}
            required
          />

          <button className="btn full-btn" type="submit">
            Login
          </button>
        </form>

        <div className="auth-switch">
          Don't have an account?

          <button onClick={() => setPage("signup")}>
            Create Account
          </button>
        </div>
      </div>
    </section>
  );
}


/* USER DASHBOARD */

function UserDashboard({
  currentUser,
  applications,
  saveApplications
}) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Applied");
  const [quote] = useState(getRandomQuote());

  const userApplications = applications.filter(
    app => app.email === currentUser.email
  );

  const total = userApplications.length;

  const applied = userApplications.filter(
    app => app.status === "Applied"
  ).length;

  const interview = userApplications.filter(
    app => app.status === "Interview"
  ).length;

  const offer = userApplications.filter(
    app => app.status === "Offer"
  ).length;

  const rejected = userApplications.filter(
    app => app.status === "Rejected"
  ).length;

  function addApplication(e) {
    e.preventDefault();

    const newApplication = {
      id: Date.now(),
      email: currentUser.email,
      company,
      role,
      location,
      date,
      status
    };

    saveApplications([...applications, newApplication]);

    setCompany("");
    setRole("");
    setLocation("");
    setDate("");
    setStatus("Applied");

    alert("Application added successfully!");
  }

  function updateStatus(id, newStatus) {
    const updated = applications.map(app =>
      app.id === id
        ? { ...app, status: newStatus }
        : app
    );

    saveApplications(updated);
  }

  function deleteApplication(id) {
    const updated = applications.filter(
      app => app.id !== id
    );

    saveApplications(updated);
  }

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <div>
          <span>YOUR DASHBOARD</span>

          <h1>Hello, {currentUser.name}!</h1>

          <p>
            Keep moving forward with your career goals.
          </p>
        </div>
      </div>

      <div className="quote-box">
        <div className="quote-mark">“</div>

        <p>{quote}</p>

        <span>KEEP GOING</span>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>TOTAL</span>
          <strong>{total}</strong>
          <small>Applications</small>
        </div>

        <div className="stat-card">
          <span>APPLIED</span>
          <strong>{applied}</strong>
          <small>Applications</small>
        </div>

        <div className="stat-card">
          <span>INTERVIEW</span>
          <strong>{interview}</strong>
          <small>Interviews</small>
        </div>

        <div className="stat-card">
          <span>OFFER</span>
          <strong>{offer}</strong>
          <small>Offers</small>
        </div>

        <div className="stat-card">
          <span>REJECTED</span>
          <strong>{rejected}</strong>
          <small>Applications</small>
        </div>
      </div>

      <section className="dashboard-section">
        <div className="section-title">
          <div>
            <span>NEW APPLICATION</span>
            <h2>Add a Job Application</h2>
          </div>
        </div>

        <form
          className="application-form"
          onSubmit={addApplication}
        >
          <div className="form-group">
            <label>Company</label>

            <input
              type="text"
              placeholder="Company name"
              value={company}
              onChange={e => setCompany(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>

            <input
              type="text"
              placeholder="Job role"
              value={role}
              onChange={e => setRole(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Applied Date</label>

            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>

          <div className="form-button">
            <button className="btn" type="submit">
              Add Application
            </button>
          </div>
        </form>
      </section>

      <section className="dashboard-section">
        <div className="section-title">
          <div>
            <span>YOUR APPLICATIONS</span>
            <h2>Application Tracker</h2>
          </div>
        </div>

        {userApplications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">+</div>

            <h3>No applications yet</h3>

            <p>
              Add your first job application above to start tracking.
            </p>
          </div>
        ) : (
          <div className="application-list">
            {userApplications.map(app => (
              <div
                className="application-card"
                key={app.id}
              >
                <div className="company-letter">
                  {app.company.charAt(0).toUpperCase()}
                </div>

                <div className="application-info">
                  <h3>{app.company}</h3>

                  <strong>{app.role}</strong>

                  <p>
                    {app.location} • {app.date}
                  </p>
                </div>

                <div className="application-actions">
                  <select
                    value={app.status}
                    onChange={e =>
                      updateStatus(
                        app.id,
                        e.target.value
                      )
                    }
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                  </select>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteApplication(app.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}


/* ADMIN LOGIN */

function AdminLogin({
  setPage,
  setAdminLoggedIn
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleAdminLogin(e) {
    e.preventDefault();

    if (
      email === "admin@jobtrack.com" &&
      password === "admin123"
    ) {
      setAdminLoggedIn(true);
      setPage("adminDashboard");
    } else {
      alert(
        "Invalid admin credentials. Please recheck details."
      );
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card admin-card">
        <div className="auth-header">
          <img
            className="auth-logo"
            src="/Onlinejobapplicationtracker_Fedproject/jobtrack-logo.svg"
            alt="JobTrack"
          />

          <h1>Admin Login</h1>

          <p>
            Access the JobTrack administration panel.
          </p>
        </div>

        <form onSubmit={handleAdminLogin}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button
            className="btn full-btn"
            type="submit"
          >
            Admin Login
          </button>
        </form>

        <div className="demo-login">
          <strong>Demo Admin Account</strong>

          <p>Email: admin@jobtrack.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </section>
  );
}


/* ADMIN DASHBOARD */

function AdminDashboard({ applications }) {
  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const interviews = applications.filter(
    app => app.status === "Interview"
  ).length;

  const offers = applications.filter(
    app => app.status === "Offer"
  ).length;

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <div>
          <span>ADMIN PANEL</span>

          <h1>JobTrack Overview</h1>

          <p>
            Monitor users and job application activity.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>USERS</span>
          <strong>{users.length}</strong>
          <small>Registered users</small>
        </div>

        <div className="stat-card">
          <span>APPLICATIONS</span>
          <strong>{applications.length}</strong>
          <small>Total applications</small>
        </div>

        <div className="stat-card">
          <span>INTERVIEWS</span>
          <strong>{interviews}</strong>
          <small>Interview stage</small>
        </div>

        <div className="stat-card">
          <span>OFFERS</span>
          <strong>{offers}</strong>
          <small>Offers received</small>
        </div>
      </div>

      <section className="dashboard-section">
        <div className="section-title">
          <div>
            <span>REGISTERED USERS</span>
            <h2>User Accounts</h2>
          </div>
        </div>

        <div className="admin-table">
          <div className="table-header">
            <span>Name</span>
            <span>Email</span>
          </div>

          {users.length === 0 ? (
            <div className="table-row">
              <span>No users found</span>
              <span>-</span>
            </div>
          ) : (
            users.map((user, index) => (
              <div
                className="table-row"
                key={index}
              >
                <span>{user.name}</span>
                <span>{user.email}</span>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-title">
          <div>
            <span>ALL APPLICATIONS</span>
            <h2>Application Activity</h2>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">+</div>

            <h3>No applications found</h3>

            <p>
              Applications will appear here when users add them.
            </p>
          </div>
        ) : (
          <div className="application-list">
            {applications.map(app => (
              <div
                className="application-card"
                key={app.id}
              >
                <div className="company-letter">
                  {app.company.charAt(0).toUpperCase()}
                </div>

                <div className="application-info">
                  <h3>{app.company}</h3>

                  <strong>{app.role}</strong>

                  <p>
                    {app.location} • {app.date}
                  </p>
                </div>

                <div className="admin-status">
                  <span>{app.status}</span>

                  <small>{app.email}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;