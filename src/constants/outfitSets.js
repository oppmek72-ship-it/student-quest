// 5 Outfit Set Presets — quick-apply shortcuts
export const OUTFIT_SETS = [
  {
    id: "set_warrior",
    name: "ນັກຮົບ",
    emoji: "⚔️",
    description: "ຊຸດເກາະແກ້ວນັກຮົບ",
    pieces: {
      top: "tp2",
      bottom: "bt3",
      shoes: "sh2",
      hat: "ht1",
      accessory: "ac1",
    },
  },
  {
    id: "set_wizard",
    name: "ນັກເວດ",
    emoji: "🧙",
    description: "ຊຸດນັກເວດມົນ",
    pieces: {
      top: "tp3",
      bottom: "bt1",
      shoes: "sh5",
      hat: "ht2",
      accessory: "ac2",
    },
  },
  {
    id: "set_ninja",
    name: "ນິນຈາ",
    emoji: "🥷",
    description: "ຊຸດນິນຈາລັບ",
    pieces: {
      top: "tp4",
      bottom: "bt4",
      shoes: "sh3",
      hat: "ht3",
      accessory: "ac1",
    },
  },
  {
    id: "set_royal",
    name: "ກະສັດ",
    emoji: "👑",
    description: "ຊຸດກະສັດ/ນາງພະຍາ",
    pieces: {
      top: "tp5",
      bottom: "bt5",
      shoes: "sh4",
      hat: "ht4",
      accessory: "ac5",
    },
  },
  {
    id: "set_student",
    name: "ນັກຮຽນ",
    emoji: "📚",
    description: "ຊຸດນັກຮຽນ",
    pieces: {
      top: "tp6",
      bottom: "bt1",
      shoes: "sh1",
      hat: "ht0",
      accessory: "ac4",
    },
  },
];

// Get total cost of missing pieces in a set
export function getSetMissingCost(set, ownedItems, allItems) {
  let cost = 0;
  const missing = [];
  for (const [cat, itemId] of Object.entries(set.pieces)) {
    if (!ownedItems.includes(itemId)) {
      const item = allItems.find((i) => i.id === itemId);
      if (item) {
        cost += item.cost;
        missing.push(item);
      }
    }
  }
  return { cost, missing };
}
