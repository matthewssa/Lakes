// script.js
function rollDie() {
    const dice = document.getElementById('dice');
    const resultDisplay = document.getElementById('diceRollResult');

    // Add the rolling class to trigger the animation
    dice.classList.add('dice-rolling');

    // Simulate the rolling effect
    setTimeout(() => {
        // Remove the rolling animation class
        dice.classList.remove('dice-rolling');
        
        // Generate a random number between 1 and 6
        const roll = Math.floor(Math.random() * 6) + 1;

        // Update the dice display with the result
        dice.innerText = roll; // Change die face
        resultDisplay.innerText = `You rolled a: ${roll}`; // Show result
    }, 500); // Duration of the rolling animation
}
