// Retire ou ajoute une ligne de séparation selon la largeur de l'écran

$line = document.getElementById('line');

function resizeSubmitArea() {

    if (window.innerWidth > 900) {
        line.classList.add('d-none');
    } else {
        line.classList.remove('d-none');
    }
}

resizeSubmitArea();
window.addEventListener('resize', resizeSubmitArea);

// Réajuste la taille et l'épaisseur de l'icone du bouton de soumission selon la largeur de l'écran

$submitButtonIcon = document.getElementById('arrowDownIcon');
$submitButtonIconPaths = document.querySelectorAll('#arrowDownIcon path');

function resizeSubmitButtonIcon() {
    if (window.innerWidth > 900) {
        $submitButtonIcon.setAttribute('width', '44');
        $submitButtonIcon.setAttribute('height', '44');
        $submitButtonIconPaths.forEach(path => {
            path.setAttribute('stroke-width', '1');
        });
    } else {
        $submitButtonIcon.setAttribute('width', '24');
        $submitButtonIcon.setAttribute('height', '24');
        $submitButtonIconPaths.forEach(path => {
            path.setAttribute('stroke-width', '2');
        });
    }
}

resizeSubmitButtonIcon();
window.addEventListener('resize', resizeSubmitButtonIcon);