chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "START_RECORDING") {
    chrome.tabCapture.capture({ video: true, audio: true }, (stream) => {
      chrome.tabs.sendMessage(sender.tab.id, {
        type: "TAB_STREAM",
      });
      globalThis.tabStream = stream;
    });
  }

  if (msg.type === "STOP_RECORDING") {
    if (globalThis.tabStream) {
      globalThis.tabStream.getTracks().forEach((t) => t.stop());
    }
  }
});
