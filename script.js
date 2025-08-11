// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const projectCards = document.querySelectorAll('.project-card');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectModal = document.getElementById('projectModal');
const galleryModal = document.getElementById('galleryModal');
const contactForm = document.getElementById('contactForm');

// Gallery state
let currentGalleryImages = [];
let currentImageIndex = 0;

// Project Data
const projects = {
    coffeedaily: {
        title: 'CoffeeDaily',
        category: 'iOS Приложение',
        description: 'Современное приложение для отслеживания кофе с красивым интерфейсом и интуитивным пользовательским опытом. Построено на SwiftUI и Core Data с кастомными анимациями и чистой MVVM архитектурой.',
        technologies: ['Swift', 'SwiftUI', 'Core Data', 'Combine', 'MVVM'],
        features: [
            'Ежедневное отслеживание потребления кофе',
            'Управление кастомными сортами кофе',
            'Красивые графики и статистика',
            'Поддержка темной темы',
            'Поддержка виджетов'
        ],
        images: ['assets/coffeedaily-1.png', 'assets/coffeedaily-2.png', 'assets/coffeedaily-3.png']
    },
    boopa: {
        title: 'Boopa',
        category: 'Социальный прототип',
        description: 'Инновационный прототип социальной сети с уникальными паттернами взаимодействия. Включает навигацию на основе жестов и возможности обмена сообщениями в реальном времени.',
        technologies: ['Swift', 'SwiftUI', 'Firebase', 'WebRTC', 'Combine'],
        features: [
            'Навигация на основе жестов',
            'Обмен сообщениями в реальном времени',
            'Голосовые и видеозвонки',
            'Кастомные UI компоненты',
            'Push-уведомления'
        ],
        images: ['assets/boopa-1.png', 'assets/boopa-2.png', 'assets/boopa-3.png']
    },
    moviemate: {
        title: 'MovieMate',
        category: 'iOS Приложение',
        description: 'Приложение для поиска и рекомендации фильмов с продвинутой фильтрацией и социальными функциями. Интегрируется с несколькими API фильмов и предоставляет персонализированные рекомендации.',
        technologies: ['Swift', 'SwiftUI', 'Combine', 'Core Data', 'REST API'],
        features: [
            'Поиск и открытие фильмов',
            'Персонализированные рекомендации',
            'Управление списком просмотра',
            'Социальные функции',
            'Офлайн поддержка'
        ],
        images: ['assets/moviemate-1.png', 'assets/moviemate-2.png', 'assets/moviemate-3.png']
    },
    testgenius: {
        title: 'TestGenius',
        category: 'Образовательный прототип',
        description: 'Образовательная платформа для тестирования с адаптивными алгоритмами обучения и отслеживанием прогресса. Разработана для персонализированного обучения.',
        technologies: ['Swift', 'SwiftUI', 'Core ML', 'Core Data', 'Combine'],
        features: [
            'Адаптивные алгоритмы обучения',
            'Отслеживание прогресса',
            'Множественные типы вопросов',
            'Аналитика производительности',
            'Напоминания об учебе'
        ],
        images: ['assets/testgenius-1.png', 'assets/testgenius-2.png', 'assets/testgenius-3.png']
    }
};

// Diploma Data
const diplomas = {
    pharmacy: {
        title: 'Фармацевт (Высшее образование)',
        institution: 'Фармацевтический университет',
        year: '2020',
        description: 'Комплексное изучение фармацевтических наук, включая разработку лекарств, фармакологию и уход за пациентами.',
        image: 'assets/Pharm-1.jpg'
    },
    programming: {
        title: 'Диплом по программированию',
        institution: 'Институт программирования',
        year: '2022',
        description: 'Продвинутый курс программирования, охватывающий современные практики разработки, алгоритмы и архитектуру программного обеспечения.',
        image: 'assets/IT-1.jpg'
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeScrollEffects();
    initializeProjectFilters();
    initializeModals();
    initializeMagneticEffects();
    initializeScrollReveal();
    initializeGallery();
});

// Navbar Functionality
function initializeNavbar() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
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
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
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
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
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
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            if (closeBtn.closest('.gallery-modal')) {
                closeGallery();
            } else {
                closeBtn.closest('.modal').style.display = 'none';
            }
        });
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
    const revealElements = document.querySelectorAll('.section-title, .about-content, .skills-grid, .project-card, .education-item, .contact-content');
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
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
    const project = projects[projectId];
    if (!project) return;
    
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="project-modal">
            <div class="project-modal-header">
                <h2>${project.title}</h2>
                <p class="project-category">${project.category}</p>
                <p class="project-description">${project.description}</p>
            </div>
            
            <div class="project-modal-content">
                <div class="project-info-section">
                    <div class="project-technologies">
                        <h3>Technologies Used</h3>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="project-features">
                        <h3>Key Features</h3>
                        <ul>
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="project-gallery-section">
                    <h3>Скриншоты проекта</h3>
                    <div class="gallery-grid">
                        ${project.images.map((img, index) => `<img src="${img}" alt="Скриншот проекта" class="gallery-img" onclick="openGallery(${JSON.stringify(project.images)}, '${project.title}')">`).join('')}
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

function downloadDiploma(diplomaId) {
    showNotification('Загрузка диплома началась!', 'success');
    // In a real implementation, this would download the actual PDF
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
    
    .gallery-placeholder {
        text-align: center;
        color: var(--text-muted);
        margin-bottom: 2rem;
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
    
    .gallery-item {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 2rem 1rem;
        color: var(--text-muted);
        font-size: 0.9rem;
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
