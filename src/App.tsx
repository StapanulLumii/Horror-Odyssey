import { useState } from "react";
import { IntroScreen } from "./components/IntroScreen";
import { GameView } from "./components/GameView";
import type { Character, Choice, GameState } from "./engine";
import { applyChoice, createInitialState, startGame } from "./engine";
import { demoStory } from "./story/demo";
import "./App.css";

function App() {
  const [state, setState] = useState<GameState>(createInitialState);

  const handleStart = (character: Character) => {
    setState((prev) => startGame(prev, character, demoStory));
  };

  const handleChoose = (choice: Choice) => {
    setState((prev) => applyChoice(prev, choice, demoStory));
  };

  const handleRestart = () => {
    setState(createInitialState());
  };

  if (state.status === "intro") {
    return <IntroScreen onStart={handleStart} />;
  }

  return (
    <GameView
      state={state}
      story={demoStory}
      onChoose={handleChoose}
      onRestart={handleRestart}
    />
  );
}

export default App;
