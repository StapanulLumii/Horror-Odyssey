import type { Choice, Scene, Stats } from "../engine";
import { isChoiceEnabled, visibleChoices } from "../engine";

interface Props {
  scene: Scene;
  stats: Stats;
  onChoose: (choice: Choice) => void;
}

export function SceneView({ scene, stats, onChoose }: Props) {
  const choices = visibleChoices(scene, stats);

  return (
    <section className="scene-view">
      {scene.image && (
        <div
          className="scene-image"
          style={{ backgroundImage: `url(${scene.image})` }}
        />
      )}
      <p className="scene-text">{scene.text}</p>
      <ul className="scene-choices">
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
