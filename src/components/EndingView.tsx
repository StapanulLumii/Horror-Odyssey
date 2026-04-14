import type { Ending, Mood } from "../engine";
import { MoodLayer } from "./MoodLayer";

interface Props {
  ending: Ending;
  characterName: string;
  onRestart: () => void;
}

const KIND_MOOD: Record<Ending["kind"], Mood> = {
  death: "blood",
  madness: "void",
  good: "candle",
  bad: "ravens",
  secret: "fog",
};

const KIND_LABELS: Record<Ending["kind"], string> = {
  death: "Moarte",
  madness: "Nebunie",
  good: "Final bun",
  bad: "Final rău",
  secret: "Final secret",
};

export function EndingView({ ending, characterName, onRestart }: Props) {
  const mood = ending.mood ?? KIND_MOOD[ending.kind];
  return (
    <section className={`ending-view ending-${ending.kind}`}>
      <MoodLayer mood={mood} />
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
