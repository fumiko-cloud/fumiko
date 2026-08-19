// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== FORM SUBMISSION =====
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const empresa = document.getElementById('empresa').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Validação básica
    if (!nome || !email || !assunto || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return;
    }
    
    // Simular envio
    console.log('Formulário enviado:', {
        nome,
        email,
        empresa,
        assunto,
        mensagem
    });
    
    // Mensagem de sucesso
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Limpar formulário
    this.reset();
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
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animação de entrada aos cards
document.querySelectorAll('.risk-card, .norm-card, .topic-card, .resource-card, .team-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== EFEITO HOVER CARDS =====
document.querySelectorAll('.risk-card, .topic-card, .resource-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

// ===== VALIDAÇÃO DE EMAIL =====
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        if (this.value && !validarEmail(this.value)) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#bdc3c7';
        }
    });
}

// ===== SCROLL HEADER EFFECT =====
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== CONTADOR DE VISITAS =====
function initializeVisitCounter() {
    let visitCount = localStorage.getItem('fumiko-visits') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('fumiko-visits', visitCount);
    console.log(`Você visitou este site ${visitCount} vezes`);
}

initializeVisitCounter();

// ===== LOG INICIAL =====
console.log('%cFumiko - Segurança no Trabalho', 'color: #3b5998; font-size: 18px; font-weight: bold;');
console.log('%cPlataforma profissional de segurança ocupacional', 'color: #7f8c8d; font-size: 12px;');
