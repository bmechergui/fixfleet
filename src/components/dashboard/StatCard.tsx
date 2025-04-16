
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color: "blue" | "green" | "red" | "orange" | "yellow";
}

const colorClasses = {
  blue: "bg-blue-50 text-fleet-blue",
  green: "bg-green-50 text-fleet-green",
  red: "bg-red-50 text-fleet-red",
  orange: "bg-orange-50 text-fleet-orange",
  yellow: "bg-yellow-50 text-fleet-yellow",
};

export function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {trend && (
              <div className="flex items-center mt-1">
                <span className={trend.isPositive ? "text-fleet-green" : "text-fleet-red"}>
                  {trend.isPositive ? "+" : "-"}{trend.value}
                </span>
                <span className="text-xs ml-1 text-muted-foreground">du mois préc.</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon size={24} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
