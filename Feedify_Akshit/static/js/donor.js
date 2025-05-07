// Donor page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const donationForm = document.getElementById('donationForm');
    const submitBtn = document.getElementById('submitBtn');
    const myDonationsList = document.getElementById('myDonationsList');
    
    // Load existing donations
    loadMyDonations();
    
    // Form submission
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            showNotification('Missing information', 'Please fill in all required fields', 'exclamation-circle');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = {
            title: document.getElementById('title').value,
            quantity: document.getElementById('quantity').value,
            description: document.getElementById('description').value,
            expiryTime: document.getElementById('expiryTime').value,
            location: document.getElementById('location').value,
            donorId: 'donor-123', // In a real app, this would be the logged-in user's ID
        };
        
        // Simulate API call
        setTimeout(() => {
            // Add donation to localStorage
            const newDonation = addDonation(formData);
            
            // Reset form
            donationForm.reset();
            
            // Reset button
            submitBtn.innerHTML = '<i class="fas fa-upload"></i> Post Food Donation';
            submitBtn.disabled = false;
            
            // Show success notification
            showNotification('Donation posted successfully!', 'NGO volunteers in your area will be notified.', 'check');
            
            // Reload donations list
            loadMyDonations();
        }, 1500);
    });
    
    // Form validation
    function validateForm() {
        const title = document.getElementById('title').value;
        const quantity = document.getElementById('quantity').value;
        const expiryTime = document.getElementById('expiryTime').value;
        const location = document.getElementById('location').value;
        
        return title && quantity && expiryTime && location;
    }
    
    // Load my donations
    function loadMyDonations() {
        const donations = getAllDonations().filter(d => d.donorId === 'donor-123');
        
        if (donations.length === 0) {
            myDonationsList.innerHTML = '<p class="empty-state">Your past donations will appear here.</p>';
            return;
        }
        
        let html = '';
        
        donations.forEach(donation => {
            html += `
                <div class="donation-item">
                    <div class="donation-header">
                        <div class="donation-title">${donation.title}</div>
                        <span class="badge badge-${donation.status}">${donation.status}</span>
                    </div>
                    <div class="donation-details">
                        <div class="donation-detail">
                            <i class="fas fa-utensils"></i> ${donation.quantity} servings
                        </div>
                        <div class="donation-detail">
                            <i class="fas fa-clock"></i> Best before: ${formatDate(donation.expiryTime)}
                        </div>
                        <div class="donation-detail">
                            <i class="fas fa-map-marker-alt"></i> ${donation.location}
                        </div>
                    </div>
                    <div class="donation-footer">
                        <div class="donation-time">Posted: ${formatDate(donation.createdAt)}</div>
                    </div>
                </div>
            `;
        });
        
        myDonationsList.innerHTML = html;
    }

    // Mock functions for showNotification, addDonation, getAllDonations, and formatDate
    function showNotification(title, message, icon) {
        console.log(`Notification: ${title} - ${message} (${icon})`);
    }

    function addDonation(formData) {
        let donations = getAllDonations();
        const newDonation = {
            ...formData,
            id: Math.random().toString(36).substring(2, 15),
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
        donations.push(newDonation);
        localStorage.setItem('donations', JSON.stringify(donations));
        return newDonation;
    }

    function getAllDonations() {
        return JSON.parse(localStorage.getItem('donations') || '[]');
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }
});