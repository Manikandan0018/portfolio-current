import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import path from "path";
import fs from "fs";

ffmpeg.setFfmpegPath(ffmpegPath);

/**
 * Extract audio from video
 * @param {string} videoPath
 * @returns {Promise<string>} audioPath
 */
export const extractAudio = (videoPath) => {
  return new Promise((resolve, reject) => {
    if (!videoPath) {
      return reject(new Error("Video path is undefined"));
    }

    const audioPath = videoPath.replace(/\.[^/.]+$/, "_audio.wav");

    ffmpeg(videoPath)
      .noVideo()
      .audioCodec("pcm_s16le")
      .audioChannels(1)
      .audioFrequency(16000)
      .format("wav")
      .save(audioPath)
      .on("end", () => {
        console.log("🎧 Audio extracted:", audioPath);
        resolve(audioPath);
      })
      .on("error", (err) => {
        console.error("❌ FFmpeg error:", err);
        reject(err);
      });
  });
};
