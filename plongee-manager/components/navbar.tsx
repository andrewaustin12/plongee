"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">DiveManager</span>
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {features.map((feature) => (
                      <li key={feature.title}>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-4 hover:bg-blue-50 transition-colors"
                            href={feature.href}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{feature.icon}</span>
                              <span className="text-sm font-medium text-blue-600">{feature.title}</span>
                            </div>
                            <p className="text-sm leading-snug text-gray-600">
                              {feature.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {resources.map((resource) => (
                      <ListItem
                        key={resource.title}
                        title={resource.title}
                        href={resource.href}
                      >
                        {resource.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button>Start Free Trial</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// Helper Components
const ListItem = ({
  className = "",
  title,
  children,
  href,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
} & React.HTMLAttributes<HTMLAnchorElement>) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600 ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

// Navigation Data
const features = [
  {
    title: "Course Management",
    description: "Schedule classes, track certifications, and manage student progress.",
    href: "/features/courses",
    icon: "🎓"
  },
  {
    title: "Equipment Tracking",
    description: "Keep track of all your gear with smart inventory management.",
    href: "/features/equipment",
    icon: "🤿"
  },
  {
    title: "Business Analytics",
    description: "Make data-driven decisions with powerful insights.",
    href: "/features/analytics",
    icon: "📊"
  },
];

const resources = [
  {
    title: "Documentation",
    description: "Learn how to integrate and use our platform effectively.",
    href: "/docs"
  },
  {
    title: "Blog",
    description: "Read the latest news and tips about freediving management.",
    href: "/blog"
  },
  {
    title: "Support",
    description: "Get help from our support team and community.",
    href: "/support"
  },
  {
    title: "API Reference",
    description: "Detailed API documentation for developers.",
    href: "/api"
  },
]; 