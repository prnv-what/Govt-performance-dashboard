import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  FileText, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Users,
  Activity
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Avg File Disposal Rate",
      value: "87.3%",
      change: "+5.2%",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "DPR Timeliness",
      value: "92.1%",
      change: "+3.1%",
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Budget Utilization",
      value: "78.5%",
      change: "+12.3%",
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Project Progress",
      value: "84.2%",
      change: "+7.8%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const slaBreaches = [
    { id: 1, type: "File Disposal Delay", unit: "Division A", days: 15, severity: "high" },
    { id: 2, type: "DPR Not Submitted", unit: "Field Unit 3", days: 8, severity: "high" },
    { id: 3, type: "Budget Report Pending", unit: "Project X", days: 5, severity: "medium" },
    { id: 4, type: "Site Visit Overdue", unit: "Field Unit 7", days: 3, severity: "low" },
  ];

  const teamPerformance = [
    { name: "Division A", score: 92, members: 45 },
    { name: "Division B", score: 88, members: 38 },
    { name: "Field Units", score: 85, members: 67 },
    { name: "Project Teams", score: 90, members: 52 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-blue-900 mb-1">Admin Dashboard</h1>
          <p className="text-gray-600">Organization-wide performance overview</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Units</SelectItem>
              <SelectItem value="hq">HQ Staff</SelectItem>
              <SelectItem value="field">Field Units</SelectItem>
              <SelectItem value="division">Divisions</SelectItem>
              <SelectItem value="project">Projects</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-blue-900 mb-1">{stat.value}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SLA Breaches */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                SLA Breaches & Alerts
              </CardTitle>
              <Badge variant="destructive">{slaBreaches.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {slaBreaches.map((breach) => (
              <Alert key={breach.id} variant={breach.severity === "high" ? "destructive" : "default"} className="border-l-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{breach.type}</AlertTitle>
                <AlertDescription>
                  <div className="flex items-center justify-between mt-1">
                    <span>{breach.unit}</span>
                    <Badge variant={
                      breach.severity === "high" ? "destructive" : 
                      breach.severity === "medium" ? "default" : 
                      "secondary"
                    }>
                      {breach.days} days overdue
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamPerformance.map((team, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-900">{team.name}</p>
                    <p className="text-xs text-gray-500">{team.members} members</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-900">{team.score}</p>
                    <p className="text-xs text-gray-500">score</p>
                  </div>
                </div>
                <Progress value={team.score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { user: "Rajesh Kumar", action: "Submitted DPR for Project Alpha", time: "5 minutes ago" },
              { user: "Priya Singh", action: "Completed file disposal (15 files)", time: "1 hour ago" },
              { user: "Amit Patel", action: "Updated budget report for Q4", time: "2 hours ago" },
              { user: "Neha Sharma", action: "Uploaded site visit photos (12 images)", time: "3 hours ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm">{activity.user.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}