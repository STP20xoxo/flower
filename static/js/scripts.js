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

    // Floating tooltip for flower descriptions
    const floatingDesc = document.getElementById("floating-description");

    document.querySelectorAll('.flower-card').forEach(card => {
        const flowerId = card.getAttribute('data-flower-id');

        card.addEventListener('mouseenter', function () {
            fetch(`/flower-description/${flowerId}`)
                .then(response => response.json())
                .then(data => {
                    floatingDesc.querySelector('.description-text').innerText = data.description;
                    floatingDesc.style.display = 'block';
                })
                .catch(err => {
                    floatingDesc.querySelector('.description-text').innerText = 'Error loading description.';
                    floatingDesc.style.display = 'block';
                });
        });

        card.addEventListener('mousemove', function (e) {
            floatingDesc.style.top = (e.pageY + 15) + 'px';
            floatingDesc.style.left = (e.pageX + 15) + 'px';
        });

        card.addEventListener('mouseleave', function () {
            floatingDesc.style.display = 'none';
        });
    });

    // Optional: Button hover highlight
    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("mouseover", () => btn.classList.add("btn-light"));
        btn.addEventListener("mouseout", () => btn.classList.remove("btn-light"));
    });
});
