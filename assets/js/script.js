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

let isDarkMode = false;

function toggleDarkMode() {
  const icon = document.getElementById('darkModeIcon');
  
  if (!isDarkMode) {
    // Animate moon setting
    icon.style.animation = "moonSet 1s forwards";
    setTimeout(() => {
      // Change icon to sun and animate rising
      icon.classList.replace('fa-moon', 'fa-sun');
      icon.style.animation = "sunRise 1s forwards";
      document.body.classList.add('dark-mode');
    }, 1000); // Delay to match the moon setting animation
  } else {
    // Animate sun setting
    icon.style.animation = "sunSet 1s forwards";
    setTimeout(() => {
      // Change icon to moon and animate rising
      icon.classList.replace('fa-sun', 'fa-moon');
      icon.style.animation = "moonRise 1s forwards";
      document.body.classList.remove('dark-mode');
    }, 1000); // Delay to match the sun setting animation
  }

  isDarkMode = !isDarkMode;
}


// Event untuk menutup hamburger menu jika pengguna mengklik di luar area navbar
document.addEventListener("click", function (event) {
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navbarToggler = document.querySelector(".navbar-toggler");

  // Periksa apakah area yang diklik bukan bagian dari navbar atau navbar-toggler
  if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
    // Jika navbar sedang dalam keadaan terbuka, tutup
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
      toggle: false,
    });
    bsCollapse.hide();

    // Kembalikan ikon hamburger menjadi garis tiga
    if (navbarToggler.classList.contains("collapsed")) {
      navbarToggler.classList.remove("collapsed");
    }
  }
});

// Event untuk mengubah ikon hamburger menjadi 'X' dan sebaliknya saat di-klik
document.querySelector('.navbar-toggler').addEventListener('click', function() {
  this.classList.toggle('collapsed');
});

// Observe elements and add 'show' class when they are in view
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
    threshold: 0.1 // Adjust the threshold as needed
  });

  hiddenElements.forEach((element) => {
    observer.observe(element);
  });
});

