const items = [
    // Potions
    {
        type: "Potion",
        name: "Potion of Healing",
        effect: "Restores 2d4 + 2 hit points.",
        cost: "50 gp",
        description: "A red liquid that glows faintly."
    },
    {
		type: "Potion",
        name: "Potion of Greater Healing",
        effect: "Restores 4d4 + 4 hit points.",
        cost: "150 gp",
        description: "A thicker red liquid with a strong aroma."
    },
    {
		type: "Potion",
        name: "Potion of Invisibility",
        effect: "Grants invisibility for 1 hour.",
        cost: "300 gp",
        description: "A clear liquid that shimmers."
    },
    {
		type: "Potion",
        name: "Potion of Speed",
        effect: "Double your movement speed for 1 minute.",
        cost: "300 gp",
        description: "A swirling liquid that changes colors."
    },
    {
		type: "Potion",
        name: "Potion of Strength",
        effect: "Increases strength by 4 for 1 hour.",
        cost: "200 gp",
        description: "A cloudy yellow liquid."
    },
	// Weapons
	{
        type: "Weapon",
        name: "Unarmed",
		displayName: "Unarmed",
        cost: "0 gp",
        damage_roll: "1d3",
		damage_type: "bludgeoning",
        weight: 0,
        properties: ["Light"],
        description: "1d3, A basic physical attack using your body, effective for self-defense or desperate situations."
	},
	{
        type: "Weapon",
        name: "Club",
		displayName: "Club",
        cost: "1 sp",
        damage_roll: "1d4",
		damage_type: "bludgeoning",
        weight: 2,
        properties: ["Light"],
        description: "1d4, A simple wooden club, often used by commoners."
    },
    {
        type: "Weapon",
        name: "Dagger",
		displayName: "Dagger",
        cost: "2 gp",
        damage_roll: "1d4",
		damage_type: "piercing",
        weight: 1,
        properties: ["Finesse", "Light", "Thrown (20/60)"],
        description: "1d4, A small blade designed for quick and precise attacks."
    },
    {
        type: "Weapon",
        name: "Greatclub",
		displayName: "Greatclub",
        cost: "2 sp",
        damage_roll: "1d8",
		damage_type: "bludgeoning",
        weight: 10,
        properties: ["Two-handed"],
        description: "1d8, A massive, heavy club capable of dealing significant damage."
    },
    {
        type: "Weapon",
        name: "Handaxe",
		displayName: "Handaxe",
        cost: "5 gp",
        damage_roll: "1d6",
		damage_type: "slashing",
        weight: 2,
        properties: ["Light", "Thrown (20/60)"],
        description: "1d6, A small axe that can be thrown or used in close combat."
    },
    {
        type: "Weapon",
        name: "Javelin",
		displayName: "Javelin",
        cost: "5 sp",
        damage_roll: "1d6",
		damage_type: "piercing",
        weight: 2,
        properties: ["Thrown (30/120)"],
        description: "1d6, A lightweight spear designed for throwing at a distance."
    },
    {
        type: "Weapon",
        name: "Light hammer",
		displayName: "Light hammer",
        cost: "2 gp",
        damage_roll: "1d4",
		damage_type: "bludgeoning",
        weight: 2,
        properties: ["Light", "Thrown (20/60)"],
        description: "1d4, A small hammer, useful for both melee and ranged attacks."
    },
    {
        type: "Weapon",
        name: "Mace",
		displayName: "Mace",
        cost: "5 gp",
        damage_roll: "1d6",
		damage_type: "bludgeoning",
        weight: 4,
        properties: [],
        description: "1d6, A spiked club designed to deliver crushing blows."
    },
    {
        type: "Weapon",
        name: "Quarterstaff",
		displayName: "Quarterstaff",
        cost: "2 sp",
        damage_roll: "1d6",
		damage_type: "bludgeoning",
        weight: 4,
        properties: ["Versatile (1d8)"],
        description: "1d6, A wooden staff used by monks and travelers for defense."
    },
    {
        type: "Weapon",
        name: "Sickle",
		displayName: "Sickle",
        cost: "1 gp",
        damage_roll: "1d4",
		damage_type: "slashing",
        weight: 2,
        properties: ["Light"],
        description: "1d4, A small farming tool repurposed as a weapon."
    },
    {
        type: "Weapon",
        name: "Spear",
		displayName: "Spear",
        cost: "1 gp",
        damage_roll: "1d6",
		damage_type: "piercing",
        weight: 3,
        properties: ["Thrown (20/60)", "Versatile (1d8)"],
        description: "1d6, A versatile weapon that can be used for both stabbing and throwing."
    },
    {
        type: "Weapon",
        name: "Crossbow, light",
		displayName: "Crossbow, light",
        cost: "25 gp",
        damage_roll: "1d8",
		damage_type: "piercing",
        weight: 5,
        properties: ["Ammunition", "Range (80/320)", "Loading", "Two-handed"],
        description: "1d8, A smaller crossbow, ideal for rapid-fire in ranged combat."
    },
    {
        type: "Weapon",
        name: "Dart",
		displayName: "Dart",
        cost: "5 cp",
        damage_roll: "1d4",
		damage_type: "piercing",
        weight: 0.25,
        properties: ["Finesse", "Thrown (20/60)"],
        description: "1d4, A small, sharp projectile designed for precision throws."
    },
    {
        type: "Weapon",
        name: "Shortbow",
		displayName: "Shortbow",
        cost: "25 gp",
        damage_roll: "1d6",
		damage_type: "piercing",
        weight: 2,
        properties: ["Ammunition", "Range (80/320)", "Two-handed"],
        description: "1d6, A lightweight bow, perfect for quick ranged attacks."
    },
    {
        type: "Weapon",
        name: "Sling",
		displayName: "Sling",
        cost: "1 sp",
        damage_roll: "1d4",
		damage_type: "bludgeoning",
        weight: 0,
        properties: ["Ammunition", "Range (30/120)"],
        description: "1d4, A simple weapon for hurling small stones at enemies."
    },
    {
        type: "Weapon",
        name: "Battleaxe",
		displayName: "Battleaxe",
        cost: "10 gp",
        damage_roll: "1d8",
		damage_type: "slashing",
        weight: 4,
        properties: ["Versatile (1d10)"],
        description: "1d8, A heavy axe capable of devastating strikes in battle."
    },
	{
		type: "Weapon",
		name: "Flail",
		displayName: "Flail",
		cost: "10 gp",
		damage_roll: "1d8",
		damage_type: "bludgeoning",
		weight: 2,
		properties: [],
		description: "1d8, A spiked ball attached to a handle with a chain, effective for crushing armor."
	},
	{
		type: "Weapon",
		name: "Glaive",
		displayName: "Glaive",
		cost: "20 gp",
		damage_roll: "1d10",
		damage_type: "slashing",
		weight: 6,
		properties: ["Heavy", "Reach", "Two-handed"],
		description: "1d10, A polearm with a long blade at the end, allowing for sweeping strikes from a distance."
	},
	{
		type: "Weapon",
		name: "Greataxe",
		displayName: "Greataxe",
		cost: "30 gp",
		damage_roll: "1d12",
		damage_type: "slashing",
		weight: 7,
		properties: ["Heavy", "Two-handed"],
		description: "1d12, A large, double-bladed axe designed to cleave through foes with devastating power."
	},
	{
		type: "Weapon",
		name: "Greatsword",
		displayName: "Greatsword",
		cost: "50 gp",
		damage_roll: "2d6",
		damage_type: "slashing",
		weight: 6,
		properties: ["Heavy", "Two-handed"],
		description: "2d6, A massive sword that requires two hands to wield, capable of striking with immense force."
	},
	{
		type: "Weapon",
		name: "Halberd",
		displayName: "Halberd",
		cost: "20 gp",
		damage_roll: "1d10",
		damage_type: "slashing",
		weight: 6,
		properties: ["Heavy", "Reach", "Two-handed"],
		description: "1d10, A long weapon combining an axe blade and spear tip, versatile for thrusting and cutting."
	},	
	{
		type: "Weapon",
		name: "Lance",
		displayName: "Lance",
		cost: "10 gp",
		damage_roll: "1d12",
		damage_type: "piercing",
		weight: 6,
		properties: ["Reach", "Special"],
		description: "1d12, A long, pointed weapon typically used from horseback to impale enemies."
	},
	{
		type: "Weapon",
		name: "Longsword",
		displayName: "Longsword",
		cost: "15 gp",
		damage_roll: "1d8",
		damage_type: "slashing",
		weight: 3,
		properties: ["Versatile (1d10)"],
		description: "1d8, A balanced sword favored for its reliability, can be wielded one or two-handed."
	},
	{
		type: "Weapon",
		name: "Maul",
		displayName: "Maul",
		cost: "10 gp",
		damage_roll: "2d6",
		damage_type: "bludgeoning",
		weight: 10,
		properties: ["Heavy", "Two-handed"],
		description: "2d6, A large hammer-like weapon designed for crushing enemies and objects alike."
	},
	{
		type: "Weapon",
		name: "Morningstar",
		displayName: "Morningstar",
		cost: "15 gp",
		damage_roll: "1d8",
		damage_type: "piercing",
		weight: 4,
		properties: [],
		description: "1d8, A spiked weapon capable of dealing deep puncture wounds through armor."
	},
	{
		type: "Weapon",
		name: "Pike",
		displayName: "Pike",
		cost: "5 gp",
		damage_roll: "1d10",
		damage_type: "piercing",
		weight: 18,
		properties: ["Heavy", "Reach", "Two-handed"],
		description: "1d10, An extremely long polearm used for keeping enemies at bay, especially cavalry."
	},
	{	
		type: "Weapon",
		name: "Rapier",
		displayName: "Rapier",
		cost: "25 gp",
		damage_roll: "1d8",
		damage_type: "piercing",
		weight: 2,
		properties: ["Finesse"],
		description: "1d8, A thin, elegant blade designed for swift, precise thrusts."
	},
	{
		type: "Weapon",
		name: "Scimitar",
		displayName: "Scimitar",
		cost: "25 gp",
		damage_roll: "1d6",
		damage_type: "slashing",
		weight: 3,
		properties: ["Finesse", "Light"],
		description: "1d6, A curved, single-edged sword known for its speed and effectiveness in slicing attacks."
	},
	{
		type: "Weapon",
		name: "Shortsword",
		displayName: "Shortsword",
		cost: "10 gp",
		damage_roll: "1d6",
		damage_type: "piercing",
		weight: 2,
		properties: ["Finesse", "Light"],
		description: "1d6, A small, versatile blade favored for close combat and ease of use."
	},
	{
		type: "Weapon",
		name: "Trident",
		displayName: "Trident",
		cost: "5 gp",
		damage_roll: "1d6",
		damage_type: "piercing",
		weight: 4,
		properties: ["Thrown (20/60)", "Versatile (1d8)"],
		description: "1d6, A three-pronged spear, useful for both melee combat and throwing."
	},
	{
		type: "Weapon",
		name: "War pick",
		displayName: "War pick",
		cost: "5 gp",
		damage_roll: "1d8",
		damage_type: "piercing",
		weight: 2,
		properties: [],
		description: "1d8, A weapon with a sharp, pointed head for piercing armor and dealing focused damage."
	},
	{
		type: "Weapon",
		name: "Warhammer",
		displayName: "Warhammer",
		cost: "15 gp",
		damage_roll: "1d8",
		damage_type: "bludgeoning",
		weight: 2,
		properties: ["Versatile (1d10)"],
		description: "1d8, A hammer designed for combat, capable of smashing foes or shields."
	},
	{
		type: "Weapon",
		name: "Whip",
		displayName: "Whip",
		cost: "2 gp",
		damage_roll: "1d4",
		damage_type: "slashing",
		weight: 3,
		properties: ["Finesse", "Reach"],
		description: "1d4, A long, flexible weapon used to strike from a distance with speed and precision."
	},
	{
		type: "Weapon",
		name: "Blowgun",
		displayName: "Blowgun",
		cost: "10 gp",
		damage_roll: "1",
		damage_type: "piercing",
		weight: 1,
		properties: ["Ammunition", "Range (25/100)", "Loading"],
		description: "1, A small, silent weapon that shoots tiny darts with precision."
	},
	{
		type: "Weapon",
		name: "Crossbow, hand",
		displayName: "Crossbow, hand",
		cost: "75 gp",
		damage_roll: "1d6",
		damage_type: "piercing",
		weight: 3,
		properties: ["Ammunition", "Range (30/120)", "Light", "Loading"],
		description: "1d6, A one-handed crossbow, small but effective for piercing targets from a distance."
	},
	{
		type: "Weapon",
		name: "Crossbow, heavy",
		displayName: "Crossbow, heavy",
		cost: "50 gp",
		damage_roll: "1d10",
		damage_type: "piercing",
		weight: 18,
		properties: ["Ammunition", "Range (100/400)", "Heavy", "Loading", "Two-handed"],
		description: "1d10, A large, powerful crossbow, best used from long distances for heavy damage."
	},
	{
		type: "Weapon",
		name: "Longbow",
		displayName: "Longbow",
		cost: "50 gp",
		damage_roll: "1d8",
		damage_type: "piercing",
		weight: 2,
		properties: ["Ammunition", "Range (150/600)", "Heavy", "Two-handed"],
		description: "1d8, A tall bow designed for long-range combat, offering precise and powerful shots."
	},
	{
		type: "Weapon",
		name: "Net",
		displayName: "Net",
		cost: "1 gp",
		damage_roll: "—",
		weight: 3,
		properties: ["Special", "Thrown (5/15)"],
		description: "1, A thrown weapon used to entangle and restrain enemies."
	},
	{
		type: "Ammunition",
		name: "Arrows (20)",
		cost: "1 gp",
		weight: 1,
		description: "Standard ammunition for bows, sharp and balanced for long-range shots."
	},
	{
		type: "Ammunition",
		name: "Blowgun needles (50)",
		cost: "1 gp",
		weight: 1,
		description: "Tiny, sharp needles designed for blowguns, capable of delivering poison or damage."
	},
	{
		type: "Ammunition",
		name: "Crossbow bolts (20)",
		cost: "1 gp",
		weight: 1.5,
		description: "Sturdy bolts used for crossbows, ideal for piercing armor and thick hides."
	},
	{
		type: "Ammunition",
		name: "Sling bullets (20)",
		cost: "4 cp",
		weight: 1.5,
		description: "Smooth, rounded stones or metal pellets used with slings to hit targets at range."
	},
	{
		type: "Body",
        name: "Body-None",
		displayName: "None",
        ac: -2,
        weight: 0,
        dexterityCap: Infinity,
        cost: "0 gp",
        description: "No armor equipped."
    },
	{
		type: "Body",
        name: "Padded",
		displayName: "Padded",
        ac: 1,
        type_class: "Light Armor",
        weight: 8,
        dexterityCap: Infinity, // No cap on Dexterity modifier
        cost: "5 gp", // 5 gold pieces
        description: "AC:1 Dex:Inf, A quilted armor offering minimal protection but full mobility."
    },
    {
		type: "Body",
        name: "Leather",
		displayName: "Leather",
        ac: 1,
        type_class: "Light Armor",
        weight: 10,
        dexterityCap: Infinity, // No cap on Dexterity modifier
        cost: "10 gp", // 10 gold pieces
        description: "AC:1 Dex:Inf, Basic leather armor offering light protection and ease of movement."
    },
    {
		type: "Body",
        name: "Studded Leather",
		displayName: "Studded Leather",
        ac: 2,
        type_class: "Light Armor",
        weight: 13,
        dexterityCap: Infinity, // No cap on Dexterity modifier
        cost: "45 gp", // 45 gold pieces
        description: "AC:2 Dex:Inf, Leather armor reinforced with metal studs for added protection."
    },
    {
		type: "Body",
        name: "Hide",
		displayName: "Hide",
        ac: 2,
        type_class: "Medium Armor",
        weight: 12,
        dexterityCap: 2, // Max 2 Dexterity modifier can be applied
        cost: "10 gp", // 10 gold pieces
        description: "AC:2 Dex:2, Armor made from animal hides, providing reasonable protection."
    },
    {
		type: "Body",
        name: "Chain Shirt",
		displayName: "Chain Shirt",
        ac: 3,
        type_class: "Medium Armor",
        weight: 20,
        dexterityCap: 2, // Max 2 Dexterity modifier can be applied
        cost: "50 gp", // 50 gold pieces
        description: "AC:3 Dex:2, A shirt made of chain links, providing flexibility and protection."
    },
    {
		type: "Body",
        name: "Scale Mail",
		displayName: "Scale Mail",
        ac: 4,
        type_class: "Medium Armor",
        weight: 45,
        dexterityCap: 2, // Max 2 Dexterity modifier can be applied
        cost: "50 gp", // 50 gold pieces
        description: "AC:4 Dex:2, Armor made of overlapping metal scales, providing solid protection."
    },
    {
		type: "Body",
        name: "Spiked Armor",
		displayName: "Spiked Armor",
        ac: 4,
        type_class: "Medium Armor",
        weight: 45,
        dexterityCap: 2, // Max 2 Dexterity modifier can be applied
        cost: "75 gp", // 75 gold pieces
        description: "AC:4 Dex:2, Metal armor adorned with spikes, allowing for offensive use."
    },
    {
		type: "Body",
        name: "Breastplate",
		displayName: "Breastplate",
        ac: 4,
        type_class: "Medium Armor",
        weight: 20,
        dexterityCap: 2, // Max 2 Dexterity modifier can be applied
        cost: "400 gp", // 400 gold pieces
        description: "AC:4 Dex:2, A metal chestplate offering protection without sacrificing mobility."
    },
    {
		type: "Body",
        name: "Half Plate",
		displayName: "Half Plate",
        ac: 5,
        type_class: "Medium Armor",
        weight: 40,
        dexterityCap: 2, // Max 2 Dexterity modifier can be applied
        cost: "750 gp", // 750 gold pieces
        description: "AC5 Dex:2, Half plate consists of metal armor protecting vital areas."
    },
    {
		type: "Body",
        name: "Chain Mail",
		displayName: "Chain Mail",
        ac: 6,
        type_class: "Heavy Armor",
        weight: 55,
        dexterityCap: 0, // No Dexterity modifier can be applied
        cost: "75 gp", // 75 gold pieces
        description: "AC:6 Dex:0, Heavy armor made of interlocking chains, providing strong protection."
    },
    {
		type: "Body",
        name: "Ring Mail",
		displayName: "Ring Mail",
        ac: 4,
        type_class: "Heavy Armor",
        weight: 40,
        dexterityCap: 0, // No Dexterity modifier can be applied
        cost: "30 gp", // 30 gold pieces
        description: "AC4 Dex:0, Heavy armor made of interlocking rings, offering substantial protection."
    },
    {
		type: "Body",
        name: "Splint Armor",
		displayName: "Splint Armor",
        ac: 7,
        type_class: "Heavy Armor",
        weight: 60,
        dexterityCap: 0, // No Dexterity modifier can be applied
        cost: "200 gp", // 200 gold pieces
        description: "AC:7 Dex:0, Heavy armor made of metal strips, providing strong protection."
    },
    {
		type: "Body",
        name: "Plate Armor",
		displayName: "Plate Armor",
        ac: 8,
        type_class: "Heavy Armor",
        weight: 65,
        dexterityCap: 0, // No Dexterity modifier can be applied
        cost: "1,500 gp", // 1,500 gold pieces
        description: "AC:8 Dex:0, Full metal plate armor providing maximum protection at the cost of mobility."
    },
    {
		type: "Shield",
        name: "Shield-None",
		displayName: "None",
        ac: -1,
        weight: 0,
        dexterityCap: Infinity,
        cost: "0 gp",
        description: "No shield equipped."
	},
    {
		type: "Shield",
        name: "Shield",
		displayName: "Shield",
        ac: 2, // This adds to the wearer's AC when equipped
		type_class: "Shield",
        weight: 6,
        dexterityCap: Infinity, // Shield doesn't affect Dexterity modifier
        cost: "10 gp", // 10 gold pieces
        description: "AC:2 Dex:Inf, A shield increases the wearers Armor Class by 2 when used."
    }
];
