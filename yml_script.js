// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Toggle hamburger menu animation
            const hamburgers = mobileMenuToggle.querySelectorAll('.hamburger');
            hamburgers.forEach((hamburger, index) => {
                if (mobileMenu.classList.contains('active')) {
                    if (index === 0) {
                        hamburger.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    } else if (index === 1) {
                        hamburger.style.opacity = '0';
                    } else if (index === 2) {
                        hamburger.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    }
                } else {
                    hamburger.style.transform = 'none';
                    hamburger.style.opacity = '1';
                }
            });
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                
                // Reset hamburger menu
                const hamburgers = mobileMenuToggle.querySelectorAll('.hamburger');
                hamburgers.forEach(hamburger => {
                    hamburger.style.transform = 'none';
                    hamburger.style.opacity = '1';
                });
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
                
                // Reset hamburger menu
                const hamburgers = mobileMenuToggle.querySelectorAll('.hamburger');
                hamburgers.forEach(hamburger => {
                    hamburger.style.transform = 'none';
                    hamburger.style.opacity = '1';
                });
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }
    
    // Enhanced donation functionality
    initializeDonationInteractions();
    
    function initializeDonationInteractions() {
        // Handle clickable impact items
        const clickableImpacts = document.querySelectorAll('.clickable-impact');
        clickableImpacts.forEach(item => {
            item.addEventListener('click', function() {
                const amount = this.getAttribute('data-amount');
                donateWithAmount(amount);
            });
            
            // Add hover effects
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
        
        // Handle custom amount input
        const customInput = document.getElementById('customDonationAmount');
        if (customInput) {
            customInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    donateCustomAmount();
                }
            });
        }
    }
    
    // Global functions for donation interactions
    window.donateWithAmount = function(amount) {
        if (!amount || amount <= 0) {
            alert('Invalid donation amount.');
            return;
        }
        
        // Create and submit PayPal form with specific amount
        const form = document.createElement('form');
        form.action = 'https://www.paypal.com/donate';
        form.method = 'post';
        form.target = '_blank';
        
        // Add PayPal parameters
        const params = {
            'business': 'alam.naiyer@gmail.com',
            'currency_code': 'USD',
            'item_name': 'Young Muslim Leadership Program Donation',
            'amount': amount
        };
        
        Object.keys(params).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = params[key];
            form.appendChild(input);
        });
        
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    };
    
    window.donateCustomAmount = function() {
        const customInput = document.getElementById('customDonationAmount');
        const amount = customInput?.value;
        
        if (!amount || amount <= 0) {
            alert('Please enter a valid donation amount.');
            return;
        }
        
        donateWithAmount(amount);
    };
});