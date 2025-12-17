export default function Transcript({ transcript = [], videoRef }) {
  if (!transcript.length) {
    return <p className="text-gray-400">No transcript available</p>;
  }

  let lastTime = -5;

  return (
    <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-2">
      {transcript.map((t, i) => {
        const showTime = t.time - lastTime >= 5;
        if (showTime) lastTime = t.time;

        return (
          <div
            key={i}
            onClick={() => {
              videoRef.current.currentTime = t.time;
              videoRef.current.play();
            }}
            className="cursor-pointer p-2 rounded-lg hover:bg-indigo-50 transition"
          >
            {showTime && (
              <div className="text-xs text-indigo-500 mb-1">{t.time}s</div>
            )}
            <p className="text-sm text-gray-800 leading-relaxed">{t.text}</p>
          </div>
        );
      })}
    </div>
  );
}
