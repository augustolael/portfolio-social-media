/**
 * PORTFÓLIO SOCIAL MEDIA - AUGUSTO LAEL
 * JavaScript Puro - Funcionalidades Interativas
 * 
 * Funcionalidades:
 * 1. Smooth Scroll - Navegação suave entre seções
 * 2. Tema Escuro/Claro - Com persistência em localStorage
 * 3. Validação de Formulário - Com feedback visual
 * 4. Menu Mobile Responsivo - Colapsável
 */

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initNavigation();
    initMobileMenu();
    initFormValidation();
});

// ============================================
// 1. TEMA ESCURO/CLARO COM LOCALSTORAGE
// ============================================

function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');
    
    // Carregar tema salvo do localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }
    
    // Alternar tema ao clicar
    themeToggle.addEventListener('click', function() {
        const isDark = document.documentElement.classList.toggle('dark');
        
        // Atualizar ícones
        if (isDark) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
            localStorage.setItem('theme', 'dark');
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
            localStorage.setItem('theme', 'light');
        }
    });
}

// ============================================
// 2. NAVEGAÇÃO COM SMOOTH SCROLL
// ============================================

function initNavigation() {
    // Botões de navegação desktop
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
        });
    });
    
    // Botões de navegação mobile
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
            
            // Fechar menu mobile após clicar
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.style.display = 'none';
        });
    });
    
    // Botão CTA na landing
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
        });
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// 3. MENU MOBILE RESPONSIVO
// ============================================

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
            mobileMenu.style.display = 'flex';
        } else {
            mobileMenu.style.display = 'none';
        }
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnButton = mobileMenuBtn.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnButton && mobileMenu.style.display === 'flex') {
            mobileMenu.style.display = 'none';
        }
    });
}

// ============================================
// 4. VALIDAÇÃO DE FORMULÁRIO
// ============================================

function initFormValidation() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('success-message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Limpar mensagens de erro anteriores
        clearErrors();
        
        // Validar campos
        let isValid = true;
        
        // Validar nome
        if (!nameInput.value.trim()) {
            showError('name', 'Nome é obrigatório');
            isValid = false;
        }
        
        // Validar email
        if (!emailInput.value.trim()) {
            showError('email', 'Email é obrigatório');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError('email', 'Email inválido');
            isValid = false;
        }
        
        // Validar mensagem
        if (!messageInput.value.trim()) {
            showError('message', 'Mensagem é obrigatória');
            isValid = false;
        }
        
        // Se válido, enviar formulário
        if (isValid) {
            // Mostrar mensagem de sucesso
            successMessage.style.display = 'block';
            
            // Limpar formulário
            form.reset();
            
            // Esconder mensagem após 3 segundos
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 3000);
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(fieldName, message) {
    const input = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + '-error');
    
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearErrors() {
    const inputs = document.querySelectorAll('input, textarea');
    const errorElements = document.querySelectorAll('.error-message');
    
    inputs.forEach(input => {
        input.classList.remove('error');
    });
    
    errorElements.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
}

// ============================================
// 5. FUNCIONALIDADES EXTRAS (OPCIONAIS)
// ============================================

// Carregar favoritos do localStorage (opcional)
function loadFavorites() {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
        return JSON.parse(favorites);
    }
    return [];
}

// Salvar favoritos no localStorage (opcional)
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Função para adicionar favorito (pode ser usada em cards de portfólio)
function toggleFavorite(projectId) {
    let favorites = loadFavorites();
    
    if (favorites.includes(projectId)) {
        favorites = favorites.filter(id => id !== projectId);
    } else {
        favorites.push(projectId);
    }
    
    saveFavorites(favorites);
}
