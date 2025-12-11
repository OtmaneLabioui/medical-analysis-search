let medicalData = [];
let currentResults = [];

// Données de fallback si le fichier CSV ne peut pas être chargé
const fallbackData = [
    { name: "Blood Test Complete", price: "45.00" },
    { name: "Cholesterol Test", price: "25.00" },
    { name: "Blood Sugar Test", price: "15.00" },
    { name: "Liver Function Test", price: "35.00" },
    { name: "Kidney Function Test", price: "30.00" },
    { name: "Thyroid Function Test", price: "40.00" },
    { name: "Urine Analysis", price: "20.00" },
    { name: "X-Ray Chest", price: "60.00" },
    { name: "ECG", price: "50.00" },
    { name: "Ultrasound Abdomen", price: "80.00" },
    { name: "MRI Brain", price: "250.00" },
    { name: "CT Scan Chest", price: "180.00" },
    { name: "Hemoglobin Test", price: "12.00" },
    { name: "Vitamin D Test", price: "45.00" },
    { name: "Vitamin B12 Test", price: "35.00" },
    { name: "Iron Test", price: "22.00" },
    { name: "Calcium Test", price: "18.00" },
    { name: "Protein Test", price: "25.00" },
    { name: "Creatinine Test", price: "20.00" },
    { name: "Bilirubin Test", price: "28.00" }
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsContainer = document.getElementById('results');
const showAllBtn = document.getElementById('showAllBtn');
const exportBtn = document.getElementById('exportBtn');
const allDataContainer = document.getElementById('allData');
const loadingOverlay = document.getElementById('loadingOverlay');
const suggestionsDropdown = document.getElementById('suggestions');
const totalAnalysesSpan = document.getElementById('totalAnalyses');
const toastContainer = document.getElementById('toastContainer');

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Event Listeners
searchBtn.addEventListener('click', performSearch);
clearBtn.addEventListener('click', clearSearch);
searchInput.addEventListener('input', handleSearchInput);
searchInput.addEventListener('keydown', handleKeyNavigation);
showAllBtn.addEventListener('click', showAllData);
exportBtn.addEventListener('click', exportResults);

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !suggestionsDropdown.contains(e.target)) {
        hideSuggestions();
    }
});

// Initialize Application
async function initializeApp() {
    try {
        showLoading(true, 'Chargement de la base de données médicale', 'Initialisation de votre base de données d\'analyses médicales...');
        
        // Essayer de charger le fichier CSV d'abord
        let dataLoaded = false;
        try {
            await loadCSVFile();
            dataLoaded = true;
        } catch (error) {
            console.warn('Impossible de charger le fichier CSV:', error);
            // Utiliser les données de fallback
            loadFallbackData();
            dataLoaded = true;
        }
        
        if (dataLoaded) {
            showLoading(false);
            showWelcomeMessage();
            showToast('Base de données chargée avec succès!', 'success');
        }
    } catch (error) {
        showLoading(false);
        showToast('Erreur lors du chargement. Utilisation des données par défaut.', 'error');
        console.error('Erreur d\'initialisation:', error);
        
        // En dernier recours, charger les données de fallback
        loadFallbackData();
        showWelcomeMessage();
    }
}

// Charger le fichier CSV avec plusieurs méthodes
async function loadCSVFile() {
    const methods = [
        // Méthode 1: Fetch direct
        async () => {
            const response = await fetch('./sample_medical_data.csv');
            if (!response.ok) throw new Error('Fetch failed');
            return await response.text();
        },
        
        // Méthode 2: Avec chemin absolu
        async () => {
            const response = await fetch('sample_medical_data.csv');
            if (!response.ok) throw new Error('Fetch failed');
            return await response.text();
        }
    ];
    
    for (const method of methods) {
        try {
            const csvText = await method();
            await parseCSV(csvText);
            updateHeaderStats();
            console.log(`Fichier CSV chargé avec succès: ${medicalData.length} analyses`);
            return;
        } catch (error) {
            console.warn('Méthode de chargement échouée:', error);
            continue;
        }
    }
    
    throw new Error('Toutes les méthodes de chargement ont échoué');
}

// Charger les données de fallback
function loadFallbackData() {
    medicalData = fallbackData.map((item, index) => ({
        id: index + 1,
        name: item.name,
        price: parseFloat(item.price),
        originalPrice: `$${item.price}`,
        searchName: item.name.toLowerCase(),
        category: categorizeAnalysis(item.name)
    }));
    
    // Trier les données alphabétiquement
    medicalData.sort((a, b) => a.name.localeCompare(b.name));
    updateHeaderStats();
    console.log(`Données de fallback chargées: ${medicalData.length} analyses`);
}

// Parse CSV data with enhanced error handling
async function parseCSV(csvText) {
    return new Promise((resolve, reject) => {
        try {
            const lines = csvText.split('\n').filter(line => line.trim() !== '');
            
            if (lines.length < 2) {
                throw new Error('Le fichier CSV doit contenir au moins un en-tête et une ligne de données');
            }
            
            const headers = parseCSVRow(lines[0]).map(header => header.trim().toLowerCase());
            medicalData = [];
            
            // Find column indices intelligently
            const columnMapping = detectColumns(headers);
            
            if (columnMapping.nameIndex === -1 || columnMapping.priceIndex === -1) {
                throw new Error('Impossible de détecter les colonnes nom et prix');
            }
            
            // Process data in batches for better performance
            for (let i = 1; i < lines.length; i++) {
                const columns = parseCSVRow(lines[i]);
                
                if (columns.length > Math.max(columnMapping.nameIndex, columnMapping.priceIndex)) {
                    const name = columns[columnMapping.nameIndex]?.trim().replace(/['"]/g, '');
                    const priceStr = columns[columnMapping.priceIndex]?.trim().replace(/['"]/g, '');
                    
                    if (name && priceStr) {
                        const price = parseFloat(priceStr.replace(/[^\d.,]/g, '').replace(',', '.'));
                        
                        if (!isNaN(price) && name.length > 0) {
                            medicalData.push({
                                id: medicalData.length + 1,
                                name: name,
                                price: price,
                                originalPrice: `$${priceStr}`,
                                searchName: name.toLowerCase(),
                                category: categorizeAnalysis(name)
                            });
                        }
                    }
                }
            }
            
            if (medicalData.length === 0) {
                throw new Error('Aucune donnée valide trouvée dans le fichier CSV');
            }
            
            // Sort data alphabetically
            medicalData.sort((a, b) => a.name.localeCompare(b.name));
            
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

// Detect column indices
function detectColumns(headers) {
    const namePatterns = ['name', 'analysis', 'test', 'analyse', 'exam', 'investigation'];
    const pricePatterns = ['price', 'cost', 'prix', 'tarif', 'amount', 'fee'];
    
    let nameIndex = -1;
    let priceIndex = -1;
    
    headers.forEach((header, index) => {
        const cleanHeader = header.replace(/['"]/g, '').toLowerCase();
        
        if (nameIndex === -1 && namePatterns.some(pattern => cleanHeader.includes(pattern))) {
            nameIndex = index;
        }
        
        if (priceIndex === -1 && pricePatterns.some(pattern => cleanHeader.includes(pattern))) {
            priceIndex = index;
        }
    });
    
    return { nameIndex, priceIndex };
}

// Parse CSV row handling quoted values
function parseCSVRow(row) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        
        if (char === '"') {
            if (inQuotes && row[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    return result;
}

// Categorize analysis for better organization
function categorizeAnalysis(name) {
    const categories = {
        'Blood': ['blood', 'hemoglobin', 'cholesterol', 'sugar', 'glucose'],
        'Imaging': ['x-ray', 'mri', 'ct', 'ultrasound', 'scan'],
        'Cardiac': ['ecg', 'ekg', 'heart', 'cardiac'],
        'Laboratory': ['urine', 'stool', 'culture'],
        'Hormone': ['thyroid', 'hormone', 'testosterone', 'estrogen'],
        'Vitamin': ['vitamin', 'b12', 'folate', 'd3']
    };
    
    const nameLower = name.toLowerCase();
    
    for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some(keyword => nameLower.includes(keyword))) {
            return category;
        }
    }
    
    return 'General';
}

// Search input handler with debounce
let searchTimeout;
function handleSearchInput(e) {
    const value = e.target.value;
    
    // Show/hide clear button
    clearBtn.classList.toggle('show', value.length > 0);
    
    clearTimeout(searchTimeout);
    
    if (value.length === 0) {
        hideSuggestions();
        clearResults();
        return;
    }
    
    // Debounce search suggestions
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
        .filter(item => item.searchName.includes(queryLower))
        .slice(0, 8)
        .map(item => ({
            name: item.name,
            price: item.originalPrice,
            category: item.category
        }));
    
    if (suggestions.length === 0) {
        hideSuggestions();
        return;
    }
    
    suggestionsDropdown.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item" data-name="${escapeHtml(suggestion.name)}">
            <div>
                <div class="suggestion-name">${highlightMatch(suggestion.name, query)}</div>
                <div class="suggestion-price">${escapeHtml(suggestion.price)}</div>
            </div>
            <span class="suggestion-category">${suggestion.category}</span>
        </div>
    `).join('');
    
    suggestionsDropdown.style.display = 'block';
    
    // Add click events
    suggestionsDropdown.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            searchInput.value = item.dataset.name;
            hideSuggestions();
            performSearch();
        });
    });
}

// Highlight matching text in suggestions
function highlightMatch(text, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return escapeHtml(text).replace(regex, '<mark>$1</mark>');
}

// Escape regex special characters
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Hide suggestions
function hideSuggestions() {
    suggestionsDropdown.style.display = 'none';
    suggestionsDropdown.querySelectorAll('.highlighted').forEach(item => {
        item.classList.remove('highlighted');
    });
}

// Handle keyboard navigation in suggestions
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
        showToast('Please enter a search term', 'error');
        return;
    }
    
    if (medicalData.length === 0) {
        showToast('Database not loaded yet', 'error');
        return;
    }
    
    // Perform fuzzy search
    const results = medicalData.filter(item => {
        return item.searchName.includes(searchTerm) || 
               item.searchName.split(' ').some(word => word.startsWith(searchTerm));
    });
    
    currentResults = results;
    displayResults(results, `Search Results for "${searchInput.value}"`);
    
    // Analytics
    console.log(`Search: "${searchTerm}" - Found: ${results.length} results`);
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
                <h3>No Results Found</h3>
                <p>Try searching with different keywords or check the spelling.</p>
            </div>
        `;
        return;
    }
    
    const headerHTML = `
        <div class="results-header">
            <h3 class="results-title">${escapeHtml(title)}</h3>
            <span class="results-count">${results.length} result${results.length !== 1 ? 's' : ''}</span>
        </div>
    `;
    
    const resultsHTML = results.slice(0, 50).map(item => `
        <div class="result-item" data-id="${item.id}">
            <div class="analysis-name">${escapeHtml(item.name)}</div>
            <div class="analysis-price">${escapeHtml(item.originalPrice)}</div>
            <div class="analysis-category">${item.category}</div>
        </div>
    `).join('');
    
    let limitMessage = '';
    if (results.length > 50) {
        limitMessage = `
            <div class="results-limit">
                <p>Showing first 50 results of ${results.length}. Try a more specific search term.</p>
            </div>
        `;
    }
    
    resultsContainer.innerHTML = headerHTML + resultsHTML + limitMessage;
}

// Show all data
function showAllData() {
    if (medicalData.length === 0) {
        showToast('Database not loaded yet', 'error');
        return;
    }
    
    currentResults = [...medicalData];
    displayAllData();
}

// Display all data in grid format
function displayAllData() {
    const categorizedData = categorizeData();
    
    let html = '<div class="category-grid">';
    
    Object.entries(categorizedData).forEach(([category, items]) => {
        html += `
            <div class="category-section">
                <h4 class="category-title">
                    <i class="fas fa-folder"></i>
                    ${category} (${items.length})
                </h4>
                <div class="category-items">
                    ${items.slice(0, 20).map(item => `
                        <div class="data-item">
                            <div class="analysis-name">${escapeHtml(item.name)}</div>
                            <div class="analysis-price">${escapeHtml(item.originalPrice)}</div>
                        </div>
                    `).join('')}
                    ${items.length > 20 ? `<div class="more-items">+${items.length - 20} more...</div>` : ''}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    allDataContainer.innerHTML = html;
}

// Categorize data for organized display
function categorizeData() {
    const categorized = {};
    
    medicalData.forEach(item => {
        const category = item.category;
        if (!categorized[category]) {
            categorized[category] = [];
        }
        categorized[category].push(item);
    });
    
    // Sort categories by name
    return Object.keys(categorized)
        .sort()
        .reduce((result, key) => {
            result[key] = categorized[key];
            return result;
        }, {});
}

// Export results to CSV
function exportResults() {
    if (currentResults.length === 0) {
        showToast('No data to export', 'error');
        return;
    }
    
    const csvContent = 'Analysis Name,Price,Category\n' + 
        currentResults.map(item => 
            `"${item.name}","${item.originalPrice}","${item.category}"`
        ).join('\n');
    
    downloadCSV(csvContent, 'medical_analysis_results.csv');
    showToast('Results exported successfully!', 'success');
}

// Download CSV file
function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Show welcome message
function showWelcomeMessage() {
    const bloodTests = medicalData.filter(item => item.category === 'Blood').length;
    const imagingTests = medicalData.filter(item => item.category === 'Imaging').length;
    const cardiacTests = medicalData.filter(item => item.category === 'Cardiac').length;
    
    resultsContainer.innerHTML = `
        <div class="welcome-message">
            <h3>Base de données d'analyses médicales prête!</h3>
            <p>Recherchez parmi ${medicalData.length} analyses médicales pour trouver les prix et informations actuels. Commencez à taper dans la barre de recherche ci-dessus pour obtenir des résultats instantanés avec des suggestions intelligentes.</p>
            <div class="welcome-stats">
                <div class="stat-card">
                    <i class="fas fa-vial"></i>
                    <span>${bloodTests} Tests sanguins</span>
                </div>
                <div class="stat-card">
                    <i class="fas fa-x-ray"></i>
                    <span>${imagingTests} Tests d'imagerie</span>
                </div>
                <div class="stat-card">
                    <i class="fas fa-heartbeat"></i>
                    <span>${cardiacTests} Tests cardiaques</span>
                </div>
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
function showLoading(show, title = 'Loading...', message = 'Please wait...') {
    if (show) {
        document.querySelector('.loading-content h3').textContent = title;
        document.querySelector('.loading-content p').textContent = message;
        loadingOverlay.style.display = 'flex';
    } else {
        loadingOverlay.style.display = 'none';
    }
}

// Show toast notification
function showToast(message, type = 'info') {
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
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => toast.remove(), 300);
        }
    }, 4000);
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
}