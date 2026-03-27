export default function CoinBadge({ coins, size = "md" }) {
  const s =
    size === "lg"
      ? { font: 22, pad: "8px 18px", icon: 24 }
      : { font: 14, pad: "4px 12px", icon: 16 };
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background:
          "linear-gradient(135deg, rgba(255,209,102,0.2), rgba(255,209,102,0.08))",
        border: "1px solid rgba(255,209,102,0.3)",
        borderRadius: 20,
        padding: s.pad,
      }}
    >
      <span style={{ fontSize: s.icon }}>🪙</span>
      <span
        style={{ fontSize: s.font, fontWeight: 800, color: "var(--accent2)" }}
      >
        {coins}
      </span>
    </div>
  );
}
