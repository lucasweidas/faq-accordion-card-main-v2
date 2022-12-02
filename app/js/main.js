import '../scss/main.scss';

// Global Variables
const faq = document.querySelector('[data-js="faq"]');
const resizeObserver = new ResizeObserver(handleDropdownResize);

// Event Listeners
faq.addEventListener('click', handleFaqClick);

// Handler Functions
function handleFaqClick({ target }) {
  if (target.matches('[data-js="button-dropdown"]')) {
    toggleQuestionDropdown(target);
  }
}

function handleDropdownResize(event) {
  event.forEach(({ target, borderBoxSize }) => {
    const { blockSize } = borderBoxSize[0];
    const dropdown = target.closest('[data-js="dropdown"]');

    setDropdownHeight(dropdown, blockSize);
  });
}

// Util Functions
function toggleQuestionDropdown(button) {
  const question = button.closest('[data-js="question"]');
  const dropdown = question.querySelector('[data-js="dropdown"]');
  const dropdownContent = dropdown.querySelector('[data-js="dropdown-content"]');
  const isActive = question.classList.contains('active');

  question.classList.toggle('active');
  isActive && setDropdownHeight(dropdown, 0);
  dropdown.setAttribute('aria-hidden', isActive);
  toggleResizeObserver(dropdownContent, !isActive);
}

function toggleResizeObserver(dropdownContent, isActive) {
  if (isActive) {
    resizeObserver.observe(dropdownContent);
  } else {
    resizeObserver.unobserve(dropdownContent);
  }
}

// Helper Functions
function setDropdownHeight(dropdown, height) {
  dropdown.style.setProperty('--dropdown-height', `${height}px`);
}
