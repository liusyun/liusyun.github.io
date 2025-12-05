// === 打字机逻辑 (保持不变) ===
const textToType = 'WELCOME!!'; 
const speed = 150; 
const pauseTime = 1500; 
let charIndex = 0;

function typeWriter() {
    const h1Element = document.getElementById('typewriter-text');
    if (!h1Element) return;
    if (charIndex < textToType.length) {
        h1Element.innerHTML += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(resetTypewriter, pauseTime);
    }
}
function resetTypewriter() {
    const h1Element = document.getElementById('typewriter-text');
    h1Element.innerHTML = '';
    charIndex = 0;
    h1Element.innerHTML = '&nbsp;'; 
    setTimeout(() => {
        h1Element.innerHTML = ''; 
        typeWriter();
    }, 500); 
}
document.addEventListener('DOMContentLoaded', typeWriter);

// === 滚动逻辑 (保持不变) ===
function scrollToHub() { document.getElementById('section-hub').scrollIntoView({ behavior: 'smooth' }); }
function scrollToTop() { document.getElementById('section-welcome').scrollIntoView({ behavior: 'smooth' }); }
function scrollToStats() { document.getElementById('section-stats').scrollIntoView({ behavior: 'smooth' }); }

// === 视差效果 (保持不变) ===
const card = document.getElementById('card');
const welcomeSection = document.querySelector('.section-welcome');
if (welcomeSection && card) {
    welcomeSection.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 60;
        const y = (window.innerHeight / 2 - e.pageY) / 60;
        card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
    welcomeSection.addEventListener('mouseleave', () => {
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
}

// === Canvas 动画与状态保持逻辑 ===
const canvas = document.getElementById('global-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let animationId;
let particles = [];

if (canvas && ctx) {
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 樱花 (白天)
    class Sakura {
        constructor() {
            this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
            this.size = Math.random() * 8 + 6; this.speedX = Math.random() * 1 - 0.5; this.speedY = Math.random() * 1.5 + 1;
            this.rotation = Math.random() * 360; this.rotationSpeed = Math.random() * 2 - 1;
            this.color = ['#fff', '#ffe6e9', '#ffccd5'][Math.floor(Math.random() * 3)];
        }
        update() { this.x += this.speedX; this.y += this.speedY; this.rotation += this.rotationSpeed; if (this.y > canvas.height) { this.y = -10; this.x = Math.random() * canvas.width; }}
        draw() { ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rotation * Math.PI / 180); ctx.fillStyle = this.color; ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(this.size/2, -this.size/2, this.size, -this.size/2, 0, this.size); ctx.fill(); ctx.restore(); }
    }

    // 萤火虫 (夜晚)
    class Firefly {
        constructor() {
            this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 3 + 1; 
            this.angle = Math.random() * Math.PI * 2; this.speed = Math.random() * 0.4 + 0.1; this.alpha = Math.random(); this.fadeSpeed = Math.random() * 0.02 + 0.005;
            this.colorBase = `255, 230, ${Math.floor(Math.random() * 100 + 150)}`; 
        }
        update() { this.x += Math.cos(this.angle) * this.speed; this.y += Math.sin(this.angle) * this.speed; this.angle += Math.random() * 0.2 - 0.1; if (this.x < 0) this.x = canvas.width; if (this.x > canvas.width) this.x = 0; if (this.y < 0) this.y = canvas.height; if (this.y > canvas.height) this.y = 0; this.alpha += this.fadeSpeed; if (this.alpha > 1 || this.alpha < 0.2) this.fadeSpeed = -this.fadeSpeed; }
        draw() { ctx.save(); ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(${this.colorBase}, ${Math.abs(this.alpha)})`; ctx.fill(); ctx.shadowBlur = 15; ctx.shadowColor = `rgba(${this.colorBase}, 0.8)`; ctx.fill(); ctx.restore(); }
    }

    function initParticles(type) {
        particles = [];
        const count = window.innerWidth < 768 ? 25 : 60; 
        for (let i = 0; i < count; i++) {
            type === 'sakura' ? particles.push(new Sakura()) : particles.push(new Firefly());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        particles.forEach(p => { p.update(); p.draw(); });
        animationId = requestAnimationFrame(animate);
    }

    // === [核心修改] 状态管理逻辑 ===
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // 1. 读取保存的状态
    const savedTheme = localStorage.getItem('theme'); // 'dark' 或 'light'
    const isDarkInit = savedTheme === 'dark';

    // 2. 初始化应用状态
    if (isDarkInit) {
        body.classList.add('night-mode');
        initParticles('firefly');
        // 同步按钮状态（如果按钮支持 value 属性）
        if (toggleBtn) toggleBtn.setAttribute('value', 'dark');
    } else {
        body.classList.remove('night-mode');
        initParticles('sakura');
        if (toggleBtn) toggleBtn.setAttribute('value', 'light');
    }
    animate();

    // 3. 监听切换事件并保存
    if (toggleBtn) {
        toggleBtn.addEventListener('change', (e) => {
            const isDarkMode = e.detail === 'dark';
            
            // 保存到 LocalStorage
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

            if (isDarkMode) {
                body.classList.add('night-mode');
                cancelAnimationFrame(animationId);
                initParticles('firefly');
                animate();
            } else {
                body.classList.remove('night-mode');
                cancelAnimationFrame(animationId);
                initParticles('sakura');
                animate();
            }
        });
    }
}