import type { StoryNode } from "./types";

export const DEATH_ID = "__death__";
export const MADNESS_ID = "__madness__";

export const defaultEndingNodes: Record<string, StoryNode> = {
  [DEATH_ID]: {
    type: "ending",
    id: DEATH_ID,
    kind: "death",
    text: "Corpul tău se prăbușește. Ochii se sting. Cazul rămâne nerezolvat.",
  },
  [MADNESS_ID]: {
    type: "ending",
    id: MADNESS_ID,
    kind: "madness",
    text: "Mintea ta s-a frânt. Nu mai deosebești realitatea de coșmar. Ești pierdut.",
  },
};
