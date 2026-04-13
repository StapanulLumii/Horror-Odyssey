import type { Stats } from "../engine";

interface Props {
  stats: Stats;
}

const LABELS: Record<keyof Stats, string> = {
  health: "Sănătate",
  sanity: "Sanitate",
  perception: "Percepție",
  courage: "Curaj",
};

const COLORS: Record<keyof Stats, string> = {
  health: "#c0392b",
  sanity: "#8e44ad",
  perception: "#2980b9",
  courage: "#d68910",
};

export function StatsPanel({ stats }: Props) {
  const keys = Object.keys(LABELS) as (keyof Stats)[];
  return (
    <aside className="stats-panel">
      {keys.map((key) => {
        const value = stats[key];
        return (
          <div key={key} className="stat-row">
            <div className="stat-label">
              <span>{LABELS[key]}</span>
              <span className="stat-value">{value}</span>
            </div>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{
                  width: `${value}%`,
                  background: COLORS[key],
                }}
              />
            </div>
          </div>
        );
      })}
    </aside>
  );
}
