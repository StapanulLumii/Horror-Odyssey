import type {
  Choice,
  Ending,
  GameState,
  Scene,
  Story,
  StoryNode,
} from "../engine";
import { SceneView } from "./SceneView";
import { EndingView } from "./EndingView";
import { StatsPanel } from "./StatsPanel";

interface Props {
  state: GameState;
  story: Story;
  onChoose: (choice: Choice) => void;
  onRestart: () => void;
}

const asScene = (node: StoryNode): Scene | null =>
  node.type === "scene" ? node : null;

const asEnding = (node: StoryNode): Ending | null =>
  node.type === "ending" ? node : null;

export function GameView({ state, story, onChoose, onRestart }: Props) {
  if (!state.currentNodeId || !state.character) return null;
  const node = story.nodes[state.currentNodeId];
  if (!node) return null;

  return (
    <div className="game-view">
      <StatsPanel stats={state.stats} />
      <main className="game-main">
        {asScene(node) && (
          <SceneView
            scene={asScene(node)!}
            stats={state.stats}
            onChoose={onChoose}
          />
        )}
        {asEnding(node) && (
          <EndingView
            ending={asEnding(node)!}
            characterName={state.character.name}
            onRestart={onRestart}
          />
        )}
      </main>
    </div>
  );
}
