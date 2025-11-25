

import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Calendar, Award, BarChart3 } from "lucide-react";
import { useLocation } from "wouter";

export default function BusinessPerformanceDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const performanceMetrics = [
    {
      label: "Total Revenue",
      value: "BZ$16000",
      change: "+12%",
      icon: DollarSign,
      color: "bg-amber-100 text-amber-600",
    },
    {
      label: "Total Appointments",
      value: "150",
      change: "+18%",
      icon: Calendar,
      color: "bg-orange-100 text-orange-600",
    },
    {
      label: "Active Clients",
      value: "190",
      change: "+12%",
      icon: Users,
      color: "bg-amber-100 text-amber-600",
    },
    {
      label: "Avg. Rating",
      value: "4.7/5",
      change: "+0.2",
      icon: Award,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const topServices = [
    { name: "Volume Lash Extensions", revenue: "BZ$3550", appointments: 120, rating: 4.8 },
    { name: "Classic Lash Extensions", revenue: "BZ$1200", appointments: 69, rating: 4.9 },
    { name: "Eyebrow Tinting", revenue: "Bz2000", appointments: 50, rating: 4.5 },

  ];

  const monthlyRevenue = [
    { month: "Aug", revenue: 1500 },
    { month: "Sep", revenue: 2000 },
    { month: "Oct", revenue: 3000 },
    { month: "Nov", revenue: 890 },
    { month: "Dec", revenue: 3500 },
  ];

  const clientSegmentation = [
    { segment: "New Clients", count: 15, percentage: 10 },
    { segment: "Regular Clients", count: 89, percentage: 51 },
    { segment: "VIP Clients", count: 15, percentage: 10 },
    { segment: "Inactive Clients", count: 88, percentage: 35 },
  ];

  return (
    <div className="min-h-screen bg-amber-50 p-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-amber-900">Business Performance</h1>
            <p className="text-gray-500 mt-2">Comprehensive analytics and business metrics</p>
          </div>
          <Button
            onClick={() => setLocation("/owner/dashboard")}
            variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{metric.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                      <p className="text-sm text-green-600 mt-2">{metric.change} from last month</p>
                    </div>
                    <div className={`p-3 rounded-lg ${metric.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Revenue Trend */}
          <Card className="lg:col-span-2 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-800" />
                Revenue Trend
              </CardTitle>
              <CardDescription className="text-gray-500">Last 5 months performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyRevenue.map((item, index) => {
                  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));
                  const percentage = (item.revenue / maxRevenue) * 100;
                  return (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-800">{item.month}</span>
                        <span className="text-gray-500">BZ${item.revenue.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-amber-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Client Segmentation */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-800" />
                Client Segmentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientSegmentation.map((segment, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-800">{segment.segment}</span>
                      <span className="text-sm text-gray-500">{segment.percentage}%</span>
                    </div>
                    <div className="w-full bg-amber-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          index === 0
                            ? "bg-amber-600"
                            : index === 1
                            ? "bg-orange-500"
                            : index === 2
                            ? "bg-amber-400"
                            : "bg-gray-400"
                        }`}
                        style={{ width: `${segment.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{segment.count} clients</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Services */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-800" />
              Top Performing Services
            </CardTitle>
            <CardDescription className="text-gray-500">Services ranked by revenue and customer satisfaction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">Service</th>
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">Revenue</th>
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">Appointments</th>
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {topServices.map((service, index) => (
                    <tr key={index} className="border-b hover:bg-amber-50 transition">
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-800">{service.name}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-gray-700 font-semibold">{service.revenue}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-gray-500">{service.appointments}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <span className="text-orange-500">★</span>
                          <span className="font-medium text-gray-800">{service.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
