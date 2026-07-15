
///////////////////// Cheat Menu /////////////////////////

// Function to open the cheat popup
function openCheatWindow() {
    console.log("Opening Cheat Popup"); // Debugging statement

    // Populate the cheat popup with character details
    document.getElementById("cheat-xp").textContent = character.exp; // Display character XP
    document.getElementById("cheat-hp").textContent = character.currentHp;  // Display character HP

    // Log XP and HP for debugging
    console.log(`Character XP: ${character.experience}`);
    console.log(`Character HP: ${character.currentHp}`);

    // Display the cheat popup and bring it to the front
    document.getElementById("cheat-window-overlay").style.display = "block"; // Corrected overlay ID
    bringToFront("cheat-window-overlay");
}

// Function to close the cheat popup
function closeCheatWindow() {
    console.log("Closing Cheat Popup"); // Debugging statement
    document.getElementById("cheat-window-overlay").style.display = "none"; // Hide cheat overlay
}

// Close cheat popup when clicking outside the content
window.onclick = function(event) {
    const overlay = document.getElementById("cheat-window-overlay");
    if (event.target === overlay) {
        closeCheatWindow();
    }
}

// Function to add XP (within cheat menu)
function addXP(amount) {
    character.gainExperience(amount); // Add XP to the character
    updateCharacterDetails(); // Reuse the original function to update character stats on the screen
    document.getElementById("cheat-xp").textContent = character.exp; // Update XP in the cheat popup
    console.log(`Added ${amount} XP, new total: ${character.exp}`);
}

// Function to deal damage to the character (within cheat menu)
function dealDamage(amount) {
    character.currentHp -= amount;
    if (character.currentHp < 0) {
        character.currentHp = 0; // Prevent HP from going negative
    }
    updateCharacterDetails(); // Reuse the original function to update the display after changing HP
    document.getElementById("cheat-hp").textContent = character.currentHp; // Update HP in the cheat popup
    console.log(`Dealt ${amount} damage, new HP: ${character.currentHp}`);
}