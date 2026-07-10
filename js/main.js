// ══════════════════════════════════════════
// TALYX Smart Jewelry Lab — Interactions v2
// ══════════════════════════════════════════

(function () {
  'use strict';

  // ── Header scroll state ──
  var header = document.getElementById('header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  // ── Mobile menu ──
  var toggle = document.getElementById('mobileToggle');
  var menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll-triggered fade-in ──
  var fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });
    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else if (fadeElements.length) {
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ── Stagger animation for children (enhanced) ──
  var staggerParents = document.querySelectorAll('[data-stagger]');
  staggerParents.forEach(function (parent) {
    if ('IntersectionObserver' in window) {
      var staggerObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var children = parent.children;
            for (var i = 0; i < children.length; i++) {
              children[i].style.transitionDelay = (i * 80) + 'ms';
              children[i].classList.add('visible');
            }
            staggerObs.unobserve(parent);
          }
        });
      }, { threshold: 0.05 });
      staggerObs.observe(parent);
    }
  });

  // ── FAQ Accordion ──
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close all others
        faqItems.forEach(function (other) {
          other.classList.remove('open');
        });

        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // ── Knowledge Filter Pills ──
  var filterPills = document.querySelectorAll('.filter-pill');
  if (filterPills.length) {
    filterPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        // Update active pill
        filterPills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');

        var category = pill.getAttribute('data-category');
        var articles = document.querySelectorAll('[data-article-category]');

        if (category === 'all') {
          articles.forEach(function (a) {
            a.style.display = '';
            a.style.opacity = '';
            // Re-trigger fade
            a.classList.remove('visible');
            setTimeout(function () { a.classList.add('visible'); }, 50);
          });
        } else {
          articles.forEach(function (a) {
            if (a.getAttribute('data-article-category') === category) {
              a.style.display = '';
              a.classList.remove('visible');
              setTimeout(function () { a.classList.add('visible'); }, 50);
            } else {
              a.style.display = 'none';
            }
          });
        }
      });
    });
  }

  // ── Book page: option selection ──
  var bookOptions = document.querySelectorAll('.book-option');
  if (bookOptions.length) {
    bookOptions.forEach(function (option) {
      option.addEventListener('click', function () {
        bookOptions.forEach(function (o) { o.classList.remove('selected'); });
        option.classList.add('selected');
        var select = document.getElementById('serviceType');
        if (select) {
          select.value = option.getAttribute('data-value') || '';
        }
      });
    });
  }

  // ── Book page: form submit ──
  var bookForm = document.getElementById('bookForm');
  if (bookForm) {
    bookForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = bookForm.querySelector('.form-submit');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = 'Request Sent — We\'ll be in touch';
        btn.style.background = '#B8952E';
        btn.style.color = '#fff';
        btn.style.border = 'none';
        bookForm.reset();
        setTimeout(function () {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          btn.style.color = '';
          btn.style.border = '';
        }, 4000);
      }, 1200);
    });
  }

  // ── Newsletter form ──
  var newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = newsletterForm.querySelector('button');
      var input = newsletterForm.querySelector('input');
      var originalText = btn.textContent;
      btn.textContent = 'Subscribed!';
      btn.style.background = '#B8952E';
      btn.style.color = '#fff';
      btn.disabled = true;
      input.value = '';
      setTimeout(function () {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 3000);
    });
  }

  // ── Color swatch interaction ──
  var colorSwatches = document.querySelectorAll('.color-swatch');
  colorSwatches.forEach(function (swatch) {
    swatch.addEventListener('click', function () {
      var label = swatch.querySelector('.color-swatch-label');
      if (label) {
        var name = label.textContent;
        label.style.opacity = '1';
        label.textContent = 'Copied!';
        setTimeout(function () {
          label.textContent = name;
          label.style.opacity = '';
        }, 1500);
      }
    });
  });

  // ── Active nav link highlighting ──
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.header-nav a:not(.header-cta)');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // ── Hero Carousel ──
  var track = document.getElementById('heroCarouselTrack');
  var prevBtn = document.getElementById('heroCarouselPrev');
  var nextBtn = document.getElementById('heroCarouselNext');
  var dots = document.querySelectorAll('.hero-carousel-dot');
  if (track && dots.length) {
    var slideCount = dots.length;
    var currentIndex = 0;
    var autoTimer = null;
    var isTransitioning = false;

    function goToSlide(index) {
      if (isTransitioning || index === currentIndex) return;
      isTransitioning = true;
      currentIndex = index;
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === currentIndex);
      });

      setTimeout(function () {
        isTransitioning = false;
      }, 600);
    }

    function nextSlide() { goToSlide((currentIndex + 1) % slideCount); }
    function prevSlide() { goToSlide((currentIndex - 1 + slideCount) % slideCount); }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goToSlide(parseInt(dot.getAttribute('data-index'), 10));
      });
    });

    // Auto-advance every 5s, pause on hover
    function startAuto() {
      stopAuto();
      autoTimer = setInterval(nextSlide, 5000);
    }

    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    startAuto();
    track.parentElement.addEventListener('mouseenter', stopAuto);
    track.parentElement.addEventListener('mouseleave', startAuto);

    // Touch swipe support
    var touchStartX = 0;
    var touchEndX = 0;
    track.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
      stopAuto();
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) { nextSlide(); } else { prevSlide(); }
      }
      startAuto();
    }, { passive: true });
  }

})();
