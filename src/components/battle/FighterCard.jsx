import PixelAvatar from "../avatar/PixelAvatar";

export default function FighterCard({ fighter, isPlayer, compact }) {
  const { stats } = fighter;
  const hpPct = Math.max(0, (stats.hp / stats.maxHp) * 100);
  const hpColor = hpPct > 50 ? "#2ecc71" : hpPct > 25 ? "#f39c12" : "#e74c3c";

  if (compact) {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "var(--bg-card)", borderRadius: 16,
        padding: "10px 14px", border: "1px solid var(--border)",
      }}>
        <PixelAvatar avatar={fighter.avatar} size={48} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{fighter.name}</div>
          <div style={{ fontSize: 11, color: "var(--text-dim)" }}>
            Lv.{fighter.level} | HP {stats.hp}/{stats.maxHp}
          </div>
          <div style={{
            height: 6, borderRadius: 3, background: "var(--bg-dark)",
            marginTop: 4, overflow: "hidden",
          }}>
            <div style={{
              width: `${hpPct}%`, height: "100%",
              background: hpColor, borderRadius: 3,
              transition: "width 0.5s ease",
            }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "var(--bg-card)", borderRadius: 20,
      padding: 16, border: isPlayer ? "2px solid var(--accent4)" : "1px solid var(--border)",
      textAlign: "center",
    }}>
      <PixelAvatar avatar={fighter.avatar} size={80} animate />
      <div style={{ fontWeight: 800, fontSize: 16, marginTop: 8 }}>{fighter.name}</div>
      <div style={{ fontSize: 12, color: "var(--accent4)", fontWeight: 600 }}>
        Lv.{fighter.level}
      </div>

      {/* HP Bar */}
      <div style={{ margin: "8px 0 4px", fontSize: 11, color: "var(--text-dim)" }}>
        HP {stats.hp}/{stats.maxHp}
      </div>
      <div style={{
        height: 8, borderRadius: 4, background: "var(--bg-dark)",
        overflow: "hidden",
      }}>
        <div style={{
          width: `${hpPct}%`, height: "100%",
          background: hpColor, borderRadius: 4,
          transition: "width 0.5s ease",
        }} />
      </div>

      {/* Stats */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 4, marginTop: 10, fontSize: 11,
      }}>
        <StatChip label="ATK" value={stats.atk} color="#e74c3c" />
        <StatChip label="DEF" value={stats.def} color="#3498db" />
        <StatChip label="MATK" value={stats.matk} color="#9b59b6" />
        <StatChip label="MDEF" value={stats.mdef} color="#1abc9c" />
      </div>

      {/* Pet */}
      {fighter.pet && (
        <div style={{
          marginTop: 8, fontSize: 11, color: "var(--text-dim)",
          background: "var(--bg-dark)", borderRadius: 10, padding: "4px 8px",
        }}>
          {fighter.pet.emoji} {fighter.pet.name} ⭐{fighter.pet.stars}
        </div>
      )}

      {/* Skills */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 8, flexWrap: "wrap" }}>
        {fighter.skills.map((sk) => (
          <span key={sk.id} style={{
            fontSize: 18, cursor: "default",
          }} title={sk.name}>
            {sk.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatChip({ label, value, color }) {
  return (
    <div style={{
      background: `${color}15`, borderRadius: 8,
      padding: "2px 6px", color, fontWeight: 600,
    }}>
      {label} {value}
    </div>
  );
}
