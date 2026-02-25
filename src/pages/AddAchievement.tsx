import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

const AddAchievement = () => {
  const [studentName, setStudentName] = useState("");
  const [eventName, setEventName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [position, setPosition] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Achievement Submitted",
      description: `"${eventName}" has been submitted for review. Status: Pending.`,
    });
    setStudentName("");
    setEventName("");
    setCategory("");
    setLevel("");
    setPosition("");
    setDate("");
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold text-foreground">Add Achievement</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Submit a new achievement for faculty review
        </p>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-card border shadow-sm p-6 space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="studentName">Student Name</Label>
            <Input id="studentName" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. Rahul Sharma" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventName">Event Name</Label>
            <Input id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="e.g. Cricket Tournament" required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Academic">Academic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Level</Label>
              <Select value={level} onValueChange={setLevel} required>
                <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="College">College</SelectItem>
                  <SelectItem value="District">District</SelectItem>
                  <SelectItem value="State">State</SelectItem>
                  <SelectItem value="National">National</SelectItem>
                  <SelectItem value="International">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="position">Position / Award</Label>
              <Input id="position" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="e.g. Winner" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Certificate (optional)</Label>
            <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border p-8 text-center cursor-pointer hover:border-primary/40 transition-colors">
              <div>
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  PDF, PNG, JPG up to 5MB
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full sm:w-auto">
            Submit for Review
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddAchievement;
