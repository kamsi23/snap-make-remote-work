// SELECT HTML ELEMENTS

const dropdownButtons = document.querySelectorAll(".nav-dropdown-trigger");
const openMenuButton = document.querySelector("#open-menu");
const closeMenuButton = document.querySelector("#close-menu");
const mobileMenu = document.querySelector("#mobile-menu");
const menuBackdrop = document.querySelector("#menu-backdrop");

// DROPDOWN FUNCTION

// Open or close a dropdown menu
function setDropdown(button, shouldOpen) {
  const menu = document.getElementById(button.getAttribute("aria-controls"));

  const arrow = button.querySelector(".dropdown-arrow");

  // Prevent errors if the dropdown menu does not exist
  if (!menu) return;

  button.setAttribute("aria-expanded", String(shouldOpen));

  menu.classList.toggle("hidden", !shouldOpen);

  // Change dropdown arrow
  if (arrow) {
    arrow.src = shouldOpen
      ? "./images/icon-arrow-up.svg"
      : "./images/icon-arrow-down.svg";
  }
}

// CLOSE ALL DROPDOWNS

function closeDropdowns(exceptButton = null) {
  dropdownButtons.forEach((button) => {
    if (button !== exceptButton) {
      setDropdown(button, false);
    }
  });
}

// DROPDOWN BUTTON EVENTS

dropdownButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";

    // Close other dropdowns first
    closeDropdowns(button);

    // Toggle the clicked dropdown
    setDropdown(button, !isOpen);
  });
});

// MOBILE MENU FUNCTION

function setMobileMenu(shouldOpen) {
  if (!mobileMenu || !menuBackdrop || !openMenuButton) {
    return;
  }

  mobileMenu.classList.toggle("hidden", !shouldOpen);

  menuBackdrop.classList.toggle("hidden", !shouldOpen);

  mobileMenu.setAttribute("aria-hidden", String(!shouldOpen));

  openMenuButton.setAttribute("aria-expanded", String(shouldOpen));

  document.body.classList.toggle("overflow-hidden", shouldOpen);

  // Close dropdowns when opening or closing mobile menu
  closeDropdowns();

  if (shouldOpen) {
    closeMenuButton?.focus();
  } else {
    openMenuButton.focus();
  }
}

// CLOSE MOBILE MENU

function closeMobileMenu(restoreFocus = true) {
  if (!mobileMenu || !menuBackdrop || !openMenuButton) {
    return;
  }

  mobileMenu.classList.add("hidden");

  menuBackdrop.classList.add("hidden");

  mobileMenu.setAttribute("aria-hidden", "true");

  openMenuButton.setAttribute("aria-expanded", "false");

  document.body.classList.remove("overflow-hidden");

  closeDropdowns();

  // Return keyboard focus to menu button
  if (restoreFocus) {
    openMenuButton.focus();
  }
}

// MOBILE MENU BUTTON EVENTS

openMenuButton?.addEventListener("click", () => {
  setMobileMenu(true);
});

closeMenuButton?.addEventListener("click", () => {
  closeMobileMenu();
});

menuBackdrop?.addEventListener("click", () => {
  closeMobileMenu();
});

// CLOSE MENU WHEN A LINK IS CLICKED

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

// ESCAPE KEY EVENT

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    // Close mobile menu if open
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      closeMobileMenu();
    } else {
      // Otherwise close dropdown menus
      closeDropdowns();
    }
  }
});

// CLICK OUTSIDE TO CLOSE DROPDOWNS

document.addEventListener("click", (event) => {
  if (
    !event.target.closest(".nav-dropdown-trigger") &&
    !event.target.closest(".dropdown-menu")
  ) {
    closeDropdowns();
  }
});

// RESET MOBILE MENU ON WINDOW RESIZE

window.addEventListener("resize", () => {
  if (
    window.innerWidth >= 768 &&
    mobileMenu &&
    !mobileMenu.classList.contains("hidden")
  ) {
    // Close mobile menu without moving focus
    closeMobileMenu(false);
  }
});
