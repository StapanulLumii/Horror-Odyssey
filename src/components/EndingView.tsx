import type { Ending } from "../engine";

interface Props {
  ending: Ending;
  characterName: string;
  onRestart: () => void;
}

const KIND_LABELS: Record<Ending["kind"], string> = {
  death: "Moarte",
  madness: "Nebunie",
  good: "Final bun",
  bad: "Final rău",
  secret: "Final secret",
};

export function EndingView({ ending, characterName, onRestart }: Props) {
  return (
    <section className={`ending-view ending-${ending.kind}`}>
      {ending.image && (
        <div
          className="scene-image"
          style={{ backgroundImage: `url(${ending.image})` }}
        />
      )}
      <h2 className="ending-title">{KIND_LABELS[ending.kind]}</h2>
      <p className="ending-text">{ending.text}</p>
      <p className="ending-epitaph">— {characterName} —</p>
      <button type="button" className="ending-restart" onClick={onRestart}>
        Încearcă din nou
      </button>
    </section>
  );
}
