import SlateMarketingHome from "@/components/home";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Target, TrendingUp, Users, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  // return (
  //   <div className="min-h-screen">
  //     {/* Hero Section */}
  //     <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/10 py-20 px-4">
  //       <div className="container mx-auto text-center">
  //         {/* Main logo */}
  //         <div className="mx-auto mb-6 flex items-center justify-center">
  //           <Image
  //             src="/logos/main/blue-slate-logo-v2-full.png"
  //             alt="Slate Marketing Logo"
  //             width={200}
  //             height={80}
  //             className="h-16 w-auto"
  //           />
  //         </div>
  //         <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
  //           Slate Marketing
  //         </h1>
  //         <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
  //           Elevate your brand with our comprehensive digital marketing
  //           solutions. We help businesses grow through strategic marketing
  //           campaigns and data-driven results.
  //         </p>
  //         <div className="flex flex-col sm:flex-row gap-4 justify-center">
  //           <Button size="lg" asChild>
  //             <Link href="/contact">
  //               Get Started <ArrowRight className="ml-2 h-4 w-4" />
  //             </Link>
  //           </Button>
  //           <Button size="lg" variant="outline" asChild>
  //             <Link href="/features">Learn More</Link>
  //           </Button>
  //         </div>
  //       </div>
  //     </section>

  //     {/* Features Overview Section */}
  //     <section className="py-20 px-4 bg-secondary/20">
  //       <div className="container mx-auto">
  //         <div className="text-center mb-16">
  //           <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
  //             Why Choose Slate Marketing?
  //           </h2>
  //           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
  //             We deliver results-driven marketing strategies that help your
  //             business stand out in today&apos;s competitive landscape.
  //           </p>
  //         </div>

  //         {/* Feature Cards Grid */}
  //         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  //           <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md bg-gradient-to-br from-card to-accent/5">
  //             <CardHeader>
  //               <div className="mx-auto mb-4 h-12 w-12 bg-chart-1 rounded-lg flex items-center justify-center shadow-md">
  //                 <Target className="h-6 w-6 text-primary-foreground" />
  //               </div>
  //               <CardTitle>Strategic Planning</CardTitle>
  //             </CardHeader>
  //             <CardContent>
  //               <CardDescription>
  //                 Comprehensive marketing strategies tailored to your business
  //                 goals and target audience.
  //               </CardDescription>
  //             </CardContent>
  //           </Card>

  //           <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md bg-gradient-to-br from-card to-accent/5">
  //             <CardHeader>
  //               <div className="mx-auto mb-4 h-12 w-12 bg-chart-2 rounded-lg flex items-center justify-center shadow-md">
  //                 <TrendingUp className="h-6 w-6 text-primary-foreground" />
  //               </div>
  //               <CardTitle>Growth Analytics</CardTitle>
  //             </CardHeader>
  //             <CardContent>
  //               <CardDescription>
  //                 Data-driven insights and performance tracking to optimize your
  //                 marketing ROI.
  //               </CardDescription>
  //             </CardContent>
  //           </Card>

  //           <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md bg-gradient-to-br from-card to-accent/5">
  //             <CardHeader>
  //               <div className="mx-auto mb-4 h-12 w-12 bg-chart-3 rounded-lg flex items-center justify-center shadow-md">
  //                 <Users className="h-6 w-6 text-primary-foreground" />
  //               </div>
  //               <CardTitle>Expert Team</CardTitle>
  //             </CardHeader>
  //             <CardContent>
  //               <CardDescription>
  //                 Experienced marketing professionals dedicated to your success
  //                 and growth.
  //               </CardDescription>
  //             </CardContent>
  //           </Card>

  //           <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md bg-gradient-to-br from-card to-accent/5">
  //             <CardHeader>
  //               <div className="mx-auto mb-4 h-12 w-12 bg-chart-4 rounded-lg flex items-center justify-center shadow-md">
  //                 <Zap className="h-6 w-6 text-primary-foreground" />
  //               </div>
  //               <CardTitle>Fast Results</CardTitle>
  //             </CardHeader>
  //             <CardContent>
  //               <CardDescription>
  //                 Quick implementation and rapid results to accelerate your
  //                 business growth.
  //               </CardDescription>
  //             </CardContent>
  //           </Card>
  //         </div>
  //       </div>
  //     </section>

  //     {/* Call to Action Section */}
  //     <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
  //       <div className="container mx-auto text-center">
  //         <h2 className="text-3xl md:text-4xl font-bold mb-4">
  //           Ready to Transform Your Marketing?
  //         </h2>
  //         <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
  //           Join hundreds of successful businesses that trust Slate Marketing to
  //           drive their growth.
  //         </p>
  //         <Button
  //           size="lg"
  //           variant="secondary"
  //           className="bg-primary-foreground text-primary hover:bg-accent hover:text-accent-foreground"
  //           asChild
  //         >
  //           <Link href="/contact">
  //             Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
  //           </Link>
  //         </Button>
  //       </div>
  //     </section>
  //   </div>
  // );
  return <SlateMarketingHome />;
}
