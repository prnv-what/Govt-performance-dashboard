import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, Target, Award, AlertCircle } from "lucide-react";

export default function EmployeeDashboard() {
  const overallScore = 87;
  
  const kpiBreakdown = [
    { name: "File Disposal Rate", score: 92, weight: 25, target: 90 },
    { name: "DPR Timeliness", score: 95, weight: 20, target: 95 },
    { name: "Site Visits Completed", score: 78, weight: 20, target: 85 },
    { name: "Report Quality", score: 88, weight: 20, target: 85 },
    { name: "Budget Adherence", score: 85, weight: 15, target: 90 },
  ];

  const trendData = [
    { month: "Sep", score: 82, teamAvg: 78 },
    { month: "Oct", score: 84, teamAvg: 79 },
    { month: "Nov", score: 83, teamAvg: 80 },
    { month: "Dec", score: 86, teamAvg: 81 },
    { month: "Jan", score: 85, teamAvg: 82 },
    { month: "Feb", score: 87, teamAvg: 83 },
  ];

  const strengths = [
    "DPR submission always on time",
    "Excellent report quality",
    "Strong file disposal rate",
  ];

  const improvements = [
    "Increase site visit completion rate",
    "Focus on budget planning accuracy",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-blue-900 mb-1">My Performance Dashboard</h1>
        <p className="text-gray-600">Track your KPIs and performance metrics</p>
      </div>

      {/* Overall Score Card */}
      <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-blue-100 mb-2">Overall Performance Score</p>
              <div className="flex items-end gap-3">
                <span className="text-white">{overallScore}</span>
                <span className="text-blue-100 mb-2">/ 100</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-green-300" />
                <span className="text-sm text-green-300">+5 points from last month</span>
              </div>
            </div>
            <div className="w-full md:w-48">
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="white"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${overallScore * 5.53} 553`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Award className="w-12 h-12 text-white mx-auto mb-2" />
                    <p className="text-sm text-blue-100">Excellent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              6-Month Performance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[70, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  name="My Score"
                  dot={{ fill: '#2563eb', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="teamAvg" 
                  stroke="#9ca3af" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Team Average"
                  dot={{ fill: '#9ca3af', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* KPI Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              KPI vs Team Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={kpiBreakdown.slice(0, 4)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280"
                  tick={{ fontSize: 11 }}
                  angle={-15}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#6b7280" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Bar dataKey="score" fill="#2563eb" name="My Score" />
                <Bar dataKey="target" fill="#9ca3af" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* KPI Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>KPI Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {kpiBreakdown.map((kpi, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-900">{kpi.name}</p>
                      {kpi.score >= kpi.target ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Weight: {kpi.weight}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-900">{kpi.score}/100</p>
                    <p className="text-xs text-gray-500">Target: {kpi.target}</p>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={kpi.score} className="h-2" />
                  <div 
                    className="absolute top-0 h-2 w-0.5 bg-gray-900"
                    style={{ left: `${kpi.target}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Award className="w-5 h-5" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                  <span className="text-sm text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Areas for Improvement */}
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <AlertCircle className="w-5 h-5" />
              Needs Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2" />
                  <span className="text-sm text-gray-700">{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}