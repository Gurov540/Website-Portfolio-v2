const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu__link");

let isScrolling = false;

function onScroll() {
  if (isScrolling) return;

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("nav-menu__link--active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("nav-menu__link--active");
    }
  });
}

// при скролле
window.addEventListener("scroll", onScroll);

// при клике по ссылке
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      isScrolling = true;

      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      navLinks.forEach((l) => l.classList.remove("nav-menu__link--active"));
      link.classList.add("nav-menu__link--active");

      // ждать завершения прокрутки
      setTimeout(() => {
        isScrolling = false;
        onScroll(); // обновить активную ссылку после скролла
      }, 600); // время прокрутки (можно подстроить)
    }
  });
});
