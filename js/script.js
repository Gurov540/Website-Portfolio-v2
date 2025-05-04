// Выбираем все секции и ссылки навигации
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu__link");

// Создаем наблюдатель
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const navLink = document.querySelector(`.nav-menu__link[href="#${id}"]`);

      if (entry.isIntersecting) {
        // Убираем активный класс у всех
        navLinks.forEach((link) =>
          link.classList.remove("nav-menu__link--active")
        );

        // Добавляем активный класс текущей
        navLink.classList.add("nav-menu__link--active");
      }
    });
  },
  {
    root: null, // viewport
    threshold: 0.2, // 60% секции должно быть видно
  }
);

// Подключаем наблюдатель ко всем секциям
sections.forEach((section) => observer.observe(section));
