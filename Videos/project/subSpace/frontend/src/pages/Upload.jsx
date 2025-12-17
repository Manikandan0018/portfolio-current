import { useState } from "react";
import { api } from "../services/api";
import { socket } from "../services/socket";
import StatusBar from "../components/StatusBar";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import bg from "../../image/bg1.png";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const upload = async () => {
    if (!file) return alert("Please select a video");

    setLoading(true);

    const form = new FormData();
    form.append("video", file);

    const uploadRes = await api.post("/upload", form);
    const sessionId = uploadRes.data._id;

    socket.emit("join", sessionId);
    socket.on("status", (msg) => setStatus(msg));

    await api.post("/process", { sessionId });
    navigate(`/player/${sessionId}`);
  };

  return (
    <>
      <Header />

      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        
        <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl p-8 shadow-xl text-center">
          <h1 className="text-2xl font-bold mb-6">
            Upload your screen recording
          </h1>

          <StatusBar status={status} />

          
          <label className="relative mt-6 mb-6 block cursor-pointer">
            <div className="mx-auto w-40 h-40 rounded-full flex items-center justify-center border-2 border-dashed border-pink-400">
              <span className="text-sm text-gray-600">
                {file ? file.name : "Choose Video"}
              </span>
            </div>

            
            <span className="absolute inset-0 rounded-full animate-spinSlow border-2 border-pink-500 border-t-transparent" />

            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          
          <button
            onClick={upload}
            disabled={loading}
            className={`
              w-full py-3 rounded-xl text-white font-medium transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed animate-pulse"
                  : "bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-[1.02]"
              }
            `}
          >
            {loading ? "Processing..." : "Upload & Process"}
          </button>
        </div>
      </div>
    </>
  );
}
