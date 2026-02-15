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

  // 1️⃣ Load header first
  await loadComponent("header-placeholder", "header.html");

  // 2️⃣ Wait until Pagefind script is actually available
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

  await waitForPagefind();

  // 3️⃣ Now initialize search
  new window.PagefindUI({
    element: "#search",
    showSubResults: true,
    resetStyles: false
  });

  // 4️⃣ Load footer
  await loadComponent("footer-placeholder", "footer.html");
});
