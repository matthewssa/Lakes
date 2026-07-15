
// Function to calculate ability modifier based on ability score
function calculateModifier(score) {
    return Math.floor((score - 10) / 2); // Standard ability modifier formula
}

function updateCharacterAbilities() {
    for (let ability in character.abilities) {
        character.abilities[ability].modifier = calculateModifier(character.abilities[ability].score);
    }
}

// CHARACTER CREATION
function startCharacterCreation() {
	
    // Reference the prompt element
    const actionPrompt = document.getElementById("action-prompt");

    // Change the prompt text to "Click to roll ability scores."
    actionPrompt.innerText = "Click to roll ability scores.";

    // Replace the click event handler to first clear and then roll ability scores
    actionPrompt.onclick = function () {
        clearCharacterCreation();   // Clear previous character creation content
        rollAbilityScores();        // Roll the ability scores after clearing
		
		// After rolling ability scores, set the flag to indicate character creation
        localStorage.setItem('characterCreated', true); // Set character created flag
    };
}

function clearCharacterCreation() {
    // Clear other content
    const abilitySection = document.getElementById("action-prompt");
    if (abilitySection) {
        abilitySection.innerHTML = "";
    }

    // Hide the clickable prompt entirely
    const clickablePrompt = document.querySelector(".clickable-prompt");
    if (clickablePrompt) {
        clickablePrompt.style.display = "none"; // Hide it completely
    }
}


// INITIAL CHARACTER CREATION ABILITY SCORE ROLLS 
// INITIAL CHARACTER CREATION ABILITY SCORE ROLLS 
let abilityScores = []; // Array to hold the final ability scores
const numRolls = 6; // Number of ability scores
const rollsPerAbility = 6; // Number of d4 rolls per ability score
let rolledScores = []; // Store rolled scores separately to handle duplicates

function rollAbilityScores() {
    abilityScores = []; // Reset ability scores for a new round
    rolledScores = []; // Reset rolled scores for a new round

    for (let i = 0; i < numRolls; i++) {
        const rolls = [];
        
        // Roll 1d4 six times
        for (let j = 0; j < rollsPerAbility; j++) {
            const roll = Math.floor(Math.random() * 4) + 1;
            rolls.push(roll);
        }
        
        // Drop the lowest roll
        const minRoll = Math.min(...rolls);
        const finalScore = rolls.reduce((sum, roll) => sum + roll, 0) - minRoll; // Sum minus the lowest roll
        abilityScores.push({ finalScore, rolls }); // Store both final score and rolls
        rolledScores.push(finalScore); // Add final score to rolledScores
    }

    // Display the rolled ability scores
    displayAbilityScores();
}

let showRollDetails = false; // Variable to track the visibility of roll details

function displayAbilityScores() {
    // Find the score display area, or create one if it doesn't exist
    const scoreDisplay = document.getElementById("scoreDisplay");
    if (!scoreDisplay) {
        // Create a new div to hold the ability scores if it doesn't exist
        const rollPanel = document.getElementById("rollPanel");
        const newDiv = document.createElement("div");
        newDiv.id = "scoreDisplay";
        rollPanel.appendChild(newDiv);
    }

    // Update the scores
    const scoreDisplayDiv = document.getElementById("scoreDisplay");
    scoreDisplayDiv.innerHTML = `<h3>Ability Scores</h3>`;

    // Display each score as just the number
    const scoreList = abilityScores.map(scoreObj => scoreObj.finalScore).join(", ");
    scoreDisplayDiv.innerHTML += `<p>${scoreList}</p>`;

    // Add toggle button for roll details
scoreDisplayDiv.innerHTML += `
    <p class="clickable-prompt" onclick="toggleRollDetails()">
        ${showRollDetails ? "Hide" : "Show"} Roll Details
    </p>`;

    // Show roll details if the toggle is enabled
    if (showRollDetails) {
        scoreDisplayDiv.innerHTML += `<h3>Roll Details</h3>`;
        abilityScores.forEach((scoreObj, index) => {
            scoreDisplayDiv.innerHTML += `<p>Rolls for Score ${index + 1}: ${scoreObj.rolls.join(", ")}</p>`;
        });
    }

    // Display ability assignment options
    displayAbilityAssignment();
}

function toggleRollDetails() {
    showRollDetails = !showRollDetails; // Toggle the visibility flag
    displayAbilityScores(); // Refresh the display to reflect the change
}

function displayAbilityAssignment() {
    const rollPanel = document.getElementById("rollPanel");
    const abilities = ["Strength", "Dexterity", "Constitution", "Intelligence", "Willpower", "Charisma"];
    const scoreDisplayDiv = document.getElementById("scoreDisplay");

    scoreDisplayDiv.innerHTML += `<h3>Assign Your Scores</h3>`;
    
    // Create select dropdowns for each ability
    abilities.forEach((ability, index) => {
        scoreDisplayDiv.innerHTML += `
            <p>
                ${ability}: 
                <select id="score-${index}">
                    ${rolledScores.map(score => `<option value="${score}">${score}</option>`).join("")}
                </select>
            </p>`;
    });

    // Add buttons for confirming and auto-assigning
    scoreDisplayDiv.innerHTML += `
    <p class="clickable-prompt" onclick="confirmAssignments()">Confirm</p>
    <p class="clickable-prompt" onclick="autoAssignScores()">Auto Assign</p>`;
}

function autoAssignScores() {
    const abilities = ["Strength", "Dexterity", "Constitution", "Intelligence", "Willpower", "Charisma"];
    const selectedScores = [...rolledScores]; // Copy the rolled scores to avoid mutation
    shuffleArray(selectedScores); // Shuffle the array to randomize the order

    abilities.forEach((ability, index) => {
        const selectElement = document.getElementById(`score-${index}`);
        selectElement.value = selectedScores[index]; // Assign randomly selected score to each ability
    });

    console.log("Scores auto-assigned:", selectedScores); // Debug message
}

// Fisher-Yates (Knuth) Shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

let usedScores = {}; // Object to track how many times scores have been used

function confirmAssignments() {
    console.log("Confirm Assignments called"); // Debug message
    const abilities = ["strength", "dexterity", "constitution", "intelligence", "willpower", "charisma"];
    
    // Reset usedScores for a new round
    usedScores = {};

    // Validate and assign the selected scores to character abilities
    for (let i = 0; i < abilities.length; i++) {
        const selectedScore = parseInt(document.getElementById(`score-${i}`).value, 10);
        
        // Initialize the count for this score if it doesn't exist
        if (!usedScores[selectedScore]) {
            usedScores[selectedScore] = 0;
        }
        
        // Check if the score can be used again
        if (usedScores[selectedScore] < rolledScores.filter(score => score === selectedScore).length) {
            // Assign the score to the character's ability
            character.abilities[abilities[i]].score = selectedScore;
            usedScores[selectedScore]++;
        } else {
            showStyledAlert(`The score ${selectedScore} has already been used the maximum times. Please select a different score for ${abilities[i]}.`);
            return; // Exit if there is an issue with score assignment
        }
    }

    // Update character's ability modifiers and any related UI updates
    updateCharacterAbilities();
    updateCharacterDetails(); // Optional: update UI to reflect the new abilities

    // Clear the roll history box and ability assignment section
    clearAbilityAssignmentSection();  // New function to clear the entire roll log and prompt for HP
}

// Function to show the alert styled with existing CSS
function showStyledAlert(message) {
    const overlay = document.createElement('div');
    const alertBox = document.createElement('div');

    // Set classes to match the quit window
    overlay.className = 'quit-window-overlay';
    alertBox.className = 'quit-window';
    
    // Create close button for dismissing the alert
    const closeButton = document.createElement('span');
    closeButton.className = 'quit-close';
    closeButton.innerHTML = '&times;'; // Close icon
    closeButton.onclick = function() {
        document.body.removeChild(overlay); // Remove overlay when closed
    };

    // Create content for alert
    const title = document.createElement('h2');
    title.innerText = 'Alert';
    const messageElement = document.createElement('p');
    messageElement.innerText = message;

    // Append elements to alert box
    alertBox.appendChild(closeButton);
    alertBox.appendChild(title);
    alertBox.appendChild(messageElement);
    
    // Append alert box to overlay
    overlay.appendChild(alertBox);
    document.body.appendChild(overlay); // Add overlay to body

    // Show the overlay
    overlay.style.display = 'flex';

    // Add event listener to close when clicked outside window
    overlay.addEventListener('mousedown', function(event) {
        if (event.target === overlay) {
            document.body.removeChild(overlay); // Remove overlay when clicking outside
        }
    });

    // Prevent click event from propagating to the overlay
    alertBox.addEventListener('mousedown', function(event) {
        event.stopPropagation(); // Prevent closing when clicking inside the alert box
    });
}

function clearAbilityAssignmentSection() {
    // This function clears only the ability score assignment section without affecting the header or draggable elements
    //const abilitySection = document.getElementById("scoreDisplay");
	const abilitySection = document.getElementById("scoreDisplay");
    if (abilitySection) {
        abilitySection.innerHTML = "";  // Clear only the content related to ability scores
    }
    // Proceed to the HP roll prompt after clearing the score display
    promptForHPRoll();
}

function promptForHPRoll() {
    const actionPanel = document.getElementById("actionPanel");

    // Create or clear the HP roll section without disrupting the header or other parts
    let hpRollSection = document.getElementById("hpRollSection");
    if (!hpRollSection) {
        // Create HP roll section if it doesn't exist
        hpRollSection = document.createElement("div");
        hpRollSection.id = "hpRollSection";
        actionPanel.appendChild(hpRollSection);
    } else {
        // Clear the existing content for a fresh prompt
        hpRollSection.innerHTML = "";
    }

    // Set up the HP roll prompt
    hpRollSection.innerHTML = `
        <p class="clickable-prompt" onclick="clearHPRollPrompt(); rollForHP()">Roll 1d12 for HP</p>
    `;
}

function clearHPRollPrompt() {
    // Clear other content
    const abilitySection = document.getElementById("hpRollSection");
    if (abilitySection) {
        abilitySection.innerHTML = "";
    }

    // Hide the clickable prompt entirely
    const clickablePrompt = document.querySelector(".clickable-prompt");
    if (clickablePrompt) {
        clickablePrompt.style.display = "none"; // Hide it completely
    }
}

function rollForHP() {
    if (character.hpRolled) {
        alert("You can only roll for HP once at the beginning of the game.");
        return;
    }

    const hpRoll = Math.floor(Math.random() * 12) + 1;
    const constitutionModifier = character.abilities.constitution.modifier;

    character.maxHp += hpRoll + constitutionModifier;
    character.currentHp = character.maxHp;
    character.hpRolled = true;

    // Update character details after the HP roll
    updateCharacterDetails();  

    const rollPanel = document.getElementById("rollPanel");
    if (rollPanel) {
        // Create a container for the HP roll results
        const hpResultContainer = document.createElement("div");
        hpResultContainer.className = "hp-roll-result";

        // Add title
        const title = document.createElement("h3");
        title.innerText = "HP Roll Result";
        hpResultContainer.appendChild(title);

        // Add HP roll, modifier, and HP summary
        const rollText = document.createElement("p");
        rollText.innerHTML = `HP Roll: <strong>${hpRoll}</strong>`;
        hpResultContainer.appendChild(rollText);

        const modifierText = document.createElement("p");
        modifierText.innerHTML = `Constitution Modifier: <strong>${constitutionModifier}</strong>`;
        hpResultContainer.appendChild(modifierText);

        const maxHpText = document.createElement("p");
        maxHpText.innerHTML = `Max HP: <strong>${character.maxHp}</strong>`;
        hpResultContainer.appendChild(maxHpText);

        const currentHpText = document.createElement("p");
        currentHpText.innerHTML = `Current HP: <strong>${character.currentHp}</strong>`;
        hpResultContainer.appendChild(currentHpText);

        // Add "Next" button that clears previous results and proceeds to MP roll
        const nextButton = document.createElement("p");
        nextButton.className = "clickable-prompt";
        nextButton.innerText = "Next";
        nextButton.onclick = function() {
            clearHPresults(); // Clear previous HP results
            askForMPRoll(); // Proceed to MP roll
        };
        hpResultContainer.appendChild(nextButton);

        // Append the result container to rollPanel
        rollPanel.appendChild(hpResultContainer);
    }
}

function clearHPresults() {
    // Clear all HP roll result containers from the rollPanel
    const rollPanel = document.getElementById("rollPanel");
    if (rollPanel) {
        const hpResults = rollPanel.querySelectorAll(".hp-roll-result");
        hpResults.forEach(result => result.remove()); // Remove each HP roll result element
    }
}

function askForMPRoll() {
    const actionPanel = document.getElementById("actionPanel");

    // Clear or create a specific MP roll section to avoid clearing everything else
    let mpRollSection = document.getElementById("mpRollSection");
    if (!mpRollSection) {
        mpRollSection = document.createElement("div");
        mpRollSection.id = "mpRollSection";
        actionPanel.appendChild(mpRollSection);
    } else {
        mpRollSection.innerHTML = "";
    }

    // Set up MP roll prompt
	mpRollSection.innerHTML = `
    <p class="clickable-prompt" onclick="clearMPRoll(); rollForMP()">Roll 1d4 for MP</p>
    `;
}

function clearMPRoll() {
    // Clear other content
    const abilitySection = document.getElementById("mpRollSection");
    if (abilitySection) {
        abilitySection.innerHTML = "";
    }

    // Hide the clickable prompt entirely
    const clickablePrompt = document.querySelector(".clickable-prompt");
    if (clickablePrompt) {
        clickablePrompt.style.display = "none"; // Hide it completely
    }
}

function rollForMP() {
    // Ensure the MP roll is only done once
    if (character.mpRolled) {
        alert("You can only roll for MP once at the beginning of the game.");
        return; // Prevent further execution
    }

    const mpRoll = Math.floor(Math.random() * 4) + 1; // Roll a 1d4
    const intelligenceModifier = character.abilities.intelligence.modifier; // Get the Intelligence modifier

    // Add the rolled MP to the existing max MP and current MP
    character.maxMp += mpRoll + intelligenceModifier; // Set the max MP, including the modifier
    character.currentMp = character.maxMp; // Set current MP to max MP at level 1
    character.mpRolled = true; // Set the flag to indicate MP has been rolled

    // Update character details on the screen
    updateCharacterDetails(); // Ensure UI reflects changes

    const rollPanel = document.getElementById("rollPanel");
    if (rollPanel) {
        // Create a container for the MP roll results
        const mpResultContainer = document.createElement("div");
        mpResultContainer.className = "mp-roll-result";

        // Add title
        const title = document.createElement("h3");
        title.innerText = "MP Roll Result";
        mpResultContainer.appendChild(title);

        // Add MP roll and summary
        const rollText = document.createElement("p");
        rollText.innerHTML = `You rolled: <strong>${mpRoll}</strong> for MP!`;
        mpResultContainer.appendChild(rollText);

        const modifierText = document.createElement("p");
        modifierText.innerHTML = `Intelligence Modifier: <strong>${intelligenceModifier}</strong>`;
        mpResultContainer.appendChild(modifierText);

        const maxMpText = document.createElement("p");
        maxMpText.innerHTML = `Your Maximum MP is now: <strong>${character.maxMp}</strong>`;
        mpResultContainer.appendChild(maxMpText);

        const currentMpText = document.createElement("p");
        currentMpText.innerHTML = `Your Current MP is now: <strong>${character.currentMp}</strong>`;
        mpResultContainer.appendChild(currentMpText);

        // Add "Next" button
        const nextButton = document.createElement("p");
        nextButton.className = "clickable-prompt";
        nextButton.innerText = "Next";
		nextButton.onclick = function() {
		console.log("Next button clicked. Clearing MP results.");
          clearMPresults(); // Clear the results displayed

if (!character.setupFinished) {
	console.log("Setup is not finished. Marking setup as finished and navigating to the zone.");
    character.setupFinished = true; // Mark setup as finished
    // Now navigate to the zone "Miene's Bedroom"
    const targetZoneIndex = getZoneIndexByName("Miene's Bedroom");

    // Debugging: log the index of the target zone
    console.log("Target Zone Index for 'Miene's Bedroom':", targetZoneIndex);

    if (targetZoneIndex !== -1) {
        // Zone found, now navigate
        console.log("Navigating to 'Miene's Bedroom'...");
        showRoomDetails(targetZoneIndex); // Navigate to the target zone
    } else {
        // Debugging: Zone not found
        console.error("Zone 'Miene's Bedroom' not found!");
			}
            } else {
                console.log("Setup is already finished, no action.");
            }
        };
        mpResultContainer.appendChild(nextButton);

        // Append the result container to rollPanel
        rollPanel.appendChild(mpResultContainer);
    }
}

function clearMPresults() {
    // Clear all MP roll result containers from the rollPanel
    const rollPanel = document.getElementById("rollPanel");
    if (rollPanel) {
        const mpResults = rollPanel.querySelectorAll(".mp-roll-result");
        mpResults.forEach(result => result.remove()); // Remove each MP roll result element
    }
}


// On page load, check if character is already created
window.addEventListener('DOMContentLoaded', (event) => {
    const savedData = JSON.parse(localStorage.getItem(`saveSlot${selectedSlot ? selectedSlot.id : ''}`)); // Adjust based on your slot management
    const actionPrompt = document.getElementById('action-prompt');

    if (savedData && savedData.character.characterCreated) {
        actionPrompt.style.display = 'none'; // Hide if character is created
    } else {
        actionPrompt.style.display = 'block'; // Show if character is not created
    }
});