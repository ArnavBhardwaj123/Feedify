// Notification handling

// Show notification
function showNotification(title, message, icon = 'check') {
    const notification = document.getElementById('notification');
    const notificationTitle = document.getElementById('notificationTitle');
    const notificationMessage = document.getElementById('notificationMessage');
    const notificationIcon = notification.querySelector('.notification-icon i');
    
    // Set content
    notificationTitle.textContent = title;
    notificationMessage.textContent = message;
    
    // Set icon
    notificationIcon.className = `fas fa-${icon}`;
    
    // Show notification
    notification.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

// Hide notification
function hideNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('show');
}

// Setup close button
document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.getElementById('closeNotification');
    if (closeButton) {
        closeButton.addEventListener('click', hideNotification);
    }
});