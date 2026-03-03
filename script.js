let highestZ = 1;

class Paper {
    holdingPaper = false;
    mouseTouchX = 0;
    mouseTouchY = 0;
    mouseX = 0;
    mouseY = 0;
    prevMouseX = 0;
    prevMouseY = 0;
    velX = 0;
    velY = 0;
    rotation = Math.random() * 30 - 15;
    currentPaperX = 0;
    currentPaperY = 0;
    rotating = false;

    init(paper) {

        document.addEventListener('mousemove', (e) => {
            if (!this.rotating) {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
                this.velX = this.mouseX - this.prevMouseX;
                this.velY = this.mouseY - this.prevMouseY;
            }

            const dirX = e.clientX - this.mouseTouchX;
            const dirY = e.clientY - this.mouseTouchY;
            const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
            const dirNormalizedX = dirX / dirLength;
            const dirNormalizedY = dirY / dirLength;
            const angle = Math.atan2(dirNormalizedY, dirNormalizedX);

            let degrees = 180 * angle / Math.PI;
            degrees = (360 + Math.round(degrees)) % 360;

            if (this.rotating) {
                this.rotation = degrees;
            }

            if (this.holdingPaper) {
                if (!this.rotating) {
                    this.currentPaperX += this.velX;
                    this.currentPaperY += this.velY;
                }

                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;

                paper.style.transform =
                    `translateX(${this.currentPaperX}px)
                     translateY(${this.currentPaperY}px)
                     rotateZ(${this.rotation}deg)`;
            }
        });

        paper.addEventListener('mousedown', (e) => {
            if (this.holdingPaper) return;

            this.holdingPaper = true;
            paper.style.zIndex = highestZ++;
            
            if (e.button === 0) {
                this.mouseTouchX = this.mouseX;
                this.mouseTouchY = this.mouseY;
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;
            }

            if (e.button === 2) {
                this.rotating = true;
            }
        });

        window.addEventListener('mouseup', () => {
            this.holdingPaper = false;
            this.rotating = false;
        });
    }
}

// Inicializar papeles
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);

    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;

    paper.style.transform =
        `translateX(${randomX}px)
         translateY(${randomY}px)
         rotateZ(${Math.random() * 30 - 15}deg)`;
});


// =====================
// 🎵 MÚSICA AUTOMÁTICA
// =====================
const music = document.getElementById("bgMusic");

function startMusic() {
    if (!music) return;

    music.volume = 0.6;

    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.catch(() => {
            // Si el navegador bloquea autoplay,
            // se activará con la primera interacción
        });
    }
}

// Intentar al cargar
window.addEventListener("load", startMusic);

// Backup: activar en primera interacción
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("mousemove", startMusic, { once: true });


// =====================
// 👉 BOTÓN SIGUIENTE
// =====================
const nextBtn = document.getElementById("nextPage");

nextBtn?.addEventListener("click", () => {

    document.body.style.transition = "opacity 0.8s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "index2.html";
    }, 800);
});
