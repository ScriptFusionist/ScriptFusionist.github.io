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

  const hiddenHr = document.querySelectorAll("hr");
  const hrObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        hrObserver.unobserve(entry.target);
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

    setTimeout(() => {
      this.querySelector('.overlay').style.transition = "all 0.7s ease";
    }, 100);
  });
});

document.addEventListener('click', function() {
  document.querySelectorAll('.activity-card').forEach(c => {
    c.classList.remove('active');
    c.querySelector('.overlay').style.transition = "all 0.5s ease";
  });
});

const quotes = [
  "Coding is the art of solving problems we sometimes create ourselves.",
  "Debugging is the process of 'confessing sins' while remembering why we wrote that code.",
  "The debugger is your most loyal friend when coding, but your enemy when relaxing.",
  "When the code finally works, remember there's always another error waiting.",
  "Coding is a journey from 'why so many errors?' to 'wait, how did this work?'",
  "Coding is like coffee: the more bitter it gets, the more addictive it becomes.",
  "Clean code is a myth. Just make it work first, aesthetics come later.",
  "Stack Overflow is heaven, but don't forget to say thanks.",
  "Staying up late coding is normal; fixing errors in one go is a blessing.",
  "Don't fall too hard for your code; when it errors on you, it really hurts!",
  "Coding teaches god-level patience - every small error is a call for self-reflection.",
  "Coding together is fun until someone asks 'where did this bug come from?'",
  "Working code feels like magic; broken code feels like drama.",
  "Your coding skills may level up, but remember, so do your errors."
];

let currentQuoteIndex = 0;

function changeQuote() {
  const quoteElement = document.getElementById("dailyQuote");
  quoteElement.classList.add("fade-out");

  setTimeout(() => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    quoteElement.textContent = quotes[currentQuoteIndex];
    quoteElement.classList.remove("fade-out");
  }, 1000);
}

setInterval(changeQuote, 10000);

function animateSkills() {
  const skillsSection = document.querySelector('#skills');
  const progressBars = document.querySelectorAll('.progress-bar');

  if (skillsSection.getBoundingClientRect().top < window.innerHeight && skillsSection.getBoundingClientRect().bottom > 0) {
    progressBars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-width');
    });
  }
}

window.addEventListener('scroll', animateSkills);

function updateNavbarTransparency() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY === 0) {
    navbar.classList.add('transparent');
  } else {
    navbar.classList.remove('transparent');
  }
}

window.addEventListener('load', updateNavbarTransparency);
window.addEventListener('scroll', updateNavbarTransparency);

document.querySelectorAll('.gallery-card').forEach(card => {
  let isFlipped = false;
  let timeout;

  card.addEventListener('mouseenter', () => {
    if (!isFlipped) {
      card.classList.add('is-flipped');
      isFlipped = true;
    }
    clearTimeout(timeout);
  });

  card.addEventListener('mouseleave', () => {
    timeout = setTimeout(() => {
      if (isFlipped) {
        card.classList.remove('is-flipped');
        isFlipped = false;
      }
    }, 300);
  });
});
