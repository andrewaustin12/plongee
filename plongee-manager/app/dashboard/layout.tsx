'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Overview' },
    { href: '/dashboard/customers', label: 'Customers' },
    { href: '/dashboard/bookings', label: 'Bookings' },
    { href: '/dashboard/equipment', label: 'Equipment' },
    { href: '/dashboard/staff', label: 'Staff' },
    { href: '/dashboard/settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6">
        <div className="text-2xl font-bold text-primary mb-6">DiveManager Pro</div>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={`block py-2 px-4 rounded transition-colors ${
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end mb-6">
            <Button variant="outline">Logout</Button>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
