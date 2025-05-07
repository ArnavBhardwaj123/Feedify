// Admin page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const totalDonationsEl = document.getElementById('totalDonations');
    const totalServingsEl = document.getElementById('totalServings');
    const totalDistributedEl = document.getElementById('totalDistributed');
    const totalClaimedEl = document.getElementById('totalClaimed');
    const donationsTableBody = document.getElementById('donationsTableBody');
    const usersTableBody = document.getElementById('usersTableBody');
    
    // Mock data and functions (replace with actual data fetching)
    function calculateStats() {
        return {
            totalDonations: 100,
            totalServings: 500,
            totalDistributed: 300,
            totalClaimed: 200
        };
    }

    function getAllDonations() {
        return [
            { title: 'Pizza', quantity: 100, location: 'Restaurant A', expiryTime: new Date(), status: 'available' },
            { title: 'Pasta', quantity: 50, location: 'Restaurant B', expiryTime: new Date(), status: 'distributed' }
        ];
    }

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    function getAllUsers() {
        return [
            { name: 'John Doe', role: 'donor', donations: 5 },
            { name: 'Jane Smith', role: 'recipient', collections: 3 }
        ];
    }
    
    // Load data
    loadData();
    
    function loadData() {
        // Load stats
        const stats = calculateStats();
        totalDonationsEl.textContent = stats.totalDonations;
        totalServingsEl.textContent = stats.totalServings;
        totalDistributedEl.textContent = stats.totalDistributed;
        totalClaimedEl.textContent = stats.totalClaimed;
        
        // Load donations table
        const donations = getAllDonations();
        
        if (donations.length === 0) {
            donationsTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="empty-state">No donations available</td>
                </tr>
            `;
        } else {
            let html = '';
            
            donations.forEach(donation => {
                html += `
                    <tr>
                        <td>${donation.title}</td>
                        <td>${donation.quantity} servings</td>
                        <td>
                            <div class="donation-card-detail">
                                <i class="fas fa-map-marker-alt"></i> ${donation.location}
                            </div>
                        </td>
                        <td>
                            <div class="donation-card-detail">
                                <i class="fas fa-clock"></i> ${formatDate(donation.expiryTime)}
                            </div>
                        </td>
                        <td><span class="badge badge-${donation.status}">${donation.status}</span></td>
                    </tr>
                `;
            });
            
            donationsTableBody.innerHTML = html;
        }
        
        // Load users table
        const users = getAllUsers();
        
        let usersHtml = '';
        
        users.forEach(user => {
            usersHtml += `
                <tr>
                    <td class="font-medium">${user.name}</td>
                    <td><span class="badge badge-${user.role === 'donor' ? 'available' : 'collected'}">${user.role}</span></td>
                    <td>${user.role === 'donor' ? `${user.donations} donations` : `${user.collections} collections`}</td>
                </tr>
            `;
        });
        
        usersTableBody.innerHTML = usersHtml;
    }
});