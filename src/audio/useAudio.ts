import { useEffect, useState } from "react";
import type { Mood } from "../engine";
import { audioEngine } from "./AudioEngine";

const STORAGE_KEY = "horror-odyssey:muted";

export function useAudio(mood: Mood | undefined, active: boolean) {
  const [muted, setMutedState] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY) === "1";
  });

  useEffect(() => {
    audioEngine.setMuted(muted);
    localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
  }, [muted]);

  useEffect(() => {
    if (!active) return;
    void audioEngine.resume().then(() => {
      audioEngine.playMood(mood);
    });
  }, [mood, active]);

  const toggleMuted = () => setMutedState((v) => !v);

  return { muted, toggleMuted };
}
