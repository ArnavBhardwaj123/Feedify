// Import necessary functions from data.js
import { getAllDonations, addDonation, updateDonation } from './data.js';

// Common app functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('Feedify application initialized');
    
    // Add some sample data if the app is empty
    const donations = getAllDonations();
    
    if (donations.length === 0) {
        // Add sample donations
        addDonation({
            title: 'Fresh Sandwiches',
            quantity: '15',
            description: 'Assorted vegetarian sandwiches, freshly made this morning.',
            expiryTime: new Date(Date.now() + 8 * 3600 * 1000).toISOString(), // 8 hours from now
            location: '123 Main St, Downtown',
            donorId: 'donor-123'
        });
        
        addDonation({
            title: 'Rice & Curry',
            quantity: '20',
            description: 'Vegetable curry with steamed rice. Contains dairy.',
            expiryTime: new Date(Date.now() + 6 * 3600 * 1000).toISOString(), // 6 hours from now
            location: '456 Oak Ave, Midtown',
            donorId: 'donor-124'
        });
        
        // Add a claimed donation
        const thirdDonation = addDonation({
            title: 'Pasta with Tomato Sauce',
            quantity: '10',
            description: 'Penne pasta with homemade tomato sauce. Vegan friendly.',
            expiryTime: new Date(Date.now() + 12 * 3600 * 1000).toISOString(), // 12 hours from now
            location: '789 Pine St, Uptown',
            donorId: 'donor-123'
        });
        
        // Update to claimed status
        updateDonation(thirdDonation.id, {
            status: 'claimed',
            volunteerId: 'volunteer-456',
            claimedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString() // 2 hours ago
        });
        
        // Add a distributed donation
        const fourthDonation = addDonation({
            title: 'Bread and Pastries',
            quantity: '25',
            description: 'Assorted bread and pastries from our bakery.',
            expiryTime: new Date(Date.now() + 24 * 3600 * 1000).toISOString(), // 24 hours from now
            location: '101 Elm St, Downtown',
            donorId: 'donor-124'
        });
        
        // Update to distributed status
        updateDonation(fourthDonation.id, {
            status: 'claimed',
            volunteerId: 'volunteer-457',
            claimedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString() // 5 hours ago
        });
        
        updateDonation(fourthDonation.id, {
            status: 'collected',
            updatedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString() // 4 hours ago
        });
        
        updateDonation(fourthDonation.id, {
            status: 'distributed',
            updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString() // 2 hours ago
        });
    }
});