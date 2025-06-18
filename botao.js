// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Menu responsivo
const menu = document.querySelector('.menu');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        menu.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !menu.classList.contains('scroll-down')) {
        menu.classList.remove('scroll-up');
        menu.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && menu.classList.contains('scroll-down')) {
        menu.classList.remove('scroll-down');
        menu.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Animação de fade-in para elementos quando entram na viewport
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('section, .skill, .projeto-card, .contato-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(element);
});

// Animação das barras de habilidades
const skillBars = document.querySelectorAll('.skill-bar');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
};

// Observar seção de habilidades para animar as barras
const skillsSection = document.querySelector('.habilidades');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Formulário de contato
const form = document.querySelector('.contato-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button');
        const originalText = button.textContent;
        
        // Desabilitar o botão e mostrar loading
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        try {
            // Aqui você pode adicionar a lógica real de envio do formulário
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simular envio (substitua por sua lógica real)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Feedback de sucesso
            button.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
            form.reset();
            
            // Restaurar botão após 2 segundos
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
            
        } catch (error) {
            // Feedback de erro
            button.innerHTML = '<i class="fas fa-times"></i> Erro ao Enviar';
            
            // Restaurar botão após 2 segundos
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
        }
    });
}

// Animação de digitação para o título
const headerTitle = document.querySelector('.header-text h1');
if (headerTitle) {
    const text = headerTitle.textContent;
    headerTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            headerTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Iniciar animação quando a página carregar
    window.addEventListener('load', typeWriter);
}

// Adicionar classe active ao link do menu atual
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
