export function RainEffect() {
  return (
    <svg
      className="fx-layer fx-rain"
      aria-hidden="true"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {Array.from({ length: 60 }).map((_, i) => {
        const x = (i * 137) % 100;
        const delay = (i * 0.17) % 1.2;
        return (
          <line
            key={i}
            x1={x}
            y1="-10"
            x2={x - 2}
            y2="110"
            stroke="rgba(180, 200, 230, 0.35)"
            strokeWidth="0.15"
            style={{ animationDelay: `${delay}s` }}
          />
        );
      })}
    </svg>
  );
}
