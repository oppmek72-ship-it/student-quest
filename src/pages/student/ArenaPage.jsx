import { useState, useMemo } from "react";
import { computeFighterStats, resolveBattle } from "../../utils/battleEngine";
import {
  BATTLE_XP_WIN, BATTLE_XP_LOSE, RATING_WIN, RATING_LOSE,
  XP_PER_LEVEL,
} from "../../constants/battle";
import FighterCard from "../../components/battle/FighterCard";
import BattleScene from "../../components/battle/BattleScene";
import BattleLog from "../../components/battle/BattleLog";
import SkillShop from "../../components/battle/SkillShop";
import PixelAvatar from "../../components/avatar/PixelAvatar";

const VIEW = { LOBBY: 0, SELECT: 1, BATTLE: 2, RESULT: 3, SHOP: 4 };

export default function ArenaPage({
  student, students, onBattleResult, onBuySkill, onEquipSkill, showToast,
}) {
  const [view, setView] = useState(VIEW.LOBBY);
  const [opponent, setOpponent] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [battleDone, setBattleDone] = useState(false);

  const myFighter = useMemo(() => computeFighterStats(student), [student]);

  const opponents = useMemo(
    () => students.filter((s) => s.id !== student.id),
    [students, student.id]
  );

  function startBattle(opp) {
    setOpponent(opp);
    const result = resolveBattle(student, opp);
    setBattleResult(result);
    setBattleDone(false);
    setView(VIEW.BATTLE);
  }

  function handleBattleFinish() {
    setBattleDone(true);
    setView(VIEW.RESULT);
    if (battleResult) {
      onBattleResult(battleResult.winnerId, battleResult.loserId);
    }
  }

  const won = battleResult?.winnerId === student.id;

  // Recent battle log
  const recentLog = (student.battleLog || []).slice(0, 5);

  return (
    <div style={{ animation: "slideUp 0.4s ease" }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 12,
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--accent4)" }}>
          🏟️ ສະໜາມ
        </h2>
        {view !== VIEW.LOBBY && (
          <button
            className="btn-ghost"
            style={{ padding: "6px 12px", fontSize: 12 }}
            onClick={() => {
              setView(VIEW.LOBBY);
              setBattleResult(null);
              setOpponent(null);
            }}
          >
            ← ກັບ
          </button>
        )}
      </div>

      {/* ===== LOBBY ===== */}
      {view === VIEW.LOBBY && (
        <div>
          {/* My fighter card */}
          <FighterCard fighter={myFighter} isPlayer />

          {/* Stats row */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8, marginTop: 12,
          }}>
            <StatBox label="🏆 Rating" value={student.arenaRating || 1000} />
            <StatBox label="✅ ຊະນະ" value={student.arenaWins || 0} />
            <StatBox label="❌ ແພ້" value={student.arenaLosses || 0} />
          </div>

          {/* XP bar */}
          <div style={{
            marginTop: 12, background: "var(--bg-card)",
            borderRadius: 16, padding: 12, border: "1px solid var(--border)",
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
              ⭐ Battle Lv.{student.battleLevel || 1} — XP {student.battleXP || 0}/{XP_PER_LEVEL}
            </div>
            <div style={{
              height: 8, borderRadius: 4, background: "var(--bg-dark)", overflow: "hidden",
            }}>
              <div style={{
                width: `${((student.battleXP || 0) / XP_PER_LEVEL) * 100}%`,
                height: "100%", background: "var(--accent4)",
                borderRadius: 4, transition: "width 0.3s",
              }} />
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              className="btn-primary"
              style={{ flex: 1, padding: "14px 0", fontSize: 16, borderRadius: 16 }}
              onClick={() => {
                if (opponents.length === 0) {
                  showToast?.("❌ ບໍ່ມີຄູ່ຕໍ່ສູ້!");
                  return;
                }
                setView(VIEW.SELECT);
              }}
            >
              ⚔️ ທ້າສູ້!
            </button>
            <button
              className="btn-gold"
              style={{ padding: "14px 16px", fontSize: 16, borderRadius: 16 }}
              onClick={() => setView(VIEW.SHOP)}
            >
              🛒
            </button>
          </div>

          {/* Recent battles */}
          {recentLog.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
                📜 ຜົນຫຼ້າສຸດ
              </div>
              {recentLog.map((entry, i) => {
                const vs = students.find((s) => s.id === entry.vs);
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "6px 0",
                    borderBottom: i < recentLog.length - 1 ? "1px solid var(--border)" : "none",
                    fontSize: 12,
                  }}>
                    <span style={{
                      color: entry.result === "win" ? "#2ecc71" : "#e74c3c",
                      fontWeight: 700,
                    }}>
                      {entry.result === "win" ? "✅ ຊະນະ" : "❌ ແພ້"}
                    </span>
                    <span style={{ color: "var(--text-dim)" }}>vs</span>
                    <span style={{ fontWeight: 600 }}>{vs?.name || "???"}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ===== OPPONENT SELECT ===== */}
      {view === VIEW.SELECT && (
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "var(--text)" }}>
            🎯 ເລືອກຄູ່ຕໍ່ສູ້
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {opponents.map((opp) => (
              <div
                key={opp.id}
                onClick={() => startBattle(opp)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: "var(--bg-card)", borderRadius: 16,
                  padding: "12px 14px", border: "1px solid var(--border)",
                  cursor: "pointer", transition: "all 0.2s",
                }}
              >
                <PixelAvatar avatar={opp.avatar} size={48} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{opp.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)" }}>
                    Lv.{opp.battleLevel || 1} | 🏆 {opp.arenaRating || 1000}
                  </div>
                </div>
                <button
                  className="btn-primary"
                  style={{ padding: "8px 16px", fontSize: 12, borderRadius: 12 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    startBattle(opp);
                  }}
                >
                  ⚔️ ສູ້!
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== BATTLE ===== */}
      {view === VIEW.BATTLE && battleResult && (
        <BattleScene
          fighter1={battleResult.fighter1}
          fighter2={battleResult.fighter2}
          log={battleResult.log}
          onFinish={handleBattleFinish}
        />
      )}

      {/* ===== RESULT ===== */}
      {view === VIEW.RESULT && battleResult && (
        <div style={{ animation: "popIn 0.5s ease" }}>
          {/* Victory / Defeat banner */}
          <div style={{
            textAlign: "center", padding: "24px 16px",
            background: won
              ? "linear-gradient(135deg, rgba(46,204,113,0.15), rgba(241,196,15,0.15))"
              : "linear-gradient(135deg, rgba(231,76,60,0.15), rgba(155,89,182,0.15))",
            borderRadius: 24, border: `2px solid ${won ? "#2ecc71" : "#e74c3c"}`,
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 48 }}>{won ? "🏆" : "💀"}</div>
            <div style={{
              fontSize: 24, fontWeight: 900, marginTop: 8,
              color: won ? "#2ecc71" : "#e74c3c",
            }}>
              {won ? "ຊະນະ!" : "ແພ້!"}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 8 }}>
              {battleResult.turns} turns vs {won ? battleResult.loserName : battleResult.winnerName}
            </div>

            {/* Rewards */}
            <div style={{
              display: "flex", justifyContent: "center", gap: 16, marginTop: 12,
            }}>
              <div style={{
                background: "var(--bg-card)", borderRadius: 12,
                padding: "8px 16px", fontSize: 13, fontWeight: 600,
              }}>
                ⭐ +{won ? BATTLE_XP_WIN : BATTLE_XP_LOSE} XP
              </div>
              <div style={{
                background: "var(--bg-card)", borderRadius: 12,
                padding: "8px 16px", fontSize: 13, fontWeight: 600,
                color: won ? "#2ecc71" : "#e74c3c",
              }}>
                🏆 {won ? `+${RATING_WIN}` : `-${RATING_LOSE}`}
              </div>
            </div>
          </div>

          {/* Battle log */}
          <BattleLog log={battleResult.log} />

          {/* Back button */}
          <button
            className="btn-primary"
            style={{
              width: "100%", padding: 14, fontSize: 15,
              borderRadius: 16, marginTop: 12,
            }}
            onClick={() => {
              setView(VIEW.LOBBY);
              setBattleResult(null);
              setOpponent(null);
            }}
          >
            ← ກັບໜ້າຫຼັກ
          </button>
        </div>
      )}

      {/* ===== SKILL SHOP ===== */}
      {view === VIEW.SHOP && (
        <SkillShop
          student={student}
          onBuy={onBuySkill}
          onEquip={onEquipSkill}
          showToast={showToast}
        />
      )}
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div style={{
      background: "var(--bg-card)", borderRadius: 14,
      padding: "10px 8px", textAlign: "center",
      border: "1px solid var(--border)",
    }}>
      <div style={{ fontSize: 10, color: "var(--text-dim)" }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>{value}</div>
    </div>
  );
}
