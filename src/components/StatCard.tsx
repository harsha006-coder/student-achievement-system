import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "primary" | "success" | "warning" | "info";
}

const variantStyles = {
  primary: "bg-primary/10 text-primary",
  success: "bg-accent/10 text-accent",
  warning: "bg-warning/10 text-warning",
  info: "bg-info/10 text-info",
};

export function StatCard({ title, value, icon: Icon, variant = "primary" }: StatCardProps) {
  return (
    <div className="rounded-xl bg-card p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-bold text-card-foreground">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${variantStyles[variant]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
