export const generateSRT = (transcript) => {
  const format = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(Math.floor(sec % 60)).padStart(2, "0");
    const ms = String(Math.floor((sec % 1) * 1000)).padStart(3, "0");
    return `${h}:${m}:${s},${ms}`;
  };

  return transcript
    .map((t, i) => {
      const start = format(t.time);
      const end = format(t.time + 3);
      return `${i + 1}\n${start} --> ${end}\n${t.text}\n`;
    })
    .join("\n");
};
