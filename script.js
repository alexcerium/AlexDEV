// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const projectCards = document.querySelectorAll('.project-card');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectModal = document.getElementById('projectModal');
const diplomaModal = document.getElementById('diplomaModal');
const contactForm = document.getElementById('contactForm');

// Project Data
const projects = {
    coffeedaily: {
        title: 'CoffeeDaily',
        category: 'iOS Application',
        description: 'A modern coffee tracking app with beautiful UI and intuitive user experience. Built with SwiftUI and Core Data, featuring custom animations and a clean MVVM architecture.',
        technologies: ['Swift', 'SwiftUI', 'Core Data', 'Combine', 'MVVM'],
        features: [
            'Daily coffee consumption tracking',
            'Custom coffee bean management',
            'Beautiful charts and statistics',
            'Dark mode support',
            'Widget support'
        ],
        images: ['coffeedaily-1.jpg', 'coffeedaily-2.jpg', 'coffeedaily-3.jpg']
    },
    boopa: {
        title: 'Boopa',
        category: 'Social Prototype',
        description: 'Innovative social networking prototype with unique interaction patterns. Features gesture-based navigation and real-time messaging capabilities.',
        technologies: ['Swift', 'SwiftUI', 'Firebase', 'WebRTC', 'Combine'],
        features: [
            'Gesture-based navigation',
            'Real-time messaging',
            'Voice and video calls',
            'Custom UI components',
            'Push notifications'
        ],
        images: ['boopa-1.jpg', 'boopa-2.jpg', 'boopa-3.jpg']
    },
    moviemate: {
        title: 'MovieMate',
        category: 'iOS Application',
        description: 'Movie discovery and recommendation app with advanced filtering and social features. Integrates with multiple movie APIs and provides personalized recommendations.',
        technologies: ['Swift', 'SwiftUI', 'Combine', 'Core Data', 'REST API'],
        features: [
            'Movie discovery and search',
            'Personalized recommendations',
            'Watchlist management',
            'Social sharing features',
            'Offline support'
        ],
        images: ['moviemate-1.jpg', 'moviemate-2.jpg', 'moviemate-3.jpg']
    },
    testgenius: {
        title: 'TestGenius',
        category: 'Educational Prototype',
        description: 'Educational testing platform with adaptive learning algorithms and progress tracking. Designed for personalized learning experiences.',
        technologies: ['Swift', 'SwiftUI', 'Core ML', 'Core Data', 'Combine'],
        features: [
            'Adaptive learning algorithms',
            'Progress tracking',
            'Multiple question types',
            'Performance analytics',
            'Study reminders'
        ],
        images: ['testgenius-1.jpg', 'testgenius-2.jpg', 'testgenius-3.jpg']
    }
};

// Diploma Data
const diplomas = {
    pharmacy: {
        title: 'Pharmacist (Higher Education)',
        institution: 'Pharmaceutical University',
        year: '2020',
        description: 'Comprehensive study of pharmaceutical sciences including drug development, pharmacology, and patient care.',
        image: 'pharmacy-diploma.jpg'
    },
    programming: {
        title: 'Diploma in Programming',
        institution: 'Programming Institute',
        year: '2022',
        description: 'Advanced programming course covering modern development practices, algorithms, and software architecture.',
        image: 'programming-diploma.jpg'
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeScrollEffects();
    initializeProjectFilters();
    initializeModals();
    initializeMagneticEffects();
    initializeContactForm();
    initializeScrollReveal();
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
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Close modals when clicking close button
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').style.display = 'none';
        });
    });

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
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

// Contact Form
function initializeContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Simulate success
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Utility Functions
function downloadResume() {
    // Create a dummy resume download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('Alexander - iOS Developer Resume\n\nExperience:\n- iOS Developer with Swift/SwiftUI\n- MVVM Architecture\n- Custom UI/UX Design\n- API Integration\n- Animation Development\n\nEducation:\n- Pharmacist (Higher Education) - 2020\n- Diploma in Programming - 2022\n\nSkills:\nSwift, SwiftUI, Combine, Core Data, REST API, Git/GitHub');
    link.download = 'Alexander_Resume.txt';
    link.click();
    
    showNotification('Resume downloaded successfully!', 'success');
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
            <h2>${project.title}</h2>
            <p class="project-category">${project.category}</p>
            <p class="project-description">${project.description}</p>
            
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
            
            <div class="project-gallery">
                <h3>Project Screenshots</h3>
                <div class="gallery-placeholder">
                    <p>Project screenshots would be displayed here</p>
                    <div class="gallery-grid">
                        ${project.images.map(img => `<div class="gallery-item">${img}</div>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    projectModal.style.display = 'block';
}

function viewDiploma(diplomaId) {
    const diploma = diplomas[diplomaId];
    if (!diploma) return;
    
    const diplomaContent = document.getElementById('diplomaContent');
    diplomaContent.innerHTML = `
        <div class="diploma-modal">
            <h2>${diploma.title}</h2>
            <div class="diploma-info">
                <p><strong>Institution:</strong> ${diploma.institution}</p>
                <p><strong>Year:</strong> ${diploma.year}</p>
            </div>
            <p class="diploma-description">${diploma.description}</p>
            <div class="diploma-preview">
                <div class="diploma-image-placeholder">
                    <i class="fas fa-certificate"></i>
                    <p>Diploma Preview</p>
                    <p class="diploma-filename">${diploma.image}</p>
                </div>
            </div>
            <button class="btn btn-primary" onclick="downloadDiploma('${diplomaId}')">
                <i class="fas fa-download"></i>
                Download Diploma
            </button>
        </div>
    `;
    
    diplomaModal.style.display = 'block';
}

function downloadDiploma(diplomaId) {
    showNotification('Diploma download started!', 'success');
    // In a real implementation, this would download the actual PDF
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
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
    
    .project-modal h2,
    .diploma-modal h2 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }
    
    .project-category,
    .diploma-info {
        color: var(--accent-primary);
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    .project-description,
    .diploma-description {
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
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .gallery-item {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 2rem 1rem;
        color: var(--text-muted);
        font-size: 0.9rem;
    }
    
    .diploma-image-placeholder {
        text-align: center;
        padding: 3rem;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        margin-bottom: 2rem;
    }
    
    .diploma-image-placeholder i {
        font-size: 3rem;
        color: var(--accent-primary);
        margin-bottom: 1rem;
    }
    
    .diploma-filename {
        font-size: 0.9rem;
        color: var(--text-muted);
        margin-top: 0.5rem;
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
