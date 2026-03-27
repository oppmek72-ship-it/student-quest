import { useState } from "react";
import { GRADES } from "../../constants/grades";

export default function StudentManager({
  students,
  onAdjustCoins,
  onReset,
  onCreateStudent,
  showToast,
}) {
  const [coinAmounts, setCoinAmounts] = useState({});
  const [confirmReset, setConfirmReset] = useState(null);
  const [newName, setNewName] = useState("");
  const [newGrade, setNewGrade] = useState("ມ1");

  function handleAddCoins(studentId) {
    const amount = parseInt(coinAmounts[studentId]) || 0;
    if (amount === 0) return;
    onAdjustCoins(studentId, amount);
    showToast(`🪙 ${amount > 0 ? "+" : ""}${amount} ຫຼຽນ!`);
    setCoinAmounts((prev) => ({ ...prev, [studentId]: "" }));
  }

  function handleCreate() {
    if (!newName.trim()) return;
    onCreateStudent(newName.trim(), newGrade);
    showToast(`✅ ສ້າງ "${newName.trim()}" ສຳເລັດ!`);
    setNewName("");
  }

  return (
    <div style={{ animation: "slideUp 0.4s ease" }}>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: "var(--accent3)",
          marginBottom: 16,
        }}
      >
        👨‍🎓 ຈັດການນັກຮຽນ ({students.length})
      </h2>

      {/* Create Student Form */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)", marginBottom: 12 }}>
          ➕ ສ້າງ ID ນັກຮຽນໃໝ່
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="ຊື່ ແລະ ນາມສະກຸນ"
            style={{ flex: 2, padding: "8px 12px", fontSize: 13, minWidth: 120 }}
          />
          <select
            value={newGrade}
            onChange={(e) => setNewGrade(e.target.value)}
            style={{ flex: 0, padding: "8px 12px", fontSize: 13 }}
          >
            {GRADES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <button
            className="btn-primary"
            style={{ padding: "8px 16px", fontSize: 13 }}
            onClick={handleCreate}
            disabled={!newName.trim()}
          >
            ➕ ສ້າງ
          </button>
        </div>
      </div>

      {students.length === 0 ? (
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: 40,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>👨‍🎓</div>
          <p style={{ color: "var(--text-dim)", fontSize: 14 }}>
            ຍັງບໍ່ມີນັກຮຽນ
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {students.map((s) => (
            <div
              key={s.id}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: 20,
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "rgba(6,214,160,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                  }}
                >
                  🧑
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "var(--text)",
                    }}
                  >
                    {s.name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)" }}>
                    {s.grade}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: "var(--accent2)",
                  }}
                >
                  🪙 {s.coins}
                </span>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 12,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    padding: "3px 10px",
                    borderRadius: 8,
                    background: "rgba(6,214,160,0.1)",
                    color: "var(--accent)",
                  }}
                >
                  ✅ ຕອບຖືກ {s.quizCorrect || 0}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    padding: "3px 10px",
                    borderRadius: 8,
                    background: "rgba(255,209,102,0.1)",
                    color: "var(--accent2)",
                  }}
                >
                  🐾 ສັດລ້ຽງ {s.pets?.length || 0}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    padding: "3px 10px",
                    borderRadius: 8,
                    background: "rgba(239,71,111,0.1)",
                    color: "var(--accent3)",
                  }}
                >
                  🛒 ແລກ {s.redeemed || 0}
                </span>
              </div>

              {/* Coin Adjustment */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <input
                  type="number"
                  value={coinAmounts[s.id] || ""}
                  onChange={(e) =>
                    setCoinAmounts((prev) => ({
                      ...prev,
                      [s.id]: e.target.value,
                    }))
                  }
                  placeholder="ຈຳນວນ (ເຊັ່ນ 10 ຫຼື -5)"
                  style={{ flex: 1, padding: "8px 12px", fontSize: 13 }}
                />
                <button
                  className="btn-primary"
                  style={{ padding: "8px 14px", fontSize: 12 }}
                  onClick={() => handleAddCoins(s.id)}
                >
                  🪙 ປັບ
                </button>
              </div>

              {/* Reset */}
              {confirmReset === s.id ? (
                <div
                  style={{
                    background: "rgba(239,71,111,0.1)",
                    border: "1px solid rgba(239,71,111,0.3)",
                    borderRadius: 12,
                    padding: 12,
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--accent3)",
                      marginBottom: 8,
                    }}
                  >
                    ແນ່ໃຈບໍ? ຈະລຶບ coins, ສັດລ້ຽງ, ແລະ ຂອງທັງໝົດ!
                  </p>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                    <button
                      className="btn-danger"
                      style={{ padding: "6px 14px", fontSize: 12 }}
                      onClick={() => {
                        onReset(s.id);
                        showToast(`🔄 Reset ${s.name} ສຳເລັດ`);
                        setConfirmReset(null);
                      }}
                    >
                      ✅ ຢືນຢັນ Reset
                    </button>
                    <button
                      className="btn-ghost"
                      style={{ padding: "6px 14px", fontSize: 12 }}
                      onClick={() => setConfirmReset(null)}
                    >
                      ❌ ຍົກເລີກ
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="btn-ghost"
                  style={{
                    width: "100%",
                    padding: "6px",
                    fontSize: 11,
                    color: "var(--accent3)",
                  }}
                  onClick={() => setConfirmReset(s.id)}
                >
                  🔄 Reset ນັກຮຽນ
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
