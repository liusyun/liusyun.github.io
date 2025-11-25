const colors = [
  { bg: '#a8edea', name: 'Fresh Blue' },
  { bg: '#fed6e3', name: 'Soft Pink' },
  { bg: '#f5f7fa', name: 'Pure White' },
  { bg: '#ffecd2', name: 'Energetic Orange' }
];
const quotes = [
  "生活就是由這些瞬間組成的。",
  "記錄下來，就是永恆。",
  "願你有個美好的一天。"
];
const inputBox = document.getElementById('input-box');
const ticketWrapper = document.getElementById('ticket-wrapper');
const moodInput = document.getElementById('mood-input');
const generateBtn = document.getElementById('generate-btn');

function generateTicket() {
  const mood = moodInput.value.trim();
  if (!mood) return;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  document.getElementById('t-mood').innerText = mood;
  document.getElementById('t-quote').innerText = randomQuote;
  
  const rightPart = document.getElementById('t-right');
  rightPart.style.backgroundColor = randomColor.bg;
  
  localStorage.setItem('userMood', mood);
  
  inputBox.style.display = 'none';
  ticketWrapper.style.display = 'block';
}

function goHome() {
    // 这里的链接需要根据 Hexo 路径动态调整，EJS 中已经处理，但在 JS 里可以指向 portal 页
    window.location.href = "/portal/"; 
}

generateBtn.addEventListener('click', generateTicket);
moodInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') generateTicket();
});