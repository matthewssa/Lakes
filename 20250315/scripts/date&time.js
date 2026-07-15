// Centralized game clock object
const gameClock = {
    hours: 7,
    minutes: 11,
    day: 4,
    month: 8, // September (0 = Jan, 11 = Dec)
    year: 2024,
    alcoholEffectTimerMinutes: 0, // For tracking total minutes elapsed

    // Method to add minutes to the game clock
    addMinutes(minutesToAdd) {
		console.log(`Adding ${minutesToAdd} minutes to game clock`); // Debugging output
		
        if (character.alcoholPercentage > 0) {
            this.alcoholEffectTimerMinutes += minutesToAdd;
        }
		
        this.minutes += minutesToAdd;

        // Handle minute overflow
        if (this.minutes >= 60) {
			const extraHours = Math.floor(this.minutes / 60); 
            this.hours += extraHours;
			this.minutes = this.minutes % 60;

			console.log(`Overflow: Added ${extraHours} hours, new time is ${this.hours}:${this.minutes}`); // Updated log
		}

        // Handle hour overflow
        if (this.hours >= 24) {
            this.day += Math.floor(this.hours / 24);
            this.hours = this.hours % 24;
			     console.log(`Overflow: Added new day, now day ${this.day}`); // Debugging output
    
        }

        // Handle day overflow (simplified to 30 days per month for this example)
        if (this.day > 30) {
            this.month += Math.floor(this.day / 30);
            this.day = this.day % 30;
            if (this.day === 0) this.day = 1; // Avoid day 0
			      console.log(`Overflow: Added new month, now month ${this.month + 1}`); // Debugging output
   
        }

        // Handle month overflow
        if (this.month >= 12) {
            this.year += Math.floor(this.month / 12);
            this.month = this.month % 12;
			        console.log(`Overflow: Added new year, now year ${this.year}`); // Debugging output
   
        }



        // Apply alcohol reduction if 60 minutes have passed
        if (this.alcoholEffectTimerMinutes >= 60 && character.alcoholPercentage > 0) {
            console.log("Elapsed minutes >= 60 and alcohol > 0, triggering alcohol decrease.");
            decreaseAlcoholOverTime();
            this.alcoholEffectTimerMinutes -= 60; // Reset elapsed minutes after triggering
        }
		
		

        // Update the displayed time
        updateDateTimeDisplay();
    },

    // Method to get the current time as a formatted string
    getFormattedTime() {
        const hours = String(this.hours).padStart(2, '0');
        const minutes = String(this.minutes).padStart(2, '0');
        const dayOfWeek = daysOfWeek[(this.day - 1) % 7]; // Example: cycling through days of the week
        const timeOfDay = getTimeOfDay();

        return `${hours}:${minutes} ${dayOfWeek} ${this.day}th ${months[this.month]} ${this.year} - ${timeOfDay}`;
    }
};

// Days of the week and months arrays
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Function to get the current time of day
function getTimeOfDay() {
    if (gameClock.hours >= 6 && gameClock.hours < 12) {
        return "Morning";
    } else if (gameClock.hours >= 12 && gameClock.hours < 18) {
        return "Afternoon";
    } else if (gameClock.hours >= 18 && gameClock.hours < 21) {
        return "Evening";
    } else {
        return "Night";
    }
}

// Update the display for in-game time
function updateDateTimeDisplay() {
    const characterDateTimeElement = document.getElementById("character-date-time");
    const cheatDateTimeElement = document.getElementById("cheat-date-time");

    const formattedDateTime = gameClock.getFormattedTime();

    // Update both elements
    characterDateTimeElement.innerHTML = formattedDateTime;
    cheatDateTimeElement.innerHTML = formattedDateTime;
}

// Function to decrease alcoholPercentage over time
function decreaseAlcoholOverTime() {
    console.log("decreaseAlcoholOverTime called"); // Debug
    if (character.alcoholPercentage > 0) {
        character.alcoholPercentage -= 1;
        console.log(`Alcohol Percentage decreased to: ${character.alcoholPercentage}`); // Debug
        if (character.alcoholPercentage < 0) {
            character.alcoholPercentage = 0;
        }
    } else {
        console.log("Alcohol Percentage is already 0"); // Debug
    }
    updateCharacterDetails();
}

// Initialize the time display when the game starts
document.addEventListener('DOMContentLoaded', () => {
    updateDateTimeDisplay();
    updateCharacterDetails(); // Ensure the status window is updated on load
});

// Example: Add minutes to the game time
function addMinutesToGameTime(minutesToAdd) {
	    console.log("Adding minutes:", minutesToAdd); // Debugging output
    gameClock.addMinutes(minutesToAdd);
	
	    // Debugging the updated game clock
    console.log(`Updated time: ${gameClock.hours}:${gameClock.minutes} on day ${gameClock.day}, month ${gameClock.month + 1}`);

}
