import fs from "fs";
import { createClient } from "@deepgram/sdk";

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

/**
 * Convert Deepgram output into short subtitle-friendly sentences
 */
export const speechToText = async (audioPath) => {
  console.log("🟡 speechToText() audio:", audioPath);

  const audioStream = fs.createReadStream(audioPath);

  const response = await deepgram.listen.prerecorded.transcribeFile(
    audioStream,
    {
      mimetype: "audio/wav",
      model: "nova-2",
      punctuate: true,
      paragraphs: true,
      smart_format: true,
      language: "en",
    }
  );

  const alt = response?.result?.results?.channels?.[0]?.alternatives?.[0];

  if (!alt?.paragraphs?.paragraphs) {
    console.log("❌ No paragraphs from Deepgram");
    return [];
  }

  const transcript = [];
  const MAX_CHARS = 80; // ~2 subtitle lines

  alt.paragraphs.paragraphs.forEach((para) => {
    let buffer = "";
    let bufferStart = null;

    para.sentences.forEach((sentence) => {
      if (!bufferStart) bufferStart = sentence.start;

      // If adding sentence exceeds limit → push current buffer
      if ((buffer + " " + sentence.text).length > MAX_CHARS) {
        transcript.push({
          time: bufferStart,
          text: buffer.trim(),
        });

        buffer = sentence.text;
        bufferStart = sentence.start;
      } else {
        buffer += " " + sentence.text;
      }
    });

    // Push remaining buffer
    if (buffer.trim()) {
      transcript.push({
        time: bufferStart,
        text: buffer.trim(),
      });
    }
  });

  console.log("📦 Clean transcript:", transcript);
  return transcript;
};
