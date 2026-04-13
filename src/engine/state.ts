import type {
  Character,
  Choice,
  GameState,
  Stats,
  Story,
  StoryNode,
} from "./types";
import { applyDelta, initialStats, meetsRequirement } from "./stats";

export const createInitialState = (): GameState => ({
  status: "intro",
  character: null,
  stats: initialStats,
  currentNodeId: null,
  endingId: null,
  visited: [],
});

export const startGame = (
  state: GameState,
  character: Character,
  story: Story,
): GameState => ({
  ...state,
  status: "playing",
  character,
  stats: initialStats,
  currentNodeId: story.startSceneId,
  endingId: null,
  visited: [story.startSceneId],
});

const checkStatDeath = (stats: Stats): "death" | "madness" | null => {
  if (stats.health <= 0) return "death";
  if (stats.sanity <= 0) return "madness";
  return null;
};

export const applyChoice = (
  state: GameState,
  choice: Choice,
  story: Story,
): GameState => {
  const nextStats = applyDelta(state.stats, choice.effects ?? {});
  const forcedEnding = checkStatDeath(nextStats);

  if (forcedEnding) {
    const endingNodeId =
      forcedEnding === "death" ? "__death__" : "__madness__";
    return {
      ...state,
      stats: nextStats,
      status: "ended",
      endingId: endingNodeId,
      currentNodeId: endingNodeId,
    };
  }

  const nextNode: StoryNode | undefined = story.nodes[choice.next];
  if (!nextNode) {
    throw new Error(`Missing story node: ${choice.next}`);
  }

  return {
    ...state,
    stats: nextStats,
    currentNodeId: choice.next,
    status: nextNode.type === "ending" ? "ended" : "playing",
    endingId: nextNode.type === "ending" ? choice.next : null,
    visited: [...state.visited, choice.next],
  };
};

export const visibleChoices = (scene: { choices: Choice[] }, stats: Stats) =>
  scene.choices.filter((c) => meetsRequirement(stats, c.hiddenUnless));

export const isChoiceEnabled = (choice: Choice, stats: Stats): boolean =>
  meetsRequirement(stats, choice.requires);

export const restart = (): GameState => createInitialState();
