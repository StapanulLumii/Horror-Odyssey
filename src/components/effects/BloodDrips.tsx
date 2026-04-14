export function BloodDrips() {
  const drips = [
    { left: "8%", delay: "0s", dur: "6s", len: 40 },
    { left: "22%", delay: "1.4s", dur: "8s", len: 65 },
    { left: "41%", delay: "3.1s", dur: "7s", len: 30 },
    { left: "60%", delay: "0.7s", dur: "9s", len: 80 },
    { left: "78%", delay: "2.2s", dur: "7.5s", len: 50 },
    { left: "92%", delay: "4s", dur: "6.5s", len: 35 },
  ];
  return (
    <div className="fx-layer fx-blood" aria-hidden="true">
      {drips.map((d, i) => (
        <span
          key={i}
          className="blood-drip"
          style={{
            left: d.left,
            animationDelay: d.delay,
            animationDuration: d.dur,
            ["--len" as string]: `${d.len}px`,
          }}
        />
      ))}
    </div>
  );
}
