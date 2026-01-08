import "./App.css";
import profile from "./image/profile-1.png"
import { projects } from "./data/projectsData.js";
import ProjectCard from "./ProjectCard.jsx";
import SkillsSection from "./SkillsSection.jsx";
import ContactSection from "./ContactSection.jsx";
import ContactCTA from "./ContactCTA.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-display">
      {/* NAV */}
      <header className="flex justify-between items-center px-6 md:px-12 py-6">
        <div className="flex items-center gap-2 font-semibold text-sm md:text-base">
          <div className="bg-white rounded-r-full w-8 h-3"></div>
          <span>MANIKANDAN</span>
        </div>

        <nav className="hidden md:flex gap-10 text-sm opacity-90">
          <a href="#work" className="hover:opacity-70">
            Work
          </a>
          <a href="#skills" className="hover:opacity-70">
            Skills
          </a>
          <a href="#contact" className="hover:opacity-70">
            Contact
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="px-6 md:px-12 pt-6 md:pt-10">
        <h1
          className="nosifer-regular leading-none tracking-tight 
                       text-[40px] sm:text-[55px] md:text-[95px]"
        >
          AI FULLSTACK DEVELOPER
        </h1>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 mt-6 text-sm max-w-5xl">
          <p className="barrio-regular opacity-80">
            I’m an AI Full-Stack Developer building intelligent, scalable web
            applications by combining modern frontend engineering with robust
            backend systems and AI-powered integrations.
          </p>

          <p className="barrio-regular opacity-80">
            I focus on crafting high-performance user experiences, designing
            clean APIs, and integrating machine learning capabilities to turn
            complex ideas into reliable, production-ready solutions.
          </p>
        </div>

        <div className="mt-6 text-left md:text-right pr-0 md:pr-6">
          <a
            href="mailto:manikandan110305@gmail.com"
            className="underline text-sm tracking-wide"
          >
            GET IN TOUCH →
          </a>
        </div>
      </section>

      {/* GRID SECTION */}
      <section className="bg-[#0b0b0b]">
        <div className="relative bg-[#efe9e3] text-black rounded-t-[70px] overflow-hidden">
          {/* GRID */}
          <div
            className="
    absolute inset-0 pointer-events-none
    grid
    grid-cols-4 grid-rows-8
    sm:grid-cols-6 sm:grid-rows-8
    md:grid-cols-8 md:grid-rows-6
    opacity-20 md:opacity-40
  "
          >
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-black/30" />
            ))}
          </div>

          {/* PROFILE IMAGE */}
          <div className="absolute top-14 inset-0 flex items-center justify-center z-20">
            <img
              src={profile}
              className="w-[200px] sm:w-[260px] md:w-[340px] rounded-t-full object-cover"
              alt=""
            />
          </div>

          {/* CONTENT + TAGS */}
          <div className="relative h-100 flex flex-col md:flex-row items-center justify-center py-16 md:py-28">
            {/* LEFT TAGS */}
            <div className="hidden md:block absolute left-16 top-16">
              <div className="bg-teal-300 px-6 py-6 rounded-full font-bold text-xs text-center w-40 h-40 flex items-center justify-center">
                Product Engineering
              </div>
            </div>

            <div className="hidden md:block absolute left-12 top-1/2 -translate-y-1/2 rotate-[-4deg]">
              <div className="bg-yellow-300 px-6 py-3 font-bold text-sm rounded-md">
                AI-First Development
              </div>
            </div>

            <div className="hidden md:block absolute left-32 bottom-12 rotate-[5deg]">
              <div className="bg-orange-400 px-6 py-3 font-bold text-sm rounded-md">
                Interaction Design
              </div>
            </div>

            {/* RIGHT TAGS */}
            <div className="hidden md:block absolute right-20 top-20 rotate-[4deg]">
              <div className="bg-pink-400 px-6 py-3 font-bold text-sm rounded-md">
                Full-Stack Systems
              </div>
            </div>

            <div className="hidden md:block absolute right-24 bottom-24 rotate-[-6deg]">
              <div className="bg-sky-300 px-6 py-3 font-bold text-sm rounded-md">
                Machine Learning Apps
              </div>
            </div>

            <div className="hidden md:block absolute right-36 bottom-6">
              <div className="bg-lime-300 px-6 py-3 font-bold rounded-full text-xs">
                Scalable Systems
              </div>
            </div>

            {/* MOBILE TAGS */}
            <div className="flex flex-col gap-3 mt-72 md:hidden text-xs font-bold z-30 px-6 w-full max-w-xs text-center">
              <div className="bg-teal-300 px-4 py-2 rounded-full">
                AI-Powered Apps
              </div>
              <div className="bg-pink-400 px-4 py-2 rounded-full">
                MERN Development
              </div>
              <div className="bg-yellow-300 px-4 py-2 rounded-full">
                Full-Stack Engineering
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="bg-black text-white py-20 px-6 md:px-16">
        <h2 className="lg:text-8xl sm:text-4xl bangers-regular tracking-tight mb-12 text-center">
          Projects
        </h2>

        <div className="grid gap-14">
          <ProjectCard />
        </div>
      </section>

      <section id="skills">
        <SkillsSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <section id="cta">
        <ContactCTA />
      </section>
    </div>
  );
}