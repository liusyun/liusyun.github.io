const card = document.getElementById('card');
const body = document.querySelector('body');
body.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth / 2 - e.pageX) / 40;
  const y = (window.innerHeight / 2 - e.pageY) / 40;
  card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});
body.addEventListener('mouseleave', () => {
  card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});
const sakuraContainer = document.getElementById('sakura-container');
function createSakura() {
  const sakura = document.createElement('div');
  sakura.classList.add('sakura');
  const size = Math.random() * 10 + 5 + 'px';
  sakura.style.width = size;
  sakura.style.height = size;
  sakura.style.left = Math.random() * 100 + 'vw';
  const duration = Math.random() * 3 + 4 + 's';
  sakura.style.animationDuration = duration;
  const colors = ['#fff', '#ffe6e9', '#ffccd5'];
  sakura.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  sakuraContainer.appendChild(sakura);
  setTimeout(() => {
    sakura.remove();
  }, parseFloat(duration) * 1000);
}
setInterval(createSakura, 300);