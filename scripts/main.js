// ********** VISUAL PART (unrelated to form) **********

// Hides or shows the dividing line based on screen width
const line = document.getElementById('line');
function resizeSubmitArea() {
    if (window.innerWidth > 900) {
        // Hides the dividing line on larger screens
        line.classList.add('d-none');
    } else {
        // Shows the dividing line on smaller screens
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

// ********** LOGIC PART **********

    // ********** Form entries validation **********

document.addEventListener('DOMContentLoaded', () => {

    // Gets the current date and year
    const today = new Date();
    const currentYear = today.getFullYear();

    const form = document.getElementById('form');
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

    let canSubmit = false;
    formElements.forEach(element => {

        document.getElementById(element.id).addEventListener('input', () => {

            // If an element is valid according to its own conditions
            if (element.isValid(document.getElementById(element.id).value.trim())) {
                
                // Sets the valid element property at true
                element.valid = true;

                let AllFieldsAreValid = true;
                formElements.forEach(element => {
                    // Updates allFieldsAreValid depending on each valid or invalid element
                    AllFieldsAreValid &= element.valid;
                });

                // Calls the entire date validation function if all the fields are valid
                if (AllFieldsAreValid) {
                    validateBirthdayDate();
                }

                // Updates display
                removeErrorDisplay(element);
                // Removes error messages
                removeErrorMessage(element);

            } else {

                // Sets canSubmit at false which prevents form submission
                canSubmit = false;
                // Resets the valid element property at false
                element.valid = false;

                // Updates display
                addErrorDisplay(element);
                // Updates error messages
                updateErrorMessage(element);

            }

        })

    });

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    // Checks that the entire date is valid
    const validateBirthdayDate = () => {

        const dayInput = document.getElementById('dayInput').value.trim();
        const monthInput = document.getElementById('monthInput').value.trim();
        const yearInput = document.getElementById('yearInput').value.trim();

        const maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // Sets 29 days in february in case of leap year
        if (isLeapYear(yearInput)) {
            maxDaysInMonth[1] = 29;
        }

        const birthdayDate = new Date(yearInput, monthInput - 1, dayInput);
    
        if (dayInput <= maxDaysInMonth[monthInput - 1] && (birthdayDate <= today)) {

            formElements.forEach(element => {
                removeErrorDisplay(element);
            });

            canSubmit = true;
            return true;

        } else {

            canSubmit = false;
            return false;

        }

    };

    const addErrorDisplay = (element) => {

        // Add CSS classes with invalid styles
        document.getElementById(element.label).classList.add('labelInvalid');
        document.getElementById(element.id).classList.add('inputInvalid');

    };

    const removeErrorDisplay = (element) => {

        // Remove CSS classes with invalid styles
        document.getElementById(element.label).classList.remove('labelInvalid');
        document.getElementById(element.id).classList.remove('inputInvalid');

    };

    const updateErrorMessage = (element) => {

        // Shows error messages
        document.getElementById(element.id).nextElementSibling.classList.remove('d-none');

            // If field is missing
        if (document.getElementById(element.id).value.trim() === '') {

            document.getElementById(element.id).nextElementSibling.textContent = element.errorMessages.missingField;

            // If entry is not a number
        } else if (isNaN(document.getElementById(element.id).value.trim())) {

            document.getElementById(element.id).nextElementSibling.textContent = element.errorMessages.invalidEntry;

            // If the day is under 1 or over 31
        } else if (element.id === 'dayInput' && (document.getElementById(element.id).value.trim() < 1 || document.getElementById(element.id).value.trim() > 31)) {

            document.getElementById(element.id).nextElementSibling.textContent = element.errorMessages.invalidEntry;

            // If the month is under 1 or over 12
        } else if (element.id === 'monthInput' && (document.getElementById(element.id).value.trim() < 1 || document.getElementById(element.id).value.trim() > 12)) {

            document.getElementById(element.id).nextElementSibling.textContent = element.errorMessages.invalidEntry;

            // If the year value is over the current year
        } else if (element.id === 'yearInput' && document.getElementById(element.id).value.trim() > currentYear) {

            document.getElementById(element.id).nextElementSibling.textContent = element.errorMessages.invalidEntry2;

            // If all the fields are valid but the whole date is wrong (ex: leap year)
        } else if (false === validateBirthdayDate()) {

            document.getElementById('dayInput').nextElementSibling.textContent = 'Must be a valid date';

        };

    };

    const removeErrorMessage = (element) => {

        // Removes error messages
        document.getElementById(element.id).nextElementSibling.classList.add('d-none');
        document.getElementById(element.id).nextElementSibling.textContent = '';

    };

        // ********** AGE CALCULATION **********

    const calcUserAge = () => {

        // Targets values
        const dayInput = document.getElementById('dayInput').value.trim();
        const monthInput = document.getElementById('monthInput').value.trim();
        const yearInput = document.getElementById('yearInput').value.trim();
    
        // Targets the whole birthday date
        const birthday = new Date(yearInput, monthInput - 1, dayInput);
    
        // Calculates the age in years, months and days
        let years = today.getFullYear() - birthday.getFullYear();
        let months = today.getMonth() - birthday.getMonth();
        let days = today.getDate() - birthday.getDate();
    
        // Handle cases where month or day of birth is later than current date
        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }
    
        if (days < 0) {
            const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, birthday.getDate());
            days = Math.floor((today - lastMonth) / (1000 * 60 * 60 * 24));
            months--;
    
            if (months < 0) {
                years--;
                months += 12;
            }
        }

        showUserAge(years, months, days);
        
    };

    const showUserAge = (years, months, days) => {

        // Targets the user display elements
        const userYears = document.getElementById('userYears');
        const userMonths = document.getElementById('userMonths');
        const userDays = document.getElementById('userDays');

        // Updates display
        userYears.textContent = years;
        userMonths.textContent = months;
        userDays.textContent = days;

    }

        // ********** FORM SUBMISSION **********

    form.addEventListener('submit', (event) => {

        event.preventDefault();

    })

    document.getElementById('submitButton').addEventListener('click', event => {

        if (!canSubmit) {

            formElements.forEach(element => {

                addErrorDisplay(element);
                updateErrorMessage(element);

            });

        } else {

            calcUserAge();

        }

    });

});