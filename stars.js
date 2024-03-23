function stars() {
    var count = 200;
    let scene = document.querySelector('.scene');
    let starsArray = [];

    function createStar() {
        let logSpeed = Math.log10(speed); // Get the logarithm base 10 of the speed
        let scaledSpeed = Math.min(Math.max(logSpeed * 10, 1), 100); // Scale the speed to desired range (1 to 100)
        let starSpeedMultiplier = scaledSpeed * 0.1; // Adjust the multiplier to map to desired range
        let star = document.createElement('i');
        let x = Math.floor(Math.random() * window.innerWidth);
        let y = Math.floor(Math.random() * window.innerHeight); 
        let speedMultiplier = Math.random() * starSpeedMultiplier; 
        let duration = Math.random() / starSpeedMultiplier + 1; 
        let w = Math.random() * speedMultiplier + 1; 
    
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = w + 'px';
        star.style.height = 1 + 'px'; 
        star.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; 
    
        scene.appendChild(star);
        starsArray.push({ element: star, duration, speedMultiplier });
    }

    function moveStars() {
        starsArray.forEach((star) => {
            let currentLeft = parseFloat(star.element.style.left);
            
            // Calculate the speed multiplier based on the speed
            let speedMultiplier = (Math.log10(Math.min(speed, 299792458)/0.299792458) + 1) * 2;
            
            star.element.style.left = currentLeft - speedMultiplier - 1 + 'px'; // Adjust the speed for movement
            star.element.style.width = Math.random() * speedMultiplier + 1 + 'px'; // Adjust the width
            
            // Reset the star if it has moved off the left side
            if (currentLeft < -50) {
                star.element.style.left = window.innerWidth + 'px';
                star.element.style.top = Math.floor(Math.random() * scene.clientHeight) + 'px';
            }
        });
        
        requestAnimationFrame(moveStars);
    }

    function animateStars() {
        let i = 0;
        while (i < count) {
            createStar();
            i++;
        }

        moveStars();
    }

    animateStars();
}

stars();
