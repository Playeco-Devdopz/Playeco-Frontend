import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './Customevideoplayer.css';
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import { VideoProps } from "../../types/Types";

function Customevideoplayer() {
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [controlsVisible, setControlsVisible] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [popupVisible, setPopupVisible] = useState<boolean>(false);

    const playerRef = useRef<ReactPlayer | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setPopupVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleFullScreen = () => {
        const container = containerRef.current;

        if (container) {
            if (!isFullScreen) {
                if (container.requestFullscreen) {
                    container.requestFullscreen();
                } else if ((container as any).mozRequestFullScreen) { // Firefox
                    (container as any).mozRequestFullScreen();
                } else if ((container as any).webkitRequestFullscreen) { // Chrome, Safari, and Opera
                    (container as any).webkitRequestFullscreen();
                } else if ((container as any).msRequestFullscreen) { // IE/Edge
                    (container as any).msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if ((document as any).mozCancelFullScreen) { // Firefox
                    (document as any).mozCancelFullScreen();
                } else if ((document as any).webkitExitFullscreen) { // Chrome, Safari, and Opera
                    (document as any).webkitExitFullscreen();
                } else if ((document as any).msExitFullscreen) { // IE/Edge
                    (document as any).msExitFullscreen();
                }
            }
        }

        setIsFullScreen(!isFullScreen);
    };

    const handleMouseEnter = () => {
        setControlsVisible(true);
    };

    const handleMouseLeave = () => {
        setControlsVisible(false);
    };

    const togglePlayPause = () => {
        setIsPlaying(prevState => !prevState);
    };

    const handleProgress = (state: { playedSeconds: number }) => {
        setCurrentTime(state.playedSeconds);

        const value = (state.playedSeconds / duration) * 100;
        const rangeInput = document.querySelector('.custom-range') as HTMLInputElement;
        if (rangeInput) {
            rangeInput.style.setProperty('--value', `${value}%`);
        }
    };

    const handleDuration = (duration: number) => {
        setDuration(duration);
    };

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value) * duration;
        setCurrentTime(newTime);
        playerRef.current?.seekTo(newTime);

        const value = parseFloat(e.target.value) * 100;
        e.target.style.setProperty('--value', `${value}%`);
    };

    const toggleMute = () => {
        setIsMuted(prevState => !prevState);
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0); // Optionally reset the video to the start
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setPopupVisible(true);
    };

    //   video shwoing logic 
    const { videoId } = useParams();
    const [findVideo, setFindVideo] = useState<VideoProps>();
    const { allVideos  }: any =
    useContext(ApiContext);
    useEffect(() => {
        if (videoId) {
          const videoMap = new Map(
            allVideos.map((video: VideoProps) => [video._id, video])
          );
          const findOneVideo = videoMap.get(videoId) as VideoProps | undefined;
          setFindVideo(findOneVideo);
        }
      }, [videoId, allVideos]);

    return (
        <div className={`App ${isFullScreen ? 'fullscreen' : ''}`}>
            <div
                ref={containerRef}
                className={`relative ${isFullScreen ? 'w-full h-full' : 'w-[100%] h-[100%] lg:h-[670px]'} bg-black`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onContextMenu={handleContextMenu}
            >
                <ReactPlayer
                    ref={playerRef}
                    url={findVideo?.video}
                    width='100%'
                    height='100%'
                    playing={isPlaying}
                    muted={isMuted}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                    onEnded={handleEnded}
                    config={{
                        file: {
                            attributes: {
                                preload: 'auto',
                            },
                        },
                    }}
                />
                {controlsVisible && (
                    <div className='controls absolute bottom-0 w-full p-4 flex flex-col items-center gap-2'>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step="any"
                            value={currentTime / duration}
                            onChange={handleSeekChange}
                            className='w-full custom-range'
                        />
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex items-center gap-4'>
                                <button onClick={togglePlayPause} className='text-white'>
                                    {isPlaying ? "Stop" : "Play"}
                                </button>
                                <button onClick={toggleMute} className='text-white'>
                                    {isMuted ? "Unmute" : "Mute"}
                                </button>
                                <p className='text-white'>{formatTime(currentTime)} / {formatTime(duration)}</p>
                            </div>
                            <button onClick={toggleFullScreen} className='text-white'>
                                {isFullScreen ? "Minimize" : "Expand"}
                            </button>
                        </div>
                    </div>
                )}
                {popupVisible && (
                    <div ref={popupRef} className='popup absolute text-white top-0 right-0 bg-purple-600 p-3 shadow-lg'>
                        <p>Playeco</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper function to format time in MM:SS format
const formatTime = (seconds: number): string => {
    if (!Number.isFinite(seconds)) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default Customevideoplayer;
