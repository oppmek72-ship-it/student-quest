import { useState } from "react";
import { PETS, RARITY_COLORS } from "../../constants/pets";
import { findMergeablePairs, mergePets, getMaxStars } from "../../utils/petMerge";
import Stars from "../../components/ui/Stars";

export default function PetMergePage({ student, onMerge, onBack, showToast }) {
  const [selectedPair, setSelectedPair] = useState(null);
  const mergeablePairs = findMergeablePairs(student.pets || []);

  function doMerge(pair) {
    const petDef = PETS.find((p) => p.id === pair.petId);
    if (!petDef) return;

    const result = mergePets(
      student.pets,
      pair.indices[0],
      pair.indices[1],
      petDef
    );

    if (result.success) {
      onMerge(result.pets);
      showToast(
        `✨ ຮວມ ${petDef.emoji} ${petDef.name} ສຳເລັດ! ⭐${result.mergedPet.stars}`
      );
      setSelectedPair(null);
    } else {
      showToast(`❌ ${result.reason}`);
    }
  }

  return (
    <div style={{ animation: "slideUp 0.4s ease" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--accent2)" }}>
          🔀 ຮວມສັດລ້ຽງ
        </h2>
        <button
          className="btn-ghost"
          onClick={onBack}
          style={{ padding: "8px 16px" }}
        >
          ← ກັບ
        </button>
      </div>

      <div
        style={{
          background: "rgba(255,209,102,0.08)",
          border: "1px solid rgba(255,209,102,0.2)",
          borderRadius: 14,
          padding: 14,
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 13, color: "var(--accent2)" }}>
          💡 ຮວມ 2 ໂຕທີ່ຄືກັນ (ດາວເທົ່າກັນ) → ໄດ້ 1 ໂຕ ດາວສູງຂຶ້ນ!
        </span>
      </div>

      {mergeablePairs.length === 0 ? (
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: 40,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>🤷</div>
          <p style={{ color: "var(--text-dim)", fontSize: 14 }}>
            ບໍ່ມີຄູ່ທີ່ຮວມໄດ້ — ຫາສັດລ້ຽງຊ້ຳເພີ່ມ!
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {mergeablePairs.map((pair) => {
            const petDef = PETS.find((p) => p.id === pair.petId);
            if (!petDef) return null;
            const rc = RARITY_COLORS[petDef.rarity];
            const maxStars = getMaxStars(petDef.rarity);
            const canMerge = pair.stars < maxStars;

            return (
              <div
                key={pair.key}
                style={{
                  background: `linear-gradient(135deg, ${rc.bg}cc, ${rc.bg}88)`,
                  border: `2px solid ${rc.text}44`,
                  borderRadius: 20,
                  padding: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div style={{ fontSize: 40 }}>{petDef.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: rc.text,
                    }}
                  >
                    {petDef.name} x{pair.count}
                  </div>
                  <div style={{ fontSize: 12, marginTop: 2 }}>
                    <Stars count={pair.stars} /> → <Stars count={pair.stars + 1} />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-dim)",
                      marginTop: 4,
                    }}
                  >
                    ດາວສູງສຸດ: {maxStars}
                  </div>
                </div>
                <button
                  className={canMerge ? "btn-gold" : "btn-ghost"}
                  style={{ padding: "10px 16px", fontSize: 13 }}
                  onClick={() => canMerge && doMerge(pair)}
                  disabled={!canMerge}
                >
                  {canMerge ? "🔀 ຮວມ" : "MAX"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
