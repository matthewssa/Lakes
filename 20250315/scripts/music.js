console.log("music.js loaded");

const MusicController = (() => {
    const backgroundMusic = document.getElementById('background-music');
    let isMusicPlaying = false;
    let isToggling = false; // Prevent rapid double-triggering

    const toggleMusic = () => {
        if (isToggling) return; // Prevent multiple toggles at once

        isToggling = true; // Lock toggling until action is complete
        console.log("toggleMusic called");

        const musicToggleButtonMain = document.getElementById('music-toggle-button-main');
        const musicToggleButtonGame = document.getElementById('music-toggle-button-game');

        if (backgroundMusic) {
            if (isMusicPlaying) {
                backgroundMusic.pause();
                console.log("Music paused");
                if (musicToggleButtonMain) musicToggleButtonMain.textContent = "Off";
                if (musicToggleButtonGame) musicToggleButtonGame.textContent = "Off";
            } else {
                backgroundMusic.play();
                console.log("Music playing");
                if (musicToggleButtonMain) musicToggleButtonMain.textContent = "On";
                if (musicToggleButtonGame) musicToggleButtonGame.textContent = "On";
            }
            isMusicPlaying = !isMusicPlaying;
            console.log(`isMusicPlaying: ${isMusicPlaying}`);
        } else {
            console.error("Background music element not found.");
        }

        isToggling = false; // Allow toggling again after action completes
    };

    const init = () => {
        const musicToggleButtonMain = document.getElementById('music-toggle-button-main');
        const musicToggleButtonGame = document.getElementById('music-toggle-button-game');

        console.log("Initializing music controller");

        // Reset music on load
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            console.log("Music reset on DOMContentLoaded");
        } else {
            console.error("Background music element not found");
        }

        // Add click event listeners
        if (musicToggleButtonMain) {
            musicToggleButtonMain.onclick = toggleMusic; // Add click listener only once
            console.log("Main music toggle button event listener added");
        } else {
            console.error("Main music toggle button not found");
        }

        if (musicToggleButtonGame) {
            musicToggleButtonGame.onclick = toggleMusic; // Add click listener only once
            console.log("Game music toggle button event listener added");
        } else {
            console.error("Game music toggle button not found");
        }
    };

    return {
        toggleMusic,
        init,
    };
})();

// Expose toggleMusic globally
window.toggleMusic = MusicController.toggleMusic;

// Initialize the music controller after the DOM has loaded
/* 
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event triggered");
    MusicController.init();
});
*/
