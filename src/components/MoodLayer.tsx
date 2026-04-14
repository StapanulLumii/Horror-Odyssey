import type { Mood } from "../engine";
import { RainEffect } from "./effects/RainEffect";
import { FogEffect } from "./effects/FogEffect";
import { CandleGlow } from "./effects/CandleGlow";
import { BloodDrips } from "./effects/BloodDrips";
import { RavenFlight } from "./effects/RavenFlight";
import { VoidEffect } from "./effects/VoidEffect";

interface Props {
  mood?: Mood;
}

export function MoodLayer({ mood }: Props) {
  if (!mood) return null;
  return (
    <div className="mood-layer" data-mood={mood}>
      {mood === "rain" && <RainEffect />}
      {mood === "fog" && <FogEffect />}
      {mood === "candle" && <CandleGlow />}
      {mood === "blood" && <BloodDrips />}
      {mood === "ravens" && <RavenFlight />}
      {mood === "void" && <VoidEffect />}
    </div>
  );
}
