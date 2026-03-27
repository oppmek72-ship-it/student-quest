// ===== SVG Avatar System — Path Data & Item Definitions =====
// ViewBox: 200x300, chibi proportions (big head ~40%)

// ── Skin Tones ──
export const SKIN_TONES = [
  { id: "sk1", name: "ຂາວ", color: "#FDEBD0", shadow: "#F5CBA7", cost: 0 },
  { id: "sk2", name: "ສົ້ມ", color: "#F5CBA7", shadow: "#E8B98A", cost: 0 },
  { id: "sk3", name: "ນ້ຳຕານ", color: "#D4A574", shadow: "#C4956A", cost: 0 },
  { id: "sk4", name: "ເຂັ້ມ", color: "#8D6E63", shadow: "#6D4C41", cost: 0 },
  { id: "sk5", name: "ຟ້າວິເສດ", color: "#81D4FA", shadow: "#4FC3F7", cost: 30, rarity: "rare" },
  { id: "sk6", name: "ມ່ວງວິເສດ", color: "#CE93D8", shadow: "#BA68C8", cost: 30, rarity: "rare" },
];

// ── Hair Styles ──
// Each hair has a `front` and `back` SVG path
export const HAIR_STYLES = [
  {
    id: "hr0", name: "ບໍ່ໃສ່ຜົມ", cost: 0,
    back: "",
    front: "",
  },
  {
    id: "hr1", name: "ຜົມສັ້ນ", cost: 0,
    back: `<ellipse cx="100" cy="68" rx="56" ry="50" opacity="0.3"/>`,
    front: `<path d="M50,78 Q50,28 100,22 Q150,28 150,78 Q140,55 100,50 Q60,55 50,78Z"/>`,
  },
  {
    id: "hr2", name: "ຜົມຍາວ", cost: 0,
    back: `<ellipse cx="100" cy="68" rx="58" ry="52" opacity="0.3"/>
           <path d="M48,78 Q42,130 55,180 Q60,190 65,178 Q55,130 58,78Z" opacity="0.8"/>
           <path d="M152,78 Q158,130 145,180 Q140,190 135,178 Q145,130 142,78Z" opacity="0.8"/>`,
    front: `<path d="M48,82 Q48,25 100,18 Q152,25 152,82 Q145,50 100,42 Q55,50 48,82Z"/>`,
  },
  {
    id: "hr3", name: "ຜົມບັອບ", cost: 0,
    back: `<ellipse cx="100" cy="68" rx="58" ry="52" opacity="0.3"/>`,
    front: `<path d="M48,80 Q48,26 100,20 Q152,26 152,80 L148,100 Q140,85 130,80 L125,55 Q100,45 75,55 L70,80 Q60,85 52,100Z"/>`,
  },
  {
    id: "hr4", name: "ຜົມຫຍິກ", cost: 15,
    back: `<ellipse cx="100" cy="68" rx="60" ry="55" opacity="0.3"/>
           <circle cx="55" cy="110" r="12" opacity="0.5"/>
           <circle cx="145" cy="110" r="12" opacity="0.5"/>`,
    front: `<path d="M46,82 Q46,24 100,16 Q154,24 154,82Z"/>
            <circle cx="60" cy="50" r="8" opacity="0.3" fill="#fff"/>
            <circle cx="120" cy="40" r="6" opacity="0.2" fill="#fff"/>`,
  },
  {
    id: "hr5", name: "ຫາງມ້າ", cost: 20,
    back: `<ellipse cx="100" cy="68" rx="56" ry="50" opacity="0.3"/>
           <path d="M130,50 Q165,55 160,120 Q158,140 148,130 Q155,80 135,60Z" opacity="0.9"/>`,
    front: `<path d="M50,78 Q50,26 100,20 Q150,26 150,78 Q140,52 100,46 Q60,52 50,78Z"/>`,
  },
  {
    id: "hr6", name: "ຜົມແຫຼມ", cost: 25, rarity: "epic",
    back: `<ellipse cx="100" cy="68" rx="58" ry="52" opacity="0.3"/>`,
    front: `<path d="M44,85 L60,15 L80,55 L100,5 L120,55 L140,15 L156,85 Q150,50 100,42 Q50,50 44,85Z"/>`,
  },
];

// ── Hair Colors ──
export const HAIR_COLORS = [
  { id: "hc1", name: "ດຳ", color: "#2C3E50", highlight: "#34495E", cost: 0 },
  { id: "hc2", name: "ນ້ຳຕານ", color: "#8B4513", highlight: "#A0522D", cost: 0 },
  { id: "hc3", name: "ບອນ", color: "#D4A76A", highlight: "#E8C88A", cost: 0 },
  { id: "hc4", name: "ແດງ", color: "#C0392B", highlight: "#E74C3C", cost: 10 },
  { id: "hc5", name: "ຟ້າ", color: "#2980B9", highlight: "#3498DB", cost: 15 },
  { id: "hc6", name: "ຊົມພູ", color: "#E91E8C", highlight: "#FF69B4", cost: 15 },
  { id: "hc7", name: "ຂຽວ", color: "#27AE60", highlight: "#2ECC71", cost: 15 },
  { id: "hc8", name: "ທອງ", color: "#F1C40F", highlight: "#F9E547", cost: 25, rarity: "epic" },
];

// ── Face Expressions ──
export const FACES = [
  {
    id: "fc1", name: "ຍິ້ມ", cost: 0,
    svg: `<circle cx="85" cy="78" r="4" fill="#2C3E50"/>
          <circle cx="115" cy="78" r="4" fill="#2C3E50"/>
          <circle cx="86" cy="76" r="1.5" fill="#fff"/>
          <circle cx="116" cy="76" r="1.5" fill="#fff"/>
          <path d="M88,92 Q100,102 112,92" fill="none" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round"/>
          <ellipse cx="74" cy="87" rx="6" ry="3.5" fill="#FBBCBC" opacity="0.5"/>
          <ellipse cx="126" cy="87" rx="6" ry="3.5" fill="#FBBCBC" opacity="0.5"/>`,
  },
  {
    id: "fc2", name: "ຕື່ນເຕັ້ນ", cost: 0,
    svg: `<ellipse cx="85" cy="78" rx="5" ry="6" fill="#2C3E50"/>
          <ellipse cx="115" cy="78" rx="5" ry="6" fill="#2C3E50"/>
          <circle cx="86" cy="76" r="2" fill="#fff"/>
          <circle cx="116" cy="76" r="2" fill="#fff"/>
          <ellipse cx="100" cy="96" rx="7" ry="5" fill="#2C3E50"/>
          <ellipse cx="100" cy="94" rx="5" ry="2" fill="#C0392B"/>
          <ellipse cx="74" cy="87" rx="7" ry="4" fill="#FBBCBC" opacity="0.6"/>
          <ellipse cx="126" cy="87" rx="7" ry="4" fill="#FBBCBC" opacity="0.6"/>`,
  },
  {
    id: "fc3", name: "ເທ່", cost: 0,
    svg: `<line x1="78" y1="78" x2="92" y2="78" stroke="#2C3E50" stroke-width="3" stroke-linecap="round"/>
          <line x1="108" y1="78" x2="122" y2="78" stroke="#2C3E50" stroke-width="3" stroke-linecap="round"/>
          <path d="M92,92 L108,92" fill="none" stroke="#2C3E50" stroke-width="2" stroke-linecap="round"/>`,
  },
  {
    id: "fc4", name: "ຫຼັບຕາ", cost: 10,
    svg: `<path d="M78,78 Q85,72 92,78" fill="none" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M108,78 Q115,72 122,78" fill="none" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M90,94 Q100,100 110,94" fill="none" stroke="#2C3E50" stroke-width="2" stroke-linecap="round"/>
          <ellipse cx="74" cy="85" rx="5" ry="3" fill="#FBBCBC" opacity="0.4"/>
          <ellipse cx="126" cy="85" rx="5" ry="3" fill="#FBBCBC" opacity="0.4"/>`,
  },
  {
    id: "fc5", name: "ຫ້າວຫານ", cost: 15,
    svg: `<path d="M78,74 L88,70" fill="none" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M122,74 L112,70" fill="none" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="85" cy="80" r="4" fill="#2C3E50"/>
          <circle cx="115" cy="80" r="4" fill="#2C3E50"/>
          <circle cx="86" cy="78" r="1.5" fill="#fff"/>
          <circle cx="116" cy="78" r="1.5" fill="#fff"/>
          <path d="M90,95 Q100,100 110,95" fill="none" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round"/>`,
  },
  {
    id: "fc6", name: "ດາວຕາ", cost: 30, rarity: "epic",
    svg: `<polygon points="85,72 87,77 92,78 88,81 89,86 85,83 81,86 82,81 78,78 83,77" fill="#F1C40F"/>
          <polygon points="115,72 117,77 122,78 118,81 119,86 115,83 111,86 112,81 108,78 113,77" fill="#F1C40F"/>
          <path d="M88,94 Q100,104 112,94" fill="none" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round"/>
          <ellipse cx="74" cy="87" rx="6" ry="3.5" fill="#FBBCBC" opacity="0.5"/>
          <ellipse cx="126" cy="87" rx="6" ry="3.5" fill="#FBBCBC" opacity="0.5"/>`,
  },
];

// ── Tops (Shirts) ──
export const TOPS = [
  {
    id: "tp0", name: "ເສື້ອຂາວ", cost: 0,
    svg: (skin) => `
      <path d="M72,140 L62,145 L55,175 L65,178 L75,155 L75,195 L125,195 L125,155 L135,178 L145,175 L138,145 L128,140Z"
        fill="#ECF0F1" stroke="#BDC3C7" stroke-width="1"/>
      <path d="M75,155 L75,195 L125,195 L125,155" fill="#ECF0F1" stroke="#BDC3C7" stroke-width="0.5"/>
      <line x1="100" y1="145" x2="100" y2="192" stroke="#BDC3C7" stroke-width="0.8" stroke-dasharray="3,3"/>
      <circle cx="100" cy="152" r="2" fill="#BDC3C7"/>
      <circle cx="100" cy="164" r="2" fill="#BDC3C7"/>
      <circle cx="100" cy="176" r="2" fill="#BDC3C7"/>`,
  },
  {
    id: "tp1", name: "ເສື້ອຟ້າ", cost: 0,
    svg: (skin) => `
      <path d="M72,140 L62,145 L55,175 L65,178 L75,155 L75,195 L125,195 L125,155 L135,178 L145,175 L138,145 L128,140Z"
        fill="#3498DB" stroke="#2980B9" stroke-width="1"/>
      <path d="M75,155 L75,195 L125,195 L125,155" fill="#3498DB"/>
      <path d="M85,140 L100,155 L115,140" fill="none" stroke="#2471A3" stroke-width="1.5"/>`,
  },
  {
    id: "tp2", name: "ເກາະແກ້ວ", cost: 10,
    svg: (skin) => `
      <defs><linearGradient id="armorGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#95A5A6"/><stop offset="100%" stop-color="#7F8C8D"/>
      </linearGradient></defs>
      <path d="M72,140 L60,148 L55,178 L65,180 L75,158 L75,195 L125,195 L125,158 L135,180 L145,178 L140,148 L128,140Z"
        fill="url(#armorGrad)" stroke="#707B7C" stroke-width="1.5"/>
      <path d="M80,145 L100,150 L120,145 L118,175 L100,180 L82,175Z" fill="#BDC3C7" stroke="#95A5A6" stroke-width="1"/>
      <circle cx="100" cy="160" r="6" fill="#F1C40F" stroke="#D4AC0D" stroke-width="1"/>`,
  },
  {
    id: "tp3", name: "ເສື້ອນັກເວດ", cost: 15,
    svg: (skin) => `
      <defs><linearGradient id="robeGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#6C3483"/><stop offset="100%" stop-color="#4A235A"/>
      </linearGradient></defs>
      <path d="M68,140 L55,150 L48,185 L65,188 L72,160 L72,200 L128,200 L128,160 L135,188 L152,185 L145,150 L132,140Z"
        fill="url(#robeGrad)" stroke="#512E5F" stroke-width="1"/>
      <path d="M88,142 L100,155 L112,142" fill="none" stroke="#F1C40F" stroke-width="1.5"/>
      <circle cx="100" cy="160" r="4" fill="#F1C40F" opacity="0.8"/>
      <path d="M80,170 Q100,175 120,170" fill="none" stroke="#F1C40F" stroke-width="0.8" opacity="0.5"/>
      <path d="M82,182 Q100,187 118,182" fill="none" stroke="#F1C40F" stroke-width="0.8" opacity="0.5"/>`,
  },
  {
    id: "tp4", name: "ຊຸດນິນຈາ", cost: 15,
    svg: (skin) => `
      <path d="M72,140 L62,145 L56,175 L66,178 L75,155 L75,195 L125,195 L125,155 L134,178 L144,175 L138,145 L128,140Z"
        fill="#2C3E50" stroke="#1A252F" stroke-width="1"/>
      <path d="M85,155 L100,165 L115,155" fill="none" stroke="#E74C3C" stroke-width="2"/>
      <rect x="95" y="170" width="10" height="20" rx="2" fill="#E74C3C" opacity="0.8"/>`,
  },
  {
    id: "tp5", name: "ຊຸດກະສັດ", cost: 25, rarity: "epic",
    svg: (skin) => `
      <defs><linearGradient id="royalGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#C0392B"/><stop offset="50%" stop-color="#922B21"/>
        <stop offset="100%" stop-color="#7B241C"/>
      </linearGradient></defs>
      <path d="M68,140 L55,150 L50,190 L68,195 L72,160 L72,200 L128,200 L128,160 L135,195 L150,190 L145,150 L132,140Z"
        fill="url(#royalGrad)" stroke="#641E16" stroke-width="1.5"/>
      <path d="M72,142 L128,142" fill="none" stroke="#F1C40F" stroke-width="3"/>
      <path d="M75,145 L75,195" fill="none" stroke="#F1C40F" stroke-width="1" opacity="0.4"/>
      <path d="M125,145 L125,195" fill="none" stroke="#F1C40F" stroke-width="1" opacity="0.4"/>
      <circle cx="100" cy="155" r="5" fill="#F1C40F" stroke="#D4AC0D" stroke-width="1"/>
      <circle cx="100" cy="155" r="2.5" fill="#E74C3C"/>`,
  },
  {
    id: "tp6", name: "ເສື້ອນັກຮຽນ", cost: 10,
    svg: (skin) => `
      <path d="M72,140 L62,145 L55,175 L65,178 L75,155 L75,195 L125,195 L125,155 L135,178 L145,175 L138,145 L128,140Z"
        fill="#F5F5F5" stroke="#DDD" stroke-width="1"/>
      <path d="M85,140 L100,155 L115,140" fill="#2C3E50" stroke="#1A252F" stroke-width="1"/>
      <line x1="100" y1="155" x2="100" y2="185" stroke="#E74C3C" stroke-width="4"/>
      <line x1="100" y1="155" x2="100" y2="185" stroke="#C0392B" stroke-width="2"/>`,
  },
];

// ── Bottoms (Pants/Skirts) ──
export const BOTTOMS = [
  {
    id: "bt0", name: "ໂສ້ງຂາວ", cost: 0,
    svg: `<path d="M75,193 L72,250 L92,250 L100,215 L108,250 L128,250 L125,193Z"
      fill="#ECF0F1" stroke="#BDC3C7" stroke-width="1"/>`,
  },
  {
    id: "bt1", name: "ໂສ້ງຟ້າ", cost: 0,
    svg: `<path d="M75,193 L72,250 L92,250 L100,215 L108,250 L128,250 L125,193Z"
      fill="#2980B9" stroke="#21618C" stroke-width="1"/>
    <line x1="87" y1="195" x2="85" y2="248" stroke="#2471A3" stroke-width="0.5" opacity="0.5"/>
    <line x1="113" y1="195" x2="115" y2="248" stroke="#2471A3" stroke-width="0.5" opacity="0.5"/>`,
  },
  {
    id: "bt2", name: "ກະໂປ່ງ", cost: 10,
    svg: `<path d="M73,193 L65,240 Q100,248 135,240 L127,193Z"
      fill="#E91E63" stroke="#C2185B" stroke-width="1"/>
    <path d="M73,193 Q100,200 127,193" fill="none" stroke="#AD1457" stroke-width="1"/>
    <path d="M70,220 Q100,228 130,220" fill="none" stroke="#F48FB1" stroke-width="0.8" opacity="0.5"/>`,
  },
  {
    id: "bt3", name: "ໂສ້ງນັກຮົບ", cost: 15,
    svg: `<path d="M75,193 L70,250 L93,250 L100,218 L107,250 L130,250 L125,193Z"
      fill="#7F8C8D" stroke="#616A6B" stroke-width="1.5"/>
    <rect x="78" y="210" width="16" height="10" rx="2" fill="#95A5A6" stroke="#707B7C" stroke-width="0.5"/>
    <rect x="106" y="210" width="16" height="10" rx="2" fill="#95A5A6" stroke="#707B7C" stroke-width="0.5"/>`,
  },
  {
    id: "bt4", name: "ໂສ້ງນິນຈາ", cost: 15,
    svg: `<path d="M75,193 L72,250 L92,250 L100,215 L108,250 L128,250 L125,193Z"
      fill="#2C3E50" stroke="#1A252F" stroke-width="1"/>
    <path d="M78,230 L92,230" fill="none" stroke="#566573" stroke-width="1.5"/>
    <path d="M108,230 L122,230" fill="none" stroke="#566573" stroke-width="1.5"/>`,
  },
  {
    id: "bt5", name: "ກະໂປ່ງກະສັດ", cost: 25, rarity: "epic",
    svg: `<path d="M70,193 L60,248 Q100,258 140,248 L130,193Z"
      fill="#922B21" stroke="#641E16" stroke-width="1.5"/>
    <path d="M60,248 Q100,258 140,248 Q100,262 60,248Z" fill="#F1C40F" opacity="0.6"/>
    <path d="M70,193 Q100,200 130,193" fill="none" stroke="#F1C40F" stroke-width="1.5"/>`,
  },
];

// ── Shoes ──
export const SHOES = [
  {
    id: "sh0", name: "ເກີບຜ້າ", cost: 0,
    svg: `<ellipse cx="82" cy="258" rx="14" ry="7" fill="#ECF0F1" stroke="#BDC3C7" stroke-width="1"/>
          <ellipse cx="118" cy="258" rx="14" ry="7" fill="#ECF0F1" stroke="#BDC3C7" stroke-width="1"/>`,
  },
  {
    id: "sh1", name: "ເກີບກິລາ", cost: 0,
    svg: `<ellipse cx="82" cy="258" rx="15" ry="8" fill="#2C3E50" stroke="#1A252F" stroke-width="1"/>
          <ellipse cx="118" cy="258" rx="15" ry="8" fill="#2C3E50" stroke="#1A252F" stroke-width="1"/>
          <path d="M72,255 Q82,250 92,255" fill="none" stroke="#E74C3C" stroke-width="1.5"/>
          <path d="M108,255 Q118,250 128,255" fill="none" stroke="#E74C3C" stroke-width="1.5"/>`,
  },
  {
    id: "sh2", name: "ບູດນັກຮົບ", cost: 15,
    svg: `<path d="M70,240 L68,260 Q82,268 96,260 L94,240Z" fill="#7F8C8D" stroke="#616A6B" stroke-width="1.5"/>
          <path d="M106,240 L104,260 Q118,268 132,260 L130,240Z" fill="#7F8C8D" stroke="#616A6B" stroke-width="1.5"/>
          <path d="M70,245 L96,245" fill="none" stroke="#95A5A6" stroke-width="1.5"/>
          <path d="M106,245 L132,245" fill="none" stroke="#95A5A6" stroke-width="1.5"/>`,
  },
  {
    id: "sh3", name: "ເກີບນິນຈາ", cost: 15,
    svg: `<path d="M72,248 L68,260 L82,264 L92,256 L88,248Z" fill="#2C3E50" stroke="#1A252F" stroke-width="1"/>
          <path d="M112,248 L108,260 L118,264 L132,256 L128,248Z" fill="#2C3E50" stroke="#1A252F" stroke-width="1"/>`,
  },
  {
    id: "sh4", name: "ເກີບທອງ", cost: 25, rarity: "epic",
    svg: `<ellipse cx="82" cy="258" rx="15" ry="8" fill="#F1C40F" stroke="#D4AC0D" stroke-width="1.5"/>
          <ellipse cx="118" cy="258" rx="15" ry="8" fill="#F1C40F" stroke="#D4AC0D" stroke-width="1.5"/>
          <ellipse cx="82" cy="256" rx="8" ry="3" fill="#F9E547" opacity="0.5"/>
          <ellipse cx="118" cy="256" rx="8" ry="3" fill="#F9E547" opacity="0.5"/>`,
  },
  {
    id: "sh5", name: "ເກີບວິເສດ", cost: 20,
    svg: `<path d="M70,248 L65,262 Q82,270 96,260 L92,248Z" fill="#6C3483" stroke="#512E5F" stroke-width="1"/>
          <path d="M108,248 L104,262 Q118,270 135,260 L130,248Z" fill="#6C3483" stroke="#512E5F" stroke-width="1"/>
          <circle cx="80" cy="255" r="2" fill="#F1C40F" opacity="0.8"/>
          <circle cx="120" cy="255" r="2" fill="#F1C40F" opacity="0.8"/>`,
  },
];

// ── Hats ──
export const HATS = [
  { id: "ht0", name: "ບໍ່ໃສ່", cost: 0, svg: "" },
  {
    id: "ht1", name: "ໝວກກັນ", cost: 15,
    svg: `<ellipse cx="100" cy="38" rx="55" ry="12" fill="#7F8C8D" stroke="#616A6B" stroke-width="1.5"/>
          <path d="M60,38 Q60,10 100,5 Q140,10 140,38Z" fill="#95A5A6" stroke="#7F8C8D" stroke-width="1"/>
          <path d="M65,35 Q100,30 135,35" fill="none" stroke="#B2BABB" stroke-width="1" opacity="0.5"/>`,
  },
  {
    id: "ht2", name: "ໝວກນັກເວດ", cost: 20,
    svg: `<path d="M65,42 L100,-15 L135,42Z" fill="#4A235A" stroke="#6C3483" stroke-width="1"/>
          <ellipse cx="100" cy="42" rx="40" ry="10" fill="#6C3483" stroke="#4A235A" stroke-width="1"/>
          <circle cx="100" cy="-10" r="4" fill="#F1C40F"/>
          <path d="M80,25 Q90,20 95,30" fill="none" stroke="#F1C40F" stroke-width="0.8" opacity="0.6"/>`,
  },
  {
    id: "ht3", name: "ໝວກນິນຈາ", cost: 15,
    svg: `<path d="M55,80 Q55,30 100,25 Q145,30 145,80 Q130,75 100,72 Q70,75 55,80Z" fill="#2C3E50" stroke="#1A252F" stroke-width="1"/>
          <rect x="55" y="72" width="90" height="10" rx="2" fill="#E74C3C"/>`,
  },
  {
    id: "ht4", name: "ມົງກຸດ", cost: 30, rarity: "epic",
    svg: `<defs><linearGradient id="crownGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F9E547"/><stop offset="100%" stop-color="#F1C40F"/>
          </linearGradient></defs>
          <path d="M65,42 L60,15 L80,28 L100,5 L120,28 L140,15 L135,42Z" fill="url(#crownGrad)" stroke="#D4AC0D" stroke-width="1.5"/>
          <ellipse cx="100" cy="42" rx="38" ry="8" fill="#F1C40F" stroke="#D4AC0D" stroke-width="1"/>
          <circle cx="80" cy="28" r="3" fill="#E74C3C"/>
          <circle cx="100" cy="18" r="3" fill="#3498DB"/>
          <circle cx="120" cy="28" r="3" fill="#2ECC71"/>`,
  },
  {
    id: "ht5", name: "ໂບ", cost: 10,
    svg: `<path d="M80,30 Q70,20 75,10 Q80,15 85,25Z" fill="#E91E63"/>
          <path d="M80,30 Q90,20 85,10 Q80,15 75,25Z" fill="#C2185B"/>
          <circle cx="80" cy="28" r="4" fill="#E91E63" stroke="#AD1457" stroke-width="1"/>`,
  },
  {
    id: "ht6", name: "ເຂົາມັງກອນ", cost: 40, rarity: "legendary",
    svg: `<path d="M60,45 Q50,20 65,5 Q70,15 68,35Z" fill="#E74C3C" stroke="#C0392B" stroke-width="1"/>
          <path d="M140,45 Q150,20 135,5 Q130,15 132,35Z" fill="#E74C3C" stroke="#C0392B" stroke-width="1"/>
          <path d="M75,40 Q70,15 85,0 Q85,18 82,35Z" fill="#C0392B" stroke="#922B21" stroke-width="0.8"/>
          <path d="M125,40 Q130,15 115,0 Q115,18 118,35Z" fill="#C0392B" stroke="#922B21" stroke-width="0.8"/>`,
  },
];

// ── Accessories ──
export const ACCESSORIES = [
  { id: "ac0", name: "ບໍ່ໃສ່", cost: 0, svg: "" },
  {
    id: "ac1", name: "ດາບ", cost: 15,
    svg: `<rect x="148" y="140" width="4" height="50" rx="1" fill="#BDC3C7" stroke="#95A5A6" stroke-width="0.5"/>
          <rect x="142" y="185" width="16" height="6" rx="2" fill="#8B4513" stroke="#6D3A0A" stroke-width="0.5"/>
          <path d="M148,140 L150,135 L152,140" fill="#F1C40F"/>`,
  },
  {
    id: "ac2", name: "ໄມ້ເທົ້າວິເສດ", cost: 20,
    svg: `<line x1="152" y1="130" x2="158" y2="250" stroke="#8B4513" stroke-width="4" stroke-linecap="round"/>
          <circle cx="152" cy="128" r="8" fill="none" stroke="#F1C40F" stroke-width="2"/>
          <circle cx="152" cy="128" r="4" fill="#9B59B6" opacity="0.8"/>
          <circle cx="152" cy="128" r="2" fill="#D2B4DE"/>`,
  },
  {
    id: "ac3", name: "ໂລ່", cost: 15,
    svg: `<path d="M40,150 L30,160 L32,195 Q42,210 52,195 L54,160Z" fill="#C0392B" stroke="#922B21" stroke-width="1.5"/>
          <path d="M42,160 L42,195 Q42,200 47,195" fill="none" stroke="#E74C3C" stroke-width="1" opacity="0.5"/>
          <circle cx="42" cy="175" r="5" fill="#F1C40F" stroke="#D4AC0D" stroke-width="1"/>`,
  },
  {
    id: "ac4", name: "ປຶ້ມ", cost: 10,
    svg: `<rect x="140" y="170" width="22" height="28" rx="2" fill="#2980B9" stroke="#21618C" stroke-width="1"/>
          <rect x="142" y="172" width="18" height="24" rx="1" fill="#EBF5FB"/>
          <line x1="145" y1="178" x2="157" y2="178" stroke="#AEB6BF" stroke-width="0.8"/>
          <line x1="145" y1="183" x2="157" y2="183" stroke="#AEB6BF" stroke-width="0.8"/>
          <line x1="145" y1="188" x2="153" y2="188" stroke="#AEB6BF" stroke-width="0.8"/>`,
  },
  {
    id: "ac5", name: "ປີກນາງຟ້າ", cost: 35, rarity: "epic",
    svg: `<defs><linearGradient id="wingGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#fff" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#AED6F1" stop-opacity="0.6"/>
          </linearGradient></defs>
          <path d="M65,145 Q30,120 25,155 Q28,185 65,180Z" fill="url(#wingGrad)" stroke="#85C1E9" stroke-width="1"/>
          <path d="M135,145 Q170,120 175,155 Q172,185 135,180Z" fill="url(#wingGrad)" stroke="#85C1E9" stroke-width="1"/>
          <path d="M65,150 Q38,130 32,158" fill="none" stroke="#D6EAF8" stroke-width="0.8" opacity="0.6"/>
          <path d="M135,150 Q162,130 168,158" fill="none" stroke="#D6EAF8" stroke-width="0.8" opacity="0.6"/>`,
  },
  {
    id: "ac6", name: "ຫາງມັງກອນ", cost: 40, rarity: "legendary",
    svg: `<path d="M100,200 Q80,220 60,250 Q55,258 65,255 Q80,245 95,225 Q92,235 85,252 Q82,258 90,255 Q100,240 105,210Z"
            fill="#E74C3C" stroke="#C0392B" stroke-width="1"/>
          <path d="M90,235 Q85,242 88,250" fill="none" stroke="#F1948A" stroke-width="0.8" opacity="0.5"/>`,
  },
];

// ── Effects (special visual effects for rare/legendary items) ──
export const EFFECTS = {
  sparkle: `<g class="sparkle-effect">
    <circle cx="60" cy="60" r="2" fill="#F1C40F" opacity="0.8"><animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/></circle>
    <circle cx="140" cy="40" r="1.5" fill="#F1C40F" opacity="0.6"><animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite"/></circle>
    <circle cx="45" cy="120" r="1.5" fill="#F9E547" opacity="0.7"><animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="0.3s" repeatCount="indefinite"/></circle>
    <circle cx="155" cy="130" r="2" fill="#F9E547" opacity="0.5"><animate attributeName="opacity" values="0;1;0" dur="1.6s" begin="0.8s" repeatCount="indefinite"/></circle>
  </g>`,
  glow: (color = "#F1C40F") => `<g class="glow-effect">
    <ellipse cx="100" cy="150" rx="65" ry="90" fill="none" stroke="${color}" stroke-width="2" opacity="0.15">
      <animate attributeName="opacity" values="0.05;0.2;0.05" dur="3s" repeatCount="indefinite"/>
    </ellipse>
  </g>`,
};

// ── Category metadata (for AvatarPage UI) ──
export const AVATAR_CATEGORIES = [
  { key: "skinTone", label: "ສີຜິວ", emoji: "🧑", items: SKIN_TONES },
  { key: "hair", label: "ຜົມ", emoji: "💇", items: HAIR_STYLES },
  { key: "hairColor", label: "ສີຜົມ", emoji: "🎨", items: HAIR_COLORS },
  { key: "face", label: "ໜ້າ", emoji: "😊", items: FACES },
  { key: "top", label: "ເສື້ອ", emoji: "👕", items: TOPS },
  { key: "bottom", label: "ໂສ້ງ", emoji: "👖", items: BOTTOMS },
  { key: "shoes", label: "ເກີບ", emoji: "👟", items: SHOES },
  { key: "hat", label: "ໝວກ", emoji: "🎩", items: HATS },
  { key: "accessory", label: "ອຸປະກອນ", emoji: "⚔️", items: ACCESSORIES },
];

// Default avatar for new students
export const DEFAULT_AVATAR = {
  skinTone: "sk1",
  hair: "hr1",
  hairColor: "hc1",
  face: "fc1",
  top: "tp0",
  bottom: "bt0",
  shoes: "sh0",
  hat: "ht0",
  accessory: "ac0",
};

// Free items every student owns by default
export const FREE_ITEM_IDS = [
  ...SKIN_TONES.filter(i => i.cost === 0).map(i => i.id),
  ...HAIR_STYLES.filter(i => i.cost === 0).map(i => i.id),
  ...HAIR_COLORS.filter(i => i.cost === 0).map(i => i.id),
  ...FACES.filter(i => i.cost === 0).map(i => i.id),
  ...TOPS.filter(i => i.cost === 0).map(i => i.id),
  ...BOTTOMS.filter(i => i.cost === 0).map(i => i.id),
  ...SHOES.filter(i => i.cost === 0).map(i => i.id),
  ...HATS.filter(i => i.cost === 0).map(i => i.id),
  ...ACCESSORIES.filter(i => i.cost === 0).map(i => i.id),
];

// Helper: find item by id across all categories
export function findAvatarItem(id) {
  const all = [
    ...SKIN_TONES, ...HAIR_STYLES, ...HAIR_COLORS, ...FACES,
    ...TOPS, ...BOTTOMS, ...SHOES, ...HATS, ...ACCESSORIES,
  ];
  return all.find(item => item.id === id) || null;
}
