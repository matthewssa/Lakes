
// ======================
// MAIN GAME CONTAINER
// ======================

const Game = {
    // Core systems
    character: null,           // We'll move things here gradually
    items: typeof items !== 'undefined' ? items : [],
    zones: typeof zones !== 'undefined' ? zones : [],
    
    // Game state
    isInitialized: false,
    currentScreen: 'mainMenu', // 'mainMenu' or 'game'
    
    // Helper to mark initialization done
    markInitialized() {
        this.isInitialized = true;
        console.log("🎮 Game fully initialized and ready.");
    }
};

// ======================
// CENTRAL INITIALIZATION
// ======================

function initGame() {
    console.log("🚀 Initializing Dungeons & Exiles...");

    // Initialize music (only once)
    if (typeof MusicController !== "undefined" && MusicController.init) {
        MusicController.init();
    }

    // Attach character to main Game object   <--- NEW
    if (typeof character !== "undefined") {
        Game.character = character;
    }

    // Character setup
	if (Game.character) {
			Game.character.updateAbilityModifiers();
		if (typeof updateCharacterDetails === "function") {
            updateCharacterDetails();
        }
    }

    // UI Panels
    if (typeof initializePanels === "function") {
        initializePanels();
    }
	
	Game.markInitialized();

    console.log("✅ Game initialization complete!");
	
	
}

// Run initialization when everything is ready
document.addEventListener('DOMContentLoaded', initGame);



////////////////////////////////
////////////////////////////////
// Equipment related function //
////////////////////////////////
////////////////////////////////

const DEFAULT_DESCRIPTION_MESSAGE = "Hover over an item to see its description."; // Default message

// Open Equipment Window
function openEquipWindow() {
    const equipOverlay = document.getElementById('equip-overlay');
    const equipWindow = document.getElementById('equip-window');
    
    // Clear previous content from all dropdowns
    document.getElementById('weapon-dropdown').innerHTML = '';
    document.getElementById('shield-dropdown').innerHTML = '';
    document.getElementById('body-dropdown').innerHTML = '';

    // Populate the dropdowns with items of corresponding types
    populateDropdown('Weapon', 'weapon-dropdown');
    populateDropdown('Shield', 'shield-dropdown');
    populateDropdown('Body', 'body-dropdown');

// Set default description for each equipped item
document.getElementById('current-weapon').textContent = `Currently Equipped: ${Game.character.equippedWeapon?.displayName || "None"}`;
document.getElementById('current-shield').textContent = `Currently Equipped: ${Game.character.equippedShield?.displayName || "None"}`;
document.getElementById('current-body').textContent = `Currently Equipped: ${Game.character.equippedBody?.displayName || "None"}`;

    // Reset description box to default message
    document.getElementById('equip-description').textContent = DEFAULT_DESCRIPTION_MESSAGE;

    // Show both overlay and the actual menu
    equipOverlay.style.display = 'block';
    equipWindow.style.display = 'block';
}

// Close Equipment Window
function closeEquipWindow() {
    const equipOverlay = document.getElementById('equip-overlay');
    equipOverlay.style.display = 'none';
}

// Populate Dropdown with Items and add hover functionality for the selected item
function populateDropdown(type, dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const equipDescription = document.getElementById('equip-description');

    // Clear existing options to avoid duplicates
    dropdown.innerHTML = '';

    // Populate dropdown with items of the specified type
    const typeItems = Game.character.inventory.filter(item => {
        const foundItem = items.find(i => i.name === item.name);
        return foundItem && foundItem.type === type;
    });

    typeItems.forEach(item => {
        const foundItem = items.find(i => i.name === item.name);
        const option = document.createElement('option');
        option.value = foundItem.name;
        option.text = `${foundItem.displayName} (x${item.quantity})`;
        dropdown.appendChild(option);
    });

    // Show the description of the first item initially, if any
    if (typeItems.length > 0) {
        const firstItem = items.find(i => i.name === typeItems[0].name);
        equipDescription.textContent = firstItem ? firstItem.description : '';
    } else {
        equipDescription.textContent = DEFAULT_DESCRIPTION_MESSAGE; // Set default if no items
    }

    // Update the description based on selection change
    dropdown.addEventListener('change', (event) => {
        const selectedItem = items.find(i => i.name === event.target.value);
        equipDescription.textContent = selectedItem ? selectedItem.description : DEFAULT_DESCRIPTION_MESSAGE;
    });

    // Show description of selected item on hover over the dropdown
    dropdown.addEventListener('mouseenter', () => {
        const selectedItem = items.find(i => i.name === dropdown.value);
        equipDescription.textContent = selectedItem ? selectedItem.description : DEFAULT_DESCRIPTION_MESSAGE;
    });

    // Clear description when not hovering over the dropdown
    dropdown.addEventListener('mouseleave', () => {
        equipDescription.textContent = DEFAULT_DESCRIPTION_MESSAGE;
    });
}

// Equip Item Based on Dropdown Selection
function equipItemFromDropdown(slot, dropdownId) {
    const selectedItemName = document.getElementById(dropdownId).value;
    const itemToEquip = items.find(item => item.name === selectedItemName);

    if (!itemToEquip) {
        alert('Item not found!');
        return;
    }

    // Equip the item and update the character's stats
    if (slot === 'Weapon') {
        Game.character.equippedWeapon = itemToEquip;
        Game.character.damageRoll = itemToEquip.damage_roll;
        document.getElementById('current-weapon').textContent = `Currently Equipped: ${itemToEquip.displayName}`;
        document.getElementById('character-damage-roll').textContent = Game.character.damageRoll;
    } else if (slot === 'Shield') {
        Game.character.equippedShield = itemToEquip;
        document.getElementById('current-shield').textContent = `Currently Equipped: ${itemToEquip.displayName}`;
    } else if (slot === 'Body') {
        Game.character.equippedBody = itemToEquip;
        document.getElementById('current-body').textContent = `Currently Equipped: ${itemToEquip.displayName}`;
    }

    // Recalculate AC after equipping item
    calculateTotalAC();
	if (Game.character) updateCharacterDetails();// Refresh character stats in the UI
}

// Add event listeners to close when clicked outside window
document.getElementById('equip-overlay').addEventListener('mousedown', function(event) {
    if (event.target === this) {
        closeEquipWindow(); 
    }
});

////////////////////////////////
////////////////////////////////
// Equipment related function //
////////////////////////////////
////////////////////////////////





// Global variable to track the latest active room
let latestActiveRoom = null;

// Global variable to track the latest active room
let highestZIndex = 100; // Base z-index value

// Function to initialize the z-index of all panels
function initializePanels() {
    const panels = [
        'rollPanel',
        'actionPanel',
        'storyPanel',
		'enemyPanel',
		'statusPanel',
        'item-window',
        'item-window-overlay',
        'profile-window-overlay',
		'status-window-overlay'

    ];

    panels.forEach(panelId => {
        const panel = document.getElementById(panelId);
        if (panel) { // Ensure the panel exists
            panel.style.zIndex = highestZIndex; // Set initial z-index
            highestZIndex++; // Increment for the next panel
        }
    });
}

// Helper function to bring any element to the front
function bringToFront(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        highestZIndex++; // Increment the z-index value
        element.style.zIndex = highestZIndex; // Set the element's z-index to the new highest value
    }
}

// Call initializePanels when the document is ready
document.addEventListener('DOMContentLoaded', initializePanels);








///////////////////////////////
///////////////////////////////
//Inventory related Function //
///////////////////////////////
///////////////////////////////

function openItemWindow() {
    const itemWindow = document.getElementById("item-window");
    const itemOverlay = document.getElementById("item-window-overlay");
    const itemList = document.getElementById("item-list");
    const descriptionBox = document.getElementById("description-box");

    // Show the overlay and item window
    itemOverlay.style.display = "block";
    itemWindow.style.display = "block";

    // Clear previous content
    itemList.innerHTML = "";
    descriptionBox.innerText = "Hover over an item to see its description."; // Default message

    // Get detailed inventory items
    const inventoryDetails = Game.character.getInventoryDetails();

 // Loop through the inventory details and display each item's details
inventoryDetails.forEach(inventoryItem => {
    // Exclude items that are of type "None" or "Unarmed"
    const foundItem = items.find(i => i.name === inventoryItem.name);
    if (foundItem && foundItem.displayName !== "None" && foundItem.name !== "Unarmed") { // Skip "None" and "Unarmed" items
        itemList.innerHTML += `
            <div class="item">
                <span class="item-name" 
                      onmouseover="updateDescription('${inventoryItem.description} (Effect: ${inventoryItem.effect}, Cost: ${inventoryItem.cost})')" 
                      onmouseout="clearDescription()"
                      onclick="chooseAction('${foundItem.name}', '${foundItem.type}')">
                    <strong>${inventoryItem.name}</strong>
                </span> : 
                <span class="item-quantity"> Quantity: ${inventoryItem.quantity}</span>
            </div>
        `;
    }
});
    // Bring item overlay and item window to the front
    bringToFront('item-window');
    bringToFront('item-window-overlay');
}

// Function to choose action for the item
function chooseAction(itemName, itemType) {
    if (itemType === "Potion") {
        // Show confirmation dialog for Potions
        const action = confirm(`Do you want to use or drop the ${itemName}? Click OK to use, Cancel to drop.`);
        if (action) {
            useItem(itemName); // Use the item
        } else {
            dropItem(itemName); // Drop the item
        }
    } else {
        // For non-Potion items, only allow dropping
        if (confirm(`Do you want to drop the ${itemName}?`)) {
            dropItem(itemName);
        }
    }
}

// Function to drop an item from the inventory
function dropItem(itemName) {
    // Find the item in the inventory
    const itemIndex = Game.character.inventory.findIndex(item => item.name === itemName);
    
    // Check if the item exists
    if (itemIndex !== -1) {
        const droppedItem = Game.character.inventory.splice(itemIndex, 1)[0]; // Remove the item from the inventory

        // Check if the dropped item was equipped and reset to defaults
        if (droppedItem.name === Game.character.equippedWeapon?.name) {
            Game.character.equippedWeapon = items.find(item => item.name === "Unarmed") || null; // Reset to default "Unarmed"
            document.getElementById('current-weapon').textContent = Game.character.equippedWeapon ? `Currently Equipped: ${Game.character.equippedWeapon.displayName}` : 'Currently Equipped: None'; // Update UI
        }
        if (droppedItem.name === Game.character.equippedShield?.name) {
            Game.character.equippedShield = items.find(item => item.name === "Shield-None") || null; // Reset to default "Shield-None"
            document.getElementById('current-shield').textContent = Game.character.equippedShield ? `Currently Equipped: ${Game.character.equippedShield.displayName}` : 'Currently Equipped: None'; // Update UI
        }
        if (droppedItem.name === Game.character.equippedBody?.name) {
            Game.character.equippedBody = items.find(item => item.name === "Body-None") || null; // Reset to default "Body-None"
            document.getElementById('current-body').textContent = Game.character.equippedBody ? `Currently Equipped: ${Game.character.equippedBody.displayName}` : 'Currently Equipped: None'; // Update UI
        }

        // Display feedback to the user
        alert(`You have dropped: ${droppedItem.name}`);
        
        // Optionally, update the item window to reflect the change
        openItemWindow(); // Refresh the item window to show updated inventory
    } else {
        console.log("Item not found in inventory.");
    }
}

// Function to use an item from the inventory
function useItem(itemName) {
    // Find the item in the inventory
    const itemIndex = Game.character.inventory.findIndex(item => item.name === itemName);
    
    // Check if the item exists
    if (itemIndex !== -1) {
        const usedItem = Game.character.inventory[itemIndex]; // Reference the item to be used
        alert(`You have used: ${usedItem.name}. Effect: ${usedItem.effect}`);

        // Here you can implement the effect of the item on the character's stats
        // For example, if it's a potion, restore HP or apply effects.

        // For demonstration, let's assume using the item decreases the quantity
        if (usedItem.quantity > 1) {
            usedItem.quantity--; // Decrease quantity if more than 1
        } else {
            dropItem(itemName); // If quantity is 1, drop the item after using
        }

        // Optionally, update the item window to reflect the change
        openItemWindow(); // Refresh the item window to show updated inventory
    } else {
        console.log("Item not found in inventory.");
    }
}


// Function to close the Item Window
function closeItemWindow() {
    const itemWindow = document.getElementById("item-window");
    const itemOverlay = document.getElementById("item-window-overlay");
    itemWindow.style.display = "none"; // Hide the item window
    itemOverlay.style.display = "none"; // Hide the overlay
}

// Function to update the description box with the hovered item's description
function updateDescription(description) {
    const descriptionBox = document.getElementById("description-box");
    descriptionBox.innerText = description; // Update the description text
}

// Function to clear the description box when not hovering
function clearDescription() {
    const descriptionBox = document.getElementById("description-box");
    descriptionBox.innerText = "Hover over an item to see its description."; // Reset to default message
}

///////////////////////////////
///////////////////////////////
//Inventory related Function //
///////////////////////////////
///////////////////////////////








// Function to open the profile window
function openProfileWindow() {
    console.log("Opening Profile Window"); // Debugging statement
	if (Game.character) updateCharacterDetails();
    document.getElementById("profile-window-overlay").style.display = "block"; // Corrected id

    // Bring profile window to the front
    bringToFront('profile-window-overlay');
}

// Function to close the profile window
function closeProfileWindow() {
    document.getElementById("profile-window-overlay").style.display = "none"; // Corrected id
}


// Function to open the status window
function openStatusWindow() {
    console.log("Opening Status Window"); // Debugging statement
	if (Game.character) updateCharacterDetails();
    document.getElementById("status-window-overlay").style.display = "block"; // Corrected id

    // Bring status window to the front
    bringToFront('status-window-overlay');
}

// Function to close the status window
function closeStatusWindow() {
    document.getElementById("status-window-overlay").style.display = "none"; // Corrected id
}



// Add event listeners for other panels to bring them to the front
document.getElementById('rollPanel').addEventListener('mousedown', function() {
    bringToFront('rollPanel');
});

// Add event listeners for other panels to bring them to the front
document.getElementById('actionPanel').addEventListener('mousedown', function() {
    bringToFront('actionPanel');
});

// Add event listeners for other panels to bring them to the front
document.getElementById('enemyPanel').addEventListener('mousedown', function() {
    bringToFront('enemyPanel');
});

// Add event listeners for other panels to bring them to the front
document.getElementById('statusPanel').addEventListener('mousedown', function() {
    bringToFront('statusPanel');
});

// Add event listeners for other panels to bring them to the front
document.getElementById('storyPanel').addEventListener('mousedown', function() {
    bringToFront('storyPanel');
});

// Add event listeners to close when clicked outside window
document.getElementById('profile-window-overlay').addEventListener('mousedown', function(event) {
    if (event.target === this) {
        closeProfileWindow(); 
    }
});

// Add event listeners to close when clicked outside window
document.getElementById('status-window-overlay').addEventListener('mousedown', function(event) {
    if (event.target === this) {
        closeStatusWindow(); 
    }
});

// Add event listeners to close when clicked outside window
document.getElementById('item-window-overlay').addEventListener('mousedown', function(event) {
    if (event.target === this) {
        closeItemWindow();
    }
});

// Prevent click event from propagating to the overlay
document.getElementById('item-window').addEventListener('mousedown', function(event) {
    event.stopPropagation();
});













// Main Menu Start Button
function showMainMenu() {
    document.getElementById("start-screen").style.display = 'flex'; // Show main menu
}

// Function to start the game
function startGame() {
    document.getElementById("start-screen").style.display = 'none'; // Hide the start screen
    document.getElementById("game-screen").style.display = 'flex'; // Show the game screen
	updateCharacterDetails(); // Optional: update UI to reflect the new abilities
}

// Main Menu Options Button
function openOptions() {
    console.log("Options clicked");
}

// Middle image?
function updateImage(newImagePath) {
    document.getElementById('decision-image').src = newImagePath;
}







// Function to calculate total AC based on equipped items
function calculateTotalAC() {
    let baseAC = 10; // Base AC without any modifiers
    let dexModifier = Game.character.abilities.dexterity.modifier;

    // Check if body armor is equipped and apply its AC and dexterity cap
    if (Game.character.equippedBody) {
        const bodyArmor = Game.character.equippedBody;
        baseAC += bodyArmor.ac;
        
        // Apply dexterity cap if one exists
        if (bodyArmor.dexterityCap !== "Infinity") {
            dexModifier = Math.min(dexModifier, bodyArmor.dexterityCap);
        }
    }

    // Check if shield is equipped and add its AC
    if (Game.character.equippedShield) {
        baseAC += Game.character.equippedShield.ac;
    }

    // Add the final, capped Dexterity modifier to the AC
    baseAC += dexModifier;

    // Update character's AC
    Game.character.ac = baseAC;
		
}





// Function to update character details on the screen
function updateCharacterDetails() {
	if (!Game.character) return;

    Game.character.checkDeadStatus();
	
    const currentAlcoholStatus  = getAlcoholStatus(Game.character.alcoholPercentage);
    const currentArousalStatus = getArousalStatus(Game.character.arousalPercentage);
//    const currentHungerStatus = getHungerStatus(Game.character.hungerLevel);
//    const currentThirstStatus = getThirstStatus(Game.character.thirstLevel);
//    const currentPoisonStatus = getPoisonStatus(Game.character.poisonLevel);
	

    updateStatusPanel();
	
	Game.character.atk = Game.character.abilities.strength.modifier; // Set ATK based on Strength modifier
    Game.character.hit = Game.character.abilities.dexterity.modifier; // Set HIT based on Dexterity modifier
    
	// Ensure character.ac is updated
    calculateTotalAC(); 
	
	// Update damageRoll based on equippedWeapon
    if (Game.character.equippedWeapon) {
        Game.character.damageRoll = Game.character.equippedWeapon.damage_roll;
    }

	// console.log("Updating character details:");
    // console.log("Name:", Game.character.name);
    // console.log("Class:", Game.character.class);

    document.querySelectorAll(".character-name").forEach(el => {
        el.innerText = Game.character.name;
    });
    document.querySelectorAll(".character-class").forEach(el => {
        el.innerText = Game.character.class;
    });
    document.querySelectorAll(".character-race").forEach(el => {
        el.innerText = Game.character.race;
    });
    document.querySelectorAll(".character-level").forEach(el => {
        el.innerText = Game.character.level;
    });

    // Update combat stats
    document.getElementById("character-atk").innerText = Game.character.atk;  // ATK
    document.getElementById("character-hit").innerText = Game.character.hit;  // HIT
    document.getElementById("character-cri").innerText = Game.character.cri;  // CRI
    document.getElementById("character-apr").innerText = Game.character.apr;  // APR
    document.getElementById("character-dr").innerText = Game.character.dr;    // DR
    document.getElementById("character-ac").innerText = Game.character.ac;    // AC
	document.getElementById('character-damage-roll').textContent = Game.character.damageRoll; // Ensure damage roll is updated


    // Update level and experience display
    document.getElementById("exp").innerText = `${Game.character.exp} / ${expRequirements[Game.character.level]}`;
    document.getElementById("character-hp").innerText = `HP: ${Game.character.currentHp} / ${Game.character.maxHp}`;
    document.getElementById("character-mp").innerText = `MP: ${Game.character.currentMp} / ${Game.character.maxMp}`;
    

    // Update ability scores and modifiers in the UI
    for (let ability in Game.character.abilities) {
        document.getElementById(`stat-${ability}`).innerText = Game.character.abilities[ability].score;
        document.getElementById(`stat-${ability}-mod`).innerText = Game.character.abilities[ability].modifier;
    }
	
	
	document.getElementById("character-corruption-perc").innerText = `${Game.character.corruptionPercentage}%`;
    document.getElementById("character-innocence-perc").innerText = `${Game.character.innocencePercentage}%`;
    document.getElementById("character-agony-perc").innerText = `${Game.character.agonyPercentage}%`;
    document.getElementById("character-alcohol-perc").innerText = `${Game.character.alcoholPercentage}%`;
	
    document.getElementById("character-dead-status").innerText = Game.character.deadStatus ? "Yes" : "No";
    document.getElementById("character-blind-status").innerText = Game.character.blindStatus ? "Yes" : "No";
    document.getElementById("character-blind-duration").innerText = `${Game.character.blindDuration} turns`;
    document.getElementById("character-paralyze-status").innerText = Game.character.paralyzeStatus ? "Yes" : "No";
    document.getElementById("character-paralyze-duration").innerText = `${Game.character.paralyzeDuration} turns`;
    document.getElementById("character-stun-status").innerText = Game.character.stunStatus ? "Yes" : "No";
    document.getElementById("character-stun-duration").innerText = `${Game.character.stunDuration} turns`;
    document.getElementById("character-shock-status").innerText = Game.character.shockStatus ? "Yes" : "No";
    document.getElementById("character-shock-duration").innerText = `${Game.character.shockDuration} turns`;
    document.getElementById("character-burning-status").innerText = Game.character.burningStatus ? "Yes" : "No";
    document.getElementById("character-burning-duration").innerText = `${Game.character.burningDuration} turns`;
    document.getElementById("character-freezing-status").innerText = Game.character.freezingStatus ? "Yes" : "No";
    document.getElementById("character-freezing-duration").innerText = `${Game.character.freezingDuration} turns`;
    document.getElementById("character-bleeding-status").innerText = Game.character.bleedingStatus ? "Yes" : "No";
    document.getElementById("character-bleeding-duration").innerText = `${Game.character.bleedingDuration} turns`;
    document.getElementById("character-vapors-status").innerText = Game.character.vaporsStatus ? "Yes" : "No";
    document.getElementById("character-vapors-duration").innerText = `${Game.character.vaporsDuration} turns`;
    document.getElementById("character-poison-status").innerText = Game.character.poisonStatus ? "Yes" : "No";
    document.getElementById("character-poison-duration").innerText = `${Game.character.poisonDuration} turns`;
    document.getElementById("character-unconscious-status").innerText = Game.character.unconsciousStatus ? "Yes" : "No";
    document.getElementById("character-unconscious-duration").innerText = `${Game.character.unconsciousDuration} turns`;
	
}


function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}




let currentZone;
let spawnedEnemies = [];
let isInCombat = false;
let currentEnemies = [];

function showRoomDetails(zoneIndex) {
    const selectedZone = zones[zoneIndex];
    const actionPanel = document.getElementById("actionPanel");
    const storyContent = document.getElementById("storyContent");
    spawnedEnemies = [];

    // Create room separator
    const roomSeparator = document.createElement("p");
    roomSeparator.innerHTML = "<hr style='border: none; height: 1px; background: linear-gradient(to right, #ff7e5f, #feb47b); width: 80%; margin: 10px auto;'>";
    roomSeparator.style.textAlign = "center";
    storyContent.appendChild(roomSeparator);

    // Room title
    const roomTitle = document.createElement("h3");
    roomTitle.id = "roomTitle";
    roomTitle.innerText = selectedZone.zoneName;
    roomTitle.style.textAlign = "center";

    // Room description
    const roomDescription = document.createElement("p");
    roomDescription.id = "roomDescription";
    roomDescription.innerHTML = selectedZone.description;
    roomDescription.style.padding = "0 20px";

    storyContent.appendChild(roomTitle);
    storyContent.appendChild(roomDescription);
    storyContent.scrollTop = storyContent.scrollHeight;

    // Handle actions
    let actionContent = actionPanel.querySelector("#actionContent");
    if (!actionContent) {
        actionContent = document.createElement("div");
        actionContent.id = "actionContent";
        actionPanel.appendChild(actionContent);
    }

    // Clear previous actions (only when changing rooms)
    actionContent.innerHTML = "";

    // Create action buttons in a stable order
    selectedZone.actions.forEach(action => {
        const actionButton = document.createElement("p");
        actionButton.className = "clickable-prompt";
        actionButton.innerText = `${action.displayName} (${action.time} mins)`;

        actionButton.onclick = function () {
            console.log("Action clicked:", action.name);

            // Update character attributes
            if (action.alcoholPercentage) {
                Game.character.alcoholPercentage = Math.min(100, Game.character.alcoholPercentage + action.alcoholPercentage);
                const alcoholStatus = getAlcoholStatus(Game.character.alcoholPercentage);
                if (alcoholStatus) {
                    effectsList.push(alcoholStatus.effects);
                    Game.character.activeEffects.alcohol = alcoholStatus.name;  // Store the name
                }
            }

            if (action.arousalPercentage) {
                Game.character.arousalPercentage = Math.min(100, Game.character.arousalPercentage + action.arousalPercentage);
                const arousalStatus = getArousalStatus(Game.character.arousalPercentage);
                if (arousalStatus) effectsList.push(arousalStatus.effects);
            }
			
            updateStatusPanel();

            // Apply game time
            addMinutesToGameTime(action.time);
            updateDateTimeDisplay();

            // Handle image change
            if (action.imageSrcs) {
                const duration = action.pictime * 1000;
                changeImageTemporarily(action.imageSrcs, duration);
            } else {
                revertToDefaultImage();
            }

            // Handle zone transitions
            if (action.targetZone !== undefined) {
                const targetZoneIndex = getZoneIndexByName(action.targetZone);
                if (targetZoneIndex !== -1) {
                    setTimeout(() => {
                        showRoomDetails(targetZoneIndex);
                    }, 10);
                } else {
                    console.error("Target zone not found:", action.targetZone);
                }
            } else if (action.actionFunction) {
                const newZoneIndex = getZoneIndexByName(action.actionFunction);
                if (newZoneIndex !== -1) {
                    setTimeout(() => {
                        showRoomDetails(newZoneIndex);
                    }, 10);
                }
            }
        };

        // Append action button in correct order
        actionContent.appendChild(actionButton);

        // Append optional action description
        if (action.description) {
            const actionDescription = document.createElement("p");
            actionDescription.innerHTML = action.description;
            actionDescription.style.padding = "0 20px";
            storyContent.appendChild(actionDescription);
            storyContent.scrollTop = storyContent.scrollHeight;
        }
    });

    currentZone = selectedZone;
    checkForEnemySpawn(currentZone);
}



let imageTimeout; // Global variable to store the timeout
let imageCycleInterval; // To store the interval for cycling images

function changeImageTemporarily(imageSrcs, duration) {
    const characterImage = document.querySelector(".character-image");

    // Clear any existing timeout to avoid overlapping
    if (imageTimeout) {
        clearTimeout(imageTimeout);
    }

    // If imageSrcs is an array, pick a random image
    if (Array.isArray(imageSrcs)) {
        const randomIndex = Math.floor(Math.random() * imageSrcs.length);  // Pick a random index
        characterImage.src = imageSrcs[randomIndex];  // Set the image to a random one from the array
    } else {
        // If only a single image is provided, set it immediately
        characterImage.src = imageSrcs;
    }

    // Restore the default image after the total duration
    imageTimeout = setTimeout(() => {
        revertToDefaultImage();
    }, duration);
}



// Helper function to revert to the default image
function revertToDefaultImage() {
    const characterImage = document.querySelector(".character-image");
    characterImage.src = "images/standing.png";
    console.log("Restored to default image.");
}


document.addEventListener("DOMContentLoaded", () => {
    const characterImage = document.querySelector(".character-image");
    if (characterImage) {
        characterImage.src = "images/standing.png"; // Set the default image
    }
});





// Utility function to find the zone index based on the zone name
function getZoneIndexByName(zoneName) {
    console.log("Searching for zone:", zoneName); // Debugging: Log the search term
    for (let i = 0; i < zones.length; i++) {
        console.log("Checking zone:", zones[i].zoneName); // Debugging: Log the current zone being checked
        if (zones[i].zoneName === zoneName) {
            console.log("Found zone at index:", i); // Debugging: Log if the zone is found
            return i;
        }
    }
    console.error("Zone not found:", zoneName); // Debugging: Log if the zone is not found
    return -1; // Return -1 if the zone is not found
}





// Function to check for enemy spawns based on the current zone
function checkForEnemySpawn(zone) {
    const rollPanel = document.getElementById("rollPanel");
    
    // Find or create the update area within the rollPanel
    let updateArea = document.querySelector("#rollPanelUpdates");
    if (!updateArea) {
        updateArea = document.createElement("div");
        updateArea.id = "rollPanelUpdates";
        rollPanel.appendChild(updateArea); // Append only if it doesn't exist
    }

    // Clear only the previous messages in the update area (non-destructive)
    updateArea.innerHTML = '';

    // Add zone details to the update area
    updateArea.innerHTML += `<p>Current Zone: ${zone.zoneName} (Enemy Levels: ${zone.levelRange})</p>`;
    const dangerLevel = calculateDangerLevel(zone.dangerLevel);
    updateArea.innerHTML += `<p>Danger Level: ${zone.dangerLevel} (Chance of enemy spawn: ${dangerLevel}%)</p>`;

    // Enemy spawn logic
    const enemiesToSpawn = Math.floor(Math.random() * 3) + 1; 

    if (Math.random() * 100 < dangerLevel) {
        for (let i = 0; i < enemiesToSpawn; i++) {
            const enemy = spawnEnemy(zone.levelRange);
            if (enemy) {
                spawnedEnemies.push(enemy);
                updateArea.insertAdjacentHTML('beforeend', `<p>An enemy has appeared: ${enemy.name} (Level: ${enemy.level})!</p>`);
            }
        }

        if (spawnedEnemies.length > 0) {
            currentEnemy = spawnedEnemies[0];
            isInCombat = true;
            updateenemyPanel(); 
            displayActionOptions(); 
        } else {
            updateArea.insertAdjacentHTML('beforeend', `<p>No enemies available for this level range.</p>`);
        }
    } else {
        updateArea.insertAdjacentHTML('beforeend', `<p>The area seems clear... for now.</p>`);
    }
}




function startCombat() {
    if (currentEnemies.length === 0) {
        logCombatAction("No enemies available to engage in combat.");
        return; 
    }

    isInCombat = true;
    updateenemyPanel();
    displayActionOptions();
}

function disableActions(disable) {
    const actionPrompts = document.querySelectorAll(".clickable-prompt");
    actionPrompts.forEach(prompt => {
        prompt.style.pointerEvents = disable ? "none" : "auto"; 
        prompt.style.opacity = disable ? "0.5" : "1"; 
    });
}
// Updated enemyPanel handling for multiple enemies (non-destructive)
function updateenemyPanel() {
    const enemyPanel = document.getElementById("enemyPanel");
    
    // Find or create the enemy details container
    let enemyDetailsContainer = enemyPanel.querySelector("#enemyDetailsContainer");
    if (!enemyDetailsContainer) {
        enemyDetailsContainer = document.createElement("div");
        enemyDetailsContainer.id = "enemyDetailsContainer";
        enemyPanel.appendChild(enemyDetailsContainer); // Append only if it doesn't exist
    }

    // Clear the enemy details container, but not the entire panel
    enemyDetailsContainer.innerHTML = "";

    if (spawnedEnemies.length === 0) {
        enemyDetailsContainer.innerHTML = `<p>No enemies present.</p>`;
        return;
    }

    // Update the enemy details container with new enemies
    spawnedEnemies.forEach((enemy, index) => {
        const enemyEntry = document.createElement("div");
        enemyEntry.classList.add("enemy-entry");
        enemyEntry.setAttribute("data-index", index); // Add index to track enemy

        // Use flexbox to display name, HP, and level in a single line
        enemyEntry.innerHTML = `
            <div class="enemy-info-line">
                <span class="clickable-enemy">Name: ${enemy.name}</span>
                <span class="enemy-hp">HP: ${enemy.currentHp}/${enemy.maxHp}</span>
                <span class="enemy-level">Level: ${enemy.level}</span>
            </div>
        `;

        // Event listener to show full description on hover
        enemyEntry.addEventListener("mouseenter", () => {
            showEnemyDescription(enemyEntry, enemy.description);
        });

        enemyEntry.addEventListener("mouseleave", () => {
            hideEnemyDescription(enemyEntry);
        });

        // Event listener to select the enemy for action
        enemyEntry.addEventListener("click", () => {
            selectEnemyForAction(index, enemyEntry); // Handle enemy selection logic
        });

        enemyDetailsContainer.appendChild(enemyEntry);
    });
}

// Show description on hover
function showEnemyDescription(enemyEntry, description) {
    const descriptionElement = document.createElement("div");
    descriptionElement.classList.add("enemy-description");
    descriptionElement.innerHTML = `<p>${description}</p>`;
    enemyEntry.appendChild(descriptionElement);
}

// Hide description when not hovering
function hideEnemyDescription(enemyEntry) {
    const descriptionElement = enemyEntry.querySelector(".enemy-description");
    if (descriptionElement) {
        enemyEntry.removeChild(descriptionElement);
    }
}

// Handle enemy selection logic
let selectedEnemyEntry = null; // Store the currently selected enemy

function selectEnemyForAction(enemyIndex, enemyEntry) {
    const selectedEnemy = spawnedEnemies[enemyIndex];
    currentEnemy = selectedEnemy; // Set the selected enemy as the target

    // Remove highlight from the previously selected enemy
    if (selectedEnemyEntry) {
        selectedEnemyEntry.classList.remove("enemy-selected");
    }

    // Highlight the new selected enemy
    enemyEntry.classList.add("enemy-selected");
    selectedEnemyEntry = enemyEntry; // Update the reference

    console.log(`Selected enemy: ${selectedEnemy.name}`);
    // You can update the actionPanel with available actions for the selected enemy
    displayActionOptions(); 
}

function displayActionOptions() {
    const actionPanel = document.getElementById("actionPanel");
    const actionContent = document.getElementById("actionContent");
	
    actionContent.innerHTML = `
        <p class="clickable-prompt" onclick="attackEnemies()">Attack</p>
        <p class="clickable-prompt" onclick="defend()">Defend</p>
        <p class="clickable-prompt" onclick="useItem()">Use Item</p>
        <p class="clickable-prompt" onclick="runAway()">Run Away</p>
    `;
}

// Function to spawn an enemy based on the level range
function spawnEnemy(levelRange) {
    const [minLevel, maxLevel] = levelRange.split('-').map(Number);
    const availableEnemies = enemies.filter(enemy => enemy.level >= minLevel && enemy.level <= maxLevel);

    if (availableEnemies.length > 0) {
        const randomEnemy = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
        return randomEnemy; 
    }
    
    return null; 
}

function calculateDangerLevel(baseDangerLevel) {
    return baseDangerLevel; // Placeholder for potential adjustments
}






// Attack function targeting the selected enemy
function attackEnemies() {
    if (!currentEnemy) {
        alert("No enemy selected! Please select an enemy first.");
        return;
    }

    const playerAttack = Math.floor(Math.random() * 10) + 1; // Simulating player's attack damage
    currentEnemy.currentHp -= playerAttack; // Subtract damage from enemy HP
    
    if (currentEnemy.currentHp <= 0) {
        currentEnemy.currentHp = 0;
        alert(`${currentEnemy.name} is defeated!`);
        // Optionally, remove the defeated enemy from the array or handle victory
        handleEnemyDefeat(currentEnemy);
    } else {
        alert(`You attacked ${currentEnemy.name} for ${playerAttack} damage. HP left: ${currentEnemy.currentHp}/${currentEnemy.maxHp}`);
    }

    updateenemyPanel(); // Update the enemy panel after the attack
}

// Handle enemy defeat
function handleEnemyDefeat(enemy) {
    const enemyIndex = spawnedEnemies.indexOf(enemy);
    if (enemyIndex > -1) {
        spawnedEnemies.splice(enemyIndex, 1); // Remove defeated enemy from the array
    }
    
    currentEnemy = null; // Reset selected enemy
    displayActionOptions(); // Optionally disable further actions or adjust options
    alert("All enemies defeated!"); // Modify this to fit your win conditions
}







