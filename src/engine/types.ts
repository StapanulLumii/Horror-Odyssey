export type Gender = "masculin" | "feminin" | "altul";

export type Race =
  | "uman"
  | "elf"
  | "vampir"
  | "spirit"
  | "hibrid";

export type Clothing =
  | "haine-obișnuite"
  | "costum-detectiv"
  | "mantie-neagră"
  | "uniformă-poliție"
  | "zdrențe";

export interface Character {
  name: string;
  age: number;
  gender: Gender;
  race: Race;
  clothing: Clothing;
}

export interface Stats {
  health: number;
  sanity: number;
  perception: number;
  courage: number;
}

export type StatKey = keyof Stats;

export type StatDelta = Partial<Record<StatKey, number>>;

export type StatRequirement = Partial<Record<StatKey, number>>;

export type EndingKind =
  | "death"
  | "madness"
  | "good"
  | "bad"
  | "secret";

export interface Choice {
  id: string;
  text: string;
  requires?: StatRequirement;
  hiddenUnless?: StatRequirement;
  effects?: StatDelta;
  next: string;
}

export type Mood =
  | "rain"
  | "fog"
  | "candle"
  | "blood"
  | "ravens"
  | "void";

export interface Scene {
  id: string;
  text: string;
  image?: string;
  mood?: Mood;
  choices: Choice[];
}

export interface Ending {
  id: string;
  kind: EndingKind;
  text: string;
  image?: string;
  mood?: Mood;
}

export type StoryNode =
  | ({ type: "scene" } & Scene)
  | ({ type: "ending" } & Ending);

export interface Story {
  startSceneId: string;
  nodes: Record<string, StoryNode>;
}

export type GameStatus = "intro" | "playing" | "ended";

export interface GameState {
  status: GameStatus;
  character: Character | null;
  stats: Stats;
  currentNodeId: string | null;
  endingId: string | null;
  visited: string[];
}
