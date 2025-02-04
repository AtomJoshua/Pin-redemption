document.getElementById('pin-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from reloading
    document.querySelector('#pin-form button').focus(); // Set focus on button
    validatePIN(); // Call your PIN validation function
});

function validatePIN() {
    const pinInput = document.getElementById('pin-input');
    const pinValue = pinInput.value.trim();
    const messageDiv = document.getElementById('message');
    const button = document.querySelector('#pin-form button');

    // Clear previous messages
    messageDiv.textContent = '';
    messageDiv.className = '';

    // Reset button color
    button.classList.remove('correct', 'incorrect');

    if (pinValue === '') {
        displayMessage('Please enter a PIN.', 'error');
        button.classList.add('incorrect'); // Make button blue when input is empty
        return;
    }

    fetch('pins.json')
        .then(response => response.json())
        .then(data => {
            if (data.pins.includes(pinValue)) {
                displayMessage('PIN is valid!', 'success');
                button.classList.add('correct'); // Make button green for correct PIN
            } else {
                displayMessage('Invalid PIN. Please try again.', 'error');
                button.classList.add('incorrect'); // Make button blue for incorrect PIN
            }
        })
        .catch(() => {
            displayMessage('Error loading PIN data.', 'error');
            button.classList.add('incorrect'); // Make button blue if error occurs
        });
}

function displayMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = type;
}
