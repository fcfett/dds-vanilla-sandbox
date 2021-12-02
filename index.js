const DEFAULT_HASH = "#home";
const SELECTED_MENU_ITEM_CLASS = "dds__side-nav__item--selected";
const aside = document.getElementById("app__aside");
const sections = document.querySelectorAll(".section");
const navigationHrefs = document.querySelectorAll(`a[onclick^="openSection"`);
const sectionIds = [...sections].map(({ id }) => id);
const contactModal = document.getElementById("contact-modal");
const contactForm = contactModal.querySelector("#contact-form");
const fcAlert = document.getElementById("fc-alert");
const fcAlertMessage = fcAlert.children[0].children[1];

function showAlert(message) {
  const formattedMessage = message.trim().replace(/\n/g, "<br/>");
  fcAlertMessage.innerHTML = formattedMessage;
  fcAlert.classList.add("visible");
}

function closeAlert() {
  fcAlert.classList.remove("visible");
}

function toggleModal(modalElement, toggle) {
  if (!modalElement.Modal)
    throw new Error("the given element must be a modal.");

  const shouldClose = !(toggle ?? modalElement.hidden);
  modalElement.Modal[shouldClose ? "close" : "open"]();
}

function closeContactModal() {
  toggleModal(contactModal, false);
}

function isContactFormFilled() {
  return [...contactForm.elements].every((input) => input.value);
}

function submitContact() {
  if (!isContactFormFilled()) {
    showAlert("Please, fill all the fields to proceed.");
  } else {
    const [{ value: name }, { value: email }, { value: phone }] =
      contactForm.elements;

    showAlert(`
      You've made an outstanding choice, <strong>${name}</strong>!
      
      We'll keep in touch through the given channels.
      
      Email: <strong>${email}</strong>
      Phone: <strong>${phone}</strong>
    `);

    closeContactModal();
    contactForm.reset();
  }
}

function openSection(sectionName) {
  document
    .querySelector(`.${SELECTED_MENU_ITEM_CLASS}`)
    .classList.remove(SELECTED_MENU_ITEM_CLASS);

  for (let i = 0; i < sections.length; i++) {
    const currentSection = sections[i];
    currentSection.style.display = "none";
  }

  document.getElementById(sectionName).style.display = "block";
  document
    .querySelector(`a[onclick="openSection('${sectionName}')"]`)
    .parentElement.classList.add(SELECTED_MENU_ITEM_CLASS);
}

function selectSection() {
  const sectionId = window.location.hash.replace("#", "");

  if (sectionIds.includes(sectionId)) {
    openSection(sectionId);
  } else {
    window.location.hash = DEFAULT_HASH;
  }
}

window.onload = selectSection;
