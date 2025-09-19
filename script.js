// Script para adicionar animações e interatividade à página Evolua Saúde

document.addEventListener('DOMContentLoaded', function() {
    // Adiciona classe para animação de fade-in nos elementos
    const sections = document.querySelectorAll('section');
    
    // Função para verificar se um elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Função para adicionar animação aos elementos visíveis
    function handleScroll() {
        sections.forEach(section => {
            if (isElementInViewport(section)) {
                section.classList.add('visible');
            }
        });
    }
    
    // Inicializa a verificação de elementos visíveis
    handleScroll();
    
    // Adiciona evento de scroll para verificar elementos visíveis durante a rolagem
    window.addEventListener('scroll', handleScroll);
    
    // Adiciona efeito de hover no botão de download
    const downloadBtn = document.getElementById('download_app');
    if (downloadBtn) {
        downloadBtn.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        downloadBtn.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    }
    
    // Funcionalidade do Carrossel
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (carouselTrack && carouselSlides.length > 0) {
        let currentIndex = 0;
        const slideWidth = carouselSlides[0].clientWidth;
        
        // Criar pontos indicadores
        carouselSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
        
        // Função para ir para um slide específico
        function goToSlide(index) {
            if (index < 0) index = carouselSlides.length - 1;
            if (index >= carouselSlides.length) index = 0;
            
            currentIndex = index;
            carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Atualizar pontos indicadores
            document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
        
        // Eventos dos botões
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
            });
        }
        
        // Adicionar navegação por toque (swipe)
        let touchStartX = 0;
        let touchEndX = 0;
        
        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe para a esquerda
                goToSlide(currentIndex + 1);
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe para a direita
                goToSlide(currentIndex - 1);
            }
        }
        
        // Auto-play do carrossel
        let autoplayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
        
        // Pausar auto-play quando o mouse estiver sobre o carrossel
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(autoplayInterval);
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                autoplayInterval = setInterval(() => {
                    goToSlide(currentIndex + 1);
                }, 5000);
            });
        }
    }
});
