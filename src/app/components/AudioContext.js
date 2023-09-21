import { createContext } from "react";

const AudioContext = createContext({
  playingAudio: null,
  setPlayingAudio: () => {},
});

export default AudioContext;
