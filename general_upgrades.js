let increaseSpeedCost = 0.1;
let amountSpeedIncreased = 0;
let increaseSpeedUpgradeCost = 1;
let upgradeCost = 10;

// Function to handle the speed upgrade
function handleIncreaseSpeed() {
    if (stellarPoints >= increaseSpeedCost) {
        stellarPoints -= increaseSpeedCost;
        speed += 0.01;
        amountSpeedIncreased += 1;
        increaseSpeedCost = Math.ceil(increaseSpeedCost * 2);
        
        // Round the speed to two decimal places
        speed = parseFloat(speed.toFixed(2));

        document.getElementById('speed').innerText = `Speed: ${speed} m/s`;
        document.getElementById('increase-speed-btn').innerText = `Increase Base Speed (Cost: ${increaseSpeedCost} SP)`;
        updateUI();
    } else {
        alert("Not enough Stellar Points to double speed!");
    }
}

// Function to handle the speed upgrade upgrade
function handleIncreaseSpeedUpgrade() {
    if (stellarPoints >= increaseSpeedUpgradeCost) {
        stellarPoints -= increaseSpeedUpgradeCost;
        speed += amountSpeedIncreased * 0.01;
        increaseSpeedUpgradeCost = Math.ceil(increaseSpeedUpgradeCost * 2);
        
        // Round the speed to two decimal places
        speed = parseFloat(speed.toFixed(2));

        document.getElementById('speed').innerText = `Speed: ${speed} m/s`;
        document.getElementById('increase-speed-upgrade').innerText = `Increase Base Speed Upgrade 2 (Cost: ${increaseSpeedUpgradeCost} SP)`;
        updateUI();
    } else {
        alert("Not enough Stellar Points to double speed!");
    }
}

document.getElementById('increase-speed-btn').addEventListener('click', handleIncreaseSpeed);
document.getElementById('increase-speed-upgrade').addEventListener('click', handleIncreaseSpeedUpgrade);

document.getElementById('increase-speed-upgrade').classList.add('disabled');

for (let i = 3; i <= 8; i++) {
    document.getElementById(`upgrade${i}-btn`).classList.add('disabled');
}