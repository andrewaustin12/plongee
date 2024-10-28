'use client'

import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/ui/app-sidebar';
import { usePathname } from 'next/navigation';
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              {pathSegments.slice(1).map((segment, index) => (
                <BreadcrumbItem key={segment}>
                  {/* Move separator outside of the link structure */}
                  {index > 0 && <BreadcrumbSeparator />}
                  {index === pathSegments.length - 2 ? (
                    <BreadcrumbPage>
                      {segment.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={`/dashboard/${segment}`}>
                      {segment.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <Button variant="outline">Logout</Button>
          </div>
        </header>
        <div className="flex-1 overflow-auto">
          <main className="h-full w-full">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
