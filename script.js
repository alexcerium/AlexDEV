// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const projectCards = document.querySelectorAll('.project-card');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectModal = document.getElementById('projectModal');
const galleryModal = document.getElementById('galleryModal');

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
    document.querySelector('meta[name="description"]').setAttribute('content', window.SITE.meta.description);
    document.querySelector('meta[name="keywords"]').setAttribute('content', window.SITE.meta.keywords);
    document.querySelector('meta[name="author"]').setAttribute('content', window.SITE.meta.author);
    
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
    initializeLegal();
    initializeFooter();
    initializeFeaturedProject();
}

// Navigation Initialization
function initializeNavigation() {
    const navMenu = document.getElementById('navMenu');
    navMenu.innerHTML = window.SITE.navigation.map(nav => 
        `<li><a href="#${nav.id}" class="nav-link">${nav.text}</a></li>`
    ).join('');
}

// Hero Section Initialization
function initializeHero() {
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const heroPortrait = document.getElementById('heroPortrait');
    const heroFlagship = document.getElementById('heroFlagship');
    
    if (heroTitle) heroTitle.textContent = window.SITE.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = window.SITE.hero.subtitle;
    if (heroPortrait) heroPortrait.src = window.SITE.hero.portrait;
    
    // Initialize flagship badge
    if (heroFlagship && window.SITE.hero.flagship.show) {
        heroFlagship.innerHTML = `
            <div class="flagship-badge" onclick="scrollToProject('coffeedaily')">
                <i class="fas fa-star"></i>
                <span>${window.SITE.hero.flagship.text}</span>
            </div>
        `;
    }
}

// About Section Initialization
function initializeAbout() {
    const aboutDescription = document.getElementById('aboutDescription');
    const skillsGrid = document.getElementById('skillsGrid');
    
    if (aboutDescription) aboutDescription.textContent = window.SITE.about.description;
    
    if (skillsGrid) {
        skillsGrid.innerHTML = window.SITE.skills.map(skill => 
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
                    <img src="${project.preview}" alt="${project.name}" class="project-img">
                    ${project.isFlagship ? '<div class="project-flagship-badge"><i class="fas fa-star"></i></div>' : ''}
                </div>
                <div class="project-content">
                    <div class="project-role">${project.category.includes('ios-apps') ? 'iOS Приложение' : 'Веб-сайт'}</div>
                    <h3>${project.name}</h3>
                    <p>${project.problem}</p>
                </div>
            </div>
        `).join('');
    }
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
                            <img src="${education.images[0]}" alt="${education.title} - лицевая сторона">
                        </div>
                        <div class="diploma-back">
                            <img src="${education.images[1]}" alt="${education.title} - обратная сторона">
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
                    <div class="service-price">${service.price}</div>
                </div>
                <div class="service-duration">${service.duration}</div>
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
        processSteps.innerHTML = window.SITE.process.steps.map(step => `
            <div class="process-step">
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

// Legal Pages Initialization
function initializeLegal() {
    const privacyTitle = document.getElementById('privacyTitle');
    const privacyContent = document.getElementById('privacyContent');
    const termsTitle = document.getElementById('termsTitle');
    const termsContent = document.getElementById('termsContent');
    
    if (privacyTitle) privacyTitle.textContent = window.SITE.legal.privacy.title;
    if (privacyContent) privacyContent.innerHTML = `<p>${window.SITE.legal.privacy.content}</p>`;
    
    if (termsTitle) termsTitle.textContent = window.SITE.legal.terms.title;
    if (termsContent) termsContent.innerHTML = `<p>${window.SITE.legal.terms.content}</p>`;
}

// Footer Initialization
function initializeFooter() {
    const footerAuthor = document.getElementById('footerAuthor');
    const footerLinks = document.getElementById('footerLinks');
    
    if (footerAuthor) footerAuthor.textContent = window.SITE.footer.author;
    
    if (footerLinks) {
        footerLinks.innerHTML = window.SITE.footer.links.map(link => 
            `<a href="${link.href}" class="footer-link">${link.text}</a>`
        ).join('');
    }
}

// Featured Project Section Initialization
function initializeFeaturedProject() {
    const featuredTitle = document.getElementById('featuredTitle');
    const featuredSubtitle = document.getElementById('featuredSubtitle');
    const featuredImage = document.getElementById('featuredImage');
    const featuredMetrics = document.getElementById('featuredMetrics');
    
    if (featuredTitle) featuredTitle.textContent = window.SITE.projects.find(p => p.id === 'coffeedaily')?.name || 'CoffeeDaily';
    if (featuredSubtitle) featuredSubtitle.textContent = 'Флагман-кейс: iOS приложение для отслеживания кофе';
    if (featuredImage) featuredImage.src = window.SITE.projects.find(p => p.id === 'coffeedaily')?.preview || 'assets/coffeedaily-preview.png';
    
    if (featuredMetrics) {
        const metrics = [
            { value: '95%', label: 'Удовлетворенность', description: 'Пользователи довольны интерфейсом' },
            { value: '2.3x', label: 'Скорость', description: 'Быстрее аналогов' },
            { value: '4.8★', label: 'Рейтинг', description: 'В App Store' },
            { value: '10k+', label: 'Загрузки', description: 'Активных пользователей' }
        ];
        
        const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        featuredMetrics.innerHTML = metrics.map((metric, index) => `
            <div class="metric-item ${positions[index]}" data-index="${index}">
                <div class="metric-value">${metric.value}</div>
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
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 11, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 11, 0.95)';
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
        }
    });

    // Close modals when clicking close button
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close')) {
            if (e.target.closest('.gallery-modal')) {
                closeGallery();
            } else {
                e.target.closest('.modal').style.display = 'none';
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
    const revealElements = document.querySelectorAll('.section-title, .about-content, .project-card, .education-item, .contact-content');
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
    
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        skillsObserver.observe(skillsGrid);
    }
    
    // Special observer for project cards animation
    const projectCardsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 80); // 80ms delay between each card
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -100px 0px' });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        projectCardsObserver.observe(card);
    });
}

// Skills Grid Animation
function animateSkillsGrid() {
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    skillBadges.forEach((badge, index) => {
        setTimeout(() => {
            badge.classList.add('animate');
        }, index * 100); // 100ms delay between each tile
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
        thumbnail.alt = `Скриншот ${index + 1}`;
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
    // Create a dummy resume download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('Александр - iOS разработчик резюме\n\nОпыт:\n- iOS разработчик на Swift/SwiftUI\n- MVVM архитектура\n- Кастомный UI/UX дизайн\n- Интеграция API\n- Разработка анимаций\n\nОбразование:\n- Фармацевт (Высшее образование) - 2020\n- Диплом по программированию - 2022\n\nНавыки:\nSwift, SwiftUI, Combine, Core Data, REST API, Git/GitHub');
    link.download = 'Александр_Резюме.txt';
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

function openProjectModal(projectId) {
    const project = window.SITE.projects.find(p => p.id === projectId);
    if (!project) return;
    
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="project-modal">
            <div class="project-modal-header">
                <h2>${project.name}</h2>
                <p class="project-category">${project.category.join(' ')}</p>
                ${project.isFlagship ? '<div class="project-flagship-indicator"><i class="fas fa-star"></i> Флагман-кейс</div>' : ''}
            </div>
            
            <div class="project-modal-content">
                <div class="project-info-section">
                    <div class="project-schema">
                        <div class="schema-item">
                            <h3>Проблема</h3>
                            <p>${project.problem}</p>
                        </div>
                        <div class="schema-item">
                            <h3>Гипотеза</h3>
                            <p>${project.hypothesis}</p>
                        </div>
                        <div class="schema-item">
                            <h3>Решения (UI/анимации)</h3>
                            <p>${project.solutions}</p>
                        </div>
                        <div class="schema-item">
                            <h3>Техстек</h3>
                <div class="tech-tags">
                                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
                        <div class="schema-item">
                            <h3>Результат</h3>
                            <p>${project.result}</p>
                        </div>
                    </div>
            </div>
            
                <div class="project-gallery-section">
                <h3>Скриншоты проекта</h3>
                <div class="gallery-grid">
                        ${project.screenshots.map((img, index) => `<img src="${img}" alt="Скриншот проекта" class="gallery-img" onclick="openGallery(${JSON.stringify(project.screenshots)}, '${project.name}')">`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
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
    
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    } else {
        answer.style.display = 'block';
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
