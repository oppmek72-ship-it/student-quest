import { SHOP_ITEMS } from "../../constants/shop";
import CoinBadge from "../../components/ui/CoinBadge";

export default function ShopPage({ student, onBuy }) {
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
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--accent3)" }}>
          🏪 ຮ້ານແລກຂອງ
        </h2>
        <CoinBadge coins={student.coins} />
      </div>

      <div
        style={{
          background: "rgba(239,71,111,0.08)",
          border: "1px solid rgba(239,71,111,0.2)",
          borderRadius: 14,
          padding: 14,
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 13, color: "var(--accent3)" }}>
          💡 ໃຊ້ຫຼຽນແລກເອົາຂອງແທ້ໄປໃຫ້ຄູ!
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SHOP_ITEMS.map((item) => {
          const canBuy = student.coins >= item.cost;
          return (
            <div
              key={item.id}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 18,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: canBuy ? 1 : 0.6,
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "rgba(239,71,111,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                }}
              >
                {item.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--text)",
                  }}
                >
                  {item.name}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-dim)" }}>
                  {item.desc}
                </div>
              </div>
              <button
                className={canBuy ? "btn-gold" : "btn-ghost"}
                onClick={() => canBuy && onBuy(item)}
                style={{
                  padding: "10px 16px",
                  fontSize: 13,
                  whiteSpace: "nowrap",
                }}
                disabled={!canBuy}
              >
                🪙 {item.cost}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
