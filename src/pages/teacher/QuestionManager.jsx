import { useState } from "react";

export default function QuestionManager({
  questions,
  categories,
  onAdd,
  onEdit,
  onDelete,
  showToast,
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterCat, setFilterCat] = useState("all");

  // Form state
  const [catId, setCatId] = useState(categories[0]?.id || "");
  const [question, setQuestion] = useState("");
  const [opts, setOpts] = useState(["", "", "", ""]);
  const [correctIdx, setCorrectIdx] = useState(0);
  const [coins, setCoins] = useState(3);

  function resetForm() {
    setCatId(categories[0]?.id || "");
    setQuestion("");
    setOpts(["", "", "", ""]);
    setCorrectIdx(0);
    setCoins(3);
    setEditingId(null);
    setShowForm(false);
  }

  function startEdit(q) {
    setCatId(q.categoryId);
    setQuestion(q.question);
    setOpts([...q.options]);
    setCorrectIdx(q.correctIndex);
    setCoins(q.coins);
    setEditingId(q.id);
    setShowForm(true);
  }

  function handleSubmit() {
    if (!question.trim()) {
      showToast("❌ ກະລຸນາປ້ອນຄຳຖາມ");
      return;
    }
    if (opts.some((o) => !o.trim())) {
      showToast("❌ ກະລຸນາປ້ອນຄຳຕອບທຸກຂໍ້");
      return;
    }

    if (editingId) {
      onEdit(editingId, {
        categoryId: catId,
        question: question.trim(),
        options: opts.map((o) => o.trim()),
        correctIndex: correctIdx,
        coins,
      });
      showToast("✅ ແກ້ໄຂສຳເລັດ");
    } else {
      onAdd(
        catId,
        question.trim(),
        opts.map((o) => o.trim()),
        correctIdx,
        coins
      );
      showToast("✅ ເພີ່ມຄຳຖາມສຳເລັດ");
    }
    resetForm();
  }

  const filtered =
    filterCat === "all"
      ? questions
      : questions.filter((q) => q.categoryId === filterCat);

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
          style={{ fontSize: 22, fontWeight: 800, color: "var(--accent4)" }}
        >
          📝 ຈັດການຄຳຖາມ ({questions.length})
        </h2>
        <button
          className="btn-primary"
          style={{ padding: "8px 16px", fontSize: 13 }}
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          + ເພີ່ມ
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--accent4)44",
            borderRadius: 20,
            padding: 24,
            marginBottom: 20,
            animation: "popIn 0.3s ease",
          }}
        >
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: 16,
            }}
          >
            {editingId ? "✏️ ແກ້ໄຂຄຳຖາມ" : "➕ ເພີ່ມຄຳຖາມໃໝ່"}
          </h3>

          {/* Category */}
          <label style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4, display: "block" }}>
            ໝວດ:
          </label>
          <select
            value={catId}
            onChange={(e) => setCatId(e.target.value)}
            style={{ marginBottom: 12 }}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.emoji} {c.name}
              </option>
            ))}
          </select>

          {/* Question */}
          <label style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4, display: "block" }}>
            ຄຳຖາມ:
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="ພິມຄຳຖາມ..."
            style={{ marginBottom: 12 }}
          />

          {/* Options */}
          <label style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4, display: "block" }}>
            ຄຳຕອບ (ກົດ ✅ ເລືອກຄຳຕອບຖືກ):
          </label>
          {opts.map((opt, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 8,
                alignItems: "center",
              }}
            >
              <button
                type="button"
                onClick={() => setCorrectIdx(i)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: `2px solid ${correctIdx === i ? "var(--accent)" : "var(--border)"}`,
                  background: correctIdx === i ? "var(--accent)" : "transparent",
                  color: correctIdx === i ? "#0a0e27" : "var(--text-dim)",
                  cursor: "pointer",
                  fontWeight: 800,
                  fontSize: 12,
                  flexShrink: 0,
                }}
              >
                {correctIdx === i ? "✅" : String.fromCharCode(65 + i)}
              </button>
              <input
                value={opt}
                onChange={(e) => {
                  const newOpts = [...opts];
                  newOpts[i] = e.target.value;
                  setOpts(newOpts);
                }}
                placeholder={`ຄຳຕອບ ${String.fromCharCode(65 + i)}`}
              />
            </div>
          ))}

          {/* Coins */}
          <label style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4, display: "block", marginTop: 8 }}>
            ຫຼຽນ (ລາງວັນ):
          </label>
          <input
            type="number"
            value={coins}
            onChange={(e) =>
              setCoins(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))
            }
            min={1}
            max={20}
            style={{ marginBottom: 16, width: 100 }}
          />

          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="btn-primary"
              style={{ flex: 1 }}
              onClick={handleSubmit}
            >
              {editingId ? "💾 ບັນທຶກ" : "✨ ເພີ່ມ"}
            </button>
            <button className="btn-ghost" onClick={resetForm}>
              ❌ ຍົກເລີກ
            </button>
          </div>
        </div>
      )}

      {/* Filter */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 14,
          flexWrap: "wrap",
        }}
      >
        <button
          className={filterCat === "all" ? "btn-primary" : "btn-ghost"}
          style={{ padding: "6px 12px", fontSize: 11 }}
          onClick={() => setFilterCat("all")}
        >
          ທັງໝົດ ({questions.length})
        </button>
        {categories.map((cat) => {
          const count = questions.filter(
            (q) => q.categoryId === cat.id
          ).length;
          return (
            <button
              key={cat.id}
              className={filterCat === cat.id ? "btn-primary" : "btn-ghost"}
              style={{ padding: "6px 12px", fontSize: 11 }}
              onClick={() => setFilterCat(cat.id)}
            >
              {cat.emoji} {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Question List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.length === 0 ? (
          <p
            style={{
              color: "var(--text-dim)",
              fontSize: 14,
              textAlign: "center",
              padding: 20,
            }}
          >
            ບໍ່ມີຄຳຖາມ
          </p>
        ) : (
          filtered.map((q) => {
            const cat = categories.find((c) => c.id === q.categoryId);
            return (
              <div
                key={q.id}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: "14px 18px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 8,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: 10,
                          padding: "2px 8px",
                          borderRadius: 6,
                          background: "rgba(17,138,178,0.15)",
                          color: "var(--accent4)",
                        }}
                      >
                        {cat?.emoji} {cat?.name}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          padding: "2px 8px",
                          borderRadius: 6,
                          background: "rgba(255,209,102,0.15)",
                          color: "var(--accent2)",
                        }}
                      >
                        🪙 {q.coins}
                      </span>
                      {q.isDefault && (
                        <span
                          style={{
                            fontSize: 10,
                            padding: "2px 8px",
                            borderRadius: 6,
                            background: "rgba(50,60,100,0.3)",
                            color: "var(--text-dim)",
                          }}
                        >
                          ຄ່າເລີ່ມຕົ້ນ
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--text)",
                        lineHeight: 1.6,
                      }}
                    >
                      {q.question}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 4, marginLeft: 8 }}>
                    <button
                      className="btn-ghost"
                      style={{ padding: "4px 8px", fontSize: 12 }}
                      onClick={() => startEdit(q)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-ghost"
                      style={{
                        padding: "4px 8px",
                        fontSize: 12,
                        color: "var(--accent3)",
                      }}
                      onClick={() => {
                        onDelete(q.id);
                        showToast("🗑️ ລຶບແລ້ວ");
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 4,
                    fontSize: 12,
                  }}
                >
                  {q.options.map((opt, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "4px 8px",
                        borderRadius: 8,
                        background:
                          i === q.correctIndex
                            ? "rgba(6,214,160,0.15)"
                            : "rgba(50,60,100,0.2)",
                        color:
                          i === q.correctIndex
                            ? "var(--accent)"
                            : "var(--text-dim)",
                        fontWeight: i === q.correctIndex ? 700 : 400,
                      }}
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                      {i === q.correctIndex && " ✅"}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
