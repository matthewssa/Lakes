document.addEventListener('DOMContentLoaded', (event) => {
    const storyPanel = document.querySelector('#storyPanel'); // Updated selector to match the story panel ID
    const storyTitle = document.querySelector('.story-title');
    const resizeHandle = document.querySelector('.resize-handle'); // Assume you have a resize handle element

    let isDragging = false;
    let startX, startY, initialX, initialY;

    // Variables for resizing
    let isResizing = false;
    let initialHeight = 0;
    let initialWidth = 0; // Added for width adjustment
    let initialMouseY = 0;
    let initialMouseX = 0; // Added for width adjustment

    // When the user clicks down on the story title, start dragging
    storyTitle.addEventListener('mousedown', (e) => {
        isDragging = true;

        // Calculate the initial cursor position relative to the panel's top-left corner
        startX = e.clientX;
        startY = e.clientY;

        // Get the current position of the panel
        initialX = storyPanel.offsetLeft;
        initialY = storyPanel.offsetTop;

        document.body.style.cursor = 'move'; // Change cursor to move mode
    });

    // When the user clicks down on the resize handle, start resizing
    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        initialHeight = storyPanel.clientHeight; // Get the initial height
        initialWidth = storyPanel.clientWidth; // Get the initial width
        initialMouseY = e.clientY; // Store the initial mouse Y position
        initialMouseX = e.clientX; // Store the initial mouse X position
        e.stopPropagation(); // Prevent the event from bubbling up to the dragging handler
    });

    // When the user moves the mouse, move the story panel if dragging or resize if resizing
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            // Calculate new panel position based on mouse movement
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            storyPanel.style.left = `${initialX + dx}px`;
            storyPanel.style.top = `${initialY + dy}px`;
        }

        if (isResizing) {
            const dy = e.clientY - initialMouseY; // Calculate how far the mouse has moved vertically
            const dx = e.clientX - initialMouseX; // Calculate how far the mouse has moved horizontally

            const newHeight = initialHeight + dy; // Adjust the height based on mouse movement
            const newWidth = initialWidth + dx; // Adjust the width based on mouse movement

            storyPanel.style.height = `${Math.max(newHeight, 150)}px`; // Set the new height with a minimum of 150px
            storyPanel.style.width = `${Math.max(newWidth, 200)}px`; // Set the new width with a minimum of 200px
        }
    });

    // When the user releases the mouse button, stop dragging or resizing
    document.addEventListener('mouseup', () => {
        isDragging = false;
        isResizing = false; // Reset resizing flag
        document.body.style.cursor = 'default'; // Reset cursor
    });
});
