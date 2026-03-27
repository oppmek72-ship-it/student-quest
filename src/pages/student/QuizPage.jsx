import { useState } from "react";
import CoinBadge from "../../components/ui/CoinBadge";

export default function QuizPage({ student, questions, categories, onAnswer, quizRemaining = 5 }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [qIdx, setQIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [streak, setStreak] = useState(0);
  const [usedIds, setUsedIds] = useState([]);

  const filteredQuestions =
    selectedCategory === "all"
      ? questions
      : questions.filter((q) => q.categoryId === selectedCategory);

  const availableQuestions = filteredQuestions.filter(
    (q) => !usedIds.includes(q.id)
  );

  const q =
    availableQuestions.length > 0 ? availableQuestions[0] : filteredQuestions[0];

  // BUG FIX: streak >= 5 must be checked BEFORE streak >= 3
  const bonus = streak >= 5 ? 3 : streak >= 3 ? 2 : 0;

  if (!q || filteredQuestions.length === 0) {
    return (
      <div style={{ animation: "slideUp 0.4s ease", textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>
          ບໍ່ມີຄຳຖາມ
        </h2>
        <p style={{ color: "var(--text-dim)", fontSize: 14 }}>
          ຄູຍັງບໍ່ໄດ້ສ້າງຄຳຖາມ{selectedCategory !== "all" ? " ໃນໝວດນີ້" : ""}
        </p>
        {selectedCategory !== "all" && (
          <button className="btn-ghost" style={{ marginTop: 16 }} onClick={() => setSelectedCategory("all")}>
            ເບິ່ງທຸກໝວດ
          </button>
        )}
      </div>
    );
  }

  const limitReached = quizRemaining <= 0;

  function handleAnswer(i) {
    if (answered !== null || limitReached) return;
    setAnswered(i);
    if (i === q.correctIndex) {
      const total = q.coins + bonus;
      onAnswer(total);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  }

  function nextQ() {
    setUsedIds((prev) => [...prev, q.id]);
    setAnswered(null);
    // Reset used IDs if we've gone through all questions
    if (usedIds.length + 1 >= filteredQuestions.length) {
      setUsedIds([]);
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
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--accent)" }}>
          📝 ຕອບຄຳຖາມ
        </h2>
        <CoinBadge coins={student.coins} />
      </div>

      {/* Daily Limit Banner */}
      <div
        style={{
          background: limitReached
            ? "rgba(239,71,111,0.12)"
            : "rgba(17,138,178,0.12)",
          border: limitReached
            ? "1px solid rgba(239,71,111,0.3)"
            : "1px solid rgba(17,138,178,0.3)",
          borderRadius: 14,
          padding: "10px 16px",
          marginBottom: 14,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: limitReached ? "var(--accent3)" : "var(--accent4)",
          }}
        >
          {limitReached
            ? "⛔ ໝົດໂຄຕ້າມື້ນີ້ແລ້ວ! ມາໃໝ່ມື້ອື່ນ"
            : `📝 ເຫຼືອ ${quizRemaining}/5 ຄຳຖາມມື້ນີ້`}
        </span>
      </div>

      {/* Category Filter */}
      {categories.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 14,
            flexWrap: "wrap",
          }}
        >
          <button
            className={selectedCategory === "all" ? "btn-primary" : "btn-ghost"}
            style={{ padding: "6px 14px", fontSize: 12 }}
            onClick={() => {
              setSelectedCategory("all");
              setUsedIds([]);
            }}
          >
            ທັງໝົດ
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={
                selectedCategory === cat.id ? "btn-primary" : "btn-ghost"
              }
              style={{ padding: "6px 14px", fontSize: 12 }}
              onClick={() => {
                setSelectedCategory(cat.id);
                setUsedIds([]);
              }}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>
      )}

      {streak > 0 && (
        <div
          style={{
            background: "rgba(239,71,111,0.12)",
            border: "1px solid rgba(239,71,111,0.3)",
            borderRadius: 14,
            padding: "10px 16px",
            marginBottom: 14,
            textAlign: "center",
            animation: "popIn 0.3s ease",
          }}
        >
          <span
            style={{ fontSize: 14, fontWeight: 700, color: "var(--accent3)" }}
          >
            🔥 ຖືກຕິດຕໍ່ {streak} ຂໍ້!{" "}
            {bonus > 0 ? `+${bonus} ໂບນັດ` : "ອີກໜ້ອຍໄດ້ໂບນັດ!"}
          </span>
        </div>
      )}

      {limitReached && (
        <div
          style={{
            textAlign: "center",
            padding: 40,
            animation: "popIn 0.3s ease",
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 12 }}>😴</div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>
            ມື້ນີ້ຕອບຄົບ 5 ຂໍ້ແລ້ວ!
          </h3>
          <p style={{ color: "var(--text-dim)", fontSize: 14 }}>
            ພັກຜ່ອນກ່ອນເດີ ມື້ອື່ນມາຕອບໃໝ່ 🌟
          </p>
        </div>
      )}

      {!limitReached && <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 24,
          padding: 28,
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <span style={{ fontSize: 12, color: "var(--text-dim)" }}>
            {categories.find((c) => c.id === q.categoryId)?.name || "ຄຳຖາມ"}
          </span>
          <span style={{ fontSize: 12, color: "var(--accent2)" }}>
            🪙 +{q.coins}
            {bonus > 0 ? `+${bonus}` : ""}
          </span>
        </div>

        <p
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--text)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}
        >
          {q.question}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt, i) => {
            let bg = "var(--bg-card2)";
            let border = "1px solid var(--border)";
            let color = "var(--text-dim)";
            if (answered !== null) {
              if (i === q.correctIndex) {
                bg = "rgba(6,214,160,0.2)";
                border = "2px solid var(--accent)";
                color = "var(--accent)";
              } else if (i === answered) {
                bg = "rgba(239,71,111,0.2)";
                border = "2px solid var(--accent3)";
                color = "var(--accent3)";
              }
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                style={{
                  background: bg,
                  border,
                  borderRadius: 14,
                  padding: "14px 18px",
                  textAlign: "left",
                  cursor: answered !== null ? "default" : "pointer",
                  color,
                  fontSize: 15,
                  fontWeight: 600,
                  transition: "all 0.2s",
                  fontFamily: "'Noto Sans Lao',sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    background:
                      answered !== null && i === q.correctIndex
                        ? "var(--accent)"
                        : "rgba(50,60,100,0.4)",
                    color:
                      answered !== null && i === q.correctIndex
                        ? "#0a0e27"
                        : "inherit",
                    fontWeight: 800,
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {answered !== null && (
          <div
            style={{
              marginTop: 20,
              textAlign: "center",
              animation: "popIn 0.3s ease",
            }}
          >
            <div
              style={{
                fontSize: 40,
                marginBottom: 8,
                animation:
                  answered === q.correctIndex
                    ? "bounce 0.5s ease"
                    : "shake 0.3s ease",
              }}
            >
              {answered === q.correctIndex ? "🎉" : "😅"}
            </div>
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 16,
                color:
                  answered === q.correctIndex
                    ? "var(--accent)"
                    : "var(--accent3)",
              }}
            >
              {answered === q.correctIndex
                ? `ຖືກຕ້ອງ! +${q.coins + bonus} ຫຼຽນ 🪙`
                : "ຜິດ! ລອງຂໍ້ໃໝ່"}
            </p>
            <button className="btn-primary" onClick={nextQ}>
              ຂໍ້ຕໍ່ໄປ →
            </button>
          </div>
        )}
      </div>}
    </div>
  );
}
