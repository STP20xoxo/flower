document.addEventListener("DOMContentLoaded", function () {
    // Fade-in animation
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = 0;
        setTimeout(() => {
            card.style.transition = "opacity 0.6s ease-out";
            card.style.opacity = 1;
        }, 150 * index);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Floating tooltip
    const floatingDesc = document.getElementById("floating-description");

    // Combine description + click logic
    document.querySelectorAll('.flower-card').forEach(card => {
        const flowerId = card.getAttribute('data-flower-id');

        // AJAX hover
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

        // Make card clickable
        card.addEventListener('click', function (e) {
            if (!e.target.closest('a.btn')) {
                const link = card.getAttribute('data-link');
                if (link) window.location.href = link;
            }
        });
    });

      // Add to basket via AJAX + show notification
      document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault(); // Stop link redirect
            const url = this.getAttribute('href');

            fetch(url, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then(data => {
                showNotification(data.message);
            })
            .catch(error => {
                showNotification("An error occurred while adding to basket.");
                console.error(error);
            });
        });
    });

    // Optional: Button hover
    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("mouseover", () => btn.classList.add("btn-light"));
        btn.addEventListener("mouseout", () => btn.classList.remove("btn-light"));
    });
});
