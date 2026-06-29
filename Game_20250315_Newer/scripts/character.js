

const abilityIncreaseLevels = [4, 8, 12, 16, 19];

// Character is now managed under Game.character (see game.js)
const character = {
    name: "Miene Dragonhold",
    class: "Dragon Maiden",
    race: "Human",
    level: 1,
    exp: 0,
    currentHp: 0,
    maxHp: 0,
    currentMp: 0,
    maxMp: 0,
    atk: 0,
    hit: 0,
    cri: 0,
    apr: 1,
    dr: 0,
    ac: 0,
    damageRoll: null,
    abilities: {
        strength: { score: 0, modifier: 0 },
        dexterity: { score: 0, modifier: 0 },
        constitution: { score: 0, modifier: 0 },
        intelligence: { score: 0, modifier: 0 },
        willpower: { score: 0, modifier: 0 },
        charisma: { score: 0, modifier: 0 },
    },
    abilityIncreasesUsed: 0, // Track the number of ability increases used
	
	activeEffects: {},
	
	// mental
	corruptionPercentage: 0,
	innocencePercentage: 100,
	agonyPercentage: 0,
	alcoholPercentage: 0,

	// fortitude
	deadStatus: false,
	blindStatus: false,
	blindDuration: 0,
	paralyzeStatus: false,
	paralyzeDuration: 0,
	stunStatus: false,
	stunDuration: 0,
	shockStatus: false,
	shockDuration: 0,
	burningStatus: false,
	burningDuration: 0,
	freezingStatus: false,
	freezingDuration: 0,
	bleedingStatus: false,
	bleedingDuration: 0,
	vaporsStatus: false,
	vaporsDuration: 0,
	poisonStatus: false,
	poisonDuration: 0,
	unconsciousStatus: false,
	unconsciousDuration: 0,
	
	//reflex
	holdStatus: false,
	knockdownStatus: false,
	bindStatus: false,
	slipoffbody: false,
	rollupskirt: false,
	slipoffbra: false,
	slipoffpanty: false,
	slipoffweapon: false,
	slipoffshield: false,

	//will
	silenceStatus: false,
	silenceDuration: 0,
	confusionStatus: false,
	confusionDuration: 0,
	sleepStatus: false,
	sleepDuration: 0,
	charmStatus: false,
	charmDuration: 0,
	dominateStatus: false,
	dominateDuration: 0,
	fearStatus: false,
	fearDuration: 0,
	hallucinationStatus: false,
	hallucinationDuration: 0,

	//libido
	spreadlegsStatus: false,
	estrusStatus: false,
	vaginaStatus: false,
	analStatus: false,
	blowjobStatus: false,
	pregnantStatus: false,
	fertilityStatus: false,
	fertilityLevel: 0,
	exhaustionStatus: false,
	exhaustionDuration: 0,
	arousalPercentage: 0,
	climaxStatus: false,
	climaxDuration: 0,
	
	//semen amount
	semenBukkake: 0,
	semenWomb: 0,
	semenAnal: 0,
	semenBreast: 0,
	semenOral: 0,
	
	//sexual counts
	vaginalPenetrationCount: 0,
	vaginalEjaculationCount: 0,
	analPenetrationCount: 0,
	analEjaculationCount: 0,
	oralPenetrationCount: 0,
	oralEjaculationCount: 0,
	bukkakeCount: 0,
	breastplayCount: 0,
	kissingCount: 0,
	foreplayCount: 0,
	climaxCount: 0,
	bindCount: 0,
	
	//sensitivity
	vaginaSensitivity: 0,
	analSensitivity: 0,
	clitSensitivity: 0,
	bustSensitivity: 0,
	mouthSensitivity: 0,
	
	
    inventory: [
        { name: "Unarmed", quantity: 1 },
        { name: "Body-None", quantity: 1 },
        { name: "Shield-None", quantity: 1 },	
        { name: "Potion of Healing", quantity: 3 },
        { name: "Shortsword", quantity: 1 },
        { name: "Padded", quantity: 1 },
        { name: "Shield", quantity: 1 },
    ],
	
    equippedWeapon: items.find(item => item.name === "Unarmed") || null, // Set to "Unarmed" by default
    equippedBody: items.find(item => item.name === "Body-None") || null,
    equippedShield: items.find(item => item.name === "Shield-None") || null,

    // Add in-game time properties
    gameHours: 7,
    gameMinutes: 11,
    gameDay: 4,
    gameMonth: 8, // September (0 = Jan, 11 = Dec)
    gameYear: 2024,
    
    updateAbilityModifiers() {
        for (let ability in this.abilities) {
            this.abilities[ability].modifier = Math.floor((this.abilities[ability].score - 10) / 2);
        }
    },

    getInventoryDetails() {
        return this.inventory.map(item => {
            const foundItem = items.find(i => i.name === item.name);
            return foundItem ? {
                name: foundItem.name,
                effect: foundItem.effect || foundItem.damage || foundItem.ac,
                cost: foundItem.cost,
                description: foundItem.description,
                quantity: item.quantity
            } : null;
        }).filter(item => item !== null);
    },

    gainExperience(amount) {
        this.exp += amount;

        while (this.level < 20 && this.exp >= expRequirements[this.level]) {
            this.level++;
            showStyledAlert(`Congratulations! ${this.name} leveled up to Level ${this.level}!`);
            this.levelUp();
        }
    },
    
    levelUp() {
        this.hpRolled = false; 
        this.mpRolled = false;

        promptForHPRoll();

        if (abilityIncreaseLevels.includes(this.level) && this.abilityIncreasesUsed < 2) {
            promptForAbilityIncrease();
        }
    },


    getExpForNextLevel() {
        return expRequirements[this.level] - this.exp;
    },
	
	
	
	
	
	    checkDeadStatus() {
        if (this.maxHp > 0 && this.currentHp <= 0) {
            this.deadStatus = true;
            console.log(`${this.name} has died.`);
        } else {
            this.deadStatus = false;
        }
    },

};

function promptForAbilityIncrease() {
    const actionPanel = document.getElementById("actionPanel");

    let abilityIncreaseSection = document.getElementById("abilityIncreaseSection");
    if (!abilityIncreaseSection) {
        abilityIncreaseSection = document.createElement("div");
        abilityIncreaseSection.id = "abilityIncreaseSection";
        actionPanel.appendChild(abilityIncreaseSection);
    } else {
        abilityIncreaseSection.innerHTML = "";
    }

    abilityIncreaseSection.innerHTML = `
        <p class="clickable-prompt" onclick="increaseAbility('strength')">Increase Strength</p>
        <p class="clickable-prompt" onclick="increaseAbility('dexterity')">Increase Dexterity</p>
        <p class="clickable-prompt" onclick="increaseAbility('constitution')">Increase Constitution</p>
        <p class="clickable-prompt" onclick="increaseAbility('intelligence')">Increase Intelligence</p>
        <p class="clickable-prompt" onclick="increaseAbility('willpower')">Increase Willpower</p>
        <p class="clickable-prompt" onclick="increaseAbility('charisma')">Increase Charisma</p>
    `;
}

function increaseAbility(ability) {
    if (character.abilities[ability] && character.abilityIncreasesUsed < 2) {
        character.abilities[ability].score += 2;
        character.abilityIncreasesUsed++;
        character.updateAbilityModifiers();
        showStyledAlert(`${character.name} has increased their ${ability} by 2!`);

        // Clear the ability increase section after selection
        document.getElementById("abilityIncreaseSection").innerHTML = "";

        // If two increases have been used, remove the ability increase section
        if (character.abilityIncreasesUsed >= 2) {
            document.getElementById("abilityIncreaseSection").remove();
        }
    } else {
        showStyledAlert("You can only increase an ability twice during your level-ups.");
    }
}
