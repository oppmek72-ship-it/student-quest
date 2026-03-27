const MAX_STARS = {
  common: 5,
  uncommon: 6,
  rare: 7,
  epic: 8,
  legendary: 10,
};

export function getMaxStars(rarity) {
  return MAX_STARS[rarity] || 5;
}

export function findMergeablePairs(pets) {
  const groups = {};
  pets.forEach((pet, index) => {
    const key = `${pet.id}_${pet.stars}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(index);
  });

  const pairs = [];
  for (const [key, indices] of Object.entries(groups)) {
    if (indices.length >= 2) {
      pairs.push({
        key,
        petId: key.split("_")[0],
        stars: parseInt(key.split("_")[1]),
        indices,
        count: indices.length,
      });
    }
  }
  return pairs;
}

export function mergePets(pets, indexA, indexB, petDef) {
  if (indexA === indexB) return { success: false, pets, reason: "ເລືອກ 2 ໂຕທີ່ຕ່າງກັນ" };

  const petA = pets[indexA];
  const petB = pets[indexB];

  if (!petA || !petB) return { success: false, pets, reason: "ບໍ່ພົບສັດລ້ຽງ" };
  if (petA.id !== petB.id) return { success: false, pets, reason: "ຕ້ອງເປັນສັດລ້ຽງຊະນິດດຽວກັນ" };
  if (petA.stars !== petB.stars) return { success: false, pets, reason: "ຕ້ອງມີດາວເທົ່າກັນ" };

  const maxStars = getMaxStars(petDef.rarity);
  if (petA.stars >= maxStars) return { success: false, pets, reason: `ດາວສູງສຸດແລ້ວ (${maxStars})` };

  const newPets = pets.filter((_, i) => i !== indexA && i !== indexB);
  const mergedPet = { id: petA.id, stars: petA.stars + 1 };
  newPets.push(mergedPet);

  return { success: true, pets: newPets, mergedPet };
}
