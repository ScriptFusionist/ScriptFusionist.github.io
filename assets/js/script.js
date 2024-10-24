window.onscroll = function () {
  toggleScrollToTopBtn();
  toggleNavbarOpacity();
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleScrollToTopBtn() {
  const scrollTopBtn = document.getElementById("scrollToTopBtn");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
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
});

function toggleDarkMode() {
  const icon = document.getElementById('darkModeIcon');
  
  if (!isDarkMode) {
    icon.style.animation = "moonSet 1s forwards";
    setTimeout(() => {
      icon.classList.replace('fa-moon', 'fa-sun');
      icon.style.animation = "sunRise 1s forwards";
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    }, 1000);
  } else {
    icon.style.animation = "sunSet 1s forwards";
    setTimeout(() => {
      icon.classList.replace('fa-sun', 'fa-moon');
      icon.style.animation = "moonRise 1s forwards";
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
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
  card.addEventListener('click', function() {
    // Hapus kelas active dari semua card yang lain
    document.querySelectorAll('.activity-card').forEach(c => c.classList.remove('active'));
    
    // Tambahkan kelas active ke card yang di-click
    this.classList.add('active');
  });
});
