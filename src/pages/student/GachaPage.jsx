import { useState } from "react";
import { PETS, RARITY_COLORS, GACHA_COST } from "../../constants/pets";
import { getGachaResult } from "../../utils/gacha";
import CoinBadge from "../../components/ui/CoinBadge";
import PetCard from "../../components/PetCard";
import Stars from "../../components/ui/Stars";
import PetMergePage from "./PetMergePage";

export default function GachaPage({ student, onGacha, onPetMerge, showToast }) {
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [view, setView] = useState("main"); // main | collection | merge

  function doGacha() {
    if (student.coins < GACHA_COST || spinning) return;
    setSpinning(true);
    setResult(null);
    setTimeout(() => {
      const pet = getGachaResult();
      setResult(pet);
      setSpinning(false);
      onGacha(pet);
    }, 1800);
  }

  if (view === "merge") {
    return (
      <PetMergePage
        student={student}
        onMerge={onPetMerge}
        onBack={() => setView("collection")}
        showToast={showToast}
      />
    );
  }

  if (view === "collection") {
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
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "var(--accent2)",
            }}
          >
            🐾 ສັດລ້ຽງຂອງຂ້ອຍ
          </h2>
          <button
            className="btn-ghost"
            onClick={() => setView("main")}
            style={{ padding: "8px 16px" }}
          >
            ← ກັບ
          </button>
        </div>
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: 20,
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: 14, color: "var(--text-dim)" }}>
            ສະສົມໄດ້{" "}
          </span>
          <span
            style={{ fontSize: 20, fontWeight: 800, color: "var(--accent2)" }}
          >
            {student.pets?.length || 0}
          </span>
          <span style={{ fontSize: 14, color: "var(--text-dim)" }}>
            {" "}
            ໂຕ
          </span>
        </div>

        {/* Merge button */}
        {student.pets?.length >= 2 && (
          <button
            className="btn-gold"
            style={{ width: "100%", marginBottom: 16, padding: 12 }}
            onClick={() => setView("merge")}
          >
            🔀 ຮວມສັດລ້ຽງ (ເພີ່ມດາວ)
          </button>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
          }}
        >
          {PETS.map((p) => {
            const ownedInstances = student.pets?.filter(
              (op) => op.id === p.id
            );
            const isOwned = ownedInstances && ownedInstances.length > 0;
            const maxStars = isOwned
              ? Math.max(...ownedInstances.map((o) => o.stars))
              : p.stars;

            return (
              <div
                key={p.id}
                onClick={() => {
                  if (isOwned) {
                    // Set as active pet
                    const bestIdx = student.pets.findIndex(
                      (op) => op.id === p.id && op.stars === maxStars
                    );
                    if (bestIdx >= 0) {
                      onGacha({ ...p, stars: maxStars }, true);
                    }
                  }
                }}
                style={{
                  cursor: isOwned ? "pointer" : "default",
                  position: "relative",
                }}
              >
                <PetCard
                  pet={p}
                  owned={isOwned}
                  small
                  displayStars={maxStars}
                />
                {isOwned && ownedInstances.length > 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      background: "var(--accent3)",
                      color: "white",
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      fontSize: 11,
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {ownedInstances.length}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
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
        <h2
          style={{ fontSize: 22, fontWeight: 800, color: "var(--accent2)" }}
        >
          🎰 ກາຊາ ສັດລ້ຽງ
        </h2>
        <CoinBadge coins={student.coins} />
      </div>

      <div
        style={{
          background:
            "linear-gradient(135deg, var(--bg-card), rgba(255,209,102,0.05))",
          border: "1px solid var(--border)",
          borderRadius: 28,
          padding: "36px 24px",
          textAlign: "center",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        }}
      >
        {/* Machine */}
        <div
          style={{
            width: 160,
            height: 160,
            margin: "0 auto 24px",
            borderRadius: "50%",
            background: spinning
              ? "conic-gradient(var(--accent), var(--accent2), var(--accent3), var(--accent4), var(--accent))"
              : "radial-gradient(circle, rgba(255,209,102,0.15), rgba(6,214,160,0.05))",
            border: `4px solid ${spinning ? "var(--accent2)" : "var(--border)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: spinning ? "spin 0.6s linear infinite" : "none",
            transition: "all 0.3s",
            boxShadow: spinning
              ? "0 0 40px var(--glow-gold), 0 0 80px var(--glow-gold)"
              : "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          {spinning ? (
            <span
              style={{
                fontSize: 48,
                animation: "spin 0.3s linear infinite reverse",
              }}
            >
              ❓
            </span>
          ) : result ? (
            <div style={{ animation: "popIn 0.5s ease" }}>
              <div style={{ fontSize: 56 }}>{result.emoji}</div>
            </div>
          ) : (
            <span style={{ fontSize: 48 }}>🎁</span>
          )}
        </div>

        {/* Result */}
        {result && !spinning && (
          <div style={{ animation: "popIn 0.4s ease", marginBottom: 20 }}>
            <div
              style={{
                fontSize: 12,
                color: RARITY_COLORS[result.rarity].text,
                background: `${RARITY_COLORS[result.rarity].bg}88`,
                display: "inline-block",
                padding: "4px 16px",
                borderRadius: 10,
                marginBottom: 8,
                border: `1px solid ${RARITY_COLORS[result.rarity].text}44`,
              }}
            >
              {RARITY_COLORS[result.rarity].label}
            </div>
            <h3
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: RARITY_COLORS[result.rarity].text,
              }}
            >
              {result.emoji} {result.name}!
            </h3>
            <div style={{ marginTop: 4 }}>
              <Stars count={result.stars} />
            </div>
            {student.pets?.filter((p) => p.id === result.id).length > 1 && (
              <p
                style={{
                  fontSize: 12,
                  color: "var(--accent2)",
                  marginTop: 8,
                  fontWeight: 600,
                }}
              >
                ✨ ມີແລ້ວ — ສາມາດຮວມເພີ່ມດາວໄດ້!
              </p>
            )}
          </div>
        )}

        <button
          className="btn-gold"
          onClick={doGacha}
          disabled={student.coins < GACHA_COST || spinning}
          style={{
            width: "100%",
            padding: 16,
            fontSize: 18,
            marginBottom: 12,
            opacity: student.coins < GACHA_COST ? 0.5 : 1,
          }}
        >
          {spinning
            ? "⏳ ກຳລັງຊຸ່ມ..."
            : `🎰 ຊຸ່ມ 1 ໂຕ (${GACHA_COST} 🪙)`}
        </button>

        {/* Rates */}
        <div
          style={{
            background: "rgba(10,14,39,0.5)",
            borderRadius: 14,
            padding: 14,
            marginBottom: 16,
          }}
        >
          <div
            style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 8 }}
          >
            📊 ອັດຕາການອອກ:
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              justifyContent: "center",
            }}
          >
            {Object.entries(RARITY_COLORS).map(([k, v]) => {
              const rates = {
                common: "60%",
                uncommon: "22%",
                rare: "12%",
                epic: "5%",
                legendary: "1%",
              };
              return (
                <span
                  key={k}
                  style={{
                    fontSize: 10,
                    padding: "3px 10px",
                    borderRadius: 8,
                    background: `${v.bg}88`,
                    color: v.text,
                    border: `1px solid ${v.text}33`,
                  }}
                >
                  {v.label} {rates[k]}
                </span>
              );
            })}
          </div>
        </div>

        <button
          className="btn-ghost"
          onClick={() => setView("collection")}
          style={{ width: "100%" }}
        >
          🐾 ເບິ່ງສັດລ້ຽງທັງໝົດ ({student.pets?.length || 0}/{PETS.length})
        </button>
      </div>
    </div>
  );
}
