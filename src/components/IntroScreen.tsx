import { useState } from "react";
import type { Character, Clothing, Gender, Race } from "../engine";

interface Props {
  onStart: (character: Character) => void;
}

const GENDERS: Gender[] = ["masculin", "feminin", "altul"];
const RACES: Race[] = ["uman", "elf", "vampir", "spirit", "hibrid"];
const CLOTHINGS: Clothing[] = [
  "haine-obișnuite",
  "costum-detectiv",
  "mantie-neagră",
  "uniformă-poliție",
  "zdrențe",
];

const labelForClothing = (c: Clothing): string =>
  c.replace(/-/g, " ");

export function IntroScreen({ onStart }: Props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<Gender>("masculin");
  const [race, setRace] = useState<Race>("uman");
  const [clothing, setClothing] = useState<Clothing>("costum-detectiv");

  const canStart = name.trim().length >= 2 && age >= 16 && age <= 120;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canStart) return;
    onStart({ name: name.trim(), age, gender, race, clothing });
  };

  return (
    <div className="intro-screen">
      <h1 className="intro-title">Horror Odyssey</h1>
      <p className="intro-subtitle">
        Un caz. O noapte. Nu toți se întorc.
      </p>

      <form className="intro-form" onSubmit={handleSubmit}>
        <label className="intro-field">
          <span>Nume personaj</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ex. Marcu Iftode"
            autoFocus
            maxLength={40}
          />
        </label>

        <label className="intro-field">
          <span>Vârstă</span>
          <input
            type="number"
            min={16}
            max={120}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </label>

        <label className="intro-field">
          <span>Gen</span>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
          >
            {GENDERS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>

        <label className="intro-field">
          <span>Rasă</span>
          <select
            value={race}
            onChange={(e) => setRace(e.target.value as Race)}
          >
            {RACES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <label className="intro-field">
          <span>Îmbrăcăminte</span>
          <select
            value={clothing}
            onChange={(e) => setClothing(e.target.value as Clothing)}
          >
            {CLOTHINGS.map((c) => (
              <option key={c} value={c}>
                {labelForClothing(c)}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="intro-start"
          disabled={!canStart}
        >
          Începe coșmarul
        </button>
      </form>
    </div>
  );
}
