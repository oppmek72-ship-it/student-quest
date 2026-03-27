import { useState } from "react";

export default function TeacherLoginPage({
  teachers,
  onLogin,
  onRegister,
  onSwitchToStudent,
}) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    if (!name.trim() || !pin.trim()) {
      setError("ກະລຸນາປ້ອນຊື່ ແລະ PIN");
      return;
    }
    const success = onLogin(name.trim(), pin.trim());
    if (!success) {
      setError("ຊື່ ຫຼື PIN ບໍ່ຖືກ");
    }
  }

  function handleRegister() {
    if (!name.trim()) {
      setError("ກະລຸນາປ້ອນຊື່");
      return;
    }
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      setError("PIN ຕ້ອງເປັນ 4 ໂຕເລກ");
      return;
    }
    if (teachers.some((t) => t.name === name.trim())) {
      setError("ຊື່ນີ້ມີແລ້ວ");
      return;
    }
    onRegister(name.trim(), pin.trim());
    setError("");
    setName("");
    setPin("");
    setMode("login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at 50% 30%, rgba(6,214,160,0.08), transparent 60%), var(--bg-dark)",
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
          🧑‍🏫
        </div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            marginBottom: 4,
            background:
              "linear-gradient(135deg, var(--accent), var(--accent4))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "'Noto Sans Lao','Fredoka',sans-serif",
          }}
        >
          ລະບົບຄູ
        </h1>
        <p
          style={{
            color: "var(--text-dim)",
            fontSize: 13,
            marginBottom: 28,
          }}
        >
          ສ້າງຄຳຖາມ & ຈັດການນັກຮຽນ
        </p>

        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 24,
            justifyContent: "center",
          }}
        >
          <button
            className={mode === "login" ? "btn-primary" : "btn-ghost"}
            onClick={() => { setMode("login"); setError(""); }}
            style={{ flex: 1, padding: "10px" }}
          >
            🔑 ເຂົ້າລະບົບ
          </button>
          <button
            className={mode === "register" ? "btn-primary" : "btn-ghost"}
            onClick={() => { setMode("register"); setError(""); }}
            style={{ flex: 1, padding: "10px" }}
          >
            ✨ ລົງທະບຽນ
          </button>
        </div>

        {error && (
          <div
            style={{
              background: "rgba(239,71,111,0.15)",
              border: "1px solid rgba(239,71,111,0.3)",
              borderRadius: 12,
              padding: "10px 16px",
              marginBottom: 16,
              fontSize: 13,
              color: "var(--accent3)",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ຊື່ຄູ"
            style={{ marginBottom: 12 }}
          />
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="PIN 4 ໂຕ"
            type="password"
            maxLength={4}
            style={{ marginBottom: 16, textAlign: "center", letterSpacing: 8 }}
          />
          <button
            className="btn-primary"
            style={{ width: "100%" }}
            onClick={mode === "login" ? handleLogin : handleRegister}
          >
            {mode === "login" ? "🚀 ເຂົ້າເລີຍ!" : "✨ ສ້າງບັນຊີ"}
          </button>
        </div>

        <div
          style={{
            marginTop: 24,
            borderTop: "1px solid var(--border)",
            paddingTop: 16,
          }}
        >
          <button
            className="btn-ghost"
            style={{ width: "100%", fontSize: 13 }}
            onClick={onSwitchToStudent}
          >
            🎮 ກັບຫາໜ້ານັກຮຽນ
          </button>
        </div>
      </div>
    </div>
  );
}
