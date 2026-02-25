import { DashboardLayout } from "@/components/DashboardLayout";
import { AchievementCard } from "@/components/AchievementCard";
import { achievements, studentProfile } from "@/data/sampleData";
import { User, BookOpen, Trophy, Award } from "lucide-react";

const Profile = () => {
  const studentAchievements = achievements.filter(
    (a) => a.studentName === studentProfile.name
  );
  const awards = studentAchievements.filter(
    (a) => a.position === "Winner" || a.position === "1st Place"
  ).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-2xl bg-card border shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-card-foreground">
                {studentProfile.name}
              </h2>
              <p className="text-muted-foreground text-sm">
                {studentProfile.department} · {studentProfile.year}
              </p>
              <p className="text-muted-foreground text-sm">
                {studentProfile.rollNo} · {studentProfile.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center rounded-xl bg-background p-4">
              <BookOpen className="mx-auto h-5 w-5 text-info mb-1" />
              <p className="text-2xl font-bold text-foreground">{studentAchievements.length}</p>
              <p className="text-xs text-muted-foreground">Participations</p>
            </div>
            <div className="text-center rounded-xl bg-background p-4">
              <Trophy className="mx-auto h-5 w-5 text-warning mb-1" />
              <p className="text-2xl font-bold text-foreground">{awards}</p>
              <p className="text-xs text-muted-foreground">Awards</p>
            </div>
            <div className="text-center rounded-xl bg-background p-4">
              <Award className="mx-auto h-5 w-5 text-accent mb-1" />
              <p className="text-2xl font-bold text-foreground">{studentAchievements.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Achievement Portfolio
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {studentAchievements.map((a) => (
              <AchievementCard key={a.id} achievement={a} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
