import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { achievements } from "@/data/sampleData";
import { Check, X, Eye, FileText, Clock, CheckCircle, XCircle, AlertCircle, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const FacultyDashboard = () => {
  const [submissions, setSubmissions] = useState(achievements);
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAchievement, setSelectedAchievement] = useState<typeof achievements[0] | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const pending = submissions.filter(s => s.status === "pending");
  const approved = submissions.filter(s => s.status === "approved");
  const rejected = submissions.filter(s => s.status === "rejected");

  const filteredSubmissions = submissions.filter(submission => {
    const matchesStatus = filter === "all" || submission.status === filter;
    const matchesCategory = categoryFilter === "all" || submission.category === categoryFilter;
    const matchesSearch = 
      submission.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.eventName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const handleApprove = (id: string) => {
    setSubmissions(submissions.map(s => 
      s.id === id ? { ...s, status: "approved" as const, approvedDate: new Date().toISOString().split("T")[0], approvedBy: "Admin" } : s
    ));
    toast({
      title: "Achievement Approved",
      description: "The achievement has been approved successfully.",
    });
    setShowDetails(false);
  };

  const handleReject = (id: string) => {
    setSubmissions(submissions.map(s => 
      s.id === id ? { ...s, status: "rejected" as const } : s
    ));
    toast({
      title: "Achievement Rejected",
      description: "The achievement has been rejected.",
    });
    setShowDetails(false);
  };

  const handleViewDetails = (achievement: typeof achievements[0]) => {
    setSelectedAchievement(achievement);
    setShowDetails(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-success/10 text-success border-success/20 gap-1"><CheckCircle className="h-3 w-3" /> Approved</Badge>;
      case "rejected":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20 gap-1"><XCircle className="h-3 w-3" /> Rejected</Badge>;
      default:
        return <Badge className="bg-warning/10 text-warning border-warning/20 gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Sports":
        return "bg-info/10 text-info border-info/20";
      case "Cultural":
        return "bg-warning/10 text-warning border-warning/20";
      case "Technical":
        return "bg-primary/10 text-primary border-primary/20";
      case "Academic":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Faculty Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Review and manage student achievement submissions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{submissions.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-warning">{pending.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-success">{approved.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">{rejected.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name or event..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
              <SelectItem value="Cultural">Cultural</SelectItem>
              <SelectItem value="Technical">Technical</SelectItem>
              <SelectItem value="Academic">Academic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submissions List */}
        <div className="rounded-xl bg-card border shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="font-semibold text-card-foreground">Achievement Submissions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Student</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Event</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Level</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Position</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-muted-foreground">
                      No submissions found
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="border-t hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-card-foreground">{submission.studentName}</p>
                          <p className="text-xs text-muted-foreground">{submission.department}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-card-foreground">{submission.eventName}</p>
                        <p className="text-xs text-muted-foreground">{submission.date}</p>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={getCategoryColor(submission.category)}>
                          {submission.category}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{submission.level}</td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-accent">{submission.position}</span>
                      </td>
                      <td className="p-4">{getStatusBadge(submission.status)}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewDetails(submission)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {submission.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-success hover:text-success"
                                onClick={() => handleApprove(submission.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleReject(submission.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Dialog */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Achievement Details</DialogTitle>
              <DialogDescription>
                Review the achievement submission details
              </DialogDescription>
            </DialogHeader>
            {selectedAchievement && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Student Name</p>
                    <p className="text-card-foreground">{selectedAchievement.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Department</p>
                    <p className="text-card-foreground">{selectedAchievement.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Event Name</p>
                    <p className="text-card-foreground">{selectedAchievement.eventName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Date</p>
                    <p className="text-card-foreground">{selectedAchievement.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Category</p>
                    <Badge variant="outline" className={getCategoryColor(selectedAchievement.category)}>
                      {selectedAchievement.category}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Level</p>
                    <p className="text-card-foreground">{selectedAchievement.level}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Position</p>
                    <p className="text-card-foreground font-medium">{selectedAchievement.position}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    {getStatusBadge(selectedAchievement.status)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Submitted Date</p>
                    <p className="text-card-foreground">{selectedAchievement.submittedDate}</p>
                  </div>
                  {selectedAchievement.approvedDate && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Approved Date</p>
                      <p className="text-card-foreground">{selectedAchievement.approvedDate}</p>
                    </div>
                  )}
                  {selectedAchievement.approvedBy && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Approved By</p>
                      <p className="text-card-foreground">{selectedAchievement.approvedBy}</p>
                    </div>
                  )}
                </div>

                {/* Certificate Preview */}
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Certificate</p>
                  {selectedAchievement.certificate ? (
                    <div className="aspect-[4/3] rounded bg-muted flex items-center justify-center">
                      <FileText className="h-10 w-10 text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] rounded bg-muted flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">No certificate uploaded</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            <DialogFooter>
              {selectedAchievement?.status === "pending" && (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => handleReject(selectedAchievement.id)}
                    className="gap-1"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => handleApprove(selectedAchievement.id)}
                    className="gap-1"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </Button>
                </>
              )}
              <Button variant="outline" onClick={() => setShowDetails(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;
