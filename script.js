/* --- 1. SPARKLE CURSOR EFFECT --- */

document.addEventListener('mousemove', function(e) {
    createSparkle(e.pageX, e.pageY);
});

document.addEventListener('touchmove', function(e) {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        createSparkle(touch.pageX, touch.pageY);
    }
});

document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        createSparkle(touch.pageX, touch.pageY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('span');
    sparkle.classList.add('sparkle');
    sparkle.innerText = '★'; 
    document.body.appendChild(sparkle);

    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';

    const colors = ['#9b9797ff']; 
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.color = randomColor;

    const size = Math.random() * 20 + 10; 
    sparkle.style.fontSize = size + 'px';

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

/* --- 2. TYPING ANIMATION --- */
const texts = ["Web Developer", " Confident Speaker", " Passionate Learner"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    const typeEffect = document.querySelector(".type-effect");
    if (typeEffect) {
        typeEffect.textContent = letter;
    }

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
    } else {
        setTimeout(type, 100);
    }
})();

/* --- 3. SWIPER & MENU --- */
document.addEventListener("DOMContentLoaded", function() {

    // Initialize Swiper
    var swiper = new Swiper(".mySwiper", {
        effect: "cube",
        grabCursor: true,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        direction: 'horizontal',
        speed: 1000,
        mousewheel: true,
    });

    const navLinks = document.querySelectorAll(".nav-link");
    const nav = document.querySelector(".nav");
    const navToggler = document.querySelector(".nav-toggler");

    // Toggle Sidebar
    if(navToggler) {
        navToggler.addEventListener("click", () => {
            nav.classList.toggle("open");
            navToggler.classList.toggle("open");
        });
    }

    // Handle Sidebar Links Click
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

    // --- NEW LOGIC: Handle Home Button Clicks (About & Contact) ---
    const actionBtns = document.querySelectorAll(".btn[data-index]");
    actionBtns.forEach((btn) => {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            const index = this.getAttribute("data-index");
            swiper.slideTo(index);
        });
    });

    // Update active state in sidebar when slide changes
    swiper.on('slideChange', function () {
        navLinks.forEach(navItem => navItem.classList.remove("active"));
        if(navLinks[swiper.activeIndex]){
            navLinks[swiper.activeIndex].classList.add("active");
        }
    });

    /* --- 4. TSPARTICLES LOAD --- */
    if(typeof tsParticles !== "undefined"){
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { 
                    value: 0.9, 
                    random: false 
                },
                size: { 
                    value: 4,
                    random: true 
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#34d399",
                    opacity: 0.9,
                    width: 2 
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true,
            background: {
                color: "transparent",
                position: "50% 50%",
                repeat: "no-repeat",
                size: "cover"
            }
        });
    }
});