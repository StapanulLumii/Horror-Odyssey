import { useEffect, useState } from "react";

interface Props {
  text: string;
  speed?: number;
  className?: string;
  onDone?: () => void;
}

export function TypewriterText({
  text,
  speed = 22,
  className,
  onDone,
}: Props) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let cancelled = false;
    let i = 0;
    const step = () => {
      if (cancelled) return;
      if (i >= text.length) {
        onDone?.();
        return;
      }
      i += 1;
      setShown(text.slice(0, i));
      setTimeout(step, speed);
    };
    const t = setTimeout(step, speed);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [text, speed, onDone]);

  const done = shown.length >= text.length;

  return (
    <p
      className={`${className ?? ""} ${done ? "" : "typewriter"}`.trim()}
      aria-label={text}
    >
      {shown}
    </p>
  );
}
