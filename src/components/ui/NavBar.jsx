const NAV_ITEMS = [
  { key: "home", icon: "🏠", label: "ໜ້າຫຼັກ" },
  { key: "quiz", icon: "📝", label: "ຕອບ" },
  { key: "slot", icon: "🎰", label: "ສະລ໋ອດ" },
  { key: "gacha", icon: "🎁", label: "ກາຊາ" },
  { key: "shop", icon: "🏪", label: "ຮ້ານ" },
  { key: "avatar", icon: "👤", label: "ແຕ່ງໂຕ" },
  { key: "arena", icon: "🏟️", label: "ສະໜາມ" },
  { key: "rank", icon: "🏆", label: "ອັນດັບ" },
];

export default function NavBar({ tab, onTabChange }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(10,14,39,0.95)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--border)",
        paddingBottom: "max(6px, env(safe-area-inset-bottom))",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          maxWidth: 500,
          margin: "0 auto",
          padding: "6px 4px",
        }}
      >
        {NAV_ITEMS.map((n) => (
          <button
            key={n.key}
            onClick={() => onTabChange(n.key)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              background:
                tab === n.key ? "rgba(6,214,160,0.12)" : "transparent",
              border: "none",
              borderRadius: 12,
              padding: "6px 8px",
              cursor: "pointer",
              color: tab === n.key ? "var(--accent)" : "var(--text-dim)",
              transition: "all 0.2s",
              minWidth: 44,
              fontFamily: "'Noto Sans Lao',sans-serif",
            }}
          >
            <span style={{ fontSize: 20 }}>{n.icon}</span>
            <span
              style={{ fontSize: 9, fontWeight: tab === n.key ? 700 : 500 }}
            >
              {n.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
