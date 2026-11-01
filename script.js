const QUICK = [
    { fr: "Sucre", ar: "السكر", query: "glycémie" },
    { fr: "Thyroïde", ar: "الغدة", query: "tsh" },
    { fr: "NFS", ar: "NFS", query: "nfs" },
    { fr: "Cholestérol", ar: "الكوليستيرول", query: "cholestérol" },
    { fr: "Fer", ar: "الحديد", query: "ferritine" },
    { fr: "Foie", ar: "الكبدة", query: "bilan hépatique" },
    { fr: "Rein", ar: "الكلى", query: "créatinine" },
    { fr: "ECBU", ar: "البول", query: "ecbu" },
    { fr: "Grossesse", ar: "الحمل", query: "grossesse" },
    { fr: "Hépatite", ar: "التهاب الكبد", query: "hépatite" },
    { fr: "Ramadan", ar: "رمضان", query: "ramadan" },
    { fr: "Enfant", ar: "الدراري", query: "enfant" },
];

const FEATURED = ["GLY1", "NFS", "TSH", "CHOL 1", "CRE 1", "FERR", "ECBU3", "ASAT", "FT4", "U", "FE", "AGHBS"];

const ALIASES = [
    { terms: ["sucre", "diabete", "glisemi", "glucose", "سكر", "السكر", "السكري", "ramadan", "رمضان"], test: /glycem|fructosamine/ },
    { terms: ["thyroide", "thyroid", "ths", "غدة", "الغدة", "الغده"], test: /tsh|thyrox|thyroglob|t3|t4|ft3|ft4/ },
    { terms: ["foie", "hepatique", "كبدة", "الكبدة", "الكبده"], test: /transaminase|asat|alat|ggt|bilirub|hepat/ },
    { terms: ["rein", "renale", "كلى", "الكلى", "الكلا"], test: /creatinine|uree|ionogramme/ },
    { terms: ["cholesterol", "colesterol", "كوليستيرول", "الكوليستيرول", "ramadan", "رمضان"], test: /cholesterol|hdl|ldl|triglycer|lipidique/ },
    { terms: ["anemie", "fatigue", "حديد", "الحديد", "enfant", "derri", "drari", "weld", "طفل", "الدراري", "الولد"], test: /nfs|ferritine|fer serique|folique|hemoglobine/ },
    { terms: ["grossesse", "enceinte", "حمل", "الحمل", "حامل", "حاملة", "mra"], test: /beta-hcg|hcg|toxo|rubeole|groupage/ },
    { terms: ["sida", "vih", "سيدا", "السيدا"], test: /hiv|vih/ },
    { terms: ["hepatite", "jaunisse", "التهاب الكبد", "الصفار"], test: /hepatite|hbs|hcv|hbe/ },
    { terms: ["coeur", "cardiaque", "قلب", "القلب"], test: /troponine|ck-mb|kinase|enzyme/ },
    { terms: ["prostate", "بروستات", "البروستات"], test: /\bpsa\b/ },
    { terms: ["urine", "pipi", "بول", "البول"], test: /ecbu|urinaire|urine/ },
    { terms: ["infection"], test: /\bcrp\b|ecbu|hemoculture|procalcitonine/ },
    { terms: ["prise", "sang", "dem"], test: /nfs|glycemie a jeun|numeration/ },
    { terms: ["sukkar", "soukar", "skar"], test: /glycem/ },
    { terms: ["gheda", "lgheda"], test: /tsh|thyrox|thyro/ },
    { terms: ["kebda", "lkebda", "kebd"], test: /transaminase|hepat|bilirub|ggt|hepatique/ },
    { terms: ["boul", "lboul"], test: /ecbu|urine|urinaire/ },
    { terms: ["hamla", "hamel"], test: /hcg|toxo|rubeole|groupage/ },
    { terms: ["qalb", "9alb"], test: /troponine|cardia/ },
];

const CATALOG_DATE = "13 décembre 2025";

const GUIDES = [
    { test: /post prandiale|post charge/, fasting: "no", about: "Mesure le sucre après un repas ou une charge en glucose.", aboutAr: "كايقيس السكر من بعد الماكلة ولا من بعد محلول السكر.", prep: "Ce prélèvement se fait après avoir mangé, ou après une solution sucrée. Le laboratoire indique l'heure.", prepAr: "هاد الأخذ كيكون من بعد ما تاكل، ولا من بعد محلول السكر. المختبر كيقولك الوقت." },
    { test: /hyperglycem|hgpo|cycle glycem/, fasting: "yes", about: "Épreuve pour voir comment le corps gère le sucre.", aboutAr: "تجربة باش نشوفو كيفاش الجسم كيدبر السكر.", prep: "Venez à jeun. Le laboratoire vous fait boire une solution sucrée, puis réalise plusieurs prises de sang.", prepAr: "اجي وانت صايم. المختبر غادي يعطيك محلول السكر، ومن بعد ياخد الدم عدة مرات." },
    { test: /glycemie a jeun/, fasting: "yes", about: "Mesure le sucre dans le sang.", aboutAr: "كايقيس السكر فالدم.", prep: "À jeun : ne rien manger pendant 8 à 12 heures. Vous pouvez boire de l'eau.", prepAr: "خصك تكون صايم: ما تاكلش من 8 حتى 12 ساعة. الماء مسموح." },
    { test: /glycemie/, fasting: "yes", about: "Mesure le sucre dans le sang.", aboutAr: "كايقيس السكر فالدم.", prep: "Prise de sang dans une série. Le laboratoire vous dit si vous devez rester à jeun.", prepAr: "أخذ الدم داخل سلسلة. المختبر غادي يقولك واش تبقى صايم." },
    { test: /cholesterol|triglycer|lipidique|\bhdl\b|\bldl\b/, fasting: "yes", about: "Mesure les graisses du sang.", aboutAr: "كايقيس الدهون فالدم.", prep: "Souvent demandé à jeun, pendant 12 heures. L'eau est autorisée.", prepAr: "غالباً كيطالبو تكون صايم 12 ساعة. الماء مسموح." },
    { test: /\bnfs\b|numeration formule/, fasting: "no", about: "Compte les globules rouges, les globules blancs et les plaquettes.", aboutAr: "كايعد الكريات الحمر والبيض والصفائح.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /\btsh\b/, fasting: "no", about: "Examen de base de la thyroïde.", aboutAr: "التحليل الأساسي ديال الغدة.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /\bft4\b|\bft3\b|thyroxine|triodothyronine/, fasting: "no", about: "Hormone de la thyroïde, souvent demandée avec la TSH.", aboutAr: "هرمون الغدة، غالباً كيتطلب مع TSH.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /ferritine/, fasting: "no", about: "Réserve de fer de l'organisme.", aboutAr: "مخزون الحديد فالجسم.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /fer serique/, fasting: "yes", about: "Quantité de fer dans le sang.", aboutAr: "كمية الحديد فالدم.", prep: "De préférence le matin, à jeun.", prepAr: "حسن فالصباح، وانت صايم." },
    { test: /creatinine sang|creatinine \(sang\)/, fasting: "no", about: "Reflète le fonctionnement des reins.", aboutAr: "كيعطي فكرة على الكلى.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /uree sang/, fasting: "no", about: "Autre examen du fonctionnement des reins.", aboutAr: "تحليل آخر على الكلى.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /bilan hepatique/, fasting: "yes", about: "Groupe d'examens pour le foie.", aboutAr: "مجموعة تحاليل للكبدة.", prep: "Souvent demandé à jeun. Le laboratoire confirme.", prepAr: "غالباً صايم. أكّد مع المختبر." },
    { test: /asat|alat|transaminase/, fasting: "no", about: "Enzymes du foie.", aboutAr: "أنزيمات الكبدة.", prep: "Le jeûne n'est en général pas obligatoire.", prepAr: "الصيام غالباً ماشي ضروري." },
    { test: /bilan thyroid/, fasting: "no", about: "Groupe d'examens de la thyroïde.", aboutAr: "مجموعة تحاليل الغدة.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /hemostase/, fasting: "no", about: "Examens de la coagulation du sang.", aboutAr: "تحاليل تخثر الدم.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /hemolyse/, fasting: "no", about: "Groupe d'examens en cas de destruction des globules rouges.", aboutAr: "تحاليل إلا كانت الكريات الحمر كتخسر.", prep: "Le laboratoire précise les consignes.", prepAr: "المختبر غادي يعطيك التعليمات." },
    { test: /ecbu|cytobact des urines/, fasting: "urine", about: "Recherche une infection urinaire.", aboutAr: "كيقلب على التهاب البول.", prep: "Urine du matin, après une toilette locale. Ce n'est pas un examen à jeun.", prepAr: "بول الصباح، من بعد النظافة. ماشي تحليل بالصيام." },
    { test: /beta-hcg|\bhcg\b/, fasting: "no", about: "Hormone utilisée pour confirmer une grossesse.", aboutAr: "هرمون باش نتأكدو من الحمل.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /\bhiv\b|\bvih\b/, fasting: "no", about: "Dépistage du VIH.", aboutAr: "كشف السيدا.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /hbs|hcv|\bhbv\b|hepatite/, fasting: "no", about: "Dépistage d'une hépatite.", aboutAr: "كشف التهاب الكبد.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /toxo/, fasting: "no", about: "Sérologie de la toxoplasmose, souvent demandée pendant la grossesse.", aboutAr: "تحليل التوكسوبلاسموز، غالباً فالحمل.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /rubeole/, fasting: "no", about: "Sérologie de la rubéole, souvent demandée pendant la grossesse.", aboutAr: "تحليل الحصبة الألمانية، غالباً فالحمل.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /groupage|\babo\b/, fasting: "no", about: "Détermine le groupe sanguin.", aboutAr: "كيعطي فصيلة الدم.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /\bcrp\b/, fasting: "no", about: "Marqueur d'inflammation.", aboutAr: "علامة الالتهاب.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /\bpsa\b/, fasting: "no", about: "Examen lié à la prostate.", aboutAr: "تحليل مرتبط بالبروستات.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /ionogramme/, fasting: "no", about: "Dosage du sodium, du potassium et des autres sels du sang.", aboutAr: "قياس الصوديوم والبوتاسيوم والأملاح فالدم.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /troponine/, fasting: "no", about: "Marqueur utilisé pour le cœur, souvent en urgence.", aboutAr: "علامة القلب، غالباً فالاستعجال.", prep: "Le jeûne n'est pas demandé.", prepAr: "الصيام ما مطلوبش." },
    { test: /enzymes cardiaques/, fasting: "no", about: "Groupe d'examens liés au muscle cardiaque.", aboutAr: "تحاليل عضلة القلب.", prep: "Le jeûne n'est pas nécessaire.", prepAr: "ما خصكش تكون صايم." },
    { test: /catecholamines/, fasting: "ask", about: "Dosage des hormones du stress dans les urines.", aboutAr: "قياس هرمونات الضغط فالبول.", prep: "Le prélèvement se fait souvent sur 24 heures. Le laboratoire explique le recueil.", prepAr: "غالباً التجميع على 24 ساعة. المختبر كيشرح كيفاش." },
];

const ACRONYMS = new Set("nfs tsh hdl ldl pcr vih hiv hbv hcv ecbu psa afp cea crp asat alat tgo tgp ggt ldh cpk ck bnp adn arn hplc igg iga igm ige anca inr tca tp vs rai aslo bhcg hcg ft3 ft4 t3 t4 t3l t4l hbs got ast alt gpt bk ph ana ama dna ebv cmv hsv vdrl tpha abo ag hgpo hiv1 hiv2 far hn lram anam".split(" "));

const WORDS = {
    glycemie: "glycémie",
    hemoglobine: "hémoglobine",
    creatinine: "créatinine",
    cholesterol: "cholestérol",
    triglycerides: "triglycérides",
    thyroidien: "thyroïdien",
    hepatique: "hépatique",
    hemolyse: "hémolyse",
    hemostase: "hémostase",
    serologie: "sérologie",
    serodiagnostic: "sérodiagnostic",
    numeration: "numération",
    proteine: "protéine",
    proteines: "protéines",
    electrophorese: "électrophorèse",
    prelevement: "prélèvement",
    bacteriologique: "bactériologique",
    cytobacteriologie: "cytobactériologie",
    serique: "sérique",
    hepatite: "hépatite",
    recepteurs: "récepteurs",
    recepteur: "récepteur",
    antiphospholipides: "antiphospholipides",
    plasmatique: "plasmatique",
    ultrasensible: "ultrasensible",
    quantitatif: "quantitatif",
    urinaire: "urinaire",
    urinaires: "urinaires",
    uree: "urée",
    sanguine: "sanguine",
    formule: "formule",
    examen: "examen",
    recherche: "recherche",
    culture: "culture",
    catecolamines: "catécholamines",
    catecholamines: "catécholamines",
    expectoration: "expectoration",
    acide: "acide",
    anti: "anti",
    bilan: "bilan",
    enzymes: "enzymes",
    cardiaques: "cardiaques",
    thyroglobuline: "thyroglobuline",
    ferritine: "ferritine",
    transaminase: "transaminase",
    ionogramme: "ionogramme",
    complet: "complet",
    groupage: "groupage",
    toxoplasmose: "toxoplasmose",
    rubeole: "rubéole",
    grossesse: "grossesse",
    jeun: "jeun",
    hors: "hors",
    labo: "labo",
    dans: "dans",
    des: "des",
    glucoproteine: "glycoprotéine",
};

const SMALL = new Set(["de", "des", "du", "la", "le", "les", "et", "dans", "un", "une", "au", "aux", "en", "sur", "par", "pour", "avec", "ou", "d"]);
const PLACES = new Set(["casablanca", "casa", "rabat", "sale", "tanger", "tetouan", "fes", "meknes", "marrakech", "agadir", "oujda", "nador", "kenitra", "jadida", "mellal", "beni", "laayoune", "layoune", "dakhla", "maroc", "morocco", "المغرب", "الدار", "البيضاء", "الرباط", "طنجة", "فاس", "مراكش", "اكادير", "وجدة"]);
const CITIES = [
    { id: "casa", fr: "Casablanca", ar: "الدار البيضاء" },
    { id: "rabat", fr: "Rabat", ar: "الرباط" },
    { id: "sale", fr: "Salé", ar: "سلا" },
    { id: "tanger", fr: "Tanger", ar: "طنجة" },
    { id: "tetouan", fr: "Tétouan", ar: "تطوان" },
    { id: "fes", fr: "Fès", ar: "فاس" },
    { id: "meknes", fr: "Meknès", ar: "مكناس" },
    { id: "marrakech", fr: "Marrakech", ar: "مراكش" },
    { id: "agadir", fr: "Agadir", ar: "أكادير" },
    { id: "oujda", fr: "Oujda", ar: "وجدة" },
    { id: "nador", fr: "Nador", ar: "الناظور" },
    { id: "kenitra", fr: "Kénitra", ar: "القنيطرة" },
    { id: "jadida", fr: "El Jadida", ar: "الجديدة" },
    { id: "mellal", fr: "Béni Mellal", ar: "بني ملال" },
    { id: "laayoune", fr: "Laâyoune", ar: "العيون" },
    { id: "dakhla", fr: "Dakhla", ar: "الداخلة" },
];

const DOTS = {
    LB: "#0e6b56",
    LH: "#9d3b5a",
    LIC: "#0f6f8a",
    LIS: "#a07810",
    LBM: "#c45c26",
    LPM: "#3f4c3a",
    LP: "#1d6a8a",
    LBMM: "#5b4b8a",
    DTP: "#8a6232",
    LELU: "#7a3e6d",
    LSM: "#4d5d75",
    DBS: "#2f6b3a",
    LC: "#6b5b4b",
    "Labo. Spécialisé": "#5c6b73",
};

const SHORT = {
    LB: "Biochimie",
    LH: "Hématologie",
    LIC: "Immunochimie",
    LIS: "Immunosérologie",
    LBM: "Bactériologie",
    LPM: "Parasitologie",
    LP: "Protéines",
    LBMM: "Biologie moléculaire",
    DTP: "Toxicopharmacologie",
    LELU: "Lithiase urinaire",
    "Labo. Spécialisé": "Sous-traitant",
    LSM: "Spectrométrie de masse",
    DBS: "Biosécurité",
    LC: "Chromatographie",
};

const SHORT_AR = {
    LB: "الكيمياء الحيوية",
    LH: "الدم",
    LIC: "المناعة الكيميائية",
    LIS: "السيرولوجيا",
    LBM: "البكتيريا",
    LPM: "الطفيليات",
    LP: "البروتينات",
    LBMM: "البيولوجيا الجزيئية",
    DTP: "السموم والأدوية",
    LELU: "حصى البول",
    "Labo. Spécialisé": "مختبر خارجي",
    LSM: "مطياف الكتلة",
    DBS: "السلامة الحيوية",
    LC: "الكروماتوغرافيا",
};

const I18N = {
    fr: {
        pageTitle: "Tarifs des analyses médicales au Maroc",
        metaDescription: "Trouvez le prix d'une analyse médicale au Maroc. Le tarif FAR est indiqué en complément pour les laboratoires conventionnés.",
        skip: "Aller à la recherche",
        brand: "Tarifs Labo",
        brandSub: "Catalogue du 13 décembre 2025",
        exams: "examens",
        order: "Ordonnance",
        eyebrow: "Avant d'aller au laboratoire",
        title: "Le prix de l'analyse, tout de suite.",
        lede: "Tapez le nom sur l'ordonnance, ou un mot simple : sucre, thyroïde, cholestérol. Le prix s'affiche tout de suite.",
        searchLabel: "Rechercher une analyse",
        chips: "Recherches fréquentes",
        cityAsk: "Votre ville",
        cityLine: "À {city}, confirmez ce prix au laboratoire avant de payer.",
        shareLink: "Ouvrir sur le site :",
        placeholder: "Glycémie, TSH, NFS, fer, ECBU…",
        clearSearch: "Effacer la recherche",
        farTitle: "Le tarif FAR, c'est pour qui ?",
        farText: "Le prix en grand est celui à retenir. Le montant FAR est une information en plus : il concerne seulement les laboratoires conventionnés par les Forces Armées Royales. Si votre laboratoire ne l'est pas, ignorez-le.",
        specialty: "Spécialité",
        allSectors: "Tous les secteurs",
        hnFilter: "Hors liste officielle",
        panelFilter: "Bilans seulement",
        footerPrices: "Prix du fichier catalogue du 13 décembre 2025. Confirmez-les au laboratoire avant de payer. Le tarif FAR ne s'applique qu'aux laboratoires conventionnés par les Forces Armées Royales.",
        footerDisclaimer: "Ce site informe sur des tarifs. Il ne lit pas un résultat et ne remplace pas un médecin ni un biologiste.",
        orderTitle: "Votre ordonnance",
        orderHint: "Cochez les examens de votre ordonnance pour voir le total.",
        closeOrder: "Fermer l'ordonnance",
        bundles: "Bilans",
        bundlesSub: "Plusieurs examens, un seul prix.",
        popular: "Les plus recherchés",
        popularSub: "Glycémie, NFS, thyroïde, fer…",
        browseAll: "Tout le catalogue",
        bundle: "Bilan",
        hn: "Hors liste",
        callDelay: "Appeler pour le délai",
        delay: "Délai",
        add: "Ajouter",
        remove: "Retirer",
        farLine: "Laboratoire conventionné FAR :",
        fastingYes: "À jeun",
        fastingNo: "Sans jeûne",
        urine: "Urine",
        where: "Où c'est fait",
        prepFallback: "Le laboratoire vous dit s'il faut être à jeun.",
        close: "Fermer",
        addOrder: "Ajouter à l'ordonnance",
        removeOrder: "Retirer de l'ordonnance",
        added: "Ajouté à l'ordonnance",
        removed: "Retiré de l'ordonnance",
        orderEmptyTitle: "Aucune analyse pour l'instant",
        orderEmptyText: "Ajoutez les examens de l'ordonnance. Le total s'affiche ici.",
        farIf: "FAR, si le laboratoire est conventionné :",
        totalPay: "Total à payer",
        totalFar: "Total FAR, laboratoires conventionnés :",
        clear: "Vider",
        copy: "Copier",
        copied: "Récapitulatif copié",
        copyFail: "Impossible de copier",
        none: "Aucun examen",
        emptyTitle: "Aucun examen pour « {q} »",
        emptyHint: "Essayez NFS, TSH, glycémie, fer, ECBU ou le nom du bilan.",
        thisSelection: "cette sélection",
        more: "Afficher la suite ({n})",
        hnNote: "Cet examen n'est pas dans la liste officielle. Le prix peut changer d'un laboratoire à l'autre.",
        outNote: "Il est souvent envoyé à un autre laboratoire. Le délai se confirme par téléphone.",
        fastingAbout: "Prélèvement à jeun.",
        fastingPrep: "À jeun : ne rien manger pendant 8 à 12 heures. Vous pouvez boire de l'eau.",
        urinePrep: "Prélèvement d'urine. Le jeûne n'est en général pas demandé.",
        delayPhone: "À téléphoner",
        delaySame: "Le jour même",
        delayOne: "1 jour",
        delayMany: "{n} jours",
        delayUnknown: "Non précisé",
        unit: "DH",
        shareTitle: "Ordonnance — Tarifs Labo",
        shareDate: "Catalogue du 13 décembre 2025",
        shareTotal: "Total :",
        shareFar: "Tarif FAR, si le laboratoire est conventionné :",
        shareConfirm: "À confirmer au laboratoire.",
        langLabel: "Afficher en arabe",
    },
    ar: {
        pageTitle: "أثمنة التحاليل الطبية فالمغرب",
        metaDescription: "قلب على ثمن تحليل طبي فالمغرب. ثمن FAR معلومة زايدة غير للمختبرات المتعاقدة مع القوات المسلحة الملكية.",
        skip: "دوز للبحث",
        brand: "أثمنة التحاليل",
        brandSub: "كتالوج 13 دجنبر 2025",
        exams: "تحليل",
        order: "الورقة",
        eyebrow: "قبل ما تمشي للمختبر",
        title: "ثمن التحليل، دغيا.",
        lede: "كتب الاسم اللي فالورقة، ولا كلمة بسيطة: السكر، الغدة، الكوليستيرول. الثمن كيبان دغيا.",
        searchLabel: "قلب على تحليل",
        chips: "البحث المتكرر",
        cityAsk: "المدينة ديالك",
        cityLine: "فـ {city}، أكّد هاد الثمن فالمختبر قبل ما تخلّص.",
        shareLink: "حل الرابط :",
        placeholder: "السكر، TSH، NFS، الحديد، البول…",
        clearSearch: "مسح البحث",
        farTitle: "ثمن FAR، لشكون؟",
        farText: "الثمن الكبير هو اللي خصك. ثمن FAR غير معلومة زايدة: كيهم غير المختبرات المتعاقدة مع القوات المسلحة الملكية. إلا مختبرك ماشي منهم، ما تحسبوش.",
        specialty: "التخصص",
        allSectors: "جميع التخصصات",
        hnFilter: "خارج اللائحة الرسمية",
        panelFilter: "غير الحصيلة",
        footerPrices: "الأثمنة من ملف الكتالوج ديال 13 دجنبر 2025. أكّدهم فالمختبر قبل ما تخلّص. ثمن FAR غير للمختبرات المتعاقدة مع القوات المسلحة الملكية.",
        footerDisclaimer: "الموقع كيعطي غير الأثمنة. ما كيقراش النتيجة وما كيعوّضش الطبيب ولا البيولوجي.",
        orderTitle: "الورقة ديالك",
        orderHint: "زيد التحليلات ديال الورقة باش تشوف المجموع.",
        closeOrder: "سد الورقة",
        bundles: "الحصيلة",
        bundlesSub: "تحليلات بزاف، وثمن واحد.",
        popular: "اللي كيتقلب عليهم بزاف",
        popularSub: "السكر، NFS، الغدة، الحديد…",
        browseAll: "الكتالوج كامل",
        bundle: "حصيلة",
        hn: "خارج اللائحة",
        callDelay: "عيّط باش تعرف المدة",
        delay: "المدة",
        add: "زيد",
        remove: "حيّد",
        farLine: "مختبر متعاقد مع FAR :",
        fastingYes: "صايم",
        fastingNo: "بلا صيام",
        urine: "البول",
        where: "فين كيتدار",
        prepFallback: "المختبر غادي يقولك واش خصك تكون صايم.",
        close: "سد",
        addOrder: "زيد للورقة",
        removeOrder: "حيّد من الورقة",
        added: "تزاد للورقة",
        removed: "تحيّد من الورقة",
        orderEmptyTitle: "مازال ما زدت حتى تحليل",
        orderEmptyText: "زيد التحليلات ديال الورقة. المجموع غادي يبان هنا.",
        farIf: "FAR، إلا كان المختبر متعاقد :",
        totalPay: "المجموع",
        totalFar: "مجموع FAR، للمختبرات المتعاقدة :",
        clear: "مسح",
        copy: "نسخ",
        copied: "تنسخ الملخص",
        copyFail: "ما قدرناش ننسخو",
        none: "حتى تحليل",
        emptyTitle: "ما لقينا حتى تحليل لـ « {q} »",
        emptyHint: "جرّب NFS ولا TSH ولا السكر ولا الحديد ولا البول ولا اسم الحصيلة.",
        thisSelection: "هاد الاختيار",
        more: "وري الباقي ({n})",
        hnNote: "هاد التحليل ماشي فاللائحة الرسمية. الثمن يقدر يتبدل من مختبر لآخر.",
        outNote: "غالباً كيتسيفط لمختبر آخر. المدة كتأكد بالتليفون.",
        fastingAbout: "أخذ الدم وانت صايم.",
        fastingPrep: "خصك تكون صايم: ما تاكلش من 8 حتى 12 ساعة. الماء مسموح.",
        urinePrep: "أخذ البول. الصيام غالباً ما مطلوبش.",
        delayPhone: "عيّط على المختبر",
        delaySame: "ف نفس النهار",
        delayOne: "نهار واحد",
        delayMany: "{n} أيام",
        delayUnknown: "ما متحددش",
        unit: "د.م",
        shareTitle: "الورقة — أثمنة التحاليل",
        shareDate: "كتالوج 13 دجنبر 2025",
        shareTotal: "المجموع :",
        shareFar: "ثمن FAR، إلا كان المختبر متعاقد :",
        shareConfirm: "أكّد الثمن فالمختبر.",
        langLabel: "Afficher en français",
    },
};

function t(key) {
    const pack = I18N[state.lang] || I18N.fr;
    return pack[key] || I18N.fr[key] || key;
}

function applyI18n() {
    const ar = state.lang === "ar";
    document.documentElement.lang = ar ? "ar" : "fr";
    document.documentElement.dir = ar ? "rtl" : "ltr";
    document.title = t("pageTitle");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("metaDescription"));
    document.querySelectorAll("[data-i18n]").forEach((node) => {
        node.textContent = t(node.dataset.i18n);
    });
    els.search.placeholder = t("placeholder");
    els.clear.setAttribute("aria-label", t("clearSearch"));
    els.closeOrder.setAttribute("aria-label", t("closeOrder"));
    els.chips.setAttribute("aria-label", t("chips"));
    if (els.cities) els.cities.setAttribute("aria-label", t("cityAsk"));
    renderCities();
    document.querySelectorAll("#maroc .crawl-list a").forEach((link) => {
        const raw = link.dataset.href || link.getAttribute("href").split("?")[0];
        link.dataset.href = raw;
        link.setAttribute("href", state.lang === "ar" ? raw + "?lang=ar" : raw);
    });
    els.langToggle.textContent = ar ? "Français" : "Arabe";
    els.langToggle.setAttribute("aria-label", t("langLabel"));
    els.langToggle.setAttribute("lang", ar ? "fr" : "ar");
}

function setLanguage(lang) {
    state.lang = lang === "ar" ? "ar" : "fr";
    const code = new URL(window.location.href).searchParams.get("c");
    const url = new URL(window.location.href);
    if (state.lang === "ar") url.searchParams.set("lang", "ar");
    else url.searchParams.delete("lang");
    history.replaceState(null, "", url);
    if (els.dialog && els.dialog.open) els.dialog.close();
    if (els.detail) els.detail.innerHTML = "";
    prepareCatalog();
    fillSectors();
    applyI18n();
    renderChips();
    render();
    if (code) {
        const item = items().find((entry) => entry.code === code);
        if (item) openDetail(item.id);
    }
}

const state = {
    lang: new URLSearchParams(window.location.search).get("lang") === "ar" ? "ar" : "fr",
    query: "",
    sector: "",
    hnOnly: false,
    panelOnly: false,
    showAll: false,
    limit: 24,
    order: [],
    activeSuggestion: -1,
    suggestions: [],
    city: savedCity(),
};

const els = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
    els.search = document.getElementById("searchInput");
    els.form = document.getElementById("searchForm");
    els.clear = document.getElementById("clearSearch");
    els.suggestions = document.getElementById("suggestions");
    els.chips = document.getElementById("quickChips");
    els.home = document.getElementById("home");
    els.results = document.getElementById("results");
    els.count = document.getElementById("resultCount");
    els.sector = document.getElementById("sectorFilter");
    els.hn = document.getElementById("hnFilter");
    els.panel = document.getElementById("panelFilter");
    els.catalogCount = document.getElementById("catalogCount");
    els.orderToggle = document.getElementById("orderToggle");
    els.orderCount = document.getElementById("orderCount");
    els.sheet = document.getElementById("orderSheet");
    els.overlay = document.getElementById("overlay");
    els.orderList = document.getElementById("orderList");
    els.orderFooter = document.getElementById("orderFooter");
    els.closeOrder = document.getElementById("closeOrder");
    els.dialog = document.getElementById("detailDialog");
    els.detail = document.getElementById("detailBody");
    els.toast = document.getElementById("toast");
    els.langToggle = document.getElementById("langToggle");
    els.cities = document.getElementById("cities");
    els.cityLine = document.getElementById("cityLine");

    prepareCatalog();
    state.order = loadOrder();
    fillSectors();
    applyI18n();
    renderChips();
    bindEvents();
    applyIncomingLink();
}

function prepareCatalog() {
    const items = (window.CATALOG && window.CATALOG.items) || [];
    items.forEach((item) => {
        item.display = prettify(item.name);
        item.hn = item.anam === "HN";
        const guide = guideFor(item);
        item.fasting = guide.fasting;
        item.about = guide.about;
        item.prep = guide.prep;
        item.phone = /telephon/i.test(fold(item.delay));
        item.outsourced = item.sector === "Labo. Spécialisé";
        const extra = ALIASES.filter((alias) => alias.test.test(fold(item.name))).flatMap((alias) => alias.terms);
        item.hay = fold([item.name, item.display, item.code, item.anam, sectorLabel(item.sector), sectorFull(item.sector), extra.join(" ")].join(" "));
    });
    els.catalogCount.textContent = String(items.length);
}

function items() {
    return window.CATALOG.items;
}

function fillSectors() {
    const selected = state.sector;
    [...els.sector.querySelectorAll("option")].forEach((option) => {
        if (option.value) option.remove();
    });
    const labels = state.lang === "ar" ? SHORT_AR : SHORT;
    const present = new Set(items().flatMap((item) => item.sector.split("/").map((part) => part.trim())));
    Object.keys(SHORT)
        .filter((code) => present.has(code))
        .sort((a, b) => (labels[a] || SHORT[a]).localeCompare(labels[b] || SHORT[b], state.lang === "ar" ? "ar" : "fr"))
        .forEach((code) => {
            const option = document.createElement("option");
            option.value = code;
            option.textContent = labels[code] || SHORT[code];
            els.sector.append(option);
        });
    if (selected) els.sector.value = selected;
}

function renderChips() {
    els.chips.innerHTML = QUICK.map((item) => {
        const label = state.lang === "ar" ? item.ar : item.fr;
        return `<button type="button" class="chip" data-query="${escapeHtml(item.query)}">${escapeHtml(label)}</button>`;
    }).join("");
}

function bindEvents() {
    els.search.addEventListener("input", () => {
        state.query = els.search.value;
        state.showAll = false;
        state.limit = 24;
        state.activeSuggestion = -1;
        renderSuggestions();
        render();
    });
    els.form.addEventListener("submit", (event) => {
        event.preventDefault();
        chooseSuggestion();
    });
    els.search.addEventListener("keydown", onSearchKey);
    els.clear.addEventListener("click", () => {
        els.search.value = "";
        state.query = "";
        hideSuggestions();
        render();
        els.search.focus();
    });
    els.chips.addEventListener("click", (event) => {
        const button = event.target.closest("[data-query]");
        if (!button) return;
        els.search.value = button.dataset.query;
        state.query = button.dataset.query;
        state.limit = 24;
        hideSuggestions();
        render();
    });
    els.sector.addEventListener("change", () => {
        state.sector = els.sector.value;
        state.limit = 24;
        render();
    });
    els.hn.addEventListener("change", () => {
        state.hnOnly = els.hn.checked;
        state.limit = 24;
        render();
    });
    els.panel.addEventListener("change", () => {
        state.panelOnly = els.panel.checked;
        state.limit = 24;
        render();
    });
    els.results.addEventListener("click", onResultClick);
    els.home.addEventListener("click", onResultClick);
    els.orderToggle.addEventListener("click", () => toggleOrder());
    els.closeOrder.addEventListener("click", () => toggleOrder(false));
    els.overlay.addEventListener("click", () => toggleOrder(false));
    els.orderList.addEventListener("click", (event) => {
        const button = event.target.closest("[data-remove]");
        if (!button) return;
        state.order = state.order.filter((id) => id !== Number(button.dataset.remove));
        saveOrder();
        render();
    });
    els.orderFooter.addEventListener("click", (event) => {
        if (event.target.closest("#copyOrder")) copyOrder();
        if (event.target.closest("#shareWhatsApp")) shareWhatsApp();
        if (event.target.closest("#clearOrder")) {
            state.order = [];
            saveOrder();
            render();
        }
    });
    document.addEventListener("click", (event) => {
        if (!els.form.contains(event.target)) hideSuggestions();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            hideSuggestions();
            toggleOrder(false);
        }
    });
    els.dialog.addEventListener("click", (event) => {
        if (event.target === els.dialog) els.dialog.close();
    });
    els.dialog.addEventListener("close", () => {
        const url = new URL(window.location.href);
        if (!url.searchParams.get("c")) return;
        url.searchParams.delete("c");
        history.replaceState(null, "", url);
    });
    if (els.cities) {
        els.cities.addEventListener("click", (event) => {
            const button = event.target.closest("[data-city]");
            if (!button) return;
            state.city = state.city === button.dataset.city ? "" : button.dataset.city;
            try {
                localStorage.setItem("tariflabo-city", state.city);
            } catch {
                /* le choix reste pour cette visite */
            }
            renderCities();
        });
    }
    els.langToggle.addEventListener("click", () => {
        setLanguage(state.lang === "ar" ? "fr" : "ar");
    });
}

function onSearchKey(event) {
    if (!state.suggestions.length || els.suggestions.hidden) {
        if (event.key === "Escape") hideSuggestions();
        return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const direction = event.key === "ArrowDown" ? 1 : -1;
        const next = state.activeSuggestion + direction;
        state.activeSuggestion = Math.max(0, Math.min(state.suggestions.length - 1, next));
        paintSuggestions();
    }
    if (event.key === "Escape") hideSuggestions();
}

function onResultClick(event) {
    const add = event.target.closest("[data-add]");
    const open = event.target.closest("[data-open]");
    const more = event.target.closest("[data-more]");
    const browse = event.target.closest("[data-browse]");
    if (add) {
        event.stopPropagation();
        toggleInOrder(Number(add.dataset.add));
        return;
    }
    if (open) {
        openDetail(Number(open.dataset.open));
        return;
    }
    if (more) {
        state.limit += 24;
        render();
        return;
    }
    if (browse) {
        state.showAll = true;
        state.limit = 24;
        render();
        document.getElementById("toolbar").scrollIntoView({ block: "start" });
    }
}

function browsingHome() {
    return !state.query.trim() && !state.sector && !state.hnOnly && !state.panelOnly && !state.showAll;
}

function currentList() {
    let list = items();
    if (state.sector) {
        list = list.filter((item) => item.sector.split("/").map((part) => part.trim()).includes(state.sector));
    }
    if (state.hnOnly) list = list.filter((item) => item.hn);
    if (state.panelOnly) list = list.filter((item) => item.panel);
    const query = state.query.trim();
    if (!query) return list;
    const tokens = fold(query).split(" ").filter((token) => token && !SMALL.has(token) && !PLACES.has(token));
    if (!tokens.length) return list;
    const needed = tokens;
    return list
        .map((item) => ({ item, score: scoreItem(item, fold(query), needed) }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score || a.item.display.localeCompare(b.item.display, "fr"))
        .map((entry) => entry.item);
}

function scoreItem(item, query, tokens) {
    if (!tokens.every((token) => item.hay.includes(token))) return 0;
    let score = 1;
    const code = fold(item.code);
    const anam = fold(item.anam);
    const name = fold(item.display);
    if (code === query || anam === query) score += 120;
    if (code.startsWith(query) || anam.startsWith(query)) score += 40;
    if (name.startsWith(query)) score += 50;
    if (name.includes(query)) score += 20;
    if (item.panel && /bilan|regroup/.test(query)) score += 25;
    if (FEATURED.includes(item.code)) score += 4;
    return score;
}

function render() {
    updateOrderBadge();
    els.clear.hidden = !state.query;
    if (browsingHome()) {
        els.home.hidden = false;
        els.results.innerHTML = "";
        els.count.textContent = "";
        renderHome();
        renderOrder();
        return;
    }
    els.home.hidden = true;
    els.home.innerHTML = "";
    const list = currentList();
    const shown = list.slice(0, state.limit);
    els.count.textContent = list.length ? countLabel(list.length) : t("none");
    if (!list.length) {
        const q = state.query || t("thisSelection");
        els.results.innerHTML = `<div class="empty"><h2>${escapeHtml(t("emptyTitle").replace("{q}", q))}</h2><p>${escapeHtml(t("emptyHint"))}</p></div>`;
        renderOrder();
        return;
    }
    els.results.innerHTML = shown.map(cardHtml).join("") + (shown.length < list.length
        ? `<div class="more-wrap"><button type="button" class="ghost-btn" data-more>${escapeHtml(t("more").replace("{n}", String(list.length - shown.length)))}</button></div>`
        : "");
    renderOrder();
}

function isBundle(item) {
    return item.panel && /BILAN|ENZYME|SEROLOGIE|CATECHOL/i.test(item.name);
}

function renderHome() {
    const byCode = new Map(items().map((item) => [item.code, item]));
    const featured = FEATURED.map((code) => byCode.get(code)).filter(Boolean);
    const bundleRank = ["BLIP", "BTHYR", "BHEPA", "BHEMO", "BHELY", "ENZCAR", "SHBV", "BILPH3", "BILPH 3", "CATE"];
    const bundles = items()
        .filter(isBundle)
        .sort((a, b) => {
            const ai = bundleRank.indexOf(a.code);
            const bi = bundleRank.indexOf(b.code);
            return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
        });
    els.home.innerHTML = `
        <div class="section-head">
            <div>
                <h2>${escapeHtml(t("bundles"))}</h2>
                <p>${escapeHtml(t("bundlesSub"))}</p>
            </div>
        </div>
        <div class="cards">${bundles.map(cardHtml).join("")}</div>
        <div class="section-head">
            <div>
                <h2>${escapeHtml(t("popular"))}</h2>
                <p>${escapeHtml(t("popularSub"))}</p>
            </div>
            <button type="button" class="ghost-btn" data-browse>${escapeHtml(t("browseAll"))}</button>
        </div>
        <div class="cards">${featured.map(cardHtml).join("")}</div>
    `;
}

function cardHtml(item) {
    const inOrder = state.order.includes(item.id);
    return `
        <article class="card">
            <button type="button" class="open-hit" data-open="${item.id}">
                <span class="card-top">
                    <span class="badges">
                        <span class="badge"><i class="dot" style="background:${dotColor(item.sector)}"></i> ${escapeHtml(sectorLabel(item.sector))}</span>
                        ${isBundle(item) ? `<span class="badge bundle">${escapeHtml(t("bundle"))}</span>` : ""}
                        ${item.hn ? `<span class="badge hn">${escapeHtml(t("hn"))}</span>` : ""}
                        ${fastingBadge(item)}
                        ${item.phone ? `<span class="badge wait">${escapeHtml(t("callDelay"))}</span>` : ""}
                    </span>
                </span>
                <h3>${escapeHtml(item.display)}</h3>
                ${item.about ? `<span class="card-about">${escapeHtml(item.about)}</span>` : ""}
                <span class="card-meta">${escapeHtml(t("delay"))} : ${escapeHtml(formatDelay(item.delay))}</span>
                ${priceHtml(item)}
            </button>
            <div class="card-actions">
                <button type="button" class="${inOrder ? "ghost-btn" : "primary-btn"}" data-add="${item.id}">${inOrder ? escapeHtml(t("remove")) : escapeHtml(t("add"))}</button>
            </div>
        </article>
    `;
}

function priceHtml(item) {
    return `
        <span class="price-main"><span class="amount">${money(item.price)}</span></span>
        <span class="far-note">${escapeHtml(t("farLine"))} <strong>${money(item.priceFar)}</strong></span>
    `;
}

function renderSuggestions() {
    const query = fold(state.query);
    if (query.length < 2) {
        hideSuggestions();
        return;
    }
    state.suggestions = currentList().slice(0, 7);
    if (!state.suggestions.length) {
        hideSuggestions();
        return;
    }
    paintSuggestions();
    els.suggestions.hidden = false;
}

function paintSuggestions() {
    els.suggestions.innerHTML = state.suggestions.map((item, index) => `
        <button type="button" class="suggestion" role="option" data-pick="${item.id}" aria-selected="${index === state.activeSuggestion}">
            <strong>${escapeHtml(item.display)}</strong>
            <span>${money(item.price)}</span>
        </button>
    `).join("");
    els.suggestions.querySelectorAll("[data-pick]").forEach((button) => {
        button.addEventListener("mousedown", (event) => {
            event.preventDefault();
            const item = items().find((entry) => entry.id === Number(button.dataset.pick));
            if (!item) return;
            els.search.value = item.display;
            state.query = item.display;
            hideSuggestions();
            render();
        });
    });
}

function chooseSuggestion() {
    const chosen = state.suggestions[state.activeSuggestion];
    if (chosen && !els.suggestions.hidden) {
        els.search.value = chosen.display;
        state.query = chosen.display;
    }
    hideSuggestions();
    render();
}

function hideSuggestions() {
    els.suggestions.hidden = true;
    els.suggestions.innerHTML = "";
    state.suggestions = [];
    state.activeSuggestion = -1;
}

function openDetail(id) {
    const item = items().find((entry) => entry.id === id);
    if (!item) return;
    const inOrder = state.order.includes(item.id);
    const notes = [];
    if (item.hn) notes.push(t("hnNote"));
    if (item.outsourced) notes.push(t("outNote"));
    els.detail.innerHTML = `
        <div class="badges">
            <span class="badge">${escapeHtml(sectorLabel(item.sector))}</span>
            ${isBundle(item) ? `<span class="badge bundle">${escapeHtml(t("bundle"))}</span>` : ""}
            ${item.hn ? `<span class="badge hn">${escapeHtml(t("hn"))}</span>` : ""}
            ${fastingBadge(item)}
        </div>
        <h2>${escapeHtml(item.display)}</h2>
        ${item.about ? `<p class="about">${escapeHtml(item.about)}</p>` : ""}
        ${priceHtml(item)}
        <dl class="facts">
            <div><dt>${escapeHtml(t("delay"))}</dt><dd>${escapeHtml(formatDelay(item.delay))}</dd></div>
            <div><dt>${escapeHtml(t("where"))}</dt><dd>${escapeHtml(sectorFull(item.sector))}</dd></div>
        </dl>
        <p class="note">${escapeHtml(item.prep || t("prepFallback"))}</p>
        ${notes.map((note) => `<p class="note">${escapeHtml(note)}</p>`).join("")}
        <div class="dialog-actions">
            <button type="button" class="ghost-btn" id="closeDetail">${escapeHtml(t("close"))}</button>
            <button type="button" class="wa-btn" id="shareItem">WhatsApp</button>
            <button type="button" class="${inOrder ? "ghost-btn" : "primary-btn"}" id="detailAdd">${escapeHtml(inOrder ? t("removeOrder") : t("addOrder"))}</button>
        </div>
    `;
    document.getElementById("closeDetail").addEventListener("click", () => els.dialog.close());
    document.getElementById("shareItem").addEventListener("click", () => shareItem(item));
    document.getElementById("detailAdd").addEventListener("click", () => {
        toggleInOrder(item.id);
        els.dialog.close();
    });
    const url = new URL(window.location.href);
    url.searchParams.set("c", item.code);
    history.replaceState(null, "", url);
    if (!els.dialog.open) els.dialog.showModal();
}

function toggleInOrder(id) {
    if (state.order.includes(id)) {
        state.order = state.order.filter((entry) => entry !== id);
        showToast(t("removed"));
    } else {
        state.order.push(id);
        showToast(t("added"));
    }
    saveOrder();
    render();
}

function renderOrder() {
    const selected = state.order.map((id) => items().find((item) => item.id === id)).filter(Boolean);
    if (!selected.length) {
        els.orderList.innerHTML = `<div class="empty"><h2>${escapeHtml(t("orderEmptyTitle"))}</h2><p>${escapeHtml(t("orderEmptyText"))}</p></div>`;
        els.orderFooter.innerHTML = "";
        return;
    }
    const total = selected.reduce((sum, item) => sum + item.price, 0);
    const totalFar = selected.reduce((sum, item) => sum + item.priceFar, 0);
    els.orderList.innerHTML = selected.map((item) => `
        <div class="order-line">
            <div>
                <strong>${escapeHtml(item.display)}</strong>
                <span class="order-price">${money(item.price)}</span>
            </div>
            <button type="button" class="linkish" data-remove="${item.id}">${escapeHtml(t("remove"))}</button>
            <span class="far-note">${escapeHtml(t("farIf"))} ${money(item.priceFar)}</span>
        </div>
    `).join("");
    els.orderFooter.innerHTML = `
        <div class="price-box">
            <span class="amount">${money(roundMoney(total))}</span>
            <small>${escapeHtml(t("totalPay"))}</small>
        </div>
        <p class="far-note">${escapeHtml(t("totalFar"))} <strong>${money(roundMoney(totalFar))}</strong></p>
        <div class="sheet-actions">
            <button type="button" class="wa-btn" id="shareWhatsApp">WhatsApp</button>
            <button type="button" class="ghost-btn" id="clearOrder">${escapeHtml(t("clear"))}</button>
            <button type="button" class="primary-btn" id="copyOrder">${escapeHtml(t("copy"))}</button>
        </div>
    `;
}

function toggleOrder(force) {
    const open = typeof force === "boolean" ? force : els.sheet.hidden;
    els.sheet.hidden = !open;
    els.overlay.hidden = !open;
    els.orderToggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
}

function updateOrderBadge() {
    const count = state.order.length;
    els.orderCount.hidden = count === 0;
    els.orderCount.textContent = String(count);
}

function orderText() {
    const selected = state.order.map((id) => items().find((item) => item.id === id)).filter(Boolean);
    if (!selected.length) return "";
    const total = roundMoney(selected.reduce((sum, item) => sum + item.price, 0));
    const totalFar = roundMoney(selected.reduce((sum, item) => sum + item.priceFar, 0));
    return [
        t("shareTitle"),
        t("shareDate"),
        ...selected.map((item) => {
            const prep = item.prep ? ` (${item.prep})` : "";
            return `${item.display} — ${money(item.price)}${prep}`;
        }),
        `${t("shareTotal")} ${money(total)}`,
        `${t("shareFar")} ${money(totalFar)}`,
        cityLabel() ? t("cityLine").replace("{city}", cityLabel()) : "",
        `${t("shareLink")} ${publicLink({ o: selected.map((item) => item.id).join(",") })}`,
        t("shareConfirm"),
    ].filter(Boolean).join("\n");
}

function copyOrder() {
    const text = orderText();
    if (!text) return;
    navigator.clipboard.writeText(text).then(
        () => showToast(t("copied")),
        () => showToast(t("copyFail"))
    );
}

function shareWhatsApp() {
    const text = orderText();
    if (!text) return;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
}

function savedCity() {
    try {
        const id = localStorage.getItem("tariflabo-city");
        return CITIES.some((city) => city.id === id) ? id : "";
    } catch {
        return "";
    }
}

function cityLabel() {
    const city = CITIES.find((entry) => entry.id === state.city);
    if (!city) return "";
    return state.lang === "ar" ? city.ar : city.fr;
}

function renderCities() {
    if (!els.cities) return;
    els.cities.innerHTML = CITIES.map((city) => {
        const label = state.lang === "ar" ? city.ar : city.fr;
        const on = state.city === city.id ? "chip active" : "chip";
        return `<button type="button" class="${on}" data-city="${city.id}">${escapeHtml(label)}</button>`;
    }).join("");
    if (!els.cityLine) return;
    const label = cityLabel();
    els.cityLine.hidden = !label;
    els.cityLine.textContent = label ? t("cityLine").replace("{city}", label) : "";
}

function publicLink(params) {
    const url = new URL(window.location.origin + window.location.pathname);
    if (state.lang === "ar") url.searchParams.set("lang", "ar");
    Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.set(key, value);
    });
    return url.toString();
}

function shareItem(item) {
    const city = cityLabel();
    const lines = [
        item.display,
        money(item.price),
        `${t("farLine")} ${money(item.priceFar)}`,
        item.prep || t("prepFallback"),
        city ? t("cityLine").replace("{city}", city) : "",
        `${t("shareLink")} ${publicLink({ c: item.code })}`,
    ].filter(Boolean);
    window.open(`https://wa.me/?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
}

function applyIncomingLink() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");
    const code = params.get("c");
    const shared = params.get("o");
    if (query) {
        els.search.value = query;
        state.query = query;
        state.showAll = false;
    }
    if (shared) {
        const known = new Set(items().map((item) => item.id));
        const ids = shared.split(",").map(Number).filter((id) => known.has(id));
        state.order = [...new Set([...state.order, ...ids])];
        saveOrder();
    }
    render();
    if (shared && state.order.length) toggleOrder(true);
    if (code) {
        const item = items().find((entry) => entry.code === code);
        if (item) openDetail(item.id);
    }
}

function spoken(guide) {
    if (!guide) return { fasting: "", about: "", prep: "" };
    if (state.lang !== "ar") return { fasting: guide.fasting || "", about: guide.about || "", prep: guide.prep || "" };
    return {
        fasting: guide.fasting || "",
        about: guide.aboutAr || guide.about || "",
        prep: guide.prepAr || guide.prep || "",
    };
}

function guideFor(item) {
    const text = fold(item.name);
    if (/\ba jeun\b/.test(text)) {
        const known = GUIDES.find((guide) => guide.test.test(text));
        return spoken({
            fasting: "yes",
            about: known && known.about ? known.about : I18N.fr.fastingAbout,
            aboutAr: known && known.aboutAr ? known.aboutAr : I18N.ar.fastingAbout,
            prep: I18N.fr.fastingPrep,
            prepAr: I18N.ar.fastingPrep,
        });
    }
    const known = GUIDES.find((guide) => guide.test.test(text));
    if (known) return spoken(known);
    if (/urine|urinaire/.test(text)) {
        return spoken({ fasting: "urine", about: "", aboutAr: "", prep: I18N.fr.urinePrep, prepAr: I18N.ar.urinePrep });
    }
    return { fasting: "", about: "", prep: "" };
}

function fastingBadge(item) {
    if (item.fasting === "yes") return `<span class="badge">${escapeHtml(t("fastingYes"))}</span>`;
    if (item.fasting === "no") return `<span class="badge quiet">${escapeHtml(t("fastingNo"))}</span>`;
    if (item.fasting === "urine") return `<span class="badge">${escapeHtml(t("urine"))}</span>`;
    return "";
}

function countLabel(n) {
    if (!n) return t("none");
    if (state.lang === "ar") return `${n} تحليل`;
    return `${n} examen${n > 1 ? "s" : ""}`;
}

function loadOrder() {
    try {
        const saved = JSON.parse(localStorage.getItem("tariflabo-order") || "[]");
        const known = new Set(items().map((item) => item.id));
        return Array.isArray(saved) ? saved.map(Number).filter((id) => known.has(id)) : [];
    } catch {
        return [];
    }
}

function saveOrder() {
    localStorage.setItem("tariflabo-order", JSON.stringify(state.order));
}

function sectorName(code) {
    if (state.lang === "ar") return SHORT_AR[code] || SHORT[code] || code;
    return SHORT[code] || code;
}

function sectorLabel(sector) {
    return sector.split("/").map((part) => sectorName(part.trim())).join(" · ");
}

function sectorFull(sector) {
    if (state.lang === "ar") return sectorLabel(sector);
    const names = window.CATALOG.sectors || {};
    return sector.split("/").map((part) => names[part.trim()] || SHORT[part.trim()] || part.trim()).join(" · ");
}

function dotColor(sector) {
    const first = sector.split("/")[0].trim();
    return DOTS[first] || "#0e6b56";
}

function formatDelay(delay) {
    const value = String(delay || "").trim();
    if (/telephon/i.test(fold(value))) return t("delayPhone");
    if (value === "0") return t("delaySame");
    if (value === "1") return t("delayOne");
    if (/^\d+$/.test(value)) return t("delayMany").replace("{n}", value);
    return value || t("delayUnknown");
}

function money(value) {
    const [whole, frac] = Number(value).toFixed(2).split(".");
    const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
    return `${grouped},${frac} ${t("unit")}`;
}

function roundMoney(value) {
    return Math.round(value * 100) / 100;
}

function fold(value) {
    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[أإآ]/g, "ا")
        .replace(/ة/g, "ه")
        .replace(/ى/g, "ي")
        .replace(/[^a-z0-9\u0600-\u06ff]+/g, " ")
        .trim();
}

function prettify(name) {
    const tokens = name.toLowerCase().split(/(\s+|[()/:-])/);
    let seen = false;
    const pretty = tokens.map((token) => {
        if (!/[a-z0-9]/.test(token)) return token;
        const bare = token.replace(/[^a-z0-9]/g, "");
        if (ACRONYMS.has(bare)) {
            seen = true;
            return token.replace(new RegExp(bare, "i"), bare.toUpperCase());
        }
        let word = WORDS[bare] || token;
        if (!seen) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
            seen = true;
        } else if (bare === "a") {
            word = "à";
        } else if (SMALL.has(bare) && !WORDS[bare]) {
            word = bare;
        }
        return word;
    }).join("");
    return pretty
        .replace(/glycemique/gi, "glycémique")
        .replace(/glycemie/gi, "glycémie")
        .replace(/hemolyse/gi, "hémolyse")
        .replace(/hemostase/gi, "hémostase")
        .replace(/hepatique/gi, "hépatique")
        .replace(/rubeole/gi, "rubéole");
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    }[char]));
}

let toastTimer;
function showToast(message) {
    els.toast.hidden = false;
    els.toast.textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        els.toast.hidden = true;
    }, 2200);
}
