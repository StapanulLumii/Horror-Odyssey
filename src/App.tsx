import { useMemo, useState } from "react";
import { IntroScreen } from "./components/IntroScreen";
import { GameView } from "./components/GameView";
import { AudioToggle } from "./components/AudioToggle";
import type { Character, Choice, GameState, Mood } from "./engine";
import { applyChoice, createInitialState, startGame } from "./engine";
import { mainStory } from "./story/main";
import { useAudio } from "./audio/useAudio";
import { audioEngine } from "./audio/AudioEngine";
import "./App.css";

const MOOD_FOR_KIND: Record<string, Mood> = {
  death: "blood",
  madness: "void",
  good: "candle",
  bad: "ravens",
  secret: "fog",
};

function App() {
  const [state, setState] = useState<GameState>(createInitialState);

  const currentMood = useMemo<Mood | undefined>(() => {
    if (!state.currentNodeId) return undefined;
    const node = mainStory.nodes[state.currentNodeId];
    if (!node) return undefined;
    if (node.mood) return node.mood;
    if (node.type === "ending") return MOOD_FOR_KIND[node.kind];
    return undefined;
  }, [state.currentNodeId]);

  const { muted, toggleMuted } = useAudio(
    currentMood,
    state.status === "playing" || state.status === "ended",
  );

  const handleStart = (character: Character) => {
    void audioEngine.resume();
    setState((prev) => startGame(prev, character, mainStory));
  };

  const handleChoose = (choice: Choice) => {
    audioEngine.playChoiceClick();
    setState((prev) => {
      const next = applyChoice(prev, choice, mainStory);
      if (next.status === "ended" && prev.status !== "ended") {
        audioEngine.playDeathSting();
      }
      return next;
    });
  };

  const handleRestart = () => {
    setState(createInitialState());
  };

  return (
    <>
      <AudioToggle muted={muted} onToggle={toggleMuted} />
      {state.status === "intro" ? (
        <IntroScreen onStart={handleStart} />
      ) : (
        <GameView
          state={state}
          story={mainStory}
          onChoose={handleChoose}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default App;
