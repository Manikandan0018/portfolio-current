import { useState, useEffect } from "react";
import { projects } from "./data/projectsData.js";

export default function ProjectCard() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % projects.length);

  const prev = () =>
    setIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));

  const project = projects[index];

  // ------------- AUTO PLAY -------------
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 3000); 

    return () => clearInterval(interval);
  }, [index]); // re-runs cleanly

  return (
    <section className="bg-white text-black py-20 px-6 md:px-16">
      <div className="relative max-w-7xl mx-auto">
        {/* GRID LAYOUT */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* BIG IMAGE FRAME */}
          <div className="bg-gray-100 rounded-2xl shadow-lg flex items-center justify-center">
            <img
              src={project.big}
              className="w-full lg:h-[620px] h-[300px] sm:h-[420px] md:h-[520px] object-contain"
              alt=""
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-8">
            {/* TITLE ROW */}
            <div className="flex justify-between items-start">
              <h2 className="text-4xl anton-regular sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
                {project.title}
              </h2>
              <span className="text-gray-400 text-xl">{project.number}</span>
            </div>

            {/* YEAR + SMALL IMAGE */}
            <div className="flex flex-col gap-6">
              <h3 className="text-[60px] sm:text-[70px] leading-none font-light">
                {project.year}
              </h3>

              <div className="bg-gray-100 rounded-2xl shadow-lg flex items-center justify-center w-[220px] h-[260px] sm:w-[240px] sm:h-[280px] md:w-[260px] md:h-[300px]">
                <img
                  src={project.small}
                  className="w-full h-full object-contain"
                  alt=""
                />
              </div>
            </div>

            {/* SERVICES */}
            <div>
              <h4 className="uppercase text-xs font-bold tracking-wide mb-2">
                Services
              </h4>

              <ul className="text-sm leading-relaxed space-y-1">
                {project.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h4 className="uppercase font-bold text-xs tracking-wide mb-2">
                Description
              </h4>

              <p className="text-sm leading-relaxed text-gray-700 max-w-[520px]">
                {project.description}
              </p>
            </div>

            {/* LINKS */}
            <div className="flex gap-6 mt-2">
              <a
                href={project.live}
                target="_blank"
                className="underline text-sm tracking-wide"
              >
                LIVE →
              </a>
              <a
                href={project.github}
                target="_blank"
                className="underline text-sm tracking-wide"
              >
                GITHUB →
              </a>
            </div>
          </div>
        </div>

        {/* NAV BUTTONS */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-white bg-black shadow rounded-full w-10 h-10 flex items-center justify-center text-xl"
        >
          ‹
        </button>

        <button
          onClick={next}
          className="absolute text-white bg-black right-0 top-1/2 -translate-y-1/2 shadow rounded-full w-10 h-10 flex items-center justify-center text-xl"
        >
          ›
        </button>
      </div>
    </section>
  );
}
