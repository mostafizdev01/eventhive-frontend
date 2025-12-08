import { Search, Calendar, Users, Star } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    icon: Search,
    title: "Browse Events",
    description: "Explore thousands of events across various categories and interests",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/a97944a4-a4be-4721-9fd2-db515e0fd006/generated_images/modern-flat-illustration-of-a-person-bro-d34a7639-20251208072122.jpg",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Calendar,
    title: "Join Event",
    description: "Register for events that match your interests with just a click",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/a97944a4-a4be-4721-9fd2-db515e0fd006/generated_images/modern-flat-illustration-of-a-hand-click-9474936d-20251208072122.jpg",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Users,
    title: "Attend & Connect",
    description: "Meet like-minded people and create memorable experiences together",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/a97944a4-a4be-4721-9fd2-db515e0fd006/generated_images/modern-flat-illustration-of-diverse-grou-7d0cab32-20251208072123.jpg",
    color: "text-[#FF9500]",
    bgColor: "bg-[#FF9500]/10",
  },
  {
    icon: Star,
    title: "Rate & Review",
    description: "Share your experience and help others discover amazing events",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/a97944a4-a4be-4721-9fd2-db515e0fd006/generated_images/modern-flat-illustration-of-a-person-hol-f5f92de8-20251208072123.jpg",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-linear-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in four simple steps and become part of our thriving community
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
            >
              {/* Connector Line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-32 left-[60%] w-full h-0.5 bg-linear-to-r from-primary/30 via-primary/50 to-transparent z-0" />
              )}

              <div className="relative bg-card rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 border border-border overflow-hidden">
                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-linear-to-br from-primary to-[#FF9500] text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                  {index + 1}
                </div>

                {/* Image Container */}
                <div className="relative w-full aspect-square mb-6 rounded-2xl overflow-hidden bg-muted/50">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Icon Badge */}
                <div className={`inline-flex w-12 h-12 ${step.bgColor} rounded-xl items-center justify-center mb-3`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>

                {/* Decorative Element */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-primary/0 via-primary/50 to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Ready to get started?</p>
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl">
            Explore Events Now
          </button>
        </div>
      </div>
    </section>
  );
}