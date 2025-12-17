let mediaRecorder;
let recordedChunks = [];
let screenStream;

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "START_RECORDING") {
    startRecording();
  }

  if (msg.type === "STOP_RECORDING") {
    stopRecording();
  }
});


async function startRecording() {
  if (mediaRecorder && mediaRecorder.state === "recording") return;

  console.log("Starting recording...");

  // Screen / tab
  const screenStream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true,
  });

  // Mic (CRITICAL)
  const micStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });

  const audioContext = new AudioContext();
  const destination = audioContext.createMediaStreamDestination();

  if (screenStream.getAudioTracks().length) {
    const screenSource = audioContext.createMediaStreamSource(screenStream);
    screenSource.connect(destination);
  }

  const micSource = audioContext.createMediaStreamSource(micStream);
  micSource.connect(destination);

  const combinedStream = new MediaStream([
    ...screenStream.getVideoTracks(),
    ...destination.stream.getAudioTracks(),
  ]);

  mediaRecorder = new MediaRecorder(combinedStream, {
    mimeType: "video/webm; codecs=vp8,opus",
  });

  recordedChunks = [];

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) recordedChunks.push(e.data);
  };

  mediaRecorder.onstop = async () => {
    screenStream.getTracks().forEach((t) => t.stop());
    micStream.getTracks().forEach((t) => t.stop());

    const blob = new Blob(recordedChunks, { type: "video/webm" });

    const form = new FormData();
    form.append("video", blob, "recording.webm");

    const uploadRes = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: form,
    });
    const uploadData = await uploadRes.json();

    await fetch("http://localhost:5000/api/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: uploadData._id }),
    });

    window.open(`http://localhost:5173/player/${uploadData._id}`, "_blank");
  };

  mediaRecorder.start();
}



function stopRecording() {
  if (!mediaRecorder || mediaRecorder.state !== "recording") {
    alert("Recording has not started");
    return;
  }
  mediaRecorder.stop();
}
