export default function SkillCategory({ title, skills }) {
  return (
    <div className="bg-white p-6 border border-white/10">
      <h3 className="text-xl text-black font-semibold shojumaru-regular mb-6">
        {title}
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <div
              key={i}
              className="
                flex items-center gap-3
                bg-[#111]
                px-4 py-3
                rounded-lg
                border border-white/10
                hover:bg-[#1a1a1a]
                transition
              "
            >
              <Icon className="text-xl text-white" />
              <span className="text-sm">{skill.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
