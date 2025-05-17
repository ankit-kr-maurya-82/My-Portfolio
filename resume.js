
// scripts.js

// Initialize AOS animations
AOS.init({
  duration: 1000,  // animation duration in milliseconds
  easing: 'ease-in-out',
  once: true       // whether animation should happen only once
});


const cursor = document.getElementById('cursor');

// Track mouse move
window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Add hover effect on all links and buttons
const hoverables = document.querySelectorAll('a, button');

hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
  });
});


// Smooth scroll for internal links
const smoothScroll = (target, duration) => {
  const targetElement = document.querySelector(target);
  const targetPosition = targetElement.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition + startPosition;
  let startTime = null;

  const animation = currentTime => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};
// Add smooth scroll to all internal links
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('href');
    smoothScroll(target, 1000);
  });
});
// Add scroll to top button functionality
const scrollToTopBtn = document.getElementById('scroll-to-top');
const rootElement = document.documentElement;
// Show button when scrolled down
window.addEventListener('scroll', () => {
  if (rootElement.scrollTop > 100) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});
// Scroll to top on button click
scrollToTopBtn.addEventListener('click', () => {
  smoothScroll('#top', 1000);
});
// Add event listener to all sections for scroll animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
  section.addEventListener('scroll', () => {
    section.classList.add('animate');
  });
});

