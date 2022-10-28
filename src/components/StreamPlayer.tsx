import {
  BsFillPlayFill,
  BsPauseFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
  BsArrowsFullscreen,
  BsFullscreenExit,
} from "react-icons/bs";
import { AiOutlineLoading } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import { findDOMNode } from "react-dom";
import screenfull from "screenfull";

type StreamPlayerProps = {
  src: string;
};

const StreamPlayer = ({ src }: StreamPlayerProps) => {
  const playerRef = useRef<ReactPlayer>(null);
  const fullscreenRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [buffering, setBuffering] = useState(false);

  const onResume = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(1, "fraction");
    }
  };

  const togglePlay = () => {
    setPlaying(!playing);
  };

  const toggleMuted = () => {
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    if (screenfull.isFullscreen) {
      setFullscreen(false);
      screenfull.exit();
    } else {
      setFullscreen(true);
      screenfull.request(findDOMNode(fullscreenRef.current) as Element);
    }
  };

  return (
    <div ref={fullscreenRef} className="relative">
      <ReactPlayer
        width="100%"
        height="100%"
        ref={playerRef}
        playing={playing}
        url={src}
        muted={muted}
        volume={volume}
        controls={false}
        onPlay={onResume}
        onBuffer={() => setBuffering(true)}
        onBufferEnd={() => setBuffering(false)}
        config={{
          file: {
            forceHLS: true,
          },
        }}
      />
      <div
        onClick={togglePlay}
        className="absolute top-0 left-0 z-50 h-full w-full opacity-0 hover:opacity-100"
      >
        <div className="absolute bottom-1/2 left-1/2 animate-spin">
          <IconContext.Provider value={{ color: "white", size: "4rem" }}>
            {buffering ? <AiOutlineLoading /> : null}
          </IconContext.Provider>
        </div>
        <div className="absolute bottom-0 left-0 flex w-full gap-4 rounded-t-md bg-zinc-700 bg-opacity-60 p-1 align-bottom">
          <IconContext.Provider value={{ color: "white", size: "1.5rem" }}>
            <div className="flex-1" onClick={togglePlay}>
              {playing ? <BsPauseFill /> : <BsFillPlayFill />}
            </div>
            <div onClick={toggleMuted}>
              {muted ? <BsFillVolumeMuteFill /> : <BsFillVolumeUpFill />}
            </div>
            <div onClick={toggleFullscreen}>
              {fullscreen ? <BsFullscreenExit /> : <BsArrowsFullscreen />}
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default StreamPlayer;
