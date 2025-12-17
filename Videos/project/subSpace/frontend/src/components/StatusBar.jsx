import { useEffect, useState } from "react";

export default function TimelineBar({ videoRef, sections = [] }) {
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  
  if (!Array.isArray(sections) || sections.length === 0) {
    return null;
  }

  useEffect(() => {
    if (!videoRef?.current) return;

    const video = videoRef.current;

    const onLoaded = () => setDuration(video.duration || 0);
    const onTime = () => setCurrent(video.currentTime || 0);

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTime);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTime);
    };
  }, [videoRef]);

  if (!duration) return null;

  return (
    <div className="mt-4">
      <div className="relative h-2 bg-gray-200 rounded-full">
       
        <div
          className="absolute top-0 left-0 h-2 bg-indigo-600 rounded-full transition-all"
          style={{ width: `${(current / duration) * 100}%` }}
        />

        
        {sections.map((s, i) => {
          if (typeof s.start !== "number") return null;

          const left = (s.start / duration) * 100;

          return (
            <div
              key={i}
              className="absolute top-[-6px] w-3 h-3 bg-white border-2 border-indigo-600 rounded-full cursor-pointer group"
              style={{ left: `${left}%` }}
              onClick={() => {
                videoRef.current.currentTime = s.start;
                videoRef.current.play();
              }}
            >
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                {s.title} ({Math.floor(s.start)}s)
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
