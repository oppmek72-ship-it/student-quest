export default function BattleLog({ log }) {
  if (!log || log.length === 0) return null;

  return (
    <div style={{
      maxHeight: 200, overflowY: "auto",
      background: "var(--bg-card)", borderRadius: 16,
      padding: 12, border: "1px solid var(--border)",
      scrollbarWidth: "thin",
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8, color: "var(--accent4)" }}>
        📜 ບັນທຶກການຕໍ່ສູ້
      </div>
      {log.map((entry, i) => (
        <div key={i} style={{
          fontSize: 11, padding: "4px 0",
          borderBottom: i < log.length - 1 ? "1px solid var(--border)" : "none",
          color: "var(--text)",
          opacity: 0.9,
        }}>
          {entry.type === "pet" ? (
            <span>
              <span style={{ opacity: 0.5 }}>T{entry.turn + 1}</span>{" "}
              {entry.petEmoji} <b>{entry.attackerName}</b> → {entry.abilityName}
              {entry.dmg > 0 && <span style={{ color: "#e74c3c" }}> -{entry.dmg}</span>}
              {entry.heal > 0 && <span style={{ color: "#2ecc71" }}> +{entry.heal}</span>}
              {entry.buff && <span style={{ color: "#f39c12" }}> {entry.buff.stat}+{entry.buff.amount}</span>}
            </span>
          ) : (
            <span>
              <span style={{ opacity: 0.5 }}>T{entry.turn + 1}</span>{" "}
              {entry.skillEmoji} <b>{entry.attackerName}</b> → {entry.skillName}
              {entry.dmg > 0 && <span style={{ color: "#e74c3c" }}> -{entry.dmg}</span>}
              {entry.heal > 0 && <span style={{ color: "#2ecc71" }}> +{entry.heal}</span>}
              {entry.buff && (
                <span style={{ color: "#f39c12" }}>
                  {" "}{entry.buff.target === "self" ? "+" : "-"}{entry.buff.stat}{Math.abs(entry.buff.amount)}
                </span>
              )}
              {entry.selfDmg > 0 && <span style={{ color: "#e67e22" }}> (ເຈັບ -{entry.selfDmg})</span>}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
