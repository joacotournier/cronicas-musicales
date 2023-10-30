import React, { useState, useEffect, useContext } from "react";
import { Howl } from "howler";
import Pause from "./Pause";
import Play from "./Play";
import AudioContext from "./AudioContext";

const AudioPlayer = ({ url, name }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const { playingAudio, setPlayingAudio } = useContext(AudioContext);

  // Create a new Howl instance and keep it in the state
  useEffect(() => {
    const howl = new Howl({ src: [url] });
    howl.on("end", () => setIsPlaying(false));
    howl.on("load", () => setDuration(howl.duration()));
    setSound(howl);
  }, [url]);

  // When isPlaying changes, play or pause the sound
  useEffect(() => {
    if (isPlaying && playingAudio !== name) {
      setIsPlaying(false);
    } else if (isPlaying) {
      sound.play();
    } else if (sound) {
      sound.pause();
    }
  }, [isPlaying, sound, playingAudio, name]);

  // Update position state periodically when the sound is playing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setPosition(sound.seek());
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setPosition(sound ? sound.seek() : 0);
    }
  }, [isPlaying, sound]);

  // Clean up when the component is unmounted
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unload();
      }
    };
  }, [sound]);

  const playPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setPlayingAudio(null);
    } else {
      setIsPlaying(true);
      setPlayingAudio(name);
    }
  };

  const handleSliderChange = (e) => {
    const newPosition = Number(e.target.value);
    setPosition(newPosition);
    if (sound) {
      sound.seek(newPosition);
    }
  };

  return (
    <div className="flex items-center justify-between border-2 border-gray-600 rounded-full p-2 pl-6 pr-2 mt-6 mb-6 mr-10 font-poppins">
      <p className="shrink-0">{name}</p>
      <div className="flex items-center justify-between ml-4 w-full">
        <input
          type="range"
          min="0"
          max={duration}
          value={position}
          onChange={handleSliderChange}
          className="slider"
        />
        <button onClick={playPause} className="focus:outline-none ml-2">
          {isPlaying ? <Pause /> : <Play />}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
