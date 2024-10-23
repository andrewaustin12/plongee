
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Dashboard </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Dashboard Cards */}
        {[
          { title: 'Upcoming Dives', value: '12', description: 'In the next 7 days' },
          { title: 'Equipment Status', value: '85%', description: 'Equipment available' },
          { title: 'Staff Schedule', value: '8', description: 'Staff on duty today' },
          { title: 'Recent Bookings', value: '24', description: 'In the last 30 days' },
        ].map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{card.value}</p>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {/* ... Recent activity content ... */}
        </CardContent>
      </Card>
    </div>
  );
}
