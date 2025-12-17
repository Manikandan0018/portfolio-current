import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import TimelineBar from "../components/Timeline";
import Transcript from "../components/Transcript";
import SectionsList from "../components/SectionsList";
import Header from "./Header";

export default function Player() {
  const { sessionId } = useParams();
  const videoRef = useRef(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/process/${sessionId}`)
      .then((res) => setSession(res.data))
      .catch(console.error);
  }, [sessionId]);

  if (!session) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading session…
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl shadow p-4">
              <video
                ref={videoRef}
                src={`http://localhost:5000/${session.videoPath}`}
                controls
                className="w-full rounded-xl bg-black"
              />

              <div className="mt-4">
                <TimelineBar videoRef={videoRef} sections={session.sections} />
              </div>

            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
            <h2 className="font-semibold mb-3">Transcript</h2>
            <div className="flex-1 overflow-y-auto">
              <Transcript transcript={session.transcript} videoRef={videoRef} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
