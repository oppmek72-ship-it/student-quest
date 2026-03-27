import { PETS, RARITY_COLORS } from "../constants/pets";
import Stars from "./ui/Stars";

export default function PetCard({ pet, owned, small, displayStars }) {
  const petDef = PETS.find((p) => p.id === pet.id) || pet;
  const rc = RARITY_COLORS[petDef.rarity] || RARITY_COLORS.common;
  const starCount = displayStars || petDef.stars;

  return (
    <div
      style={{
        background: owned
          ? `linear-gradient(135deg, ${rc.bg}cc, ${rc.bg}88)`
          : "rgba(20,25,50,0.5)",
        border: `2px solid ${owned ? rc.text + "66" : "rgba(50,60,100,0.3)"}`,
        borderRadius: 16,
        padding: small ? "10px 8px" : "16px 12px",
        textAlign: "center",
        opacity: owned ? 1 : 0.4,
        transition: "all 0.3s",
        boxShadow: owned ? `0 4px 20px ${rc.glow}` : "none",
        animation:
          owned && petDef.rarity === "legendary"
            ? "legendaryGlow 2s infinite"
            : "none",
      }}
    >
      <div
        style={{
          fontSize: small ? 28 : 40,
          animation: owned ? "float 3s ease-in-out infinite" : "none",
        }}
      >
        {petDef.emoji}
      </div>
      <div
        style={{
          fontSize: small ? 11 : 13,
          fontWeight: 700,
          color: owned ? rc.text : "#4a5568",
          marginTop: 4,
        }}
      >
        {petDef.name}
      </div>
      <div style={{ fontSize: small ? 9 : 11, marginTop: 2 }}>
        <Stars count={starCount} />
      </div>
      <div
        style={{
          fontSize: small ? 9 : 10,
          color: rc.text,
          marginTop: 4,
          background: `${rc.bg}88`,
          borderRadius: 8,
          padding: "2px 8px",
          display: "inline-block",
        }}
      >
        {rc.label}
      </div>
    </div>
  );
}
