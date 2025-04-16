
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "En service", value: 18, color: "#059669" },
  { name: "En maintenance", value: 4, color: "#eab308" },
  { name: "Hors service", value: 2, color: "#dc2626" },
];

export function VehicleStatusChart() {
  return (
    <Card className="h-full border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Statut des véhicules</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [`${value} véhicules`, name]}
              contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
