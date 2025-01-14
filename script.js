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
            "<h2 class='gold-text'>The Journey Begins!</h2>";
    }
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer(); // Initialize immediately

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("eventModal");
    const modalContent = document.querySelector(".model-inner");
    const closeModal = document.querySelector(".close");

    // Ensure modal is hidden initially
    modal.style.display = "none";

    document.querySelectorAll(".pirate-button").forEach(button => {
        button.addEventListener("click", async (event) => {
            const eventName = event.target.closest(".card-inner").querySelector(".card-front p").textContent.trim();
            const eventDetails = await fetchEventDetails(eventName);
            displayEventDetails(eventDetails);
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    async function fetchEventDetails(eventName) {
        const response = await fetch("event-details.json");
        const data = await response.json();
        return data.events.find(event => event.name === eventName);
    }

    function displayEventDetails(eventDetails) {
        modalContent.innerHTML = `
            <span class="close">&times;</span>
            <h2 class='gold-text'>${eventDetails.name}</h2>
            <p>${eventDetails.description}</p>
            <h3 class='gold-text'>Rules:</h3>
            <ul>${eventDetails.rules.map(rule => `<li>${rule}</li>`).join('')}</ul>
            <h3 class='gold-text'>Coordinators:</h3>
            <p>${eventDetails.coordinators.join(', ')}</p>
        `;
        modal.style.display = "flex"; // Ensure modal is displayed as flex to center it
    }
});