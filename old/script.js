document.addEventListener('DOMContentLoaded', () => {
  // Select necessary elements
  const navbar = document.querySelector('.navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const softwareToggle = document.getElementById('software-toggle');
  const creativeToggle = document.getElementById('creative-toggle');
  const softwareContent = document.getElementById('software-content');
  const creativeContent = document.getElementById('creative-content');
  const backToTopButton = document.querySelector('.back-to-top');

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

  // Helper function to show/hide content with animation
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

  // Toggle content visibility based on the selected toggle button
  softwareToggle.addEventListener('click', () => {
    showContent(softwareContent, creativeContent);
  });

  creativeToggle.addEventListener('click', () => {
    showContent(creativeContent, softwareContent);
  });

  // Animate elements with a fade-in effect
  const animateElements = document.querySelectorAll('.animate');
  animateElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
    el.classList.add('fade-in');
  });

  // Mode toggle alert
  const modeToggle = document.getElementById('mode-toggle');
  if (modeToggle) {
    modeToggle.addEventListener('click', () => {
      alert("Adriel only likes dark mode. Sorry!");
    });
  }

  // Highlight current page in navigation
  const navLinkAnchors = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop();
  navLinkAnchors.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Back-to-top functionality
  if (backToTopButton) {
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();

      const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
          window.requestAnimationFrame(scrollToTop);
          window.scrollTo(0, c - c / 8);
        }
      };

      scrollToTop();
    });
  }
});