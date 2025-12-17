import { useEffect, useState } from "react";

export default function TimelineBar({ videoRef, sections = [] }) {
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const onLoaded = () => setDuration(video.duration || 0);
    const onTime = () => setCurrent(video.currentTime || 0);

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTime);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTime);
    };
  }, [videoRef]);

  if (!duration || !sections.length) return null;

  return (
    <div className="mt-6">
      
      <div className="relative h-6 flex items-center">
        
        <div className="absolute left-0 right-0 h-[6px] rounded-full bg-neutral-700" />

        
        <div
          className="absolute left-0 h-[4px] rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-200"
          style={{ width: `${(current / duration) * 100}%` }}
        />

        
        {sections.map((s, i) => {
          if (typeof s.start !== "number") return null;

          const left = (s.start / duration) * 100;
          const isActive =
            current >= s.start &&
            (sections[i + 1] ? current < sections[i + 1].start : true);

          return (
            <div
              key={i}
              className={`
                absolute top-1/2 -translate-y-1/2
                w-[10px] h-[10px] rounded-full cursor-pointer
                transition-all
                ${
                  isActive
                    ? "bg-pink-500 scale-125 shadow-[0_0_6px_rgba(236,72,153,0.8)]"
                    : "bg-pink-400/70 hover:scale-110"
                }
              `}
              style={{ left: `${left}%` }}
              onClick={() => {
                videoRef.current.currentTime = s.start;
                videoRef.current.play();
              }}
              title={s.title || "Section"}
            />
          );
        })}

        
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white"
          style={{ left: `${(current / duration) * 100}%` }}
        />
      </div>
    </div>
  );
}
