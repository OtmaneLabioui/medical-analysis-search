# 🏥 Analyses Médicales Maroc

Application web moderne pour rechercher des analyses médicales au Maroc avec leurs prix, délais et descriptions détaillées.

## ✨ Fonctionnalités

- **Recherche instantanée** - Trouvez rapidement parmi plus de 100 analyses médicales
- **Suggestions intelligentes** - Suggestions en temps réel pendant la frappe
- **Informations détaillées** - Code, nom, description, secteur, délai et prix pour chaque analyse
- **Export CSV** - Exportez les résultats de recherche
- **Interface moderne** - Design responsive et intuitif
- **Chargement ultra-rapide** - Base de données intégrée, aucun temps de chargement

## 📊 Base de données

La base de données contient plus de 100 analyses médicales réparties en catégories :

- **Analyses sanguines** - NFS, glycémie, cholestérol, etc.
- **Analyses hormonales** - TSH, testostérone, prolactine, etc.
- **Sérologies** - Hépatites, VIH, toxoplasmose, etc.
- **Marqueurs tumoraux** - PSA, CA 125, CEA, etc.
- **Examens cardiaques** - Troponine, BNP, CK-MB, etc.
- **Biochimie** - Créatinine, urée, transaminases, etc.
- **Vitamines** - Vitamine D, B12, folates, etc.
- **Fer** - Fer sérique, ferritine, transferrine, etc.
- **Examens bactériologiques** - ECBU, hémoculture, etc.
- **Examens immunologiques** - Anticorps, facteur rhumatoïde, etc.

## 🚀 Utilisation

### En local

1. Clonez ou téléchargez le projet
2. Ouvrez `index.html` dans votre navigateur
3. Commencez à rechercher !

### Avec un serveur local

```bash
# Python 3
python -m http.server 8000

# Puis ouvrez http://localhost:8000
```

## 📁 Structure du projet

```
web site/
├── index.html              # Page principale
├── style.css               # Styles
├── script.js               # Logique de l'application
├── medical-data.js         # Base de données intégrée
├── netlify.toml            # Configuration déploiement
└── README.md               # Documentation
```

## 🔍 Comment utiliser

1. **Recherche simple** - Tapez le nom d'une analyse (ex: "glycémie", "tsh", "nfs")
2. **Recherche par code** - Tapez le code de l'analyse (ex: "NFS", "TSH", "PSA")
3. **Suggestions** - Les suggestions apparaissent automatiquement après 2 caractères
4. **Navigation clavier** - Utilisez les flèches ↑↓ pour naviguer, Entrée pour sélectionner
5. **Voir tout** - Cliquez sur "Afficher toutes les analyses" pour voir la liste complète
6. **Export** - Exportez vos résultats de recherche en CSV

## 💡 Exemples de recherche

- `glycémie` → Glycémie à jeun, HbA1c
- `thyroïde` → TSH, T3, T4, anticorps anti-TPO
- `fer` → Fer sérique, ferritine, transferrine
- `psa` → PSA total, PSA libre
- `NFS` → Numération formule sanguine

## 🌐 Déploiement

### Netlify / Vercel

1. Uploadez tous les fichiers
2. Configuration automatique via `netlify.toml`
3. Votre site est en ligne !

### GitHub Pages

1. Créez un repo GitHub
2. Uploadez les fichiers
3. Activez GitHub Pages dans les paramètres
4. Votre site est accessible via `https://username.github.io/repo-name`

## 📱 Responsive

L'application est entièrement responsive et fonctionne sur :
- 💻 Desktop
- 📱 Mobile
- 📱 Tablette

## ⚡ Performance

- **Chargement instantané** - 0ms, base de données intégrée
- **Recherche rapide** - <10ms pour filtrer les résultats
- **Suggestions en temps réel** - Debounce de 200ms
- **Taille optimisée** - ~150KB total

## 🛠️ Technologies

- **HTML5** - Structure sémantique
- **CSS3** - Variables CSS, Flexbox, Grid
- **JavaScript ES6+** - Vanilla JS, pas de framework
- **Font Awesome** - Icônes
- **Google Fonts** - Police Inter

## 📄 Licence

Usage libre pour usage personnel et éducatif.

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour ajouter des analyses :

1. Modifiez `medical-data.js`
2. Ajoutez vos analyses au tableau `MEDICAL_DATABASE`
3. Format : `{code, name, sector, delay, price, description}`

## 📞 Support

Pour toute question ou suggestion, ouvrez une issue GitHub.

---

**Version** 2.0  
**Dernière mise à jour** Décembre 2024  
**Status** ✅ Production Ready
