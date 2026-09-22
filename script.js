// ---------------------------------------------
// Aditya Bharti — Portfolio interactivity
// ---------------------------------------------

document.addEventListener('DOMContentLoaded', function () {

  // 1) Smooth scroll for in-page nav links (works even without CSS scroll-behavior)
  document.querySelectorAll('.navlinks a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 2) Highlight the nav link for the section currently in view
  var sections = Array.from(document.querySelectorAll('section[id], header[id]'));
  var navLinks = Array.from(document.querySelectorAll('.navlinks a'));

  function setActiveLink(id) {
    navLinks.forEach(function (a) {
      var isActive = a.getAttribute('href') === '#' + id;
      a.style.color = isActive ? 'var(--ink)' : '';
      a.style.borderColor = isActive ? 'var(--signal)' : 'transparent';
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  // 3) Auto-update the copyright year in the footer fine-print line
  var fineprint = document.querySelector('.fineprint');
  if (fineprint) {
    var currentYear = new Date().getFullYear();
    fineprint.innerHTML = fineprint.innerHTML.replace(/©\s*\d{4}/, '© ' + currentYear);
  }

});
