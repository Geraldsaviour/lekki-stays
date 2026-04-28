// Check if already logged in
checkAuth();

async function checkAuth() {
    try {
        const response = await fetch('/api/auth/me', {
            credentials: 'include'
        });

        if (response.ok) {
            // Already logged in, redirect to dashboard
            window.location.href = '/dashboard';
        }
    } catch (error) {
        // Not logged in, stay on login page
    }
}

// Login form handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoader = loginBtn.querySelector('.btn-loader');
    const formMessage = document.getElementById('formMessage');

    // Clear previous errors
    document.getElementById('emailError').classList.remove('show');
    document.getElementById('passwordError').classList.remove('show');
    formMessage.classList.remove('show', 'error', 'success');

    // Validate
    if (!email) {
        showError('emailError', 'Email is required');
        return;
    }

    if (!password) {
        showError('passwordError', 'Password is required');
        return;
    }

    // Show loading
    loginBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Success
            formMessage.textContent = 'Login successful! Redirecting...';
            formMessage.classList.add('show', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        } else {
            // Error
            formMessage.textContent = data.error || 'Login failed. Please try again.';
            formMessage.classList.add('show', 'error');
            
            // Reset button
            loginBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
        }
    } catch (error) {
        console.error('Login error:', error);
        formMessage.textContent = 'Network error. Please check your connection.';
        formMessage.classList.add('show', 'error');
        
        // Reset button
        loginBtn.disabled = false;
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}
