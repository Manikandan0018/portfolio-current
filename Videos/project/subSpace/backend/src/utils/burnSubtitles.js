import ffmpeg from "fluent-ffmpeg";
import path from "path";

export const burnSubtitles = (videoPath, srtPath) => {
  return new Promise((resolve, reject) => {
    const outputPath = videoPath.replace(".webm", "_final.mp4");

    ffmpeg(videoPath)
      .videoFilters({
        filter: "subtitles",
        options: {
          filename: path.resolve(srtPath),
          force_style:
            "FontName=Arial,FontSize=26,PrimaryColour=&Hffffff&,OutlineColour=&H000000&,BorderStyle=3",
        },
      })
      .outputOptions("-c:a copy")
      .save(outputPath)
      .on("end", () => resolve(outputPath))
      .on("error", reject);
  });
};
