import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { achievements } from "@/data/sampleData";
import { Bell, CheckCircle, XCircle, Clock, Info, Trash2, Check, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: "approval" | "rejection" | "submission" | "info";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  achievementId?: string;
}

const generateNotifications = (): Notification[] => {
  const notifications: Notification[] = [];

  achievements.forEach(achievement => {
    // Submission notification
    notifications.push({
      id: `submission-${achievement.id}`,
      type: "submission",
      title: "New Achievement Submitted",
      message: `${achievement.studentName} submitted "${achievement.eventName}" for ${achievement.category}`,
      timestamp: achievement.submittedDate,
      read: Math.random() > 0.5,
      achievementId: achievement.id,
    });

    // Approval/Rejection notification
    if (achievement.status === "approved" && achievement.approvedDate) {
      notifications.push({
        id: `approval-${achievement.id}`,
        type: "approval",
        title: "Achievement Approved",
        message: `"${achievement.eventName}" by ${achievement.studentName} has been approved by ${achievement.approvedBy}`,
        timestamp: achievement.approvedDate,
        read: Math.random() > 0.5,
        achievementId: achievement.id,
      });
    } else if (achievement.status === "rejected") {
      notifications.push({
        id: `rejection-${achievement.id}`,
        type: "rejection",
        title: "Achievement Rejected",
        message: `"${achievement.eventName}" by ${achievement.studentName} was not approved`,
        timestamp: achievement.submittedDate,
        read: Math.random() > 0.5,
        achievementId: achievement.id,
      });
    }
  });

  // Add some info notifications
  notifications.push({
    id: "info-1",
    type: "info",
    title: "System Update",
    message: "New features have been added to the achievement management system",
    timestamp: "2026-01-15",
    read: false,
  });

  notifications.push({
    id: "info-2",
    type: "info",
    title: "Reminder",
    message: "Don't forget to verify your achievements before the end of the semester",
    timestamp: "2026-01-10",
    read: true,
  });

  return notifications.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(generateNotifications());
  const [filter, setFilter] = useState<string>("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = filter === "all" 
    ? notifications 
    : filter === "unread" 
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter);

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "approval":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "rejection":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "submission":
        return <Clock className="h-5 w-5 text-warning" />;
      default:
        return <Info className="h-5 w-5 text-info" />;
    }
  };

  const getBadge = (type: Notification["type"]) => {
    switch (type) {
      case "approval":
        return <Badge className="bg-success/10 text-success border-success/20">Approved</Badge>;
      case "rejection":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Rejected</Badge>;
      case "submission":
        return <Badge className="bg-warning/10 text-warning border-warning/20">New</Badge>;
      default:
        return <Badge className="bg-info/10 text-info border-info/20">Info</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Bell className="h-6 w-6" />
              Notifications
            </h2>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "You're all caught up!"}
            </p>
          </div>
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all" className="gap-1">
              All
              <Badge variant="secondary" className="ml-1">{notifications.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="unread" className="gap-1">
              Unread
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-1">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="submission">Submissions</TabsTrigger>
            <TabsTrigger value="approval">Approvals</TabsTrigger>
            <TabsTrigger value="rejection">Rejections</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-0">
            <div className="rounded-xl bg-card border shadow-sm">
              <Tabs defaultValue="all" onValueChange={setFilter}>
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-auto">
                  <TabsTrigger value="all" className="rounded-t-lg data-[state=active]:bg-muted">All</TabsTrigger>
                  <TabsTrigger value="unread" className="rounded-t-lg data-[state=active]:bg-muted">Unread</TabsTrigger>
                  <TabsTrigger value="submission" className="rounded-t-lg data-[state=active]:bg-muted">Submissions</TabsTrigger>
                  <TabsTrigger value="approval" className="rounded-t-lg data-[state=active]:bg-muted">Approvals</TabsTrigger>
                  <TabsTrigger value="rejection" className="rounded-t-lg data-[state=active]:bg-muted">Rejections</TabsTrigger>
                </TabsList>
              </Tabs>

              <ScrollArea className="h-[calc(100vh-320px)]">
                <div className="divide-y">
                  {filteredNotifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Bell className="h-12 w-12 text-muted-foreground/30 mb-4" />
                      <p className="text-muted-foreground">No notifications</p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-muted/30 transition-colors ${
                          !notification.read ? "bg-muted/20" : ""
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="mt-1">{getIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-card-foreground">{notification.title}</h4>
                              {getBadge(notification.type)}
                              {!notification.read && (
                                <span className="h-2 w-2 rounded-full bg-primary" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                            <p className="text-xs text-muted-foreground/60 mt-2">
                              {new Date(notification.timestamp).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
