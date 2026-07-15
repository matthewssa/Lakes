const statusEffects = {
    // Health-related states
    healthy: {
        name: "Healthy",
        description: "Miene feels strong and ready for anything.",
        effects: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            willpower: 0,
            charisma: 0,
            movementSpeed: 0,
            perception: 0,
        },
    },

    // Drunk-related states
    drunk: {
        lightlyDrunk: {
            name: "Tipsy",
            description: "Miene feels a little tipsy, but still in control.",
            drunkDuration: 15,
            effects: {
                strength: -2,
                dexterity: -2,
                constitution: -1,
                intelligence: -2,
                willpower: -1,
                charisma: +2,
                movementSpeed: -5,
                perception: -5,
            },
        },
        mediumDrunk: {
            name: "Intoxicated",
            description: "Miene is starting to feel the effects, a bit wobbly but still functional.",
            drunkDuration: 20,
            effects: {
                strength: -3,
                dexterity: -4,
                constitution: -2,
                intelligence: -4,
                willpower: -3,
                charisma: +4,
                movementSpeed: -10,
                perception: -10,
            },
        },
        veryDrunk: {
            name: "Smashed",
            description: "Miene is stumbling around, barely keeping it together.",
            drunkDuration: 30,
            effects: {
                strength: -5,
                dexterity: -6,
                constitution: -4,
                intelligence: -6,
                willpower: -5,
                charisma: +6,
                movementSpeed: -20,
                perception: -20,
            },
        },
        extremeDrunk: {
            name: "Blackout Drunk",
            description: "Miene is completely wasted, unable to focus properly.",
            drunkDuration: 40,
            effects: {
                strength: -7,
                dexterity: -8,
                constitution: -6,
                intelligence: -8,
                willpower: -7,
                charisma: +8,
                movementSpeed: -30,
                perception: -30,
            },
        },
    },


    // Arousal-related states
    arousal: {
        mildlyAroused: {
            name: "Flushed",
            description: "Miene feels a gentle warmth spreading through her body, slightly distracted by fleeting thoughts.",
            effects: {
                charisma: +1,
                willpower: -1,
                perception: -2,
                dexterity: 0,
                movementSpeed: 0,
            },
            arousalDuration: 10,
        },
        moderatelyAroused: {
            name: "Tingling",
            description: "Miene's thoughts are clouded by a growing excitement, and it’s getting harder to focus.",
            effects: {
                charisma: +2,
                willpower: -2,
                perception: -4,
                dexterity: -1,
                movementSpeed: -5,
            },
            arousalDuration: 20,
        },
        highlyAroused: {
            name: "Throbbing",
            description: "Miene’s heart races, her body responds involuntarily, and maintaining composure is a challenge.",
            effects: {
                charisma: +3,
                willpower: -4,
                perception: -6,
                dexterity: -2,
                movementSpeed: -10,
            },
            arousalDuration: 30,
        },
        extremelyAroused: {
            name: "Burning Desire",
            description: "Miene is consumed by intense sensations, barely able to think straight or keep steady.",
            effects: {
                charisma: +4,
                willpower: -6,
                perception: -8,
                dexterity: -3,
                movementSpeed: -15,
            },
            arousalDuration: 40,
        },
        uncontrollablyAroused: {
            name: "Lost in Sensation",
            description: "Miene is entirely overtaken, her body moving on instinct alone, with no semblance of control remaining.",
            effects: {
                charisma: +5,
                willpower: -8,
                perception: -10,
                dexterity: -5,
                movementSpeed: -20,
            },
            arousalDuration: 50,
        },
    },

    // Poison-related states
    poison: {
        mild: {
            name: "Poisoned",
            description: "Miene feels nauseous from the poison.",
            effects: {
                hp: -1,
            },
        },
        severe: {
            name: "Severe Poisoning",
            description: "The poison is taking a heavy toll on Miene's body.",
            effects: {
                hp: -3,
            },
        },
        fatal: {
            name: "Fatal Poisoning",
            description: "Miene is on the verge of death from the poison.",
            effects: {
                hp: -5,
            },
        },
    },
	

    // Sleep-related states
    sleepy: {
		mildlyDrowsy: {
			name: "Drowsy",
			description: "Miene feels heavy-eyed and slow, her body craving rest.",
		effects: {},
		},
	
		moderatelyDrowsy: {
			name: "Sleepy",
			description: "Miene is sluggish and distracted, finding it harder to focus or stay alert.",
		effects: {},
		},
	
		severelyDrowsy: {
			name: "Groggy",
			description: "Miene’s thoughts are muddled, and her body feels like it’s moving through molasses.",
		effects: {},
		},
		extremelySleepy: {
			name: "Exhausted",
			description: "Miene is fighting to stay awake, struggling to keep her body and mind functioning.",
		effects: {},
		},
		completelySleepDeprived: {
			name: "Delirious",
			description: "Miene is completely sleep-deprived, barely aware of her surroundings, and prone to mistakes.",
		effects: {},
		},
	},
	
	
    // Hunger and Thirst-related states
    hunger: {
		mildlyHungry: {
			name: "Peckish",
			description: "Miene feels a slight emptiness in her stomach but can still function normally.",
			effects: {},
		},
		moderatelyHungry: {
			name: "Hungry",
			description: "Miene is starting to feel weak from hunger.",
			effects: {},
		},
		severelyHungry: {
			name: "Famished",
			description: "Miene's stomach is growling, making it hard to focus.",
			effects: {},
		},
		extremelyHungry: {
			name: "Starving",
			description: "Miene feels weak and dizzy, her energy rapidly depleting.",
		    effects: {},
		},
		completelyHungry: {
			name: "Emaciated",
			description: "Miene is dangerously malnourished, barely able to move or think.",
			effects: {
				hp: -3,
			},
		},
	},

    thirst: {
		mildlyThirsty: {
			name: "Parched",
			description: "Miene’s mouth feels dry, but she can still function normally.",
		    effects: {},
		},
		moderatelyThirsty: {
			name: "Thirsty",
			description: "Miene is parched, feeling sluggish and dehydrated.",
		    effects: {},
		},
		severelyThirsty: {
			name: "Dehydrated",
			description: "Miene feels light-headed and slow due to lack of water.",
		    effects: {},
		},
		extremelyThirsty: {
			name: "Parched Dry",
			description: "Miene's body feels heavy, her skin dry, and her focus slipping away.",
		    effects: {},
		},
		completelyThirstDeprived: {
			name: "Severely Dehydrated",
			description: "Miene is dangerously dehydrated, barely able to move or think.",
			effects: {
				hp: -3,
			},
		},
	},	
};


function getAlcoholStatus(alcoholPercentage) {
    if (alcoholPercentage === 0) {
        return null;
    } else if (alcoholPercentage <= 20) {
        return statusEffects.drunk.lightlyDrunk;
    } else if (alcoholPercentage <= 40) {
        return statusEffects.drunk.mediumDrunk;
    } else if (alcoholPercentage <= 60) {
        return statusEffects.drunk.veryDrunk;
    } else {
        return statusEffects.drunk.extremeDrunk;
    }
}


function getArousalStatus(arousalPercentage) {
    if (arousalPercentage === 0) {
        return null;
    } else if (arousalPercentage <= 20) {
        return statusEffects.arousal.mildlyAroused;
    } else if (arousalPercentage <= 40) {
        return statusEffects.arousal.moderatelyAroused;
    } else if (arousalPercentage <= 60) { 
        return statusEffects.arousal.highlyAroused;
    } else if (arousalPercentage <= 80) { 
        return statusEffects.arousal.extremelyAroused;
    } else {
        return statusEffects.arousal.uncontrollablyAroused;
    }
}


function getSleepyStatus(sleepPercentage) {
    if (sleepPercentage === 0) {
        return null;
    } else if (sleepPercentage <= 20) {
        return statusEffects.sleepy.mildlyDrowsy;
    } else if (sleepPercentage <= 40) {
        return statusEffects.sleepy.moderatelyDrowsy;
    } else if (sleepPercentage <= 60) {
        return statusEffects.sleepy.severelyDrowsy;
    } else if (sleepPercentage <= 80) {
        return statusEffects.sleepy.extremelySleepy;
    } else {
        return statusEffects.sleepy.completelySleepDeprived;
    }
}


function getHungerStatus(hungerPercentage) {
    if (hungerPercentage === 0) {
        return null;
    } else if (hungerPercentage <= 20) {
        return statusEffects.hunger.mildlyHungry;
    } else if (hungerPercentage <= 40) {
        return statusEffects.hunger.moderatelyHungry;
    } else if (hungerPercentage <= 60) {
        return statusEffects.hunger.severelyHungry;
    } else if (hungerPercentage <= 80) {
        return statusEffects.hunger.extremelyHungry;
    } else {
        return statusEffects.hunger.completelyHungry;
    }
}


function getThirstStatus(thirstPercentage) {
    if (thirstPercentage === 0) {
        return null;
    } else if (thirstPercentage <= 20) {
        return statusEffects.thirst.mildlyThirsty;
    } else if (thirstPercentage <= 40) {
        return statusEffects.thirst.moderatelyThirsty;
    } else if (thirstPercentage <= 60) {
        return statusEffects.thirst.severelyThirsty;
    } else if (thirstPercentage <= 80) {
        return statusEffects.thirst.extremelyThirsty;
    } else {
        return statusEffects.thirst.completelyThirstDeprived;
    }
}


function applyCombinedStatusEffects(effectsList) {
    // Reset modifiers
    resetCharacterModifiers();

    // Combine all effects into one
    const combinedEffects = {};
    effectsList.forEach(effects => {
        for (const key in effects) {
            if (effects.hasOwnProperty(key)) {
                combinedEffects[key] = (combinedEffects[key] || 0) + effects[key];
            }
        }
    });

    // Apply combined effects
    for (const key in combinedEffects) {
        if (Game.character.abilities[key]) {
            Game.character.abilities[key].score += combinedEffects[key];
            Game.character.abilities[key].modifier = Math.floor((Game.character.abilities[key].score - 10) / 2);
        }
    }

    // Store the applied effects for rollback
    Game.character.activeEffects = combinedEffects;
    updateStatusPanel();
}


// Reset the character's modifiers to their base values (healthy state)
function resetCharacterModifiers() {
    for (const ability in Game.character.abilities) {
        if (Game.character.abilities.hasOwnProperty(ability)) {
            // Calculate base score and modifier again to reset everything correctly
            Game.character.abilities[ability].modifier = Math.floor((Game.character.abilities[ability].score - 10) / 2);
        }
    }
}


// Function to roll back the status effect changes (if needed)
function rollbackStatusEffect(effects) {
    for (const key in effects) {
        if (effects.hasOwnProperty(key) && Game.character.abilities[key]) {
            // Roll back the score change by subtracting the effect value
            Game.character.abilities[key].score -= effects[key];

            // Recalculate modifier after rolling back the score
            Game.character.abilities[key].modifier = Math.floor((Game.character.abilities[key].score - 10) / 2);
        }
    }
}






function updateStatusPanel() {
    const currentEffects = Game.character.activeEffects;
    const statusContainer = document.getElementById("statusPanel");
    const effectsContainer = document.getElementById("activeEffectsContainer");
    const statusDescription = document.getElementById("status-description");

    const tooltip = document.getElementById("tooltip");
    const tooltipDescription = document.getElementById("tooltip-description");
    const tooltipEffects = document.getElementById("tooltip-effects");

// console.log("Current effects:", currentEffects);   //

    // Initially hide the description and effects
    statusDescription.style.display = "none";

    if (currentEffects && Object.keys(currentEffects).length > 0) {
        // Get the status directly based on the alcohol percentage
        const currentStatus = getAlcoholStatus(Game.character.alcoholPercentage);

        if (currentStatus) {
            const statusName = document.getElementById("status-name");

            statusName.textContent = currentStatus.name || "No Status";
            statusDescription.textContent = currentStatus.description || "No Description";

            effectsContainer.innerHTML = ""; // Clear existing effects

            // Create the tooltip content
            tooltipDescription.innerHTML = `<strong>Description:</strong> ${currentStatus.description || "No Description"}<br><br>`;

            // Loop through the active effects and create a list of effects for the tooltip
            let effectsContent = "<strong>Effects:</strong>";
            for (const key in currentEffects) {
                if (currentEffects.hasOwnProperty(key)) {
                    const effectValue = currentEffects[key];
                    effectsContent += `<p><strong>${key}</strong>: ${effectValue > 0 ? "+" + effectValue : effectValue}</p>`;
                }
            }

            tooltipEffects.innerHTML = effectsContent;

            // Add hover event to the status name element
            statusName.onmouseover = function(event) {
                // Position the tooltip near the status name
                tooltip.style.display = "block";
                tooltip.style.left = event.pageX + 10 + "px";  // Position to the right
                tooltip.style.top = event.pageY + 10 + "px";   // Position below the cursor
            };

            statusName.onmouseout = function() {
                // Hide the tooltip when mouse leaves
                tooltip.style.display = "none";
            };
        }
    } else {
        const statusName = document.getElementById("status-name");
        statusName.textContent = "Healthy";
        statusDescription.textContent = "Miene feels.";

        effectsContainer.innerHTML = ""; // Clear any effects
    }
}





