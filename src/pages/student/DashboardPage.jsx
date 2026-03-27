import { PETS, RARITY_COLORS } from "../../constants/pets";
import AvatarDisplay from "../../components/AvatarDisplay";
import CoinBadge from "../../components/ui/CoinBadge";
import Stars from "../../components/ui/Stars";

export default function DashboardPage({ student, allStudents }) {
  const level = Math.floor(student.coins / 50) + 1;
  const titles = [
    "ນ້ອງໃໝ່", "ນັກຮຽນ", "ນັກສະສົມ", "ນັກລ່າ", "ຜູ້ກ້າ",
    "ນັກຮົບ", "ແຊ້ມ", "ຈ້າວ", "ຕຳນານ",
  ];
  const title = titles[Math.min(level - 1, titles.length - 1)];
  const xpInLevel = student.coins % 50;
  const rank =
    [...allStudents]
      .sort((a, b) => b.coins - a.coins)
      .findIndex((s) => s.id === student.id) + 1;

  const activePet =
    student.activePetIndex >= 0 && student.pets[student.activePetIndex]
      ? (() => {
          const ref = student.pets[student.activePetIndex];
          const def = PETS.find((p) => p.id === ref.id);
          return def ? { ...def, stars: ref.stars } : null;
        })()
      : null;

  return (
    <div style={{ animation: "slideUp 0.4s ease" }}>
      {/* Profile Card */}
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--bg-card), rgba(6,214,160,0.08))",
          border: "1px solid var(--border)",
          borderRadius: 24,
          padding: 28,
          textAlign: "center",
          marginBottom: 20,
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <AvatarDisplay student={student} size={100} />
        </div>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "var(--text)",
            marginBottom: 4,
          }}
        >
          {student.name}
        </h2>
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            marginBottom: 12,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              background: "rgba(6,214,160,0.15)",
              border: "1px solid rgba(6,214,160,0.3)",
              borderRadius: 10,
              padding: "4px 14px",
              fontSize: 12,
              color: "var(--accent)",
              fontWeight: 600,
            }}
          >
            {student.grade}
          </span>
          <span
            style={{
              background: "rgba(255,209,102,0.15)",
              border: "1px solid rgba(255,209,102,0.3)",
              borderRadius: 10,
              padding: "4px 14px",
              fontSize: 12,
              color: "var(--accent2)",
              fontWeight: 600,
            }}
          >
            Lv.{level} {title}
          </span>
          <span
            style={{
              background: "rgba(239,71,111,0.15)",
              border: "1px solid rgba(239,71,111,0.3)",
              borderRadius: 10,
              padding: "4px 14px",
              fontSize: 12,
              color: "var(--accent3)",
              fontWeight: 600,
            }}
          >
            ອັນດັບ #{rank}
          </span>
        </div>
        <CoinBadge coins={student.coins} size="lg" />

        {/* XP Bar */}
        <div style={{ marginTop: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11,
              color: "var(--text-dim)",
              marginBottom: 4,
            }}
          >
            <span>Lv.{level}</span>
            <span>
              {xpInLevel}/50 ຫາ Lv.{level + 1}
            </span>
          </div>
          <div
            style={{
              height: 8,
              background: "rgba(50,60,100,0.4)",
              borderRadius: 4,
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: 4,
                width: `${(xpInLevel / 50) * 100}%`,
                background:
                  "linear-gradient(90deg, var(--accent), var(--accent2))",
                transition: "width 0.5s ease",
                boxShadow: "0 0 10px var(--glow-green)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          marginBottom: 20,
        }}
      >
        {[
          {
            icon: "✅",
            label: "ຕອບຖືກ",
            val: student.quizCorrect || 0,
            color: "var(--accent)",
          },
          {
            icon: "🐾",
            label: "ສັດລ້ຽງ",
            val: student.pets?.length || 0,
            color: "var(--accent2)",
          },
          {
            icon: "🛒",
            label: "ແລກແລ້ວ",
            val: student.redeemed || 0,
            color: "var(--accent3)",
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: "16px 12px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>
              {s.val}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-dim)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Battle Stats */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--bg-card), rgba(239,71,111,0.08))",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: "var(--accent3)" }}>
          🏟️ ສະໜາມ
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
          {[
            { label: "Lv.", val: student.battleLevel || 1, color: "var(--accent4)" },
            { label: "🏆", val: student.arenaRating || 1000, color: "var(--accent2)" },
            { label: "ຊະນະ", val: student.arenaWins || 0, color: "#2ecc71" },
            { label: "ແພ້", val: student.arenaLosses || 0, color: "#e74c3c" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 10, color: "var(--text-dim)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Pet */}
      {activePet && (
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: 20,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 44,
              animation: "float 3s ease-in-out infinite",
              background: `${RARITY_COLORS[activePet.rarity]?.bg || "#333"}55`,
              borderRadius: "50%",
              width: 70,
              height: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {activePet.emoji}
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-dim)" }}>
              ສັດລ້ຽງປະຈຳ
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color:
                  RARITY_COLORS[activePet.rarity]?.text || "#fff",
              }}
            >
              {activePet.name}
            </div>
            <Stars count={activePet.stars} />
          </div>
        </div>
      )}
    </div>
  );
}
