// Medical Analysis Search Application
let medicalData = [];
let currentResults = [];

// DOM Elements (initialized after DOM loads)
let searchInput, searchBtn, clearBtn, resultsContainer, showAllBtn;
let loadingOverlay, suggestionsDropdown, totalAnalysesSpan, toastContainer;
let chatbot, chatbotToggle, chatMessages, chatInput, sendChatBtn, closeChatBtn;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements
    searchInput = document.getElementById('searchInput');
    searchBtn = document.getElementById('searchBtn');
    clearBtn = document.getElementById('clearBtn');
    resultsContainer = document.getElementById('results');
    showAllBtn = document.getElementById('showAllBtn');
    loadingOverlay = document.getElementById('loadingOverlay');
    suggestionsDropdown = document.getElementById('suggestions');
    totalAnalysesSpan = document.getElementById('totalAnalyses');
    toastContainer = document.getElementById('toastContainer');
    
    // Chatbot elements
    chatbot = document.getElementById('chatbot');
    chatbotToggle = document.getElementById('chatbotToggle');
    chatMessages = document.getElementById('chatMessages');
    chatInput = document.getElementById('chatInput');
    sendChatBtn = document.getElementById('sendChatBtn');
    closeChatBtn = document.getElementById('closeChatBtn');
    
    // Event Listeners
    if (searchBtn) searchBtn.addEventListener('click', performSearch);
    if (clearBtn) clearBtn.addEventListener('click', clearSearch);
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
        searchInput.addEventListener('keydown', handleKeyNavigation);
    }
    if (showAllBtn) showAllBtn.addEventListener('click', showAllData);
    
    // Chatbot event listeners
    if (chatbotToggle) chatbotToggle.addEventListener('click', toggleChatbot);
    if (closeChatBtn) closeChatBtn.addEventListener('click', toggleChatbot);
    if (sendChatBtn) sendChatBtn.addEventListener('click', sendChatMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendChatMessage();
        });
    }
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (searchInput && suggestionsDropdown && 
            !searchInput.contains(e.target) && !suggestionsDropdown.contains(e.target)) {
            hideSuggestions();
        }
    });
    
    // Initialize the application
    initializeApp();
});

// Initialize Application
function initializeApp() {
    console.log('🚀 Initialisation de l\'application...');
    
    showLoading(true);
    
    // Load from integrated database
    if (window.MEDICAL_DATABASE && window.MEDICAL_DATABASE.length > 0) {
        console.log('✅ Chargement depuis la base de données intégrée');
        loadFromIntegratedDatabase();
        showLoading(false);
        showWelcomeMessage();
        showToast(`✅ ${medicalData.length} analyses chargées!`, 'success');
    } else {
        showLoading(false);
        showToast('Erreur: Base de données non disponible', 'error');
    }
}

// Load from integrated database
function loadFromIntegratedDatabase() {
    medicalData = window.MEDICAL_DATABASE.map((item, index) => ({
        id: index + 1,
        code: item.code,
        name: item.name,
        sector: item.sector,
        delay: item.delay,
        price: item.price,
        description: item.description,
        originalPrice: `${item.price.toFixed(2)} DH`,
        searchName: item.name.toLowerCase(),
        category: categorizeAnalysis(item.name)
    }));
    
    medicalData.sort((a, b) => a.name.localeCompare(b.name));
    updateHeaderStats();
    console.log(`✅ ${medicalData.length} analyses chargées`);
}

// Categorize analysis
function categorizeAnalysis(name) {
    const categories = {
        'Analyses sanguines': ['sang', 'hémoglobine', 'cholestérol', 'glycémie', 'glucose', 'nfs', 'numération'],
        'Analyses hormonales': ['tsh', 'hormone', 'testosterone', 'oestradiol', 'prolactine', 'cortisol', 'insuline'],
        'Sérologies': ['sérologie', 'hépatite', 'hiv', 'sida', 'rubéole', 'toxoplasmose', 'cmv', 'syphilis'],
        'Marqueurs tumoraux': ['psa', 'ca 125', 'ca 19', 'cea', 'afp', 'marqueur', 'cancer'],
        'Examens cardiaques': ['troponine', 'bnp', 'cardiaque', 'ckmb'],
        'Biochimie': ['créatinine', 'urée', 'alat', 'asat', 'bilirubine', 'gamma', 'phosphatase'],
        'Vitamines': ['vitamine', 'b12', 'folate', 'acide folique'],
        'Fer': ['fer', 'ferritine', 'transferrine'],
        'Examens bactériologiques': ['ecbu', 'culture', 'helicobacter', 'parasitologie'],
        'Examens immunologiques': ['anticorps', 'fan', 'facteur', 'auto-immun']
    };
    
    const nameLower = name.toLowerCase();
    
    for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some(keyword => nameLower.includes(keyword))) {
            return category;
        }
    }
    
    return 'Examens généraux';
}

// Search input handler
let searchTimeout;
function handleSearchInput(e) {
    const value = e.target.value;
    clearBtn.classList.toggle('show', value.length > 0);
    
    clearTimeout(searchTimeout);
    
    if (value.length === 0) {
        hideSuggestions();
        clearResults();
        return;
    }
    
    searchTimeout = setTimeout(() => {
        if (value.length >= 2) {
            showSuggestions(value);
        }
    }, 200);
}

// Show search suggestions
function showSuggestions(query) {
    if (medicalData.length === 0) return;
    
    const queryLower = query.toLowerCase();
    const suggestions = medicalData
        .filter(item => item.searchName.includes(queryLower) || item.code.toLowerCase().includes(queryLower))
        .slice(0, 8);
    
    if (suggestions.length === 0) {
        hideSuggestions();
        return;
    }
    
    suggestionsDropdown.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item" data-name="${escapeHtml(suggestion.name)}">
            <div>
                <div class="suggestion-name">
                    <strong>${escapeHtml(suggestion.code)}</strong> - ${highlightMatch(suggestion.name, query)}
                </div>
                <div class="suggestion-price">${escapeHtml(suggestion.originalPrice)}</div>
            </div>
            <span class="suggestion-category">${suggestion.category}</span>
        </div>
    `).join('');
    
    suggestionsDropdown.style.display = 'block';
    
    suggestionsDropdown.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            searchInput.value = item.dataset.name;
            hideSuggestions();
            performSearch();
        });
    });
}

// Highlight matching text
function highlightMatch(text, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return escapeHtml(text).replace(regex, '<mark>$1</mark>');
}

// Escape regex
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Hide suggestions
function hideSuggestions() {
    suggestionsDropdown.style.display = 'none';
}

// Handle keyboard navigation
function handleKeyNavigation(e) {
    const suggestions = suggestionsDropdown.querySelectorAll('.suggestion-item');
    const highlighted = suggestionsDropdown.querySelector('.highlighted');
    
    if (suggestions.length === 0) return;
    
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            if (!highlighted) {
                suggestions[0]?.classList.add('highlighted');
            } else {
                highlighted.classList.remove('highlighted');
                const next = highlighted.nextElementSibling || suggestions[0];
                next.classList.add('highlighted');
            }
            break;
            
        case 'ArrowUp':
            e.preventDefault();
            if (highlighted) {
                highlighted.classList.remove('highlighted');
                const prev = highlighted.previousElementSibling || suggestions[suggestions.length - 1];
                prev?.classList.add('highlighted');
            }
            break;
            
        case 'Enter':
            e.preventDefault();
            if (highlighted) {
                searchInput.value = highlighted.dataset.name;
                hideSuggestions();
            }
            performSearch();
            break;
            
        case 'Escape':
            hideSuggestions();
            searchInput.blur();
            break;
    }
}

// Perform search
function performSearch() {
    hideSuggestions();
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        showToast('Veuillez entrer un terme de recherche', 'error');
        return;
    }
    
    if (medicalData.length === 0) {
        showToast('Base de données non chargée', 'error');
        return;
    }
    
    const results = medicalData.filter(item => {
        return item.searchName.includes(searchTerm) || 
               item.code.toLowerCase().includes(searchTerm) ||
               item.searchName.split(' ').some(word => word.startsWith(searchTerm));
    });
    
    currentResults = results;
    displayResults(results, `Résultats pour "${searchInput.value}"`);
    
    console.log(`Recherche: "${searchTerm}" - Trouvé: ${results.length} résultats`);
}

// Clear search
function clearSearch() {
    searchInput.value = '';
    clearBtn.classList.remove('show');
    hideSuggestions();
    clearResults();
    showWelcomeMessage();
}

// Clear results
function clearResults() {
    resultsContainer.innerHTML = '';
    currentResults = [];
}

// Display search results
function displayResults(results, title) {
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <h3>Aucun résultat trouvé</h3>
                <p>Essayez avec d'autres mots-clés ou vérifiez l'orthographe.</p>
            </div>
        `;
        return;
    }
    
    const headerHTML = `
        <div class="results-header">
            <h3 class="results-title">${escapeHtml(title)}</h3>
            <span class="results-count">${results.length} résultat${results.length !== 1 ? 's' : ''}</span>
        </div>
    `;
    
    const resultsHTML = results.slice(0, 50).map(item => `
        <div class="result-item" data-id="${item.id}">
            <div class="analysis-header">
                <span class="analysis-code">${escapeHtml(item.code)}</span>
                <div class="analysis-name">${escapeHtml(item.name)}</div>
            </div>
            <div class="analysis-description">${escapeHtml(item.description)}</div>
            <div class="analysis-details">
                <div class="analysis-price">💰 ${escapeHtml(item.originalPrice)}</div>
                <span class="analysis-sector" title="${window.SECTOR_NAMES && window.SECTOR_NAMES[item.sector] ? window.SECTOR_NAMES[item.sector] : item.sector}">🏥 ${window.SECTOR_NAMES && window.SECTOR_NAMES[item.sector] ? escapeHtml(window.SECTOR_NAMES[item.sector]) : escapeHtml(item.sector)}</span>
                <span class="analysis-delay">⏱️ ${escapeHtml(item.delay)}</span>
            </div>
            <div class="analysis-category">📁 ${item.category}</div>
        </div>
    `).join('');
    
    let limitMessage = '';
    if (results.length > 50) {
        limitMessage = `
            <div class="results-limit">
                <p>Affichage des 50 premiers résultats sur ${results.length}. Affinez votre recherche.</p>
            </div>
        `;
    }
    
    resultsContainer.innerHTML = headerHTML + resultsHTML + limitMessage;
}

// Show all data
function showAllData() {
    if (medicalData.length === 0) {
        showToast('Base de données non chargée', 'error');
        return;
    }
    
    currentResults = [...medicalData];
    displayAllData();
}

// Display all data by category
function displayAllData() {
    const categorizedData = {};
    
    medicalData.forEach(item => {
        const category = item.category;
        if (!categorizedData[category]) {
            categorizedData[category] = [];
        }
        categorizedData[category].push(item);
    });
    
    let html = '<div class="category-grid">';
    
    Object.entries(categorizedData)
        .sort(([a], [b]) => a.localeCompare(b))
        .forEach(([category, items]) => {
            html += `
                <div class="category-section">
                    <h4 class="category-title">
                        <i class="fas fa-folder"></i>
                        ${category} (${items.length})
                    </h4>
                    <div class="category-items">
                        ${items.slice(0, 20).map(item => `
                            <div class="data-item">
                                <div class="analysis-code">${escapeHtml(item.code)}</div>
                                <div class="analysis-name">${escapeHtml(item.name)}</div>
                                <div class="analysis-price">${escapeHtml(item.originalPrice)}</div>
                            </div>
                        `).join('')}
                        ${items.length > 20 ? `<div class="more-items">+${items.length - 20} autres...</div>` : ''}
                    </div>
                </div>
            `;
        });
    
    html += '</div>';
    resultsContainer.innerHTML = html;
}

// Show welcome message
function showWelcomeMessage() {
    const stats = {};
    medicalData.forEach(item => {
        stats[item.category] = (stats[item.category] || 0) + 1;
    });
    
    const topCategories = Object.entries(stats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 4);
    
    resultsContainer.innerHTML = `
        <div class="welcome-message">
            <h3>🏥 Base de données d'analyses médicales du Maroc</h3>
            <p>Recherchez parmi <strong>${medicalData.length} analyses médicales</strong> avec leurs prix, délais et descriptions détaillées. Commencez à taper dans la barre de recherche pour obtenir des suggestions instantanées.</p>
            <div class="welcome-stats">
                ${topCategories.map(([cat, count]) => `
                    <div class="stat-card">
                        <i class="fas fa-vial"></i>
                        <span>${count} ${cat}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Update header statistics
function updateHeaderStats() {
    if (totalAnalysesSpan) {
        totalAnalysesSpan.textContent = `${medicalData.length} Analyses Disponibles`;
    }
}

// Show loading overlay
function showLoading(show) {
    if (!loadingOverlay) return;
    loadingOverlay.style.display = show ? 'flex' : 'none';
}

// Show toast notification
function showToast(message, type = 'info') {
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 
                 'info-circle';
    
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${escapeHtml(message)}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => toast.remove(), 300);
        }
    }, 4000);
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
}
// ===================================
// CHATBOT FUNCTIONALITY
// ===================================

function toggleChatbot() {
    if (chatbot) {
        chatbot.classList.toggle('active');
        if (chatbot.classList.contains('active')) {
            chatInput.focus();
            // Hide badge when opening
            const badge = document.querySelector('.chat-badge');
            if (badge) badge.style.display = 'none';
        }
    }
}

function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process message and respond
    setTimeout(() => {
        hideTypingIndicator();
        const response = processChatMessage(message);
        addChatMessage(response, 'bot');
    }, 800);
}

function addChatMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = type === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (type === 'bot' && typeof content === 'object') {
        contentDiv.innerHTML = content.html;
    } else {
        const p = document.createElement('p');
        p.textContent = content;
        contentDiv.appendChild(p);
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'bot-message typing-indicator-container';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function processChatMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Extract keywords for search
    const keywords = ['prix', 'price', 'coût', 'cout', 'combien', 'tarif', 'recherche', 'chercher', 'trouver'];
    const isPriceQuery = keywords.some(kw => lowerMessage.includes(kw));
    
    // Search for analysis
    const results = searchInDatabase(message);
    
    if (results.length === 0) {
        return {
            html: `
                <p>😕 Désolé, je n'ai pas trouvé d'analyse correspondant à "${escapeHtml(message)}".</p>
                <p>Essayez avec:</p>
                <ul>
                    <li>Le code de l'analyse (ex: NFS, TSH)</li>
                    <li>Le nom complet (ex: Glycémie, Cholestérol)</li>
                    <li>Un mot-clé (ex: thyroïde, foie)</li>
                </ul>
            `
        };
    }
    
    if (results.length === 1) {
        const item = results[0];
        const sectorName = window.SECTOR_NAMES && window.SECTOR_NAMES[item.sector] 
            ? window.SECTOR_NAMES[item.sector] 
            : item.sector;
        
        return {
            html: `
                <p>✅ J'ai trouvé cette analyse:</p>
                <div class="analysis-result">
                    <strong>${escapeHtml(item.name)}</strong>
                    <p><strong>Code:</strong> ${escapeHtml(item.code)}</p>
                    <p><strong>Prix:</strong> <span class="price">${item.price.toFixed(2)} DH</span></p>
                    <p><strong>Secteur:</strong> ${escapeHtml(sectorName)}</p>
                    <p><strong>Délai:</strong> ${escapeHtml(item.delay)}</p>
                    <p><strong>Description:</strong> ${escapeHtml(item.description)}</p>
                </div>
            `
        };
    }
    
    // Multiple results
    const limitedResults = results.slice(0, 5);
    let html = `<p>📋 J'ai trouvé ${results.length} analyse(s)${results.length > 5 ? ` (affichage des 5 premières)` : ''}:</p>`;
    
    limitedResults.forEach(item => {
        html += `
            <div class="analysis-result">
                <strong>${escapeHtml(item.name)}</strong>
                <p><strong>Code:</strong> ${escapeHtml(item.code)} | <strong>Prix:</strong> <span class="price">${item.price.toFixed(2)} DH</span></p>
            </div>
        `;
    });
    
    if (results.length > 5) {
        html += `<p><small>💡 Affinez votre recherche pour voir plus de détails.</small></p>`;
    }
    
    return { html };
}

function searchInDatabase(query) {
    if (!medicalData || medicalData.length === 0) return [];
    
    const searchTerm = query.toLowerCase().trim();
    const searchWords = searchTerm.split(/\s+/);
    
    return medicalData.filter(item => {
        const searchableText = `${item.code} ${item.name} ${item.description}`.toLowerCase();
        return searchWords.every(word => searchableText.includes(word));
    }).sort((a, b) => {
        // Prioritize exact code matches
        const aCodeMatch = a.code.toLowerCase() === searchTerm;
        const bCodeMatch = b.code.toLowerCase() === searchTerm;
        if (aCodeMatch && !bCodeMatch) return -1;
        if (!aCodeMatch && bCodeMatch) return 1;
        
        // Then by name match
        const aNameMatch = a.name.toLowerCase().includes(searchTerm);
        const bNameMatch = b.name.toLowerCase().includes(searchTerm);
        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;
        
        return 0;
    });
}