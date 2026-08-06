/* -------------------------------------------------------------------------
   Portfolio interactions: theme toggle, nav, scroll reveal, pointer fx.
   Loaded on every page. Respects prefers-reduced-motion.

   The header/footer are injected asynchronously by include.js, so all
   header-dependent click handlers use event delegation on document and the
   active-nav marking re-runs on the "ck:components" event.
   ------------------------------------------------------------------------- */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ----------------------------- Theme ---------------------------------- */
  var THEME_KEY = "ck-theme";

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* ignore */
    }
    var icon = document.querySelector(".theme-toggle .theme-icon");
    if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  function initTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch (e) {
      /* ignore */
    }
    if (!stored) {
      stored = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    applyTheme(stored);
  }

  /* ------------------------------ Nav ----------------------------------- */
  function markActive() {
    var path = window.location.pathname;
    var current = path.endsWith("work.html")
      ? "work"
      : path.endsWith("about.html")
      ? "about"
      : path.endsWith("writing.html")
      ? "writing"
      : path.endsWith("now.html")
      ? "now"
      : path.endsWith("gallery.html")
      ? "gallery"
      : path.endsWith("contact.html")
      ? "contact"
      : "home";
    var map = {
      about: "About",
      work: "Research",
      writing: "Writing",
      now: "Now",
      gallery: "Gallery",
      contact: "Contact",
    };
    if (map[current]) {
      document.querySelectorAll(".dropdown .dropbtn").forEach(function (b) {
        if (b.textContent.trim().indexOf(map[current]) === 0) {
          b.setAttribute("aria-current", "page");
        }
      });
    } else {
      var home = document.querySelector('[data-nav="home"]');
      if (home) home.setAttribute("aria-current", "page");
    }
  }

  function closeMobileNav() {
    var nav = document.getElementById("site-nav");
    if (nav) nav.classList.remove("open");
    var toggle = document.querySelector(".menu-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  // Delegated handlers: header may be injected after this script runs.
  document.addEventListener("click", function (e) {
    var target = e.target;

    var themeBtn = target.closest(".theme-toggle");
    if (themeBtn) {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
      return;
    }

    var menuBtn = target.closest(".menu-toggle");
    if (menuBtn) {
      var nav = document.getElementById("site-nav");
      if (nav) {
        var open = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      }
      return;
    }

    var dropBtn = target.closest(".dropdown > .dropbtn");
    if (dropBtn) {
      if (window.innerWidth <= 860) {
        e.preventDefault();
        var li = dropBtn.parentElement;
        var open = li.classList.toggle("open");
        dropBtn.setAttribute("aria-expanded", open ? "true" : "false");
      }
      return;
    }

    if (target.closest("#site-nav a")) {
      closeMobileNav();
    }
  });

  // Header/footer injected asynchronously — re-run header-dependent bits.
  document.addEventListener("ck:components", function () {
    markActive();
    applyTheme(currentTheme());
  });

  /* ------------------------- Scroll reveal ------------------------------ */
  function initReveal() {
    if (prefersReduced.matches) {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("visible");
      });
      return;
    }
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("visible");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  }

  /* -------------------- Pointer glow on hero cards ---------------------- */
  function initPointer() {
    if (prefersReduced.matches) return;
    document.querySelectorAll("[data-tilt]").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width;
        var y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", x.toFixed(2));
        card.style.setProperty("--my", y.toFixed(2));
      });
    });
  }

  /* --------------------------- Animated SVG ------------------------------ */
  function initAnimatedSvg() {
    if (prefersReduced.matches) return;
    document.querySelectorAll("svg[data-animate]").forEach(function (svg) {
      svg.querySelectorAll("[data-dash]").forEach(function (path) {
        var len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
      });
      var paths = svg.querySelectorAll("[data-dash]");
      if (paths.length) {
        paths.forEach(function (p, i) {
          p.style.transition =
            "stroke-dashoffset 1.6s ease " + (i * 0.15).toFixed(2) + "s";
          p.getBoundingClientRect();
          p.style.strokeDashoffset = "0";
        });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    markActive();
    initReveal();
    initPointer();
    initAnimatedSvg();
  });
})();
