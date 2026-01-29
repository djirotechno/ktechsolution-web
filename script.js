// ===========================
// Mobile Menu Toggle
// ===========================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ===========================
// Active Navigation Link on Scroll
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===========================
// Navbar Background on Scroll
// ===========================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 18, 25, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 18, 25, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// ===========================
// Smooth Scroll Enhancement
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.about-card, .service-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Get the submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="animation: spin 1s linear infinite;">
            <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/>
            <path d="M10 2C5.58172 2 2 5.58172 2 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Envoi en cours...
    `;
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.25 5L7.5 13.75L3.75 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Message envoyé !
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);

        // Log form data (in production, send to backend)
        console.log('Form submitted:', data);

        // Show alert
        showNotification('Merci ! Nous vous contacterons bientôt.', 'success');
    }, 1500);
});

// ===========================
// Notification System
// ===========================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(42, 187, 155, 0.9)'};
        color: white;
        border-radius: 0.75rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
        font-weight: 500;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===========================
// Parallax Effect for Hero Orbs
// ===========================
window.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===========================
// Counter Animation for Stats
// ===========================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const number = entry.target.querySelector('.stat-number');
            const targetValue = parseInt(number.textContent);
            animateCounter(number, targetValue);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ===========================
// Service Card Tilt Effect
// ===========================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

console.log('🚀 KTECHSOLUTION website loaded successfully!');


// ===========================
// Shopping Cart Logic
// ===========================

// State
let cart = JSON.parse(localStorage.getItem('ktech_cart')) || [];
const cartIcon = document.getElementById('cartIcon');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalAmount = document.getElementById('cartTotalAmount');
const cartCountElement = document.querySelector('.cart-count');
const btnCheckout = document.getElementById('btnCheckout');

// Selectors for Checkout
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutTotalAmount = document.getElementById('checkoutTotalAmount');

// Toggle Cart Sidebar
function toggleCart() {
    const isOpen = cartSidebar.classList.contains('active');
    if (isOpen) {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    } else {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderCart();
    }
}

if (cartIcon) {
    cartIcon.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) cartCountElement.textContent = count;
    localStorage.setItem('ktech_cart', JSON.stringify(cart));
}

// Format Price (Helper)
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA";
}

// Parse Price (Helper)
function parsePrice(priceString) {
    return parseInt(priceString.replace(/\D/g, ''));
}

// Add Item to Cart
function addToCart(product) {
    const existing = cart.find(item => item.name === product.name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    updateCartCount();
    renderCart(); // Re-render if open

    // Show visual feedback (already implemented in notification system)
}

// Remove Item
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
}

// Update Quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartCount();
    renderCart();
}

// Render Cart Items
function renderCart() {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Votre panier est vide</div>';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            // Note: In a real app we would have the image URL. Here we'll use a placeholder or check if SVG string was passed (complex)
            // For this demo, we'll just show name and details
            itemEl.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${formatPrice(item.price)}</p>
                    <div class="cart-item-controls">
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">&times;</button>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
    }

    if (cartTotalAmount) cartTotalAmount.textContent = formatPrice(total);
    if (checkoutTotalAmount) checkoutTotalAmount.textContent = formatPrice(total);
}

// Hook up "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', () => {
    // We override local scope logic with global listeners
    const addRefBtns = document.querySelectorAll('.btn-add-cart');
    addRefBtns.forEach(btn => {
        // Clone to remove old listeners if any to avoid duplicates
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', function () {
            const productItem = this.closest('.product-item');
            const name = productItem.querySelector('.product-name').textContent;
            const priceStr = productItem.querySelector('.price-amount').textContent;

            addToCart({
                name: name,
                price: parsePrice(priceStr),
                quantity: 1
            });

            // Trigger notification
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.textContent = `✓ ${name} ajouté au panier !`;
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, #2abb9b, #1a8f7a);
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(42, 187, 155, 0.3);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        });
    });

    updateCartCount();
});


// ===========================
// Checkout Logic
// ===========================

if (btnCheckout) {
    btnCheckout.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Votre panier est vide");
            return;
        }
        toggleCart(); // Close cart
        if (checkoutModal) checkoutModal.classList.add('active'); // Open modal
    });
}

if (closeCheckout) {
    closeCheckout.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
    });
}

if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show loading
        const btn = checkoutForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Traitement en cours...';
        btn.disabled = true;

        setTimeout(() => {
            // Success
            checkoutModal.classList.remove('active');
            cart = [];
            updateCartCount();
            renderCart();

            // Show Success Alert
            const successOverlay = document.createElement('div');
            successOverlay.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 20000;
                animation: fadeIn 0.3s ease;
            `;
            successOverlay.innerHTML = `
                <div style="background: var(--dark-900); padding: 40px; border-radius: 20px; text-align: center; border: 1px solid var(--primary-500); max-width: 90%;">
                    <div style="font-size: 60px; margin-bottom: 20px;">🎉</div>
                    <h2 style="color: var(--white); margin-bottom: 10px;">Commande Confirmée !</h2>
                    <p style="color: var(--gray-300);">Merci pour votre confiance. Vous recevrez un SMS de confirmation.</p>
                    <button id="closeSuccess" style="margin-top: 20px;" class="btn btn-primary">Fermer</button>
                </div>
            `;
            document.body.appendChild(successOverlay);

            document.getElementById('closeSuccess').addEventListener('click', () => {
                successOverlay.remove();
                btn.innerHTML = originalText;
                btn.disabled = false;
                checkoutForm.reset();
            });

        }, 2000);
    });
}

// Make functions global for inline onclick
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
