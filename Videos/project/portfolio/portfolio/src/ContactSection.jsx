import { useState } from "react";
import cImg from "./image/c-im.png";

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const subject = "Contact Request";
    const body = `From: ${email}\n\n${message}`;

    window.location.href = `mailto:manikandan110305@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="relative bg-white text-black min-h-screen overflow-hidden">
      {/* TOP TITLE */}
      <p className="barrio-regular text-center text-5xl sm:text-7xl md:text-8xl pt-10">
        Let’s Talk
      </p>

      <div className="max-w-7xl mx-auto px-6 md:px-20 mt-16 grid md:grid-cols-2 gap-14 items-center">
        {/* LEFT CONTENT */}
        <div className="z-10">
          <p className="text-sm max-w-sm mb-12 opacity-70">
            For collaborations, freelance work, or just to say hello — feel free
            to reach out.
          </p>

          <div className="space-y-10 max-w-md">
            <div>
              <label className="block text-xs uppercase mb-2 opacity-60">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-black py-3 outline-none bg-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase mb-2 opacity-60">
                Message
              </label>
              <textarea
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border-b border-black py-3 outline-none resize-none bg-transparent"
                placeholder="Your message..."
              />
            </div>

            <button
              onClick={handleSend}
              className="uppercase tracking-wide font-semibold flex items-center gap-3"
            >
              Send
              <span className="transition-transform group-hover:translate-x-2">
                →
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE + TEXT */}
        <div className="relative w-full h-[380px] sm:h-[480px] md:h-[650px] overflow-hidden">
          {/* IMAGE */}
          <img
            src={cImg}
            alt="Model"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* OVERLAY TEXT (ALWAYS VISIBLE) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1
              className="
        bangers-regular
        font-bold
        tracking-tight
        rotate-90
        text-white
        mix-blend-difference

        text-[90px]
        sm:text-[80px]
        md:text-[120px]
        lg:text-[160px]
      "
            >
              CONTACT&nbsp;ME
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
