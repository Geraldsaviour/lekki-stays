// Firebase Authentication
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { firebaseConfig } from '../firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check if already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Already logged in, redirect to dashboard
        window.location.href = 'dashboard.html';
    }
});

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
        await signInWithEmailAndPassword(auth, email, password);
        
        // Success
        formMessage.textContent = 'Login successful! Redirecting...';
        formMessage.classList.add('show', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } catch (error) {
        console.error('Login error:', error);
        
        let message = 'Login failed. Please try again.';
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
            message = 'Invalid email or password.';
        } else if (error.code === 'auth/user-not-found') {
            message = 'No account found with this email.';
        } else if (error.code === 'auth/too-many-requests') {
            message = 'Too many failed attempts. Please try again later.';
        } else if (error.code === 'auth/network-request-failed') {
            message = 'Network error. Please check your connection.';
        }
        
        formMessage.textContent = message;
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
