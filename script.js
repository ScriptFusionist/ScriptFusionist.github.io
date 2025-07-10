const darkModeToggle = document.getElementById("darkModeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
const scrollTopBtn = document.getElementById("scrollTop");
const typingElement = document.getElementById("typing");
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const submitText = document.getElementById("submitText");
const loadingSpinner = document.getElementById("loadingSpinner");
const emailNotification = document.getElementById("emailNotification");
const skillProgressBars = document.querySelectorAll(".skill-progress");
const sections = document.querySelectorAll("section");
const sectionTitles = document.querySelectorAll(".section-title");
const aboutList = document.querySelector(".about-list");
const aboutImg = document.querySelector(".about-img");
const skillCards = document.querySelectorAll(".skill-card");
const projectCards = document.querySelectorAll(".project-card");
const contactDetails = document.querySelectorAll(".contact-detail");
const formGroups = document.querySelectorAll(".form-group");
const particlesContainer = document.getElementById("particles");
const navbar = document.querySelector(".navbar");

let lastScrollY = window.scrollY;
const texts = ["Web Developer", "AI Enthusiast", "Tech Enthusiast"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function createParticles() {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.animation = `float ${animationDuration}s linear ${animationDelay}s infinite`;
        particlesContainer.appendChild(particle);
    }
}

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode") ? "enabled" : "disabled"
    );
});

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

function closeMenu() {
    navLinks.classList.add("closing");
    setTimeout(() => {
        navLinks.classList.remove("active");
        navLinks.classList.remove("closing");
        menuToggle.classList.remove("active");
        document.body.style.overflow = "auto";
    }, 0);
}

menuToggle.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
        closeMenu();
    } else {
        navLinks.classList.add("active");
        menuToggle.classList.add("active");
        document.body.style.overflow = "hidden";
    }
});

document.addEventListener("click", e => {
    const isClickInsideNav = navbar.contains(e.target);
    const isClickOnMenuToggle = menuToggle.contains(e.target);
    if (
        !isClickInsideNav &&
        !isClickOnMenuToggle &&
        navLinks.classList.contains("active")
    ) {
        closeMenu();
    }
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => closeMenu());
});

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    navbar.classList.toggle("scrolled", currentScrollY > 50);
    navbar.classList.toggle(
        "hide",
        currentScrollY > lastScrollY && currentScrollY > 100
    );
    scrollTopBtn.classList.toggle("active", window.scrollY > 500);
    lastScrollY = currentScrollY;
    animateOnScroll();
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target)
            window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
    });
});

function typeText() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    setTimeout(typeText, typingSpeed);
}

function animateOnScroll() {
    sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight * 0.8) {
            section.classList.add("animated");
        }
    });

    sectionTitles.forEach(title => {
        if (title.getBoundingClientRect().top < window.innerHeight * 0.8) {
            title.classList.add("animate");
        }
    });

    if (
        aboutList &&
        aboutList.getBoundingClientRect().top < window.innerHeight * 0.8
    ) {
        aboutList.classList.add("animate");
    }

    if (
        aboutImg &&
        aboutImg.getBoundingClientRect().top < window.innerHeight * 0.8
    ) {
        aboutImg.classList.add("animate");
    }

    skillCards.forEach((card, index) => {
        if (card.getBoundingClientRect().top < window.innerHeight * 0.8) {
            setTimeout(() => card.classList.add("animate"), index * 100);
        }
    });

    projectCards.forEach((card, index) => {
        if (card.getBoundingClientRect().top < window.innerHeight * 0.8) {
            setTimeout(() => card.classList.add("animate"), index * 150);
        }
    });

    contactDetails.forEach((detail, index) => {
        if (detail.getBoundingClientRect().top < window.innerHeight * 0.8) {
            setTimeout(() => detail.classList.add("animate"), index * 100);
        }
    });

    formGroups.forEach((group, index) => {
        if (group.getBoundingClientRect().top < window.innerHeight * 0.8) {
            setTimeout(() => group.classList.add("animate"), index * 100);
        }
    });

    skillProgressBars.forEach(bar => {
        const rect = bar.parentElement.parentElement.getBoundingClientRect();
        if (
            rect.top < window.innerHeight &&
            rect.bottom >= 0 &&
            bar.dataset.animated !== "true"
        ) {
            bar.style.width = `${bar.getAttribute("data-width")}%`;
            bar.dataset.animated = "true";
        }
    });
}

contactForm.addEventListener("submit", e => {
    e.preventDefault();
    submitText.style.display = "none";
    loadingSpinner.style.display = "inline";
    submitBtn.disabled = true;
    emailjs
        .sendForm(
            "service_bcpqy4k",
            "template_4v8yd3a",
            e.target,
            "Roj5EFhl3hb9NaQum"
        )
        .then(() => showNotification("Message sent succesfully!", true))
        .catch(() =>
            showNotification(
                "Failed to send message. Please try again later",
                false
            )
        )
        .finally(() => {
            submitText.style.display = "inline";
            loadingSpinner.style.display = "none";
            submitBtn.disabled = false;
        });
});

function showNotification(message, isSuccess) {
    const messageElement = emailNotification.querySelector(".message");
    const iconElement = emailNotification.querySelector(".icon");
    messageElement.textContent = message;
    iconElement.innerHTML = isSuccess
        ? '<i class="fas fa-check-circle"></i>'
        : '<i class="fas fa-exclamation-circle"></i>';
    emailNotification.className = `notification ${
        isSuccess ? "success" : "error"
    } show`;
    setTimeout(() => emailNotification.classList.remove("show"), 5000);
}

document.addEventListener("DOMContentLoaded", () => {
    createParticles();
    animateOnScroll();
    document.getElementById("home").classList.add("animated");
    setTimeout(typeText, 1000);
});
