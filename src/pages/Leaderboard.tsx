import { DashboardLayout } from "@/components/DashboardLayout";
import { achievements } from "@/data/sampleData";
import { Trophy, Medal, Crown, TrendingUp, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Calculate student rankings based on achievements and positions
const getStudentStats = () => {
  const studentMap = new Map<string, { name: string; department: string; points: number; achievements: number; awards: number }>();
  
  achievements.filter(a => a.status === "approved").forEach(achievement => {
    const existing = studentMap.get(achievement.studentName) || {
      name: achievement.studentName,
      department: achievement.department,
      points: 0,
      achievements: 0,
      awards: 0
    };
    
    existing.achievements += 1;
    
    // Points calculation based on position and level
    let positionPoints = 0;
    const pos = achievement.position.toLowerCase();
    if (pos.includes("winner") || pos.includes("1st") || pos.includes("gold")) positionPoints = 10;
    else if (pos.includes("2nd") || pos.includes("silver")) positionPoints = 7;
    else if (pos.includes("3rd") || pos.includes("bronze")) positionPoints = 5;
    else if (pos.includes("finalist") || pos.includes("runner")) positionPoints = 3;
    else positionPoints = 1;
    
    // Level multiplier
    const levelMultiplier: Record<string, number> = {
      "College": 1,
      "District": 1.5,
      "State": 2,
      "National": 3,
      "International": 5
    };
    
    existing.points += positionPoints * (levelMultiplier[achievement.level] || 1);
    
    if (pos.includes("winner") || pos.includes("1st") || pos.includes("gold") || pos.includes("2nd") || pos.includes("silver")) {
      existing.awards += 1;
    }
    
    studentMap.set(achievement.studentName, existing);
  });
  
  return Array.from(studentMap.values()).sort((a, b) => b.points - a.points);
};

const categoryIcons: Record<string, string> = {
  Sports: "🏆",
  Cultural: "🎭",
  Technical: "💻",
  Academic: "📚",
};

const Leaderboard = () => {
  const studentStats = getStudentStats();
  const topThree = studentStats.slice(0, 3);
  const rest = studentStats.slice(3);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Leaderboard</h2>
          <p className="text-sm text-muted-foreground">
            Top performing students based on achievements and positions
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Second Place */}
          <div className="rounded-2xl bg-card border shadow-sm p-6 flex flex-col items-center order-2 lg:order-1">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-slate-300">
                <AvatarFallback className="bg-slate-200 text-slate-600 text-xl">
                  {topThree[1]?.name.split(" ").map(n => n[0]).join("") || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-300">
                <Medal className="h-5 w-5 text-slate-400" />
              </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-card-foreground">{topThree[1]?.name || "N/A"}</h3>
            <p className="text-sm text-muted-foreground">{topThree[1]?.department}</p>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Award className="h-4 w-4 text-warning" />
                {topThree[1]?.awards || 0}
              </span>
              <span className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-primary" />
                {topThree[1]?.achievements || 0}
              </span>
            </div>
            <div className="mt-3 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
              {topThree[1]?.points || 0} pts
            </div>
            <div className="w-full mt-6 h-24 bg-gradient-to-t from-slate-200 to-transparent rounded-t-lg flex items-end justify-center pb-2">
              <span className="text-3xl font-bold text-slate-400">2nd</span>
            </div>
          </div>

          {/* First Place */}
          <div className="rounded-2xl bg-card border shadow-sm p-6 flex flex-col items-center order-1 lg:order-2 relative">
            <div className="absolute -top-3">
              <Crown className="h-8 w-8 text-warning" />
            </div>
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-yellow-400">
                <AvatarFallback className="bg-yellow-100 text-yellow-700 text-2xl">
                  {topThree[0]?.name.split(" ").map(n => n[0]).join("") || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
                <Crown className="h-5 w-5 text-yellow-900" />
              </div>
            </div>
            <h3 className="mt-4 text-xl font-bold text-card-foreground">{topThree[0]?.name || "N/A"}</h3>
            <p className="text-sm text-muted-foreground">{topThree[0]?.department}</p>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Award className="h-4 w-4 text-warning" />
                {topThree[0]?.awards || 0}
              </span>
              <span className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-primary" />
                {topThree[0]?.achievements || 0}
              </span>
            </div>
            <div className="mt-3 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
              {topThree[0]?.points || 0} pts
            </div>
            <div className="w-full mt-6 h-32 bg-gradient-to-t from-yellow-200 to-transparent rounded-t-lg flex items-end justify-center pb-2">
              <span className="text-4xl font-bold text-yellow-500">1st</span>
            </div>
          </div>

          {/* Third Place */}
          <div className="rounded-2xl bg-card border shadow-sm p-6 flex flex-col items-center order-3">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-orange-300">
                <AvatarFallback className="bg-orange-100 text-orange-600 text-xl">
                  {topThree[2]?.name.split(" ").map(n => n[0]).join("") || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-orange-300">
                <Medal className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-card-foreground">{topThree[2]?.name || "N/A"}</h3>
            <p className="text-sm text-muted-foreground">{topThree[2]?.department}</p>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Award className="h-4 w-4 text-warning" />
                {topThree[2]?.awards || 0}
              </span>
              <span className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-primary" />
                {topThree[2]?.achievements || 0}
              </span>
            </div>
            <div className="mt-3 px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 font-semibold">
              {topThree[2]?.points || 0} pts
            </div>
            <div className="w-full mt-6 h-20 bg-gradient-to-t from-orange-200 to-transparent rounded-t-lg flex items-end justify-center pb-2">
              <span className="text-3xl font-bold text-orange-400">3rd</span>
            </div>
          </div>
        </div>

        {/* Rankings Table */}
        <div className="rounded-xl bg-card border shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              All Rankings
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Rank</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Student</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Department</th>
                  <th className="text-center p-4 text-sm font-medium text-muted-foreground">Achievements</th>
                  <th className="text-center p-4 text-sm font-medium text-muted-foreground">Awards</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Points</th>
                </tr>
              </thead>
              <tbody>
                {rest.map((student, index) => (
                  <tr key={student.name} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                        {index + 4}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {student.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-card-foreground">{student.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{student.department}</td>
                    <td className="p-4 text-center">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {student.achievements}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                        {student.awards}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-bold text-card-foreground">{student.points}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Sports", "Cultural", "Technical", "Academic"].map((category) => {
            const categoryAchievements = achievements.filter(
              (a) => a.status === "approved" && a.category === category
            );
            const topStudent = studentStats.find((s) =>
              categoryAchievements.some((a) => a.studentName === s.name)
            );

            return (
              <div key={category} className="rounded-xl bg-card border shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{categoryIcons[category]}</span>
                  <h4 className="font-semibold text-card-foreground">{category}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {categoryAchievements.length} achievements
                </p>
                {topStudent && (
                  <p className="text-sm mt-2">
                    <span className="text-muted-foreground">Top: </span>
                    <span className="font-medium text-card-foreground">{topStudent.name}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Leaderboard;
