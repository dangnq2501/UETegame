export const GAME_WIDTH = 800;
export const CARD_WIDTH = 150;
export const CARD_HEIGHT = 150;

export const POISION_DAMAGE = 1;
export const POISON_DURATION = 3;

export const FIRE_DAMAGE = 2;
export const FIRE_DURATION = 2;

export const CHARACTER_CONFIGS = {
  knight: {
    displayName: "Knight",
    name: "knight",
    group: "player",
    maxHealth: 15,
    inventory: ["iron_sword", null, null, null, null],
    spritesheet: {
      idle: [0, 3],
      width: 24,
      height: 24,
    },
  },
};

export const ITEM_CONFIGS = {
  iron_sword: {
    displayName: "Sword",
    name: "iron_sword",
    group: "weapon",
    subgroup: "sword",
    damage: 3,
    maxDurability: 2,
    spritesheet: {
      width: 12,
      height: 24,
      scale: 0.45,
    },
    price: 2,
  },
  golden_sword: {
    displayName: "Sword",
    name: "golden_sword",
    group: "weapon",
    subgroup: "sword",
    damage: 6,
    maxDurability: 1,
    spritesheet: {
      width: 12,
      height: 24,
      scale: 0.45,
    },
    price: 3,
  },
  diamond_sword: {
    displayName: "Sword",
    name: "diamond_sword",
    group: "weapon",
    subgroup: "sword",
    damage: 5,
    maxDurability: 3,
    spritesheet: {
      width: 12,
      height: 24,
      scale: 0.45,
    },
    price: 4,
  },
  health_potion: {
    displayName: "Health Potion",
    name: "health_potion",
    group: "potion",
    subgroup: "health",
    spritesheet: {
      width: 16,
      height: 16,
      scale: 0.75,
    },
    amount: 5,
  },
  tiny_health_potion: {
    displayName: "Health Potion",
    name: "tiny_health_potion",
    group: "potion",
    subgroup: "health",
    spritesheet: {
      width: 16,
      height: 16,
      scale: 0.75,
    },
    amount: 2,
  },
  poison_potion: {
    displayName: "Poison Potion",
    name: "poison_potion",
    group: "potion",
    subgroup: "poison",
    spritesheet: {
      width: 16,
      height: 16,
      scale: 0.75,
    },
    amount: 2,
    duration: 4,
  },
  tiny_poison_potion: {
    displayName: "Poison Potion",
    name: "tiny_poison_potion",
    group: "potion",
    subgroup: "poison",
    spritesheet: {
      width: 16,
      height: 16,
      scale: 0.75,
    },
    amount: 1,
    duration: 2,
  },
  blue_potion: {
    displayName: "Blue Potion",
    name: "blue_potion",
    group: "potion",
    subgroup: "blue",
    spritesheet: {
      width: 16,
      height: 16,
      scale: 0.75,
    },
    amount: 0.2,
    duration: 4,
  },
  tiny_blue_potion: {
    displayName: "Blue Potion",
    name: "tiny_blue_potion",
    group: "potion",
    subgroup: "blue",
    spritesheet: {
      width: 16,
      height: 16,
      scale: 0.75,
    },
    amount: 0.1,
    duration: 2,
  },
  power_potion: {
    displayName: "Power Potion",
    name: "power_potion",
    group: "potion",
    subgroup: "power",
    spritesheet: {
      width: 16,
      height: 16,
      scale: 0.75,
    },
    amount: {
      damage: 3,
      armor: 5,
    },
    duration: 4,
  },
  tiny_power_potion: {
    displayName: "Power Potion",
    name: "tiny_power_potion",
    group: "potion",
    subgroup: "power",
    spritesheet: {
      width: 16,
      height: 16,
      scale: 0.75,
    },
    amount: {
      damage: 1,
      armor: 2,
    },
    duration: 2,
  },
  campfire: {
    displayName: "Campfire",
    name: "campfire",
    group: "campfire",
    spritesheet: {
      idle: [0, 2],
      width: 16,
      height: 16,
      scale: 0.8,
    },
  },
  gem: {
    displayName: "Gem",
    name: "gem",
    group: "gem",
    spritesheet: {
      width: 16,
      height: 16,
      scale: 0.75,
    },
    amount: 1,
  },
};

export const MOB_CONFIGS = {
  skeleton: {
    displayName: "Skeleton",
    name: "skeleton",
    group: "monster",
    maxHealth: 1,
    damage: 1,
    reward: 1,
    spritesheet: {
      idle: [0, 3],
      width: 24,
      height: 24,
    },
  },
  orc: {
    displayName: "Orc",
    name: "orc",
    group: "monster",
    maxHealth: 2,
    damage: 3,
    reward: 2,
    spritesheet: {
      idle: [0, 3],
      width: 24,
      height: 24,
    },
  },
  demon: {
    displayName: "Demon",
    name: "demon",
    group: "monster",
    maxHealth: 4,
    damage: 5,
    reward: 3,
    spritesheet: {
      idle: [0, 3],
      width: 24,
      height: 24,
    },
  },
};
