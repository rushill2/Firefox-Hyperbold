
function boldFirstCharacters() {
    const elements = document.querySelectorAll('p, blockquote, span');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.innerText.trim().length < 50) {
        continue; // Skip elements with less than 50 characters
      }
  
      element.style.fontFamily = "Arial";
      element.style.fontWeight = 300;
      const childNodes = element.childNodes;
      for (let j = 0; j < childNodes.length; j++) {
        const node = childNodes[j];
        if (node.nodeType === Node.TEXT_NODE && node.parentNode.tagName !== 'A') {
          const words = node.textContent.trim().split(/\s+/);
          for (let k = 0; k < words.length; k++) {
            const word = words[k];
            if (word.length <= 2) {
              continue; // Skip words with 2 or fewer characters
            }
            let numCharsToBold = Math.min(Math.floor(word.length / 2), 5);
            if (numCharsToBold < 2) {
              numCharsToBold = 1;
            }
            const firstChars = word.substring(0, numCharsToBold);
            const remainingChars = word.substring(numCharsToBold);
            words[k] = `<strong>${firstChars}</strong>${remainingChars}`;
          }
          const newNode = document.createElement('span');
          newNode.innerHTML = words.join('&nbsp;');
          newNode.style.whiteSpace = 'pre-wrap';
          node.parentNode.replaceChild(newNode, node);
        }
      }
  
      const strongElements = element.querySelectorAll('strong');
      for (let l = 0; l < strongElements.length; l++) {
        strongElements[l].style.fontWeight = 600;
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    boldFirstCharacters();
  });
  
  // Add event listener for chat-container element
  
  const chatContainer = document.querySelector('.chat-container');
  if (chatContainer) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            boldFirstCharacters();
          }
        });
      });
    });
    observer.observe(chatContainer, { childList: true });
  }
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        boldFirstCharacters();
        observer.unobserve(entry.target);
        observer.observe(document.body);
      }
    });
  }, { threshold: 0 });
  
  observer.observe(document.body);