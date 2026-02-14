async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch (err) {
    console.error("Error loading component:", file);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadComponent("header-placeholder", "/components/header.html");
  loadComponent("footer-placeholder", "/components/footer.html");
});



loadComponent("header-placeholder", "/components/header.html")
  .then(() => {
    if (window.PagefindUI) {
      new PagefindUI({ element: "#search" });
    }
  });

  async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

document.addEventListener("DOMContentLoaded", async function () {

  // Load header first
  await loadComponent("header-placeholder", "/components/header.html");

  // Now initialize Pagefind AFTER header exists
  if (window.PagefindUI) {
    new PagefindUI({
      element: "#search",
      showSubResults: true
    });
  }

  // Load footer
  await loadComponent("footer-placeholder", "/components/footer.html");
});
