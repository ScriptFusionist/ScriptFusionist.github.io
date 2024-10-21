const typedText = ["Web Developer", "Maou", "Tech Enthusiast"];
let typingIndex = 0;
let letterIndex = 0;
let currentText = '';
let isDeleting = false;

function type() {
  if (!isDeleting && letterIndex < typedText[typingIndex].length) {
    currentText += typedText[typingIndex].charAt(letterIndex);
    letterIndex++;
  } else if (isDeleting && letterIndex > 0) {
    currentText = currentText.substring(0, currentText.length - 1);
    letterIndex--;
  }

  document.getElementById('typing').textContent = currentText;

  if (letterIndex === typedText[typingIndex].length && !isDeleting) {
    setTimeout(() => isDeleting = true, 1000);
  } else if (letterIndex === 0 && isDeleting) {
    isDeleting = false;
    typingIndex = (typingIndex + 1) % typedText.length;
  }

  setTimeout(type, isDeleting ? 100 : 200);
}

type();