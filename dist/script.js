// DOM Cache
const DOM = {
    navbar: document.querySelector('.navbar'),
    hamburger: document.querySelector('.hamburger'),
    navMenu: document.querySelector('.nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    projectCards: document.querySelectorAll('.project-card'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    projectModal: document.getElementById('projectModal'),
    galleryModal: document.getElementById('galleryModal')
};

// Utility Functions
function staggerAnimation(elements, delay = 100, animationClass = 'animate') {
    elements.forEach((el, index) => {
        setTimeout(() => el.classList.add(animationClass), index * delay);
    });
}

// Gallery state
let currentGalleryImages = [];
let currentImageIndex = 0;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Wait for SITE data to be loaded
    if (typeof window.SITE === 'undefined') {
        console.error('SITE data not loaded');
        return;
    }
    
    initializeSite();
    initializeNavbar();
    initializeScrollEffects();
    initializeProjectFilters();
    initializeModals();
    initializeMagneticEffects();
    initializeScrollReveal();
    initializeGallery();
    initializeLazyLoading();
    
    // Initialize animations
    initializeDiplomaAnimations();
    initializeProcessAnimations();
    initializeSkillsAnimations();
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        disableAnimations();
    }
});

// Disable animations for users who prefer reduced motion
function disableAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Site Initialization
function initializeSite() {
    // Update meta tags
    document.title = window.SITE.meta.title;
    document.getElementById('metaDescription').setAttribute('content', window.SITE.meta.description);
    document.getElementById('metaKeywords').setAttribute('content', window.SITE.meta.keywords);
    document.getElementById('metaAuthor').setAttribute('content', window.SITE.meta.author);
    document.getElementById('pageTitle').textContent = window.SITE.meta.title;
    
    // Initialize UI text
    initializeUIText();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize hero section
    initializeHero();
    
    // Initialize about section
    initializeAbout();
    
    // Initialize projects section
    initializeProjects();
    
    // Initialize education section
    initializeEducation();
    
    // Initialize contact section
    initializeContact();
    
    // Initialize new sections
    initializeServices();
    initializeProcess();
    initializeFAQ();
    initializeFooter();
    initializeFeaturedProject();
}

// UI Text Initialization
function initializeUIText() {
    // Navigation logo
    const navLogo = document.getElementById('navLogo');
    if (navLogo) navLogo.textContent = window.SITE.ui.navLogo;
    
    // Hero buttons
    const downloadResumeText = document.getElementById('downloadResumeText');
    const contactMeText = document.getElementById('contactMeText');
    if (downloadResumeText) downloadResumeText.textContent = window.SITE.ui.downloadResumeText;
    if (contactMeText) contactMeText.textContent = window.SITE.ui.contactMeText;
    
    // Section titles
    const aboutTitle = document.getElementById('aboutTitle');
    const skillsTitle = document.getElementById('skillsTitle');
    const skillsExtendedTitle = document.getElementById('skillsExtendedTitle');
    const projectsTitle = document.getElementById('projectsTitle');
    const educationTitle = document.getElementById('educationTitle');
    const contactTitle = document.getElementById('contactTitle');
    
    if (aboutTitle) aboutTitle.textContent = window.SITE.ui.aboutTitle;
    if (skillsTitle) skillsTitle.textContent = window.SITE.ui.skillsTitle;
    if (skillsExtendedTitle) skillsExtendedTitle.textContent = window.SITE.ui.skillsExtendedTitle;
    if (projectsTitle) projectsTitle.textContent = window.SITE.ui.projectsTitle;
    if (educationTitle) educationTitle.textContent = window.SITE.ui.educationTitle;
    if (contactTitle) contactTitle.textContent = window.SITE.ui.contactTitle;
    
    // Gallery
    const galleryTitle = document.getElementById('galleryTitle');
    if (galleryTitle) galleryTitle.textContent = window.SITE.ui.galleryTitle;
    
    // Back buttons
    const backButtonText = document.getElementById('backButtonText');
    const backButtonText2 = document.getElementById('backButtonText2');
    if (backButtonText) backButtonText.textContent = window.SITE.ui.backButtonText;
    if (backButtonText2) backButtonText2.textContent = window.SITE.ui.backButtonText;
    
    // About section button
    const downloadResumeButtonText = document.getElementById('downloadResumeButtonText');
    if (downloadResumeButtonText) downloadResumeButtonText.textContent = window.SITE.ui.downloadResumeButtonText;
}

// Navigation Initialization
function initializeNavigation() {
    const navMenu = document.getElementById('navMenu');
    
    navMenu.innerHTML = window.SITE.navigation.map((nav, index) => 
        `<li class="nav-item" data-index="${index}"><a href="#${nav.id}" class="nav-link">${nav.text}</a></li>`
    ).join('');
}

// Hero Section Initialization
function initializeHero() {
    const heroTitle = document.getElementById('heroTitle');
    const heroBulletList = document.getElementById('heroBulletList');
    const heroImage = document.getElementById('heroImage');
    
    if (heroTitle) heroTitle.textContent = window.SITE.hero.title;
    if (heroBulletList) {
        heroBulletList.innerHTML = window.SITE.hero.bulletPoints.map(point => 
            `<li>${point}</li>`
        ).join('');
    }
    if (heroImage) {
        heroImage.src = window.SITE.hero.heroImage;
        heroImage.alt = window.SITE.hero.title;
        heroImage.loading = 'lazy';
        
        // Add floating animation after initial animation completes
        heroImage.addEventListener('animationend', function() {
            if (heroImage.style.animationName === 'heroImageSlide') {
                heroImage.classList.add('loaded');
            }
        });
        
        // Add subtle mouse tracking effect for enhanced interactivity
        heroImage.addEventListener('mousemove', function(e) {
            const rect = heroImage.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const rotateX = (y / rect.height) * -5;
            const rotateY = (x / rect.width) * 5;
            
            heroImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        heroImage.addEventListener('mouseleave', function() {
            heroImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }
}

// About Section Initialization
function initializeAbout() {
    const aboutDescription = document.getElementById('aboutDescription');
    const aboutPortrait = document.getElementById('aboutPortrait');
    const skillsGrid = document.getElementById('skillsGrid');
    const skillsExtendedGrid = document.getElementById('skillsExtendedGrid');
    
    if (aboutDescription) aboutDescription.textContent = window.SITE.about.description;
    if (aboutPortrait) {
        aboutPortrait.src = window.SITE.about.portrait;
        aboutPortrait.alt = window.SITE.hero.title;
        aboutPortrait.loading = 'lazy';
    }
    
    if (skillsGrid) {
        skillsGrid.innerHTML = window.SITE.skills.map(skill => 
            `<div class="skill-badge">${skill}</div>`
        ).join('');
    }
    
    if (skillsExtendedGrid) {
        skillsExtendedGrid.innerHTML = window.SITE.skillsExtended.map(skill => 
            `<div class="skill-badge">${skill}</div>`
        ).join('');
    }
}

// Projects Section Initialization
function initializeProjects() {
    const projectFilters = document.getElementById('projectFilters');
    const projectsGrid = document.getElementById('projectsGrid');
    
    // Initialize filters
    if (projectFilters) {
        projectFilters.innerHTML = window.SITE.filters.map(filter => 
            `<button class="filter-btn ${filter.id === 'all' ? 'active' : ''}" data-filter="${filter.id}">${filter.text}</button>`
        ).join('');
    }
    
    // Initialize projects
    if (projectsGrid) {
        projectsGrid.innerHTML = window.SITE.projects.map(project => `
            <div class="project-card" data-category="${project.category.join(' ')}" onclick="openProjectModal('${project.id}')">
                <div class="project-image">
                    <img src="${project.preview}" alt="${project.name}" class="project-img" loading="lazy">
                    ${project.isFlagship ? '<div class="project-flagship-badge"><i class="fas fa-star"></i></div>' : ''}
                </div>
                <div class="project-content">
                    <div class="project-role">${project.category.includes('ios-apps') ? 'iOS Приложение' : 'Веб-сайт'}</div>
                    <h3>${project.name}</h3>
                    <p>${project.description ? project.description.substring(0, 120) + '...' : ''}</p>
                </div>
            </div>
        `).join('');
        
        // Preload project images to prevent layout shifts
        preloadProjectImages();
    }
}

// Preload project images to prevent layout shifts
function preloadProjectImages() {
    const projectImages = document.querySelectorAll('.project-img');
    let loadedImages = 0;
    const totalImages = projectImages.length;
    
    projectImages.forEach(img => {
        if (img.complete) {
            loadedImages++;
            if (loadedImages === totalImages) {
                // All images loaded, start animations
                startProjectCardAnimations();
            }
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === totalImages) {
                    // All images loaded, start animations
                    startProjectCardAnimations();
                }
            });
            img.addEventListener('error', () => {
                loadedImages++;
                if (loadedImages === totalImages) {
                    // All images loaded (including errors), start animations
                    startProjectCardAnimations();
                }
            });
        }
    });
    
    // Fallback: if no images or all already loaded, start animations immediately
    if (totalImages === 0) {
        startProjectCardAnimations();
    }
}

// Start project card animations after images are loaded
function startProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Use IntersectionObserver for smooth reveal animations
    const projectCardsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Ensure stable layout before animating
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 100); // 100ms delay between each card
                });
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    projectCards.forEach(card => {
        projectCardsObserver.observe(card);
    });
}

// Education Section Initialization
function initializeEducation() {
    const diplomasSection = document.getElementById('diplomasSection');
    
    if (diplomasSection) {
        diplomasSection.innerHTML = window.SITE.education.map(education => `
            <div class="diploma-wrapper">
                <div class="diploma-header">
                    <div class="diploma-header-icon">
                        <i class="${education.icon}"></i>
                    </div>
                    <div class="diploma-header-content">
                        <h3>${education.title}</h3>
                        <p>${education.organization} — ${education.year}</p>
                    </div>
                </div>
                <div class="diploma-card" onclick="flipDiploma(this)">
                    <div class="diploma-inner">
                        <div class="diploma-front">
                            <img src="${education.images[0]}" alt="${education.title} - лицевая сторона" loading="lazy">
                        </div>
                        <div class="diploma-back">
                            <img src="${education.images[1]}" alt="${education.title} - обратная сторона" loading="lazy">
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Contact Section Initialization
function initializeContact() {
    const contactDescription = document.getElementById('contactDescription');
    const contactActions = document.getElementById('contactActions');
    
    if (contactDescription) contactDescription.textContent = window.SITE.contact.description;
    
    if (contactActions) {
        contactActions.innerHTML = window.SITE.contact.methods.map(method => `
            <a href="${method.url}" class="contact-action ${method.type}-action" ${method.type === 'telegram' ? 'target="_blank" rel="noopener"' : ''}>
                <div class="action-icon">
                    <i class="${method.icon}"></i>
                </div>
                <div class="action-content">
                    <h3>${method.title}</h3>
                    <p>${method.description}</p>
                </div>
                <div class="action-arrow">
                    <i class="fas fa-arrow-right"></i>
                </div>
            </a>
        `).join('');
    }
}

// Services Section Initialization
function initializeServices() {
    const servicesTitle = document.getElementById('servicesTitle');
    const servicesSubtitle = document.getElementById('servicesSubtitle');
    const servicesGrid = document.getElementById('servicesGrid');
    
    if (servicesTitle) servicesTitle.textContent = window.SITE.services.title;
    if (servicesSubtitle) servicesSubtitle.textContent = window.SITE.services.subtitle;
    
    if (servicesGrid) {
        servicesGrid.innerHTML = window.SITE.services.packages.map(service => `
            <div class="service-card">
                <div class="service-header">
                    <h3>${service.name}</h3>
                </div>
                <div class="service-info">
                    <div class="service-price">${service.price}</div>
                    <div class="service-duration">${service.duration}</div>
                </div>
                <p>${service.description}</p>
            </div>
        `).join('');
    }
}

// Process Section Initialization
function initializeProcess() {
    const processTitle = document.getElementById('processTitle');
    const processSteps = document.getElementById('processSteps');
    const processSla = document.getElementById('processSla');
    
    if (processTitle) processTitle.textContent = window.SITE.process.title;
    
    if (processSteps) {
        processSteps.innerHTML = window.SITE.process.steps.map((step, index) => `
            <div class="process-step" data-step="${index}">
                <div class="step-number">${step.number}</div>
                <div class="step-content">
                    <h3>${step.title}</h3>
                    <p>${step.description}</p>
                </div>
            </div>
        `).join('');
    }
    
    if (processSla) {
        processSla.innerHTML = `
            <h3>${window.SITE.process.sla.title}</h3>
            <ul>
                ${window.SITE.process.sla.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
    }
}

// FAQ Section Initialization
function initializeFAQ() {
    const faqTitle = document.getElementById('faqTitle');
    const faqContent = document.getElementById('faqContent');
    
    if (faqTitle) faqTitle.textContent = window.SITE.faq.title;
    
    if (faqContent) {
        faqContent.innerHTML = window.SITE.faq.items.map((item, index) => `
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(${index})">
                    <h3>${item.question}</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer" id="faq-answer-${index}">
                    <p>${item.answer}</p>
                </div>
            </div>
        `).join('');
    }
}



// Footer Initialization
function initializeFooter() {
    const footerAuthor = document.getElementById('footerAuthor');
    
    if (footerAuthor) footerAuthor.textContent = window.SITE.footer.author;
}

// Featured Project Section Initialization
function initializeFeaturedProject() {
    const featuredTitle = document.getElementById('featuredTitle');
    const featuredSubtitle = document.getElementById('featuredSubtitle');
    const featuredImage = document.getElementById('featuredImage');
    const featuredCtaText = document.getElementById('featuredCtaText');
    const featuredMetrics = document.getElementById('featuredMetrics');
    
    if (featuredTitle) featuredTitle.textContent = window.SITE.featured.title;
    if (featuredSubtitle) featuredSubtitle.textContent = window.SITE.featured.subtitle;
    if (featuredImage) {
        featuredImage.src = window.SITE.featured.image;
        featuredImage.alt = window.SITE.featured.imageAlt;
        featuredImage.loading = 'lazy';
    }
    if (featuredCtaText) featuredCtaText.textContent = window.SITE.featured.ctaText;
    
    if (featuredMetrics) {
      const metrics = [
    { label: 'Быстрое оформление заказа', description: 'В среднем клиент делает заказ за 1 минуту' },
    { label: 'Рост лояльности', description: 'История заказов стимулирует повторные покупки' },
    { label: 'Скорость обслуживания', description: 'Клиенты получают заказ без ожидания' },
    { label: 'Эффективный маркетинг', description: 'Push-уведомления о скидках и акциях без лишних затрат' }
];
        
        const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        featuredMetrics.innerHTML = metrics.map((metric, index) => `
            <div class="metric-item ${positions[index]}" data-index="${index}">
                <div class="metric-label">${metric.label}</div>
                <div class="metric-description">${metric.description}</div>
            </div>
        `).join('');
    }
    
    // Initialize featured project scroll animations
    initializeFeaturedProjectAnimations();
}

// Featured Project Scroll Animations
function initializeFeaturedProjectAnimations() {
    const featuredSection = document.querySelector('.featured-project');
    if (!featuredSection) return;
    
    let isAnimating = false;
    let currentMetricIndex = 0;
    const metrics = document.querySelectorAll('.metric-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isAnimating) {
                startFeaturedAnimation();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(featuredSection);
    
    function startFeaturedAnimation() {
        isAnimating = true;
        featuredSection.classList.add('active');
        
        // Start metrics animation sequence
        setTimeout(() => {
            animateMetrics();
        }, 2000); // Wait for initial fade-in
    }
    
    function animateMetrics() {
        if (currentMetricIndex >= metrics.length) {
            // Animation complete, show CTA
            setTimeout(() => {
                document.querySelector('.featured-cta').classList.add('active');
            }, 1000);
            return;
        }
        
        const currentMetric = metrics[currentMetricIndex];
        currentMetric.classList.add('active');
        
        // Hide metric after 3 seconds
        setTimeout(() => {
            currentMetric.classList.remove('active');
            currentMetricIndex++;
            
            // Show next metric after 500ms
            setTimeout(() => {
                animateMetrics();
            }, 500);
        }, 3000);
    }
}

// Navbar Functionality
function initializeNavbar() {
    // Mobile menu toggle
    DOM.hamburger.addEventListener('click', () => {
        DOM.hamburger.classList.toggle('active');
        DOM.navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            DOM.hamburger.classList.remove('active');
            DOM.navMenu.classList.remove('active');
        }
    });



    // Smooth scrolling for navigation links
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            }
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Project Filters
function initializeProjectFilters() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            
            const filter = e.target.getAttribute('data-filter');
            filterProjects(filter);
        }
    });
}

function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category.includes(filter)) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Modal Functionality
function initializeModals() {
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal') && !e.target.classList.contains('gallery-modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = ''; // Restore body scroll
        }
    });

    // Close modals when clicking close button
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close')) {
            if (e.target.closest('.gallery-modal')) {
                closeGallery();
            } else {
                e.target.closest('.modal').style.display = 'none';
                document.body.style.overflow = ''; // Restore body scroll
            }
            }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (galleryModal.style.display === 'block') {
                closeGallery();
            } else {
                document.querySelectorAll('.modal').forEach(modal => {
                    if (!modal.classList.contains('gallery-modal')) {
                        modal.style.display = 'none';
                    }
                });
                document.body.style.overflow = ''; // Restore body scroll
            }
        }
    });
}

// Gallery Functionality
function initializeGallery() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (galleryModal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            } else if (e.key === 'Escape') {
                closeGallery();
            }
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    galleryModal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    galleryModal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Only handle horizontal swipes if they're more significant than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                changeImage(1); // Swipe left - next
            } else {
                changeImage(-1); // Swipe right - previous
            }
        }
    }

    // Close gallery when clicking outside the image
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal || e.target.classList.contains('gallery-close')) {
            closeGallery();
        }
    });
}

function closeGallery() {
    galleryModal.style.display = 'none';
    document.body.style.overflow = '';
}

// Magnetic Effects
function initializeMagneticEffects() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// Scroll Reveal Animation
function initializeScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe elements for reveal animation
    const revealElements = document.querySelectorAll('.section-title, .about-content, .project-card, .diploma-wrapper, .contact-content');
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
    
    // Special observer for skills grid animation
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillsGrid();
                skillsObserver.unobserve(entry.target); // Only trigger once
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -100px 0px' });
    
    const skillsGrids = document.querySelectorAll('.skills-grid');
    skillsGrids.forEach(grid => {
        if (grid) {
            skillsObserver.observe(grid);
        }
    });
    

}

// Skills Grid Animation
function animateSkillsGrid() {
    const skillBadges = document.querySelectorAll('.skill-badge');
    staggerAnimation(skillBadges, 100, 'animate');
}

// Animate skills sections when they become visible
function initializeSkillsAnimations() {
    const skillsSections = document.querySelectorAll('.skills-subsection');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // First animate the section itself
                entry.target.classList.add('animate');
                
                // Then animate the skill badges with a slight delay
                setTimeout(() => {
                    const skillBadges = entry.target.querySelectorAll('.skill-badge');
                    skillBadges.forEach((badge, index) => {
                        setTimeout(() => {
                            badge.classList.add('animate');
                        }, index * 50); // Faster animation (50ms between each badge)
                    });
                }, 200); // Wait for section animation to start
                
                skillsObserver.unobserve(entry.target); // Only trigger once
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });
    
    skillsSections.forEach(section => {
        skillsObserver.observe(section);
    });
}

// Gallery Functions
function openGallery(images, title) {
    currentGalleryImages = images;
    currentImageIndex = 0;
    
    document.getElementById('galleryTitle').textContent = title;
    document.getElementById('totalImages').textContent = images.length;
    
    updateGalleryImage();
    updateGalleryThumbnails();
    
    galleryModal.style.display = 'block';
    
    // Prevent body scroll when gallery is open
    document.body.style.overflow = 'hidden';
}

function updateGalleryImage() {
    const image = document.getElementById('galleryImage');
    const counter = document.getElementById('currentImage');
    const container = document.querySelector('.gallery-image-container');
    
    if (currentGalleryImages.length > 0) {
        // Show loading state
        container.classList.add('loading');
        image.style.opacity = '0';
        
        // Preload image for smooth transition
        const img = new Image();
        img.onload = function() {
            image.src = currentGalleryImages[currentImageIndex];
            image.loading = 'eager';
            image.classList.add('loaded');
            container.classList.remove('loading');
            setTimeout(() => {
                image.style.opacity = '1';
            }, 100);
        };
        img.onerror = function() {
            container.classList.remove('loading');
            image.style.opacity = '1';
        };
        img.src = currentGalleryImages[currentImageIndex];
        
        counter.textContent = currentImageIndex + 1;
    }
}

function updateGalleryThumbnails() {
    const container = document.getElementById('galleryThumbnails');
    container.innerHTML = '';
    
    currentGalleryImages.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = `${window.SITE.ui.galleryTitle} ${index + 1}`;
        thumbnail.className = `gallery-thumbnail ${index === currentImageIndex ? 'active' : ''}`;
        thumbnail.onclick = () => {
            currentImageIndex = index;
            updateGalleryImage();
            updateGalleryThumbnails();
        };
        container.appendChild(thumbnail);
    });
}

function changeImage(direction) {
    if (currentGalleryImages.length === 0) return;
    
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = currentGalleryImages.length - 1;
    } else if (currentImageIndex >= currentGalleryImages.length) {
        currentImageIndex = 0;
    }
    
    updateGalleryImage();
    updateGalleryThumbnails();
}

// Utility Functions
function downloadResume() {
    // Download the actual PDF file
    const link = document.createElement('a');
    // Get base path for assets
    const basePath = window.location.hostname === 'alexcerium.github.io' ? '/AlexDEV' : '';
    link.href = `${basePath}/assets/AlexMatkava.pdf`;
    link.download = 'AlexMatkava.pdf';
    link.click();
    
    showNotification('Резюме успешно скачано!', 'success');
}

function scrollToContact() {
    const contactSection = document.querySelector('#contact');
    contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToProjects() {
    const projectsSection = document.querySelector('#projects');
    projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function openProjectModal(projectId) {
	const project = window.SITE.projects.find(p => p.id === projectId);
    if (!project) return;
    
	const screenshots = Array.isArray(project.screenshots) ? project.screenshots.slice(0, 3) : [];
	
	// Map the three screenshots to the new data structure
	const slideContent = [
		{
			title: 'Описание',
			content: project.description || '',
			type: 'description'
		},
		{
			title: 'Возможности',
			content: project.features || [],
			type: 'features'
		},
		{
			title: 'Технологии',
			content: project.tech || [],
			type: 'tech'
		}
	];

	const slidesHtml = screenshots.map((src, idx) => {
		const slideData = slideContent[idx];
		let contentHtml = '';
		
		if (slideData.type === 'description') {
			contentHtml = `<div class="story-textblock__body description-text">${slideData.content}</div>`;
		} else if (slideData.type === 'features' && Array.isArray(slideData.content)) {
			contentHtml = `
				<ul class="features-list">
					${slideData.content.map(feature => `<li>${feature}</li>`).join('')}
				</ul>
			`;
		} else if (slideData.type === 'tech' && Array.isArray(slideData.content)) {
			contentHtml = `
				<ul class="tech-list">
					${slideData.content.map(tech => `<li>${tech}</li>`).join('')}
				</ul>
			`;
		}
		
		return `
			<section class="modal-slide" data-slide-index="${idx}">
				<div class="modal-slide__media">
					<img src="${src}" alt="${project.name} — экран ${idx + 1}" loading="eager" onclick="openGallery(${JSON.stringify(screenshots)}, '${project.name}')">
                </div>
				<div class="modal-slide__text">
					<div class="story-textblock">
						<div class="story-textblock__title">${slideData.title}</div>
						${contentHtml}
            </div>
				</div>
			</section>
		`;
	}).join('');

	const shell = document.getElementById('projectModalContent');
	shell.innerHTML = `
		<span class="close" aria-label="Close">&times;</span>
		<header class="story-modal__header">
			<h2 class="story-modal__title">${project.name}</h2>
			<p class="story-modal__subtitle">${project.category.includes('ios-apps') ? 'iOS Приложение' : 'Веб-сайт'}</p>
		</header>
		<div class="project-slides" id="projectSlides">${slidesHtml}</div>
	`;

	// Initialize lazy loading for dynamically created modal images
	initializeModalLazyLoading();

	// Rebind close listeners for the new close element
	shell.querySelector('.close').addEventListener('click', () => { 
		projectModal.style.display = 'none'; 
		document.body.style.overflow = ''; // Restore body scroll
	});

	// Reveal slides as they enter viewport
	const slides = shell.querySelectorAll('.modal-slide');
	let revealIndex = 0;
	const io = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const el = entry.target;
				setTimeout(() => { el.classList.add('is-visible'); }, revealIndex * 120);
				revealIndex++;
				io.unobserve(el);
			}
		});
	}, { threshold: 0.35, root: document.getElementById('projectSlides') });
	slides.forEach(s => io.observe(s));
    
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    projectModal.style.display = 'block';
}

function flipDiploma(card) {
    card.classList.toggle('flipped');
}

function scrollToProject(projectId) {
    const projectsSection = document.querySelector('#projects');
    projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Highlight the specific project after scrolling
    setTimeout(() => {
        const projectCard = document.querySelector(`[data-category*="${projectId}"]`);
        if (projectCard) {
            projectCard.style.transform = 'scale(1.05)';
            projectCard.style.boxShadow = '0 8px 32px rgba(30, 79, 255, 0.3)';
            setTimeout(() => {
                projectCard.style.transform = '';
                projectCard.style.boxShadow = '';
            }, 2000);
        }
    }, 500);
}


function toggleFAQ(index) {
    const answer = document.getElementById(`faq-answer-${index}`);
    const question = answer.previousElementSibling;
    const icon = question.querySelector('i');
    
    if (answer.classList.contains('show')) {
        // Closing: animate out
        answer.style.opacity = '0';
        answer.style.maxHeight = '0';
        answer.style.transform = 'translateY(-10px)';
        icon.style.transform = 'rotate(0deg)';
        
        setTimeout(() => {
            answer.classList.remove('show');
        }, 400); // Match transition duration
    } else {
        // Opening: animate in
        answer.classList.add('show');
        
        // Force reflow to ensure the class is applied before animating
        answer.offsetHeight;
        
        answer.style.opacity = '1';
        answer.style.maxHeight = '500px';
        answer.style.transform = 'translateY(0)';
        icon.style.transform = 'rotate(180deg)';
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 1rem;
        color: var(--text-primary);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification styles to the page
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-success {
        border-color: #10B981;
    }
    
    .notification-success i {
        color: #10B981;
    }
    
    .notification-error {
        border-color: #EF4444;
    }
    
    .notification-error i {
        color: #EF4444;
    }
    
    .project-modal {
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .project-modal-header {
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--border-color);
    }
    
    .project-modal-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: start;
    }
    
    .project-info-section {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .project-gallery-section {
        min-height: 400px;
    }
    
    .project-modal h2 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }
    
    .project-flagship-indicator {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--gradient-accent);
        color: var(--text-primary);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
        margin-top: 0.5rem;
    }
    
    .project-flagship-indicator i {
        color: #FFD700;
    }
    
    .project-schema {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .schema-item {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 1.5rem;
        transition: var(--transition-medium);
    }
    
    .schema-item:hover {
        border-color: var(--accent-primary);
        transform: translateY(-2px);
        box-shadow: var(--shadow-secondary);
    }
    
    .schema-item h3 {
        color: var(--accent-primary);
        margin-bottom: 1rem;
        font-size: 1.1rem;
        font-weight: 600;
    }
    
    .schema-item p {
        color: var(--text-secondary);
        line-height: 1.6;
        margin: 0;
    }
    
    .project-category {
        color: var(--accent-primary);
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    .project-description {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 2rem;
    }
    
    .project-technologies h3,
    .project-features h3,
    .project-gallery h3 {
        color: var(--text-primary);
        margin-bottom: 1rem;
    }
    
    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 2rem;
    }
    
    .tech-tag {
        background: var(--accent-primary);
        color: var(--text-primary);
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    .project-features ul {
        list-style: none;
        margin-bottom: 2rem;
    }
    
    .project-features li {
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
        padding-left: 1.5rem;
        position: relative;
    }
    
    .project-features li::before {
        content: '•';
        color: var(--accent-primary);
        position: absolute;
        left: 0;
    }
    
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .gallery-img {
        width: 100%;
        height: auto;
        max-height: 300px;
        object-fit: contain;
        border-radius: 12px;
        border: 2px solid var(--border-color);
        transition: var(--transition-medium);
        cursor: pointer;
        background: var(--card-bg);
        padding: 0.5rem;
    }
    
    .gallery-img:hover {
        transform: scale(1.05);
        border-color: var(--accent-primary);
        box-shadow: var(--shadow-secondary);
    }
    
    /* Responsive styles for modal */
    @media (max-width: 768px) {
        .project-modal-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        .project-gallery-section {
            min-height: 300px;
    }
    
    .gallery-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        }
        
        .gallery-img {
            max-height: 200px;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll effects are already handled in initializeScrollEffects
}, 16)); // ~60fps

// Initialize diploma click interactions (no auto-rotation)
function initializeDiplomaAnimations() {
    // No automatic animations - diplomas only rotate on click
    // The flipDiploma function handles click-based rotation
}

// Initialize process step animations
function initializeProcessAnimations() {
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const steps = entry.target.querySelectorAll('.process-step');
                // Reset animations first
                steps.forEach(step => {
                    step.classList.remove('animate');
                });
                
                // Trigger animations with slower timing
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('animate');
                    }, index * 300); // 300ms delay between each step (slower)
                });
            } else {
                // Reset animations when section is out of view
                const steps = entry.target.querySelectorAll('.process-step');
                steps.forEach(step => {
                    step.classList.remove('animate');
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -100px 0px' });
    
    const processSection = document.querySelector('.process-steps');
    if (processSection) {
        processObserver.observe(processSection);
    }
}

// Lazy Loading Initialization
function initializeLazyLoading() {
    // Handle lazy loading for all images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    // Add load event listeners to existing lazy images
    lazyImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            img.addEventListener('error', function() {
                this.classList.add('loaded'); // Still show the image even if it fails to load
            });
        }
    });
    
    // Use Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.complete) {
                        img.classList.add('loaded');
                    } else {
                        img.addEventListener('load', function() {
                            this.classList.add('loaded');
                        });
                        img.addEventListener('error', function() {
                            this.classList.add('loaded');
                        });
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px', // Start loading 50px before the image comes into view
            threshold: 0.01
        });
        
        // Observe all lazy images
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Modal Lazy Loading Initialization
function initializeModalLazyLoading() {
    // Handle loading for dynamically created modal images
    const modalImages = document.querySelectorAll('#projectModal img');
    
    modalImages.forEach(img => {
        // Add load event listener for smooth transitions
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            img.addEventListener('error', function() {
                this.classList.add('loaded'); // Still show the image even if it fails to load
            });
        }
    });
}


