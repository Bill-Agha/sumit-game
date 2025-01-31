// Game variables
let day = 1;
let registrations = 0;
let budget = 1200; // Increased budget to $2000
let R = 0; // Initial reach starts at 0
let Cr = 0.05; // Conversion rate
let S = 0.20; // Sharing rate
let Cs = 0.10; // Conversion rate from shares
let n = 2; // Sharing cycles per day



// Chart setup
const ctx = document.getElementById('registrationsChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
        datasets: [
            {
                label: 'Registrations',
                data: [],
                borderColor: '#28a745',
                fill: false,
            },
            {
                label: 'Reach',
                data: [],
                borderColor: '#007bff',
                fill: false,
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }
});

// Function to calculate new registrations based on increase in reach
function calculateNewRegistrations(increaseInReach) {
    return increaseInReach * Cr * (1 + S * Cs) ** (n * day);
}

// Function to add a detailed notification
function addNotification(title, details) {
    const notifications = document.getElementById('notifications');
    const notification = document.createElement('div');
    notification.className = 'notification';

    const notificationTitle = document.createElement('h3');
    notificationTitle.textContent = title;
    notification.appendChild(notificationTitle);

    details.forEach(detail => {
        const paragraph = document.createElement('p');
        paragraph.textContent = detail;
        notification.appendChild(paragraph);
    });

    notifications.appendChild(notification);

    // Scroll to the bottom of the notification section
    notifications.scrollTop = notifications.scrollHeight;
}

// Function to update the game state
function updateGame() {
    document.getElementById('registrations').textContent = Math.floor(registrations);
    document.getElementById('day').textContent = day;
    document.getElementById('budget').textContent = budget;

    // Update chart
    chart.data.datasets[0].data.push(Math.floor(registrations)); // Registrations
    chart.data.datasets[1].data.push(R); // Reach
    chart.update();

    // Check for random events
    if (Math.random() < 0.2) { // 20% chance of a random event
        triggerRandomEvent();
    }

    // End game after 7 days
    if (day >= 7) {
        endGame();
    } else {
        day++;
    }
}

// Function to run a campaign
function runCampaign(type) {
    if (budget <= 0) {
        alert("Out of budget!");
        return;
    }

    let title = "";
    let details = [];
    let increaseInReach = 0;

    switch (type) {
        case 'social':
            if (budget >= 100) { // Reduced cost to $100
                S += 0.05;
                Cr += 0.005;
                budget -= 100;
                title = "Social Media Campaign Run";
                details = [
                    `Sharing Rate increased by 5% (New Sharing Rate: ${(S * 100).toFixed(2)}%).`,
                    `Conversion Rate increased by 0.5% (New Conversion Rate: ${(Cr * 100).toFixed(2)}%).`,
                    `Budget decreased by $100 (New Budget: $${budget}).`,
                    `No increase in reach, so no new registrations from this campaign.`
                ];
            }
            break;
        case 'school':
            if (budget >= 200) { // Reduced cost to $200
                increaseInReach = 1000;
                R += increaseInReach;
                Cr += 0.01;
                budget -= 200;
                title = "School Partnerships Campaign Run";
                details = [
                    `Reach increased by 1000 (New Reach: ${R}).`,
                    `Conversion Rate increased by 1% (New Conversion Rate: ${(Cr * 100).toFixed(2)}%).`,
                    `Budget decreased by $200 (New Budget: $${budget}).`,
                    `New Registrations calculated as: Increase in Reach (${increaseInReach}) * Cr (${Cr}) * (1 + S (${S}) * Cs (${Cs}))^(${n} * ${day}) = ${Math.floor(calculateNewRegistrations(increaseInReach))}.`
                ];
            }
            break;
        case 'media':
            if (budget >= 150) { // Reduced cost to $150
                increaseInReach = 500;
                R += increaseInReach;
                Cr += 0.015;
                budget -= 150;
                title = "Traditional Media Engagement Campaign Run";
                details = [
                    `Reach increased by 500 (New Reach: ${R}).`,
                    `Conversion Rate increased by 1.5% (New Conversion Rate: ${(Cr * 100).toFixed(2)}%).`,
                    `Budget decreased by $150 (New Budget: $${budget}).`,
                    `New Registrations calculated as: Increase in Reach (${increaseInReach}) * Cr (${Cr}) * (1 + S (${S}) * Cs (${Cs}))^(${n} * ${day}) = ${Math.floor(calculateNewRegistrations(increaseInReach))}.`
                ];
            }
            break;
        case 'community':
            if (budget >= 100) { // Reduced cost to $100
                increaseInReach = 750;
                R += increaseInReach;
                S += 0.03;
                budget -= 100;
                title = "Community Outreach Campaign Run";
                details = [
                    `Reach increased by 750 (New Reach: ${R}).`,
                    `Sharing Rate increased by 3% (New Sharing Rate: ${(S * 100).toFixed(2)}%).`,
                    `Budget decreased by $100 (New Budget: $${budget}).`,
                    `New Registrations calculated as: Increase in Reach (${increaseInReach}) * Cr (${Cr}) * (1 + S (${S}) * Cs (${Cs}))^(${n} * ${day}) = ${Math.floor(calculateNewRegistrations(increaseInReach))}.`
                ];
            }
            break;
        case 'hackathon':
            if (budget >= 300) { // Reduced cost to $300
                increaseInReach = 1500;
                R += increaseInReach;
                Cr += 0.02;
                S += 0.07;
                budget -= 300;
                title = "Hackathon Campaign Run";
                details = [
                    `Reach increased by 1500 (New Reach: ${R}).`,
                    `Conversion Rate increased by 2% (New Conversion Rate: ${(Cr * 100).toFixed(2)}%).`,
                    `Sharing Rate increased by 7% (New Sharing Rate: ${(S * 100).toFixed(2)}%).`,
                    `Budget decreased by $300 (New Budget: $${budget}).`,
                    `New Registrations calculated as: Increase in Reach (${increaseInReach}) * Cr (${Cr}) * (1 + S (${S}) * Cs (${Cs}))^(${n} * ${day}) = ${Math.floor(calculateNewRegistrations(increaseInReach))}.`
                ];
            }
            break;
    }

    if (title) {
        if (increaseInReach > 0) {
            const newRegistrations = calculateNewRegistrations(increaseInReach);
            registrations += newRegistrations;
        }
        addNotification(title, details);
        updateGame();
    } else {
        alert("Not enough budget for this campaign!");
    }
}

// Function to trigger random events
function triggerRandomEvent() {
    const events = [
        { 
            title: "Viral Post!", 
            details: [
                "A viral post increases sharing rate by 10% for one day!",
                `Sharing Rate increased by 10% (New Sharing Rate: ${(S * 100).toFixed(2)}%).`
            ],
            effect: () => S += 0.10 
        },
        { 
            title: "Technical Issue!", 
            details: [
                "A technical issue decreases conversion rate by 2% for one day.",
                `Conversion Rate decreased by 2% (New Conversion Rate: ${(Cr * 100).toFixed(2)}%).`
            ],
            effect: () => Cr -= 0.02 
        },
    ];

    const event = events[Math.floor(Math.random() * events.length)];
    event.effect();

    // Add event notification
    addNotification(event.title, event.details);
}

// Function to end the game
function endGame() {
    if (registrations >= 1000) {
        alert("Congratulations! You reached the goal of 1000 registrations!");
    } else {
        alert("You did not reach the goal. Better luck next time!");
    }
}

// Initialize the game
updateGame();