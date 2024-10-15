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

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const icon = document.getElementById("darkModeIcon");
  if (document.body.classList.contains("dark-mode")) {
    icon.textContent = "☀️";
  } else {
    icon.textContent = "🌙";
  }
}

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
  }
});
