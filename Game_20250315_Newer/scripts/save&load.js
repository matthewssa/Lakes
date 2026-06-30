// Save and load system. Uses Game.character for data.

// Array of save slots with timestamps
const saveSlots = [
    { id: 1, name: 'Save Slot 1', data: null, timestamp: null },
    { id: 2, name: 'Save Slot 2', data: null, timestamp: null },
    { id: 3, name: 'Save Slot 3', data: null, timestamp: null },
    { id: 4, name: 'Save Slot 4', data: null, timestamp: null },
    { id: 5, name: 'Save Slot 5', data: null, timestamp: null },
    { id: 6, name: 'Save Slot 6', data: null, timestamp: null },
];

// Array of load slots (same structure as saveSlots)
const loadSlots = [
    { id: 1, name: 'Load Slot 1' },
    { id: 2, name: 'Load Slot 2' },
    { id: 3, name: 'Load Slot 3' },
    { id: 4, name: 'Load Slot 4' },
    { id: 5, name: 'Load Slot 5' },
    { id: 6, name: 'Load Slot 6' },
];

// Main Menu Load Button
function loadGame_MainMenu() {
    openLoadPopup();
}

// Open the save popup and display save slots
function openSavePopup() {
    document.getElementById('save-popup-overlay').style.display = 'block';
    document.querySelector('.save-window').style.display = 'block';
    displaySaveSlots();
}

// Close the save popup
function closeSavePopup() {
    document.getElementById('save-popup-overlay').style.display = 'none';
    document.querySelector('.save-window').style.display = 'none';
}

// Add event listeners to close when clicked outside window
document.getElementById('save-popup-overlay').addEventListener('mousedown', function(event) {
    if (event.target === this) {
        closeSavePopup();
    }
});

// Track the currently selected save slot and element
let selectedSlot = null;
let selectedSaveSlotElement = null;

// Display available save slots with timestamps
function displaySaveSlots() {
    const saveSlotList = document.getElementById('save-slot-list');
    saveSlotList.innerHTML = '';
    saveSlots.forEach(slot => {
        const savedData = JSON.parse(localStorage.getItem(`saveSlot${slot.id}`));
        const timestamp = savedData ? savedData.timestamp : 'Available';
        const slotElement = document.createElement('div');
        slotElement.classList.add('save-slot');
        slotElement.id = `save-slot-${slot.id}`;
        slotElement.innerHTML = `
            <div class="save-slot-name" onclick="selectSaveSlot(${slot.id})">${slot.name}</div>
            <div class="save-slot-timestamp">${timestamp}</div>
        `;
        saveSlotList.appendChild(slotElement);
    });
}

// Select a save slot
function selectSaveSlot(slotId) {
    selectedSlot = saveSlots.find(slot => slot.id === slotId);
    if (selectedSaveSlotElement) {
        selectedSaveSlotElement.classList.remove('save-selected-slot');
    }
    selectedSaveSlotElement = document.querySelector(`#save-slot-${slotId}`);
    selectedSaveSlotElement.classList.add('save-selected-slot');

    const savedData = JSON.parse(localStorage.getItem(`saveSlot${slotId}`));
    document.querySelector('.delete-save-button').disabled = !savedData;
}

function deleteSelectedSaveSlot() {
    if (selectedSlot) {
        const savedData = JSON.parse(localStorage.getItem(`saveSlot${selectedSlot.id}`));
        if (savedData) {
            document.getElementById('delete-save-prompt-overlay').style.display = 'block';
        } else {
            showStyledAlert('This save slot is empty and cannot be deleted.');
        }
    } else {
        showStyledAlert('Please select a save slot first to delete.');
    }
}

function confirmSaveDelete() {
    if (selectedSlot) {
        const slotId = selectedSlot.id;
        localStorage.removeItem(`saveSlot${slotId}`);
        showStyledAlert(`${selectedSlot.name} has been deleted.`);
        selectedSlot = null;
        selectedSaveSlotElement = null;
        document.querySelector('.delete-save-button').disabled = true;
        displaySaveSlots();
        closeSaveDeletePrompt();
    }
}

function closeSaveDeletePrompt() {
    document.getElementById('delete-save-prompt-overlay').style.display = 'none';
}

// Add event listeners to close when clicked outside window
document.getElementById('delete-save-prompt-overlay').addEventListener('mousedown', function(event) {
    if (event.target === this) {
        closeSaveDeletePrompt();
    }
});

function confirmSave() {
    if (selectedSlot) {
        const saveData = {
            character: {
                ...Game.character, // Spread the entire character object
                characterCreated: true
            },
            currentLocation: {
                functionName: "showRoomDetails",
                zoneIndex: latestActiveRoom ? parseInt(latestActiveRoom.match(/\d+/)[0]) : 0
            },
            timestamp: new Date().toLocaleString(),
        };

        localStorage.setItem(`saveSlot${selectedSlot.id}`, JSON.stringify(saveData));
        showStyledAlert(`${selectedSlot.name} saved successfully!`);
        closeSavePopup();
        displaySaveSlots();
    } else {
        showStyledAlert('Please select a save slot first.');
    }
}

// Open the load popup and display load slots
function openLoadPopup() {
    document.getElementById('load-popup-overlay').style.display = 'block';
    document.querySelector('.load-window').style.display = 'block';
    displayLoadSlots();
}

// Close the load popup
function closeLoadPopup() {
    document.getElementById('load-popup-overlay').style.display = 'none';
    document.querySelector('.load-window').style.display = 'none';
}

// Add event listeners to close when clicked outside window
document.getElementById('load-popup-overlay').addEventListener('mousedown', function(event) {
    if (event.target === this) {
        closeLoadPopup();
    }
});

// Display available load slots with timestamps
function displayLoadSlots() {
    const loadSlotList = document.getElementById('load-slot-list');
    loadSlotList.innerHTML = '';
    loadSlots.forEach(slot => {
        const savedData = JSON.parse(localStorage.getItem(`saveSlot${slot.id}`));
        const timestamp = savedData ? savedData.timestamp : 'Available';
        const slotElement = document.createElement('div');
        slotElement.classList.add('load-slot');
        slotElement.id = `slot-${slot.id}`;
        slotElement.innerHTML = `
            <div class="load-slot-name" onclick="selectLoadSlot(${slot.id})">${slot.name}</div>
            <div class="load-slot-timestamp">${timestamp}</div>
        `;
        loadSlotList.appendChild(slotElement);
    });
    document.querySelector('.delete-load-button').disabled = true;
}

// Select a load slot
let selectedLoadSlot = null;
let selectedLoadSlotElement = null;

function selectLoadSlot(slotId) {
    selectedLoadSlot = loadSlots.find(slot => slot.id === slotId);
    if (selectedLoadSlotElement) {
        selectedLoadSlotElement.classList.remove('load-selected-slot');
    }
    selectedLoadSlotElement = document.querySelector(`#slot-${slotId}`);
    selectedLoadSlotElement.classList.add('load-selected-slot');

    const savedData = JSON.parse(localStorage.getItem(`saveSlot${slotId}`));
    document.querySelector('.delete-load-button').disabled = !savedData;
}

function deleteSelectedLoadSlot() {
    if (selectedLoadSlot) {
        const savedData = JSON.parse(localStorage.getItem(`saveSlot${selectedLoadSlot.id}`));
        if (savedData) {
            document.getElementById('delete-load-prompt-overlay').style.display = 'block';
        } else {
            showStyledAlert('This save slot is empty and cannot be deleted.');
        }
    } else {
        showStyledAlert('Please select a save slot first to delete.');
    }
}

function confirmLoadDelete() {
    if (selectedLoadSlot) {
        const slotId = selectedLoadSlot.id;
        localStorage.removeItem(`saveSlot${slotId}`);
        showStyledAlert(`${selectedLoadSlot.name} has been deleted.`);
        if (selectedLoadSlotElement) {
            selectedLoadSlotElement.classList.remove('load-selected-slot');
        }
        selectedLoadSlot = null;
        selectedLoadSlotElement = null;
        document.querySelector('.delete-load-button').disabled = true;
        displayLoadSlots();
        closeLoadDeletePrompt();
    }
}

function closeLoadDeletePrompt() {
    document.getElementById('delete-load-prompt-overlay').style.display = 'none';
}

// Add event listeners to close when clicked outside window
document.getElementById('delete-load-prompt-overlay').addEventListener('mousedown', function(event) {
    if (event.target === this) {
        closeLoadDeletePrompt();
    }
});

function confirmLoad() {
    if (selectedLoadSlot) {
        const savedData = JSON.parse(localStorage.getItem(`saveSlot${selectedLoadSlot.id}`));
        if (savedData) {
            loadGame(savedData);
            showStyledAlert(`${selectedLoadSlot.name} loaded successfully!`);
            closeLoadPopup();
        } else {
            showStyledAlert('No saved data found for this slot.');
        }
    } else {
        showStyledAlert('Please select a load slot first.');
    }
}

function loadGame(savedData) {
    if (savedData && savedData.character) {
        Object.assign(Game.character, savedData.character);
        updateCharacterDetails();
        document.getElementById("start-screen").style.display = 'none';
        document.getElementById("game-screen").style.display = 'flex';

        // Load location if available
        if (savedData.currentLocation) {
            const { functionName, zoneIndex } = savedData.currentLocation;
            if (typeof window[functionName] === "function") {
                window[functionName](zoneIndex);
            }
        }
    } else {
        showStyledAlert('No saved game found.');
    }
}
