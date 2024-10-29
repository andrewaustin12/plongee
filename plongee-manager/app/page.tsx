"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Image from "next/image";
import { Play } from "lucide-react";
import { CheckIcon } from "@radix-ui/react-icons";
import Navbar from "@/components/navbar";

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<string>("professional");

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section - Ocean gradient background */}
      <section className="relative pt-32 pb-24 lg:pt-36 lg:pb-32 bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="max-w-3xl">
              <Badge className="mb-6 bg-blue-50 text-blue-700 hover:bg-blue-100" variant="secondary">
                Trusted by 500+ Freediving Centers Worldwide
              </Badge>
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl mb-6">
                Effortlessly Manage Your Freediving Center
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Automate inventory, streamline courses, and grow your freediving business with our all-in-one management platform
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="h-14 px-8 bg-blue-600 hover:bg-blue-700">
                  Start Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-8 border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Book a Demo
                </Button>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative lg:ml-auto">
              <div className="relative w-full">
                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/hero-image.jpg"
                    alt="Freediving Center Dashboard"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    priority
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/10 via-transparent to-transparent" />
                </div>

                {/* Bottom Right Floating Element */}
                <div className="absolute -right-6 -bottom-12 bg-white rounded-lg shadow-lg p-4 transform rotate-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                      <CheckIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Course Completed</p>
                      <p className="text-xs text-gray-500">Advanced Freediver</p>
                    </div>
                  </div>
                </div>

                {/* Middle Left Floating Element */}
                <div className="absolute -left-6 top-1/3 bg-white rounded-lg shadow-lg p-4 transform -rotate-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">🤿</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Equipment Ready</p>
                      <p className="text-xs text-gray-500">All gear maintained</p>
                    </div>
                  </div>
                </div>

                {/* Top Right Floating Element - New */}
                <div className="absolute -right-4 top-10 bg-white rounded-lg shadow-lg p-4 transform rotate-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">📊</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Revenue Up</p>
                      <p className="text-xs text-gray-500">+28% this month</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Left Floating Element - New */}
                <div className="absolute -left-8 -bottom-8 bg-white rounded-lg shadow-lg p-4 transform -rotate-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">🎯</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">New Booking</p>
                      <p className="text-xs text-gray-500">PADI Open Water</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - White */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-blue-50 text-blue-700 hover:bg-blue-100" variant="secondary">
              Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              Everything you need to run your center
            </h2>
            <p className="text-xl text-gray-600">Powerful tools designed specifically for freediving operations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Course Management",
                icon: "🎓",
                description: "Schedule classes, track certifications, and manage student progress effortlessly",
                features: ["Automated scheduling", "Digital certifications", "Progress tracking"]
              },
              {
                title: "Equipment Tracking",
                icon: "🤿",
                description: "Keep track of all your gear with our smart inventory management system",
                features: ["QR code scanning", "Maintenance alerts", "Rental management"]
              },
              {
                title: "Student Portal",
                icon: "👤",
                description: "Give your students a professional platform to track their journey",
                features: ["Personal profiles", "Course history", "Digital materials"]
              },
              {
                title: "Business Analytics",
                icon: "📊",
                description: "Make data-driven decisions with powerful insights",
                features: ["Revenue tracking", "Growth metrics", "Trend analysis"]
              },
              {
                title: "Automated Marketing",
                icon: "📱",
                description: "Grow your business with integrated marketing tools",
                features: ["Email campaigns", "SMS notifications", "Social media integration"]
              },
              {
                title: "Safety Management",
                icon: "🏥",
                description: "Ensure compliance and maintain safety standards",
                features: ["Safety checklists", "Incident reporting", "Equipment logs"]
              }
            ].map((feature, index) => (
              <div key={index} className="group relative bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100 hover:border-blue-200">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-500">
                      <CheckIcon className="w-4 h-4 mr-2 text-gray-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section - Ocean gradient */}
      <section className="py-24 bg-gradient-to-b from-cyan-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-blue-50 text-blue-700 hover:bg-blue-100" variant="secondary">
            Platform Demo
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
            See how it works
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Watch our 2-minute demo to see how our platform can transform your freediving center operations
          </p>
          <Button size="lg" className="h-14 px-8 bg-blue-600 hover:bg-blue-700">
            <Play className="w-5 h-5 mr-2" />
            Watch Demo
          </Button>
        </div>
      </section>

      {/* Pricing Section - White with ocean accents */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-50 text-blue-700 hover:bg-blue-100" variant="secondary">
              Pricing
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">Start free and scale as you grow</p>
          </div>

          <div className="mx-auto max-w-5xl">
            <Tabs defaultValue="monthly" className="relative z-10">
              <div className="flex justify-center mb-12">
                <TabsList className="bg-blue-50">
                  <TabsTrigger value="monthly" className="data-[state=active]:bg-white">
                    Monthly billing
                  </TabsTrigger>
                  <TabsTrigger value="yearly" className="data-[state=active]:bg-white">
                    Annual billing <span className="ml-2 text-sm text-teal-600 font-medium">Save 20%</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="monthly">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card 
                    className={`relative flex flex-col cursor-pointer ${selectedPlan === "starter" ? "border-blue-600 border-2" : ""}`}
                    onClick={() => setSelectedPlan("starter")}
                  >
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold">Starter</h3>
                          <Badge variant="secondary">Popular</Badge>
                        </div>
                        <div className="mt-4">
                          <span className="text-4xl font-bold">$49</span>
                          <span className="text-gray-600 ml-2">/month</span>
                        </div>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Perfect for small diving centers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-1">
                      <ul className="space-y-4 mb-8 flex-1">
                        {[
                          "Up to 50 active students",
                          "Basic course management",
                          "Equipment tracking",
                          "Student portal",
                          "Email support",
                          "Basic reporting"
                        ].map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckIcon className="w-5 h-5 mr-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full ${
                          selectedPlan === "starter"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`relative flex flex-col cursor-pointer ${selectedPlan === "professional" ? "border-blue-600 border-2" : ""}`}
                    onClick={() => setSelectedPlan("professional")}
                  >
                    {selectedPlan === "professional" && (
                      <div className="absolute top-0 right-0 -mt-2 -mr-2">
                        <Badge className="bg-blue-600">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold">Professional</h3>
                        </div>
                        <div className="mt-4">
                          <span className="text-4xl font-bold">$99</span>
                          <span className="text-gray-600 ml-2">/month</span>
                        </div>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        For growing diving centers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-1">
                      <ul className="space-y-4 mb-8 flex-1">
                        {[
                          "Up to 200 active students",
                          "Advanced course management",
                          "Equipment tracking & maintenance",
                          "Enhanced student portal",
                          "Priority support",
                          "Advanced analytics",
                          "Marketing tools",
                          "API access"
                        ].map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckIcon className="w-5 h-5 mr-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full ${
                          selectedPlan === "professional"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="yearly">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card 
                    className={`relative flex flex-col cursor-pointer ${selectedPlan === "starter" ? "border-blue-600 border-2" : ""}`}
                    onClick={() => setSelectedPlan("starter")}
                  >
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold">Starter</h3>
                          <Badge variant="secondary">Popular</Badge>
                        </div>
                        <div className="mt-4">
                          <span className="text-4xl font-bold">$470</span>
                          <span className="text-gray-600 ml-2">/year</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-sm text-gray-500 line-through">$588/year</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                            Save $118
                          </Badge>
                        </div>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Perfect for small diving centers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-1">
                      <ul className="space-y-4 mb-8 flex-1">
                        {[
                          "Up to 50 active students",
                          "Basic course management",
                          "Equipment tracking",
                          "Student portal",
                          "Email support",
                          "Basic reporting"
                        ].map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckIcon className="w-5 h-5 mr-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full ${
                          selectedPlan === "starter"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`relative flex flex-col cursor-pointer ${selectedPlan === "professional" ? "border-blue-600 border-2" : ""}`}
                    onClick={() => setSelectedPlan("professional")}
                  >
                    {selectedPlan === "professional" && (
                      <div className="absolute top-0 right-0 -mt-2 -mr-2">
                        <Badge className="bg-blue-600">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold">Professional</h3>
                        </div>
                        <div className="mt-4">
                          <span className="text-4xl font-bold">$950</span>
                          <span className="text-gray-600 ml-2">/year</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-sm text-gray-500 line-through">$1188/year</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                            Save $238
                          </Badge>
                        </div>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        For growing diving centers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-1">
                      <ul className="space-y-4 mb-8 flex-1">
                        {[
                          "Up to 200 active students",
                          "Advanced course management",
                          "Equipment tracking & maintenance",
                          "Enhanced student portal",
                          "Priority support",
                          "Advanced analytics",
                          "Marketing tools",
                          "API access"
                        ].map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckIcon className="w-5 h-5 mr-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full ${
                          selectedPlan === "professional"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Final CTA Banner - Deep ocean gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800 py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-cyan-900/50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to transform your freediving center?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
              Start your 14-day free trial today. No credit card required.
            </p>
            <div className="mt-10">
              <Button size="lg" className="h-14 px-8 bg-white text-blue-900 hover:bg-blue-50">
                Start Your Free Trial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Light ocean background */}
      <footer className="bg-blue-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Newsletter Section */}
            <div className="md:col-span-1">
              <h3 className="text-gray-900 font-semibold mb-4">Subscribe to our newsletter</h3>
              <form className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-lg bg-gray-50 px-4 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:border-gray-900"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
              </form>
            </div>

            {/* Navigation Links */}
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Support', 'Documentation']
              },
              {
                title: 'Company',
                links: ['About', 'Team', 'Careers', 'Contact']
              },
              {
                title: 'Resources',
                links: ['Blog', 'Newsletter', 'Events', 'Help Center']
              }
            ].map((category, index) => (
              <div key={index}>
                <h4 className="text-gray-900 font-semibold mb-4">{category.title}</h4>
                <ul className="space-y-3 text-gray-600">
                  {category.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="hover:text-gray-900 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8 text-sm text-gray-600">
            <div className="flex justify-between items-center">
              <p>© 2024 DiveManager Pro. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
