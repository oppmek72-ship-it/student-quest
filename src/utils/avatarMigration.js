import { DEFAULT_AVATAR, FREE_ITEM_IDS } from "../constants/avatarSvg";

// Migrate old emoji-based avatar to new SVG avatar format
export function migrateAvatar(student) {
  // Already new format
  if (student.avatar && student.avatar.skinTone) {
    return student;
  }

  const oldAvatar = student.avatar || {};
  const newAvatar = { ...DEFAULT_AVATAR };

  // Map old body IDs to skin tones
  const bodyMap = {
    body1: "sk1",
    body2: "sk2",
    body3: "sk3",
  };
  if (oldAvatar.body && bodyMap[oldAvatar.body]) {
    newAvatar.skinTone = bodyMap[oldAvatar.body];
  }

  // Map old hat IDs
  const hatMap = {
    hat1: "ht1",
    hat2: "ht5",
    hat3: "ht4",
  };
  if (oldAvatar.hat && hatMap[oldAvatar.hat]) {
    newAvatar.hat = hatMap[oldAvatar.hat];
  }

  // Map old accessory IDs
  const accMap = {
    acc1: "ac1",
    acc2: "ac3",
    acc3: "ac5",
  };
  if (oldAvatar.accessory && accMap[oldAvatar.accessory]) {
    newAvatar.accessory = accMap[oldAvatar.accessory];
  }

  // Build owned items: free items + any mapped items
  const ownedItems = [...new Set([
    ...FREE_ITEM_IDS,
    ...(student.ownedAvatarItems || []),
    newAvatar.skinTone,
    newAvatar.hair,
    newAvatar.hairColor,
    newAvatar.face,
    newAvatar.top,
    newAvatar.bottom,
    newAvatar.shoes,
    newAvatar.hat,
    newAvatar.accessory,
  ])];

  return {
    ...student,
    avatar: newAvatar,
    ownedAvatarItems: ownedItems,
  };
}

// Ensure a student has all required avatar fields and owned items
export function ensureAvatarDefaults(student) {
  const avatar = student.avatar && student.avatar.skinTone
    ? student.avatar
    : DEFAULT_AVATAR;

  const ownedItems = student.ownedAvatarItems && student.ownedAvatarItems.length > 0
    ? [...new Set([...student.ownedAvatarItems, ...FREE_ITEM_IDS])]
    : [...FREE_ITEM_IDS];

  return {
    ...student,
    avatar,
    ownedAvatarItems: ownedItems,
  };
}
