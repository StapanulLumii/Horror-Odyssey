import { useState } from "react";
import { IntroScreen } from "./components/IntroScreen";
import type { Character, GameState } from "./engine";
import { createInitialState, startGame } from "./engine";
import "./App.css";

const PLACEHOLDER_STORY = {
  startSceneId: "start",
  nodes: {
    start: {
      type: "scene" as const,
      id: "start",
      text: "Aici va începe povestea...",
      choices: [],
    },
  },
};

function App() {
  const [state, setState] = useState<GameState>(createInitialState);

  const handleStart = (character: Character) => {
    setState((prev) => startGame(prev, character, PLACEHOLDER_STORY));
  };

  if (state.status === "intro") {
    return <IntroScreen onStart={handleStart} />;
  }

  return (
    <main className="placeholder">
      <p>
        Salut, {state.character?.name}. Povestea va apărea aici în următoarea
        versiune.
      </p>
    </main>
  );
}

export default App;
