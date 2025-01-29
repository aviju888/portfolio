// Select necessary elements
const navbar = document.querySelector('.navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const softwareToggle = document.getElementById('software-toggle');
const creativeToggle = document.getElementById('creative-toggle');
const softwareContent = document.getElementById('software-content');
const creativeContent = document.getElementById('creative-content');

// Add scroll behavior for navbar styling
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    navbar.classList.add('scrolled', 'minimized');
  } else {
    navbar.classList.remove('scrolled', 'minimized');
    navLinks.classList.remove('dropdown-active'); // Close dropdown when scrolling to the top
  }
});

// Toggle dropdown menu when hamburger is clicked
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('dropdown-active'); // Show/hide dropdown menu
});

// Close dropdown when clicking outside of it
window.addEventListener('click', (e) => {
  if (
    !e.target.closest('.nav-links') && 
    !e.target.closest('#nav-toggle') && 
    navLinks.classList.contains('dropdown-active')
  ) {
    navLinks.classList.remove('dropdown-active');
  }
});

function showContent(contentToShow, contentToHide) {
  contentToHide.classList.remove('active');
  setTimeout(() => {
    contentToHide.style.display = 'none';
    contentToShow.style.display = 'block';
    setTimeout(() => {
      contentToShow.classList.add('active');
    }, 10);
  }, 500);
}

softwareToggle.addEventListener('click', () => {
  showContent(softwareContent, creativeContent);
});

creativeToggle.addEventListener('click', () => {
  showContent(creativeContent, softwareContent);
});

<!-- Place this script before the closing </body> tag -->
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.animate');
    animateElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`; // 0.2s delay between elements
      el.classList.add('fade-in');
    });

    const modeToggle = document.getElementById('mode-toggle');

    modeToggle.addEventListener('click', () => {
      alert("Adriel only likes dark mode. Sorry!");
    });
  });
</script>