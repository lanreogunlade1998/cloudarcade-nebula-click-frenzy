let score = 0;
let timeLeft = 15;
let combo = 1;
let streak = 0;
let clickCount = 0;
let timerInterval, spawnInterval;
let gameActive = false;
let orbs = [];

const gameArea = document.getElementById('gameArea');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const comboEl = document.getElementById('combo');

function createOrb() {
    if (!gameActive) return;
    const orb = document.createElement('div');
    orb.classList.add('orb');
    
    const isPower = (clickCount % 5 === 0 && clickCount > 0);
    if (isPower) orb.classList.add('power');
    
    const x = Math.random() * (gameArea.clientWidth - 80) + 20;
    const y = Math.random() * (gameArea.clientHeight - 80) + 20;
    orb.style.left = `${x}px`;
    orb.style.top = `${y}px`;
    
    orb.onclick = (e) => {
        e.stopImmediatePropagation();
        hitOrb(orb, isPower);
    };
    
    gameArea.appendChild(orb);
    orbs.push(orb);
    
    setTimeout(() => {
        if (orb.parentNode) {
            orb.remove();
            orbs = orbs.filter(o => o !== orb);
        }
    }, 2200);
}

function hitOrb(orb, isPower) {
    if (!gameActive) return;
    
    const rect = orb.getBoundingClientRect();
    const centerX = rect.left + rect.width/2;
    const centerY = rect.top + rect.height/2;
    
    createExplosion(centerX, centerY, isPower ? 15 : 8);
    
    orb.remove();
    orbs = orbs.filter(o => o !== orb);
    
    clickCount++;
    const points = isPower ? 25 : 10;
    score += Math.floor(points * combo);
    scoreEl.textContent = score;
    
    streak++;
    if (streak >= 3) combo = 2;
    if (streak >= 6) combo = 3;
    comboEl.textContent = `×${combo}`;
}

function createExplosion(x, y, count) {
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = `${x - window.scrollX}px`;
        p.style.top = `${y - window.scrollY}px`;
        p.style.background = Math.random() > 0.5 ? '#00f3ff' : '#ff00aa';
        
        const angle = Math.random() * 360;
        const dist = 40 + Math.random() * 80;
        p.style.setProperty('--x', `${Math.cos(angle) * dist}px`);
        p.style.setProperty('--y', `${Math.sin(angle) * dist}px`);
        
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 900);
    }
}

function startGame() {
    if (gameActive) return;
    gameActive = true;
    score = 0; timeLeft = 15; streak = 0; combo = 1; clickCount = 0;
    scoreEl.textContent = '0';
    timeEl.textContent = '15';
    comboEl.textContent = '×1';
    
    orbs.forEach(o => o.remove());
    orbs = [];
    
    document.getElementById('gameOver').style.display = 'none';
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
    
    spawnInterval = setInterval(createOrb, 650);
    createOrb();
}

function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    clearInterval(spawnInterval);
    orbs.forEach(o => o.remove());
    orbs = [];
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOver').style.display = 'flex';
    updateLeaderboard();
}

function submitScore() {
    const nickname = document.getElementById('nickname').value.trim() || "UNKNOWN_PILOT";
    let leaderboard = JSON.parse(localStorage.getItem('nebulaLeaderboard') || '[]');
    leaderboard.push({ name: nickname, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 8);
    localStorage.setItem('nebulaLeaderboard', JSON.stringify(leaderboard));
    updateLeaderboard();
    alert(`✅ ${nickname} added to the Nebula Hall of Fame!`);
}

function updateLeaderboard() {
    const list = document.getElementById('leaderList');
    let leaderboard = JSON.parse(localStorage.getItem('nebulaLeaderboard') || '[]');
    list.innerHTML = '';
    leaderboard.forEach((entry, i) => {
        const li = document.createElement('li');
        li.textContent = `${i+1}. ${entry.name} — ${entry.score} pts`;
        list.appendChild(li);
    });
}

function restartGame() {
    document.getElementById('gameOver').style.display = 'none';
    startGame();
}

document.getElementById('startBtn').onclick = startGame;
updateLeaderboard();