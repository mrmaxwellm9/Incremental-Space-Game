let sliderValues = [0, 0, 0, 0, 0, 0, 0]

// Function to disable boost sliders and set them to 0%
function disableBoostSliders() {
    for (let i = 1; i <= 6; i++) {
        const boostSlider = document.getElementById(`boost-slider${i}`);
        const boostValue = document.getElementById(`boost-slider-value${i}`);
        
        boostSlider.value = 0;
        boostValue.innerText = `0%`;
        boostSlider.disabled = true;
        boostValue.classList.add('disabled');
        console.log(boostSlider);
        console.log(boostValue);
        handleBoostSlider(i);
    }
}

// Function to enable boost sliders
function enableBoostSliders() {
    const boostSlider = document.getElementById(`boost-slider1`);
    const boostValue = document.getElementById(`boost-slider-value1`);
    boostValue.classList.remove('disabled');
    boostSlider.disabled = false;
}

// Function to calculate the effective speed, considering the boost
function getEffectiveSpeed() {
    return speed * boostMultiplier;
}

// Function to calculate the fuel consumption rate based on the boost percentage
function calculateFuelConsumptionRate(boostPercentage) {
    // Define the maximum fuel consumption rate
    const maxFuelConsumptionRate = 0.1;

    // Calculate fuel consumption rate based on boostPercentage
    const fuelConsumptionRate = maxFuelConsumptionRate * (boostPercentage - 1) / 2;
    return fuelConsumptionRate;
}
// Set up event listeners for boost sliders
for (let i = 1; i <= 6; i++) {
    document.getElementById(`boost-slider${i}`).addEventListener('input', () => handleBoostSlider(i));
}

// Function to handle boost slider updates
function handleBoostSlider(upgradeNumber) {
    // Get the slider value
    let sliderValue = document.getElementById(`boost-slider${upgradeNumber}`).value;

    // Display the slider value with the percent sign
    document.getElementById(`boost-slider-value${upgradeNumber}`).innerText = `${sliderValue}%`;

    // Update boostMultiplier based on the slider value
    boostMultiplier = boostMultiplier + sliderValue / 100 - sliderValues[upgradeNumber]; // Calculate the multiplier from percentage
    sliderValues[upgradeNumber] = sliderValue / 100;

    // Update speed and fuel
    updateUI();
}

for (let i = 2; i <= 6; i++) {
    const boostSlider = document.getElementById(`boost-slider${i}`);
    const boostValue = document.getElementById(`boost-slider-value${i}`);
    boostSlider.disabled = true;
    boostValue.classList.add('disabled');
}

// Initialize UI with default values
updateUI();