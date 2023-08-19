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

document.addEventListener('DOMContentLoaded', () => {
    // Targets form
    const form = document.getElementById('form');

    // Targets the form labels and inputs and their error messages
    const formElements = 
    [
        { 
            label: document.getElementById('dayLabel'),
            input: document.getElementById('dayInput'),
            hasError: false,
            missingFieldErrorMessage: 'This field is required',
            invalidEntryErrorMessage: 'Must be a valid day'
        },
        { 
            label: document.getElementById('monthLabel'),
            input: document.getElementById('monthInput'),
            hasError: false,
            missingFieldErrorMessage: 'This field is required',
            invalidEntryErrorMessage: 'Must be a valid month'
        },
        {
            label: document.getElementById('yearLabel'),
            input: document.getElementById('yearInput'),
            hasError: false,
            missingFieldErrorMessage: 'This field is required',
            invalidEntryErrorMessage: 'Must be in the past'
        }
    ];

    // Verifies if all the form fields are completed
    const areFieldsCompleted = () => {

        formElements.forEach(element => {

            element.input.addEventListener('blur', () => {
                if (element.input.value.trim() === '') {

                    element.hasError = true;
                    element.label.classList.add('labelInvalid');
                    element.input.classList.add('inputInvalid');
                    element.input.nextElementSibling.classList.remove('d-none');
                    element.input.nextElementSibling.textContent = element.missingFieldErrorMessage;

                } else {

                    element.hasError = false;
                    element.label.classList.remove('labelInvalid');
                    element.input.classList.remove('inputInvalid');
                    element.input.nextElementSibling.classList.add('d-none');
                    element.input.nextElementSibling.textContent = '';

                }
            })

        });

    };

    areFieldsCompleted();

    form.addEventListener('submit', event => {

        let hasErrors = false;

        formElements.forEach(element => {

            // Returns an error if a field is missing and prrvent the form submission
            if (element.input.value.trim() === '') {

                hasErrors = true;
                element.hasError = true;
                element.label.classList.add('labelInvalid');
                element.input.classList.add('inputInvalid');
                element.input.nextElementSibling.classList.remove('d-none');
                element.input.nextElementSibling.textContent = element.missingFieldErrorMessage;

            } else if (element.hasError) {

                hasErrors = true;

            }
        });

        if (hasErrors) {
            event.preventDefault();
        }

    });
});
