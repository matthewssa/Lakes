document.addEventListener('DOMContentLoaded', (event) => {
    const actionPanel = document.querySelector('#actionPanel'); // Updated selector to match your ID
    const actionTitle = document.querySelector('.action-title');
    const resizeHandle = document.querySelector('.resize-handle'); // Assume you have a resize handle element

    let isDragging = false;
    let startX, startY, initialX, initialY;

    // Variables for resizing
    let isResizing = false;
    let initialHeight = 0;
    let initialMouseY = 0;

    // When the user clicks down on the action title, start dragging
    actionTitle.addEventListener('mousedown', (e) => {
        isDragging = true;

        // Calculate the initial cursor position relative to the panel's top-left corner
        startX = e.clientX;
        startY = e.clientY;

        // Get the current position of the panel
        initialX = actionPanel.offsetLeft;
        initialY = actionPanel.offsetTop;

        document.body.style.cursor = 'move'; // Change cursor to move mode
    });

    // When the user clicks down on the resize handle, start resizing
    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        initialHeight = actionPanel.clientHeight; // Get the initial height
        initialMouseY = e.clientY; // Store the initial mouse Y position
        e.stopPropagation(); // Prevent the event from bubbling up to the dragging handler
    });

    // When the user moves the mouse, move the action panel if dragging or resize if resizing
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            // Calculate new panel position based on mouse movement
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            actionPanel.style.left = `${initialX + dx}px`;
            actionPanel.style.top = `${initialY + dy}px`;
        }

        if (isResizing) {
            const dy = e.clientY - initialMouseY; // Calculate how far the mouse has moved
            const newHeight = initialHeight + dy; // Adjust the height based on mouse movement

            actionPanel.style.height = `${Math.max(newHeight, 150)}px`; // Set the new height with a minimum of 150px
        }
    });

    // When the user releases the mouse button, stop dragging or resizing
    document.addEventListener('mouseup', () => {
        isDragging = false;
        isResizing = false; // Reset resizing flag
        document.body.style.cursor = 'default'; // Reset cursor
    });
});
