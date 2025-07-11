// API
const API_ENDPOINT = 'https://yesno.wtf/api';

/**
 * STEPS:
 *
 * 1. Create a fetchAnswer function and call the API
 * 2. Output the API's response
 * 3. Attach fetchAnswer to an event listener
 * 4. Clear output after 3 seconds
 * 5. Optional: add loading/error states
 *
 */


const input = document.getElementById('input');
const button = document.getElementById('button');
const answer = document.getElementById('answer');
const error = document.getElementById('error');

// Permitir usar Enter
function handleKeyEnter(event) {
    if (event.key === 'Enter') {
        validateAndFetch();
    }
}

// Al hacer clic en el botón
button.addEventListener('click', () => {
    validateAndFetch();
});

// Validar que haya pregunta
function validateAndFetch() {
    const question = input.value.trim();
    error.textContent = '';
    answer.textContent = '';

    if (!question) {
        error.textContent = 'Please enter a question.';
        return;
    }

    fetchAnswer();
}

// Pedir respuesta a la API
function fetchAnswer() {
    answer.textContent = 'Loading...';

    fetch(API_ENDPOINT)
        .then(response => response.json())
        .then(data => {
            answer.textContent = data.answer.toUpperCase(); // YES / NO / MAYBE

            // Borrar respuesta tras 3 segundos
            setTimeout(() => {
                answer.textContent = '';
                input.value = '';
            }, 3000);
        })
        .catch(() => {
            answer.textContent = '';
            error.textContent = 'Something went wrong. Try again.';
        });
}
