// JavaScript para Portafolio de Ernesto Ramos

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================
    // Efecto de Navbar al hacer scroll
    // =============================================
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Ejecutar al cargar y en cada scroll
    updateNavbar();
    window.addEventListener('scroll', updateNavbar);
    
    
    // =============================================
    // Botón "Volver arriba"
    // =============================================
    const backToTop = document.querySelector('.back-to-top');
    
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    }
    
    // Configurar evento de click
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Ejecutar al cargar y en cada scroll
    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop);
    
    
    // =============================================
    // Scroll suave para enlaces internos
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Excluir el botón "volver arriba" que ya tiene su propio manejo
            if (this.classList.contains('back-to-top')) return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar el menú móvil si está abierto
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        });
    });
    
    
    // =============================================
    // Animaciones al hacer scroll (fade-in)
    // =============================================
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in:not(.animated)');
        const windowHeight = window.innerHeight;
        const triggerOffset = 100; // Pixeles antes de que aparezca el elemento
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - triggerOffset) {
                element.classList.add('animated');
            }
        });
    }
    
    // Ejecutar al cargar y en cada scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    
    // =============================================
    // Inicialización de componentes de Bootstrap
    // =============================================
    
    // ScrollSpy para resaltar la sección actual en el navbar
    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '.navbar',
        offset: 100
    });
    
    // Configuración del carrusel de testimonios
    const testimonialCarousel = new bootstrap.Carousel('#testimonialCarousel', {
        interval: 5000, // Cambiar cada 5 segundos
        pause: 'hover', // Pausar cuando el mouse está sobre el carrusel
        wrap: true // Volver al inicio después del último elemento
    });
    
    
    // =============================================
    // Manejo del formulario de contacto (si existe)
    // =============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validación básica
            if (!name || !email || !message) {
                showAlert('Por favor completa todos los campos.', 'danger');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Por favor ingresa un correo electrónico válido.', 'danger');
                return;
            }
            
            // Simular envío (en un caso real, aquí harías una petición AJAX)
            showAlert(`Gracias por tu mensaje, ${name}! Me pondré en contacto contigo pronto.`, 'success');
            this.reset();
        });
    }
    
    // Función para mostrar alertas
    function showAlert(message, type) {
        // Crear elemento de alerta
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Insertar después del formulario
        if (contactForm) {
            contactForm.appendChild(alertDiv);
            
            // Eliminar después de 5 segundos
            setTimeout(() => {
                const bsAlert = new bootstrap.Alert(alertDiv);
                bsAlert.close();
            }, 5000);
        } else {
            // Si no hay formulario, mostrar un alert simple
            alert(message);
        }
    }
    
    // Función para validar email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    
    // =============================================
    // Efecto hover para las tarjetas de proyecto
    // =============================================
    document.querySelectorAll('.project-card').forEach(card => {
        const img = card.querySelector('.project-img');
        const overlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
            overlay.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            overlay.style.opacity = '0';
        });
    });
    
    
    // =============================================
    // Inicialización de tooltips (si los usas)
    // =============================================
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});