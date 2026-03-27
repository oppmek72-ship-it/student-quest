import { BATTLE_SKILLS } from "../../constants/battle";
import CoinBadge from "../ui/CoinBadge";

export default function SkillShop({ student, onBuy, onEquip, showToast }) {
  const owned = student.ownedSkills || [];
  const equipped = student.equippedSkills || [null, null, null, null];
  const buyable = BATTLE_SKILLS.filter((sk) => sk.cost > 0);

  const rarityColor = (r) =>
    r === "epic" ? "#9B59B6" : r === "rare" ? "#3498DB" : null;

  return (
    <div>
      {/* Equipped Skills */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: "var(--accent4)" }}>
          🎯 ທ່າທີ່ໃສ່ ({equipped.filter(Boolean).length}/4)
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
          {equipped.map((skId, i) => {
            const sk = skId ? BATTLE_SKILLS.find((s) => s.id === skId) : null;
            return (
              <div
                key={i}
                style={{
                  background: sk ? "rgba(17,138,178,0.15)" : "var(--bg-dark)",
                  border: sk ? "2px solid var(--accent4)" : "2px dashed var(--border)",
                  borderRadius: 14, padding: "10px 4px",
                  textAlign: "center", minHeight: 60,
                  cursor: sk ? "pointer" : "default",
                }}
                onClick={() => {
                  if (sk) {
                    onEquip(i, null);
                    showToast?.("✅ ຖອດແລ້ວ");
                  }
                }}
              >
                {sk ? (
                  <>
                    <div style={{ fontSize: 22 }}>{sk.emoji}</div>
                    <div style={{ fontSize: 10, fontWeight: 600, marginTop: 2 }}>{sk.name}</div>
                  </>
                ) : (
                  <div style={{ fontSize: 20, opacity: 0.3 }}>+</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Owned skills (not equipped) — tap to equip */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
          📦 ທ່າທີ່ມີ
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {owned
            .filter((id) => !equipped.includes(id))
            .map((id) => {
              const sk = BATTLE_SKILLS.find((s) => s.id === id);
              if (!sk) return null;
              return (
                <button
                  key={id}
                  onClick={() => {
                    const emptySlot = equipped.indexOf(null);
                    if (emptySlot >= 0) {
                      onEquip(emptySlot, id);
                      showToast?.(`✅ ໃສ່ ${sk.name}`);
                    } else {
                      showToast?.("❌ ຊ່ອງເຕັມ! ຖອດກ່ອນ");
                    }
                  }}
                  style={{
                    background: "var(--bg-card)", border: "1px solid var(--border)",
                    borderRadius: 12, padding: "8px 12px",
                    textAlign: "center", cursor: "pointer",
                    color: "var(--text)", fontFamily: "inherit",
                  }}
                >
                  <span style={{ fontSize: 18 }}>{sk.emoji}</span>
                  <div style={{ fontSize: 10, fontWeight: 600, marginTop: 2 }}>{sk.name}</div>
                </button>
              );
            })}
        </div>
      </div>

      {/* Shop */}
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>🛒 ຮ້ານທ່າ</span>
        <CoinBadge coins={student.coins} />
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 8,
      }}>
        {buyable.map((sk) => {
          const isOwned = owned.includes(sk.id);
          const canBuy = student.coins >= sk.cost;
          const rc = rarityColor(sk.rarity);

          return (
            <div
              key={sk.id}
              onClick={() => {
                if (isOwned) return;
                if (!canBuy) {
                  showToast?.("❌ ຫຼຽນບໍ່ພໍ!");
                  return;
                }
                onBuy(sk.id, sk.cost);
                showToast?.(`✅ ຊື້ ${sk.name} ແລ້ວ!`);
              }}
              style={{
                background: isOwned ? "rgba(46,204,113,0.08)" : "var(--bg-card)",
                border: rc ? `1px solid ${rc}55` : "1px solid var(--border)",
                borderRadius: 16, padding: 12,
                textAlign: "center",
                cursor: isOwned ? "default" : "pointer",
                opacity: isOwned ? 0.7 : canBuy ? 1 : 0.5,
                position: "relative",
              }}
            >
              <div style={{ fontSize: 26 }}>{sk.emoji}</div>
              <div style={{
                fontSize: 13, fontWeight: 700, marginTop: 4,
                color: rc || "var(--text)",
              }}>
                {sk.name}
              </div>
              <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 2 }}>
                {sk.desc}
              </div>
              <div style={{ fontSize: 11, marginTop: 4 }}>
                {sk.type === "physical" && <span>⚔️ {sk.hits ? `${sk.power}×${sk.hits}` : sk.power}</span>}
                {sk.type === "magic" && <span>✨ {sk.power}</span>}
                {sk.type === "heal" && <span>💚 {sk.power}</span>}
                {sk.type === "defend" && <span>🛡️ +{sk.power}</span>}
                {sk.type === "buff_mdef" && <span>🔮 +{sk.power}</span>}
              </div>
              {isOwned ? (
                <div style={{ fontSize: 10, color: "#2ecc71", fontWeight: 600, marginTop: 4 }}>
                  ✅ ມີແລ້ວ
                </div>
              ) : (
                <div style={{ fontSize: 12, color: "var(--accent2)", fontWeight: 700, marginTop: 4 }}>
                  🪙 {sk.cost}
                </div>
              )}
              {rc && (
                <div style={{
                  position: "absolute", top: 4, right: 4,
                  width: 6, height: 6, borderRadius: "50%",
                  background: rc, boxShadow: `0 0 6px ${rc}`,
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
