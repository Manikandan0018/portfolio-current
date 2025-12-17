document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");

  startBtn.onclick = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.tabs.sendMessage(tab.id, { type: "START_RECORDING" });
    alert("Recording started");
  };

  stopBtn.onclick = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.tabs.sendMessage(tab.id, { type: "STOP_RECORDING" });
    alert("Recording stopped");
  };
});
