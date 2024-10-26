window.onscroll = function () {
  toggleScrollToTopBtn();
  toggleNavbarOpacity();
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleScrollToTopBtn() {
  const scrollTopBtn = document.getElementById("scrollToTopBtn");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
}

function toggleNavbarOpacity() {
  const navbar = document.querySelector(".navbar");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

let isDarkMode = localStorage.getItem('darkMode') === 'true';

document.addEventListener('DOMContentLoaded', () => {
  const icon = document.getElementById('darkModeIcon');
  
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    document.body.classList.remove('dark-mode');
    icon.classList.replace('fa-sun', 'fa-moon');
  }

  // Initialize hr animation observer
  const hiddenHr = document.querySelectorAll("hr");
  const hrObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        hrObserver.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, {
    threshold: 0.1
  });

  hiddenHr.forEach((hr) => {
    hrObserver.observe(hr);
  });
});

function toggleDarkMode() {
  const icon = document.getElementById('darkModeIcon');
  const hrElements = document.querySelectorAll("hr");

  hrElements.forEach(hr => {
    hr.classList.remove("animate");
    hr.classList.add("hidden");
  });

  if (!isDarkMode) {
    icon.style.animation = "moonSet 1s forwards";
    setTimeout(() => {
      icon.classList.replace('fa-moon', 'fa-sun');
      icon.style.animation = "sunRise 1s forwards";
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
      
      setTimeout(() => {
        hrElements.forEach(hr => {
          hr.classList.remove("hidden");
          hr.classList.add("animate");
        });
      }, 500);
    }, 1000);
  } else {
    icon.style.animation = "sunSet 1s forwards";
    setTimeout(() => {
      icon.classList.replace('fa-sun', 'fa-moon');
      icon.style.animation = "moonRise 1s forwards";
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
      
      setTimeout(() => {
        hrElements.forEach(hr => {
          hr.classList.remove("hidden");
          hr.classList.add("animate");
        });
      }, 500);
    }, 1000);
  }

  isDarkMode = !isDarkMode;
}

document.addEventListener("click", function (event) {
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navbarToggler = document.querySelector(".navbar-toggler");

  if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
      toggle: false,
    });
    bsCollapse.hide();

    if (navbarToggler.classList.contains("collapsed")) {
      navbarToggler.classList.remove("collapsed");
    }
  }
});

document.querySelector('.navbar-toggler').addEventListener('click', function() {
  this.classList.toggle('collapsed');
});

document.addEventListener("DOMContentLoaded", () => {
  const hiddenElements = document.querySelectorAll(".hidden");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  hiddenElements.forEach((element) => {
    observer.observe(element);
  });
});

document.querySelectorAll('.activity-card').forEach(card => {
  card.addEventListener('click', function(event) {
    event.stopPropagation();
    document.querySelectorAll('.activity-card').forEach(c => c.classList.remove('active'));
    this.classList.add('active');
  });
});

document.addEventListener('click', function() {
  document.querySelectorAll('.activity-card').forEach(c => c.classList.remove('active'));
});

// Quotes gaul dalam bahasa Indonesia
const quotes = [
  "Koding adalah seni ngelawan masalah yang kadang kita bikin sendiri.",
  "Debugger itu teman paling setia waktu ngoding, tapi musuh waktu lagi nge-chill.",
  "Pas kode udah bener, selalu inget ada error yang siap ngagetin.",
  "Koding itu perjalanan dari 'kok error mulu?' ke 'eh kok bisa bener?'"
];

let currentQuoteIndex = 0;

function changeQuote() {
  const quoteElement = document.getElementById("dailyQuote");
  // Fade out
  quoteElement.classList.add("fade-out");

  setTimeout(() => {
    // Change quote text
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    quoteElement.textContent = quotes[currentQuoteIndex];
    // Fade in
    quoteElement.classList.remove("fade-out");
  }, 1000); // Delay to match fade-out transition
}

// Optionally, auto-change quote every few seconds
setInterval(changeQuote, 10000); // Changes every 10 seconds


function animateSkills() {
  const skillsSection = document.querySelector('#skills');
  const progressBars = document.querySelectorAll('.progress-bar');

  // Check if skills section is visible in viewport
  if (skillsSection.getBoundingClientRect().top < window.innerHeight && skillsSection.getBoundingClientRect().bottom > 0) {
    // Add animation to each progress bar
    progressBars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-width');
    });
  }
}

// Trigger animation on scroll
window.addEventListener('scroll', animateSkills);

