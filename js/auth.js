// Authentication JavaScript
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    if (authenticateUser(email, password, role)) {
        showNotification('Login successful!', 'success');
        setTimeout(() => {
            showMainApp();
        }, 1000);
    } else {
        showNotification('Invalid credentials. Please try again.', 'error');
    }
});

function authenticateUser(email, password, role) {
    // Mock authentication - in real implementation, this would call an API
    const mockUsers = {
        'student@demo.com': { 
            password: 'demo123', 
            role: 'student', 
            name: 'John Doe',
            id: 1,
            department: 'Computer Science',
            year: '4th Year'
        },
        'admin@demo.com': { 
            password: 'demo123', 
            role: 'admin', 
            name: 'Admin User',
            id: 2,
            department: 'Administration'
        },
        'mentor@demo.com': { 
            password: 'demo123', 
            role: 'mentor', 
            name: 'Dr. Sarah Wilson',
            id: 3,
            department: 'Faculty'
        },
        'recruiter@demo.com': { 
            password: 'demo123', 
            role: 'recruiter', 
            name: 'Recruiter Name',
            id: 4,
            company: 'TechCorp Inc.'
        }
    };
    
    const user = mockUsers[email];
    if (user && user.password === password && user.role === role) {
        currentUser = user;
        currentRole = role;
        
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('currentRole', role);
        
        return true;
    }
    
    return false;
}

function quickLogin(role) {
    const credentials = {
        'student': { email: 'student@demo.com', password: 'demo123' },
        'admin': { email: 'admin@demo.com', password: 'demo123' },
        'mentor': { email: 'mentor@demo.com', password: 'demo123' },
        'recruiter': { email: 'recruiter@demo.com', password: 'demo123' }
    };
    
    const cred = credentials[role];
    if (cred) {
        document.getElementById('email').value = cred.email;
        document.getElementById('password').value = cred.password;
        document.getElementById('role').value = role;
        
        if (authenticateUser(cred.email, cred.password, role)) {
            showNotification(`Logged in as ${role}`, 'success');
            setTimeout(() => {
                showMainApp();
            }, 1000);
        }
    }
}

// Password reset functionality (mock)
function resetPassword(email) {
    showNotification('Password reset link sent to your email!', 'info');
}

// Registration functionality (mock)
function registerUser(userData) {
    // Mock registration
    showNotification('Registration successful! Please check your email for verification.', 'success');
}

// Session management
function checkSession() {
    const savedUser = localStorage.getItem('currentUser');
    const savedRole = localStorage.getItem('currentRole');
    
    if (savedUser && savedRole) {
        currentUser = JSON.parse(savedUser);
        currentRole = savedRole;
        return true;
    }
    return false;
}

function clearSession() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');
    currentUser = null;
    currentRole = null;
}

// Auto logout after inactivity
let activityTimer;
const INACTIVITY_TIME = 30 * 60 * 1000; // 30 minutes

function resetActivityTimer() {
    clearTimeout(activityTimer);
    activityTimer = setTimeout(() => {
        showNotification('Session expired due to inactivity', 'warning');
        setTimeout(logout, 2000);
    }, INACTIVITY_TIME);
}

// Track user activity
document.addEventListener('mousedown', resetActivityTimer);
document.addEventListener('mousemove', resetActivityTimer);
document.addEventListener('keypress', resetActivityTimer);
document.addEventListener('scroll', resetActivityTimer);
document.addEventListener('touchstart', resetActivityTimer);

// Initialize activity timer
resetActivityTimer();