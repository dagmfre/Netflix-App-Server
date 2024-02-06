import { useLocation } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

export default function MoviePlayer() {
  const location = useLocation();
  const videoNode = useRef(null);
  const player = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (videoNode.current && !initialized.current) {
      initialized.current = true; // prevent duplicate initialization
      player.current = videojs(videoNode.current, {
        controls: true,
        fluid: true,
        controlBar: {
          volumePanel: {
            inline: false,
          },
        },
        rel: false,
        sources: [
          {
            type: "video/youtube",
            src: `https://www.youtube.com/watch?v=${location.state?.data}`,
          },
        ],
      }).ready(function () {
        console.log("Player Ready");
      });
    }

    // Cleanup function
    return () => {
      if (player.current) {
        player.current.dispose(); // Dispose the player when the component unmounts
      }
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="movie-player">
      <video ref={videoNode} className="video-js" />
    </div>
  );
}
