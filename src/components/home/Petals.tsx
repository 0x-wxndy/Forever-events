export function Petals() {
  const petals = [
    { left: "8%", delay: "0s", duration: "14s", size: 11 },
    { left: "18%", delay: "2s", duration: "16s", size: 8 },
    { left: "32%", delay: "5s", duration: "13s", size: 12 },
    { left: "47%", delay: "1.5s", duration: "18s", size: 9 },
    { left: "61%", delay: "3s", duration: "15s", size: 10 },
    { left: "74%", delay: "6s", duration: "17s", size: 8 },
    { left: "86%", delay: "0.8s", duration: "14s", size: 11 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((petal) => (
        <span
          key={petal.left}
          className="petal"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            width: petal.size,
            height: petal.size + 4,
          }}
        />
      ))}
      <span className="sparkle left-[18%] top-[28%]" />
      <span className="sparkle left-[70%] top-[22%] [animation-delay:1.2s]" />
      <span className="sparkle left-[42%] top-[62%] [animation-delay:2s]" />
      <span className="sparkle right-[16%] top-[48%] [animation-delay:.6s]" />
    </div>
  );
}
