import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation, useRoute } from "wouter";
import { toast } from "sonner";
import { Loader2, AlertCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface UpdateAppointmentPayload {
  appointmentId: string;
  appointmentDate: Date;
  durationMinutes: number;
}

interface CancelAppointmentPayload {
  appointmentId: string;
  cancellationReason?: string; // Made optional
}

export default function ModifyBookingForm() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/booking/modify/:id");
  const appointmentId = params?.id || "";

  const [appointmentDate, setAppointmentDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmPm] = useState("am");
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const queryClient = useQueryClient();
  const cancelCardRef = useRef<HTMLDivElement>(null);

  // Auto-open cancel section if ?action=cancel
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("action") === "cancel") {
      setShowCancelConfirm(true);
      setTimeout(() => {
        cancelCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
    }
  }, []);

  const updateAppointmentMutation = useMutation({
    mutationFn: (payload: UpdateAppointmentPayload) =>
      api(`/appointments/${payload.appointmentId}`, {
        method: "PATCH",
        body: payload,
      }),

    onSuccess: () => {
      toast.success("Appointment updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setLocation("/dashboard");
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to update appointment");
    },
  });

  const cancelAppointmentMutation = useMutation({
    mutationFn: (payload: CancelAppointmentPayload) =>
      api(`/appointments/${payload.appointmentId}`, {
        method: "DELETE",
        body: {}, // No longer sending a reason
      }),

    onSuccess: () => {
      toast.success("Appointment successfully cancelled!");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setLocation("/dashboard");
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to cancel appointment");
    },
  });

  const handleModify = (e: React.FormEvent) => {
    e.preventDefault();

    if (!appointmentDate || !hour || !minute) {
      toast.error("Please select a new date and time");
      return;
    }

    let h = parseInt(hour, 10);
    if (ampm === "pm" && h < 12) h += 12;
    if (ampm === "am" && h === 12) h = 0;

    const appointmentDateTime = new Date(
      `${appointmentDate}T${String(h).padStart(2, "0")}:${minute}:00`
    );

    updateAppointmentMutation.mutate({
      appointmentId,
      appointmentDate: appointmentDateTime,
      durationMinutes: 60,
    });
  };

  const handleCancel = () => {
    cancelAppointmentMutation.mutate({
      appointmentId,
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF9F3] p-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Modify Appointment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-[#6B3A00]">Reschedule Appointment</CardTitle>
              <CardDescription className="text-[#6B3A00] opacity-80">
                Change your appointment date and time
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleModify} className="space-y-4">
                <div className="space-y-2">
                  <Label>New Date</Label>
                  <Input
                    type="date"
                    value={appointmentDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>New Time</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Hour */}
                    <Select value={hour} onValueChange={setHour}>
                      <SelectTrigger><SelectValue placeholder="Hour" /></SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                          <SelectItem key={h} value={String(h)}>
                            {String(h).padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Minute */}
                    <Select value={minute} onValueChange={setMinute}>
                      <SelectTrigger><SelectValue placeholder="Min" /></SelectTrigger>
                      <SelectContent>
                        {["00", "15", "30", "45"].map((m) => (
                          <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* AM/PM */}
                    <Select value={ampm} onValueChange={setAmPm}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="am">AM</SelectItem>
                        <SelectItem value="pm">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg flex gap-3 text-sm text-blue-800">
                  <AlertCircle className="w-5 h-5" />
                  <p>Changes must be made at least 24 hours before your appointment.</p>
                </div>

                <Button
                  type="submit"
                  disabled={updateAppointmentMutation.isPending}
                  className="w-full bg-[#F7941D] hover:bg-[#E86E1B] text-white"
                >
                  {updateAppointmentMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Confirm New Date & Time"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Cancel Appointment */}
          <Card className="border-red-200" ref={cancelCardRef}>
            <CardHeader className="bg-red-50 border-b border-red-200">
              <CardTitle className="text-2xl text-red-900">Cancel Appointment</CardTitle>
              <CardDescription className="text-red-700">
                This action cannot be undone
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
                <p className="text-sm text-red-900 font-semibold mb-2">
                  Are you sure you want to cancel?
                </p>
                <p className="text-sm text-red-800 mb-4">
                  Cancellations within 24 hours may incur a fee.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleCancel}
                  disabled={cancelAppointmentMutation.isPending}
                  variant="destructive"
                  className="flex-1"
                >
                  {cancelAppointmentMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    "Confirm Cancellation"
                  )}
                </Button>

                <Button
                  onClick={() => setLocation("/dashboard")}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-center flex justify-center gap-4">
          <Button
            onClick={() => setLocation("/")}
            variant="ghost"
            className="text-[#E86E1B] hover:text-[#F7941D]"
          >
            Go to Home
          </Button>

          <Button
            onClick={() => setLocation("/dashboard")}
            variant="ghost"
            className="text-[#E86E1B] hover:text-[#F7941D]"
          >
            Go to Dashboard
          </Button>

        </div>
      </div>
    </div>
  );
}