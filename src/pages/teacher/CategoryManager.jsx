import { useState } from "react";

const EMOJI_OPTIONS = ["📚", "📜", "🔬", "🧮", "🌍", "🎨", "🏃", "💻", "🎵", "📖"];

export default function CategoryManager({
  categories,
  questions,
  onAdd,
  onDelete,
  showToast,
}) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("📚");

  function handleAdd() {
    if (!name.trim()) {
      showToast("❌ ກະລຸນາປ້ອນຊື່ໝວດ");
      return;
    }
    onAdd(name.trim(), emoji);
    showToast("✅ ເພີ່ມໝວດສຳເລັດ");
    setName("");
    setEmoji("📚");
    setShowForm(false);
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
          📂 ຈັດການໝວດ ({categories.length})
        </h2>
        <button
          className="btn-primary"
          style={{ padding: "8px 16px", fontSize: 13 }}
          onClick={() => setShowForm(!showForm)}
        >
          + ເພີ່ມ
        </button>
      </div>

      {showForm && (
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--accent2)44",
            borderRadius: 20,
            padding: 24,
            marginBottom: 20,
            animation: "popIn 0.3s ease",
          }}
        >
          <label
            style={{
              fontSize: 12,
              color: "var(--text-dim)",
              marginBottom: 4,
              display: "block",
            }}
          >
            ໄອຄອນ:
          </label>
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 12,
              flexWrap: "wrap",
            }}
          >
            {EMOJI_OPTIONS.map((e) => (
              <button
                key={e}
                onClick={() => setEmoji(e)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: `2px solid ${emoji === e ? "var(--accent2)" : "var(--border)"}`,
                  background:
                    emoji === e
                      ? "rgba(255,209,102,0.15)"
                      : "transparent",
                  fontSize: 20,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {e}
              </button>
            ))}
          </div>

          <label
            style={{
              fontSize: 12,
              color: "var(--text-dim)",
              marginBottom: 4,
              display: "block",
            }}
          >
            ຊື່ໝວດ:
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ເຊັ່ນ: ຄະນິດສາດ, ວິທະຍາສາດ..."
            style={{ marginBottom: 16 }}
          />

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-primary" style={{ flex: 1 }} onClick={handleAdd}>
              ✨ ເພີ່ມ
            </button>
            <button className="btn-ghost" onClick={() => setShowForm(false)}>
              ❌
            </button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {categories.map((cat) => {
          const count = questions.filter(
            (q) => q.categoryId === cat.id
          ).length;
          const isDefault = cat.id === "cat_default";

          return (
            <div
              key={cat.id}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "rgba(255,209,102,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
              >
                {cat.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--text)",
                  }}
                >
                  {cat.name}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-dim)" }}>
                  {count} ຄຳຖາມ
                  {isDefault && " · ຄ່າເລີ່ມຕົ້ນ"}
                </div>
              </div>
              {!isDefault && (
                <button
                  className="btn-ghost"
                  style={{
                    padding: "6px 12px",
                    fontSize: 12,
                    color: "var(--accent3)",
                  }}
                  onClick={() => {
                    onDelete(cat.id);
                    showToast("🗑️ ລຶບໝວດແລ້ວ (ຄຳຖາມຍ້າຍໄປໝວດເລີ່ມຕົ້ນ)");
                  }}
                >
                  🗑️ ລຶບ
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
