import { Search, Calendar, Users, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Events",
    description: "Explore thousands of events across various categories and interests",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Calendar,
    title: "Join Event",
    description: "Register for events that match your interests with just a click",
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    icon: Users,
    title: "Attend & Connect",
    description: "Meet like-minded people and create memorable experiences together",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Star,
    title: "Rate & Review",
    description: "Share your experience and help others discover amazing events",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in four simple steps and become part of our thriving community
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
            >
              {/* Connector Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-linear-to-r from-primary/50 to-transparent" />
              )}

              <div className="relative bg-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-border">
                {/* Step Number */}
                <div className={`absolute -top-4 -left-4 w-8 h-8 ${step.bgColor} ${step.color} rounded-full flex items-center justify-center font-bold text-sm shadow-lg`}>
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
