// ===== FUNCIONALIDADE DAS ABAS =====
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove classe 'active' de todos os botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Remove classe 'active' de todo conteúdo
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adiciona classe 'active' ao botão clicado
            this.classList.add('active');
            
            // Adiciona classe 'active' ao conteúdo correspondente
            const activeContent = document.getElementById(tabName);
            if (activeContent) {
                activeContent.classList.add('active');
                
                // Scroll suave para o conteúdo
                setTimeout(() => {
                    activeContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    });

    // Ativa a primeira aba por padrão
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
});

// ===== EFEITO SCROLL HEADER =====
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scroll para baixo
        header.style.opacity = '0.95';
    } else {
        // Scroll para cima
        header.style.opacity = '1';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== SMOOTH SCROLL PARA LINKS DE NAVEGAÇÃO =====
const navLinks = document.querySelectorAll('.nav a, a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            const targetId = href.substring(1);
            const tabButton = document.querySelector(`[data-tab="${targetId}"]`);
            
            if (tabButton) {
                e.preventDefault();
                tabButton.click();
            }
        }
    });
});

// ===== ANIMAÇÃO DE ENTRADA ===== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa cards e elementos para animação
document.querySelectorAll('.card, .reg-card, .risk-category, .program-card, .developer-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== FUNÇÃO DE CLIQUE NOS BOTÕES =====
document.querySelectorAll('.btn-info, .btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Efeito de ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Ação padrão
        console.log('Botão clicado:', this.textContent);
    });
});

// ===== ANIMAÇÃO DE RIPPLE =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== CONTADOR DE ACESSOS =====
function initializeAccessCounter() {
    let accessCount = localStorage.getItem('fumiko-access-count') || 0;
    accessCount = parseInt(accessCount) + 1;
    localStorage.setItem('fumiko-access-count', accessCount);
    console.log(`Você visitou este site ${accessCount} vezes!`);
}

initializeAccessCounter();

// ===== FUNÇÃO PARA ENVIAR CURRÍCULO (EXEMPLO) =====
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-primary') && e.target.textContent.includes('Currículo')) {
        e.preventDefault();
        alert('Obrigado pelo interesse! Em breve você será redirecionado para o formulário de inscrição.');
        // Aqui você pode adicionar a lógica para redirecionar para um formulário
        // window.location.href = '/career-form';
    }
});

// ===== SUPORTE A DARK MODE (OPCIONAL) =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
}

// Verifica se o usuário tinha dark mode ativado
if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ===== LOG INICIAL =====
console.log('%c🛡️ Bem-vindo ao Fumiko - Segurança no Trabalho', 'color: #1e40af; font-size: 16px; font-weight: bold;');
console.log('%cSite profissional com informações sobre segurança ocupacional', 'color: #64748b; font-size: 12px;');
