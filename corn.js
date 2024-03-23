
let selectedCornType = null;
let timerIntervals = {};

// Event listener for selecting a corn type
document.querySelectorAll('.corn-selection-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const parentColumn = button.parentNode;
        if (parentColumn.classList.contains('disabled')) {
            return; // Exit the event listener if the column is disabled
        }

        selectedCornType = button.dataset.plantType;
        document.querySelector('.selected-corn-type').innerText = `Selected Corn Type: ${selectedCornType}`;
    });
});


// Function to start the timer for a planted plot
function startTimer(cornPlotIndex) {
    let timerValue = 5; // 5 minutes in seconds

    timerIntervals[cornPlotIndex] = setInterval(() => {
        const minutes = Math.floor(timerValue / 60);
        const seconds = timerValue % 60;
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        document.querySelector(`.corn-plot:nth-child(${cornPlotIndex + 1}) .timer`).innerText = formattedTime;

        if (timerValue <= 0) {
            clearInterval(timerIntervals[cornPlotIndex]);
            document.querySelector(`.corn-plot:nth-child(${cornPlotIndex + 1}) .timer`).innerText = 'Ready!';
        }

        timerValue--;
    }, 1000);
}

function selectCornType(cornType) {
    selectedCornType = cornType;
    document.querySelector('.selected-corn-type').innerText = `Selected Corn Type: ${selectedCornType}`;
}


// Function to handle planting and start the timer
function plantCorn(plot) {
    // Check if a corn type is selected
    if (selectedCornType) {
        const cornPlotIndex = Array.from(plot.parentNode.children).indexOf(plot);

        // Check if the plot is ready to be planted
        if (!plot.classList.contains('planted') && !plot.classList.contains('disabled')) {
            plot.classList.add('planted');
            plot.dataset.plantType = selectedCornType; // Store the plant type in the dataset
            plot.style.backgroundColor = selectedCornType;
            startTimer(cornPlotIndex);
        } else if (plot.classList.contains('disabled')) {
            alert("This column is disabled!");
        } else {
            alert("This plot already has a plant!");
        }
    } else {
        alert("Select a corn type first!");
    }
}

function harvestCorn(plot, cornPlotIndex) {
    // Check if the plot is ready to be harvested
    const timerElement = document.querySelector(`.corn-plot:nth-child(${cornPlotIndex + 1}) .timer`);

    if (plot.classList.contains('planted') && timerElement.innerText === 'Ready!') {
        clearInterval(timerIntervals[cornPlotIndex]);
        plot.classList.remove('planted');
        plot.style.backgroundColor = ''; // Reset color
        timerElement.innerText = '0:00';
        cornAmount++;
        updateUI();
    } else if (!plot.classList.contains('planted')) {
        alert('Plant corn before attempting to harvest!');
    } else {
        alert('Wait for the timer to finish before harvesting!');
    }
}

document.querySelectorAll('.corn-plot').forEach((plot) => {
    plot.addEventListener('click', (e) => {
        e.preventDefault();
        const cornPlotIndex = Array.from(plot.parentNode.children).indexOf(plot);
        const timerElement = document.querySelector(`.corn-plot:nth-child(${cornPlotIndex + 1}) .timer`);

        // Check if the plot is in a disabled column
        if (plot.parentNode.classList.contains('disabled')) {
            
            return; // Skip processing for disabled columns
        }

        // Check if the plot is ready to be harvested
        if (plot.classList.contains('planted') && timerElement.innerText === 'Ready!') {
            // Harvest the corn if it's ready
            clearInterval(timerIntervals[cornPlotIndex]);
            plot.classList.remove('planted');
            plot.style.backgroundColor = ''; // Reset color
            timerElement.innerText = '0:00';
            cornAmount++;
            updateUI();
        } else if (!plot.classList.contains('planted')) {
            // Plant the corn if the plot is not planted
            if (selectedCornType) {
                // Check if the plot is ready to be planted
                plot.classList.add('planted');
                plot.dataset.plantType = selectedCornType; // Store the plant type in the dataset
                plot.style.backgroundColor = selectedCornType;
                startTimer(cornPlotIndex);
            } else {
                alert("Select a corn type first!");
            }
        } else {
            // Inform the user to wait for the timer to finish before harvesting
            alert('Wait for the timer to finish before harvesting!');
        }
    });
});
// Add an event listener to the "Convert Corn to Fuel" button
document.getElementById('convert-btn').addEventListener('click', convertCornToFuel);

// Function to convert corn to fuel
function convertCornToFuel() {
    // Check if there is any corn to convert
    if (cornAmount > 0) {
        // Convert corn to fuel at a 1 to 1 ratio
        fuel += cornAmount;
        cornAmount = 0; // Reset corn counter

        // Update UI after conversion
        updateUI();
    } else {
        alert('You have no corn to convert!');
    }
}