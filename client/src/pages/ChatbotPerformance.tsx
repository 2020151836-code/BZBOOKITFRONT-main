import { Bar, Doughnut, Line, Chart as ChartJS } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  DoughnutController,
  Legend,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  CheckCircle,
  FileDown,
  Filter,
  HelpCircle,
  RefreshCw,
  Smile,
  TrendingUp,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  DoughnutController,
  Legend,
  Title,
  Tooltip,
  Filler
);

const doughnutData = {
  labels: ["Booking", "Pricing", "Services", "General"],
  datasets: [
    {
      data: [35, 28, 25, 12],
      backgroundColor: ["#F7941D", "#28a745", "#007bff", "#6c757d"],
      borderWidth: 0,
    },
  ],
};

const lineData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Avg. Response Time (seconds)",
      data: [1.8, 1.5, 1.3, 1.2, 1.1, 1.0, 0.9],
      backgroundColor: "rgba(247, 148, 29, 0.1)",
      borderColor: "#F7941D",
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    },
  ],
};

const doughnutOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        color: "#6B3A00",
        padding: 15,
      },
    },
  },
};

const lineOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        drawBorder: false,
      },
      ticks: {
        color: "#6B3A00",
        callback: (value: any) => `${value}s`,
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#6B3A00",
      },
    },
  },
};

export default function ChatbotPerformance() {
  return (
    <div className="bg-[#FFF4D6] text-[#6B3A00] p-5 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b-2 border-[#F3C97A]">
          <div className="flex items-center gap-2">
            <Calendar className="w-7 h-7 text-[#F7941D]" />
            <h1 className="text-2xl font-semibold text-[#6B3A00]">BZBOOKIT</h1>
          </div>
          <div className="text-left md:text-right mt-4 md:mt-0">
            <h1 className="text-3xl font-bold text-[#E86E1B]">
              Service Response Report
            </h1>
            <p className="text-[#6B3A00]/80">
              Summarizes frequent client questions and chatbot metrics
            </p>
          </div>
        </header>

        <Card className="mb-6 bg-white border-[#F3C97A]">
          <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-4">
              <Select defaultValue="30">
                <SelectTrigger className="w-[180px] bg-[#FFF9F3] border-[#F3C97A]">
                  <Calendar className="w-4 h-4 mr-2 text-[#F7941D]" />
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] bg-[#FFF9F3] border-[#F3C97A]">
                  <Filter className="w-4 h-4 mr-2 text-[#F7941D]" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="booking">Booking</SelectItem>
                  <SelectItem value="pricing">Pricing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-[#F3C97A]">
                <FileDown className="w-4 h-4 mr-2" /> Export
              </Button>
              <Button>
                <RefreshCw className="w-4 h-4 mr-2" /> Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-center border-[#F3C97A]">
            <CardContent className="p-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#F7941D] text-white mb-4">
                <HelpCircle />
              </div>
              <p className="text-3xl font-bold">428</p>
              <p className="text-sm text-[#6B3A00]/80">Total Questions</p>
            </CardContent>
          </Card>
          <Card className="text-center border-[#F3C97A]">
            <CardContent className="p-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-500 text-white mb-4">
                <CheckCircle />
              </div>
              <p className="text-3xl font-bold">86%</p>
              <p className="text-sm text-[#6B3A00]/80">
                Chatbot Resolution Rate
              </p>
            </CardContent>
          </Card>
          <Card className="text-center border-[#F3C97A]">
            <CardContent className="p-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500 text-white mb-4">
                <TrendingUp />
              </div>
              <p className="text-3xl font-bold">62</p>
              <p className="text-sm text-[#6B3A00]/80">Escalated to Human</p>
            </CardContent>
          </Card>
          <Card className="text-center border-[#F3C97A]">
            <CardContent className="p-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#F3C97A] text-white mb-4">
                <Smile />
              </div>
              <p className="text-3xl font-bold">4.2/5</p>
              <p className="text-sm text-[#6B3A00]/80">Satisfaction Score</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-[#F3C97A]">
            <CardHeader>
              <CardTitle className="text-lg">Questions by Category</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </CardContent>
          </Card>
          <Card className="border-[#F3C97A]">
            <CardHeader>
              <CardTitle className="text-lg">Response Time Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <Line data={lineData} options={lineOptions} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-[#F3C97A]">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Average Response Time</p>
                <p className="font-bold text-2xl text-[#E86E1B]">1.2s</p>
              </div>
              <p className="text-sm text-[#6B3A00]/80 mb-2">
                Chatbot response time
              </p>
              <Progress value={85} className="h-2 [&>*]:bg-[#F7941D]" />
              <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
                <ArrowUp className="w-4 h-4" /> 12% faster than last month
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#F3C97A]">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">First Contact Resolution</p>
                <p className="font-bold text-2xl text-[#E86E1B]">78%</p>
              </div>
              <p className="text-sm text-[#6B3A00]/80 mb-2">
                Questions resolved without escalation
              </p>
              <Progress value={78} className="h-2 [&>*]:bg-green-500" />
              <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
                <ArrowUp className="w-4 h-4" /> 5% improvement
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#F3C97A]">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Human Handoff Rate</p>
                <p className="font-bold text-2xl text-[#E86E1B]">14%</p>
              </div>
              <p className="text-sm text-[#6B3A00]/80 mb-2">
                Questions escalated to staff
              </p>
              <Progress value={14} className="h-2 [&>*]:bg-blue-500" />
              <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
                <ArrowDown className="w-4 h-4" /> 3% decrease
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-[#F3C97A]">
          <CardHeader>
            <CardTitle>Frequent Client Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Question</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Resolution Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    q: "What are your business hours?",
                    cat: "General",
                    freq: 142,
                    trend: -12,
                    res: 98,
                  },
                  {
                    q: "How much does a lash fill cost?",
                    cat: "Pricing",
                    freq: 118,
                    trend: 8,
                    res: 95,
                  },
                  {
                    q: "Do you accept walk-ins?",
                    cat: "Booking",
                    freq: 96,
                    trend: 15,
                    res: 92,
                  },
                  {
                    q: "What's the difference between classic and volume lashes?",
                    cat: "Services",
                    freq: 87,
                    trend: 22,
                    res: 89,
                  },
                ].map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{item.q}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.cat === "General"
                            ? "secondary"
                            : item.cat === "Pricing" || item.cat === "Booking"
                            ? "default" // Using default for Booking and Pricing
                            : item.cat === "Services"
                            ? "destructive" // Using another variant for Services
                            : "outline" // Fallback
                        }
                      >
                        {item.cat}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.freq}</TableCell>
                    <TableCell
                      className={`flex items-center gap-1 ${
                        item.trend > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.trend > 0 ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      {Math.abs(item.trend)}%
                    </TableCell>
                    <TableCell>{item.res}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <footer className="flex flex-col md:flex-row justify-between items-start md:items-center mt-8 pt-5 border-t-2 border-[#F3C97A] text-sm gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#F7941D]" />
              <span>Report Period: Nov 14, 2025 - Nov 21, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#F7941D]" />
              <span>Business Owner: Alex Johnson</span>
            </div>
          </div>
          <div className="text-xs">© 2025 BZBOOKIT. All rights reserved.</div>
        </footer>
      </div>
    </div>
  );
}