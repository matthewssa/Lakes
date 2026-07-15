///////////////////// Static Enemies List /////////////////////
// Static enemy definition
// Array to hold multiple enemies
const enemies = [
{
    name: "Teddy Titan",
    class: "Snuggler",
    race: "Stuffed Bear",
    level: 0,
    currentHp: 9999,  // Cannot die, extremely durable
    maxHp: 9999,      // Matches current HP
    currentMp: 0,     // No magical abilities
    maxMp: 0,         // Not using MP
    atk: 1,           // Slight attack power, more for playfulness
    hit: 0,           // No significant combat precision
    cri: 0,           // Cannot critically strike
    apr: 0,           // No attacks per round
    dr: 5,            // Slight damage reduction due to fluffiness
    ac: 12,           // A bit more durable than the pillow, still soft
    abilities: {
        strength: { score: 3, modifier: -4 },  // Slightly stronger than a pillow
        dexterity: { score: 1, modifier: -5 }, // Not very mobile, waddles slowly
        constitution: { score: 20, modifier: 5 }, // Extremely tough, resilient to damage
        intelligence: { score: 1, modifier: -5 }, // It's still just a stuffed bear
        willpower: { score: 1, modifier: -5 },    // Easily distracted by cuddles
        charisma: { score: 17, modifier: 3 }      // Adorably charming, everyone loves it
    },
    armorWorn: "Plush Fur",
    weaponWorn: "Bear Hugs", // Represents its signature attack, soft but restraining
    weaponDamage: "1d4",     // Slightly stronger than the pillow, but still minimal damage
    itemsCarried: [
        { name: "Comfort Blanket", effect: "Gives a warm feeling to allies." },
        { name: "Sleepy Dust", effect: "Causes drowsiness to nearby enemies." },
        { name: "Stuffing Patch", effect: "Can self-repair minor tears, restoring a small amount of HP." }
    ],
    description: "A gigantic, plush teddy bear that waddles toward you with outstretched arms. It looks like it wants to give the world's most comforting hug!"
},
    {
        name: "Walter the Town Drunk",
        class: "Fighter",
        race: "Human",
        level: 0,
        currentHp: 30,  // Initial current HP
        maxHp: 30,      // Initial maximum HP
        currentMp: 10,  // Initial current MP
        maxMp: 10,      // Maximum MP (example value)
        atk: 2,         // ATK
        hit: 5,         // Attack modifier
        cri: 0,         // CRI (Critical rate)
        apr: 2,         // Attacks per round
        dr: 1,          // Damage reduction (DR)
        ac: 15,         // Armor Class (AC)
        abilities: {    // Abilities property
            strength: { score: 14, modifier: 2 },
            dexterity: { score: 12, modifier: 1 },
            constitution: { score: 10, modifier: 0 },
            intelligence: { score: 8, modifier: -1 },
            willpower: { score: 11, modifier: 0 },
            charisma: { score: 9, modifier: -1 }
        },
        armorWorn: "Leather Armor",
        weaponWorn: "Short Sword",
        weaponDamage: "1d6 + 2", // Add weapon damage calculation
        itemsCarried: [
            { name: "Health Potion", effect: "Restore 10 HP" },
            { name: "Throwing Knife", damage: "1d4" }
        ],
    },
    {
        name: "Rogar the Bandit",
        class: "Bandit",
        race: "Human",
        level: 2,
        currentHp: 28,
        maxHp: 28,
        currentMp: 8,
        maxMp: 8,
        atk: 3,
        hit: 5,
        cri: 5, // Bandits often have a higher crit chance
        apr: 2,
        dr: 0,
        ac: 14,
        abilities: {
            strength: { score: 12, modifier: 1 },
            dexterity: { score: 16, modifier: 3 }, // High dexterity for sneak attacks
            constitution: { score: 10, modifier: 0 },
            intelligence: { score: 10, modifier: 0 },
            willpower: { score: 9, modifier: -1 },
            charisma: { score: 11, modifier: 0 }
        },
        armorWorn: "Leather Armor",
        weaponWorn: "Dagger",
        weaponDamage: "1d4 + 3", // Uses Dexterity for damage
        itemsCarried: [
            { name: "Smoke Bomb", effect: "Create a distraction" },
            { name: "Stolen Gold", amount: 20 }
        ],
    },
    {
        name: "Sly the Cunning",
        class: "Bandit",
        race: "Half-Orc",
        level: 4,
        currentHp: 26,
        maxHp: 26,
        currentMp: 6,
        maxMp: 6,
        atk: 3,
        hit: 5,
        cri: 7, // Higher crit chance for surprise attacks
        apr: 2,
        dr: 0,
        ac: 13,
        abilities: {
            strength: { score: 14, modifier: 2 },
            dexterity: { score: 14, modifier: 2 },
            constitution: { score: 12, modifier: 1 },
            intelligence: { score: 8, modifier: -1 },
            willpower: { score: 10, modifier: 0 },
            charisma: { score: 12, modifier: 1 }
        },
        armorWorn: "Studded Leather Armor",
        weaponWorn: "Short Bow",
        weaponDamage: "1d6 + 2", // Uses Dexterity for damage
        itemsCarried: [
            { name: "Healing Salve", effect: "Restore 5 HP" },
            { name: "Lockpick Set", effect: "Used for opening locked doors" }
        ],
    }
];
