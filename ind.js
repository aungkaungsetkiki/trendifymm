         // Menu toggle functionality
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-menu a');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Animation on scroll
        function animateOnScroll() {
            const elements = document.querySelectorAll('.services-list li, .cta-button, .about h2, .about p');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = 1;
                    element.style.transform = 'translateY(0)';
                }
            });
        }

        // Initialize elements for scroll animation
        document.querySelectorAll('.services-list li, .cta-button, .about h2, .about p').forEach(element => {
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        // Listen for scroll events
        window.addEventListener('scroll', animateOnScroll);
        // Initial check on page load
        window.addEventListener('load', animateOnScroll);

        // Platform animation on hover
        const platformItems = document.querySelectorAll('.platform-item');
        platformItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-8px) scale(1.05)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Button functionality - redirect to services.html
        const startButton = document.getElementById('startButton');
        const aboutButton = document.getElementById('aboutButton');
        
        if (startButton) {
            startButton.addEventListener('click', () => {
                window.location.href = 'services.html';
            });
        }
        
        if (aboutButton) {
            aboutButton.addEventListener('click', () => {
                window.location.href = 'services.html';
            });
        }
    
