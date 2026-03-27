export default function TeacherDashboard({ students, questions, categories }) {
  const totalCoins = students.reduce((sum, s) => sum + s.coins, 0);
  const totalCorrect = students.reduce(
    (sum, s) => sum + (s.quizCorrect || 0),
    0
  );
  const totalPets = students.reduce(
    (sum, s) => sum + (s.pets?.length || 0),
    0
  );

  const stats = [
    { icon: "👨‍🎓", label: "ນັກຮຽນ", val: students.length, color: "var(--accent)" },
    { icon: "📝", label: "ຄຳຖາມ", val: questions.length, color: "var(--accent4)" },
    { icon: "📂", label: "ໝວດ", val: categories.length, color: "var(--accent2)" },
    { icon: "🪙", label: "ລວມ Coins", val: totalCoins, color: "var(--accent2)" },
    { icon: "✅", label: "ລວມຕອບຖືກ", val: totalCorrect, color: "var(--accent)" },
    { icon: "🐾", label: "ລວມສັດລ້ຽງ", val: totalPets, color: "var(--accent3)" },
  ];

  // Top students
  const topStudents = [...students]
    .sort((a, b) => b.coins - a.coins)
    .slice(0, 5);

  return (
    <div style={{ animation: "slideUp 0.4s ease" }}>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: "var(--accent)",
          marginBottom: 16,
        }}
      >
        📊 ພາບລວມ
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          marginBottom: 24,
        }}
      >
        {stats.map((s, i) => (
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

      {/* Top Students */}
      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "var(--text)",
          marginBottom: 12,
        }}
      >
        🏆 Top 5 ນັກຮຽນ
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {topStudents.length === 0 ? (
          <p style={{ color: "var(--text-dim)", fontSize: 14, padding: 20, textAlign: "center" }}>
            ຍັງບໍ່ມີນັກຮຽນ
          </p>
        ) : (
          topStudents.map((s, i) => (
            <div
              key={s.id}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background:
                    i < 3
                      ? "linear-gradient(135deg, var(--accent2), #e6b800)"
                      : "rgba(50,60,100,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 800,
                  color: i < 3 ? "#0a0e27" : "var(--text-dim)",
                }}
              >
                {["🥇", "🥈", "🥉"][i] || i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--text)",
                  }}
                >
                  {s.name}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-dim)" }}>
                  {s.grade} · ✅{s.quizCorrect || 0}
                </div>
              </div>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: "var(--accent2)",
                }}
              >
                🪙 {s.coins}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
