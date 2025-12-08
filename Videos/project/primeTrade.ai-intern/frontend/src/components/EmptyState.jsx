export default function EmptyState({ message }) {
  return (
    <div className="card p-10 text-center text-[var(--color-muted)]">
      {message}
    </div>
  );
}
