import SkillCategory from "./SkillCategory";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiSass,
  SiBootstrap,
  SiGreensock,
  SiNodedotjs,
  SiMongodb,
  SiRedux,
  SiFigma,
  SiAdobe,
  SiSketch,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
} from "react-icons/si";

import { FaAws } from "react-icons/fa";

export default function SkillsSection() {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-16">
      <h2 className="text-4xl bangers-regular md:text-6xl mb-12 text-center">
        Skills
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        <SkillCategory
          title="Frontend"
          skills={[
            { name: "React", icon: SiReact },
            { name: "Next.js", icon: SiNextdotjs },
            { name: "TypeScript", icon: SiTypescript },
            { name: "JavaScript", icon: SiJavascript },
            { name: "Tailwind CSS", icon: SiTailwindcss },
            { name: "SCSS", icon: SiSass },
            { name: "Bootstrap", icon: SiBootstrap },
            { name: "GSAP", icon: SiGreensock },
          ]}
        />

        <SkillCategory
          title="Backend & Data"
          skills={[
            { name: "Node.js", icon: SiNodedotjs },
            { name: "MongoDB", icon: SiMongodb },
            { name: "Redux Toolkit", icon: SiRedux },
          ]}
        />

        <SkillCategory
          title="UI / Tools / Cloud"
          skills={[
            { name: "Figma", icon: SiFigma },
            { name: "Adobe XD", icon: SiAdobe },
            { name: "Sketch", icon: SiSketch },
            { name: "Git", icon: SiGit },
            { name: "GitHub", icon: SiGithub },
            { name: "Postman", icon: SiPostman },
            { name: "Vercel", icon: SiVercel },
            { name: "AWS", icon: FaAws }, // ✅ FIXED
          ]}
        />
      </div>
    </section>
  );
}
