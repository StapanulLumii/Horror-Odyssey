interface Props {
  muted: boolean;
  onToggle: () => void;
}

export function AudioToggle({ muted, onToggle }: Props) {
  return (
    <button
      type="button"
      className="audio-toggle"
      onClick={onToggle}
      aria-label={muted ? "Activează sunetul" : "Oprește sunetul"}
      title={muted ? "Sunet oprit" : "Sunet pornit"}
    >
      {muted ? "♪̸" : "♪"}
    </button>
  );
}
