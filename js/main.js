/* ===========================
   Fortress City Church – Main JS
   =========================== */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav_link').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // Form handling with Formspree (AJAX submission)
  setupFormHandler('contact-form', 'contact-success', 'contact-error');
  setupFormHandler('newsletter-form', 'newsletter-success', 'newsletter-error');
});

function setupFormHandler(formId, successId, errorId) {
  const form = document.getElementById(formId);
  const successEl = document.getElementById(successId);
  const errorEl = document.getElementById(errorId);

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.value || submitBtn.textContent;
    if (submitBtn.tagName === 'BUTTON') {
      submitBtn.textContent = 'Please wait...';
    } else {
      submitBtn.value = 'Please wait...';
    }
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        if (successEl) {
          successEl.classList.add('visible');
          setTimeout(() => successEl.classList.remove('visible'), 5000);
        }
        if (errorEl) errorEl.classList.remove('visible');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      if (errorEl) {
        errorEl.classList.add('visible');
        setTimeout(() => errorEl.classList.remove('visible'), 5000);
      }
      if (successEl) successEl.classList.remove('visible');
    } finally {
      if (submitBtn.tagName === 'BUTTON') {
        submitBtn.textContent = originalText;
      } else {
        submitBtn.value = originalText;
      }
      submitBtn.disabled = false;
    }
  });
}
