import { Achievement } from "@/data/sampleData";
import { Trophy, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categoryColors: Record<string, string> = {
  Sports: "bg-info/10 text-info border-info/20",
  Cultural: "bg-warning/10 text-warning border-warning/20",
  Technical: "bg-primary/10 text-primary border-primary/20",
  Academic: "bg-success/10 text-success border-success/20",
};

const levelColors: Record<string, string> = {
  College: "bg-muted text-muted-foreground",
  District: "bg-accent/10 text-accent",
  State: "bg-info/10 text-info",
  National: "bg-primary/10 text-primary",
  International: "bg-warning/10 text-warning",
};

const statusColors: Record<string, string> = {
  approved: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <div className="group rounded-xl bg-card border p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-card-foreground">{achievement.eventName}</h3>
        <Badge variant="outline" className={categoryColors[achievement.category]}>
          {achievement.category}
        </Badge>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{achievement.level} Level</span>
          <Badge variant="secondary" className={`ml-auto text-xs ${levelColors[achievement.level]}`}>
            {achievement.level}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Trophy className="h-3.5 w-3.5" />
          <span className="font-medium text-accent">{achievement.position}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{new Date(achievement.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t">
        <Badge variant="outline" className={`text-xs ${statusColors[achievement.status]}`}>
          {achievement.status}
        </Badge>
      </div>
    </div>
  );
}
