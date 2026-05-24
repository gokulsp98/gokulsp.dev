/* ============================================
   GOKUL S P - Portfolio Scripts
   Data-driven rendering + animations
   ============================================ */

// --- SVG Icon Map ---
const ICONS = {
    layers:     (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    activity:   (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    cloud:      (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9m-4-3l4 4 4-4"/></svg>`,
    database:   (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>`,
    bulb:       (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a4 4 0 0 0-4 4c0 2 2 3 2 5h4c0-2 2-3 2-5a4 4 0 0 0-4-4zM10 17v1a2 2 0 1 0 4 0v-1M9 11h6"/></svg>`,
    medal:      (s=40) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    star:       (s=40) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    graduation: (s=32) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/></svg>`,
    email:      (s=24) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>`,
    phone:      (s=24) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
    linkedin:   (s=24) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    arrow:      (s=20) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
    send:       (s=20) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    externalLink:(s=16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>`,
    github:     (s=20) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
    book:       (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
};

// ============================================
// RENDER FUNCTIONS — Build HTML from PORTFOLIO
// ============================================

function renderPortfolio() {
    renderHero();
    renderAbout();
    renderSkills();
    renderExperience();
    renderWriting();
    renderAwards();
    renderEducation();
    renderContact();
    renderFooter();
}

function renderHero() {
    const d = PORTFOLIO;
    const h = d.hero;

    const statsHtml = h.stats.map(s =>
        `<div class="hero-stat">
            <span class="hero-stat-number" data-target="${s.value}">0</span>${s.suffix ? `<span class="accent">${s.suffix}</span>` : ''}
            <span class="hero-stat-label">${s.label}</span>
        </div>`
    ).join('');

    document.getElementById('heroContent').innerHTML = `
        <div class="hero-greeting reveal-up">${h.greeting}</div>
        <h1 class="hero-name">
            <span class="hero-name-line reveal-up" style="--delay: 0.1s">${d.firstName}</span>
            <span class="hero-name-line reveal-up" style="--delay: 0.2s">${d.lastName}<span class="accent">.</span></span>
        </h1>
        <div class="hero-title reveal-up" style="--delay: 0.3s">
            <span class="hero-title-static">${d.title}</span>
            <span class="hero-title-typing"><span class="hero-title-dynamic" id="typingText"></span><span class="hero-cursor">|</span></span>
        </div>
        <p class="hero-desc reveal-up" style="--delay: 0.4s">${h.description}</p>
        <div class="hero-cta reveal-up" style="--delay: 0.5s">
            <a href="#contact" class="btn btn-primary">
                <span>Let's Connect</span>
                ${ICONS.arrow()}
            </a>
            <a href="#experience" class="btn btn-ghost">
                <span>View My Work</span>
            </a>
        </div>
        <div class="hero-stats reveal-up" style="--delay: 0.6s">
            ${statsHtml}
        </div>
    `;

    const heroSection = document.getElementById('heroContent').closest('.hero');
    const scrollEl = document.createElement('a');
    scrollEl.href = '#about';
    scrollEl.className = 'hero-scroll';
    scrollEl.setAttribute('aria-label', 'Scroll down');
    scrollEl.innerHTML = `<span class="hero-scroll-text">Explore</span><span class="hero-scroll-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></span>`;
    heroSection.appendChild(scrollEl);
}

function renderAbout() {
    const d = PORTFOLIO;

    document.getElementById('aboutContent').innerHTML = `
        <div class="section-header">

            <h2 class="section-title reveal-up">Know me <span class="accent">better.</span></h2>
        </div>
        <div class="about-split">
            <div class="about-left reveal-up">
                <div class="about-highlight">
                    <span class="about-highlight-number">${d.about.yearsExperience.replace(/[^0-9+]/g, '')}</span>
                    <span class="about-highlight-label">Years of<br>Experience</span>
                </div>
                <div class="about-details">
                    <div class="about-detail">
                        <span class="about-detail-label">Currently</span>
                        <span class="about-detail-value">${d.title} at ${d.experience[0].company}</span>
                    </div>
                    <div class="about-detail">
                        <span class="about-detail-label">Based in</span>
                        <span class="about-detail-value">${d.location}</span>
                    </div>
                    <div class="about-detail">
                        <span class="about-detail-label">Email</span>
                        <a href="mailto:${d.email}" class="about-detail-value">${d.email}</a>
                    </div>
                </div>
            </div>
            <div class="about-right reveal-up" style="--delay: 0.15s">
                ${d.about.paragraphs.map((p, i) => `<p class="about-text ${i === 0 ? 'about-text--lead' : ''}">${p}</p>`).join('')}
            </div>
        </div>
    `;
}

function renderSkills() {
    const d = PORTFOLIO;

    const categoriesHtml = d.skills.map((cat, i) => `
        <div class="skill-category reveal-up" style="--delay: ${i * 0.1}s">
            <div class="skill-category-icon">
                ${ICONS[cat.icon] ? ICONS[cat.icon]() : ''}
            </div>
            <h3 class="skill-category-title">${cat.title}</h3>
            <div class="skill-tags">
                ${cat.tags.map(t => `<span class="skill-tag" data-level="${t.level}">${t.name}</span>`).join('')}
            </div>
        </div>
    `).join('');

    const quotesHtml = d.philosophyQuotes.map((q, i) =>
        `<p class="philosophy-slide${i === 0 ? ' active' : ''}">${q}</p>`
    ).join('');

    const dotsHtml = d.philosophyQuotes.map((_, i) =>
        `<button class="philosophy-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Quote ${i + 1}"></button>`
    ).join('');

    document.getElementById('skillsContent').innerHTML = `
        <div class="section-header">

            <h2 class="section-title reveal-up">My tech <span class="accent">arsenal.</span></h2>
        </div>
        <div class="skills-grid">
            ${categoriesHtml}
        </div>
        <div class="skills-philosophy reveal-up">
            <div class="skills-philosophy-icon">"</div>
            <div class="philosophy-swiper" id="philosophySwiper">
                ${quotesHtml}
            </div>
            <div class="philosophy-dots" id="philosophyDots">
                ${dotsHtml}
            </div>
        </div>
    `;
}

function renderExperience() {
    const d = PORTFOLIO;

    const itemsHtml = d.experience.map((exp, i) => {
        const dir = 'reveal-up';

        const projectsHtml = exp.projects.map(proj => `
            <div class="timeline-project">
                <h4>${proj.title}</h4>
                <ul class="timeline-list">
                    ${proj.points.map(p => `<li>${p}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        const tagsHtml = exp.tags.map(t => `<span>${t}</span>`).join('');

        return `
            <div class="timeline-item ${dir}">
                <div class="timeline-dot"></div>
                <div class="timeline-card">
                    <div class="timeline-header">
                        <div>
                            <h3 class="timeline-role">${exp.role}</h3>
                            <span class="timeline-company">${exp.company}</span>
                        </div>
                        <span class="timeline-date">${exp.date}</span>
                    </div>
                    ${projectsHtml}
                    <div class="timeline-tags">
                        ${tagsHtml}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('experienceContent').innerHTML = `
        <div class="section-header">

            <h2 class="section-title reveal-up">Where I've <span class="accent">worked.</span></h2>
        </div>
        <div class="timeline">
            <div class="timeline-line"></div>
            ${itemsHtml}
        </div>
    `;
}

function renderWriting() {
    const w = PORTFOLIO.writing;
    if (!w) return;
    const b = w.blog;

    document.getElementById('writingContent').innerHTML = `
        <div class="section-header">

            <h2 class="section-title reveal-up">I write to <span class="accent">teach.</span></h2>
            <p class="section-subtitle reveal-up">${w.tagline}</p>
        </div>
        <div class="writing-card reveal-up">
            <div class="writing-card-top">
                <div class="writing-card-info">
                    <h3 class="writing-card-name">${b.name}</h3>
                    <p class="writing-card-desc">${b.description}</p>
                </div>
            </div>
            <div class="writing-card-footer">
                <a href="${b.url}" target="_blank" rel="noopener" class="btn btn-primary">
                    ${ICONS.externalLink(18)}
                    <span>Start Reading</span>
                </a>
                <a href="${b.github}" target="_blank" rel="noopener" class="btn btn-ghost">
                    ${ICONS.github(18)}
                    <span>View Source</span>
                </a>
            </div>
        </div>
    `;
}

function renderEducation() {
    const d = PORTFOLIO;
    const edu = d.education;

    document.getElementById('educationContent').innerHTML = `
        <div class="section-header">

            <h2 class="section-title reveal-up">My <span class="accent">background.</span></h2>
        </div>
        <div class="edu-card reveal-up">
            <div class="edu-icon">
                ${ICONS.graduation()}
            </div>
            <div class="edu-content">
                <h3 class="edu-degree">${edu.degree}</h3>
                <span class="edu-school">${edu.school}</span>
                <span class="edu-date">${edu.date}</span>
            </div>
        </div>
        <div class="edu-project reveal-up" style="--delay: 0.1s">
            <div class="edu-project-badge">${edu.project.badge}</div>
            <h3 class="edu-project-title">${edu.project.title}</h3>
            <p class="edu-project-desc">${edu.project.description}</p>
            <div class="edu-project-tags">
                ${edu.project.tags.map(t => `<span>${t}</span>`).join('')}
            </div>
        </div>
    `;
}

function renderAwards() {
    const d = PORTFOLIO;

    const cardsHtml = d.awards.map((award, i) => `
        <div class="award-card reveal-up" style="--delay: ${i * 0.15}s">
            <div class="award-icon">
                ${ICONS[award.icon] ? ICONS[award.icon]() : ''}
            </div>
            <h3 class="award-title">${award.title}</h3>
            <span class="award-event">${award.event}</span>
            <p class="award-desc">${award.description}</p>
        </div>
    `).join('');

    document.getElementById('awardsContent').innerHTML = `
        <div class="section-header">

            <h2 class="section-title reveal-up">Recognition & <span class="accent">achievements.</span></h2>
        </div>
        <div class="awards-grid">
            ${cardsHtml}
        </div>
    `;
}

function renderContact() {
    const d = PORTFOLIO;
    const c = d.contact;

    document.getElementById('contactContent').innerHTML = `
        <div class="section-header">
            <h2 class="section-title reveal-up">${c.heading} <span class="accent">${c.headingAccent}</span></h2>
            <p class="section-subtitle reveal-up">${c.subtitle}</p>
        </div>
        <div class="contact-cta reveal-up">
            <a href="mailto:${d.email}" class="btn btn-primary">
                ${ICONS.email(20)}
                <span>Email Me</span>
            </a>
            <a href="${d.linkedin}" target="_blank" rel="noopener" class="btn btn-ghost">
                ${ICONS.linkedin(20)}
                <span>LinkedIn</span>
            </a>
        </div>
    `;
}

function renderFooter() {
    const d = PORTFOLIO;

    document.getElementById('footer').innerHTML = `
        <div class="container">
            <div class="footer-content">
                <span class="footer-logo">${d.name}<span class="accent">.</span></span>
                <p class="footer-text">writer, builder, engineer at ❤️.</p>
                <div class="footer-links">
                    <a href="mailto:${d.email}" aria-label="Email">${ICONS.email(16)}</a>
                    <a href="${d.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICONS.linkedin(16)}</a>
                    <a href="${d.writing.blog.url}" target="_blank" rel="noopener" aria-label="Blog">${ICONS.book(16)}</a>
                    <a href="${d.writing.blog.github}" target="_blank" rel="noopener" aria-label="GitHub">${ICONS.github(16)}</a>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    renderPortfolio();

    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        initAnimations();
    }, 800);

    // --- Navigation ---
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkEls = document.querySelectorAll('.nav-link');

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        nav.classList.toggle('scrolled', currentScroll > 50);
        lastScroll = currentScroll;
        updateActiveLink();
    });

    function openMenu() {
        document.body.appendChild(navLinks);
        navToggle.classList.add('active');
        navLinks.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
        nav.insertBefore(navLinks, navToggle);
    }

    navToggle.addEventListener('click', () => {
        if (navToggle.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navLinkEls.forEach(link => {
        link.addEventListener('click', (e) => {
            closeMenu();

            const href = link.getAttribute('href');
            if (href && !href.startsWith('#')) {
                e.preventDefault();
                document.body.classList.add('page-exit');
                setTimeout(() => { window.location.href = href; }, 400);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    function updateActiveLink() {
        const sections = document.querySelectorAll('.section, .hero');
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top) current = section.getAttribute('id');
        });
        navLinkEls.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    }

    // --- Typing Effect ---
    const typingEl = document.getElementById('typingText');
    const phrases = PORTFOLIO.hero.typingPhrases;
    let phraseIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 80;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }
        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400;
        }
        setTimeout(typeEffect, typingSpeed);
    }

    // --- Counter Animation ---
    function animateCounters() {
        document.querySelectorAll('[data-target]').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.round(target * ease);
                if (progress < 1) requestAnimationFrame(updateCounter);
            }
            requestAnimationFrame(updateCounter);
        });
    }

    // --- Scroll Reveal ---
    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
        document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    }

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // --- Philosophy Swiper ---
    function initPhilosophySwiper() {
        const slides = document.querySelectorAll('.philosophy-slide');
        const dots = document.querySelectorAll('.philosophy-dot');
        if (slides.length < 2) return;
        let current = 0, interval;
        function goTo(index) {
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');
            current = index;
            slides[current].classList.add('active');
            dots[current].classList.add('active');
        }
        function next() { goTo((current + 1) % slides.length); }
        function startAutoplay() { interval = setInterval(next, 4000); }
        function resetAutoplay() { clearInterval(interval); startAutoplay(); }
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                if (index !== current) { goTo(index); resetAutoplay(); }
            });
        });
        const swiper = document.getElementById('philosophySwiper');
        let touchStartX = 0;
        swiper.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
        swiper.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                goTo(diff > 0 ? (current + 1) % slides.length : (current - 1 + slides.length) % slides.length);
                resetAutoplay();
            }
        }, { passive: true });
        startAutoplay();
    }

    // --- Scroll-Linked Timeline ---
    function initScrollTimeline() {
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;
        function updateTimeline() {
            const rect = timeline.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.3)));
                timeline.style.setProperty('--timeline-progress', progress);
            }
        }
        window.addEventListener('scroll', updateTimeline);
        updateTimeline();
    }

    // --- Scroll Progress Bar ---
    function initScrollProgress() {
        const bar = document.getElementById('scrollProgress');
        window.addEventListener('scroll', () => {
            bar.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 + '%';
        });
    }

    // --- Back to Top ---
    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        window.addEventListener('scroll', () => { btn.classList.toggle('visible', window.scrollY > 500); });
        btn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    // --- Section Entrance ---
    function initSectionEntrance() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.section').forEach(s => observer.observe(s));
    }

    // --- Initialize All ---
    function initAnimations() {
        initSectionEntrance();
        typeEffect();
        animateCounters();
        initScrollReveal();
        initPhilosophySwiper();
        initScrollTimeline();
        initScrollProgress();
        initBackToTop();
    }

});
