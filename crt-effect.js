document.addEventListener('DOMContentLoaded', function() {
    
    const generateNoise = () => {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 100;

        for(let i = 0; i < canvas.width; i++) {
            for(let j = 0; j < canvas.height; j++) {
                let rgb = Math.floor(Math.random() * 50);
                ctx.fillStyle = `rgb(${rgb},${rgb},${rgb})`;
                ctx.fillRect(i, j, 1, 1);
            }
        }
        return canvas.toDataURL();
    };

    const noiseContainer = document.getElementById('noise');
    if(noiseContainer) {
        noiseContainer.style.backgroundImage = `url(${generateNoise()})`;
    }

    const gifImage = document.querySelector('.initial-gif');
    if(gifImage) {
        gifImage.src = `assets/Logo_Lumon.gif?${Date.now()}`;
    }

    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;
    let isTransitioning = false;
    let allowScroll = false;

    gifImage.addEventListener('load', () => {
        setTimeout(() => {
            allowScroll = true;
            slides[currentIndex].classList.remove('active');
            currentIndex = 1;
            slides[currentIndex].classList.add('active');
        }, 4300);
    });

    function handleWheel(e) {
        if (!allowScroll) {
            e.preventDefault();
            return;
        }

        e.preventDefault();
        if (isTransitioning) return;

        const delta = e.deltaY;
        const direction = delta > 0 ? 1 : -1;
        const newIndex = Math.max(1, Math.min(currentIndex + direction, slides.length - 1));

        if (newIndex !== currentIndex) {
            isTransitioning = true;
            slides[currentIndex].classList.remove('active');
            currentIndex = newIndex;
            slides[currentIndex].classList.add('active');

            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    document.addEventListener('wheel', handleWheel, { passive: false });
});