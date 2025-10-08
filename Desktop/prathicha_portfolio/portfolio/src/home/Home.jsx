// src/App.jsx
import React, { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowDown,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import profile from "../profile.jpg"; // add your profile image at src/profile.png

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedName, setTypedName] = useState("");
  const fullName = "Manikandan R";
  const title = "UI/UX Designer • Frontend Developer";

  // Typing effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedName(fullName.slice(0, index + 1));
      index++;
      if (index === fullName.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    "Home",
    "About",
    "Design",
    "Projects",
    "Skills",
    "Experience",
    "Contact",
  ];

  const skills = [
    "Figma",
    "User Research",
    "Prototyping",
    "Interaction Design",
    "React.js",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "Design Systems",
    "Accessibility",
    "Usability Testing",
    "mongoDB",
    "Express.js",
    "node.js",
    "Canva",
    "Bootstrap",
  ];

const projects = [
  {
    title: "E-Commerce Website",
    desc: "A full-stack modern shopping platform featuring smooth UI, cart management, user profiles, and live order tracking for both users and admins.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    live: "https://your-ecommerce-demo.vercel.app",
    github: "https://github.com/Manikandan0018/ecommerce-app",
  },
  {
    title: "Food Order Web App",
    desc: "A responsive food ordering app with restaurant listings, add-to-cart, and online payment — designed for a delightful user experience.",
    tech: ["React", "Express", "MongoDB", "Stripe", "Tailwind CSS"],
    live: "https://your-foodapp-demo.vercel.app",
    github: "https://github.com/Manikandan0018/food-order-app",
  },
  {
    title: "Trust Website",
    desc: "A social trust website with a clean interface showcasing donation details, team info, and a contact section — built for accessibility and emotion.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    live: "https://your-trust-website.vercel.app",
    github: "https://github.com/Manikandan0018/trust-website",
  },
  
];


  const figmaDesigns = [
    {
      title: "Movie Booking — Mobile Web",
      url: "https://www.figma.com/proto/SQgyfZSm2CXUAiJtquHjBB/Untitled?node-id=5-2&starting-point-node-id=5%3A2",
    },
    {
      title: "Juice Order — Mobile Web",
      url: "https://www.figma.com/proto/ZMmt9izeTYBXrmH1fPw7qI/Untitled?node-id=6-51",
    },
  ];

  // small framer variants
  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };
  const cardHover = { rest: { scale: 1 }, hover: { scale: 1.02 } };

  return (
    <div className="bg-gradient-to-b from-[#07060a] via-[#0b0211] to-[#120316] text-purple-200 min-h-screen font-sans overflow-x-hidden">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur border-b border-purple-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-black font-bold">
              MR
            </div>
            <div>
              <div className="text-sm font-semibold">Manikandan R</div>
              <div className="text-xs text-purple-300">
                UI/UX Designer • Frontend
              </div>
            </div>
          </div>

          <ul className="hidden md:flex gap-8 text-sm font-medium text-purple-100">
            {menuItems.map((it) => (
              <li key={it}>
                <a href={`#${it.toLowerCase()}`} className="relative group">
                  {it}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-pink-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>

          <div
            className="md:hidden text-2xl cursor-pointer text-purple-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* simple hamburger / close */}
            <div className="space-y-1">
              <div
                className={`h-0.5 w-6 bg-purple-200 transition-transform ${
                  menuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></div>
              <div
                className={`h-0.5 w-6 bg-purple-200 transition-all ${
                  menuOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`h-0.5 w-6 bg-purple-200 transition-transform ${
                  menuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-black/40 border-t border-purple-800 px-4 py-3">
            <ul className="flex flex-col gap-3 text-purple-200">
              {menuItems.map((it) => (
                <li key={it}>
                  <a
                    href={`#${it.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="block px-2 py-2 rounded hover:bg-purple-900/30"
                  >
                    {it}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* HERO */}
      <header id="home" className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-18 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm text-purple-300 mb-2">Hello — I’m</p>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
                {typedName}
              </span>
              <span className="block text-xl md:text-2xl text-purple-200 mt-3">
                {title}
              </span>
            </h1>

            <p className="mt-6 text-purple-200/90 max-w-xl leading-relaxed">
              I design human-centered interfaces and build interactive
              frontends. I blend research-led UX, pixel-perfect visual design in
              Figma, and production-grade React implementations to deliver
              delightful product experiences.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#design"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-md text-black font-semibold shadow"
              >
                Design Showcase
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 border border-purple-700 rounded-md text-purple-100 hover:bg-purple-900/40"
              >
                View Projects
              </a>
            </div>

            <div className="mt-6 flex items-center gap-5">
              <a
                href="https://github.com/Manikandan0018"
                className="text-2xl text-purple-200 hover:text-pink-300"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/manikandan110305/"
                className="text-2xl text-purple-200 hover:text-pink-300"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:Manikandan110305@gmail.com"
                className="text-2xl text-purple-200 hover:text-pink-300"
              >
                <FaEnvelope />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative flex justify-center md:justify-end">
              {/* Animated gradient background layers */}
              <div className="absolute -inset-2 md:-inset-4 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 opacity-70 blur-2xl animate-spin-slow"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-purple-500 to-pink-500 opacity-40 blur-3xl animate-pulse-slow"></div>
              </div>

              {/* Profile image with glowing ring */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 rounded-full border-[3px] border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.5)]"
              >
                <img
                  src={profile}
                  alt="Manikandan"
                  className="rounded-full object-cover
                 w-70 h-70 sm:w-80 sm:h-70 md:w-72 md:h-72 lg:w-96 lg:h-96
                 transition-all duration-500 ease-in-out hover:scale-105"
                />
              </motion.div>

              {/* Floating glowing particles */}
              <div className="absolute -top-10 right-10 w-16 h-16 bg-pink-500/40 blur-2xl rounded-full animate-float-slow"></div>
              <div className="absolute bottom-10 left-10 w-20 h-20 bg-blue-600/30 blur-2xl rounded-full animate-float-delay"></div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Design Showcase */}
      <section id="design" className="px-6 py-20 max-w-6xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          className="text-4xl font-bold text-white mb-8"
        >
          Design Showcase
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {figmaDesigns.map((d) => (
            <motion.div
              key={d.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="bg-[#0b0510] border border-purple-800 rounded-xl p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-purple-100">
                    {d.title}
                  </h3>
                  <p className="text-purple-300 mt-2 text-sm">
                    Mobile-first prototype — task flows, interactions, and
                    micro-interactions.
                  </p>
                </div>
                <div className="text-sm text-purple-400">Figma</div>
              </div>

              <div className="mt-4 flex gap-3">
                <a
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded text-black font-semibold"
                >
                  View Prototype
                </a>
                <button
                  onClick={() => {
                    // quick clipboard copy for the prototype link
                    navigator.clipboard?.writeText(d.url);
                    alert("Figma link copied to clipboard");
                  }}
                  className="px-4 py-2 border border-purple-700 rounded text-purple-200 hover:bg-purple-900/30"
                >
                  Copy Link
                </button>
              </div>

              <div className="mt-4 text-xs text-purple-300">
                Highlights: mobile booking flow, simplified checkout, visual
                affordances & microcopy improvements.
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-6 py-20 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8">Projects</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <motion.div
              key={p.title}
              className="bg-[#071019] border border-purple-800 rounded-xl p-5 h-full flex flex-col justify-between hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(168,85,247,0.7)",
              }}
            >
              <div>
                <h3 className="text-xl font-semibold text-purple-100">
                  {p.title}
                </h3>
                <p className="text-purple-300 mt-3 text-sm">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {p.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-purple-900/50 border border-purple-700 rounded-full text-purple-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex justify-between items-center mt-5 text-sm text-purple-400">
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                >
                  🔗 Live Demo
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 transition-all group-hover:w-full"></span>
                </a>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                >
                  💻 Code
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 transition-all group-hover:w-full"></span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="px-6 py-20 bg-gradient-to-b from-transparent to-[#070014]/20"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((s) => (
              <div
                key={s}
                className="px-4 py-2 rounded-full border border-purple-800 bg-[#070218]/60 text-purple-200 text-sm hover:scale-105 transition"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8">Experience</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#070317] border border-purple-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-purple-100">
              Frontend Web Development Intern — Next24 Tech
            </h3>
            <p className="text-purple-300 text-sm mt-2">Jun 2024 — Aug 2024</p>
            <ul className="mt-4 text-purple-300 list-disc list-inside text-sm">
              <li>
                Implemented responsive UI components and improved interaction
                flows using Tailwind + React.
              </li>
              <li>
                Collaborated with designers to convert Figma prototypes into
                production-ready interfaces.
              </li>
            </ul>
          </div>

          <div className="bg-[#070317] border border-purple-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-purple-100">
              Hackathon Team Leader — IIT Madras (24hr)
            </h3>
            <p className="text-purple-300 text-sm mt-2">
              Led a 4-member team to deliver a working MVP under tight time
              constraints.
            </p>
            <ul className="mt-4 text-purple-300 list-disc list-inside text-sm">
              <li>
                Coordinated design & dev tasks, implemented frontend & backend
                modules.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="px-6 py-20 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-6">Contact</h2>
        <p className="text-purple-300 mb-6">
          Open to UI/UX Designer, Product Designer, and Frontend Design
          opportunities.
        </p>

        <div className="bg-[#070016] border border-purple-800 rounded-xl p-8">
          <p className="text-purple-200 flex items-center justify-center gap-3">
            <FaEnvelope className="text-purple-300" />{" "}
            <a href="mailto:Manikandan110305@gmail.com" className="underline">
              Manikandan110305@gmail.com
            </a>
          </p>
          <p className="text-purple-200 flex items-center justify-center gap-3 mt-3">
            <FaPhoneAlt className="text-purple-300" /> +91 78269 20882
          </p>
          <p className="text-purple-200 flex items-center justify-center gap-3 mt-3">
            <FaMapMarkerAlt className="text-purple-300" /> Ariyalur, Tamil Nadu
          </p>

          <div className="mt-6 flex justify-center gap-6">
            <a
              href="https://github.com/Manikandan0018"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 border border-purple-700 rounded text-purple-200"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/manikandan110305/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 border border-purple-700 rounded text-purple-200"
            >
              LinkedIn
            </a>
            <a
              href="https://drive.google.com/uc?export=download&id=1HMUbSPeTCigyGjck7kqZeGFE1FyzlCUS"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded text-black font-semibold"
            >
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#04020a] border-t border-purple-900 text-center py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-purple-400">
          © {new Date().getFullYear()} Manikandan R • UI/UX Designer & Frontend
          Developer
        </div>
      </footer>

      {/* Small blob animation styles (Tailwind utility friendly) */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(8px, -10px) scale(1.05); }
          66% { transform: translate(-8px, 10px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 6s infinite ease-in-out;
        }
          @keyframes spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes pulse-slow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.1); }
}
@keyframes float-slow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
@keyframes float-delay {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(20px); }
}
.animate-spin-slow {
  animation: spin-slow 18s linear infinite;
}
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}
.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}
.animate-float-delay {
  animation: float-delay 10s ease-in-out infinite;
}

      `}</style>
    </div>
  );
}
