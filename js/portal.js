document.addEventListener('DOMContentLoaded', () => {
  const savedMood = localStorage.getItem('userMood');
  if (savedMood) {
    const moodLink = document.getElementById('mood-nav');
    if (moodLink) {
      moodLink.innerText = savedMood;
    }
  }
});