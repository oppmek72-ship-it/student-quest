import { useState, useMemo } from "react";
import {
  PIXEL_CATEGORIES,
  DEFAULT_PIXEL_AVATAR,
  findPixelItem,
} from "../../constants/avatarPixel";
import { OUTFIT_SETS, getSetMissingCost } from "../../constants/outfitSets";
import PixelAvatar from "../../components/avatar/PixelAvatar";
import CoinBadge from "../../components/ui/CoinBadge";

const RARITY_FILTERS = [
  { key: "all", label: "ທັງໝົດ", color: "var(--text)" },
  { key: "common", label: "ທຳມະດາ", color: "#95A5A6" },
  { key: "rare", label: "ຫາຍາກ", color: "#3498DB" },
  { key: "epic", label: "ມະຫາ", color: "#9B59B6" },
  { key: "legendary", label: "ຕຳນານ", color: "#F9E547" },
];

export default function AvatarPage({ student, onEquip, onEquipSet, showToast }) {
  const [catIndex, setCatIndex] = useState(0);
  const [previewOverride, setPreviewOverride] = useState(null);
  const [rarityFilter, setRarityFilter] = useState("all");

  const cat = PIXEL_CATEGORIES[catIndex];
  const owned = student.ownedAvatarItems || [];

  const allItems = useMemo(
    () => PIXEL_CATEGORIES.flatMap((c) => c.items),
    []
  );

  const previewAvatar = previewOverride
    ? { ...student.avatar, ...previewOverride }
    : student.avatar;

  const equippedId = student.avatar[cat.key];

  function handleItemTap(item) {
    const isOwned = owned.includes(item.id);
    const isEquipped = equippedId === item.id;

    if (isEquipped) {
      setPreviewOverride(null);
      return;
    }

    if (isOwned) {
      onEquip(cat.key, item.id);
      setPreviewOverride(null);
      showToast?.("✅ ປ່ຽນແລ້ວ!");
    } else {
      setPreviewOverride({ [cat.key]: item.id });
    }
  }

  function handleBuyPreview() {
    if (!previewOverride) return;
    const key = Object.keys(previewOverride)[0];
    const itemId = previewOverride[key];
    const item = findPixelItem(itemId);
    if (!item) return;
    if (student.coins < item.cost) {
      showToast?.("❌ ຫຼຽນບໍ່ພໍ!");
      return;
    }
    onEquip(key, itemId, item.cost);
    setPreviewOverride(null);
    showToast?.(`✅ ຊື້ ແລະ ໃສ່ ${item.name} ແລ້ວ!`);
  }

  function handleSetApply(set) {
    const { cost, missing } = getSetMissingCost(set, owned, allItems);
    if (cost > 0 && student.coins < cost) {
      showToast?.(`❌ ຕ້ອງການ 🪙${cost} ເພີ່ມ!`);
      return;
    }
    const missingIds = missing.map((m) => m.id);
    if (onEquipSet) {
      onEquipSet(set.pieces, cost, missingIds);
    }
    setPreviewOverride(null);
    if (cost > 0) {
      showToast?.(`✅ ຊື້ຊຸດ ${set.name} (🪙${cost}) ແລະ ໃສ່ແລ້ວ!`);
    } else {
      showToast?.(`✅ ໃສ່ຊຸດ ${set.name} ແລ້ວ!`);
    }
  }

  const previewItem = previewOverride
    ? findPixelItem(Object.values(previewOverride)[0])
    : null;

  return (
    <div style={{ animation: "slideUp 0.4s ease" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--accent4)" }}>
          👤 ແຕ່ງໂຕ
        </h2>
        <CoinBadge coins={student.coins} />
      </div>

      {/* Character Preview */}
      <div
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(17,138,178,0.15), transparent 70%)",
          borderRadius: 24,
          padding: "20px 0 12px",
          textAlign: "center",
          marginBottom: 12,
          position: "relative",
          border: "1px solid var(--border)",
        }}
      >
        <PixelAvatar avatar={previewAvatar} size={140} animate />
        <p
          style={{
            fontSize: 13,
            color: "var(--text-dim)",
            marginTop: 8,
          }}
        >
          {student.name}
        </p>

        {/* Buy button for preview item */}
        {previewItem && (
          <div
            style={{
              marginTop: 8,
              display: "flex",
              gap: 8,
              justifyContent: "center",
              animation: "popIn 0.3s ease",
            }}
          >
            <button
              className={
                student.coins >= previewItem.cost ? "btn-gold" : "btn-ghost"
              }
              style={{
                padding: "8px 20px",
                fontSize: 13,
                opacity: student.coins >= previewItem.cost ? 1 : 0.5,
              }}
              onClick={handleBuyPreview}
              disabled={student.coins < previewItem.cost}
            >
              🪙 {previewItem.cost} ຊື້ ແລະ ໃສ່
            </button>
            <button
              className="btn-ghost"
              style={{ padding: "8px 14px", fontSize: 13 }}
              onClick={() => setPreviewOverride(null)}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Outfit Sets */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 8,
          marginBottom: 12,
          scrollbarWidth: "none",
        }}
      >
        {OUTFIT_SETS.map((set) => {
          const { cost } = getSetMissingCost(set, owned, allItems);
          return (
            <button
              key={set.id}
              onClick={() => handleSetApply(set)}
              style={{
                flexShrink: 0,
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "8px 14px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s",
                minWidth: 75,
                color: "var(--text)",
                fontFamily: "inherit",
              }}
            >
              <div style={{ fontSize: 22 }}>{set.emoji}</div>
              <div style={{ fontSize: 11, fontWeight: 600, marginTop: 2 }}>
                {set.name}
              </div>
              {cost > 0 && (
                <div style={{ fontSize: 10, color: "var(--accent2)", marginTop: 2 }}>
                  🪙{cost}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: "flex",
          gap: 6,
          overflowX: "auto",
          paddingBottom: 8,
          marginBottom: 12,
          scrollbarWidth: "none",
        }}
      >
        {PIXEL_CATEGORIES.map((c, i) => (
          <button
            key={c.key}
            onClick={() => {
              setCatIndex(i);
              setPreviewOverride(null);
              setRarityFilter("all");
            }}
            className={catIndex === i ? "btn-primary" : "btn-ghost"}
            style={{
              flexShrink: 0,
              padding: "6px 12px",
              fontSize: 12,
              borderRadius: 20,
              whiteSpace: "nowrap",
            }}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* Rarity Filter (only for categories with many items) */}
      {cat.items.length > 20 && (
        <div style={{ display: "flex", gap: 4, marginBottom: 8, flexWrap: "wrap" }}>
          {RARITY_FILTERS.map((rf) => (
            <button
              key={rf.key}
              onClick={() => setRarityFilter(rf.key)}
              style={{
                padding: "4px 10px", fontSize: 11, borderRadius: 12,
                background: rarityFilter === rf.key ? rf.color + "22" : "transparent",
                border: rarityFilter === rf.key ? `1px solid ${rf.color}` : "1px solid var(--border)",
                color: rf.color, cursor: "pointer", fontWeight: 600,
                fontFamily: "inherit",
              }}
            >
              {rf.label} {rf.key !== "all" && `(${cat.items.filter(i => i.rarity === rf.key || (!i.rarity && rf.key === "common")).length})`}
            </button>
          ))}
        </div>
      )}

      {/* Item Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
          maxHeight: cat.items.length > 30 ? 400 : "none",
          overflowY: cat.items.length > 30 ? "auto" : "visible",
          paddingRight: cat.items.length > 30 ? 4 : 0,
        }}
      >
        {cat.items.filter((item) => {
          if (rarityFilter === "all") return true;
          const r = item.rarity || "common";
          return r === rarityFilter;
        }).map((item) => {
          const isEquipped = equippedId === item.id;
          const isOwned = owned.includes(item.id);
          const isPreviewing =
            previewOverride && Object.values(previewOverride)[0] === item.id;
          const rarityColor =
            item.rarity === "legendary"
              ? "#F9E547"
              : item.rarity === "epic"
              ? "#9B59B6"
              : item.rarity === "rare"
              ? "#3498DB"
              : null;

          return (
            <div
              key={item.id}
              onClick={() => handleItemTap(item)}
              style={{
                background: isPreviewing
                  ? "rgba(255,209,102,0.1)"
                  : isEquipped
                  ? "rgba(17,138,178,0.15)"
                  : "var(--bg-card)",
                border: isPreviewing
                  ? "2px solid var(--accent2)"
                  : isEquipped
                  ? "2px solid var(--accent4)"
                  : rarityColor
                  ? `1px solid ${rarityColor}55`
                  : "1px solid var(--border)",
                borderRadius: 16,
                padding: "12px 6px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s",
                position: "relative",
              }}
            >
              {/* Mini preview */}
              <ItemPreview category={cat.key} item={item} avatar={student.avatar} />

              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: rarityColor || "var(--text)",
                  marginTop: 4,
                }}
              >
                {item.name}
              </div>

              {isEquipped ? (
                <div style={{ fontSize: 10, color: "var(--accent4)", fontWeight: 600, marginTop: 2 }}>
                  ✅ ໃສ່ແລ້ວ
                </div>
              ) : isOwned ? (
                <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 2 }}>
                  ມີແລ້ວ
                </div>
              ) : (
                <div style={{ fontSize: 10, color: "var(--accent2)", fontWeight: 600, marginTop: 2 }}>
                  🪙 {item.cost}
                </div>
              )}

              {/* Rarity badge */}
              {rarityColor && (
                <div
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: rarityColor,
                    boxShadow: `0 0 6px ${rarityColor}`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Mini preview for items in the grid
function ItemPreview({ category, item, avatar }) {
  if (category === "skinTone" || category === "hairColor") {
    return (
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: item.color,
          margin: "0 auto",
          border: "2px solid rgba(255,255,255,0.15)",
          boxShadow: `0 0 8px ${item.color}44`,
        }}
      />
    );
  }

  if (category === "top" || category === "bottom" || category === "shoes") {
    return (
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: item.color || "var(--bg-dark)",
          margin: "0 auto",
          border: "2px solid rgba(255,255,255,0.1)",
        }}
      />
    );
  }

  // For hair, face, hat, accessory — show mini pixel avatar with that item
  const previewAv = { ...avatar, [category]: item.id };
  return (
    <PixelAvatar
      avatar={previewAv}
      size={44}
      style={{ margin: "0 auto" }}
    />
  );
}
