import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { currentUser } from "@/data/sampleData";
import { Badge } from "@/components/ui/badge";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b bg-card px-4 gap-4">
            <SidebarTrigger />
            <h1 className="text-sm font-semibold text-foreground">
              Student Achievement Management
            </h1>
            <div className="ml-auto flex items-center gap-3">
              <Badge variant="outline" className="capitalize bg-primary/10 text-primary border-primary/20">
                {currentUser.role}
              </Badge>
              <span className="text-sm text-muted-foreground">{currentUser.name}</span>
            </div>
          </header>
          <div className="flex-1 p-6 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
