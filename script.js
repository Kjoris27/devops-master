// ============================================================
// =====  BASE DE DONNÉES DES SUPER-HÉROS  ===================
// ============================================================

const heroes = [
    {
        id: 1,
        name: "Iron Man",
        primary: '#ff3333',
        secondary: '#ffaa00',
        gradient: 'linear-gradient(135deg, #cc0000, #ff3333)',
        icon: 'fa-robot',
        power: 85
    },
    {
        id: 2,
        name: "Thor",
        primary: '#4a6fa5',
        secondary: '#00ffff',
        gradient: 'linear-gradient(135deg, #1e3c5c, #4a6fa5)',
        icon: 'fa-hammer',
        power: 100
    },
    {
        id: 3,
        name: "Wonder Woman",
        primary: '#ffaa00',
        secondary: '#ffd700',
        gradient: 'linear-gradient(135deg, #cc8800, #ffaa00)',
        icon: 'fa-crown',
        power: 100
    },
    {
        id: 4,
        name: "Black Panther",
        primary: '#4a0080',
        secondary: '#8000ff',
        gradient: 'linear-gradient(135deg, #2d004d, #4a0080)',
        icon: 'fa-paw',
        power: 100
    },
    {
        id: 5,
        name: "Captain Marvel",
        primary: '#ff0066',
        secondary: '#ff69b4',
        gradient: 'linear-gradient(135deg, #cc0052, #ff0066)',
        icon: 'fa-star',
        power: 100
    },
    {
        id: 6,
        name: "Spider-Man",
        primary: '#ff0000',
        secondary: '#0000ff',
        gradient: 'linear-gradient(135deg, #cc0000, #ff0000)',
        icon: 'fa-spider',
        power: 100
    },
    {
        id: 7,
        name: "Superman",
        primary: '#0044ff',
        secondary: '#ff0000',
        gradient: 'linear-gradient(135deg, #0000cc, #0044ff)',
        icon: 'fa-bolt',
        power: 100
    },
    {
        id: 8,
        name: "Hulk",
        primary: '#00aa00',
        secondary: '#88ff88',
        gradient: 'linear-gradient(135deg, #006600, #00aa00)',
        icon: 'fa-fist-raised',
        power: 100
    },
    {
        id: 9,
        name: "Black Widow",
        primary: '#888888',
        secondary: '#ff0000',
        gradient: 'linear-gradient(135deg, #222222, #555555)',
        icon: 'fa-skull',
        power: 100
    },
    {
        id: 10,
        name: "Doctor Strange",
        primary: '#ff6600',
        secondary: '#9933ff',
        gradient: 'linear-gradient(135deg, #cc5500, #ff6600)',
        icon: 'fa-eye',
        power: 100
    }
];

// ============================================================
// =====  VARIABLES GLOBALES  ================================
// ============================================================

let selectedHero = null;

// ===== ÉTAT DE LA CALCULATRICE =====
let currentInput = '0';       // Nombre en cours de saisie
let previousInput = '';        // Nombre précédent (avant l'opérateur)
let operator = null;           // Opérateur sélectionné (+, -, *, /)
let shouldResetDisplay = false; // Flag : doit-on écraser l'affichage au prochain chiffre ?
let justCalculated = false;    // Flag : vient-on d'appuyer sur "=" ?

// ============================================================
// =====  CRÉATION DES CARTES DE HÉROS  ======================
// ============================================================

function createHeroCards() {
    const heroGrid = document.getElementById('heroGrid');
    if (!heroGrid) return;

    heroGrid.innerHTML = '';

    const firstRow = heroes.slice(0, 5);
    const secondRow = heroes.slice(5, 10);

    const row1 = document.createElement('div');
    row1.className = 'hero-row';
    firstRow.forEach(hero => row1.appendChild(createHeroCard(hero)));
    heroGrid.appendChild(row1);

    const row2 = document.createElement('div');
    row2.className = 'hero-row';
    secondRow.forEach(hero => row2.appendChild(createHeroCard(hero)));
    heroGrid.appendChild(row2);
}

function createHeroCard(hero) {
    const card = document.createElement('div');
    card.className = 'hero-card';
    card.setAttribute('data-hero-id', hero.id);
    card.style.setProperty('--hero-primary', hero.primary);
    card.style.setProperty('--hero-secondary', hero.secondary);

    card.innerHTML = `
        <i class="fas ${hero.icon}" style="color: ${hero.primary};"></i>
        <span>${hero.name}</span>
        <span class="hero-power" style="color: ${hero.secondary};">⚡ ${hero.power}%</span>
    `;

    card.addEventListener('click', () => selectHero(hero));

    if (selectedHero && selectedHero.id === hero.id) {
        card.classList.add('selected');
    }

    return card;
}

// ============================================================
// =====  SÉLECTION D'UN HÉROS  ==============================
// ============================================================

function selectHero(hero) {
    selectedHero = hero;

    document.querySelectorAll('.hero-card').forEach(card => {
        card.classList.remove('selected');
        if (card.getAttribute('data-hero-id') == hero.id) {
            card.classList.add('selected');
        }
    });

    applyHeroTheme(hero);
    updateHeroBanner(hero);

    const heroNameDisplay = document.getElementById('heroNameDisplay');
    if (heroNameDisplay) heroNameDisplay.textContent = hero.name;

    const statusText = document.getElementById('statusText');
    if (statusText) statusText.textContent = `${hero.name} actif`;

    createHeroParticles(hero.primary);
}

function applyHeroTheme(hero) {
    document.documentElement.style.setProperty('--hero-primary', hero.primary);
    document.documentElement.style.setProperty('--hero-secondary', hero.secondary);
    document.documentElement.style.setProperty('--hero-gradient', hero.gradient);
    document.documentElement.style.setProperty('--hero-glow', `0 0 20px ${hero.primary}80`);

    const headerIcon = document.getElementById('header-icon');
    if (headerIcon) {
        headerIcon.className = `fas ${hero.icon}`;
        headerIcon.style.color = hero.primary;
    }

    const statusDot = document.getElementById('statusDot');
    if (statusDot) statusDot.style.background = hero.primary;

    const bannerIcon = document.getElementById('bannerIcon');
    if (bannerIcon) {
        bannerIcon.className = `fas ${hero.icon}`;
        bannerIcon.style.color = hero.primary;
    }

    updateParticlesBackground(hero.primary, hero.secondary);

    document.body.style.animation = 'themeChange 0.5s ease';
    setTimeout(() => { document.body.style.animation = ''; }, 500);
}

function updateHeroBanner(hero) {
    const bannerText = document.getElementById('bannerText');
    if (bannerText) {
        bannerText.textContent = `${hero.name} - Puissance: ${hero.power}%`;
        const banner = document.getElementById('heroBanner');
        banner.style.animation = 'none';
        banner.offsetHeight;
        banner.style.animation = 'bannerPulse 0.5s ease';
    }
}

function updateParticlesBackground(primary, secondary) {
    const style = document.createElement('style');
    style.textContent = `
        body::before {
            background: radial-gradient(circle at 20% 30%, ${primary}30 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, ${secondary}30 0%, transparent 50%);
        }
    `;
    const oldStyle = document.getElementById('particle-style');
    if (oldStyle) oldStyle.remove();
    style.id = 'particle-style';
    document.head.appendChild(style);
}

function createHeroParticles(color) {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'selection-particle';
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                box-shadow: 0 0 15px ${color};
                animation: particleFly 1s ease-out forwards;
            `;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }, i * 30);
    }
}

// ============================================================
// =====  LOGIQUE DE LA CALCULATRICE  ========================
// ============================================================

/**
 * Met à jour l'écran d'affichage
 */
function updateDisplay(value) {
    const resultEl = document.getElementById('result');
    if (resultEl) {
        // Formate les grands nombres avec des séparateurs si nécessaire
        resultEl.value = formatDisplay(value);
    }
}

/**
 * Met à jour la ligne d'expression (ex: "5 + 3")
 */
function updateExpression(text) {
    const expressionEl = document.getElementById('expression');
    if (expressionEl) {
        expressionEl.textContent = text;
    }
}

/**
 * Formate un nombre pour l'affichage (évite les débordements)
 */
function formatDisplay(value) {
    if (value === 'Erreur' || value === 'Infini') return value;

    const num = parseFloat(value);
    if (isNaN(num)) return value;

    // Si trop de décimales, on arrondit intelligemment
    if (value.toString().includes('.')) {
        const parts = value.toString().split('.');
        if (parts[1] && parts[1].length > 10) {
            return parseFloat(num.toPrecision(12)).toString();
        }
    }

    // Si le nombre est trop grand, utiliser la notation scientifique
    if (Math.abs(num) >= 1e15) {
        return num.toExponential(6);
    }

    return value;
}

/**
 * Saisie d'un chiffre (0-9)
 */
function inputNumber(num) {
    // Si on vient de calculer avec "=", on recommence une nouvelle saisie
    if (justCalculated) {
        currentInput = num;
        previousInput = '';
        operator = null;
        justCalculated = false;
        shouldResetDisplay = false;
        updateExpression('');
        updateDisplay(currentInput);
        return;
    }

    // Si on doit réinitialiser l'affichage (après avoir choisi un opérateur)
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        // Évite les zéros en tête (ex: "007" devient "7")
        if (currentInput === '0' && num !== '.') {
            currentInput = num;
        } else {
            // Limite la longueur de saisie à 15 caractères
            if (currentInput.replace('.', '').replace('-', '').length < 15) {
                currentInput += num;
            }
        }
    }

    updateDisplay(currentInput);
}

/**
 * Saisie du point décimal
 */
function inputDecimal() {
    if (justCalculated) {
        currentInput = '0.';
        justCalculated = false;
        shouldResetDisplay = false;
        updateDisplay(currentInput);
        return;
    }

    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
        updateDisplay(currentInput);
        return;
    }

    // N'ajoute le point que s'il n'y en a pas déjà un
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
}

/**
 * Sélection d'un opérateur (+, -, *, /)
 */
function inputOperator(op) {
    justCalculated = false;

    // Si on avait déjà un opérateur et un nombre précédent,
    // on calcule d'abord le résultat intermédiaire
    if (operator !== null && !shouldResetDisplay) {
        calculate();
        // Après le calcul intermédiaire, on continue avec le nouvel opérateur
    }

    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;

    // Affiche l'expression en cours
    const opSymbol = getOperatorSymbol(op);
    updateExpression(`${previousInput} ${opSymbol}`);
}

/**
 * Retourne le symbole affiché pour un opérateur
 */
function getOperatorSymbol(op) {
    switch (op) {
        case '+': return '+';
        case '-': return '−';
        case '*': return '×';
        case '/': return '÷';
        default: return op;
    }
}

/**
 * Effectue le calcul final (bouton "=")
 */
function calculate() {
    if (operator === null || previousInput === '') return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    // Affiche l'expression complète avant le résultat
    const opSymbol = getOperatorSymbol(operator);
    updateExpression(`${previousInput} ${opSymbol} ${currentInput} =`);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                // Division par zéro !
                updateDisplay('Erreur');
                updateExpression('Division par zéro !');
                flashError();
                currentInput = '0';
                previousInput = '';
                operator = null;
                shouldResetDisplay = false;
                justCalculated = true;
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Gère les dépassements de précision des flottants
    // Ex: 0.1 + 0.2 = 0.30000000000000004 → on arrondit
    const roundedResult = parseFloat(result.toPrecision(12));
    currentInput = roundedResult.toString();

    updateDisplay(currentInput);

    // Réinitialise l'état après le calcul
    previousInput = '';
    operator = null;
    shouldResetDisplay = true;
    justCalculated = true;

    // Animation de succès
    flashResult();
}

/**
 * Touche C : efface le dernier chiffre saisi
 */
function clearLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay(currentInput);
}

/**
 * Touche AC : remet la calculatrice à zéro complètement
 */
function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    justCalculated = false;
    updateDisplay('0');
    updateExpression('');
}

/**
 * Touche ⌫ : efface le dernier caractère (backspace)
 */
function backspace() {
    if (justCalculated) {
        clearAll();
        return;
    }

    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
        // Si on se retrouve avec juste un "-", on remet 0
        if (currentInput === '-') currentInput = '0';
    } else {
        currentInput = '0';
    }
    updateDisplay(currentInput);
}

// ============================================================
// =====  EFFETS VISUELS DE LA CALCULATRICE  =================
// ============================================================

/**
 * Flash rouge en cas d'erreur (division par zéro)
 */
function flashError() {
    const display = document.querySelector('.display-content');
    if (!display) return;
    display.style.borderColor = '#ef4444';
    display.style.boxShadow = 'inset 0 2px 5px rgba(0,0,0,0.5), 0 0 20px rgba(239, 68, 68, 0.5)';
    setTimeout(() => {
        display.style.borderColor = '';
        display.style.boxShadow = '';
    }, 800);
}

/**
 * Flash vert lors d'un résultat (appui sur "=")
 */
function flashResult() {
    const display = document.querySelector('.display-content');
    if (!display) return;
    const heroColor = selectedHero ? selectedHero.secondary : '#10b981';
    display.style.borderColor = heroColor;
    display.style.boxShadow = `inset 0 2px 5px rgba(0,0,0,0.5), 0 0 20px ${heroColor}80`;
    setTimeout(() => {
        display.style.borderColor = '';
        display.style.boxShadow = '';
    }, 600);
}

/**
 * Animation de pression d'une touche
 */
function animateKey(button) {
    button.style.transform = 'translateY(2px) scale(0.95)';
    button.style.boxShadow = 'none';
    setTimeout(() => {
        button.style.transform = '';
        button.style.boxShadow = '';
    }, 150);
}

// ============================================================
// =====  ANIMATIONS CSS DYNAMIQUES  =========================
// ============================================================

const dynamicStyle = document.createElement('style');
dynamicStyle.textContent = `
    @keyframes themeChange {
        0% { opacity: 1; filter: hue-rotate(0deg); }
        50% { opacity: 0.8; filter: hue-rotate(30deg); }
        100% { opacity: 1; filter: hue-rotate(0deg); }
    }

    @keyframes bannerPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.8; }
    }

    @keyframes particleFly {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0); opacity: 0; }
    }

    .hero-card {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .hero-card.selected {
        transform: scale(1.05);
        position: relative;
        z-index: 10;
    }

    .hero-card.selected::after {
        content: '⚡';
        position: absolute;
        top: -5px;
        right: -5px;
        font-size: 16px;
        animation: selectedStar 1s infinite;
        filter: drop-shadow(0 0 5px gold);
    }

    @keyframes selectedStar {
        0%, 100% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.2); }
    }

    .selection-particle {
        pointer-events: none;
    }

    /* Transition douce du display */
    .result {
        transition: color 0.2s ease;
    }
`;
document.head.appendChild(dynamicStyle);

// ============================================================
// =====  GESTION DU CLAVIER PHYSIQUE  =======================
// ============================================================

document.addEventListener('keydown', (e) => {
    // Chiffres 0-9
    if (e.key >= '0' && e.key <= '9') {
        inputNumber(e.key);
        // Anime la touche correspondante
        const btn = document.querySelector(`[data-number="${e.key}"]`);
        if (btn) animateKey(btn);
    }
    // Opérateurs
    else if (e.key === '+') { inputOperator('+'); animateKey(document.getElementById('add')); }
    else if (e.key === '-') { inputOperator('-'); animateKey(document.getElementById('subtract')); }
    else if (e.key === '*') { inputOperator('*'); animateKey(document.getElementById('multiply')); }
    else if (e.key === '/') { e.preventDefault(); inputOperator('/'); animateKey(document.getElementById('divide')); }
    // Égal / Entrée
    else if (e.key === '=' || e.key === 'Enter') { calculate(); animateKey(document.getElementById('equals')); }
    // Point décimal
    else if (e.key === '.' || e.key === ',') { inputDecimal(); animateKey(document.getElementById('decimal')); }
    // Backspace
    else if (e.key === 'Backspace') { backspace(); animateKey(document.getElementById('backspace')); }
    // Escape = All Clear
    else if (e.key === 'Escape') { clearAll(); animateKey(document.getElementById('clear-all')); }
    // Delete = Clear last
    else if (e.key === 'Delete') { clearLast(); animateKey(document.getElementById('clear')); }
});

// ============================================================
// =====  INITIALISATION AU CHARGEMENT  ======================
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Crée les cartes de héros
    createHeroCards();

    // ===== TOUCHES NUMÉRIQUES (0-9) =====
    document.querySelectorAll('.number-key').forEach(btn => {
        btn.addEventListener('click', () => {
            const num = btn.getAttribute('data-number');
            inputNumber(num);
            animateKey(btn);
        });
    });

    // ===== TOUCHE POINT DÉCIMAL =====
    document.getElementById('decimal')?.addEventListener('click', (e) => {
        inputDecimal();
        animateKey(e.currentTarget);
    });

    // ===== TOUCHE ADDITION =====
    document.getElementById('add')?.addEventListener('click', (e) => {
        inputOperator('+');
        animateKey(e.currentTarget);
    });

    // ===== TOUCHE SOUSTRACTION =====
    document.getElementById('subtract')?.addEventListener('click', (e) => {
        inputOperator('-');
        animateKey(e.currentTarget);
    });

    // ===== TOUCHE MULTIPLICATION =====
    document.getElementById('multiply')?.addEventListener('click', (e) => {
        inputOperator('*');
        animateKey(e.currentTarget);
    });

    // ===== TOUCHE DIVISION =====
    document.getElementById('divide')?.addEventListener('click', (e) => {
        inputOperator('/');
        animateKey(e.currentTarget);
    });

    // ===== TOUCHE ÉGAL =====
    document.getElementById('equals')?.addEventListener('click', (e) => {
        calculate();
        animateKey(e.currentTarget);
    });

    // ===== TOUCHE C (effacer dernier chiffre) =====
    document.getElementById('clear')?.addEventListener('click', (e) => {
        clearLast();
        animateKey(e.currentTarget);
    });

    // ===== TOUCHE AC (tout effacer) =====
    document.getElementById('clear-all')?.addEventListener('click', (e) => {
        clearAll();
        animateKey(e.currentTarget);
    });

    // ===== TOUCHE BACKSPACE =====
    document.getElementById('backspace')?.addEventListener('click', (e) => {
        backspace();
        animateKey(e.currentTarget);
    });

    // Affichage initial
    updateDisplay('0');

    // Sélectionne Iron Man par défaut
    selectHero(heroes[0]);
});