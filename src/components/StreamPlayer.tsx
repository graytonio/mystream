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
import { useState, useRef } from "react";
import ReactPlayer from "react-player/lazy";
import { useFullscreen } from "rooks";

type StreamPlayerProps = {
  src: string;
  className?: string;
};

const StreamPlayer = ({ src, className }: StreamPlayerProps) => {
  const playerRef = useRef<ReactPlayer>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [buffering, setBuffering] = useState(false);

  const { isFullscreenEnabled, toggleFullscreen } = useFullscreen({
    target: fullscreenRef,
  });

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

  return (
    <div ref={fullscreenRef} className={`${className} relative h-fit`}>
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
            {/* TODO Buffering icon should not have to be hovered */}
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
              {isFullscreenEnabled ? (
                <BsFullscreenExit />
              ) : (
                <BsArrowsFullscreen />
              )}
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default StreamPlayer;
