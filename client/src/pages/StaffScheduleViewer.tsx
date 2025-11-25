
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Calendar, Clock, User } from "lucide-react";
import { useState } from "react";

export default function StaffScheduleViewer() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const initialStaffMembers = [
    {
      id: 1,
      name: "Taherah Bradley",
      specialization: "Lash Extensions",
      appointments: [
        { time: "9:00 AM", client: "Maria Garcia", service: "Classic Lash Extensions", duration: "120 min" },
        { time: "11:30 AM", client: "Emily Chen", service: "Volume Lash Extensions", duration: "120 min" },
        { time: "2:00 PM", client: "Jessica Lee", service: "Lash Fill (2 weeks)", duration: "75 min" },
      ],
    },
    {
      id: 2,
      name: "Anya Andrews",
      specialization: "Lash & Brow Care",
      appointments: [
        { time: "10:00 AM", client: "David Smith", service: "Lash Removal", duration: "30 min" },
        { time: "11:00 AM", client: "Lisa Wang", service: "Brow Lamination", duration: "60 min" },
      ],
    },
    {
      id: 3,
      name: "Sophie Turner",
      specialization: "Lash Artist",
      appointments: [
        { time: "9:30 AM", client: "Jennifer Brown", service: "Classic Lash Extensions", duration: "120 min" },
        { time: "12:00 PM", client: "Rachel Green", service: "Lash Fill (2 weeks)", duration: "75 min" },
        { time: "3:00 PM", client: "Azena Reid", service: "Volume Lash Extensions", duration: "120 min" },
      ],
    },
  ];

  const [staffMembers, setStaffMembers] = useState(initialStaffMembers);

  const handleCancelAppointment = (staffId: number, appointmentIndex: number) => {
    setStaffMembers(currentStaff =>
      currentStaff.map(staff => {
        if (staff.id === staffId) {
          return {
            ...staff,
            appointments: staff.appointments.filter((_, idx) => idx !== appointmentIndex),
          };
        }
        return staff;
      })
    );
  };
  return (
    <div className="min-h-screen bg-[#FFF9F3] p-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#6B3A00]">Staff Schedule</h1>
            <p className="text-[#6B3A00]/80 mt-2">View all staff appointments for today</p>
          </div>
          <Button
            onClick={() => setLocation("/owner/dashboard")}
            variant="outline"
            className="border-amber-600 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Date Selector */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-[#E86E1B]" />
              <input
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                className="px-4 py-2 border border-[#F3C97A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7941D] bg-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Staff Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {staffMembers.map((staff) => (
            <Card key={staff.id}>
              <CardHeader className="bg-[#FFF4D6] border-b border-[#F3C97A]">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-[#E86E1B]" />
                      {staff.name}
                    </CardTitle>
                    <CardDescription className="text-[#6B3A00]/80">{staff.specialization}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {staff.appointments.length === 0 ? (
                  <p className="text-[#6B3A00]/70 text-center py-8">No appointments scheduled</p>
                ) : (
                  <div className="space-y-4">
                    {staff.appointments.map((apt, idx) => (
                      <div
                        key={idx}
                        className="border border-[#F3C97A] rounded-lg p-4 hover:bg-[#FFF9F3] transition"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#E86E1B]" />
                            <span className="font-semibold text-[#6B3A00]">{apt.time}</span>
                          </div>
                          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {apt.duration}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-[#6B3A00]">{apt.service}</p>
                          <p className="text-sm text-[#6B3A00]/80">Client: {apt.client}</p>
                        </div>
                        <div className="flex justify-end mt-3">
                          <Button
                            variant="destructive"
                            size="sm"
                            type="button"
                            onClick={() => handleCancelAppointment(staff.id, idx)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Staff Info */}
                <div className="mt-6 pt-4 border-t">
                  <p className="text-xs text-[#6B3A00]/70 mb-2">Total Hours:</p>
                  <p className="font-semibold text-[#6B3A00]">
                    {staff.appointments.reduce((sum, apt) => {
                      const hours = parseInt(apt.duration) / 60;
                      return sum + hours;
                    }, 0).toFixed(1)} hours
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="mt-6 bg-[#FFF4D6] border-[#F3C97A]">
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-[#6B3A00]/80 mb-1">Total Appointments</p>
                <p className="text-2xl font-bold text-[#6B3A00]">
                  {staffMembers.reduce((sum, staff) => sum + staff.appointments.length, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#6B3A00]/80 mb-1">Staff Members</p>
                <p className="text-2xl font-bold text-[#6B3A00]">{staffMembers.length}</p>
              </div>
              <div>
                <p className="text-sm text-[#6B3A00]/80 mb-1">Total Hours</p>
                <p className="text-2xl font-bold text-[#6B3A00]">
                  {staffMembers.reduce((sum, staff) => {
                    return sum + staff.appointments.reduce((staffSum, apt) => {
                      return staffSum + parseInt(apt.duration) / 60;
                    }, 0);
                  }, 0).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
