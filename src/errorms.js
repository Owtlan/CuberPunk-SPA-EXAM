export function showError(message) {

    const errorBox = document.getElementById('errorBox');
    const errorMessage = errorBox.querySelector('.msg');

    errorMessage.textContent = message;
    errorBox.style.display = 'block';

    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 3000); // Hide the error message after 3 seconds

}