import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Globe, 
  Mail, 
  Megaphone, 
  PenTool, 
  Search, 
  Share2, 
  Smartphone,
  Target,
  Zap
} from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-accent/10 via-background to-muted/20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Features & Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive digital marketing solutions designed to grow your business, 
            engage your audience, and drive measurable results across all channels.
          </p>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Core Marketing Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to establish a strong digital presence and connect with your target audience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Digital Advertising */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-1/10">
              <CardHeader>
                <div className="mb-4 h-12 w-12 bg-chart-1 rounded-lg flex items-center justify-center shadow-md">
                  <Megaphone className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Digital Advertising</CardTitle>
                <CardDescription>
                  Strategic paid advertising campaigns across Google, Facebook, Instagram, and other platforms.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• PPC Campaign Management</li>
                  <li>• Social Media Advertising</li>
                  <li>• Display & Retargeting Ads</li>
                  <li>• Campaign Optimization</li>
                </ul>
              </CardContent>
            </Card>

            {/* Search Engine Optimization */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-2/10">
              <CardHeader>
                <div className="mb-4 h-12 w-12 bg-chart-2 rounded-lg flex items-center justify-center shadow-md">
                  <Search className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Search Engine Optimization</CardTitle>
                <CardDescription>
                  Improve your organic search rankings and drive qualified traffic to your website.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Keyword Research & Strategy</li>
                  <li>• On-Page Optimization</li>
                  <li>• Technical SEO Audits</li>
                  <li>• Link Building Campaigns</li>
                </ul>
              </CardContent>
            </Card>

            {/* Content Marketing */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-3/10">
              <CardHeader>
                <div className="mb-4 h-12 w-12 bg-chart-3 rounded-lg flex items-center justify-center shadow-md">
                  <PenTool className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Content Marketing</CardTitle>
                <CardDescription>
                  Engaging content that tells your brand story and connects with your audience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Blog Writing & Strategy</li>
                  <li>• Video Content Creation</li>
                  <li>• Infographic Design</li>
                  <li>• Content Calendar Planning</li>
                </ul>
              </CardContent>
            </Card>

            {/* Social Media Management */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-4/10">
              <CardHeader>
                <div className="mb-4 h-12 w-12 bg-chart-4 rounded-lg flex items-center justify-center shadow-md">
                  <Share2 className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Social Media Management</CardTitle>
                <CardDescription>
                  Build and engage your community across all major social media platforms.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Social Media Strategy</li>
                  <li>• Content Creation & Posting</li>
                  <li>• Community Management</li>
                  <li>• Influencer Partnerships</li>
                </ul>
              </CardContent>
            </Card>

            {/* Email Marketing */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-5/10">
              <CardHeader>
                <div className="mb-4 h-12 w-12 bg-chart-5 rounded-lg flex items-center justify-center shadow-md">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Email Marketing</CardTitle>
                <CardDescription>
                  Nurture leads and maintain customer relationships with targeted email campaigns.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Email Campaign Design</li>
                  <li>• Automated Drip Sequences</li>
                  <li>• List Segmentation</li>
                  <li>• A/B Testing & Optimization</li>
                </ul>
              </CardContent>
            </Card>

            {/* Web Development */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-primary/10">
              <CardHeader>
                <div className="mb-4 h-12 w-12 bg-primary rounded-lg flex items-center justify-center shadow-md">
                  <Globe className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Web Development</CardTitle>
                <CardDescription>
                  Modern, responsive websites that convert visitors into customers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Responsive Web Design</li>
                  <li>• E-commerce Solutions</li>
                  <li>• Landing Page Creation</li>
                  <li>• Performance Optimization</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-secondary/10 to-accent/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Advanced Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge tools and techniques that give your business a competitive advantage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Analytics & Reporting */}
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-1/10">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 bg-chart-1 rounded-lg flex items-center justify-center shadow-md">
                  <BarChart3 className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Analytics & Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive performance tracking and detailed reporting to measure ROI and optimize campaigns.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Marketing Automation */}
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-2/10">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 bg-chart-2 rounded-lg flex items-center justify-center shadow-md">
                  <Zap className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Marketing Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Streamline your marketing processes with intelligent automation workflows and lead nurturing systems.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Audience Targeting */}
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-3/10">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 bg-chart-3 rounded-lg flex items-center justify-center shadow-md">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Audience Targeting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced audience segmentation and targeting to reach the right customers at the right time.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Mobile Optimization */}
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-4/10">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 bg-chart-4 rounded-lg flex items-center justify-center shadow-md">
                  <Smartphone className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Mobile Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Ensure your marketing campaigns perform perfectly across all mobile devices and platforms.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures consistent results and measurable growth for your business.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Discovery</h3>
              <p className="text-sm text-muted-foreground">
                We analyze your business, competitors, and target audience to develop a comprehensive strategy.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 bg-gradient-to-br from-chart-2 to-chart-3 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Strategy</h3>
              <p className="text-sm text-muted-foreground">
                We create a customized marketing plan tailored to your specific goals and budget.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 bg-gradient-to-br from-chart-3 to-chart-4 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Execution</h3>
              <p className="text-sm text-muted-foreground">
                Our team implements the strategy across all channels with precision and attention to detail.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 bg-gradient-to-br from-chart-4 to-chart-5 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-primary-foreground">4</span>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Optimization</h3>
              <p className="text-sm text-muted-foreground">
                We continuously monitor, analyze, and optimize campaigns to maximize your return on investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss which features and services will work best for your business goals.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}