console.log("preload.js loaded"); // Check if the script loads

// Function to preload images
function preloadImages(sources, callback) {
    let loadedImages = 0;
    const totalImages = sources.length;

    console.log("Preloading images:", sources); // Log the sources

    for (let i = 0; i < totalImages; i++) {
        const img = new Image();
        img.src = sources[i];

        img.onload = function() {
            loadedImages++;
            console.log(`Image loaded: ${sources[i]}`); // Log each loaded image
            if (loadedImages === totalImages) {
                callback();
            }
        };

        img.onerror = function() {
            console.error(`Error loading image: ${sources[i]}`); // Log any errors
        };
    }
}

// List of images to load
const imagesToLoad = [
    'images/title-overlay.png',
    'images/exit-image.png',
    'images/home.png',
    'images/fixhair1.png',
    'images/fixhair2.png',
    'images/fixhair3.png',
    'images/fixhair4.png',
    'images/looking_in_the_mirror1.png',
    'images/looking_in_the_mirror2.png',
    'images/looking_in_the_mirror3.png',
    'images/looking_in_the_mirror4.png',
    'images/looking_in_the_mirror5.png',
    'images/looking_in_the_mirror6.png',
    'images/looking_in_the_mirror7.png',
    'images/open_wardrobe1.png',
    'images/open_wardrobe2.png',
	'images/resting1.png',
	'images/resting2.png',
	'images/resting3.png',
	'images/resting4.png',
	'images/resting5.png',
	'images/resting6.png',
	'images/resting7.png',
	'images/resting8.png',
	'images/waking_up1.png',
];

// Use DOMContentLoaded to call preloadImages
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed, calling preloadImages...");
    
    preloadImages(imagesToLoad, function() {
        console.log("All images loaded");
        // You can trigger other functionality here if needed
    });
});
