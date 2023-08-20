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

    const today = new Date();
    const currentYear = today.getFullYear();

    const form = document.getElementById('form');
    let canSubmit = false;
    const formElements = [
        {
            id: 'dayInput',
            label: 'dayLabel',
            errorMessages: {
                missingField: 'This field is required',
                invalidEntry: 'Must be a valid day',
            },
            valid: false,
            isValid: value => !isNaN(value) && value !== '' && value >= 1 && value <= 31
        },
        {
            id: 'monthInput',
            label: 'monthLabel',
            errorMessages: {
                missingField: 'This field is required',
                invalidEntry: 'Must be a valid month'
            },
            valid: false,
            isValid: value => !isNaN(value) && value !== '' && value >= 1 && value <= 12
        },
        {
            id: 'yearInput',
            label: 'yearLabel',
            errorMessages: {
                missingField: 'This field is required',
                invalidEntry: 'Must be a valid year',
                invalidEntry2: 'Must be in the past'
            },
            valid: false,
            isValid: value => !isNaN(value) && value !== '' && value <= currentYear
        }
    ];

    formElements.forEach(element => {

        document.getElementById(element.id).addEventListener('blur', () => {

            if (element.isValid(document.getElementById(element.id).value.trim())) {
                
                element.valid = true;
                let AllFieldsAreValid = true;

                formElements.forEach(element => {
                    AllFieldsAreValid &= element.valid;
                });

                if (AllFieldsAreValid) {
                    validateBirthdayDate();
                }

                // Update l'affichage
                document.getElementById(element.label).classList.remove('labelInvalid');
                document.getElementById(element.id).classList.remove('inputInvalid');

            } else {

                canSubmit = false;
                element.valid = false;

                // Update l'affichage
                document.getElementById(element.label).classList.add('labelInvalid');
                document.getElementById(element.id).classList.add('inputInvalid');

                // Afficher message d'erreur
                

            }

        })

    });

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    const validateBirthdayDate = () => {

        const dayInput = document.getElementById('dayInput').value.trim();
        const monthInput = document.getElementById('monthInput').value.trim();
        const yearInput = document.getElementById('yearInput').value.trim();

        const maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (isLeapYear(yearInput)) {
            maxDaysInMonth[1] = 29;
        }

        const birthdayDate = new Date(yearInput, monthInput - 1, dayInput);
    
        if (dayInput <= maxDaysInMonth[monthInput - 1] && (birthdayDate <= today)) {

            canSubmit = true;

        }

    };

    form.addEventListener('submit', event => {

        if (!canSubmit) {
            event.preventDefault();
        }

    });

});