import React from "react";

const YouTubeVideo = ({ videoLink }) => {
  // Extract video ID from the video link
  const videoId = videoLink.split("/").pop();

  return (
    <div>
      <iframe
        width="540"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeVideo;
