export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 90,
        left: "50%",
        transform: "translateX(-50%)",
        background: "linear-gradient(135deg, var(--accent), #05c28e)",
        color: "#0a0e27",
        padding: "12px 28px",
        borderRadius: 16,
        fontWeight: 700,
        fontSize: 14,
        zIndex: 9999,
        animation: "toastSlide 0.3s ease",
        boxShadow: "0 8px 30px var(--glow-green)",
        whiteSpace: "nowrap",
        fontFamily: "'Noto Sans Lao','Fredoka',sans-serif",
      }}
    >
      {message}
    </div>
  );
}
