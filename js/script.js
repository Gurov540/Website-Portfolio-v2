const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu__link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const navLink = document.querySelector(`.nav-menu__link[href="#${id}"]`);

      if (entry.isIntersecting) {
        navLinks.forEach((link) =>
          link.classList.remove("nav-menu__link--active")
        );

        navLink.classList.add("nav-menu__link--active");
      }
    });
  },
  {
    root: null,
    threshold: 0.1,
  }
);

sections.forEach((section) => observer.observe(section));
