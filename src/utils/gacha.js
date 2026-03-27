import { PETS } from "../constants/pets";

export function getGachaResult() {
  const r = Math.random();
  let pool;
  if (r < 0.01) pool = PETS.filter((p) => p.rarity === "legendary");
  else if (r < 0.06) pool = PETS.filter((p) => p.rarity === "epic");
  else if (r < 0.18) pool = PETS.filter((p) => p.rarity === "rare");
  else if (r < 0.40) pool = PETS.filter((p) => p.rarity === "uncommon");
  else pool = PETS.filter((p) => p.rarity === "common");
  return pool[Math.floor(Math.random() * pool.length)];
}
