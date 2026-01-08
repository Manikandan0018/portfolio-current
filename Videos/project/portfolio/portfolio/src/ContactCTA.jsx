import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaDownload,
} from "react-icons/fa";

export default function ContactCTA() {
  return (
    <section className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* BACKGROUND OVERLAY */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* CONTENT */}
      <div className="relative z-20 max-w-6xl px-6 md:px-12 text-center">
        {/* HEADLINE */}
        <h1 className="text-4xl  sm:text-6xl md:text-8xl font-light tracking-tight">
          READY FOR YOUR
        </h1>
        <h2 className="text-4xl barrio-regular sm:text-6xl md:text-8xl font-bold mt-2">
          NEXT PROJECT?
        </h2>

        <p className="mt-6 text-sm opacity-70">
          Let’s connect and build something impactful.
        </p>

        {/* ICON LINKS */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 text-xl">
          <a
            href="https://www.linkedin.com/in/manikandan110305/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/Manikandan0018/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            <FaGithub />
          </a>

          <a
            href="mailto:manikandan110305@gmail.com"
            className="hover:text-gray-400 transition"
          >
            <FaEnvelope />
          </a>

          <a
            href="tel:+917826920882"
            className="hover:text-gray-400 transition"
          >
            <FaPhoneAlt />
          </a>
        </div>

        {/* ACTION BUTTON */}
        <div className="mt-14">
          <a
            href="https://drive.google.com/uc?id=1gsShXK806dVA6qCTCI-PIcIzDILVz9q5&export=download"
            download
            className="
              inline-flex items-center gap-3
              border border-white
              px-8 py-3
              uppercase tracking-wide text-sm
              hover:bg-white hover:text-black
              transition
            "
          >
            <FaDownload />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
