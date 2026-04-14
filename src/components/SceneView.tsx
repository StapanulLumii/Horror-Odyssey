import { useState } from "react";
import type { Choice, Scene, Stats } from "../engine";
import { isChoiceEnabled, visibleChoices } from "../engine";
import { TypewriterText } from "./TypewriterText";
import { MoodLayer } from "./MoodLayer";

interface Props {
  scene: Scene;
  stats: Stats;
  onChoose: (choice: Choice) => void;
}

export function SceneView({ scene, stats, onChoose }: Props) {
  const choices = visibleChoices(scene, stats);
  const [textDone, setTextDone] = useState(false);

  return (
    <section className="scene-view" key={scene.id}>
      <MoodLayer mood={scene.mood} />
      {scene.image && (
        <div
          className="scene-image"
          style={{ backgroundImage: `url(${scene.image})` }}
        />
      )}
      <TypewriterText
        text={scene.text}
        className="scene-text"
        onDone={() => setTextDone(true)}
      />
      <ul
        className="scene-choices"
        data-visible={textDone ? "true" : "false"}
      >
        {choices.map((choice) => {
          const enabled = isChoiceEnabled(choice, stats);
          return (
            <li key={choice.id}>
              <button
                type="button"
                className="choice-btn"
                disabled={!enabled}
                onClick={() => enabled && onChoose(choice)}
              >
                {choice.text}
                {!enabled && choice.requires && (
                  <span className="choice-requires">
                    {" "}
                    (necesită{" "}
                    {Object.entries(choice.requires)
                      .map(([k, v]) => `${k} ${v}`)
                      .join(", ")}
                    )
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
