import { useState } from "react";
import { PETS } from "../../constants/pets";
import AvatarDisplay from "../../components/AvatarDisplay";
import CoinBadge from "../../components/ui/CoinBadge";

export default function LeaderboardPage({ students, currentId }) {
  const [mode, setMode] = useState("coins"); // "coins" | "arena"
  const medals = ["🥇", "🥈", "🥉"];

  const sorted = [...students].sort((a, b) =>
    mode === "arena"
      ? (b.arenaRating || 1000) - (a.arenaRating || 1000)
      : b.coins - a.coins
  );

  return (
    <div style={{ animation: "slideUp 0.4s ease" }}>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: "var(--accent)",
          marginBottom: 12,
        }}
      >
        🏆 ອັນດັບທັງໝົດ
      </h2>

      {/* Toggle */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[
          { key: "coins", label: "🪙 ຫຼຽນ" },
          { key: "arena", label: "🏟️ ສະໜາມ" },
        ].map((m) => (
          <button
            key={m.key}
            className={mode === m.key ? "btn-primary" : "btn-ghost"}
            style={{ padding: "6px 14px", fontSize: 12, borderRadius: 20 }}
            onClick={() => setMode(m.key)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sorted.map((s, i) => {
          const isCurrent = s.id === currentId;
          const activePetRef =
            s.activePetIndex >= 0 && s.pets?.[s.activePetIndex]
              ? s.pets[s.activePetIndex]
              : null;
          const activePetDef = activePetRef
            ? PETS.find((p) => p.id === activePetRef.id)
            : null;

          return (
            <div
              key={s.id}
              style={{
                background: isCurrent
                  ? "rgba(6,214,160,0.1)"
                  : "var(--bg-card)",
                border: isCurrent
                  ? "2px solid var(--accent)"
                  : "1px solid var(--border)",
                borderRadius: 16,
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                animation: isCurrent ? "glow 2s infinite" : "none",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background:
                    i < 3
                      ? "linear-gradient(135deg, var(--accent2), #e6b800)"
                      : "rgba(50,60,100,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: i < 3 ? 20 : 14,
                  fontWeight: 800,
                  color: i < 3 ? "#0a0e27" : "var(--text-dim)",
                }}
              >
                {i < 3 ? medals[i] : i + 1}
              </div>
              <AvatarDisplay student={s} size={42} />
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}
                >
                  {s.name}{" "}
                  {isCurrent && (
                    <span style={{ fontSize: 11, color: "var(--accent)" }}>
                      (ເຈົ້າ)
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-dim)" }}>
                  {s.grade} · {mode === "arena"
                    ? `Lv.${s.battleLevel || 1} · W${s.arenaWins || 0}/L${s.arenaLosses || 0}`
                    : `Lv.${Math.floor(s.coins / 50) + 1}`}
                </div>
              </div>
              {mode === "arena" ? (
                <div style={{
                  fontWeight: 800, fontSize: 16,
                  color: "var(--accent2)",
                }}>
                  🏆 {s.arenaRating || 1000}
                </div>
              ) : (
                <CoinBadge coins={s.coins} />
              )}
              {activePetDef && (
                <span style={{ fontSize: 22 }}>{activePetDef.emoji}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
