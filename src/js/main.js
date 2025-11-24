/* Consolidated page script: combine behaviors into one DOMContentLoaded handler,
   migrate submenu click handling from inline script, and improve scroll handling. */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');
    const tabBtns = Array.from(document.querySelectorAll('.tab-btn'));
    const tabContents = Array.from(document.querySelectorAll('.tab-content'));
    const backToTopBtn = document.getElementById('back-to-top');
    const contactForm = document.querySelector('.contact-form form');
    const langSwitches = Array.from(document.querySelectorAll('.language-switch a'));
    const fadeElements = Array.from(document.querySelectorAll('.about, .technology, .products, .news, .contact'));

    // Mobile menu toggle
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenuBtn.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = mobileMenuBtn.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // Scroll handling (throttled via requestAnimationFrame)
    let isTicking = false;
    function handleScroll() {
        const scrollY = window.scrollY || window.pageYOffset;
        if (header) {
            if (scrollY > 50) header.classList.add('top-scrolled');
            else header.classList.remove('top-scrolled');
        }

        if (backToTopBtn) {
            if (scrollY > 300) backToTopBtn.classList.add('show');
            else backToTopBtn.classList.remove('show');
        }

        checkFade();
    }

    window.addEventListener('scroll', function () {
        if (!isTicking) {
            isTicking = true;
            window.requestAnimationFrame(function () {
                handleScroll();
                isTicking = false;
            });
        }
    }, { passive: true });

    // Tabs
    if (tabBtns.length && tabContents.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                const tabContent = document.getElementById(`${tabId}-content`);
                if (tabContent) tabContent.classList.add('active');
            });
        });
    }

    // Back to top
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Smooth internal anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href') || '';
            if (!href.startsWith('#')) return;
            e.preventDefault();

            if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }

            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80; // 导航栏高度（如需精准可调整）
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            }
        });
    });

    // Contact form (simple client-side validation placeholder)
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const subject = document.getElementById('subject')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            if (!name || !email || !subject || !message) {
                alert('请填写所有必填字段');
                return;
            }
            alert('感谢您的留言！我们会尽快与您联系。');
            contactForm.reset();
        });
    }

    // Language switch simple UI
    if (langSwitches.length) {
        langSwitches.forEach(switchBtn => {
            switchBtn.addEventListener('click', function (e) {
                e.preventDefault();
                langSwitches.forEach(btn => { btn.classList.remove('lang-current'); btn.classList.add('lang-other'); });
                this.classList.remove('lang-other');
                this.classList.add('lang-current');
            });
        });
    }

    // Fade-in sections on scroll
    function checkFade() {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = (rect.top < window.innerHeight - 100) && (rect.bottom > 0);
            if (isVisible) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }

    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Ensure initial visibility check
    checkFade();

    // Window resize handling
    window.addEventListener('resize', function () {
        if (mobileMenuBtn && window.innerWidth > 768 && mobileMenuBtn.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Page load animation for hero
    function pageLoadAnimation() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = 0;
            heroContent.style.transform = 'translateY(30px)';
            setTimeout(() => {
                heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
                heroContent.style.opacity = 1;
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    }
    pageLoadAnimation();

    // Submenu click behavior migrated from inline script
    document.querySelectorAll('.submenu a').forEach(link => {
        link.addEventListener('click', function () {
            const parentItem = link.closest('.has-submenu');
            if (!parentItem) return;
            parentItem.dataset.clicked = '1';
            if (!parentItem._mouseleaveHandlerBound) {
                parentItem._mouseleaveHandlerBound = true;
                const handler = function () {
                    try { if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur(); } catch (err) {}
                    delete parentItem.dataset.clicked;
                    parentItem.removeEventListener('mouseleave', handler);
                    parentItem._mouseleaveHandlerBound = false;
                };
                parentItem.addEventListener('mouseleave', handler, { passive: true });
            }
        }, false);
    });

});