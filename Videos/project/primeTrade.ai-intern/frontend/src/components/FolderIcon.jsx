export default function FolderIcon({ label }) {
  const initials = label
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="flex-col items-center text-center">
      <div className="w-16 h-16 rounded-lg bg-[var(--accent)]/90 flex items-center justify-center text-white font-bold shadow">
        {initials}
      </div>
      <div className="text-sm text-[var(--muted)] mt-2">{label}</div>
    </div>
  );
}
