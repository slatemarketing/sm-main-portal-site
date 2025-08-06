import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Heart, Lightbulb, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-accent/10 via-background to-secondary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Who We Are
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            At Slate Marketing, we&apos;re passionate about helping businesses succeed through innovative digital marketing strategies. 
            Our team of experts combines creativity with data-driven insights to deliver exceptional results.
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-6">
                Founded with a vision to transform how businesses connect with their audiences, 
                Slate Marketing has grown from a small startup to a trusted partner for companies 
                of all sizes. We believe that every business has a unique story to tell, and we&apos;re 
                here to help you tell it effectively.
              </p>
              <p className="text-muted-foreground mb-6">
                Our journey began when we noticed a gap in the market for personalized, 
                results-driven marketing solutions. Today, we&apos;ve helped hundreds of businesses 
                achieve their marketing goals and build lasting relationships with their customers.
              </p>
              <Button asChild>
                <Link href="/contact">Work With Us</Link>
              </Button>
            </div>
            
            {/* Company image placeholder */}
            <div className="bg-gradient-to-br from-muted to-accent/5 rounded-lg h-96 flex items-center justify-center shadow-lg">
              <div className="text-muted-foreground text-center">
                <div className="h-24 w-24 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                  <Image
                    src="/logos/tab/slate-tab-blue-v1.png"
                    alt="Slate Marketing"
                    width={48}
                    height={48}
                    className="h-12 w-12"
                  />
                </div>
                <p className="font-medium">Company Image Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-secondary/10 to-accent/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape how we work with our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Innovation */}
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-1/5">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 bg-chart-1 rounded-lg flex items-center justify-center shadow-md">
                  <Lightbulb className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We stay ahead of industry trends and continuously explore new technologies 
                  to deliver cutting-edge marketing solutions.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Integrity */}
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-2/5">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 bg-chart-2 rounded-lg flex items-center justify-center shadow-md">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Transparency and honesty are at the core of our relationships. 
                  We provide clear reporting and always act in our clients&apos; best interests.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Excellence */}
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-3/5">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 bg-chart-3 rounded-lg flex items-center justify-center shadow-md">
                  <Award className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We strive for perfection in every campaign, constantly optimizing 
                  and refining our strategies to deliver exceptional results.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Partnership */}
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-4/5">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 bg-chart-4 rounded-lg flex items-center justify-center shadow-md">
                  <Heart className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Partnership</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We view our clients as partners, not just customers. 
                  Your success is our success, and we&apos;re committed to your long-term growth.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our diverse team of marketing professionals brings together years of experience 
              and a passion for helping businesses succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member Placeholders */}
            {[1, 2, 3].map((member) => (
              <Card key={member} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-accent/5">
                <CardHeader>
                  <div className="mx-auto mb-4 h-24 w-24 bg-gradient-to-br from-chart-5 to-primary rounded-full flex items-center justify-center shadow-lg">
                    <Image
                      src="/logos/tab/slate-tab-blue-v1.png"
                      alt="Team Member"
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full"
                    />
                  </div>
                  <CardTitle>Team Member {member}</CardTitle>
                  <CardDescription>Marketing Specialist</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Placeholder for team member bio and expertise description.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent to-secondary text-accent-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help your business achieve its marketing goals.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}