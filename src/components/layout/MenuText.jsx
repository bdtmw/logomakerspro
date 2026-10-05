// Splits a menu label into per-letter spans for the theme's hover animation (".menu-anim > li > a").
export default function MenuText({ children }) {
  const letters = Array.from(String(children));
  return (
    <div className="menu-text">
      {letters.map((ch, i) => (
        <span key={i} style={ch === ' ' ? { width: '0.33em' } : undefined}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </div>
  );
}
