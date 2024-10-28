import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Container, 
  UserCog,
  FileText,
  Settings
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items with icons
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Courses",
    url: "/dashboard/courses",
    icon: GraduationCap,
  },
  {
    title: "Equipment",
    url: "/dashboard/equipment",
    icon: Container,
  },
  {
    title: "Staff",
    url: "/dashboard/staff",
    icon: UserCog,
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={`transition-colors duration-200 ${
                      pathname === item.url 
                        ? 'bg-gray-100 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-800' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-900'
                    }`}
                  >
                    <Link href={item.url} className="group">
                      <item.icon className={`h-4 w-4 transition-colors duration-200 ${
                        pathname === item.url 
                          ? 'text-black dark:text-white' 
                          : 'text-muted-foreground group-hover:text-black dark:group-hover:text-white'
                      }`} />
                      <span className={`${
                        pathname === item.url 
                          ? 'font-medium text-black dark:text-white' 
                          : 'text-muted-foreground group-hover:text-black dark:group-hover:text-white'
                      }`}>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
