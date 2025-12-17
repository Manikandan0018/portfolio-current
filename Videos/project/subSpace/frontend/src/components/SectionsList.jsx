export default function SectionsList({ sections = [], videoRef }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="font-semibold mb-3">Sections</h2>

      <div className="space-y-2">
        {sections.map((s, i) => (
          <button
            key={i}
            onClick={() => {
              videoRef.current.currentTime = s.start;
              videoRef.current.play();
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-indigo-50 transition"
          >
            <span className="text-indigo-600 font-medium">
              {Math.floor(s.start)}s
            </span>{" "}
            — {s.title}
          </button>
        ))}
      </div>
    </div>
  );
}
