function updateTimer() {
    const eventDate = new Date("2025-02-01T00:00:00").getTime();
    const now = new Date().getTime();
    const timeRemaining = eventDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days
        .toString()
        .padStart(2, "0");
    document.getElementById("hours").textContent = hours
        .toString()
        .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
        .toString()
        .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
        .toString()
        .padStart(2, "0");

    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        document.querySelector(".timer-container").innerHTML =
            "<h2>The Journey Begins!</h2>";
    }
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer(); // Initialize immediately


document.addEventListener("DOMContentLoaded", function() {
    const ship = document.querySelector(".ship");

    // Function to reset and trigger the animation
    function resetShipAnimation() {
        // Remove the animation
        ship.style.animation = 'none';
        
        // Trigger a reflow to reset the animation
        ship.offsetHeight; // Forces a reflow, causing the animation to restart
        
        // Add the animation again
        ship.style.animation = 'moveShip 5s linear forwards'; // Restart the animation
    }

    // Set up IntersectionObserver to observe the About section
    const aboutSection = document.getElementById("about");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reset the animation each time the About section comes into view
                resetShipAnimation();
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the About section is visible

    observer.observe(aboutSection);
});