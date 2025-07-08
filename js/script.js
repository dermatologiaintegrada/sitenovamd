/**
 * MD Dermatologia Integrada - Main JavaScript File
 * Handles all interactive functionality for the website
 */

// Site Configuration
let siteConfig = {};

// DOM Elements
const elements = {
    loading: document.getElementById('loading'),
    navbar: document.getElementById('navbar'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileMenu: document.getElementById('mobile-menu'),
    teamGrid: document.getElementById('team-grid'),
    clinicDescription: document.getElementById('clinic-description'),
    gallery: document.getElementById('gallery'),
    galleryIndicators: document.getElementById('gallery-indicators'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    servicesGrid: document.getElementById('services-grid'),
    whatsappFloat: document.getElementById('whatsapp-float')
};

// Gallery State
let currentGalleryIndex = 0;
let galleryImages = [];
let galleryInterval;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadConfiguration()
        .then(() => {
            initializeComponents();
            hideLoading();
        })
        .catch(error => {
            console.error('Error loading configuration:', error);
            hideLoading();
        });
});

/**
 * Load site configuration from JSON file
 */
async function loadConfiguration() {
    try {
        const response = await fetch('data/config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        siteConfig = await response.json();
        console.log('Configuration loaded successfully');
    } catch (error) {
        console.error('Failed to load configuration:', error);
        // Fallback configuration
        siteConfig = {
            equipe: [],
            clinica: { descricao: 'Carregando informações...', galeria: [] },
            atuacao: {}
        };
    }
}

/**
 * Initialize all website components
 */
function initializeComponents() {
    initializeNavigation();
    initializeScrollEffects();
    initializeTeamSection();
    initializeClinicSection();
    initializeServicesSection();
    initializeAnimations();
    initializeAccessibility();
    
    // **ADICIONE ESTA LINHA:** Dispara o evento de scroll uma vez no carregamento
    // Isso forçará a lógica do scroll a ser executada no início,
    // corrigindo a visibilidade do botão do WhatsApp
    window.dispatchEvent(new Event('scroll'));
}

/**
 * Hide loading screen
 */
function hideLoading() {
    if (elements.loading) {
        elements.loading.style.opacity = '0';
        setTimeout(() => {
            elements.loading.style.display = 'none';
        }, 500);
    }
}

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    // Mobile menu toggle
    if (elements.mobileMenuBtn && elements.mobileMenu) {
        elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (elements.mobileMenu && elements.mobileMenu.classList.contains('show')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', updateActiveNavigation);
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    if (elements.mobileMenu) {
        elements.mobileMenu.classList.toggle('hidden');
        elements.mobileMenu.classList.toggle('show');
        
        // Update hamburger icon
        const icon = elements.mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    }
}

/**
 * Update active navigation based on scroll position
 */
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize scroll effects
 */
function initializeScrollEffects() {
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (elements.navbar) {
            if (window.scrollY > 50) {
                elements.navbar.classList.add('shadow-lg');
                elements.navbar.style.backgroundColor = '#e9e6e6';
                elements.navbar.style.backdropFilter = 'blur(10px)';
            } else {
                elements.navbar.classList.remove('shadow-lg');
                elements.navbar.style.backgroundColor = '#e9e6e6'; // Novo fundo sem scroll
                elements.navbar.style.backdropFilter = 'none'; // Mantenha ou remova o none
                
            }
        }
    });

    // WhatsApp float button show/hide
    window.addEventListener('scroll', function() {
        if (elements.whatsappFloat) {
            if (window.scrollY > 300) {
                elements.whatsappFloat.style.opacity = '1';
                elements.whatsappFloat.style.visibility = 'visible';
            } else {
                elements.whatsappFloat.style.opacity = '0';
                elements.whatsappFloat.style.visibility = 'hidden';
            }
        }
    });
}

/**
 * Initialize team section
 */
function initializeTeamSection() {
    if (!elements.teamGrid || !siteConfig.equipe) return;

    elements.teamGrid.innerHTML = '';

    siteConfig.equipe.forEach((member, index) => {
        const teamCard = createTeamCard(member, index);
        elements.teamGrid.appendChild(teamCard);
    });
}

/**
 * Create team member card
 */
function createTeamCard(member, index) {
    const card = document.createElement('div');
    card.className = 'team-card bg-white rounded-lg shadow-lg overflow-hidden';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 100).toString());

    card.innerHTML = `
        <div class="relative overflow-hidden">
            <img src="${member.foto}" alt="${member.nome}" class="w-full object-cover">
            <div class="absolute inset-0 bg-primary-600 bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
        </div>
        <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-2">${member.nome}</h3>
            <p class="text-primary-600 font-semibold mb-2">${member.especialidade}</p>
            <p class="text-sm text-gray-600 mb-3">${member.crm}</p>
            <div class="text-gray-700 text-sm leading-relaxed">${member.bio}</div> 
        </div>
    `;

    return card;
}

/**
 * Initialize clinic section
 */
function initializeClinicSection() {
    // Load clinic description
    if (elements.clinicDescription && siteConfig.clinica) {
        const paragraphs = siteConfig.clinica.descricao.split('\n\n');
        const formattedText = paragraphs.map(p => `<p class="mb-4">${p}</p>`).join('');
        elements.clinicDescription.innerHTML = formattedText;
    }

    // Initialize gallery
    if (siteConfig.clinica && siteConfig.clinica.galeria) {
        galleryImages = siteConfig.clinica.galeria;
        initializeGallery();
    }
}

/**
 * Initialize image gallery
 */
function initializeGallery() {
    if (!elements.gallery || galleryImages.length === 0) return;

    // Create gallery items
    elements.gallery.innerHTML = '';
    galleryImages.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${image}" alt="Clínica MD Dermatologia - Imagem ${index + 1}" loading="lazy">`;
        elements.gallery.appendChild(item);
    });

    // Create indicators
    if (elements.galleryIndicators) {
        elements.galleryIndicators.innerHTML = '';
        galleryImages.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `gallery-indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToGallerySlide(index));
            elements.galleryIndicators.appendChild(indicator);
        });
    }

    // Gallery controls
    if (elements.prevBtn) {
        elements.prevBtn.addEventListener('click', previousGallerySlide);
    }
    if (elements.nextBtn) {
        elements.nextBtn.addEventListener('click', nextGallerySlide);
    }

    // Auto-play gallery
    startGalleryAutoplay();

    // Pause on hover
    elements.gallery.addEventListener('mouseenter', stopGalleryAutoplay);
    elements.gallery.addEventListener('mouseleave', startGalleryAutoplay);
}

/**
 * Go to specific gallery slide
 */
function goToGallerySlide(index) {
    currentGalleryIndex = index;
    updateGalleryPosition();
    updateGalleryIndicators();
}

/**
 * Go to next gallery slide
 */
function nextGallerySlide() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    updateGalleryPosition();
    updateGalleryIndicators();
}

/**
 * Go to previous gallery slide
 */
function previousGallerySlide() {
    currentGalleryIndex = currentGalleryIndex === 0 ? galleryImages.length - 1 : currentGalleryIndex - 1;
    updateGalleryPosition();
    updateGalleryIndicators();
}

/**
 * Update gallery position
 */
function updateGalleryPosition() {
    if (elements.gallery) {
        const translateX = -currentGalleryIndex * 100;
        elements.gallery.style.transform = `translateX(${translateX}%)`;
    }
}

/**
 * Update gallery indicators
 */
function updateGalleryIndicators() {
    if (elements.galleryIndicators) {
        const indicators = elements.galleryIndicators.querySelectorAll('.gallery-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentGalleryIndex);
        });
    }
}

/**
 * Start gallery autoplay
 */
function startGalleryAutoplay() {
    stopGalleryAutoplay();
    galleryInterval = setInterval(nextGallerySlide, 5000);
}

/**
 * Stop gallery autoplay
 */
function stopGalleryAutoplay() {
    if (galleryInterval) {
        clearInterval(galleryInterval);
        galleryInterval = null;
    }
}

/**
 * Initialize services section
 */
function initializeServicesSection() {
    if (!elements.servicesGrid || !siteConfig.atuacao) return;

    elements.servicesGrid.innerHTML = '';

    const services = [
        {
            key: 'estetica',
            // icon: 'fas fa-spa', // Linha removida
            // color: 'bg-pink-500' // Linha removida
        },
        {
            key: 'clinica',
            // icon: 'fas fa-stethoscope', // Linha removida
            // color: 'bg-blue-500' // Linha removida
        },
        {
            key: 'cirurgica',
            // icon: 'fas fa-scalpel', // Linha removida
            // color: 'bg-green-500' // Linha removida
        }
    ];

    services.forEach((service, index) => {
        const serviceData = siteConfig.atuacao[service.key];
        if (serviceData) {
            const serviceCard = createServiceCard(serviceData, service, index);
            elements.servicesGrid.appendChild(serviceCard);
        }
    });

    // Add event listeners for procedure tags
    addProcedureEventListeners();
}

/**
 * Add event listeners for procedure tags
 */
function addProcedureEventListeners() {
    const procedureTags = document.querySelectorAll('.procedure-tag[data-procedure]');
    
    procedureTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const procedureName = this.getAttribute('data-procedure');
            const serviceName = this.getAttribute('data-service');
            showProcedureDetails(serviceName, procedureName);
        });
    });
}

/**
 * Show procedure details
 */
function showProcedureDetails(serviceName, procedureName) {
    const serviceData = siteConfig.atuacao[serviceName];
    if (!serviceData || !serviceData.procedimentos[procedureName]) return;

    const detailsContainer = document.getElementById(`procedure-details-${serviceName}`);
    const titleElement = document.getElementById(`procedure-title-${serviceName}`);
    const descriptionElement = document.getElementById(`procedure-description-${serviceName}`);

    if (detailsContainer && titleElement && descriptionElement) {
        titleElement.textContent = procedureName;
        descriptionElement.textContent = serviceData.procedimentos[procedureName];
        
        // Hide other procedure details first
        document.querySelectorAll('.procedure-details').forEach(el => el.classList.add('hidden'));
        
        // Show current procedure details
        detailsContainer.classList.remove('hidden');
        
        // Smooth scroll to the details
        detailsContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }
}

/**
 * Hide procedure details
 */
function hideProcedureDetails(serviceName) {
    const detailsContainer = document.getElementById(`procedure-details-${serviceName}`);
    if (detailsContainer) {
        detailsContainer.classList.add('hidden');
    }
}

/**
 * Create service card
 */
function createServiceCard(serviceData, serviceConfig, index) {
    const card = document.createElement('div');
    card.className = 'service-card bg-white rounded-lg shadow-lg p-8 h-full';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 100).toString());

    // Check if procedimentos is an object or array
    const proceduresHtml = typeof serviceData.procedimentos === 'object' && !Array.isArray(serviceData.procedimentos)
        ? Object.keys(serviceData.procedimentos).map(proc => 
            `<span class="procedure-tag inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2 cursor-pointer hover:bg-primary-100 hover:text-primary-700 transition-all duration-300" data-procedure="${proc}" data-service="${serviceConfig.key}">${proc}</span>`
        ).join('')
        : serviceData.procedimentos.map(proc => 
            `<span class="procedure-tag inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">${proc}</span>`
        ).join('');

    card.innerHTML = `
        <div class="text-center mb-6">
            <div class="service-icon-circle-custom w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                </div>
            <h3 class="text-2xl font-bold text-gray-800">${serviceData.titulo}</h3> 
        </div>
        <p class="text-gray-600 mb-6">${serviceData.descricao}</p>
        <div class="space-y-2">
            <h4 class="font-semibold text-gray-800 mb-3">Procedimentos:</h4>
            <div class="flex flex-wrap">
                ${proceduresHtml}
            </div>
        </div>
        <div id="procedure-details-${serviceConfig.key}" class="procedure-details mt-6 hidden">
            <div class="bg-light-gray-custom p-4 rounded-lg">
                <h5 class="font-semibold text-primary-700 mb-2" id="procedure-title-${serviceConfig.key}"></h5>
                <p class="text-gray-700 text-sm leading-relaxed" id="procedure-description-${serviceConfig.key}"></p>
                <button class="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium" onclick="hideProcedureDetails('${serviceConfig.key}')">
                    <i class="fas fa-times mr-1"></i> Fechar
                </button>
            </div>
        </div>
    `;

    return card;
}

/**
 * Initialize animations
 */
function initializeAnimations() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }

    // Add entrance animations to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.team-card, .service-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize accessibility features
 */
function initializeAccessibility() {
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && elements.mobileMenu && elements.mobileMenu.classList.contains('show')) {
            toggleMobileMenu();
        }

        // Arrow keys for gallery navigation
        if (e.key === 'ArrowLeft') {
            previousGallerySlide();
        } else if (e.key === 'ArrowRight') {
            nextGallerySlide();
        }
    });

    // Focus management for mobile menu
    if (elements.mobileMenuBtn) {
        elements.mobileMenuBtn.addEventListener('click', function() {
            setTimeout(() => {
                if (elements.mobileMenu && elements.mobileMenu.classList.contains('show')) {
                    const firstLink = elements.mobileMenu.querySelector('a');
                    if (firstLink) firstLink.focus();
                }
            }, 100);
        });
    }

    // Skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded';
    skipLink.textContent = 'Pular para o conteúdo principal';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Utility Functions
 */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
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

// Error handling for fetch requests
function handleFetchError(error) {
    console.error('Fetch error:', error);
    // Could show user-friendly error message here
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
    }
}

// Initialize performance monitoring
measurePerformance();

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(registrationError => console.log('SW registration failed:', registrationError));
    });
}
