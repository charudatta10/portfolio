/* -------------------------------------------------------------------------
   Portfolio interactions: theme toggle, nav, scroll reveal, pointer fx.
   Loaded on every page. Respects prefers-reduced-motion.
   ------------------------------------------------------------------------- */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ----------------------------- Theme ---------------------------------- */
  var THEME_KEY = "ck-theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var btn = document.querySelector(".theme-toggle .theme-icon");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* ignore */
    }
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
    var toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        applyTheme(
          document.documentElement.getAttribute("data-theme") === "dark"
            ? "light"
            : "dark"
        );
      });
    }
  }

  /* ------------------------------ Nav ----------------------------------- */
  function initNav() {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.getElementById("site-nav");

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    document.querySelectorAll(".dropdown > .dropbtn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        var li = this.parentElement;
        if (window.innerWidth <= 860) {
          e.preventDefault();
          var open = li.classList.toggle("open");
          this.setAttribute("aria-expanded", open ? "true" : "false");
        }
      });
    });

    // Close mobile nav after selecting an item
    document.querySelectorAll("#site-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (nav) nav.classList.remove("open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    });

    // Mark the active top-level section
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
    initNav();
    initReveal();
    initPointer();
    initAnimatedSvg();
  });
})();
