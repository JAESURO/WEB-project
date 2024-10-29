document.addEventListener('DOMContentLoaded', function () {
    // Check login when load into page
    checkLoginStatus();
    loadContactData();

    document.querySelector('button[type="submit"]').addEventListener("click", function (e) {
        e.preventDefault();
        saveContactData();
        var modal = new bootstrap.Modal(document.getElementById('confirmModal'));
        modal.show();
    });

    document.getElementById('confirmButton').addEventListener("click", function () {
        alert("Form Sent!");
        // To prevent double alert
        var modal = bootstrap.Modal.getInstance(document.getElementById('confirmModal')); // Get modal
        modal.hide(); // Close modal
    });
});

// Login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('loginPassword').value;

    if (username && password) {
        localStorage.setItem('username', username); // Save username
        localStorage.setItem('loginPassword', password);
        updateUI(true, username); // Update on page
    } else {
        alert("Please enter both username and password.");
    }
}

// Logout
function logout() {
    localStorage.removeItem('username'); // Remove username
    updateUI(false); // Update on page
}

// Auth status check
function checkLoginStatus() {
    const username = localStorage.getItem('username');
    if (username) {
        updateUI(true, username); // Show "Welcome" sign and show contact form
    } else {
        updateUI(false); // Show only auth form
    }
}

// Update UI depending on auth status
function updateUI(isLoggedIn, username = '') {
    const loginSection = document.getElementById('loginSection');
    const userSection = document.getElementById('userSection');
    const contactFormSection = document.getElementById('contactFormSection');
    const displayUsername = document.getElementById('displayUsername');

    if (isLoggedIn) {
        loginSection.style.display = 'none';
        userSection.style.display = 'block';
        contactFormSection.style.display = 'block';
        displayUsername.textContent = username;
    } else {
        loginSection.style.display = 'block';
        userSection.style.display = 'none';
        contactFormSection.style.display = 'none';
    }
}

// Save information in "Leave Contact"
function saveContactData() {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const gender = document.getElementById('gender').value;
    const serviceOption = document.querySelector('input[name="option"]:checked')?.value;

    // Save in local storage
    localStorage.setItem('contactEmail', email);
    localStorage.setItem('contactPhone', phone);
    localStorage.setItem('contactGender', gender);
    localStorage.setItem('contactServiceOption', serviceOption);
}

// Load from local storage
function loadContactData() {
    const email = localStorage.getItem('contactEmail');
    const phone = localStorage.getItem('contactPhone');
    const gender = localStorage.getItem('contactGender');
    const serviceOption = localStorage.getItem('contactServiceOption');

    if (email) document.getElementById('email').value = email;
    if (phone) document.getElementById('phone').value = phone;
    if (gender) document.getElementById('gender').value = gender;

    if (serviceOption) {
        const serviceRadio = document.querySelector(`input[name="option"][value="${serviceOption}"]`);
        if (serviceRadio) serviceRadio.checked = true;
    }
}