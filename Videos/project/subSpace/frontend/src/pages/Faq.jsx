import { useState, useRef } from "react";
import gsap from "gsap";

const faqs = [
  {
    q: "What is Clueso?",
    a: "Clueso is an AI-powered platform that converts raw screen recordings into polished product videos and step-by-step documentation within minutes.",
  },
  {
    q: "How does Clueso keep my data secure?",
    a: "All uploaded videos are securely processed and stored using industry-standard encryption and access control mechanisms.",
  },
  {
    q: "What export formats does Clueso support?",
    a: "You can export videos, transcripts, summaries, and documentation in multiple formats suitable for sharing and publishing.",
  },
  {
    q: "Can I collaborate with my team on Clueso?",
    a: "Yes, Clueso allows teams to collaborate by sharing videos, insights, and documentation within the workspace.",
  },
  {
    q: "Can I try Clueso before purchasing?",
    a: "Yes, you can start with a free trial to explore Clueso’s core features before upgrading.",
  },
  {
    q: "What kind of support do you offer?",
    a: "We provide documentation, tutorials, and responsive customer support to help you succeed.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  const refs = useRef([]);

  const toggle = (i) => {
    if (open === i) {
      gsap.to(refs.current[i], { height: 0, duration: 0.3 });
      setOpen(null);
    } else {
      refs.current.forEach((el, idx) => {
        if (el && idx !== i) gsap.to(el, { height: 0, duration: 0.2 });
      });
      gsap.to(refs.current[i], { height: "auto", duration: 0.4 });
      setOpen(i);
    }
  };

  return (
    <section className="px-6 md:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
      
      <div>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Frequently
          <br />
          Asked
          <br />
          Questions
        </h2>
      </div>

      
      <div className="space-y-6">
        {faqs.map((item, i) => (
          <div key={i} className="border-b pb-4">
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center text-left text-lg font-medium"
            >
              <span>{item.q}</span>
              <span className="text-pink-500 text-2xl">
                {open === i ? "−" : "+"}
              </span>
            </button>

            <div
              ref={(el) => (refs.current[i] = el)}
              className="overflow-hidden h-0"
            >
              <p className="mt-4 text-gray-600">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
