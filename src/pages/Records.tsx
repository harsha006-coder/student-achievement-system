import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { achievements as initialAchievements, Achievement } from "@/data/sampleData";
import { Input } from "@/components/ui/input";
import { Search, Check, X, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

const statusStyles: Record<string, string> = {
  approved: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

const Records = () => {
  const [records, setRecords] = useState<Achievement[]>(initialAchievements);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");

  const filtered = records.filter((a) => {
    const matchSearch =
      a.eventName.toLowerCase().includes(search.toLowerCase()) ||
      a.studentName.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All" || a.category === catFilter;
    const matchLevel = levelFilter === "All" || a.level === levelFilter;
    return matchSearch && matchCat && matchLevel;
  });

  const handleApprove = (id: string) => {
    setRecords((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: "approved" as const, approvedDate: new Date().toISOString().split("T")[0], approvedBy: "Admin User" }
          : a
      )
    );
    toast({ title: "Achievement Approved", description: "The record has been approved successfully." });
  };

  const handleReject = (id: string) => {
    setRecords((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "rejected" as const } : a))
    );
    toast({ title: "Achievement Rejected", description: "The record has been rejected." });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Records Management</h2>
          <p className="text-sm text-muted-foreground">
            Review, approve, or reject achievement submissions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by event or student..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={catFilter} onValueChange={setCatFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
              <SelectItem value="Cultural">Cultural</SelectItem>
              <SelectItem value="Technical">Technical</SelectItem>
              <SelectItem value="Academic">Academic</SelectItem>
            </SelectContent>
          </Select>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Levels</SelectItem>
              <SelectItem value="College">College</SelectItem>
              <SelectItem value="District">District</SelectItem>
              <SelectItem value="State">State</SelectItem>
              <SelectItem value="National">National</SelectItem>
              <SelectItem value="International">International</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-xl bg-card border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                      No records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-card-foreground">{a.studentName}</p>
                          <p className="text-xs text-muted-foreground">{a.department}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{a.eventName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{a.category}</Badge>
                      </TableCell>
                      <TableCell>{a.level}</TableCell>
                      <TableCell>{a.position}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusStyles[a.status]}>
                          {a.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {a.status === "pending" && (
                            <>
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-success hover:text-success hover:bg-success/10" onClick={() => handleApprove(a.id)}>
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleReject(a.id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Records;
