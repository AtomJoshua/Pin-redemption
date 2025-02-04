document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pin-form');
    const pinInput = document.getElementById('pin-input');
    const messageDiv = document.getElementById('message');

    // Load valid PINs from pins.json
    fetch('pins.json')
        .then(response => response.json())
        .then(data => {
            const validPins = data.pins;

            // Form submission handler
            form.addEventListener('submit', (e) => {
                e.preventDefault(); // Prevent form from reloading the page

                const enteredPin = pinInput.value.trim();
                messageDiv.className = ''; // Reset previous message styles

                // Error handling for empty input
                if (enteredPin === '') {
                    showMessage('Please enter a PIN.', 'error');
                    return;
                }

                // Check if the PIN is valid
                if (validPins.includes(enteredPin)) {
                    showMessage('PIN is valid!', 'success');
                } else {
                    showMessage('Invalid PIN. Please try again.', 'error');
                }

                pinInput.value = ''; // Clear the input field after submission
            });

            // Function to display messages
            function showMessage(message, type) {
                messageDiv.textContent = message;
                messageDiv.classList.add(type); // Add either 'success' or 'error' class
            }
        })
        .catch(error => {
            console.error('Error loading PIN data:', error);
            showMessage('Error loading PIN data.', 'error');
        });
});
