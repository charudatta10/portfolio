async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

document.addEventListener("DOMContentLoaded", async function () {

  await loadComponent("header-placeholder", "header.html");

  if (window.PagefindUI) {
    new PagefindUI({
      element: "#search",
      showSubResults: true
    });
  }

  await loadComponent("footer-placeholder", "footer.html");
});

loadComponent("header-placeholder", "header.html")
  .then(() => {
    if (window.PagefindUI) {
      new PagefindUI({ element: "#search" });
    }
  });