import type { StatDelta, StatRequirement, Stats } from "./types";

export const MAX_STAT = 100;
export const MIN_STAT = 0;

export const initialStats: Stats = {
  health: 80,
  sanity: 80,
  perception: 50,
  courage: 50,
};

const clamp = (value: number): number =>
  Math.max(MIN_STAT, Math.min(MAX_STAT, value));

export const applyDelta = (stats: Stats, delta: StatDelta): Stats => ({
  health: clamp(stats.health + (delta.health ?? 0)),
  sanity: clamp(stats.sanity + (delta.sanity ?? 0)),
  perception: clamp(stats.perception + (delta.perception ?? 0)),
  courage: clamp(stats.courage + (delta.courage ?? 0)),
});

export const meetsRequirement = (
  stats: Stats,
  requirement: StatRequirement | undefined,
): boolean => {
  if (!requirement) return true;
  return (Object.entries(requirement) as [keyof Stats, number][]).every(
    ([key, min]) => stats[key] >= min,
  );
};
