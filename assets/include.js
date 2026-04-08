async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", async function () {

  // 1️⃣ Load header
  await loadComponent("header-placeholder", "header.html");

  // 🔥 2️⃣ NOW attach events (IMPORTANT)
  initHeaderInteractions();

  // 3️⃣ Wait for Pagefind
  await waitForPagefind();

  new window.PagefindUI({
    element: "#search",
    showSubResults: true,
    resetStyles: false
  });

  // 4️⃣ Load footer
  await loadComponent("footer-placeholder", "footer.html");
});


// ✅ Move all header JS here
function initHeaderInteractions() {

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  // Dropdowns
  document.querySelectorAll(".dropdown > .dropbtn").forEach(link => {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        this.parentElement.classList.toggle("open");
      }
    });
  });
}


// Pagefind wait
function waitForPagefind() {
  return new Promise((resolve) => {
    if (window.PagefindUI) return resolve();
    const interval = setInterval(() => {
      if (window.PagefindUI) {
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });
}