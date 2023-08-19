// VISUAL PART

// Hides or shows the dividing line based on screen width
const line = document.getElementById('line');

function resizeSubmitArea() {
    if (window.innerWidth > 900) {
        // Hides the dividing line for larger screens
        line.classList.add('d-none');
    } else {
        // Shows the dividing line for smaller screens
        line.classList.remove('d-none');
    }
}

resizeSubmitArea();
window.addEventListener('resize', resizeSubmitArea);

// Adjusts the size and thickness of the submit button icon according to screen width
const submitButtonIcon = document.getElementById('arrowDownIcon');
const submitButtonIconPaths = document.querySelectorAll('#arrowDownIcon path');

function resizeSubmitButtonIcon() {
    if (window.innerWidth > 900) {
        // Enlarges icon for larger screens
        submitButtonIcon.setAttribute('width', '44');
        submitButtonIcon.setAttribute('height', '44');
        submitButtonIconPaths.forEach(path => {
            // Decreases stroke width for larger screens
            path.setAttribute('stroke-width', '1');
        });
    } else {
        // Shrinks icon for smaller screens
        submitButtonIcon.setAttribute('width', '24');
        submitButtonIcon.setAttribute('height', '24');
        submitButtonIconPaths.forEach(path => {
           // Increases stroke width for smaller screens
            path.setAttribute('stroke-width', '2');
        });
    }
}

resizeSubmitButtonIcon();
window.addEventListener('resize', resizeSubmitButtonIcon);

// LOGIC PART

