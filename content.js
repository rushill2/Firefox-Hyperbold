function lazyLoadBoldText() {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.fontWeight = 'bold';
          const text = entry.target.innerText.trim();
          const numCharsToBold = Math.min(Math.max(Math.floor(text.length / 4), 1), 5);
          const firstChars = text.substring(0, numCharsToBold);
          const remainingChars = text.substring(numCharsToBold);
          entry.target.innerHTML = `<strong>${firstChars}</strong>${remainingChars}`;
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });
  
    const boldElements = document.querySelectorAll('[data-lazy-bold]');
    boldElements.forEach((el) => {
      observer.observe(el);
    });
  }
  
  document.addEventListener('DOMContentLoaded', lazyLoadBoldText);
  