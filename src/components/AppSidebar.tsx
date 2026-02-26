import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  User,
  LogOut,
  GraduationCap,
  Briefcase,
  Trophy,
  BarChart3,
  Bell,
  Settings,
  Shield,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Add Achievement", url: "/add", icon: PlusCircle },
  { title: "Records Management", url: "/records", icon: FileText },
  { title: "Student Portfolio", url: "/portfolio", icon: Briefcase },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Faculty Dashboard", url: "/faculty", icon: Shield },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
            <GraduationCap className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-sidebar-primary-foreground">
              Achievement ERP
            </h2>
            <p className="text-xs text-sidebar-foreground/60">Management System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-sidebar-border">
        <div className="flex items-center justify-between px-3 mb-2">
          <span className="text-xs text-sidebar-foreground/50">Theme</span>
          <ThemeToggle />
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink
                to="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                activeClassName=""
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
