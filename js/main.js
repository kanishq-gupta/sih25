// Main application JavaScript
let currentUser = null;
let currentRole = null;
let sidebarOpen = true;

// Mock data for demonstration
const mockData = {
    students: [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            department: "Computer Science",
            cgpa: 8.5,
            skills: ["JavaScript", "Python", "React"],
            applications: 5,
            offers: 2
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            department: "Electronics",
            cgpa: 9.2,
            skills: ["C++", "VLSI", "Embedded Systems"],
            applications: 3,
            offers: 1
        }
    ],
    jobs: [
        {
            id: 1,
            title: "Software Developer",
            company: "TechCorp",
            type: "Full-time",
            location: "Bangalore",
            salary: "₹12 LPA",
            deadline: "2024-02-15",
            requirements: ["JavaScript", "React", "Node.js"],
            status: "Open"
        },
        {
            id: 2,
            title: "Data Analyst",
            company: "DataTech",
            type: "Internship",
            location: "Mumbai",
            salary: "₹25,000/month",
            deadline: "2024-02-20",
            requirements: ["Python", "SQL", "Excel"],
            status: "Open"
        }
    ],
    applications: [
        {
            id: 1,
            studentId: 1,
            jobId: 1,
            status: "Under Review",
            appliedDate: "2024-01-15",
            lastUpdate: "2024-01-20"
        },
        {
            id: 2,
            studentId: 1,
            jobId: 2,
            status: "Interview Scheduled",
            appliedDate: "2024-01-10",
            lastUpdate: "2024-01-22"
        }
    ],
    notifications: [
        {
            id: 1,
            title: "New job posted",
            message: "Software Developer position at TechCorp",
            time: "2 minutes ago",
            read: false,
            icon: "fas fa-briefcase"
        },
        {
            id: 2,
            title: "Application update",
            message: "Your application status has been updated",
            time: "1 hour ago",
            read: false,
            icon: "fas fa-file-alt"
        }
    ]
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    const loginPage = document.getElementById('loginPage');
    const mainApp = document.getElementById('mainApp');
    
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('currentUser');
    const savedRole = localStorage.getItem('currentRole');
    
    if (savedUser && savedRole) {
        currentUser = JSON.parse(savedUser);
        currentRole = savedRole;
        showMainApp();
    } else {
        showLoginPage();
    }
}

function showLoginPage() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
}

function showMainApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'flex';
    
    updateUserInfo();
    loadNavigation();
    loadDefaultContent();
}

function updateUserInfo() {
    document.getElementById('userName').textContent = currentUser ? currentUser.name : 'Guest User';
    document.getElementById('userRole').textContent = currentRole ? currentRole.charAt(0).toUpperCase() + currentRole.slice(1) : 'Guest';
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
    sidebarOpen = !sidebarOpen;
}

function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('active');
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');
    currentUser = null;
    currentRole = null;
    showLoginPage();
}

// Global search functionality
document.getElementById('globalSearch').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    if (query.length > 2) {
        performGlobalSearch(query);
    }
});

function performGlobalSearch(query) {
    // Mock search implementation
    console.log('Searching for:', query);
    // In a real implementation, this would search across all relevant data
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
        notificationDropdown.classList.remove('active');
    }
});

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

function getStatusBadgeClass(status) {
    const statusClasses = {
        'Open': 'success',
        'Closed': 'danger',
        'Under Review': 'warning',
        'Interview Scheduled': 'info',
        'Offer Received': 'success',
        'Rejected': 'danger',
        'Applied': 'info'
    };
    return statusClasses[status] || 'info';
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Loading state management
function showLoading(element) {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = '<div class="loading"></div>';
    element.appendChild(loader);
}

function hideLoading(element) {
    const loader = element.querySelector('.loading-overlay');
    if (loader) {
        loader.remove();
    }
}

// Export functions for use in other modules
window.mockData = mockData;
window.currentUser = currentUser;
window.currentRole = currentRole;
window.showNotification = showNotification;
window.formatDate = formatDate;
window.formatCurrency = formatCurrency;
window.getStatusBadgeClass = getStatusBadgeClass;