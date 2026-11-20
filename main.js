const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");

function closeMenu() {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navigation?.classList.toggle("is-open", !isOpen);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", link.getAttribute("href"));
    closeMenu();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const form = document.querySelector("#contact-form");
const sendButton = form?.querySelector(".send-button");
const statusMessage = form?.querySelector(".form-status");

function updateSendState() {
  if (!form || !sendButton) return;
  const email = form.elements.namedItem("email");
  const message = form.elements.namedItem("message");
  sendButton.disabled = !email.checkValidity() || !message.value.trim();
}

form?.addEventListener("input", () => {
  if (statusMessage) statusMessage.textContent = "";
  updateSendState();
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (statusMessage) statusMessage.textContent = "Спасибо! Ваше сообщение готово к отправке.";
  form.reset();
  updateSendState();
});
