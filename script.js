/* --- 1. SPARKLE CURSOR EFFECT --- */
document.addEventListener('mousemove', function(e) { createSparkle(e.pageX, e.pageY); });
document.addEventListener('touchmove', function(e) { 
    if (e.touches.length > 0) { createSparkle(e.touches[0].pageX, e.touches[0].pageY); }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('span');
    sparkle.classList.add('sparkle');
    sparkle.innerText = '★'; 
    document.body.appendChild(sparkle);
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    const colors = ['#9b9797ff']; 
    sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 20 + 10; 
    sparkle.style.fontSize = size + 'px';
    setTimeout(() => { sparkle.remove(); }, 1000);
}

/* --- 2. TYPING ANIMATION --- */
const texts = ["Web Developer", "Confident Speaker", "Passionate Learner"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    if (count === texts.length) { count = 0; }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    const typeEffect = document.querySelector(".type-effect");
    if (typeEffect) { typeEffect.textContent = letter; }
    if (letter.length === currentText.length) {
        count++; index = 0; setTimeout(type, 2000);
    } else { setTimeout(type, 100); }
})();

/* --- 3. SWIPER & MAIN LOGIC --- */
document.addEventListener("DOMContentLoaded", function() {

    // Initialize Swiper
    var swiper = new Swiper(".mySwiper", {
        effect: "cube",
        grabCursor: true, // Note: grabCursor can sometimes interfere with clicks
        cubeEffect: {
            shadow: true, slideShadows: true, shadowOffset: 20, shadowScale: 0.94,
        },
        direction: 'horizontal',
        speed: 1000,
        mousewheel: true,
    });

    // Navigation & Sidebar
    const navLinks = document.querySelectorAll(".nav-link");
    const nav = document.querySelector(".nav");
    const navToggler = document.querySelector(".nav-toggler");

    if(navToggler) {
        navToggler.addEventListener("click", () => {
            nav.classList.toggle("open");
            navToggler.classList.toggle("open");
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const index = this.getAttribute("data-index");
            swiper.slideTo(index);
            if (nav.classList.contains("open")) {
                nav.classList.remove("open");
                if(navToggler) navToggler.classList.remove("open");
            }
        });
    });

    const actionBtns = document.querySelectorAll(".btn[data-index]");
    actionBtns.forEach((btn) => {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            const index = this.getAttribute("data-index");
            swiper.slideTo(index);
        });
    });

    swiper.on('slideChange', function () {
        navLinks.forEach(navItem => navItem.classList.remove("active"));
        if(navLinks[swiper.activeIndex]){
            navLinks[swiper.activeIndex].classList.add("active");
        }
    });

    /* --- TSPARTICLES --- */
    if(typeof tsParticles !== "undefined"){
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.9, random: false },
                size: { value: 4, random: true },
                line_linked: { enable: true, distance: 150, color: "#34d399", opacity: 0.9, width: 2 },
                move: { enable: true, speed: 2, direction: "none", out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
                modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
            },
            retina_detect: true,
            background: { color: "transparent", position: "50% 50%", repeat: "no-repeat", size: "cover" }
        });
    }

    /* --- 4. IMAGE MODAL LOGIC (Improved for Single Click) --- */
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalLinkBtn = document.getElementById("modalLinkBtn");
    const closeModal = document.querySelector(".close-btn");
    
    // We attach listener to document to handle elements dynamically if needed, 
    // or just direct iteration. Ensuring no conflict with Swiper drag.
    const galleryItems = document.querySelectorAll(".gallery-item");
    
    galleryItems.forEach(item => {
        item.addEventListener("click", function(e) {
            // Stop propagation to prevent Swiper from thinking this is a drag
            e.stopPropagation(); 
            
            const imgSrc = this.getAttribute("data-src");
            const itemType = this.getAttribute("data-type");
            let link = null;

            if (itemType === "project") {
                link = this.getAttribute("data-link");
                modalLinkBtn.textContent = "Visit Live Site";
            } else if (itemType === "certificate") {
                link = this.getAttribute("data-certificate-url");
                modalLinkBtn.textContent = "Verify Certificate";
            }

            modalImage.src = imgSrc;
            
            if (link && link !== "#" && link !== "") {
                modalLinkBtn.href = link;
                modalLinkBtn.style.display = 'inline-block';
            } else {
                modalLinkBtn.style.display = 'none';
            }

            modal.style.display = "block";
        });
    });

    closeModal.addEventListener("click", () => { modal.style.display = "none"; });
    window.addEventListener("click", (event) => { if (event.target === modal) { modal.style.display = "none"; } });

    /* --- 5. EMAILJS & HEART BURST ANIMATION --- */
    
    const contactForm = document.getElementById('contactForm');
    const thankYouPopup = document.getElementById('thankYouPopup');
    const closePopupBtn = document.getElementById('closePopupBtn');

    if(contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // SEND EMAIL VIA EMAILJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual values from EmailJS
            emailjs.sendForm('service_mhcyt0o', 'template_ol1pxdj', this)
                .then(function() {
                    console.log('SUCCESS!');
                    // Trigger Effects
                    triggerHeartBurst();
                    thankYouPopup.style.display = 'flex';
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    alert("Failed to send message. Please try again later.");
                });
        });
    }

    if(closePopupBtn) {
        closePopupBtn.addEventListener('click', function() {
            thankYouPopup.style.display = 'none';
        });
    }

    function triggerHeartBurst() {
        const container = document.getElementById('heart-container');
        const colors = ['#ff4d4d', '#ff9999', '#ff0000', '#34d399', '#ffffff'];
        const totalHearts = 50; // Number of hearts

        for (let i = 0; i < totalHearts; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart-particle');
            heart.innerHTML = '❤️';
            
            // Random direction logic
            const angle = Math.random() * Math.PI * 2; // Random angle 0 to 360
            const velocity = Math.random() * 200 + 100; // Random distance
            
            const tx = Math.cos(angle) * velocity + 'px';
            const ty = Math.sin(angle) * velocity + 'px';
            
            heart.style.setProperty('--tx', tx);
            heart.style.setProperty('--ty', ty);
            
            // Random size and rotation
            const size = Math.random() * 20 + 10;
            heart.style.fontSize = size + 'px';
            heart.style.transform = `rotate(${Math.random() * 360}deg)`;

            container.appendChild(heart);

            // Remove element after animation finishes
            setTimeout(() => {
                heart.remove();
            }, 1500);
        }
    }

});