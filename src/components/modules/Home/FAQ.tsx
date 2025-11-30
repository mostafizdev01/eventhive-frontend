"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";


const faqs = [
  {
    question: "How do I join an event?",
    answer: "Simply browse our events, click on one that interests you, and hit the 'Join Event' button. You'll receive confirmation and all the details you need via email. Some events may require payment while others are free.",
  },
  {
    question: "Can I host my own events?",
    answer: "Absolutely! Click on 'Become a Host' to get started. You'll be able to create events, set pricing, manage attendees, and build your community. Our platform makes event hosting simple and rewarding.",
  },
  {
    question: "What if I need to cancel my event registration?",
    answer: "You can cancel your registration from your account dashboard. Refund policies vary by event and are set by the host. Free events can be cancelled anytime, while paid events may have specific cancellation windows.",
  },
  {
    question: "Is EventHive free to use?",
    answer: "Yes! Creating an account and browsing events is completely free. Some events may have an admission fee set by the host, but many events on our platform are free to attend.",
  },
  {
    question: "How do I become a verified host?",
    answer: "After hosting a few successful events and receiving positive reviews, you can apply for verified host status. This gives you a badge and helps build trust with potential attendees. The verification process typically takes 3-5 business days.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Got questions? We&apos;ve got answers!
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
