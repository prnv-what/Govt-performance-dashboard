import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Plus, Pencil, Trash2, Target } from "lucide-react";

interface KPI {
  id: number;
  name: string;
  description: string;
  formula: string;
  weight: number;
  role: string;
  category: string;
}

export default function KPIManagement() {
  const [kpis, setKpis] = useState<KPI[]>([
    {
      id: 1,
      name: "File Disposal Rate",
      description: "Percentage of files disposed within SLA timeframe",
      formula: "(Disposed Files / Total Files) × 100",
      weight: 25,
      role: "All",
      category: "Administrative",
    },
    {
      id: 2,
      name: "DPR Timeliness",
      description: "Daily Progress Report submission on time",
      formula: "(On-time DPRs / Total DPRs) × 100",
      weight: 20,
      role: "Field Engineer",
      category: "Reporting",
    },
    {
      id: 3,
      name: "Site Visits Completed",
      description: "Number of scheduled site visits completed",
      formula: "(Completed Visits / Scheduled Visits) × 100",
      weight: 20,
      role: "Field Engineer",
      category: "Field Operations",
    },
    {
      id: 4,
      name: "Budget Utilization",
      description: "Efficient use of allocated budget",
      formula: "(Spent Amount / Allocated Budget) × 100",
      weight: 15,
      role: "Project Manager",
      category: "Financial",
    },
    {
      id: 5,
      name: "Report Quality Score",
      description: "Quality assessment of submitted reports",
      formula: "Average of quality parameters (0-100)",
      weight: 20,
      role: "All",
      category: "Quality",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingKPI, setEditingKPI] = useState<KPI | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    formula: "",
    weight: 0,
    role: "",
    category: "",
  });

  const handleAdd = () => {
    setEditingKPI(null);
    setFormData({
      name: "",
      description: "",
      formula: "",
      weight: 0,
      role: "",
      category: "",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (kpi: KPI) => {
    setEditingKPI(kpi);
    setFormData({
      name: kpi.name,
      description: kpi.description,
      formula: kpi.formula,
      weight: kpi.weight,
      role: kpi.role,
      category: kpi.category,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this KPI?")) {
      setKpis(kpis.filter((kpi) => kpi.id !== id));
    }
  };

  const handleSave = () => {
    if (editingKPI) {
      setKpis(
        kpis.map((kpi) =>
          kpi.id === editingKPI.id
            ? { ...kpi, ...formData }
            : kpi
        )
      );
    } else {
      const newKPI: KPI = {
        id: Math.max(...kpis.map((k) => k.id)) + 1,
        ...formData,
      };
      setKpis([...kpis, newKPI]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-blue-900 mb-1">KPI Management</h1>
          <p className="text-gray-600">Define and manage performance indicators</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="w-4 h-4" />
              Add New KPI
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingKPI ? "Edit KPI" : "Add New KPI"}
              </DialogTitle>
              <DialogDescription>
                Define the KPI parameters and calculation formula
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">KPI Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., File Disposal Rate"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe what this KPI measures"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="formula">Calculation Formula</Label>
                <Input
                  id="formula"
                  value={formData.formula}
                  onChange={(e) =>
                    setFormData({ ...formData, formula: e.target.value })
                  }
                  placeholder="e.g., (Completed / Total) × 100"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (%)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: Number(e.target.value) })
                    }
                    min={0}
                    max={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Field Engineer">Field Engineer</SelectItem>
                      <SelectItem value="Project Manager">Project Manager</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrative">Administrative</SelectItem>
                      <SelectItem value="Reporting">Reporting</SelectItem>
                      <SelectItem value="Field Operations">Field Operations</SelectItem>
                      <SelectItem value="Financial">Financial</SelectItem>
                      <SelectItem value="Quality">Quality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                {editingKPI ? "Update KPI" : "Add KPI"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total KPIs</p>
                <p className="text-blue-900">{kpis.length}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Categories</p>
                <p className="text-blue-900">
                  {new Set(kpis.map((k) => k.category)).size}
                </p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Weight</p>
                <p className="text-blue-900">
                  {kpis.reduce((sum, kpi) => sum + kpi.weight, 0)}%
                </p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Table */}
      <Card>
        <CardHeader>
          <CardTitle>KPI Definitions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>KPI Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Formula</TableHead>
                  <TableHead className="text-center">Weight</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kpis.map((kpi) => (
                  <TableRow key={kpi.id}>
                    <TableCell>{kpi.name}</TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm text-gray-600 truncate">
                        {kpi.description}
                      </p>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {kpi.formula}
                      </code>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{kpi.weight}%</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{kpi.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge>{kpi.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(kpi)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(kpi.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}