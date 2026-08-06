/* Component loader: injects shared header + footer and boots Pagefind search. */
(function () {
  "use strict";

  // Pages live in /pages/; the root index needs a "pages/" prefix.
  var PREFIX = window.location.pathname.indexOf("/pages/") === -1 ? "pages/" : "";

  async function loadComponent(id, file) {
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error("Failed to load " + file);
      const html = await res.text();
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = html;
        // Shared components live in /pages/ and use "../" links that are
        // correct for pages under /pages/ but one level too high on the
        // root index. Rewrite them when this page is the site root.
        if (PREFIX === "pages/") {
          el.querySelectorAll("[href^='../'], [src^='../']").forEach(function (node) {
            var attr = node.hasAttribute("href") ? "href" : "src";
            node.setAttribute(attr, node.getAttribute(attr).slice(3));
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  function waitForPagefind() {
    return new Promise(function (resolve) {
      if (window.PagefindUI) return resolve();
      var tries = 0;
      var timer = setInterval(function () {
        tries++;
        if (window.PagefindUI || tries > 80) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  }

  document.addEventListener("DOMContentLoaded", async function () {
    await loadComponent("header-placeholder", PREFIX + "header.html");
    await loadComponent("footer-placeholder", PREFIX + "footer.html");

    // Pagefind search (only when the UI scripts are present)
    if (document.getElementById("search") && window.PagefindUI) {
      new window.PagefindUI({
        element: "#search",
        showSubResults: true,
        resetStyles: false,
      });
    }
  });
})();
