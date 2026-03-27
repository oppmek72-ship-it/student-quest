const TEACHER_TABS = [
  { key: "dashboard", icon: "📊", label: "ສະຖິຕິ" },
  { key: "questions", icon: "📝", label: "ຄຳຖາມ" },
  { key: "categories", icon: "📂", label: "ໝວດ" },
  { key: "students", icon: "👨‍🎓", label: "ນັກຮຽນ" },
];

export default function TeacherLayout({ teacher, tab, onTabChange, onLogout, children }) {
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
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(6,214,160,0.2)",
                border: "2px solid var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              🧑‍🏫
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>
                {teacher.name}
              </div>
              <div style={{ fontSize: 11, color: "var(--accent)" }}>
                ຄູ / Admin
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="btn-ghost"
            style={{ padding: "6px 14px", fontSize: 12 }}
          >
            🚪 ອອກ
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div
        style={{
          position: "sticky",
          top: 60,
          zIndex: 40,
          background: "rgba(10,14,39,0.88)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--border)",
          padding: "8px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 6,
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          {TEACHER_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => onTabChange(t.key)}
              className={tab === t.key ? "btn-primary" : "btn-ghost"}
              style={{
                flex: 1,
                padding: "8px 6px",
                fontSize: 12,
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "16px",
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
