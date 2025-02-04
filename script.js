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

// Place this script before the closing </body> tag
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

document.querySelector('.back-to-top').addEventListener('click', function(e) {
  e.preventDefault();
  
  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    
    // If we haven't reached the top yet
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      // Scroll by moving a percentage of the remaining distance
      window.scrollTo(0, c - c / 8);
    }
  };
  
  scrollToTop();
});

// Project Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // Filter projects with smooth transitions
      projects.forEach(project => {
        const projectCategory = project.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === projectCategory) {
          project.classList.remove('hidden');
        } else {
          project.classList.add('hidden');
        }
      });
    });
  });
});