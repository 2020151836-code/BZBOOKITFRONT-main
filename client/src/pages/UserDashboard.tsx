import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Calendar, Bell, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import "./ServiceOfferedPage.css"; // Import shared styles
import { api } from "@/lib/api";

// Define types for our data for better safety
interface Appointment {
  apptid: string; // UUID, changed from id
  confirmationNumber?: string;
  date: string; // Changed from appointmentDate
  time: string; // Added time
  durationMinutes?: number;
  status: 'Confirmed' | 'Cancelled' | 'Pending'; // Adjusted status values
  notes?: string;
  // Add nested objects for related data
  service?: {
    name: string;
    businesses?: { // business is nested inside service
      name: string;
    }
  };
}

interface Notification {
  id: number;
  isRead: boolean;
  title: string;
  sentAt: string;
}

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const { data: appointments = [], isLoading: isLoadingAppointments } = useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: () => api("/appointments/me"),
    enabled: !!user, // Only run query if user is logged in
  });

  const { data: notifications = [], isLoading: isLoadingNotifications } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: () => api<Notification[]>("/notifications/me"),
    enabled: false, // Temporarily disabled until backend endpoint is ready
  });

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  if (isLoadingAppointments) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <header>
        <div className="container">
          <div className="header-content">
            <nav className="nav-links">
              <a onClick={() => setLocation("/services")}>Services</a>
              <a onClick={() => setLocation("/dashboard")} className="active">Dashboard</a>
            </nav>
            <div className="header-actions">
              <button className="btn btn-primary" onClick={() => setLocation("/")}>
                <i className="fas fa-home"></i> Home
              </button>
              <button className="btn btn-secondary" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="bg-white">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-800" />
                  <span className="text-amber-900">Upcoming Appointments</span>
                </CardTitle>
                <CardDescription className="text-gray-500">
                  You have {appointments.length} appointment
                  {appointments.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="bg-white">
                {appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No upcoming appointments</p>
                    <Button
                      onClick={() => setLocation("/booking")}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Book Now
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div
                        key={apt.apptid}
                        className="border border-amber-200 rounded-lg p-4 hover:bg-amber-50 transition"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800">
                              {apt.service?.name || "Appointment"} at {apt.service?.businesses?.name || "Business"}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {new Date(apt.date).toLocaleDateString()} at{" "}
                              {new Date(`1970-01-01T${apt.time}Z`).toLocaleTimeString('en-US', { timeZone: 'UTC', hour: 'numeric', minute: 'numeric', hour12: true })}
                            </p>
                            {apt.durationMinutes && (
                              <p className="text-sm text-gray-500 mt-1">
                                Duration: {apt.durationMinutes} minutes
                              </p>
                            )}
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              apt.status === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : apt.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                        </div>
                        {apt.notes && (
                          <p className="text-sm text-[#6B3A00] opacity-80 mt-2">Notes: {apt.notes}</p>
                        )}
                        <div className="flex gap-3 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-amber-600 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
                            onClick={() => setLocation(`/booking/modify/${apt.apptid}`)}
                          >
                            Modify
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setLocation(`/booking/modify/${apt.apptid}?action=cancel`)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader className="bg-white">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-800" />
                  <span className="text-amber-900">Notifications</span>
                </CardTitle>
                <CardDescription className="text-gray-500">
                  {Array.isArray(notifications)
                    ? notifications.filter((n) => !n.isRead).length
                    : 0}{" "}
                  unread
                </CardDescription>
              </CardHeader>
              <CardContent className="bg-white">
                {notifications.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No notifications yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {notifications.slice(0, 5).map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 rounded-lg text-sm ${
                          notif.isRead
                            ? "bg-gray-100 text-gray-600"
                            : "bg-blue-100 text-blue-800 font-medium"
                        }`}
                      >
                        <p className="font-semibold">{notif.title}</p>
                        <p className="text-xs mt-1 opacity-75">
                          {new Date(notif.sentAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <div className="copyright">© 2025 BZ Book It. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
