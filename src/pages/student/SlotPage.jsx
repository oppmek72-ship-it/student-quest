import { useState } from "react";
import { SLOT_SYMBOLS, SLOT_COST } from "../../constants/slot";
import CoinBadge from "../../components/ui/CoinBadge";

export default function SlotPage({ student, onSlotWin }) {
  const [reels, setReels] = useState(["❓", "❓", "❓"]);
  const [spinning, setSpinning] = useState(false);
  const [won, setWon] = useState(null);

  function spin() {
    if (student.coins < SLOT_COST || spinning) return;
    setSpinning(true);
    setWon(null);

    setTimeout(() => {
      const r1 = SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];
      const r2 = SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];
      const r3 = SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];
      setReels([r1, r2, r3]);
      setSpinning(false);

      let prize = 0;
      if (r1 === r2 && r2 === r3) {
        prize =
          r1 === "7️⃣" ? 50 : r1 === "💎" ? 30 : r1 === "⭐" ? 20 : 15;
      } else if (r1 === r2 || r2 === r3 || r1 === r3) {
        prize = 3;
      }

      // BUG FIX: Atomic deduction — deduct cost and add prize in one call
      const netAmount = prize - SLOT_COST;
      onSlotWin(netAmount);
      setWon(prize > 0 ? prize : null);
    }, 1200);
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
          🎰 ສະລ໋ອດ
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
        {/* Reels */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          {reels.map((sym, i) => (
            <div
              key={i}
              style={{
                width: 80,
                height: 90,
                borderRadius: 16,
                background: "rgba(10,14,39,0.8)",
                border: "2px solid var(--accent2)33",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 42,
                boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
                animation: spinning
                  ? `shake 0.1s linear infinite`
                  : won
                  ? "popIn 0.3s ease"
                  : "none",
                animationDelay: spinning ? `${i * 0.05}s` : "0s",
              }}
            >
              {spinning
                ? SLOT_SYMBOLS[
                    Math.floor(Math.random() * SLOT_SYMBOLS.length)
                  ]
                : sym}
            </div>
          ))}
        </div>

        {/* Result */}
        {won !== null && !spinning && (
          <div
            style={{
              animation: "popIn 0.4s ease",
              marginBottom: 20,
              background:
                won > 5
                  ? "rgba(255,209,102,0.15)"
                  : "rgba(6,214,160,0.1)",
              borderRadius: 16,
              padding: 16,
              border: `1px solid ${
                won > 5
                  ? "rgba(255,209,102,0.3)"
                  : "rgba(6,214,160,0.2)"
              }`,
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 4 }}>
              {won > 10 ? "🎊" : "🎉"}
            </div>
            <div
              style={{ fontSize: 20, fontWeight: 800, color: "var(--accent2)" }}
            >
              +{won} ຫຼຽນ!
            </div>
          </div>
        )}

        {won === null && !spinning && reels[0] !== "❓" && (
          <div
            style={{
              animation: "fadeIn 0.3s",
              marginBottom: 20,
              fontSize: 14,
              color: "var(--text-dim)",
            }}
          >
            😅 ບໍ່ຖືກ ລອງອີກ!
          </div>
        )}

        <button
          className="btn-gold"
          onClick={spin}
          disabled={student.coins < SLOT_COST || spinning}
          style={{
            width: "100%",
            padding: 16,
            fontSize: 18,
            opacity: student.coins < SLOT_COST ? 0.5 : 1,
          }}
        >
          {spinning ? "⏳ ໝຸນຢູ່..." : `🎰 ໝຸນ! (${SLOT_COST} 🪙)`}
        </button>

        <div
          style={{
            background: "rgba(10,14,39,0.5)",
            borderRadius: 14,
            padding: 14,
            marginTop: 16,
            fontSize: 12,
            color: "var(--text-dim)",
            lineHeight: 1.8,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginBottom: 4,
              color: "var(--text)",
            }}
          >
            💰 ລາງວັນ:
          </div>
          <div>
            7️⃣7️⃣7️⃣ = 50 ຫຼຽນ &nbsp; 💎💎💎 = 30 ຫຼຽນ
          </div>
          <div>
            ⭐⭐⭐ = 20 ຫຼຽນ &nbsp; ອື່ນໆ 3 ອັນຄື = 15
          </div>
          <div>2 ອັນຄື = 3 ຫຼຽນ</div>
        </div>
      </div>
    </div>
  );
}
