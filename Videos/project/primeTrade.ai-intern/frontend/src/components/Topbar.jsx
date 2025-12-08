export default function Sidebar({ onSelectFolder, showHeaderMobile = false }) {
  const [folders, setFolders] = useState([]);

  return (
    <>
      {/* MOBILE HEADER ONLY */}
      {showHeaderMobile && (
        <div className="md:hidden flex items-center gap-3 p-4 border-b bg-white">
          <div className="w-10 h-10 rounded-md bg-[var(--accent)] text-white flex items-center justify-center font-bold">
            ON
          </div>
          <div>
            <div className="font-semibold text-black">OnNotes</div>
            <div className="text-sm text-gray-500">Your workspace</div>
          </div>
        </div>
      )}

      {/* FULL SIDEBAR (Desktop Only) */}
      <aside className="w-72 p-5 hidden md:block bg-white border-r min-h-screen">
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[var(--accent)] text-white flex items-center justify-center font-bold">
            ON
          </div>
          <div>
            <div className="font-semibold">OnNotes</div>
            <div className="text-sm text-gray-500">Your workspace</div>
          </div>
        </div>

        {/* Folder input */}
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded-md mb-2"
            placeholder="New folder"
          />
          <button className="w-full bg-[var(--accent)] text-white py-2 rounded-md">
            Create Folder
          </button>
        </div>

        <div className="text-sm text-gray-500 mb-2">Folders</div>
        <div className="space-y-2">
          {folders.map((f) => (
            <div
              key={f._id}
              onClick={() => onSelectFolder(f)}
              className="p-2 rounded-md hover:bg-black/5 cursor-pointer"
            >
              {f.title}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
