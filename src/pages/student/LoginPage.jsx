import { useState } from "react";

export default function LoginPage({
  onLogin,
  students,
  onSwitchToTeacher,
}) {
  const [selectedId, setSelectedId] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at 50% 30%, rgba(6,214,160,0.08), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(255,209,102,0.06), transparent 50%), var(--bg-dark)",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 28,
          padding: "40px 32px",
          maxWidth: 400,
          width: "100%",
          animation: "popIn 0.5s ease",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            fontSize: 56,
            marginBottom: 12,
            animation: "bounce 2s infinite",
          }}
        >
          🎮
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            marginBottom: 4,
            background:
              "linear-gradient(135deg, var(--accent), var(--accent2))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "'Noto Sans Lao','Fredoka',sans-serif",
          }}
        >
          Student Quest
        </h1>
        <p
          style={{
            color: "var(--text-dim)",
            fontSize: 13,
            marginBottom: 28,
          }}
        >
          ລະບົບສະສົມຫຼຽນ & ລາງວັນ
        </p>

        <div style={{ animation: "fadeIn 0.3s ease" }}>
          {students.length === 0 ? (
            <p
              style={{
                color: "var(--text-dim)",
                fontSize: 14,
                padding: 20,
              }}
            >
              ຍັງບໍ່ມີນັກຮຽນ — ໃຫ້ຄູສ້າງ ID ກ່ອນ!
            </p>
          ) : (
            <>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                style={{ marginBottom: 16, textAlign: "center" }}
              >
                <option value="">— ເລືອກຊື່ —</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.grade}) — 🪙{s.coins}
                  </option>
                ))}
              </select>
              <button
                className="btn-primary"
                style={{ width: "100%" }}
                onClick={() => selectedId && onLogin(selectedId)}
                disabled={!selectedId}
              >
                🚀 ເຂົ້າເລີຍ!
              </button>
            </>
          )}
        </div>

        <div style={{ marginTop: 24, borderTop: "1px solid var(--border)", paddingTop: 16 }}>
          <button
            className="btn-ghost"
            style={{ width: "100%", fontSize: 13 }}
            onClick={onSwitchToTeacher}
          >
            🧑‍🏫 ເຂົ້າລະບົບຄູ
          </button>
        </div>
      </div>
    </div>
  );
}
