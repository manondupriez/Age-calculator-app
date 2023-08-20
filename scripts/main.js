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

    const form = document.getElementById('form');

    const formElements = [
        {
            id: 'dayInput',
            label: 'dayLabel',
            errorMessages: {
                missingField: 'This field is required',
                invalidEntry: 'Must be a valid day'
            },
            isValid: value => !isNaN(value) && value >= 1 && value <= 31
        },
        {
            id: 'monthInput',
            label: 'monthLabel',
            errorMessages: {
                missingField: 'This field is required',
                invalidEntry: 'Must be a valid month'
            },
            isValid: value => !isNaN(value) && value >= 1 && value <= 12
        },
        {
            id: 'yearInput',
            label: 'yearLabel',
            errorMessages: {
                missingField: 'This field is required',
                invalidEntry: 'Must be a valid year',
                invalidEntry2: 'Must be in the past'
            },
            isValid: value => !isNaN(value) && value <= 2023
        }
    ];

    const validateField = (element) => {

        const input = element.input;
        const label = element.labelElement;
        const errorMessages = element.errorMessages;

        input.addEventListener('blur', () => {

            const inputValue = input.value.trim();

            if (inputValue === '') {

                label.classList.add('labelInvalid');
                input.classList.add('inputInvalid');
                input.nextElementSibling.classList.remove('d-none');
                input.nextElementSibling.textContent = errorMessages.missingField;
                return;
            }

            const errorMessage = element.isValid(inputValue) ? '' : errorMessages.invalidEntry;

            if (errorMessage) {
                label.classList.add('labelInvalid');
                input.classList.add('inputInvalid');
                input.nextElementSibling.classList.remove('d-none');
                input.nextElementSibling.textContent = errorMessage;

            } else {

                label.classList.remove('labelInvalid');
                input.classList.remove('inputInvalid');
                input.nextElementSibling.classList.add('d-none');
                input.nextElementSibling.textContent = '';
            }
        });
    };

    formElements.forEach(element => {

        element.input = document.getElementById(element.id);
        element.labelElement = document.getElementById(element.label);
        validateField(element);

    });

    form.addEventListener('submit', event => {

        let hasErrors = false;

        formElements.forEach(element => {

            const inputValue = element.input.value.trim();

            if (inputValue === '' || !element.isValid(inputValue)) {

                hasErrors = true;
                element.labelElement.classList.add('labelInvalid');
                element.input.classList.add('inputInvalid');
                element.input.nextElementSibling.classList.remove('d-none');
                element.input.nextElementSibling.textContent = inputValue === '' ? element.errorMessages.missingField : element.errorMessages.invalidEntry;

            } else {

                element.labelElement.classList.remove('labelInvalid');
                element.input.classList.remove('inputInvalid');
                element.input.nextElementSibling.classList.add('d-none');
                element.input.nextElementSibling.textContent = '';

            }
        });

        if (hasErrors) {
            event.preventDefault();
        }
    });
    
});