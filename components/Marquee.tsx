const items = ["Proposal", "Birthday", "Wedding", "All Event"];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div className="bg-[var(--green-main)] overflow-hidden py-3.5">
      <div className="flex gap-10 whitespace-nowrap animate-marquee w-max">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="text-[0.7rem] tracking-[0.2em] uppercase text-white/90 font-light">{item}</span>
            <span className="text-white/40 text-[0.45rem]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
