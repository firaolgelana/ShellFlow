import Link from "next/link"
import {
    Mail,
    CheckCircle,
    Users,
    MessageCircle,
    Eye,
    Smartphone,
    ArrowRight,
    Github,
    Twitter,
    MessageSquare,
} from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Card } from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"

export function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-lg">✓</span>
                        </div>
                        <span className="font-bold text-xl text-foreground">ShellFlow</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-foreground/70 hover:text-foreground transition">
                            Features
                        </a>
                        <a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition">
                            How It Works
                        </a>
                        <a href="#testimonials" className="text-foreground/70 hover:text-foreground transition">
                            Testimonials
                        </a>
                        <a href="#contact" className="text-foreground/70 hover:text-foreground transition">
                            Contact
                        </a>
                    </div>
                    <Link href="/sign-in">
                        <Button className="bg-primary hover:bg-primary/90">Sign In</Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
                                Organize Your Day. Share Your Progress.
                            </h1>
                            <p className="text-xl text-foreground/70 text-balance">
                                ShellFlow helps you schedule your daily routines, manage weekly tasks, and stay motivated through
                                social interaction.
                            </p>
                        </div>
                        <div className="flex gap-4 flex-wrap">
                            <Link href="/sign-in">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="border-border hover:bg-secondary bg-transparent">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 h-96 flex items-center justify-center">
                            <div className="text-center space-y-4">
                                <div className="flex justify-center gap-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-12 h-12 rounded-full bg-primary/20 animate-pulse"
                                            style={{ animationDelay: `${i * 0.2}s` }}
                                        />
                                    ))}
                                </div>
                                <p className="text-foreground/50 text-sm">Productivity & Scheduling Illustration</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-card border-t border-border py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Powerful Features</h2>
                        <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
                            Everything you need to organize, share, and stay motivated
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <CheckCircle className="w-6 h-6" />,
                                title: "Daily Shells",
                                description: "Order and prioritize today's tasks with intuitive drag-and-drop organization",
                            },
                            {
                                icon: <Users className="w-6 h-6" />,
                                title: "Weekly Scheduling",
                                description: "Plan ahead for the entire week or create custom-day schedules",
                            },
                            {
                                icon: <Eye className="w-6 h-6" />,
                                title: "Social Interaction",
                                description: "Follow friends, view their daily shells, and stay connected",
                            },
                            {
                                icon: <MessageCircle className="w-6 h-6" />,
                                title: "Real-time Chat",
                                description: "Message friends or groups instantly and collaborate seamlessly",
                            },
                            {
                                icon: <Users className="w-6 h-6" />,
                                title: "Profiles & Visibility",
                                description: "Share your task lists publicly or keep them private",
                            },
                            {
                                icon: <Smartphone className="w-6 h-6" />,
                                title: "Cross-platform Sync",
                                description: "Access your shells anywhere, anytime across all devices",
                            },
                        ].map((feature, idx) => (
                            <Card
                                key={idx}
                                className="p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 border border-border bg-background"
                            >
                                <div className="text-primary mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                                <p className="text-foreground/60">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground">How It Works</h2>
                    <p className="text-xl text-foreground/60">Four simple steps to get started</p>
                </div>
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        { step: "01", title: "Create Your Shell", description: "Start with your daily tasks and organize them" },
                        { step: "02", title: "Organize & Prioritize", description: "Arrange tasks by importance and schedule" },
                        { step: "03", title: "Share or Keep Private", description: "Choose who sees your progress" },
                        { step: "04", title: "Chat & Stay Motivated", description: "Connect with friends and celebrate wins" },
                    ].map((item, idx) => (
                        <div key={idx} className="relative">
                            <div className="bg-secondary/50 rounded-xl p-8 text-center space-y-4 h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-4xl font-bold text-primary mb-2">{item.step}</div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                                    <p className="text-foreground/60">{item.description}</p>
                                </div>
                            </div>
                            {idx < 3 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                    <ArrowRight className="w-6 h-6 text-primary/30" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="bg-card border-t border-border py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground">What Users Say</h2>
                        <p className="text-xl text-foreground/60">Join thousands who've transformed their productivity</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Sarah Chen",
                                role: "Designer",
                                content:
                                    "ShellFlow completely changed how I manage my daily work. The social features keep me accountable!",
                            },
                            {
                                name: "Marcus Rodriguez",
                                role: "Product Manager",
                                content:
                                    "The weekly scheduling is intuitive and the real-time chat makes team coordination effortless.",
                            },
                            {
                                name: "Alex Thompson",
                                role: "Developer",
                                content:
                                    "Love how clean and minimal the UI is. It's refreshing to use an app that's both powerful and simple.",
                            },
                        ].map((testimonial, idx) => (
                            <Card key={idx} className="p-8 border border-border bg-background hover:shadow-lg transition-all">
                                <p className="text-foreground/80 mb-6 italic">"{testimonial.content}"</p>
                                <div>
                                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                                    <p className="text-foreground/60 text-sm">{testimonial.role}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
                            <p className="text-foreground/60">Have questions? We'd love to hear from you.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-foreground">Email</p>
                                    <a href="mailto:support@shellflow.app" className="text-primary hover:underline">
                                        support@shellflow.app
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <MessageSquare className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-foreground">Follow Us</p>
                                    <div className="flex gap-4 mt-2">
                                        <a href="#" className="text-foreground/60 hover:text-primary transition">
                                            <Github className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="text-foreground/60 hover:text-primary transition">
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="text-foreground/60 hover:text-primary transition">
                                            <MessageSquare className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Card className="p-8 border border-border bg-background">
                        <form className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-foreground block mb-2">Name</label>
                                <Input placeholder="Your name" className="bg-input border-border" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                                <Input type="email" placeholder="you@example.com" className="bg-input border-border" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-foreground block mb-2">Message</label>
                                <textarea
                                    placeholder="Your message"
                                    className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                    rows={4}
                                />
                            </div>
                            <Button className="w-full bg-primary hover:bg-primary/90">Send Message</Button>
                        </form>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border bg-card">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-lg">✓</span>
                            </div>
                            <span className="font-bold text-foreground">ShellFlow</span>
                        </div>
                        <div className="flex gap-6 justify-center text-sm text-foreground/60">
                            <a href="#" className="hover:text-foreground transition">
                                About
                            </a>
                            <a href="#features" className="hover:text-foreground transition">
                                Features
                            </a>
                            <a href="#" className="hover:text-foreground transition">
                                Privacy Policy
                            </a>
                        </div>
                        <div className="flex gap-6 justify-end text-sm text-foreground/60">
                            <a href="#" className="hover:text-foreground transition">
                                Terms
                            </a>
                            <a href="#contact" className="hover:text-foreground transition">
                                Contact
                            </a>
                        </div>
                    </div>
                    <div className="border-t border-border pt-8 text-center text-sm text-foreground/50">
                        <p>© 2025 ShellFlow. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
