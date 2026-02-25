import { Trophy, Users, Award, Activity, Clock } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { achievements } from "@/data/sampleData";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CATEGORY_COLORS = ["hsl(210, 80%, 52%)", "hsl(38, 92%, 50%)", "hsl(234, 62%, 52%)", "hsl(152, 56%, 42%)"];

const Dashboard = () => {
  const totalAchievements = achievements.length;
  const approved = achievements.filter((a) => a.status === "approved");
  const awards = approved.filter(
    (a) => a.position === "Winner" || a.position === "1st Place" || a.position === "Gold Medal"
  ).length;
  const pending = achievements.filter((a) => a.status === "pending").length;

  // Pie chart data
  const categories = ["Sports", "Cultural", "Technical", "Academic"];
  const categoryData = categories.map((cat) => ({
    name: cat,
    value: achievements.filter((a) => a.category === cat).length,
  }));

  // Bar chart data
  const levels = ["College", "District", "State", "National", "International"];
  const levelData = levels.map((lv) => ({
    name: lv,
    count: achievements.filter((a) => a.level === lv).length,
  }));

  // Recent submissions & approvals
  const recentSubmissions = [...achievements]
    .sort((a, b) => b.submittedDate.localeCompare(a.submittedDate))
    .slice(0, 5);
  const recentApprovals = approved
    .sort((a, b) => (b.approvedDate || "").localeCompare(a.approvedDate || ""))
    .slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Overview of student achievements
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Achievements" value={totalAchievements} icon={Trophy} variant="primary" />
          <StatCard title="Awards Won" value={awards} icon={Award} variant="success" />
          <StatCard title="Participations" value={approved.length} icon={Users} variant="info" />
          <StatCard title="Pending Approvals" value={pending} icon={Clock} variant="warning" />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pie Chart */}
          <div className="rounded-xl bg-card border shadow-sm p-6">
            <h3 className="text-base font-semibold text-card-foreground mb-4">
              Achievement Categories
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="rounded-xl bg-card border shadow-sm p-6">
            <h3 className="text-base font-semibold text-card-foreground mb-4">
              Achievement Levels
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={levelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 88%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(234, 62%, 52%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent panels */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-card border shadow-sm p-6">
            <h3 className="text-base font-semibold text-card-foreground mb-4">
              Recent Submissions
            </h3>
            <div className="space-y-3">
              {recentSubmissions.map((a) => (
                <div key={a.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{a.eventName}</p>
                    <p className="text-xs text-muted-foreground">{a.studentName}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        a.status === "approved"
                          ? "bg-success/10 text-success border-success/20"
                          : a.status === "pending"
                          ? "bg-warning/10 text-warning border-warning/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }
                    >
                      {a.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{a.submittedDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-card border shadow-sm p-6">
            <h3 className="text-base font-semibold text-card-foreground mb-4">
              Recent Approvals
            </h3>
            <div className="space-y-3">
              {recentApprovals.map((a) => (
                <div key={a.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{a.eventName}</p>
                    <p className="text-xs text-muted-foreground">{a.studentName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Approved: {a.approvedDate}</p>
                    <p className="text-xs text-muted-foreground">By: {a.approvedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
