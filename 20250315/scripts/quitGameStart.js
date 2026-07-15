// Function to show the quit confirmation modal
function quitGameStart() {
    console.log("Quit game function triggered"); // Debugging line

    // Ensure quit-window-overlay is visible
    document.getElementById('quit-window-overlay').style.display = 'block'; // Show the overlay
    document.getElementById('quit-window').style.display = 'block'; // Show the modal

    // Bring quit modal to the front
    // bringToFront('quit-window-overlay');
}

// Function to confirm quitting the game
function confirmQuit() {
    console.log("Confirmed quit"); // Debugging line
    window.location.href = 'exit.html'; // Redirect to exit page
}

// Function to close the quit modal
function closeQuitWindow() {
    console.log("Closing quit window"); // Debugging line
    document.getElementById('quit-window-overlay').style.display = 'none'; // Hide the overlay
    document.getElementById('quit-window').style.display = 'none'; // Hide the modal
}



// Prevent click event from propagating to the overlay
document.getElementById('quit-window').addEventListener('mousedown', function(event) {
    event.stopPropagation(); 
});

// Prevent click event from propagating to the overlay
document.getElementById('item-window').addEventListener('mousedown', function(event) {
    event.stopPropagation();
});