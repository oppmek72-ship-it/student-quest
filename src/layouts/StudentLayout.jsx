import AvatarDisplay from "../components/AvatarDisplay";
import CoinBadge from "../components/ui/CoinBadge";
import NavBar from "../components/ui/NavBar";

export default function StudentLayout({ student, tab, onTabChange, onLogout, children }) {
  return (
    <div
      style={{
        fontFamily: "'Noto Sans Lao','Fredoka',sans-serif",
        background: "var(--bg-dark)",
        minHeight: "100vh",
        color: "var(--text)",
        position: "relative",
      }}
    >
      {/* BG Effects */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(6,214,160,0.06), transparent 70%)",
            top: -50,
            right: -80,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 250,
            height: 250,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,209,102,0.05), transparent 70%)",
            bottom: 100,
            left: -60,
          }}
        />
      </div>

      {/* Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(10,14,39,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          padding: "12px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: 500,
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <AvatarDisplay student={student} size={36} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>
                {student.name}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-dim)" }}>
                {student.grade}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CoinBadge coins={student.coins} />
            <button
              onClick={onLogout}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-dim)",
                cursor: "pointer",
                fontSize: 18,
                padding: 4,
              }}
            >
              🚪
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "16px 16px 110px",
          maxWidth: 500,
          margin: "0 auto",
        }}
      >
        {children}
      </div>

      {/* Bottom Nav */}
      <NavBar tab={tab} onTabChange={onTabChange} />
    </div>
  );
}
