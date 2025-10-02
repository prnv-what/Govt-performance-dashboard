import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { FileText, Download, Calendar as CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("employee");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2025, 0, 1),
    to: new Date(),
  });
  const [selectedUnit, setSelectedUnit] = useState("all");
  const [exportFormat, setExportFormat] = useState("pdf");

  const recentReports = [
    {
      id: 1,
      name: "Monthly Performance Report - January 2025",
      type: "Consolidated",
      date: "2025-02-01",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Division A Performance - Q4 2024",
      type: "Division",
      date: "2025-01-15",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "Field Units Activity Report",
      type: "Field Units",
      date: "2025-01-10",
      size: "3.2 MB",
    },
    {
      id: 4,
      name: "Employee KPI Summary - December",
      type: "Employee",
      date: "2024-12-31",
      size: "956 KB",
    },
  ];

  const handleGenerateReport = () => {
    alert(`Generating ${exportFormat.toUpperCase()} report for ${reportType}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-blue-900 mb-1">Reports & Export</h1>
        <p className="text-gray-600">Generate and download performance reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Generator */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Generate New Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Report Type */}
            <div className="space-y-2">
              <Label>Report Type</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { value: "employee", label: "Employee" },
                  { value: "division", label: "Division" },
                  { value: "project", label: "Project" },
                  { value: "consolidated", label: "Consolidated" },
                ].map((type) => (
                  <Button
                    key={type.value}
                    variant={reportType === type.value ? "default" : "outline"}
                    onClick={() => setReportType(type.value)}
                    className="w-full"
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Unit/Division</Label>
                <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Units</SelectItem>
                    <SelectItem value="hq">HQ Staff</SelectItem>
                    <SelectItem value="field">Field Units</SelectItem>
                    <SelectItem value="divisionA">Division A</SelectItem>
                    <SelectItem value="divisionB">Division B</SelectItem>
                    <SelectItem value="projectX">Project X</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Export Format</Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                    <SelectItem value="excel">Excel Workbook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label>Date Range</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      {dateRange.from ? format(dateRange.from, "PPP") : "Start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) =>
                        date && setDateRange({ ...dateRange, from: date })
                      }
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      {dateRange.to ? format(dateRange.to, "PPP") : "End date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) =>
                        date && setDateRange({ ...dateRange, to: date })
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Report Options */}
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <h4 className="text-sm text-blue-900">Report will include:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Performance metrics and KPI scores</li>
                <li>• Trend analysis and comparisons</li>
                <li>• SLA compliance data</li>
                <li>• Recommendations and insights</li>
              </ul>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerateReport}
              className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
            >
              <Download className="w-4 h-4" />
              Generate & Download Report
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="w-4 h-4" />
                This Month
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="w-4 h-4" />
                Last Quarter
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="w-4 h-4" />
                This Year
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="w-4 h-4" />
                Custom Range
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Report Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Generated Today</span>
                <Badge>12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Month</span>
                <Badge>247</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Size</span>
                <Badge variant="secondary">45.2 GB</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Reports</CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 mb-1">{report.name}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                      <Badge variant="outline">{report.type}</Badge>
                      <span>•</span>
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 shrink-0">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}