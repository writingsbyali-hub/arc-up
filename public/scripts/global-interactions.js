/**
 * Global Event Delegation for Interactive Features
 *
 * This script uses event delegation to handle all interactive features
 * across the site without accumulating duplicate event listeners during
 * Astro view transitions.
 *
 * IMPORTANT: This single listener persists through all navigations.
 * No cleanup required!
 */

// Guard: Only initialize once
if (window.__arcupGlobalInteractionsInitialized) {
  console.log('[ArcUp] Global interactions already initialized, skipping');
} else {
  console.log('[ArcUp] Initializing global interactions');
  window.__arcupGlobalInteractionsInitialized = true;

// =============================================================================
// STATE MANAGEMENT
// =============================================================================

// Tour modal state
let currentTourStep = 1;
const totalTourSteps = 3;

// Contact modal state
let selectedPersona = null;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Tour Modal Functions
 */
function showTourStep(step) {
  const tourStepIndicator = document.getElementById('tour-step-indicator');
  const tourPrev = document.getElementById('tour-prev');
  const tourNext = document.getElementById('tour-next');

  document.querySelectorAll('.tour-step').forEach(el => el.classList.add('hidden'));
  const stepElement = document.querySelector(`.tour-step[data-step="${step}"]`);
  if (stepElement) {
    stepElement.classList.remove('hidden');
  }

  if (tourStepIndicator) {
    tourStepIndicator.textContent = `Step ${step} of ${totalTourSteps}`;
  }

  if (tourPrev) {
    tourPrev.disabled = step === 1;
  }

  if (tourNext) {
    if (step === totalTourSteps) {
      tourNext.textContent = 'Get Started →';
    } else {
      tourNext.textContent = 'Next →';
    }
  }
}

function openTour() {
  const tourModal = document.getElementById('tour-modal');
  const tourContent = document.getElementById('tour-content');

  if (!tourModal || !tourContent) return;

  tourModal.classList.remove('opacity-0', 'invisible');
  tourContent.classList.remove('scale-95');
  tourContent.classList.add('scale-100');
  document.body.style.overflow = 'hidden';
  showTourStep(currentTourStep);
}

function closeTour() {
  const tourModal = document.getElementById('tour-modal');
  const tourContent = document.getElementById('tour-content');

  if (!tourModal || !tourContent) return;

  tourModal.classList.add('opacity-0', 'invisible');
  tourContent.classList.add('scale-95');
  tourContent.classList.remove('scale-100');
  document.body.style.overflow = '';
  currentTourStep = 1;
  showTourStep(1);
}

/**
 * Contact Modal Functions
 */
function openContactModal(persona) {
  const contactModal = document.getElementById('contact-modal');
  const contactContent = document.getElementById('contact-modal-content');
  const personaSelect = document.getElementById('persona');

  if (!contactModal || !contactContent) return;

  // Store selected persona
  selectedPersona = persona;

  // Pre-select persona if provided
  if (persona && personaSelect) {
    personaSelect.value = persona;
  }

  // Show modal
  contactModal.classList.remove('opacity-0', 'invisible');
  contactModal.setAttribute('aria-hidden', 'false');
  contactContent.classList.remove('scale-95');
  contactContent.classList.add('scale-100');
  document.body.style.overflow = 'hidden';

  // Focus first input
  setTimeout(() => {
    const firstInput = document.getElementById('name');
    if (firstInput) firstInput.focus();
  }, 100);
}

function closeContactModal() {
  const contactModal = document.getElementById('contact-modal');
  const contactContent = document.getElementById('contact-modal-content');

  if (!contactModal || !contactContent) return;

  contactModal.classList.add('opacity-0', 'invisible');
  contactModal.setAttribute('aria-hidden', 'true');
  contactContent.classList.add('scale-95');
  contactContent.classList.remove('scale-100');
  document.body.style.overflow = '';

  // Reset form after animation completes
  setTimeout(() => {
    const form = document.getElementById('contact-form');
    if (form) form.reset();
    hideFormStatus();
    selectedPersona = null;
  }, 300);
}

function toggleAnonymousFields() {
  const anonymousCheckbox = document.getElementById('anonymous');
  const identityFields = document.getElementById('identity-fields');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  if (!anonymousCheckbox || !identityFields) return;

  const isAnonymous = anonymousCheckbox.checked;

  if (isAnonymous) {
    // Hide identity fields
    identityFields.style.display = 'none';
    nameInput.removeAttribute('required');
    emailInput.removeAttribute('required');
  } else {
    // Show identity fields
    identityFields.style.display = 'block';
    nameInput.setAttribute('required', 'required');
    emailInput.setAttribute('required', 'required');
  }
}

function showFormStatus(message, isError = false) {
  const statusEl = document.getElementById('form-status');
  if (!statusEl) return;

  statusEl.className = `p-4 rounded-lg ${isError ? 'bg-red-500/10 border border-red-500/30 text-red-400' : 'bg-green-500/10 border border-green-500/30 text-green-400'}`;
  statusEl.textContent = message;
  statusEl.classList.remove('hidden');
}

function hideFormStatus() {
  const statusEl = document.getElementById('form-status');
  if (statusEl) {
    statusEl.classList.add('hidden');
  }
}

async function handleContactFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitButton = document.getElementById('contact-submit');
  const originalButtonText = submitButton ? submitButton.textContent : '';

  try {
    // Disable submit button
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    // Collect form data
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      anonymous: formData.get('anonymous') === 'on',
      persona: formData.get('persona'),
      message: formData.get('message'),
      skills: formData.getAll('skills'),
      contribution: formData.get('contribution')
    };

    // Send to serverless function
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      showFormStatus('Message sent successfully! We\'ll be in touch soon.', false);

      // Close modal after delay
      setTimeout(() => {
        closeContactModal();
      }, 2000);
    } else {
      showFormStatus(result.error || 'Failed to send message. Please try again.', true);
    }

  } catch (error) {
    console.error('Form submission error:', error);
    showFormStatus('Network error. Please check your connection and try again.', true);
  } finally {
    // Re-enable submit button
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  }
}

/**
 * Tab Navigation Functions
 */
function handleTabClick(button) {
  const tabId = button.dataset.tab;
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  // Hide all tab contents
  tabContents.forEach(content => {
    content.classList.add('hidden');
    content.setAttribute('aria-hidden', 'true');
  });

  // Show selected tab content
  const selectedTab = document.getElementById(`tab-${tabId}`);
  if (selectedTab) {
    selectedTab.classList.remove('hidden');
    selectedTab.setAttribute('aria-hidden', 'false');
  }

  // Update button states
  tabButtons.forEach(btn => {
    btn.classList.remove('text-arc-electric', 'border-b-2', 'border-arc-electric', 'bg-arc-electric/5');
    btn.classList.add('text-gray-400');
    btn.setAttribute('aria-selected', 'false');
  });

  // Activate clicked button
  button.classList.remove('text-gray-400');
  button.classList.add('text-arc-electric', 'border-b-2', 'border-arc-electric', 'bg-arc-electric/5');
  button.setAttribute('aria-selected', 'true');

  // Smooth scroll to top of content
  if (selectedTab) {
    selectedTab.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Interest Checkbox / Stream Matcher Functions
 */
function highlightStreams(matchedStreamIds) {
  const streamCards = document.querySelectorAll('.stream-card');

  if (matchedStreamIds.length === 0) {
    // No selections - show all streams normally
    streamCards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
      card.style.filter = 'none';
    });
    return;
  }

  streamCards.forEach(card => {
    const streamId = card.getAttribute('data-stream');

    if (matchedStreamIds.includes(streamId)) {
      // Highlight matched streams
      card.style.opacity = '1';
      card.style.transform = 'scale(1.02)';
      card.style.filter = 'brightness(1.15)';
      card.style.transition = 'all 0.3s ease';
    } else {
      // Dim non-matched streams
      card.style.opacity = '0.3';
      card.style.transform = 'scale(0.98)';
      card.style.filter = 'grayscale(0.7)';
      card.style.transition = 'all 0.3s ease';
    }
  });

  // Scroll to streams grid
  const streamsGrid = document.getElementById('streams-grid');
  if (streamsGrid) {
    streamsGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function handleInterestCheckboxChange() {
  const interestCheckboxes = document.querySelectorAll('.interest-checkbox');
  const checkedBoxes = Array.from(interestCheckboxes).filter(cb => cb.checked);
  const matchStatus = document.getElementById('match-status');

  if (checkedBoxes.length === 0) {
    // No selections - reset
    highlightStreams([]);
    if (matchStatus) {
      matchStatus.textContent = 'Select interests to see matching streams highlighted below';
    }
    return;
  }

  // Get all matched stream IDs from checked boxes
  const matchedStreamIds = [];
  checkedBoxes.forEach(cb => {
    const matches = JSON.parse(cb.getAttribute('data-matches'));
    matchedStreamIds.push(...matches);
  });

  // Remove duplicates
  const uniqueMatches = [...new Set(matchedStreamIds)];

  // Update status message
  const matchCount = uniqueMatches.length;
  if (matchStatus) {
    matchStatus.textContent = `${matchCount} stream${matchCount !== 1 ? 's' : ''} match${matchCount === 1 ? 'es' : ''} your interests — highlighted below ↓`;
  }

  // Highlight matched streams
  highlightStreams(uniqueMatches);
}

/**
 * Pillar Filter Functions
 */
function handlePillarFilterClick(button) {
  const filterValue = button.getAttribute('data-filter');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const streamCards = document.querySelectorAll('.stream-card');

  // Update button states - maintain color coding
  filterButtons.forEach(btn => {
    const btnFilter = btn.getAttribute('data-filter');

    // Reset all buttons to their default inactive state
    if (btnFilter === 'all') {
      btn.classList.remove('bg-arc-electric', 'text-white', 'hover:bg-arc-electric/90');
      btn.classList.add('bg-arc-electric/20', 'text-arc-electric', 'border', 'border-arc-electric/30', 'hover:bg-arc-electric/30');
    } else if (btnFilter === 'lab') {
      btn.classList.remove('bg-yellow-400/30');
      btn.classList.add('bg-yellow-400/20');
    } else if (btnFilter === 'framework') {
      btn.classList.remove('bg-green-400/30');
      btn.classList.add('bg-green-400/20');
    } else if (btnFilter === 'commons') {
      btn.classList.remove('bg-blue-400/30');
      btn.classList.add('bg-blue-400/20');
    }
  });

  // Set active button state
  if (filterValue === 'all') {
    button.classList.remove('bg-arc-electric/20', 'text-arc-electric', 'border', 'border-arc-electric/30', 'hover:bg-arc-electric/30');
    button.classList.add('bg-arc-electric', 'text-white', 'hover:bg-arc-electric/90');
  } else if (filterValue === 'lab') {
    button.classList.remove('bg-yellow-400/20');
    button.classList.add('bg-yellow-400/30');
  } else if (filterValue === 'framework') {
    button.classList.remove('bg-green-400/20');
    button.classList.add('bg-green-400/30');
  } else if (filterValue === 'commons') {
    button.classList.remove('bg-blue-400/20');
    button.classList.add('bg-blue-400/30');
  }

  // Filter streams
  if (filterValue === 'all') {
    streamCards.forEach(card => {
      card.style.display = 'block';
    });
  } else {
    streamCards.forEach(card => {
      const pillar = card.getAttribute('data-pillar');
      if (pillar === filterValue) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Reset highlighting when filtering
  highlightStreams([]);
}

/**
 * Persona Navigation Functions
 */
function showPersona(personaId) {
  const personaButtons = document.querySelectorAll('.persona-btn');
  const personaContents = document.querySelectorAll('.persona-content');

  // Hide all content panels
  personaContents.forEach(content => {
    content.classList.add('hidden');
  });

  // Remove active state from all buttons
  personaButtons.forEach(btn => {
    btn.classList.remove('ring-2', 'ring-offset-2', 'ring-offset-primary-900');
    const persona = btn.getAttribute('data-persona');
    if (persona === 'student') {
      btn.classList.remove('ring-yellow-400', 'border-yellow-400', 'bg-yellow-400/10');
      btn.classList.add('border-yellow-400/30');
    } else if (persona === 'researcher') {
      btn.classList.remove('ring-green-400', 'border-green-400', 'bg-green-400/10');
      btn.classList.add('border-green-400/30');
    } else if (persona === 'practitioner') {
      btn.classList.remove('ring-blue-400', 'border-blue-400', 'bg-blue-400/10');
      btn.classList.add('border-blue-400/30');
    } else if (persona === 'collaborator') {
      btn.classList.remove('ring-purple-400', 'border-purple-400', 'bg-purple-400/10');
      btn.classList.add('border-purple-400/30');
    }
  });

  // Show selected content panel
  const selectedContent = document.getElementById(`content-${personaId}`);
  if (selectedContent) {
    selectedContent.classList.remove('hidden');
  }

  // Add active state to selected button
  const activeButton = document.querySelector(`[data-persona="${personaId}"]`);
  if (activeButton) {
    activeButton.classList.add('ring-2', 'ring-offset-2', 'ring-offset-primary-900');
    if (personaId === 'student') {
      activeButton.classList.remove('border-yellow-400/30');
      activeButton.classList.add('ring-yellow-400', 'border-yellow-400', 'bg-yellow-400/10');
    } else if (personaId === 'researcher') {
      activeButton.classList.remove('border-green-400/30');
      activeButton.classList.add('ring-green-400', 'border-green-400', 'bg-green-400/10');
    } else if (personaId === 'practitioner') {
      activeButton.classList.remove('border-blue-400/30');
      activeButton.classList.add('ring-blue-400', 'border-blue-400', 'bg-blue-400/10');
    } else if (personaId === 'collaborator') {
      activeButton.classList.remove('border-purple-400/30');
      activeButton.classList.add('ring-purple-400', 'border-purple-400', 'bg-purple-400/10');
    }
  }

  // Smooth scroll to content
  if (selectedContent) {
    selectedContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Back to Top Button
 */
function updateBackToTopButton() {
  const backToTopButton = document.getElementById('back-to-top');
  if (!backToTopButton) return;

  // Responsive scroll trigger: 300px on mobile, 500px on desktop
  const isMobile = window.innerWidth < 768; // Tailwind md breakpoint
  const scrollThreshold = isMobile ? 300 : 500;

  if (window.scrollY > scrollThreshold) {
    backToTopButton.classList.remove('opacity-0', 'invisible');
    backToTopButton.classList.add('opacity-100', 'visible');
  } else {
    backToTopButton.classList.add('opacity-0', 'invisible');
    backToTopButton.classList.remove('opacity-100', 'visible');
  }
}

// =============================================================================
// PAGE-SPECIFIC INITIALIZATION
// =============================================================================

/**
 * Initialize projects page URL parameter handling
 */
function initProjectsPageURLHandling() {
  const urlParams = new URLSearchParams(window.location.search);
  const pillarParam = urlParams.get('pillar');
  const streamsGrid = document.getElementById('streams-grid');

  if (pillarParam && streamsGrid) {
    // Auto-select the pillar filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      if (btn.getAttribute('data-filter') === pillarParam) {
        btn.click();
      }
    });

    // Scroll to the streams grid after filter is applied
    setTimeout(() => {
      streamsGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }
}

/**
 * Initialize get-started page with first persona selected
 */
function initGetStartedPageDefaults() {
  const personaButtons = document.querySelectorAll('.persona-btn');
  if (personaButtons.length > 0) {
    showPersona('student');
  }
}

/**
 * Initialize research page tabs with a default selection
 */
function initResearchPageDefaults() {
  const defaultTab = document.querySelector('.tab-button');
  if (defaultTab) {
    // Call the same click handler to apply all classes/styles
    handleTabClick(defaultTab);
  }
}

/**
 * Handle page-specific initialization on navigation
 */
function handlePageInit() {
  const currentPath = window.location.pathname;

  // Projects page initialization
  if (currentPath.includes('/projects')) {
    // Small delay to ensure DOM is fully ready after view transition
    setTimeout(initProjectsPageURLHandling, 50);
  }

  // Get Started page initialization
  if (currentPath.includes('/get-started')) {
    initGetStartedPageDefaults();
  }

  // Research page tab initialization
  if (currentPath.includes('/research')) {
    initResearchPageDefaults();
  }
}

// =============================================================================
// MAIN EVENT DELEGATION
// =============================================================================

/**
 * Single click handler for all interactive elements
 */
document.addEventListener('click', (e) => {
  // Tour modal buttons
  if (e.target.id === 'tour-button' || e.target.closest('#tour-button')) {
    openTour();
    return;
  }

  if (e.target.id === 'tour-close' || e.target.closest('#tour-close')) {
    closeTour();
    return;
  }

  const tourModal = document.getElementById('tour-modal');
  if (e.target === tourModal) {
    closeTour();
    return;
  }

  if (e.target.id === 'tour-prev' || e.target.closest('#tour-prev')) {
    if (currentTourStep > 1) {
      currentTourStep--;
      showTourStep(currentTourStep);
    }
    return;
  }

  if (e.target.id === 'tour-next' || e.target.closest('#tour-next')) {
    if (currentTourStep < totalTourSteps) {
      currentTourStep++;
      showTourStep(currentTourStep);
    } else {
      window.location.href = '/get-started';
    }
    return;
  }

  // Contact modal buttons
  const contactModalBtn = e.target.closest('.contact-modal-btn');
  if (contactModalBtn) {
    const persona = contactModalBtn.getAttribute('data-modal-persona');
    openContactModal(persona);
    return;
  }

  if (e.target.id === 'contact-modal-close' || e.target.closest('#contact-modal-close')) {
    closeContactModal();
    return;
  }

  if (e.target.id === 'contact-cancel' || e.target.closest('#contact-cancel')) {
    closeContactModal();
    return;
  }

  const contactModal = document.getElementById('contact-modal');
  if (e.target === contactModal) {
    closeContactModal();
    return;
  }

  // Tab navigation
  const tabButton = e.target.closest('.tab-button');
  if (tabButton) {
    handleTabClick(tabButton);
    return;
  }

  // Pillar filter buttons
  const filterBtn = e.target.closest('.filter-btn');
  if (filterBtn) {
    handlePillarFilterClick(filterBtn);
    return;
  }

  // Persona buttons
  const personaBtn = e.target.closest('.persona-btn');
  if (personaBtn) {
    const persona = personaBtn.getAttribute('data-persona');
    showPersona(persona);
    return;
  }

  // Back to top button
  if (e.target.id === 'back-to-top' || e.target.closest('#back-to-top')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Smooth scroll for anchor links
  const anchor = e.target.closest('a[href^="#"]');
  if (anchor) {
    const href = anchor.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

/**
 * Single change handler for checkboxes
 */
document.addEventListener('change', (e) => {
  // Interest checkboxes
  if (e.target.classList.contains('interest-checkbox')) {
    handleInterestCheckboxChange();
    return;
  }

  // Anonymous checkbox
  if (e.target.id === 'anonymous') {
    toggleAnonymousFields();
    return;
  }
});

/**
 * Form submission handler
 */
document.addEventListener('submit', (e) => {
  // Contact form submission
  if (e.target.id === 'contact-form') {
    handleContactFormSubmit(e);
    return;
  }
});

/**
 * Keyboard event delegation
 */
document.addEventListener('keydown', (e) => {
  // Contact modal keyboard navigation (Escape to close)
  const contactModal = document.getElementById('contact-modal');
  if (contactModal && !contactModal.classList.contains('invisible')) {
    if (e.key === 'Escape') {
      closeContactModal();
      return;
    }
  }

  // Tour modal keyboard navigation
  const tourModal = document.getElementById('tour-modal');
  if (tourModal && !tourModal.classList.contains('invisible')) {
    if (e.key === 'Escape') {
      closeTour();
      return;
    }
    if (e.key === 'ArrowRight' && currentTourStep < totalTourSteps) {
      currentTourStep++;
      showTourStep(currentTourStep);
      return;
    }
    if (e.key === 'ArrowLeft' && currentTourStep > 1) {
      currentTourStep--;
      showTourStep(currentTourStep);
      return;
    }
  }

  // Tab navigation keyboard shortcuts
  const focusedTabButton = document.activeElement;
  if (focusedTabButton && focusedTabButton.classList.contains('tab-button')) {
    const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
    const currentIndex = tabButtons.indexOf(focusedTabButton);
    let newIndex;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      newIndex = (currentIndex + 1) % tabButtons.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      newIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
    }

    if (newIndex !== undefined) {
      tabButtons[newIndex].focus();
      tabButtons[newIndex].click();
    }
    return;
  }

  // Persona button keyboard navigation
  const focusedPersonaButton = document.activeElement;
  if (focusedPersonaButton && focusedPersonaButton.classList.contains('persona-btn')) {
    const personaButtons = Array.from(document.querySelectorAll('.persona-btn'));
    const currentIndex = personaButtons.indexOf(focusedPersonaButton);
    let newIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      newIndex = (currentIndex + 1) % personaButtons.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      newIndex = (currentIndex - 1 + personaButtons.length) % personaButtons.length;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      focusedPersonaButton.click();
      return;
    }

    if (newIndex !== undefined) {
      personaButtons[newIndex].focus();
    }
    return;
  }

  // Projects page: Reset highlighting on Escape
  if (e.key === 'Escape' && window.location.pathname.includes('/projects')) {
    highlightStreams([]);
    const interestCheckboxes = document.querySelectorAll('.interest-checkbox');
    interestCheckboxes.forEach(cb => cb.checked = false);
    return;
  }
});

/**
 * Scroll event delegation
 */
window.addEventListener('scroll', updateBackToTopButton);

/**
 * Initialize on page load and after view transitions
 */
document.addEventListener('astro:page-load', handlePageInit);

// Initial page load (for first visit)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handlePageInit);
} else {
  handlePageInit();
}

// Close the initialization guard
}
