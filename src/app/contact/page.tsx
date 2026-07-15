import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Inquiries | Le Mans AutoWorks",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact the Pit Wall"
        title="Make an Inquiry"
        description="Reach the right department directly — our team responds fast, every day of the week."
      />
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            {[
              { icon: Phone, title: "Call the Garage", text: "+1 (555) 240-1924" },
              { icon: Mail, title: "Email Us", text: "pitcrew@lemansautoworks.com" },
              { icon: MapPin, title: "Visit", text: "12 Circuit de la Sarthe Way, Motor District" },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-surface p-5">
                <Icon className="text-race-red" size={20} />
                <p className="mt-2 text-sm font-bold text-text">{title}</p>
                <p className="text-sm text-text-muted">{text}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2">
            <InquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
