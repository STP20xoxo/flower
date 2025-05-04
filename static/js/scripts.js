document.addEventListener("DOMContentLoaded", function () {
    // Only run hover/fade/ajax logic on homepage
    if (document.body.classList.contains("homepage")) {
        // Fade-in animation for cards on homepage
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.opacity = 0;
            setTimeout(() => {
                card.style.transition = "opacity 0.6s ease-out";
                card.style.opacity = 1;
            }, 150 * index);
        });

        // Floating tooltip for description on homepage
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
                    .catch(() => {
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

            card.addEventListener('click', function (e) {
                if (!e.target.closest('a.btn')) {
                    const link = card.getAttribute('data-link');
                    if (link) window.location.href = link;
                }
            });
        });
    }

    // Add to basket via AJAX for all pages
    document.querySelectorAll('.btn-primary, .add-to-basket-detail').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent page redirect
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

    // Button hover effect for all pages
    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("mouseover", () => btn.classList.add("btn-light"));
        btn.addEventListener("mouseout", () => btn.classList.remove("btn-light"));
    });

    // Notification handler (showing success/failure of basket actions)
    function showNotification(message) {
        const notif = document.getElementById('notification');
        const notifMsg = document.getElementById('notification-message');
        notifMsg.innerText = message;
        notif.style.display = 'block';

        setTimeout(() => {
            notif.style.display = 'none';
        }, 2500);
    }
});
