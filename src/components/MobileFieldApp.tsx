import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Building2,
  Camera,
  MapPin,
  Upload,
  CheckCircle,
  Clock,
  LogOut,
  Menu,
} from "lucide-react";

interface MobileFieldAppProps {
  onLogout: () => void;
}

export default function MobileFieldApp({ onLogout }: MobileFieldAppProps) {
  const [selectedFiles, setSelectedFiles] = useState<number>(0);
  const [taskStatus, setTaskStatus] = useState("in-progress");

  const todayTasks = [
    { id: 1, site: "Site A - Bridge Construction", status: "completed", time: "09:00 AM" },
    { id: 2, site: "Site B - Road Inspection", status: "in-progress", time: "11:30 AM" },
    { id: 3, site: "Site C - Building Survey", status: "pending", time: "02:00 PM" },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files.length);
    }
  };

  const handleSubmit = () => {
    alert("Site visit data submitted successfully!");
    setSelectedFiles(0);
    setTaskStatus("completed");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-blue-600 text-white p-4 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-white">Field App</h2>
              <p className="text-xs text-blue-100">Engineer Portal</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-white hover:bg-white/20"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-100">Today's Progress</span>
            <span className="text-sm">2/3 Tasks</span>
          </div>
          <Progress value={67} className="h-2 bg-white/20" />
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {/* Current Location */}
        <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-500 p-2 rounded-full">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 mb-1">Current Location</p>
                <p className="text-xs text-gray-600">
                  Lat: 28.6139° N, Long: 77.2090° E
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Near Site B - Road Inspection Area
                </p>
              </div>
              <Badge className="bg-green-500">Active</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Today's Site Visits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {task.status === "completed" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : task.status === "in-progress" ? (
                    <Clock className="w-5 h-5 text-blue-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                  <div>
                    <p className="text-sm text-gray-900">{task.site}</p>
                    <p className="text-xs text-gray-500">{task.time}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    task.status === "completed"
                      ? "default"
                      : task.status === "in-progress"
                      ? "secondary"
                      : "outline"
                  }
                  className={
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "in-progress"
                      ? "bg-blue-100 text-blue-700"
                      : ""
                  }
                >
                  {task.status === "completed"
                    ? "Done"
                    : task.status === "in-progress"
                    ? "Active"
                    : "Pending"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upload Site Visit Data */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Submit Site Visit Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Photo Upload */}
            <div className="space-y-2">
              <Label>Site Photos</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    Tap to capture or upload photos
                  </p>
                  {selectedFiles > 0 && (
                    <Badge className="mt-2">
                      {selectedFiles} photo{selectedFiles > 1 ? "s" : ""} selected
                    </Badge>
                  )}
                </label>
              </div>
            </div>

            {/* Task Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Survey Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter site observations, measurements, or findings..."
                rows={4}
              />
            </div>

            {/* GPS Location */}
            <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-blue-900 mb-1">Geo-tagging enabled</p>
                <p className="text-xs text-blue-700">
                  Location will be automatically attached to this submission
                </p>
              </div>
            </div>

            {/* Status Selection */}
            <div className="space-y-2">
              <Label>Task Completion Status</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={taskStatus === "completed" ? "default" : "outline"}
                  onClick={() => setTaskStatus("completed")}
                  className="w-full"
                  size="sm"
                >
                  Complete
                </Button>
                <Button
                  variant={taskStatus === "in-progress" ? "default" : "outline"}
                  onClick={() => setTaskStatus("in-progress")}
                  className="w-full"
                  size="sm"
                >
                  In Progress
                </Button>
                <Button
                  variant={taskStatus === "pending" ? "default" : "outline"}
                  onClick={() => setTaskStatus("pending")}
                  className="w-full"
                  size="sm"
                >
                  Pending
                </Button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
            >
              <Upload className="w-4 h-4" />
              Submit Site Visit Data
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-gray-600 mb-1">Visits</p>
              <p className="text-blue-900">24</p>
              <p className="text-xs text-gray-500">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-gray-600 mb-1">Photos</p>
              <p className="text-blue-900">156</p>
              <p className="text-xs text-gray-500">Uploaded</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-gray-600 mb-1">Score</p>
              <p className="text-blue-900">92</p>
              <p className="text-xs text-gray-500">This week</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}