import { DashboardLayout } from "@/components/DashboardLayout";
import { achievements } from "@/data/sampleData";
import { Trophy, Users, TrendingUp, Calendar, Award, MapPin, BookOpen } from "lucide-react";
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
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const COLORS = ["hsl(210, 80%, 52%)", "hsl(38, 92%, 50%)", "hsl(234, 62%, 52%)", "hsl(152, 56%, 42%)"];
const STATUS_COLORS = {
  approved: "hsl(152, 56%, 42%)",
  pending: "hsl(38, 92%, 50%)",
  rejected: "hsl(0, 62%, 52%)",
};

const Analytics = () => {
  const total = achievements.length;
  const approved = achievements.filter(a => a.status === "approved").length;
  const pending = achievements.filter(a => a.status === "pending").length;
  const rejected = achievements.filter(a => a.status === "rejected").length;

  // Category distribution
  const categories = ["Sports", "Cultural", "Technical", "Academic"];
  const categoryData = categories.map(cat => ({
    name: cat,
    value: achievements.filter(a => a.category === cat && a.status === "approved").length,
  }));

  // Level distribution
  const levels = ["College", "District", "State", "National", "International"];
  const levelData = levels.map(level => ({
    name: level,
    count: achievements.filter(a => a.level === level && a.status === "approved").length,
  }));

  // Status distribution
  const statusData = [
    { name: "Approved", value: approved },
    { name: "Pending", value: pending },
    { name: "Rejected", value: rejected },
  ];

  // Monthly submissions (simulated)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyData = months.map((month, index) => ({
    month,
    submissions: Math.floor(Math.random() * 10) + 1,
    approved: Math.floor(Math.random() * 8) + 1,
  }));

  // Top departments
  const deptMap = new Map<string, number>();
  achievements.filter(a => a.status === "approved").forEach(a => {
    deptMap.set(a.department, (deptMap.get(a.department) || 0) + 1);
  });
  const deptData = Array.from(deptMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Top students
  const studentMap = new Map<string, number>();
  achievements.filter(a => a.status === "approved").forEach(a => {
    studentMap.set(a.studentName, (studentMap.get(a.studentName) || 0) + 1);
  });
  const topStudents = Array.from(studentMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Position distribution
  const positionTypes = ["Winner", "Runner-up", "Finalist", "Participant"];
  const positionData = positionTypes.map(type => ({
    name: type,
    count: achievements.filter(a => 
      a.status === "approved" && 
      (type === "Winner" ? a.position.toLowerCase().includes("winner") || a.position.includes("1st") || a.position.includes("Gold") :
       type === "Runner-up" ? a.position.toLowerCase().includes("runner") || a.position.includes("2nd") || a.position.includes("Silver") :
       type === "Finalist" ? a.position.toLowerCase().includes("finalist") :
       !a.position.toLowerCase().includes("winner") && !a.position.toLowerCase().includes("runner") && !a.position.toLowerCase().includes("finalist"))
    ).length,
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Detailed insights into student achievements
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-card border shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Submissions</p>
                <p className="text-2xl font-bold text-foreground">{total}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card border shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-success">{approved}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                <Award className="h-6 w-6 text-success" />
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card border shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">{pending}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
                <Calendar className="h-6 w-6 text-warning" />
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card border shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unique Students</p>
                <p className="text-2xl font-bold text-foreground">{studentMap.size}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info/10">
                <Users className="h-6 w-6 text-info" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Category Pie Chart */}
          <div className="rounded-xl bg-card border shadow-sm p-6">
            <h3 className="text-base font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Achievements by Category
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Status Pie Chart */}
          <div className="rounded-xl bg-card border shadow-sm p-6">
            <h3 className="text-base font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Submission Status
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={Object.values(STATUS_COLORS)[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Level Bar Chart */}
          <div className="rounded-xl bg-card border shadow-sm p-6">
            <h3 className="text-base font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Achievements by Level
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={levelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 88%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(234, 62%, 52%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Trend Area Chart */}
          <div className="rounded-xl bg-card border shadow-sm p-6">
            <h3 className="text-base font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Monthly Submissions Trend
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="submissions" stackId="1" stroke="hsl(210, 80%, 52%)" fill="hsl(210, 80%, 52%)" />
                <Area type="monotone" dataKey="approved" stackId="2" stroke="hsl(152, 56%, 42%)" fill="hsl(152, 56%, 42%)" />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 3 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Departments */}
          <div className="rounded-xl bg-card border shadow-sm p-6">
            <h3 className="text-base font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top Departments
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={deptData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 88%)" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={100} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(38, 92%, 50%)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Students */}
          <div className="rounded-xl bg-card border shadow-sm p-6">
            <h3 className="text-base font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Top Performing Students
            </h3>
            <div className="space-y-3">
              {topStudents.map((student, index) => (
                <div key={student.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      index === 0 ? "bg-yellow-100 text-yellow-700" :
                      index === 1 ? "bg-slate-100 text-slate-700" :
                      index === 2 ? "bg-orange-100 text-orange-700" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {index + 1}
                    </span>
                    <span className="font-medium text-card-foreground">{student.name}</span>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {student.count} achievements
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Position Distribution */}
        <div className="rounded-xl bg-card border shadow-sm p-6">
          <h3 className="text-base font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Achievement Positions
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={positionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 88%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(234, 62%, 52%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
