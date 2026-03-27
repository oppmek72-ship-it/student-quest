import { useState, useEffect, useRef, useCallback } from "react";
import BattleSprite from "./BattleSprite";
import BattleEffects from "./BattleEffects";
import { ANIM_DURATIONS } from "../../utils/battleAnimations";
import { getMagicColor } from "../../utils/battleParticles";

// Container dimensions for particle coordinate system
const FIELD_W = 340;
const FIELD_H = 200;

// Fighter positions (center of each sprite in the particle canvas)
const F1_X = 80;
const F2_X = 260;
const FIGHTER_Y = 130;

export default function BattleScene({ fighter1, fighter2, log, onFinish }) {
  const [step, setStep] = useState(-1);
  const [f1Hp, setF1Hp] = useState(fighter1.stats.maxHp);
  const [f2Hp, setF2Hp] = useState(fighter2.stats.maxHp);
  const [msg, setMsg] = useState("⚔️ ເລີ່ມຕໍ່ສູ້!");
  const [emoji, setEmoji] = useState("⚔️");
  const [f1Anim, setF1Anim] = useState("idle");
  const [f2Anim, setF2Anim] = useState("idle");
  const [projectile, setProjectile] = useState(null);

  const timerRef = useRef(null);
  const effectsRef = useRef(null);
  const containerRef = useRef(null);

  const f1MaxHp = fighter1.stats.maxHp;
  const f2MaxHp = fighter2.stats.maxHp;

  // Determine animation type from skill
  function getAttackAnim(skillType) {
    if (skillType === "physical") return "attack_physical";
    if (skillType === "magic" || skillType === "ultimate") return "attack_magic";
    if (skillType === "heal") return "heal";
    if (skillType === "defend" || skillType === "buff_mdef") return "buff";
    return "attack_physical";
  }

  // Determine particle effect type
  function getEffectType(skillType) {
    if (skillType === "physical") return "slash";
    if (skillType === "magic" || skillType === "ultimate") return "magic";
    if (skillType === "heal") return "heal";
    if (skillType === "defend" || skillType === "buff_mdef") return "buff";
    return "slash";
  }

  const processStep = useCallback((nextStep) => {
    if (nextStep >= log.length) {
      onFinish?.();
      return;
    }

    const entry = log[nextStep];
    const isF1Attacking = entry.attackerId === fighter1.id;
    const attackerX = isF1Attacking ? F1_X : F2_X;
    const defenderX = isF1Attacking ? F2_X : F1_X;
    const direction = isF1Attacking ? 1 : -1;

    // Build message
    let newEmoji, newMsg;
    if (entry.type === "pet") {
      newEmoji = entry.petEmoji || "🐾";
      newMsg = `${entry.petEmoji} ${entry.attackerName} → ${entry.abilityName}!`;
      if (entry.dmg > 0) newMsg += ` -${entry.dmg}`;
      if (entry.heal > 0) newMsg += ` +${entry.heal}`;
      if (entry.buff) newMsg += ` ${entry.buff.stat}+${entry.buff.amount}`;
    } else {
      newEmoji = entry.skillEmoji || "👊";
      newMsg = `${entry.skillEmoji} ${entry.attackerName} → ${entry.skillName}!`;
      if (entry.dmg > 0) newMsg += ` -${entry.dmg}`;
      if (entry.heal > 0) newMsg += ` +${entry.heal}`;
      if (entry.buff) newMsg += ` ${entry.buff.stat}${entry.buff.amount > 0 ? "+" : ""}${entry.buff.amount}`;
      if (entry.selfDmg > 0) newMsg += ` (ເຈັບ -${entry.selfDmg})`;
    }

    setEmoji(newEmoji);
    setMsg(newMsg);
    setStep(nextStep);

    const skillType = entry.type === "pet"
      ? (entry.dmg > 0 ? "physical" : entry.heal > 0 ? "heal" : "buff_mdef")
      : entry.skillType;

    const attackAnim = getAttackAnim(skillType);
    const effectType = getEffectType(skillType);
    const isHealOrBuff = skillType === "heal" || skillType === "defend" || skillType === "buff_mdef";

    // Phase 1: Attacker animation starts
    if (isF1Attacking) {
      setF1Anim(attackAnim);
    } else {
      setF2Anim(attackAnim);
    }

    // Launch emoji projectile (for damage skills)
    if (!isHealOrBuff && entry.dmg > 0) {
      setProjectile({
        emoji: newEmoji,
        fromX: attackerX,
        toX: defenderX,
        active: true,
      });
    }

    // Phase 2: Impact after delay
    const impactDelay = isHealOrBuff ? 250 : 300;
    setTimeout(() => {
      // Trigger particle effects
      if (effectsRef.current) {
        if (isHealOrBuff) {
          effectsRef.current.triggerEffect(effectType, {
            x: attackerX,
            y: FIGHTER_Y - 20,
            color: skillType === "heal" ? "#2ecc71" : "#3498db",
          });
        } else if (entry.dmg > 0) {
          const magicColor = getMagicColor(entry.skillEmoji || "default");
          effectsRef.current.triggerEffect(effectType, {
            x: defenderX,
            y: FIGHTER_Y - 20,
            color: magicColor,
            direction,
          });
        }
      }

      // Defender hit animation
      if (entry.dmg > 0) {
        // Check if defender dies
        const defenderHp = isF1Attacking ? entry.defenderHp : entry.defenderHp;
        const willDie = defenderHp <= 0;

        if (isF1Attacking) {
          setF2Anim(willDie ? "death" : "hit");
        } else {
          setF1Anim(willDie ? "death" : "hit");
        }

        if (willDie && effectsRef.current) {
          effectsRef.current.triggerEffect("death", {
            x: defenderX,
            y: FIGHTER_Y - 10,
          });
        }
      }

      // Update HP
      setF1Hp(Math.max(0, entry.attackerId === fighter1.id ? entry.attackerHp : entry.defenderHp));
      setF2Hp(Math.max(0, entry.attackerId === fighter2.id ? entry.attackerHp : entry.defenderHp));

      // Clear projectile
      setProjectile(null);
    }, impactDelay);

    // Phase 3: Return to idle
    const settleDelay = isHealOrBuff ? 500 : 650;
    setTimeout(() => {
      // Only return to idle if not dead
      setF1Anim((prev) => prev === "death" ? "death" : "idle");
      setF2Anim((prev) => prev === "death" ? "death" : "idle");
    }, settleDelay);

    // Schedule next step
    timerRef.current = setTimeout(() => {
      processStep(nextStep + 1);
    }, 1000);
  }, [log, fighter1.id, fighter2.id, onFinish]);

  // Start battle
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      processStep(0);
    }, 800);

    return () => clearTimeout(timerRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const hpBar = (hp, maxHp) => {
    const pct = Math.max(0, (hp / maxHp) * 100);
    const color = pct > 50 ? "#2ecc71" : pct > 25 ? "#f39c12" : "#e74c3c";
    return (
      <div style={{ height: 10, borderRadius: 5, background: "var(--bg-dark)", overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`, height: "100%", background: color,
          borderRadius: 5, transition: "width 0.4s ease",
        }} />
      </div>
    );
  };

  return (
    <div style={{ animation: "popIn 0.4s ease" }}>
      {/* Battle field */}
      <div
        ref={containerRef}
        style={{
          background: "linear-gradient(135deg, rgba(17,138,178,0.08), rgba(239,71,111,0.08))",
          borderRadius: 24, padding: 16, border: "1px solid var(--border)",
          position: "relative", overflow: "hidden",
          minHeight: 200,
        }}
      >
        {/* Particle effects overlay */}
        <BattleEffects ref={effectsRef} width={FIELD_W} height={FIELD_H} />

        {/* Emoji projectile */}
        {projectile && projectile.active && (
          <div
            key={`proj-${step}`}
            style={{
              position: "absolute",
              left: projectile.fromX,
              top: FIGHTER_Y - 40,
              fontSize: 28,
              zIndex: 20,
              animation: "emojiProjectile 0.3s ease-out forwards",
              "--proj-dx": `${projectile.toX - projectile.fromX}px`,
              pointerEvents: "none",
            }}
          >
            {projectile.emoji}
          </div>
        )}

        {/* Fighters */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative", zIndex: 5 }}>
          {/* Fighter 1 (left) */}
          <div style={{ textAlign: "center", flex: 1 }}>
            <BattleSprite
              avatar={fighter1.avatar}
              size={80}
              animState={f1Anim}
              facing="right"
              onAnimEnd={() => {
                if (f1Anim !== "idle" && f1Anim !== "death") {
                  setF1Anim("idle");
                }
              }}
            />
            <div style={{ fontWeight: 700, fontSize: 13, marginTop: 4 }}>{fighter1.name}</div>
            <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 4 }}>
              Lv.{fighter1.level}
            </div>
            <div style={{
              fontSize: 12, fontWeight: 700,
              color: f1Hp < f1MaxHp * 0.3 ? "#e74c3c" : "var(--text)",
            }}>
              {f1Hp}/{f1MaxHp}
            </div>
            {hpBar(f1Hp, f1MaxHp)}
          </div>

          <div style={{ fontSize: 28, fontWeight: 900, color: "var(--text-dim)", padding: "0 8px" }}>VS</div>

          {/* Fighter 2 (right) */}
          <div style={{ textAlign: "center", flex: 1 }}>
            <BattleSprite
              avatar={fighter2.avatar}
              size={80}
              animState={f2Anim}
              facing="left"
              onAnimEnd={() => {
                if (f2Anim !== "idle" && f2Anim !== "death") {
                  setF2Anim("idle");
                }
              }}
            />
            <div style={{ fontWeight: 700, fontSize: 13, marginTop: 4 }}>{fighter2.name}</div>
            <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 4 }}>
              Lv.{fighter2.level}
            </div>
            <div style={{
              fontSize: 12, fontWeight: 700,
              color: f2Hp < f2MaxHp * 0.3 ? "#e74c3c" : "var(--text)",
            }}>
              {f2Hp}/{f2MaxHp}
            </div>
            {hpBar(f2Hp, f2MaxHp)}
          </div>
        </div>
      </div>

      {/* Message */}
      <div style={{
        textAlign: "center", marginTop: 12,
        fontSize: 14, fontWeight: 600,
        color: "var(--text)",
        minHeight: 24,
        animation: "popIn 0.2s ease",
      }} key={`msg-${step}`}>
        {msg}
      </div>

      {/* Turn counter */}
      <div style={{ textAlign: "center", fontSize: 11, color: "var(--text-dim)", marginTop: 4 }}>
        Turn {Math.max(0, step) + 1} / {log.length}
      </div>
    </div>
  );
}
