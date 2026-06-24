const roles = [
    'Java Developer',
    'Full Stack Learner',
    'Problem Solver',
    'Tech Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typing = document.getElementById('typing');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const fadeElements = document.querySelectorAll('.fade-up');
const skillSpans = document.querySelectorAll('.skill-bar span');

function updateTyping() {
    const currentRole = roles[roleIndex];
    const visibleText = currentRole.substring(0, charIndex);
    typing.textContent = visibleText;

    const typingSpeed = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex < currentRole.length) {
        charIndex += 1;
        setTimeout(updateTyping, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex -= 1;
        setTimeout(updateTyping, typingSpeed);
    } else {
        if (!isDeleting) {
            isDeleting = true;
            setTimeout(updateTyping, 1500);
        } else {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(updateTyping, 250);
        }
    }
}

function animateSkillBars() {
    skillSpans.forEach((span, index) => {
        const percent = span.dataset.skill || '0';
        span.style.width = '0';
        setTimeout(() => {
            span.style.width = `${percent}%`;
            span.classList.add('filled');
        }, 350 + index * 120);
    });
}

function handleNavToggle() {
    navLinks.classList.toggle('open');
}

function closeNavOnLinkClick(event) {
    if (event.target.tagName === 'A' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
    }
}

function revealOnScroll() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    fadeElements.forEach((element) => observer.observe(element));
}

document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    if (navToggle) {
        navToggle.addEventListener('click', handleNavToggle);
    }
    if (navLinks) {
        navLinks.addEventListener('click', closeNavOnLinkClick);
    }
    revealOnScroll();
    animateSkillBars();
    updateTyping();
});