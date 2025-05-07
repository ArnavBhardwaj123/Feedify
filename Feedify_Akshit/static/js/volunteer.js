// Volunteer page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const availableDonations = document.getElementById('availableDonations');
    const claimedDonations = document.getElementById('claimedDonations');
    
    // Load donations
    loadDonations();
    
    // Simulate a new donation notification after 5 seconds
    setTimeout(() => {
        const available = getDonationsByStatus('available');
        if (available.length > 0) {
            showNotification(
                'New Food Donation Available!',
                `${available[0].title} is available for pickup nearby.`,
                'bell'
            );
        }
    }, 5000);
    
    // Load donations
    function loadDonations() {
        // Load available donations
        const available = getDonationsByStatus('available');
        
        if (available.length === 0) {
            availableDonations.innerHTML = '<p class="empty-state">No available donations at the moment. Check back later!</p>';
        } else {
            let html = '';
            
            available.forEach(donation => {
                html += createDonationCard(donation, true);
            });
            
            availableDonations.innerHTML = html;
            
            // Add event listeners to claim buttons
            document.querySelectorAll('.claim-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const donationId = this.getAttribute('data-id');
                    claimDonation(donationId);
                });
            });
        }
        
        // Load claimed donations
        const claimed = getDonationsByVolunteer('volunteer-456');
        
        if (claimed.length === 0) {
            claimedDonations.innerHTML = '<p class="empty-state">You haven\'t claimed any donations yet.</p>';
        } else {
            let html = '';
            
            claimed.forEach(donation => {
                html += createDonationCard(donation, false);
            });
            
            claimedDonations.innerHTML = html;
            
            // Add event listeners to status update buttons
            document.querySelectorAll('.collect-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const donationId = this.getAttribute('data-id');
                    updateDonationStatus(donationId, 'collected');
                });
            });
            
            document.querySelectorAll('.distribute-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const donationId = this.getAttribute('data-id');
                    updateDonationStatus(donationId, 'distributed');
                });
            });
        }
    }
    
    // Create donation card HTML
    function createDonationCard(donation, isAvailable) {
        let actionsHtml = '';
        
        if (isAvailable) {
            actionsHtml = `<button class="btn btn-primary btn-sm claim-btn" data-id="${donation.id}">Claim</button>`;
        } else {
            if (donation.status === 'claimed') {
                actionsHtml = `<button class="btn btn-primary btn-sm collect-btn" data-id="${donation.id}">Mark Collected</button>`;
            } else if (donation.status === 'collected') {
                actionsHtml = `<button class="btn btn-primary btn-sm distribute-btn" data-id="${donation.id}">Mark Distributed</button>`;
            }
        }
        
        return `
            <div class="donation-card">
                <div class="donation-card-header">
                    <div class="donation-card-title">
                        ${donation.title}
                        ${!isAvailable ? `<span class="badge badge-${donation.status}">${donation.status}</span>` : ''}
                    </div>
                    <div class="donation-card-actions">
                        ${actionsHtml}
                    </div>
                </div>
                <div class="donation-card-description">
                    ${donation.description || 'No description provided'}
                </div>
                <div class="donation-card-details">
                    <div class="donation-card-detail">
                        <i class="fas fa-clock"></i> Best before: ${formatDate(donation.expiryTime)}
                    </div>
                    <div class="donation-card-detail">
                        <i class="fas fa-map-marker-alt"></i> ${donation.location}
                    </div>
                </div>
                <div class="donation-card-badges">
                    <span class="badge badge-available">${donation.quantity} servings</span>
                </div>
            </div>
        `;
    }
    
    // Claim donation
    function claimDonation(id) {
        // Update donation status in localStorage
        updateDonation(id, {
            status: 'claimed',
            volunteerId: 'volunteer-456', // In a real app, this would be the logged-in user's ID
            claimedAt: new Date().toISOString()
        });
        
        // Show success message
        showNotification(
            'Donation claimed successfully!',
            'You can now proceed to pick up the food.',
            'check'
        );
        
        // Reload donations
        loadDonations();
    }
    
    // Update donation status
    function updateDonationStatus(id, newStatus) {
        // Update donation status in localStorage
        updateDonation(id, {
            status: newStatus
        });
        
        // Show success message
        showNotification(
            `Status updated to ${newStatus}!`,
            newStatus === 'collected'
                ? 'Great! Now you can distribute the food to those in need.'
                : 'Thank you for helping reduce food waste and feeding the hungry!',
            'check'
        );
        
        // Reload donations
        loadDonations();
    }
});