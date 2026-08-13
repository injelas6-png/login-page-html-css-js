// ---------- 1. Show / Hide Password ----------
const togglePasswordBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePasswordBtn.addEventListener('click', () => {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    togglePasswordBtn.textContent = isHidden ? '🙈' : '👁️';
    togglePasswordBtn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
});


// ---------- 2. Dark Mode Toggle ----------
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Load saved preference on page load
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    const isDark = body.classList.contains('dark-mode');
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';

    // Remember the choice for next visit
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


// ---------- 3. JavaScript Form Validation ----------
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Simple email pattern check
function isValidEmail(value) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
}

function showError(input, errorEl, message) {
    input.classList.add('input-error');
    errorEl.textContent = message;
}

function clearError(input, errorEl) {
    input.classList.remove('input-error');
    errorEl.textContent = '';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate email
    if (emailInput.value.trim() === '') {
        showError(emailInput, emailError, 'Email is required.');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, emailError, 'Enter a valid email address.');
        isValid = false;
    } else {
        clearError(emailInput, emailError);
    }

    // Validate password
    if (passwordInput.value === '') {
        showError(passwordInput, passwordError, 'Password is required.');
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        showError(passwordInput, passwordError, 'Password must be at least 6 characters.');
        isValid = false;
    } else {
        clearError(passwordInput, passwordError);
    }

    if (!isValid) {
        // Small shake animation to draw attention to the form
        const container = document.querySelector('.login-container');
        container.classList.remove('shake');
        void container.offsetWidth; // restart animation
        container.classList.add('shake');
        return;
    }

    // If everything passes, this is where you'd normally send the data to a server.
   alert('Login successful!');
});

// Clear the error as soon as the user starts fixing the field
emailInput.addEventListener('input', () => clearError(emailInput, emailError));
passwordInput.addEventListener('input', () => clearError(passwordInput, passwordError));
