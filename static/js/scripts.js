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

    // Add hover effect for cards (AJAX to get description)
    const flowerCards = document.querySelectorAll('.flower-card');

    flowerCards.forEach((card) => {
        const flowerId = card.getAttribute('data-flower-id');
        const descriptionDiv = document.getElementById(`desc-${flowerId}`);

        card.addEventListener('mouseenter', function() {
            fetch(`/flower-description/${flowerId}`)
                .then(response => response.json())
                .then(data => {
                    descriptionDiv.querySelector('.description-text').innerHTML = data.description;
                    descriptionDiv.style.display = 'block';
                })
                .catch(error => {
                    console.error('Error fetching flower description:', error);
                    descriptionDiv.querySelector('.description-text').innerHTML = 'Error loading description.';
                    descriptionDiv.style.display = 'block';
                });
        });

        card.addEventListener('mousemove', function(e) {
            descriptionDiv.style.top = e.pageY + 15 + 'px';
            descriptionDiv.style.left = e.pageX + 15 + 'px';
        });

        card.addEventListener('mouseleave', function() {
            descriptionDiv.style.display = 'none';
        });
    });
});

// Optional: Simple hover effect (can also be done in CSS)
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("mouseover", () => btn.classList.add("btn-light"));
    btn.addEventListener("mouseout", () => btn.classList.remove("btn-light"));
});
