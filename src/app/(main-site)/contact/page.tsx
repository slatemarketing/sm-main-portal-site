"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone, Clock } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  // Basic form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert('Thank you for your message! We&apos;ll get back to you soon.')
    setFormData({ name: '', email: '', company: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-accent/10 via-background to-muted/20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your marketing? Let&apos;s discuss how we can help your business 
            achieve its goals. Get in touch with our team today.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Company Field */}
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Tell us about your project and how we can help..."
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  We&apos;re here to help you succeed. Choose the best way to reach us.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Email */}
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-1/10">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 bg-chart-1 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                        <Mail className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">Email Us</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Send us an email and we&apos;ll respond within 24 hours.
                        </p>
                        <p className="text-primary font-medium">hello@slatemarketing.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phone */}
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-2/10">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 bg-chart-2 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                        <Phone className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">Call Us</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Speak directly with our marketing experts.
                        </p>
                        <p className="text-primary font-medium">(555) 123-4567</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Office */}
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-3/10">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 bg-chart-3 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                        <MapPin className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">Visit Our Office</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Schedule a meeting at our headquarters.
                        </p>
                        <p className="text-primary font-medium">
                          123 Marketing Street<br />
                          Business District<br />
                          City, State 12345
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-4/10">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 bg-chart-4 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                        <Clock className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">Business Hours</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          We&apos;re available during these hours.
                        </p>
                        <div className="text-primary font-medium text-sm space-y-1">
                          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                          <p>Saturday: 10:00 AM - 4:00 PM</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-secondary/10 to-accent/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about our services and process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-1/5">
              <CardHeader>
                <CardTitle className="text-lg">How quickly can you start my project?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We can typically begin working on your project within 1-2 weeks of our initial consultation, 
                  depending on the scope and complexity of your needs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-2/5">
              <CardHeader>
                <CardTitle className="text-lg">What&apos;s included in your pricing?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our pricing includes strategy development, campaign implementation, ongoing optimization, 
                  and detailed monthly reporting. No hidden fees or surprise charges.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-3/5">
              <CardHeader>
                <CardTitle className="text-lg">Do you work with small businesses?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Absolutely! We work with businesses of all sizes, from startups to enterprise companies. 
                  Our strategies are tailored to fit your budget and goals.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-chart-4/5">
              <CardHeader>
                <CardTitle className="text-lg">How do you measure success?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We track key performance indicators that align with your business goals, including ROI, 
                  lead generation, website traffic, and conversion rates.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}