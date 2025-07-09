// AI Monkey Promotion Dashboard JavaScript

// Application Data
const appData = {
  services: [
    {
      name: "Brand Awareness Videos",
      description: "AI monkey characters promoting your brand in fun, engaging scenarios",
      duration: "6-15 seconds",
      price_range: "₹10,000 - ₹25,000"
    },
    {
      name: "Product Launch Videos", 
      description: "Exciting AI monkey videos showcasing your new products",
      duration: "10-30 seconds",
      price_range: "₹25,000 - ₹50,000"
    },
    {
      name: "Festival/Seasonal Campaigns",
      description: "Special AI monkey videos for Diwali, New Year, and other occasions",
      duration: "15-30 seconds", 
      price_range: "₹30,000 - ₹75,000"
    },
    {
      name: "Premium Custom Videos",
      description: "Fully customized AI monkey videos with complex storylines",
      duration: "30+ seconds",
      price_range: "₹50,000 - ₹1,00,000+"
    }
  ],
  stats: {
    total_videos: "500+",
    brands_served: "50+",
    avg_engagement: "85%",
    completion_time: "2-7 days"
  },
  budget_options: [
    "₹10,000 - ₹25,000",
    "₹25,000 - ₹50,000", 
    "₹50,000 - ₹1,00,000",
    "₹1,00,000+"
  ],
  campaign_types: [
    "Product Launch",
    "Brand Awareness", 
    "Diwali/Festival Campaign",
    "General Promotion",
    "Educational Content",
    "Entertainment/Viral"
  ],
  video_durations: [
    "6-10 seconds",
    "10-15 seconds",
    "15-30 seconds", 
    "30+ seconds"
  ],
  timelines: [
    "Within 1 week",
    "2-3 weeks",
    "1 month",
    "Flexible"
  ]
};

// In-memory storage for submissions
let submissions = [];

// DOM Elements
const homeSection = document.getElementById('home-section');
const submissionsSection = document.getElementById('submissions-section');
const promoForm = document.getElementById('promoForm');
const formStatus = document.getElementById('form-status');
const submissionsTable = document.getElementById('submissions-table');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  loadServices();
  loadStats();
  populateFormDropdowns();
});

// Initialize the application
function initializeApp() {
  showSection('home');
}

// Setup event listeners
function setupEventListeners() {
  // Navigation buttons
  document.querySelectorAll('[data-section]').forEach(button => {
    button.addEventListener('click', function() {
      const section = this.getAttribute('data-section');
      showSection(section);
    });
  });

  // Form submission
  promoForm.addEventListener('submit', handleFormSubmission);

  // Real-time form validation
  const requiredFields = promoForm.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    field.addEventListener('blur', validateField);
    field.addEventListener('input', clearFieldError);
  });
}

// Show specific section
function showSection(sectionName) {
  // Hide all sections
  homeSection.classList.add('hidden');
  submissionsSection.classList.add('hidden');
  
  // Show requested section
  if (sectionName === 'home') {
    homeSection.classList.remove('hidden');
  } else if (sectionName === 'submissions') {
    submissionsSection.classList.remove('hidden');
    loadSubmissions();
  }
  
  // Update navigation buttons
  document.querySelectorAll('[data-section]').forEach(button => {
    button.classList.remove('btn--primary');
    button.classList.add('btn--outline');
  });
  
  const activeButton = document.querySelector(`[data-section="${sectionName}"]`);
  if (activeButton) {
    activeButton.classList.remove('btn--outline');
    activeButton.classList.add('btn--primary');
  }
}

// Load services data
function loadServices() {
  const servicesList = document.getElementById('services-list');
  servicesList.innerHTML = '';
  
  appData.services.forEach(service => {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';
    serviceCard.innerHTML = `
      <h4>${service.name}</h4>
      <p>${service.description}</p>
      <div class="service-meta">
        <span class="service-duration">Duration: ${service.duration}</span>
        <span class="service-price">${service.price_range}</span>
      </div>
    `;
    servicesList.appendChild(serviceCard);
  });
}

// Load stats data
function loadStats() {
  const statsGrid = document.querySelector('.stats-grid');
  statsGrid.innerHTML = '';
  
  const statsData = [
    { label: 'Videos Created', value: appData.stats.total_videos },
    { label: 'Brands Served', value: appData.stats.brands_served },
    { label: 'Avg Engagement', value: appData.stats.avg_engagement },
    { label: 'Completion Time', value: appData.stats.completion_time }
  ];
  
  statsData.forEach(stat => {
    const statCard = document.createElement('div');
    statCard.className = 'stat-card';
    statCard.innerHTML = `
      <h3>${stat.value}</h3>
      <p>${stat.label}</p>
    `;
    statsGrid.appendChild(statCard);
  });
}

// Populate form dropdowns
function populateFormDropdowns() {
  populateDropdown('budget', appData.budget_options);
  populateDropdown('campaignType', appData.campaign_types);
  populateDropdown('videoDuration', appData.video_durations);
  populateDropdown('timeline', appData.timelines);
}

// Helper function to populate dropdown
function populateDropdown(selectId, options) {
  const select = document.getElementById(selectId);
  select.innerHTML = '<option value="">Select an option</option>';
  
  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });
}

// Handle form submission
function handleFormSubmission(event) {
  event.preventDefault();
  
  // Validate form
  if (!validateForm()) {
    showFormStatus('Please fill in all required fields correctly.', 'error');
    promoForm.classList.add('shake');
    setTimeout(() => promoForm.classList.remove('shake'), 500);
    return;
  }
  
  // Collect form data
  const formData = new FormData(promoForm);
  const submissionData = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    brandName: document.getElementById('brandName').value,
    contactName: document.getElementById('contactName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    website: document.getElementById('website').value,
    budget: document.getElementById('budget').value,
    campaignType: document.getElementById('campaignType').value,
    videoDuration: document.getElementById('videoDuration').value,
    timeline: document.getElementById('timeline').value,
    message: document.getElementById('message').value
  };
  
  // Store submission
  submissions.push(submissionData);
  
  // Show success message
  showFormStatus('🎉 Thank you for your submission! We\'ll contact you soon.', 'success');
  
  // Reset form
  promoForm.reset();
  
  // Clear any validation errors
  clearAllFieldErrors();
}

// Validate entire form
function validateForm() {
  const requiredFields = promoForm.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!validateField({ target: field })) {
      isValid = false;
    }
  });
  
  return isValid;
}

// Validate individual field
function validateField(event) {
  const field = event.target;
  const value = field.value.trim();
  let isValid = true;
  
  // Required field validation
  if (field.hasAttribute('required') && !value) {
    showFieldError(field, 'This field is required');
    isValid = false;
  } else if (field.type === 'email' && value && !isValidEmail(value)) {
    showFieldError(field, 'Please enter a valid email address');
    isValid = false;
  } else if (field.type === 'tel' && value && !isValidPhone(value)) {
    showFieldError(field, 'Please enter a valid phone number');
    isValid = false;
  } else if (field.type === 'url' && value && !isValidUrl(value)) {
    showFieldError(field, 'Please enter a valid URL');
    isValid = false;
  } else {
    clearFieldError(field);
  }
  
  return isValid;
}

// Show field error
function showFieldError(field, message) {
  field.classList.add('error');
  
  // Remove existing error message
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Add new error message
  const errorElement = document.createElement('div');
  errorElement.className = 'field-error';
  errorElement.style.color = 'var(--color-error)';
  errorElement.style.fontSize = 'var(--font-size-sm)';
  errorElement.style.marginTop = 'var(--space-4)';
  errorElement.textContent = message;
  
  field.parentNode.appendChild(errorElement);
}

// Clear field error
function clearFieldError(field) {
  if (typeof field === 'object' && field.target) {
    field = field.target;
  }
  
  field.classList.remove('error');
  const errorElement = field.parentNode.querySelector('.field-error');
  if (errorElement) {
    errorElement.remove();
  }
}

// Clear all field errors
function clearAllFieldErrors() {
  const errorFields = promoForm.querySelectorAll('.error');
  errorFields.forEach(field => clearFieldError(field));
}

// Show form status message
function showFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `status ${type}`;
  formStatus.classList.remove('hidden');
  
  // Hide after 5 seconds
  setTimeout(() => {
    formStatus.classList.add('hidden');
  }, 5000);
}

// Load submissions into table
function loadSubmissions() {
  const tbody = submissionsTable.querySelector('tbody');
  tbody.innerHTML = '';
  
  if (submissions.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="empty-state">
          <p>No submissions yet. When brands submit inquiries, they'll appear here.</p>
        </td>
      </tr>
    `;
    return;
  }
  
  submissions.forEach(submission => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${submission.brandName}</td>
      <td>${submission.contactName}</td>
      <td>${submission.email}</td>
      <td>${submission.phone}</td>
      <td>${submission.budget}</td>
      <td>${submission.campaignType}</td>
      <td>${submission.videoDuration}</td>
      <td>${submission.timeline}</td>
    `;
    tbody.appendChild(row);
  });
}

// Validation helper functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Smooth scroll to form
document.addEventListener('click', function(event) {
  if (event.target.getAttribute('href') === '#inquiry-form') {
    event.preventDefault();
    document.getElementById('inquiry-form').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
});