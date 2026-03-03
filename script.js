// ============================================================
// =====  BASE DE DONNÉES DES SUPER-HÉROS  ===================
// ============================================================
// Ce fichier contient tous les super-héros disponibles avec :
// - Leurs couleurs (primary, secondary)
// - Leurs icônes Font Awesome
// - Leur pourcentage de puissance
// 
// Quand on clique sur un héros, toute l'interface change :
// - Les couleurs des boutons opérateurs
// - L'icône dans le header
// - La bannière d'information
// - Les particules en arrière-plan
// ============================================================

const heroes = [
    // ===== PREMIÈRE LIGNE (5 héros) =====
    // Ces 5 héros apparaîtront sur la première ligne du sélecteur
    {
        id: 1,                          // Identifiant unique
        name: "Iron Man",                // Nom affiché
        primary: '#ff3333',              // Couleur principale (rouge)
        secondary: '#ffaa00',             // Couleur secondaire (orange)
        gradient: 'linear-gradient(135deg, #cc0000, #ff3333)', // Dégradé
        icon: 'fa-robot',                 // Icône Font Awesome (robot)
        power: 85                         // Puissance en pourcentage
    },
    {
        id: 2,
        name: "Thor",
        primary: '#4a6fa5',               // Bleu
        secondary: '#00ffff',              // Cyan
        gradient: 'linear-gradient(135deg, #1e3c5c, #4a6fa5)',
        icon: 'fa-hammer',                 // Icône marteau
        power: 100
    },
    {
        id: 3,
        name: "Wonder Woman",
        primary: '#ffaa00',                // Or
        secondary: '#ffd700',               // Jaune
        gradient: 'linear-gradient(135deg, #cc8800, #ffaa00)',
        icon: 'fa-crown',                   // Icône couronne
        power: 100
    },
    {
        id: 4,
        name: "Black Panther",
        primary: '#4a0080',                // Violet foncé
        secondary: '#8000ff',                // Violet clair
        gradient: 'linear-gradient(135deg, #2d004d, #4a0080)',
        icon: 'fa-paw',                      // Icône patte
        power: 100
    },
    {
        id: 5,
        name: "Captain Marvel",
        primary: '#ff0066',                  // Rose
        secondary: '#ff69b4',                 // Rose clair
        gradient: 'linear-gradient(135deg, #cc0052, #ff0066)',
        icon: 'fa-star',                       // Icône étoile
        power: 100
    },
    
    // ===== DEUXIÈME LIGNE (5 héros) =====
    // Ces 5 héros apparaîtront sur la deuxième ligne
    {
        id: 6,
        name: "Spider-Man",
        primary: '#ff0000',                  // Rouge
        secondary: '#0000ff',                  // Bleu
        gradient: 'linear-gradient(135deg, #cc0000, #ff0000)',
        icon: 'fa-spider',                     // Icône araignée
        power: 100
    },
    {
        id: 7,
        name: "Superman",
        primary: '#0000ff',                    // Bleu
        secondary: '#ff0000',                    // Rouge
        gradient: 'linear-gradient(135deg, #0000cc, #0000ff)',
        icon: 'fa-superpowers',                  // Icône S
        power: 100
    },
    {
        id: 8,
        name: "Hulk",
        primary: '#00aa00',                      // Vert
        secondary: '#88ff88',                      // Vert clair
        gradient: 'linear-gradient(135deg, #006600, #00aa00)',
        icon: 'fa-fist-raised',                    // Icône poing
        power: 100
    },
    {
        id: 9,
        name: "Black Widow",
        primary: '#444444',                        // Gris
        secondary: '#ff0000',                        // Rouge
        gradient: 'linear-gradient(135deg, #222222, #444444)',
        icon: 'fa-skull',                            // Icône crâne
        power: 100
    },
    {
        id: 10,
        name: "Doctor Strange",
        primary: '#ff6600',                          // Orange
        secondary: '#9933ff',                          // Violet
        gradient: 'linear-gradient(135deg, #cc5500, #ff6600)',
        icon: 'fa-eye',                                // Icône oeil
        power: 100
    }
];

// ============================================================
// =====  VARIABLES GLOBALES  ================================
// ============================================================
// selectedHero : stocke le héros actuellement sélectionné
// null = aucun héros sélectionné au démarrage
let selectedHero = null;

// ============================================================
// =====  CRÉATION DES CARTES DE HÉROS  ======================
// ============================================================
// Cette fonction génère dynamiquement les 10 cartes de héros
// Elles sont organisées en 2 lignes de 5 pour un affichage optimal
// ============================================================
function createHeroCards() {
    // Récupère le conteneur des héros dans le HTML
    const heroGrid = document.getElementById('heroGrid');
    if (!heroGrid) return;  // Sécurité : si l'élément n'existe pas, on arrête

    heroGrid.innerHTML = ''; // Vide la grille avant de la reconstruire

    // Diviser les héros en deux groupes de 5
    const firstRow = heroes.slice(0, 5);   // Héros 1 à 5 (première ligne)
    const secondRow = heroes.slice(5, 10); // Héros 6 à 10 (deuxième ligne)

    // ===== CRÉATION DE LA PREMIÈRE LIGNE =====
    const row1 = document.createElement('div');
    row1.className = 'hero-row';  // La classe CSS pour la mise en page
    firstRow.forEach(hero => {
        // Pour chaque héros, on crée une carte et on l'ajoute à la ligne
        row1.appendChild(createHeroCard(hero));
    });
    heroGrid.appendChild(row1);   // On ajoute la ligne à la grille

    // ===== CRÉATION DE LA DEUXIÈME LIGNE =====
    const row2 = document.createElement('div');
    row2.className = 'hero-row';
    secondRow.forEach(hero => {
        row2.appendChild(createHeroCard(hero));
    });
    heroGrid.appendChild(row2);
}

// ============================================================
// =====  CRÉATION D'UNE CARTE INDIVIDUELLE  =================
// ============================================================
// hero : l'objet héros à transformer en carte HTML
// Retourne : un élément <div> représentant la carte du héros
// ============================================================
function createHeroCard(hero) {
    // Création de l'élément div pour la carte
    const card = document.createElement('div');
    card.className = 'hero-card';
    card.setAttribute('data-hero-id', hero.id);  // Stocke l'ID pour identification
    
    // Applique les couleurs du héros comme variables CSS sur cette carte
    // Cela permet d'avoir des effets de hover personnalisés
    card.style.setProperty('--hero-primary', hero.primary);
    card.style.setProperty('--hero-secondary', hero.secondary);
    
    // ===== STRUCTURE HTML DE LA CARTE =====
    // <i> : icône Font Awesome (ex: fa-robot)
    // <span> : nom du héros
    // <span class="hero-power"> : pourcentage avec un éclair
    card.innerHTML = `
        <i class="fas ${hero.icon}" style="color: ${hero.primary};"></i>
        <span>${hero.name}</span>
        <span class="hero-power" style="color: ${hero.secondary};">⚡ ${hero.power}%</span>
    `;

    // ===== GESTION DU CLIC SUR LA CARTE =====
    // Quand on clique sur un héros, on appelle selectHero()
    card.addEventListener('click', () => selectHero(hero));
    
    // Si ce héros était déjà sélectionné (cas du rechargement),
    // on ajoute la classe "selected" pour le mettre en évidence
    if (selectedHero && selectedHero.id === hero.id) {
        card.classList.add('selected');
    }
    
    return card;  // On retourne la carte prête à être affichée
}

// ============================================================
// =====  SÉLECTION D'UN HÉROS  ==============================
// ============================================================
// hero : le héros qui vient d'être cliqué
// Cette fonction est le cœur du système :
// 1. Met à jour l'affichage des cartes
// 2. Change les couleurs de l'interface
// 3. Met à jour tous les textes
// 4. Déclenche des effets visuels
// ============================================================
function selectHero(hero) {
    selectedHero = hero;  // On mémorise le héros sélectionné
    
    // ===== MISE À JOUR VISUELLE DES CARTES =====
    // On enlève la classe "selected" de toutes les cartes
    document.querySelectorAll('.hero-card').forEach(card => {
        card.classList.remove('selected');
        // Puis on l'ajoute seulement à celle qui a été cliquée
        if (card.getAttribute('data-hero-id') == hero.id) {
            card.classList.add('selected');
        }
    });

    // ===== APPLICATION DU THÈME =====
    // Change toutes les couleurs de l'interface
    applyHeroTheme(hero);
    
    // ===== MISE À JOUR DE LA BANNIÈRE =====
    updateHeroBanner(hero);
    
    // ===== MISE À JOUR DU NOM DANS LE FOOTER =====
    const heroNameDisplay = document.getElementById('heroNameDisplay');
    if (heroNameDisplay) {
        heroNameDisplay.textContent = hero.name;
    }
    
    // ===== MISE À JOUR DU TEXTE DE STATUT =====
    const statusText = document.getElementById('statusText');
    if (statusText) {
        statusText.textContent = `${hero.name} actif`;  // Ex: "Iron Man actif"
    }
    
    // ===== EFFET DE PARTICULES =====
    // Crée une pluie de particules aux couleurs du héros
    createHeroParticles(hero.primary);
}

// ============================================================
// =====  APPLICATION DU THÈME DU HÉROS  =====================
// ============================================================
// hero : le héros dont on applique les couleurs
// Modifie les variables CSS globales pour changer l'apparence
// ============================================================
function applyHeroTheme(hero) {
    // ===== MISE À JOUR DES VARIABLES CSS =====
    // Ces variables sont utilisées partout dans style.css
    document.documentElement.style.setProperty('--hero-primary', hero.primary);
    document.documentElement.style.setProperty('--hero-secondary', hero.secondary);
    document.documentElement.style.setProperty('--hero-gradient', hero.gradient);
    document.documentElement.style.setProperty('--hero-glow', `0 0 20px ${hero.primary}80`);
    // Le '80' à la fin = 50% de transparence (en hexadécimal)
    
    // ===== MISE À JOUR DE L'ICÔNE DU HEADER =====
    const headerIcon = document.getElementById('header-icon');
    if (headerIcon) {
        headerIcon.className = `fas ${hero.icon}`;  // Change l'icône
        headerIcon.style.color = hero.primary;       // Change sa couleur
    }
    
    // ===== MISE À JOUR DU POINT DE STATUT =====
    const statusDot = document.getElementById('statusDot');
    if (statusDot) {
        statusDot.style.background = hero.primary;   // Point coloré
    }
    
    // ===== MISE À JOUR DE L'ICÔNE DE LA BANNIÈRE =====
    const bannerIcon = document.getElementById('bannerIcon');
    if (bannerIcon) {
        bannerIcon.className = `fas ${hero.icon}`;    // Change l'icône
        bannerIcon.style.color = hero.primary;        // Change sa couleur
    }
    
    // ===== MISE À JOUR DE L'ARRIÈRE-PLAN =====
    updateParticlesBackground(hero.primary, hero.secondary);
    
    // ===== ANIMATION DE TRANSITION =====
    // Fait "pulser" l'écran pour signaler le changement
    document.body.style.animation = 'themeChange 0.5s ease';
    setTimeout(() => {
        document.body.style.animation = '';  // Supprime l'animation après 0.5s
    }, 500);
}

// ============================================================
// =====  MISE À JOUR DE LA BANNIÈRE  ========================
// ============================================================
// hero : le héros à afficher dans la bannière
// La bannière montre le nom et la puissance du héros
// ============================================================
function updateHeroBanner(hero) {
    const bannerText = document.getElementById('bannerText');
    
    if (bannerText) {
        // Texte : "Iron Man - Puissance: 85%"
        bannerText.textContent = `${hero.name} - Puissance: ${hero.power}%`;
        
        // ===== ANIMATION DE LA BANNIÈRE =====
        const banner = document.getElementById('heroBanner');
        banner.style.animation = 'none';               // Reset animation
        banner.offsetHeight;                             // Force le navigateur à recalculer
        banner.style.animation = 'bannerPulse 0.5s ease'; // Lance l'animation
    }
}

// ============================================================
// =====  MISE À JOUR DES PARTICULES D'ARRIÈRE-PLAN  ========
// ============================================================
// primary   : couleur principale du héros
// secondary : couleur secondaire du héros
// Modifie les dégradés en arrière-plan
// ============================================================
function updateParticlesBackground(primary, secondary) {
    // Crée une nouvelle feuille de style
    const style = document.createElement('style');
    style.textContent = `
        body::before {
            background: radial-gradient(circle at 20% 30%, ${primary}30 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, ${secondary}30 0%, transparent 50%);
        }
    `;
    
    // Supprime l'ancienne feuille de style si elle existe
    const oldStyle = document.getElementById('particle-style');
    if (oldStyle) {
        oldStyle.remove();
    }
    
    // Ajoute la nouvelle feuille de style
    style.id = 'particle-style';
    document.head.appendChild(style);
}

// ============================================================
// =====  CRÉATION DE PARTICULES  ============================
// ============================================================
// color : couleur des particules (celle du héros)
// Crée une pluie de petites particules colorées
// pour un effet visuel lors de la sélection
// ============================================================
function createHeroParticles(color) {
    // Crée 15 particules avec un délai entre chacune
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            // Crée un élément div pour la particule
            const particle = document.createElement('div');
            particle.className = 'selection-particle';
            
            // Style de la particule (position aléatoire)
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
            
            // Ajoute la particule à la page
            document.body.appendChild(particle);
            
            // Supprime la particule après 1 seconde (durée de l'animation)
            setTimeout(() => particle.remove(), 1000);
        }, i * 30);  // Délai de 30ms entre chaque particule
    }
}

// ============================================================
// =====  ANIMATIONS CSS  =====================================
// ============================================================
// Ces animations sont injectées dynamiquement dans la page
// Elles sont utilisées par les différents éléments
// ============================================================
const style = document.createElement('style');
style.textContent = `
    /* Animation lors du changement de héros */
    @keyframes themeChange {
        0% { opacity: 1; filter: hue-rotate(0deg); }
        50% { opacity: 0.8; filter: hue-rotate(30deg); }  /* Rotation des couleurs */
        100% { opacity: 1; filter: hue-rotate(0deg); }
    }
    
    /* Animation de pulsation de la bannière */
    @keyframes bannerPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.8; }    /* Légère augmentation */
    }
    
    /* Animation des particules qui s'envolent */
    @keyframes particleFly {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            /* Mouvement aléatoire dans toutes les directions */
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
    
    /* Style de base des cartes */
    .hero-card {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);  /* Effet "élastique" */
    }
    
    /* Style de la carte sélectionnée */
    .hero-card.selected {
        transform: scale(1.05);  /* Légèrement plus grande */
        position: relative;
        z-index: 10;              /* Au-dessus des autres */
    }
    
    /* Étoile qui apparaît sur la carte sélectionnée */
    .hero-card.selected::after {
        content: '⚡';  /* Éclair */
        position: absolute;
        top: -5px;
        right: -5px;
        font-size: 16px;
        animation: selectedStar 1s infinite;  /* Rotation infinie */
        filter: drop-shadow(0 0 5px gold);
    }
    
    /* Animation de l'étoile sur la carte sélectionnée */
    @keyframes selectedStar {
        0%, 100% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.2); }  /* Tourne et grossit */
    }
    
    /* Les particules ne doivent pas bloquer les clics */
    .selection-particle {
        pointer-events: none;
    }
`;

// ===== AJOUT DES ANIMATIONS À LA PAGE =====
document.head.appendChild(style);

// ============================================================
// =====  INITIALISATION AU CHARGEMENT  ======================
// ============================================================
// Cette fonction s'exécute quand la page HTML est complètement chargée
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Crée toutes les cartes de héros
    createHeroCards();
    
    // OPTIONNEL : Pour sélectionner un héros par défaut au démarrage
    // Décommentez la ligne suivante pour avoir Iron Man présélectionné
    // selectHero(heroes[0]);
    
    // Note aux développeurs :
    // Si vous voulez changer le héros par défaut, modifiez l'index :
    // heroes[0] = Iron Man
    // heroes[1] = Thor
    // heroes[2] = Wonder Woman
    // etc.
});