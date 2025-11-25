import { Link, useLocation } from "wouter";
import "./pages/OwnerDashboard.css";
import { useAuth } from "@/_core/hooks/useAuth";

const BusinessOwnerDashboard = () => {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const handleActionClick = (action: string) => {
    alert(`Action: ${action}`);
  };

  return (
    <div className="container">
      <header>
        <div className="logo">BZ Book It</div>
        <div className="user-info">
          Business Owner: {user?.email}
          <a href="#" className="logout" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
            Logout
          </a>
        </div>
      </header>

      <h1 className="dashboard-title">LashbyRoyal Dashboard</h1>

      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="card-title">Today's Appointments</div>
          <div className="card-value">4</div>
          <div className="card-change">+2 from yesterday</div>
        </div>
        <div className="analytics-card">
          <div className="card-title">This Month Revenue</div>
          <div className="card-value">BZ$3500</div>
          <div className="card-change">+15% from last month</div>
        </div>
        <div className="analytics-card">
          <div className="card-title">Active Clients</div>
          <div className="card-value">45</div>
          <div className="card-change">+12 new this week</div>
        </div>
        <div className="analytics-card">
          <div className="card-title">Avg. Rating</div>
          <div className="card-value">4.8</div>
          <div className="card-change">Based on 89 reviews</div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="dashboard-sections">
        <div className="section">
          <h2 className="section-title">Quick Reports</h2>
          <ul className="quick-links">
            <li><Link href="/owner/reports/performance">Business Performance</Link></li>
            <li><Link href="/owner/reports/chatbot">Chatbot Performance</Link></li>
          </ul>
          <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
            <button className="btn" onClick={() => handleActionClick("Generate Report")}>Generate Report</button>
            <Link to="/owner/export" className="btn btn-outline">Export Data</Link>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Management</h2>
          <ul className="quick-links">
            <li><Link href="/owner/services">Manage Services</Link></li>
            <li><Link href="/owner/schedule">Staff Schedule</Link></li>
          </ul>
          <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
            <button className="btn" onClick={() => handleActionClick("Add Service")}>Add Service</button>
            <Link to="/owner/schedule" className="btn btn-outline">View Calendar</Link>
          </div>
        </div>
      </div>

      <footer>
        <p>© 2023 BZ Book It. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BusinessOwnerDashboard;
