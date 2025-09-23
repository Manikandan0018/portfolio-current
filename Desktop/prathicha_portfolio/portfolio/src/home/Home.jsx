// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowDown,
  FaMapMarkerAlt,
} from "react-icons/fa";
import profile from "../profile.png"; // replace with actual profile image

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedName, setTypedName] = useState("");
  const fullName = "Prathicshaa Ravi";
  const title = "Software Development Engineer (SDE)";

  // Typing effect for name
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedName(fullName.slice(0, index + 1));
      index++;
      if (index === fullName.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    "Home",
    "About",
    "Projects",
    "Skills",
    "Experience",
    "Education",
    "Contact",
  ];

  const skills = [
    "Python",
    "Java",
    "C++",
    "Spring Boot",
    "Flask",
    "MySQL",
    "SQLite",
    "JavaScript",
    "HTML/CSS",
    "Git & GitHub",
    "Team Leadership",
    "Problem-Solving",
    "Hackathons",
    "Communication",
  ];

  const projects = [
    {
      title: "Word-to-GIF for Sign Language",
      desc: "Sign language recognition system bridging communication gaps between deaf and hearing individuals. Real-time detection with hand gestures, facial expressions, and body movements.",
      tech: ["Python", "Tkinter", "Machine Learning"],
    },
    {
      title: "Cognisphere – AI Automation Platform",
      desc: "Cloud-based platform enabling SMBs to automate workflows like lead follow-up, invoice generation, and task tracking, reducing manual tasks and boosting efficiency.",
      tech: ["Java", "Cloud"],
    },
    {
      title: "Student Management System",
      desc: "Secure desktop application handling student records, fees, and attendance with CRUD operations and role-based authentication.",
      tech: ["MySQL", "Desktop Application"],
    },
  ];

  return (
    <div className="bg-black text-green-400 min-h-screen font-sans scroll-smooth overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-green-700 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-sm font-medium">
            {menuItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="relative group transition duration-300"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Icon */}
          <div
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaArrowDown /> : <FaArrowDown />}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-black border-t border-green-700 px-4 py-2 animate-fade-down">
            <ul className="flex flex-col space-y-4 text-green-300 font-medium">
              {menuItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="block hover:text-green-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-15"
      >
        <div className="max-w-xl text-center md:text-left">
          <p className="text-lg text-gray-400">Hi, I'm</p>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            <span className="text-green-500">{typedName}</span>
            <span className="block text-green-400 text-2xl md:text-3xl mt-2">
              {title}
            </span>
          </h1>
          <p className="text-green-300 mb-6">
            Results-driven B.Tech CSE student with hands-on experience in
            Python, Java, C++, and full-stack development. Skilled in Spring
            Boot, Flask, MySQL, and SQLite. Hackathon Team Leader at IIT Madras
            delivering MVPs in 24 hours.
          </p>
          <div className="flex justify-center md:justify-start gap-4 mb-6">
            <a
              href="#projects"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="border border-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600"
            >
              Contact Me
            </a>
          </div>
          <div className="flex gap-4 justify-center md:justify-start">
            <a
              href="https://github.com/Manikandan0018"
              className="text-xl hover:text-green-400"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/prathicshaa-ravi-21295b2a3/"
              className="text-xl hover:text-green-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:prathicshaaravi@gmail.com"
              className="text-xl hover:text-green-400"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
        <div className="relative mt-10 md:mt-0 md:ml-20 flex justify-center">
          <div className="absolute -inset-2 rounded-full bg-green-500 opacity-30 animate-pulse blur-xl z-0" />
          <img
            src={profile}
            alt="Profile"
            className="relative z-10 rounded-full shadow-lg w-64 md:w-96 lg:w-[28rem]"
          />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-6 py-20 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-green-500 mb-12 flex justify-center animate-pulse tracking-wider">
          Projects
        </h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="w-full bg-[#0f172a] border border-green-700 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform"
            >
              {/* <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover border-b border-green-700"
              /> */}
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-green-400 mb-2">
                  {project.title}
                </h3>
                <p className="text-green-200 mb-3">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[#1e293b] text-green-300 text-sm px-2 py-1 rounded border border-green-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-6 py-20 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-500 mb-12 animate-pulse tracking-wider">
          Skills & Tools
        </h2>
        <div className="flex flex-wrap justify-center gap-4 text-green-300">
          {skills.map((skill) => (
            <div
              key={skill}
              className="px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full border border-green-600 hover:bg-green-700 hover:text-white transition duration-300 shadow shadow-green-500/20"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="px-6 py-20 max-w-6xl mx-auto text-white"
      >
        <h2 className="text-4xl font-bold text-green-500 mb-12 text-center tracking-wide animate-pulse">
          Experience
        </h2>
        <div className="relative bg-black/60 backdrop-blur-md border border-green-700 p-8 rounded-xl shadow-lg hover:shadow-[0_0_25px_#22c55e] transition-shadow duration-300 group">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="text-2xl font-semibold text-green-400 group-hover:text-green-300 transition">
              Hackathon Team Leader
            </h3>
            <span className="text-sm text-green-200 opacity-80">
              IIT Madras — <span className="italic">24hr Hackathon</span>
            </span>
          </div>
          <p className="mt-4 text-green-300 leading-relaxed tracking-wide">
            Led a 4-member team to deliver a working MVP in 24 hours.
            Coordinated tasks, implemented backend and frontend modules, and
            ensured timely delivery under pressure.
          </p>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="px-6 py-20 max-w-6xl mx-auto text-white"
      >
        <h2 className="text-4xl font-bold text-green-500 mb-12 text-center animate-pulse tracking-wide">
          Education
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-black/60 backdrop-blur-md border border-green-700 rounded-xl p-6 shadow-lg hover:shadow-[0_0_25px_#22c55e] transition-shadow duration-300 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-full text-black font-bold text-lg">
                🎓
              </div>
              <h3 className="text-lg font-semibold text-green-400 group-hover:text-green-300 transition">
                Kalasalingam Academy of Research and Education
              </h3>
            </div>
            <p className="text-green-300">
              B.Tech CSE (2022-2026) <br />
              CGPA: <span className="text-green-400 font-semibold">8.26</span>
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-black/60 backdrop-blur-md border border-green-700 rounded-xl p-6 shadow-lg hover:shadow-[0_0_25px_#22c55e] transition-shadow duration-300 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-full text-black font-bold text-lg">
                🎓
              </div>
              <h3 className="text-lg font-semibold text-green-400 group-hover:text-green-300 transition">
                Paavai Vidhyashram, Namakkal
              </h3>
            </div>
            <p className="text-green-300">
              HSLC (2020-2022) <br />
              Percentage:{" "}
              <span className="text-green-400 font-semibold">77.8%</span>
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-black/60 backdrop-blur-md border border-green-700 rounded-xl p-6 shadow-lg hover:shadow-[0_0_25px_#22c55e] transition-shadow duration-300 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-full text-black font-bold text-lg">
                🎓
              </div>
              <h3 className="text-lg font-semibold text-green-400 group-hover:text-green-300 transition">
                Sri Chaitanya International School, Bangalore
              </h3>
            </div>
            <p className="text-green-300">
              SSLC (2018-2020) <br />
              Percentage:{" "}
              <span className="text-green-400 font-semibold">85.2%</span>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="px-6 py-20 max-w-4xl mx-auto text-center text-white"
      >
        <h2 className="text-4xl font-bold text-green-500 mb-12 tracking-wide animate-pulse">
          Contact Me
        </h2>
        <div className="bg-black/60 backdrop-blur-md border border-green-700 rounded-xl p-8 shadow-lg hover:shadow-[0_0_25px_#22c55e] transition duration-300 space-y-6">
          <p className="text-green-300 flex justify-center items-center gap-3">
            <FaEnvelope className="text-green-400" />
            <a
              href="mailto:prathicshaaravi@gmail.com"
              className="underline hover:text-green-500 transition"
            >
              prathicshaaravi@gmail.com
            </a>
          </p>
          <p className="text-green-300 flex justify-center items-center gap-3">
            <FaPhoneAlt className="text-green-400" /> +91 70109 86554
          </p>
          <p className="text-green-300 flex justify-center items-center gap-3">
            <FaMapMarkerAlt className="text-green-400" /> Namakkal, Tamil Nadu
          </p>
          <div className="flex justify-center gap-8 text-2xl mt-4">
            <a
              href="https://github.com/Manikandan0018"
              target="_blank"
              rel="noreferrer"
              className="text-green-400 hover:text-green-500 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/prathicshaa-ravi-21295b2a3/"
              target="_blank"
              rel="noreferrer"
              className="text-green-400 hover:text-green-500 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/90 border-t border-green-700 text-white font-firacode relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12 relative z-10">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-green-500">
              Let's Build Something!
            </h3>
            <p className="text-green-300 leading-relaxed">
              Open to full-time SDE opportunities & freelance MERN projects.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-green-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-green-300">
              {[
                "home",
                "projects",
                "skills",
                "experience",
                "education",
                "contact",
              ].map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="hover:text-green-500 transition-all duration-300 hover:underline"
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-green-400 mb-4">
              Personal Info
            </h4>
            <ul className="text-green-300 space-y-1">
              <li>
                <span className="text-green-400">Name:</span> Prathicshaa Ravi
              </li>
              <li>
                <span className="text-green-400">Email:</span>{" "}
                prathicshaaravi@gmail.com
              </li>
              <li>
                <span className="text-green-400">Phone:</span> +91 70109 86554
              </li>
              <li>
                <span className="text-green-400">Location:</span> Namakkal,
                Tamil Nadu
              </li>
            </ul>
            <a
              href="/PrathicshaaRavi_CV.pdf"
              download
              className="inline-flex items-center gap-2 mt-5 text-green-300 hover:text-green-500 transition underline"
            >
              <FaArrowDown /> Download Resume
            </a>
          </div>
        </div>
        <div className="text-center text-green-700 text-sm border-t border-green-700 py-6 relative z-10">
          © {new Date().getFullYear()} Prathicshaa Ravi • Software Development
          Engineer (SDE)
        </div>
      </footer>
    </div>
  );
}
