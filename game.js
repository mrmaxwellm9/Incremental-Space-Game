// JavaScript code for the game logic

let distanceTraveled = 0;
let stellarPoints = 1; 
let speed = 0.01; 
let fuel = 5;
let cornAmount = 0;
let boostMultiplier = 1;

// Function to increment stellar points, distance traveled, and update UI every second
function autoIncrement() {
    setInterval(() => {
        distanceTraveled += getEffectiveSpeed();
        stellarPoints += getEffectiveSpeed();

        // Calculate fuel consumption based on boostMultiplier
        const fuelConsumptionRate = calculateFuelConsumptionRate(boostMultiplier);
        fuel -= fuelConsumptionRate;

        // Ensure fuel doesn't go below 0
        fuel = Math.max(fuel, 0);

        // Round the variables to two decimal places
        distanceTraveled = parseFloat(distanceTraveled.toFixed(2));
        stellarPoints = parseFloat(stellarPoints.toFixed(2));
        fuel = parseFloat(fuel.toFixed(2));

        if (fuel === 0) {
            disableBoostSliders();
        } else {
            enableBoostSliders();
        }
        updateUI();
    }, 1000);
}

function updateUI() {
    stellarPoints = parseFloat(stellarPoints.toFixed(2));
    distanceTraveled = parseFloat(distanceTraveled.toFixed(2));
    document.getElementById('stellar-points').innerText = `Stellar Points: ${stellarPoints}`;

    document.getElementById('distance-traveled').innerText = `Distance Traveled: ${distanceTraveled} meters`;
    if (distanceTraveled > 10) {
        document.getElementById('increase-speed-upgrade').classList.remove('disabled');
    }
    if (fuel !== 0 && distanceTraveled > 100) {
        document.getElementById('boost-slider2').disabled = false;
        document.getElementById('boost-slider-value2').classList.remove('disabled');
    }

    document.getElementById('fuel-level').innerText = `Fuel Level: ${fuel}%`;
    document.getElementById('speed').innerText = `Speed: ${getEffectiveSpeed().toFixed(2)} m/s`;
    document.querySelector('#corn-counter').innerText = `Corn Amount: ${cornAmount}`;
}

// Call the autoIncrement function to start the automatic incrementation
autoIncrement();