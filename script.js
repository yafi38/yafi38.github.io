// Dynamic year values
const startYear = 2022;
const now = new Date().getFullYear();

const yearsEl = document.getElementById('years');
if (yearsEl) {
    yearsEl.textContent = now - startYear;
}

const footerYearEl = document.getElementById('footer-year');
if (footerYearEl) {
    footerYearEl.textContent = now;
}

// Smooth scrolling for in-page navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Condense the navigation bar once the page is scrolled
const nav = document.querySelector('nav');
const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Highlight the navigation link for the section currently in view
const navLinks = new Map();
document.querySelectorAll('.nav-menu a[href^="#"]').forEach((link) => {
    navLinks.set(link.getAttribute('href').slice(1), link);
});

const setActiveLink = (id) => {
    navLinks.forEach((link, key) => {
        link.classList.toggle('active', key === id);
    });
};

const spy = new IntersectionObserver(
    (entries) => {
        entries
            .filter((entry) => entry.isIntersecting)
            .forEach((entry) => setActiveLink(entry.target.id));
    },
    { rootMargin: '-45% 0px -50% 0px' }
);

navLinks.forEach((link, id) => {
    const section = document.getElementById(id);
    if (section) {
        spy.observe(section);
    }
});

// Reveal sections as they scroll into view
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const sections = document.querySelectorAll('section:not(#hero)');

if (prefersReducedMotion) {
    sections.forEach((section) => section.classList.add('revealed'));
} else {
    const reveal = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    sections.forEach((section) => {
        section.classList.add('reveal');
        reveal.observe(section);
    });
}
