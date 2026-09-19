document.addEventListener('DOMContentLoaded', () => {
    // 0. Lobby Logic
    const lobbyScreen = document.getElementById('lobby-screen');
    const joinAudioBtn = document.getElementById('join-audio-btn');
    const startPresentationBtn = document.getElementById('start-presentation-btn');
    const waitingMusic = document.getElementById('waiting-music');
    const mainPresentation = document.getElementById('main-presentation');

    joinAudioBtn.addEventListener('click', () => {
        waitingMusic.play().then(() => {
            joinAudioBtn.classList.add('hidden');
            startPresentationBtn.classList.remove('hidden');
        }).catch(err => {
            console.error("Audio play failed, showing start button anyway:", err);
            joinAudioBtn.classList.add('hidden');
            startPresentationBtn.classList.remove('hidden');
        });
    });

    startPresentationBtn.addEventListener('click', () => {
        // Fade out lobby
        lobbyScreen.style.opacity = '0';
        
        // Pause music
        waitingMusic.pause();
        
        setTimeout(() => {
            lobbyScreen.classList.add('hidden');
            mainPresentation.classList.remove('hidden-presentation');
            // Ensure we start at the top
            window.scrollTo(0, 0);
        }, 1000);
    });

    // 1. Transition logic for GIF
    const brainCta = document.getElementById('brain-cta');
    const transitionOverlay = document.getElementById('transition-overlay');
    const transitionGif = document.getElementById('transition-gif');
    const brainJourney = document.getElementById('brain-journey');

    brainCta.addEventListener('click', () => {
        // Show overlay with GIF
        transitionOverlay.classList.remove('hidden');
        
        // Force GIF reload to play from start (if cached by browser)
        const src = transitionGif.src;
        transitionGif.src = '';
        transitionGif.src = src;

        // Wait 8 seconds, then hide transition and show Brain Journey section
        setTimeout(() => {
            transitionOverlay.classList.add('hidden');
            brainJourney.classList.remove('hidden-section');
            brainJourney.scrollIntoView({ behavior: 'smooth' });
        }, 8000);
    });

    // 2. Interacción del Cerebro
    const nodes = document.querySelectorAll('.node');
    const detailsCards = document.querySelectorAll('.detail-card');
    const initialInstruction = document.getElementById('initial-instruction');

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            const targetId = node.getAttribute('data-target');
            
            // Ocultar mensaje inicial
            if(initialInstruction) {
                initialInstruction.classList.add('hidden');
            }

            // Ocultar todas las tarjetas
            detailsCards.forEach(card => {
                card.classList.add('hidden');
            });

            // Mostrar la tarjeta correspondiente
            const targetCard = document.getElementById(targetId);
            if(targetCard) {
                targetCard.classList.remove('hidden');
            }
            
            // Reiniciar estilos de los nodos
            nodes.forEach(n => {
                n.style.backgroundColor = '#e74c3c';
                n.style.transform = 'translate(-50%, -50%) scale(1)';
            });
            
            // Destacar nodo activo
            node.style.backgroundColor = '#2ecc71';
            node.style.transform = 'translate(-50%, -50%) scale(1.2)';
        });
    });

    // 3. Modal Image Logic
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-asset-btn');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const imgSrc = btn.getAttribute('data-img');
            modalImg.src = imgSrc;
            modal.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        modalImg.src = ''; // Clear image source to reset
    });

    // Cierra modal al hacer click fuera de la imagen (en el fondo oscuro)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modalImg.src = '';
        }
    });
});
