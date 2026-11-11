/* DanielOS Window Manager */

// Find the desktop folder links
const folders = document.querySelectorAll(".desktop-folders .folder-icon");

// Find the four application windows
const apps = [
  document.getElementById("about"),
  document.getElementById("projects"),
  document.getElementById("contacts"),
  document.getElementById("FAQs"),
].filter(Boolean);

// Hide all applications initially
document.body.classList.add("apps-ready");

// Open the selected application
function openApp(id) {
  apps.forEach((app) => {
    app.classList.toggle("app-open", app.id === id);
  });
}

// Listen for folder clicks
folders.forEach((folder) => {
  folder.addEventListener("click", (event) => {
    const id = folder.getAttribute("href").slice(1);

    if (!apps.some((app) => app.id === id)) return;

    event.preventDefault();

    openApp(id);
  });
});

/* DanielOS Close Window Buttons */

// Find the close button inside each application
apps.forEach((app) => {
  const closeButton = app.querySelector(
    '.window-buttons button[aria-label="Close"]',
  );

  // Make sure the button exists
  if (!closeButton) return;

  // Listen for clicks
  closeButton.addEventListener("click", () => {
    // Hide the application
    app.classList.remove("app-open");
  });
});
