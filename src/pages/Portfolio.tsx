import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { achievements, studentProfile } from "@/data/sampleData";
import { Trophy, Calendar, MapPin, Eye, FileText, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const categoryColors: Record<string, string> = {
  Sports: "bg-info/10 text-info border-info/20",
  Cultural: "bg-warning/10 text-warning border-warning/20",
  Technical: "bg-primary/10 text-primary border-primary/20",
  Academic: "bg-success/10 text-success border-success/20",
};

const Portfolio = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<typeof achievements[0] | null>(null);

  const approvedAchievements = achievements.filter(
    (a) => a.status === "approved" && a.studentName === studentProfile.name
  );

  const awards = approvedAchievements.filter(
    (a) => a.position === "Winner" || a.position === "1st Place" || a.position === "Gold Medal"
  ).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Student header */}
        <div className="rounded-2xl bg-card border shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
              <Award className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-card-foreground">
                {studentProfile.name} — Portfolio
              </h2>
              <p className="text-muted-foreground text-sm">
                {studentProfile.department} · {studentProfile.year}
              </p>
              <p className="text-muted-foreground text-sm">
                {approvedAchievements.length} approved achievements · {awards} awards
              </p>
            </div>
          </div>
        </div>

        {/* Portfolio grid */}
        {approvedAchievements.length === 0 ? (
          <p className="text-muted-foreground text-sm py-12 text-center">
            No approved achievements to display.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {approvedAchievements.map((a) => (
              <div
                key={a.id}
                className="group rounded-xl bg-card border p-5 shadow-sm transition-all hover:shadow-md"
              >
                {/* Certificate thumbnail placeholder */}
                <div className="aspect-[4/3] rounded-lg bg-muted flex items-center justify-center mb-4 overflow-hidden">
                  <FileText className="h-10 w-10 text-muted-foreground/40" />
                </div>

                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-card-foreground text-sm">{a.eventName}</h3>
                  <Badge variant="outline" className={`text-[10px] ${categoryColors[a.category]}`}>
                    {a.category}
                  </Badge>
                </div>

                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" />
                    <span>{a.level} Level</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Trophy className="h-3 w-3" />
                    <span className="font-medium text-accent">{a.position}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(a.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setSelectedAchievement(a)}
                >
                  <Eye className="h-3.5 w-3.5 mr-1.5" />
                  View Certificate
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Certificate dialog */}
        <Dialog open={!!selectedAchievement} onOpenChange={() => setSelectedAchievement(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedAchievement?.eventName} — Certificate</DialogTitle>
            </DialogHeader>
            <div className="aspect-[4/3] rounded-lg bg-muted flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Certificate preview placeholder</p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  Upload functionality available with backend integration
                </p>
              </div>
            </div>
            {selectedAchievement && (
              <div className="space-y-2 text-sm">
                <p><strong>Event:</strong> {selectedAchievement.eventName}</p>
                <p><strong>Level:</strong> {selectedAchievement.level}</p>
                <p><strong>Position:</strong> {selectedAchievement.position}</p>
                <p><strong>Date:</strong> {selectedAchievement.date}</p>
                <p><strong>Approved by:</strong> {selectedAchievement.approvedBy}</p>
              </div>
            )}
            <Button variant="outline" className="w-full">
              Download Certificate
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Portfolio;
