document.addEventListener('DOMContentLoaded', () => {
    console.log("LukaDev Portfolio Script v1.2 Loaded");
    
    // 1. Carousel Logic for Projects
    const carousel = document.querySelector('.projects-carousel');
    const cards = document.querySelectorAll('.p-card');
    const prevBtn = document.querySelector('.fa-chevron-left')?.parentElement;
    const nextBtn = document.querySelector('.fa-chevron-right')?.parentElement;
    
    if (carousel && cards.length > 0) {
        let currentIndex = Array.from(cards).findIndex(card => card.classList.contains('active'));
        if (currentIndex === -1) currentIndex = 0;

        function updateCarousel(index) {
            cards.forEach((card, i) => {
                card.classList.remove('active');
                if (i === index) {
                    card.classList.add('active');
                }
            });
        }

        prevBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
            updateCarousel(currentIndex);
        });

        nextBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
            updateCarousel(currentIndex);
        });

        // Optional: Click on card to make it active
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel(currentIndex);
            });
        });
    }

    // 2. Smooth Scrolling
    const navLinks = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('.header');
    const headerHeight = 80;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Burger Menu
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-links');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (burgerMenu && burgerMenu.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Close menu when clicking outside on the screen
    document.addEventListener('click', (event) => {
        if (burgerMenu && burgerMenu.classList.contains('active')) {
            if (!navMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // 3. Active Link on Scroll & Header Effect
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section, header');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - headerHeight - 20) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });

        // Header Effects on Scroll
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Reveal Animations on Scroll (Individual Elements)
    document.querySelectorAll('.section-heading-main, .section-label, .about-bio, .contact-subtext').forEach(el => {
        if (!el.classList.contains('reveal-anim') && !el.closest('.hero')) {
            el.classList.add('reveal-anim');
        }
    });

    const revealElements = document.querySelectorAll('.reveal-anim, .stagger-item');
    let delayVal = 0;
    let resetTimer = null;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                if (!target.className.match(/anim-delay/)) {
                    target.style.animationDelay = `${delayVal * 0.15}s`;
                    delayVal++;
                }

                target.classList.add('active');
                revealObserver.unobserve(target);
                
                clearTimeout(resetTimer);
                resetTimer = setTimeout(() => { delayVal = 0; }, 100);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Scroll Progress Bar
    const progressBar = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    });

    // 6. Light / Dark Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const icon = themeBtn?.querySelector('i');
    
    // Check saved preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (icon) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
});
