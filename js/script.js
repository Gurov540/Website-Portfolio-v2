document.addEventListener("DOMContentLoaded", function () {
  const navLinks = Array.from(
    document.querySelectorAll('.nav-menu__link[href^="#"]')
  )
    .map((link) => {
      const targetId = link.getAttribute("href").substring(1);
      return {
        link,
        targetSection: document.getElementById(targetId),
      };
    })
    .filter((item) => item.targetSection);

  if (!navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: "-30% 0px -65% 0px",
    threshold: 0,
  };

  const handleIntersect = (entries) => {
    let closestEntry = null;
    let closestDistance = Infinity;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const distance = Math.abs(
          entry.rootBounds.top - entry.boundingClientRect.top
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestEntry = entry;
        }
      }
    });

    if (closestEntry) {
      const activeId = closestEntry.target.id;
      navLinks.forEach(({ link, targetSection }) => {
        const shouldActivate = targetSection.id === activeId;
        link.classList.toggle("nav-menu__link--active", shouldActivate);

        const iconClass = link.querySelector("i")?.className;
        if (iconClass) {
          link.querySelector("i").className = shouldActivate
            ? iconClass.replace("-inactive", "-active")
            : iconClass.replace("-active", "-inactive");
        }
      });
    }
  };

  const observer = new IntersectionObserver(handleIntersect, observerOptions);

  navLinks.forEach(({ targetSection }) => observer.observe(targetSection));

  const initialHash = window.location.hash.substring(1);
  if (initialHash) {
    const targetSection = document.getElementById(initialHash);
    const correspondingLink = navLinks.find(
      (item) => item.link.getAttribute("href") === `#${initialHash}`
    );
    correspondingLink?.link.classList.add("nav-menu__link--active");
  }

  document.querySelectorAll(".nav-menu__link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});

function toggleTheme() {
  document.body.classList.toggle("dark-theme");

  const isDark = document.body.classList.contains("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }
}

document
  .querySelector(".nav-menu__theme-toggle")
  .addEventListener("click", toggleTheme);

window.addEventListener("DOMContentLoaded", initTheme);

// Кнопка "Вверх"
const scrollTopBtn = document.createElement("div");
scrollTopBtn.className = "scroll-top";
scrollTopBtn.innerHTML = "↑";
document.body.appendChild(scrollTopBtn);

// Показать/скрыть кнопку
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

// Плавный скролл вверх
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Добавляем в script.js
document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".nav-burger");
  const navMenu = document.querySelector(".nav-menu-wrapper");

  // Переключение меню
  burger.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
    this.setAttribute("aria-expanded", this.classList.contains("active"));
  });

  // Закрытие меню при клике вне области
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".nav-menu-wrapper") &&
      !e.target.closest(".nav-burger")
    ) {
      burger.classList.remove("active");
      navMenu.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  // Закрытие меню после выбора пункта
  document.querySelectorAll(".nav-menu__link").forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      navMenu.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
    });
  });
});
