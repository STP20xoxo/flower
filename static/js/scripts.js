document.addEventListener("DOMContentLoaded", function() {
    // Fade-in animation for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = 0;
        setTimeout(() => {
            card.style.transition = "opacity 0.6s ease-out";
            card.style.opacity = 1;
        }, 150 * index);
    });

    // Smooth scroll to top on page load
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Optional: Simple hover effect (can also be done in CSS)
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("mouseover", () => btn.classList.add("btn-light"));
    btn.addEventListener("mouseout", () => btn.classList.remove("btn-light"));
});

