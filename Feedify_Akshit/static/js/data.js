// Data handling functions

// Initialize data in localStorage if it doesn't exist
function initializeData() {
    if (!localStorage.getItem('donations')) {
        localStorage.setItem('donations', JSON.stringify([]));
    }
}

// Get all donations from localStorage
function getAllDonations() {
    return JSON.parse(localStorage.getItem('donations') || '[]');
}

// Get donations by status
function getDonationsByStatus(status) {
    const donations = getAllDonations();
    return donations.filter(donation => donation.status === status);
}

// Get donations by volunteer ID
function getDonationsByVolunteer(volunteerId) {
    const donations = getAllDonations();
    return donations.filter(donation => donation.volunteerId === volunteerId);
}

// Add a new donation
function addDonation(donationData) {
    const donations = getAllDonations();
    
    // Create new donation with ID and timestamp
    const newDonation = {
        id: Date.now().toString(),
        ...donationData,
        status: 'available',
        createdAt: new Date().toISOString(),
    };
    
    // Add to donations array
    donations.push(newDonation);
    
    // Save back to localStorage
    localStorage.setItem('donations', JSON.stringify(donations));
    
    return newDonation;
}

// Update a donation
function updateDonation(id, updateData) {
    const donations = getAllDonations();
    
    const updatedDonations = donations.map(donation => {
        if (donation.id === id) {
            return {
                ...donation,
                ...updateData,
                updatedAt: new Date().toISOString()
            };
        }
        return donation;
    });
    
    localStorage.setItem('donations', JSON.stringify(updatedDonations));
    
    return updatedDonations.find(donation => donation.id === id);
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

// Mock users data
const mockUsers = [
    { id: 'donor-123', name: 'Restaurant A', role: 'donor', donations: 5 },
    { id: 'donor-124', name: 'Bakery B', role: 'donor', donations: 3 },
    { id: 'volunteer-456', name: 'John Volunteer', role: 'volunteer', collections: 4 },
    { id: 'volunteer-457', name: 'Sarah Helper', role: 'volunteer', collections: 2 }
];

// Get all users
function getAllUsers() {
    return mockUsers;
}

// Calculate statistics
function calculateStats() {
    const donations = getAllDonations();
    
    const totalDonations = donations.length;
    const totalServings = donations.reduce((sum, donation) => sum + Number(donation.quantity || 0), 0);
    const totalDistributed = donations.filter(d => d.status === 'distributed').length;
    const totalClaimed = donations.filter(d => d.status === 'claimed' || d.status === 'collected').length;
    
    return {
        totalDonations,
        totalServings,
        totalDistributed,
        totalClaimed
    };
}

// Initialize data when the script loads
initializeData();