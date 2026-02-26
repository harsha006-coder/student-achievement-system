import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { currentUser, studentProfile } from "@/data/sampleData";
import { User, Bell, Shield, Palette, Database, Mail, Lock, Save, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: "+91 9876543210",
    department: "Administration",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    achievementAlerts: true,
    weeklyDigest: false,
    approvalNotifications: true,
    rejectionNotifications: true,
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    sessionTimeout: "30",
  });

  const [appearance, setAppearance] = useState({
    theme: "light",
    compactMode: false,
    showAnimations: true,
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Preferences Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: "Security Settings Saved",
      description: "Your security settings have been updated.",
    });
  };

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance Settings Saved",
      description: "Your appearance settings have been updated.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Data</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your personal information and profile picture
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                        {profile.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{profile.name}</h4>
                    <p className="text-sm text-muted-foreground capitalize">{currentUser.role}</p>
                    <Badge variant="outline" className="mt-2 bg-primary/10 text-primary border-primary/20">
                      {currentUser.role}
                    </Badge>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={profile.department}
                      onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveProfile} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Email Notifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-card-foreground">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-card-foreground">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Achievement Updates</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-card-foreground">Achievement Alerts</p>
                        <p className="text-sm text-muted-foreground">Get notified about new achievements</p>
                      </div>
                      <Switch
                        checked={notifications.achievementAlerts}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, achievementAlerts: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-card-foreground">Approval Notifications</p>
                        <p className="text-sm text-muted-foreground">Notify when achievements are approved</p>
                      </div>
                      <Switch
                        checked={notifications.approvalNotifications}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, approvalNotifications: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-card-foreground">Rejection Notifications</p>
                        <p className="text-sm text-muted-foreground">Notify when achievements are rejected</p>
                      </div>
                      <Switch
                        checked={notifications.rejectionNotifications}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, rejectionNotifications: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-card-foreground">Weekly Digest</p>
                        <p className="text-sm text-muted-foreground">Receive a weekly summary of activities</p>
                      </div>
                      <Switch
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveNotifications} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Password</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="currentPassword" type="password" className="pl-10" placeholder="••••••••" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="newPassword" type="password" className="pl-10" placeholder="••••••••" />
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Update Password</Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-card-foreground">Enable 2FA</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={security.twoFactorEnabled}
                      onCheckedChange={(checked) => setSecurity({ ...security, twoFactorEnabled: checked })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Session Settings</h4>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      className="max-w-[200px]"
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                    />
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after inactivity
                    </p>
                  </div>
                </div>

                <Button onClick={handleSaveSecurity} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how the application looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Theme</h4>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div
                      className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                        appearance.theme === "light" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                      onClick={() => setAppearance({ ...appearance, theme: "light" })}
                    >
                      <div className="h-20 rounded-lg bg-white border mb-2" />
                      <p className="text-center font-medium text-card-foreground">Light</p>
                    </div>
                    <div
                      className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                        appearance.theme === "dark" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                      onClick={() => setAppearance({ ...appearance, theme: "dark" })}
                    >
                      <div className="h-20 rounded-lg bg-slate-900 border border-slate-700 mb-2" />
                      <p className="text-center font-medium text-card-foreground">Dark</p>
                    </div>
                    <div
                      className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                        appearance.theme === "system" ? "border-primary bg-primary/5" : "border-border"
                      }`}
                      onClick={() => setAppearance({ ...appearance, theme: "system" })}
                    >
                      <div className="h-20 rounded-lg bg-gradient-to-r from-white to-slate-900 border mb-2" />
                      <p className="text-center font-medium text-card-foreground">System</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-card-foreground">Compact Mode</p>
                      <p className="text-sm text-muted-foreground">Use smaller spacing and font sizes</p>
                    </div>
                    <Switch
                      checked={appearance.compactMode}
                      onCheckedChange={(checked) => setAppearance({ ...appearance, compactMode: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-card-foreground">Show Animations</p>
                      <p className="text-sm text-muted-foreground">Enable UI animations and transitions</p>
                    </div>
                    <Switch
                      checked={appearance.showAnimations}
                      onCheckedChange={(checked) => setAppearance({ ...appearance, showAnimations: checked })}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveAppearance} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Appearance
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Export, import, or manage your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Export Data</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Button variant="outline" className="gap-2">
                      <Database className="h-4 w-4" />
                      Export as JSON
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Database className="h-4 w-4" />
                      Export as CSV
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Import Data</h4>
                  <div className="rounded-xl border-2 border-dashed border-border p-8 text-center">
                    <Database className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      JSON or CSV files up to 10MB
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Danger Zone</h4>
                  <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                    <p className="font-medium text-destructive">Delete Account</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Permanently delete your account and all associated data
                    </p>
                    <Button variant="destructive" className="mt-4">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
