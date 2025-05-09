document.addEventListener("DOMContentLoaded", function () {
  // Находим только навигационные ссылки
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

  // Настройки для Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: "-30% 0px -65% 0px", // Центральная 5% экрана
    threshold: 0,
  };

  // Обработчик пересечений
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

        // Обновляем иконки
        const iconClass = link.querySelector("i")?.className;
        if (iconClass) {
          link.querySelector("i").className = shouldActivate
            ? iconClass.replace("-inactive", "-active")
            : iconClass.replace("-active", "-inactive");
        }
      });
    }
  };

  // Создаем наблюдатель
  const observer = new IntersectionObserver(handleIntersect, observerOptions);

  // Начинаем наблюдение за секциями
  navLinks.forEach(({ targetSection }) => observer.observe(targetSection));

  // Обработка начального состояния
  const initialHash = window.location.hash.substring(1);
  if (initialHash) {
    const targetSection = document.getElementById(initialHash);
    const correspondingLink = navLinks.find(
      (item) => item.link.getAttribute("href") === `#${initialHash}`
    );
    correspondingLink?.link.classList.add("nav-menu__link--active");
  }

  // Плавный скролл для навигации
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
// Функция переключения темы
function toggleTheme() {
  document.body.classList.toggle("dark-theme");

  // Сохраняем состояние в LocalStorage
  const isDark = document.body.classList.contains("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Инициализация темы при загрузке
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }
}

// Вешаем обработчик на кнопку
document
  .querySelector(".nav-menu__theme-toggle")
  .addEventListener("click", toggleTheme);

// Запускаем при загрузке
window.addEventListener("DOMContentLoaded", initTheme);
