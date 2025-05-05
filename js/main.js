$(document).ready(function() {
    // Navbar scroll effect (jQuery)
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
        
        // Back to top button (jQuery)
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('active');
        } else {
            $('.back-to-top').removeClass('active');
        }
    });
    
    // Smooth scrolling for anchor links (jQuery)
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 70,
            },
            500,
            'linear'
        );
    });
    
    // Back to top button (jQuery)
    $('.back-to-top').on('click', function() {
        $('html, body').animate({scrollTop: 0}, 'slow');
        return false;
    });
    
    // Form submission (jQuery)
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();
        
        // Simple validation
        if (name === '' || email === '' || message === '') {
            alert('Por favor completa todos los campos.');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show a success message
        alert('Gracias por tu mensaje, ' + name + '! Me pondré en contacto contigo pronto.');
        
        // Reset form
        $('#contactForm')[0].reset();
    });
    
    // Animation on scroll (jQuery)
    function animateOnScroll() {
        $('.fade-in').each(function() {
            var position = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            
            if (scroll + windowHeight > position + 100) {
                $(this).addClass('animated');
            }
        });
    }
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    $(window).on('scroll', function() {
        animateOnScroll();
    });
});