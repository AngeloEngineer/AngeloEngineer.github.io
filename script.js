// ==========================================================================
    // ICÔNES SVG CENTRALISÉES
    // ==========================================================================
    const SVGIcons = {
      coin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
      factory: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>',
      database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>',
      chip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/></svg>',
      earth: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
      code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
      chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>'
    };

    // ==========================================================================
    // DONNÉES BILINGUES DES PROJETS (AVEC PIPELINES EN 5 ÉTAPES)
    // ==========================================================================
    const missionsData = [
      {
        id: 'sikapay',
        badge: '[01]',
        category: 'analytics',
        tag: { fr: 'LIVRÉ · DWH', en: 'DELIVERED · DWH' },
        tagClass: 'tag--royal',
        icon: 'coin',
        title: {
          fr: 'SikaPay Analytics UEMOA',
          en: 'SikaPay Analytics WAEMU'
        },
        summary: {
          fr: 'Data Warehouse Mobile Money multi-pays (Togo, Bénin, Côte d\'Ivoire, Sénégal).',
          en: 'Multi-country Mobile Money Data Warehouse (Togo, Benin, Ivory Coast, Senegal).'
        },
        metric: {
          fr: 'PostgreSQL · Apache Airflow (CeleryExecutor) · dbt · Schéma 3NF (11 tables) → Étoile · Metabase (+60 000 tx)',
          en: 'PostgreSQL · Apache Airflow (CeleryExecutor) · dbt · 3NF (11 tables) → Star Schema · Metabase (60,000+ tx)'
        },
        desc: {
          fr: 'Entrepôt de données décisionnel (schéma en étoile) pour un opérateur Mobile Money actif dans 4 pays UEMOA. Schéma OLTP normalisé 3NF de 11 tables, génération de +60 000 transactions réalistes avec injection contrôlée d\'anomalies (doublons, valeurs manquantes, formats hétérogènes), pipeline ELT orchestré sous Apache Airflow et modélisation dbt.',
          en: 'Analytical Data Warehouse (Kimball Star Schema) for a Mobile Money operator across 4 WAEMU countries. Built from an 11-table 3NF OLTP schema with 60,000+ transactions and controlled anomaly injection (duplicates, nulls, heterogeneous formats), orchestrated via Apache Airflow and modeled with dbt.'
        },
        guarantees: {
          fr: ['Schéma OLTP 3NF (11 tables) → Schéma en Étoile Kimball', 'Tests dbt de résilience aux anomalies injectées', 'Orchestration distribuée Airflow CeleryExecutor'],
          en: ['3NF OLTP (11 tables) → Kimball Star Schema', 'dbt resilience tests against injected anomalies', 'Distributed Airflow CeleryExecutor orchestration']
        },
        codeUrl: 'https://github.com/AngeloEngineer/sikapay-analytics',
        docUrl: 'https://github.com/AngeloEngineer/sikapay-analytics/blob/master/README.md',
        pipeline: [
          { step: '[01]', icon: 'database', label: { fr: 'OLTP 3NF (11 tables)', en: '3NF OLTP (11 tables)' }, desc: { fr: '+60 000 transactions UEMOA avec anomalies.', en: '60,000+ WAEMU transactions with anomalies.' } },
          { step: '[02]', icon: 'code', label: { fr: 'Airflow Celery', en: 'Airflow Celery' }, desc: { fr: 'Orchestration DAGs & extraction planifiée.', en: 'DAG orchestration & scheduled extraction.' } },
          { step: '[03] CORE', icon: 'filter', core: true, label: { fr: 'Qualité & Nettoyage', en: 'Quality & Cleaning' }, desc: { fr: 'Isolation doublons, nulls et formats corrompus.', en: 'Isolating duplicates, nulls & messy formats.' } },
          { step: '[04]', icon: 'chip', label: { fr: 'Modèles dbt Kimball', en: 'dbt Kimball Models' }, desc: { fr: 'Tables de faits & dimensions Mobile Money.', en: 'Mobile Money fact & dimension tables.' } },
          { step: '[05]', icon: 'chart', label: { fr: 'BI Metabase', en: 'Metabase BI' }, desc: { fr: 'Tableaux de bord volumes & commissions.', en: 'Executive volume & fee dashboards.' } }
        ]
      },
      {
        id: 'supplychain',
        badge: '[02]',
        category: 'analytics',
        tag: { fr: 'LIVRÉ · MÉDAILLE', en: 'DELIVERED · MEDALLION' },
        tagClass: 'tag--emerald',
        icon: 'factory',
        title: {
          fr: 'Supply Chain DW & BI',
          en: 'Supply Chain DW & BI'
        },
        summary: {
          fr: 'Architecture Médaille (19 modèles dbt) & pilotage OTIF sous Streamlit.',
          en: 'Medallion Architecture (19 dbt models) & Streamlit OTIF analytics.'
        },
        metric: {
          fr: 'SQL Server · 19 modèles dbt · Ingestion Watermark · 35 tests unitaires · GitHub Actions CI/CD · Streamlit',
          en: 'SQL Server · 19 dbt models · Watermark Ingestion · 35 unit tests · GitHub Actions CI/CD · Streamlit'
        },
        desc: {
          fr: 'Entrepôt de données décisionnel supply chain structuré en architecture médaille (Bronze/Silver/Gold/Analytics) avec 19 modèles dbt, ingestion incrémentale par watermark et dashboard Streamlit interactif. Suivi du taux de service OTIF, rentabilité, détection automatique d\'anomalies et validation par 35 tests unitaires en CI/CD.',
          en: 'Supply chain data warehouse built on a Bronze/Silver/Gold/Analytics Medallion architecture with 19 dbt models, watermark-based incremental ingestion, and an interactive Streamlit dashboard. Tracks OTIF service rates, profitability, and automated anomaly alerts backed by 35 CI/CD unit tests.'
        },
        guarantees: {
          fr: ['Ingestion incrémentale idempotente par Watermark', '19 modèles dbt Bronze → Silver → Gold → Analytics', '35 tests unitaires automatisés sous GitHub Actions'],
          en: ['Idempotent watermark incremental ingestion', '19 dbt models across Bronze → Silver → Gold → Analytics', '35 automated unit tests in GitHub Actions CI/CD']
        },
        codeUrl: 'https://github.com/AngeloEngineer/SupplyChain_DW',
        docUrl: 'https://github.com/AngeloEngineer/SupplyChain_DW/blob/main/instructions.md',
        pipeline: [
          { step: '[01]', icon: 'factory', label: { fr: 'Flux Logistiques', en: 'Logistics Feeds' }, desc: { fr: 'Commandes, expéditions et stocks.', en: 'Orders, shipments, and inventory.' } },
          { step: '[02]', icon: 'database', label: { fr: 'Watermark Bronze', en: 'Bronze Watermark' }, desc: { fr: 'Capture incrémentale SQL Server.', en: 'Incremental SQL Server capture.' } },
          { step: '[03] CORE', icon: 'code', core: true, label: { fr: '19 Modèles dbt', en: '19 dbt Models' }, desc: { fr: 'Raffinage Silver, Gold & Marts métier.', en: 'Silver, Gold & Analytics Mart refinement.' } },
          { step: '[04]', icon: 'shield', label: { fr: '35 Tests CI/CD', en: '35 CI/CD Tests' }, desc: { fr: 'Exécution GitHub Actions à chaque push.', en: 'GitHub Actions checks on every push.' } },
          { step: '[05]', icon: 'chart', label: { fr: 'Streamlit OTIF', en: 'Streamlit OTIF' }, desc: { fr: 'Pilotage taux de service & anomalies.', en: 'Service rate & anomaly monitoring.' } }
        ]
      },
      {
        id: 'aciertech',
        badge: '[03]',
        category: 'data',
        tag: { fr: 'LIVRÉ · HA', en: 'DELIVERED · HA' },
        tagClass: 'tag--gold',
        icon: 'database',
        title: {
          fr: 'AcierTech DBA Platform',
          en: 'AcierTech DBA Platform'
        },
        summary: {
          fr: 'Plateforme PostgreSQL 16 Haute Disponibilité & pipeline IoT (47 capteurs).',
          en: 'High-Availability PostgreSQL 16 platform & IoT pipeline (47 sensors).'
        },
        metric: {
          fr: 'PostgreSQL 16 · Patroni + etcd (Failover < 30s) · HAProxy · pgBouncer · pgBackRest (RPO < 5m) · Grafana',
          en: 'PostgreSQL 16 · Patroni + etcd (Failover < 30s) · HAProxy · pgBouncer · pgBackRest (RPO < 5m) · Grafana'
        },
        desc: {
          fr: 'Plateforme PostgreSQL 16 industrielle hautement disponible pour une usine de transformation d\'acier (47 capteurs IoT à Lomé) : cluster Patroni + etcd garantissant un failover automatique sous 30 secondes, routage HAProxy, pooling pgBouncer, sauvegardes PITR pgBackRest (RPO < 5 min), contrôle qualité PL/pgSQL et observabilité Prometheus + Grafana.',
          en: 'Industrial High-Availability PostgreSQL 16 platform for a steel transformation plant (47 IoT sensors in Lomé): Patroni + etcd cluster with automated failover under 30s, HAProxy routing, pgBouncer pooling, pgBackRest PITR backups (RPO < 5 min), PL/pgSQL quality gates, and Prometheus + Grafana observability.'
        },
        guarantees: {
          fr: ['Failover automatique Patroni + etcd validé < 30 secondes', 'Sauvegarde Point-in-Time Recovery (RPO < 5 minutes)', 'Observabilité temps réel Prometheus + Grafana'],
          en: ['Automated Patroni + etcd failover verified < 30 seconds', 'Point-in-Time Recovery backups (RPO < 5 minutes)', 'Real-time Prometheus + Grafana observability']
        },
        codeUrl: 'https://github.com/AngeloEngineer/aciertech-dba-platform',
        docUrl: 'https://github.com/AngeloEngineer/aciertech-dba-platform/blob/main/README.md',
        pipeline: [
          { step: '[01]', icon: 'chip', label: { fr: '47 Capteurs IoT', en: '47 IoT Sensors' }, desc: { fr: 'Mesures industrielles en continu.', en: 'Continuous industrial sensor streams.' } },
          { step: '[02]', icon: 'filter', label: { fr: 'HAProxy & pgBouncer', en: 'HAProxy & pgBouncer' }, desc: { fr: 'Routage & pooling haute cadence.', en: 'High-throughput routing & pooling.' } },
          { step: '[03] CORE', icon: 'database', core: true, label: { fr: 'Cluster PG16 Patroni', en: 'PG16 Patroni Cluster' }, desc: { fr: 'Consensus etcd & bascule < 30s.', en: 'etcd consensus & failover < 30s.' } },
          { step: '[04]', icon: 'code', label: { fr: 'Qualité PL/pgSQL', en: 'PL/pgSQL Quality' }, desc: { fr: 'Filtrage des dérives capteurs.', en: 'Sensor drift & anomaly filtering.' } },
          { step: '[05]', icon: 'shield', label: { fr: 'PITR & Grafana', en: 'PITR & Grafana' }, desc: { fr: 'pgBackRest (RPO < 5m) & console DBA.', en: 'pgBackRest (RPO < 5m) & DBA console.' } }
        ]
      },
      {
        id: 'cfpb-lakehouse',
        badge: '[04]',
        category: 'ai',
        tag: { fr: 'EN COURS · R&D', en: 'IN PROGRESS · R&D' },
        tagClass: 'tag--gold',
        icon: 'chip',
        title: {
          fr: 'CFPB NLP Lakehouse',
          en: 'CFPB NLP Lakehouse'
        },
        summary: {
          fr: 'Lakehouse ELT & vectoriel sur +500 000 plaintes financières consommateurs US.',
          en: 'ELT & vector Lakehouse on 500,000+ US consumer financial complaints.'
        },
        metric: {
          fr: 'DuckDB · Parquet Zstd (Hive) · Polars · PyArrow · dbt · pgvector (PostgreSQL 17) · Audits bloquants',
          en: 'DuckDB · Zstd Parquet (Hive) · Polars · PyArrow · dbt · pgvector (PostgreSQL 17) · Blocking Audits'
        },
        desc: {
          fr: 'Architecture Lakehouse locale traitant le corpus officiel US CFPB (+500 000 plaintes réelles) : ingestion streaming out-of-core depuis archives ZIP vers Parquet Zstd partitionné par année, swap atomique idempotent (.staging), gouvernance DLP/PII, indexation vectorielle pgvector et télémétrie d\'exécution ops.pipeline_runs.',
          en: 'Local Lakehouse architecture processing the official US CFPB dataset (500,000+ real complaints): out-of-core streaming ingestion from ZIP archives to Hive-partitioned Zstd Parquet, atomic idempotent .staging swaps, DLP/PII governance, pgvector semantic indexing, and ops.pipeline_runs telemetry.'
        },
        guarantees: {
          fr: ['Idempotence atomique par répertoire .staging', 'Gouvernance DLP/PII & gestion stricte des secrets', 'Télémétrie ops.pipeline_runs & audits bloquants'],
          en: ['Atomic idempotency via .staging directory swap', 'DLP/PII governance & strict secret management', 'ops.pipeline_runs telemetry & blocking audit gates']
        },
        codeUrl: 'https://github.com/AngeloEngineer',
        docUrl: 'https://github.com/AngeloEngineer',
        pipeline: [
          { step: '[01]', icon: 'database', label: { fr: 'Archive CFPB (ZIP)', en: 'CFPB Archive (ZIP)' }, desc: { fr: '+500k plaintes lues en streaming PyArrow.', en: '500k+ complaints streamed via PyArrow.' } },
          { step: '[02]', icon: 'shield', label: { fr: 'Bronze Parquet Zstd', en: 'Bronze Zstd Parquet' }, desc: { fr: 'Partitionnement Hive & swap atomique.', en: 'Hive partitioning & atomic swap.' } },
          { step: '[03] CORE', icon: 'filter', core: true, label: { fr: 'Silver dbt & DLP', en: 'Silver dbt & DLP' }, desc: { fr: 'Nettoyage PII, typage & contrats.', en: 'PII redaction, typing & contracts.' } },
          { step: '[04]', icon: 'chip', label: { fr: 'Gold & pgvector', en: 'Gold & pgvector' }, desc: { fr: 'Embeddings NLP sous PostgreSQL 17.', en: 'NLP embeddings in PostgreSQL 17.' } },
          { step: '[05]', icon: 'chart', label: { fr: 'Télémétrie & Audit', en: 'Telemetry & Audit' }, desc: { fr: 'Assertions audit_phase*.py & SLA.', en: 'audit_phase*.py assertions & SLAs.' } }
        ]
      },
      {
        id: 'aobtp-vdpa',
        badge: '[05]',
        category: 'ai',
        tag: { fr: 'IA & VEILLE', en: 'AI & MONITORING' },
        tagClass: 'tag--emerald',
        icon: 'earth',
        title: {
          fr: 'AO-BTP Copilot & VdPA',
          en: 'AO-BTP Copilot & VdPA'
        },
        summary: {
          fr: 'Copilote IA d\'analyse d\'appels d\'offres BTP & veille sur les prix agricoles.',
          en: 'AI copilot for construction tenders & agricultural price early-warning system.'
        },
        metric: {
          fr: 'Python · LLM Engineering · Extraction documentaire · Collecte automatisée & Alerting Afrique de l\'Ouest',
          en: 'Python · LLM Engineering · Document Extraction · Automated Scraping & Alerting in West Africa'
        },
        desc: {
          fr: 'Deux systèmes orientés impact opérationnel : AO-BTP Copilot accélère le dépouillement de cahiers des charges BTP par extraction structurée LLM, tandis que VdPA (Veille de Prix Agricoles) collecte et surveille l\'évolution des prix des denrées en Afrique de l\'Ouest pour anticiper les tensions alimentaires.',
          en: 'Two operational impact systems: AO-BTP Copilot accelerates construction tender analysis via structured LLM extraction, while VdPA monitors West African staple food prices to provide early warning alerts for decision-makers.'
        },
        guarantees: {
          fr: ['Extraction structurée de clauses techniques BTP', 'Système d\'alerte précoce sur les prix agricoles (VdPA)', 'Code modulaire Python orienté gain de temps métier'],
          en: ['Structured extraction of technical construction clauses', 'Early warning alerts on staple agricultural prices (VdPA)', 'Modular Python engineering focused on business time savings']
        },
        codeUrl: 'https://github.com/AngeloEngineer/AO-BTP-Copilot',
        docUrl: 'https://github.com/AngeloEngineer/Veille-de-Prix-Agricoles-VdPA-',
        pipeline: [
          { step: '[01]', icon: 'earth', label: { fr: 'Dossiers & Marchés', en: 'Tenders & Markets' }, desc: { fr: 'PDF d\'appels d\'offres & relevés prix.', en: 'Tender PDFs & market price feeds.' } },
          { step: '[02]', icon: 'code', label: { fr: 'Parsing Python', en: 'Python Parsing' }, desc: { fr: 'Découpage sémantique & nettoyage.', en: 'Semantic chunking & cleaning.' } },
          { step: '[03] CORE', icon: 'chip', core: true, label: { fr: 'Moteur IA & Seuils', en: 'AI & Threshold Engine' }, desc: { fr: 'Analyse LLM & détection de dérives.', en: 'LLM analysis & spike detection.' } },
          { step: '[04]', icon: 'filter', label: { fr: 'Matrice & Alertes', en: 'Matrix & Alerts' }, desc: { fr: 'Synthèse de conformité & signaux.', en: 'Compliance synthesis & signals.' } },
          { step: '[05]', icon: 'chart', label: { fr: 'Décision Métier', en: 'Business Action' }, desc: { fr: 'Réponse accélérée & anticipation.', en: 'Faster bidding & crisis anticipation.' } }
        ]
      }
    ];

    // ==========================================================================
    // DICTIONNAIRE BILINGUE FR / EN
    // ==========================================================================
    const i18nDict = {
      fr: {
        navSubtitle: 'Data utile · pipelines · BI',
        navLab: '[01] DATA LAB',
        navMissions: '[02] MISSIONS',
        navFlagship: '[03] ARCHITECTURE',
        navPodiums: '[04] PODIUMS & PROFIL',
        navContact: '[05] CONTACT',
        btnIdCard: 'CARTE & CV',
        heroStatus: 'Lomé, Togo (GMT) · Disponible pour missions Data & BI',
        heroRole: 'Data Engineer & Expert en Analytics',
        heroDesc: 'Je conçois des pipelines ETL/ELT robustes, des entrepôts de données décisionnels (PostgreSQL HA, DuckDB, Parquet, dbt) et des tableaux de bord qui transforment les données brutes en leviers de décision.',
        metric1: 'SYSTÈMES LIVRÉS',
        metric2: 'PODIUMS NATIONAUX',
        metric3: 'LIGNES AUDITÉES',
        ctaPrimary: 'Inspecter les pipelines',
        ctaSecondary: 'Explorer le Data Lab',
        ctaCard: 'Fiche d\'identité Data',
        labKicker: 'ARCHITECTURE DE BOUT EN BOUT',
        labTitle: 'DATA & AI LAB',
        labSubtitle: 'Collecter. Fiabiliser. Modéliser. Éclairer.',
        labDesc: 'Mon écosystème d\'ingénierie des données : chaque brique relie la collecte brute (OLTP, capteurs IoT, archives massives) à la décision métier via des pipelines testés, idempotents et gouvernés.',
        legendHeader: 'ÉCOSYSTÈME TECHNIQUE (SURVOLEZ OU CLIQUEZ)',
        missionsKicker: 'INGÉNIERIE APPLIQUÉE & PREUVES DE TRAVAIL',
        missionsTitle: 'ARCHITECTURES & PROJETS',
        missionsSubtitle: 'Sélectionnez un projet pour inspecter son pipeline technique en 5 étapes, ses garanties de qualité et son dépôt GitHub.',
        filterAll: 'Tous les systèmes (5)',
        filterAnalytics: 'Analytics & BI (2)',
        filterData: 'Data Eng. & DBA HA (1)',
        filterAi: 'Lakehouse NLP & IA (2)',
        inspectBtn: 'Inspecter le pipeline →',
        pipelineHeader: 'PIPELINE D\'ARCHITECTURE EN 5 ÉTAPES',
        codeLabel: 'Code GitHub →',
        docLabel: 'Documentation →',
        closeModal: 'FERMER LA FICHE',
        contactTitle: 'TRAVAILLONS<br />ENSEMBLE.',
        contactDesc: 'Vous cherchez un ingénieur capable de structurer vos flux de données, d\'automatiser vos pipelines ou de concevoir des tableaux de bord fiables sans jargon inutile ? Contactez-moi directement.',
        submitBtn: 'TRANSMETTRE LE MESSAGE',
        sentConfirm: 'Merci ! Votre message est prêt / transmis. Vous pouvez aussi me joindre directement sur angelobtma@gmail.com.',
        // Hero lab board nodes
        heroNodeInLbl: 'Flux Bruts & Terrain',
        heroNodeGovLbl: 'Gouvernance & DLP',
        heroNodeObsLbl: 'Observabilité & SLA',
        heroNodeOut1Lbl: 'Lakehouse & PG16 HA',
        heroNodeOut2Lbl: 'Analytics Engineering',
        heroNodeOut3Lbl: 'BI Décisionnelle & IA',
        // Flagship section
        flagshipKicker: 'FOCUS ENTREPÔT MULTI-PAYS',
        flagshipSubtitle: 'Data Warehouse Mobile Money UEMOA (4 pays)',
        flagshipDesc: 'Conception complète d\'un entrepôt décisionnel Mobile Money couvrant le Togo, le Bénin, la Côte d\'Ivoire et le Sénégal : passage d\'une base transactionnelle normalisée 3NF (11 tables, +60 000 transactions) à un schéma en étoile Kimball testé sous dbt.',
        flagshipProof1: '11 tables OLTP converties en faits & dimensions analytiques',
        flagshipProof2: 'Injection contrôlée d\'anomalies (doublons, nulls, formats)',
        flagshipProof3: 'DAGs Apache Airflow (CeleryExecutor) & BI Metabase',
        flagshipRepoLink: 'Dépôt GitHub →',
        flagshipFlowTitle: 'FLUX D\'ARCHITECTURE END-TO-END',
        fpStep1Lbl: 'OLTP 3NF (11 tables)',
        fpStep1Desc: '+60k transactions Mobile Money UEMOA.',
        fpStep2Lbl: 'Airflow Celery',
        fpStep2Desc: 'Extraction & chargement planifiés.',
        fpStep3Lbl: 'Qualité & Nettoyage',
        fpStep3Desc: 'Filtrage doublons, tests dbt & intégrité.',
        fpStep4Lbl: 'Schéma en Étoile',
        fpStep4Desc: 'Tables de faits & dimensions Kimball.',
        fpStep5Lbl: 'BI Metabase',
        fpStep5Desc: 'Pilotage multi-pays & commissions.',
        // Podiums section
        podiumsKicker: 'IMPACT VÉRIFIÉ & PARCOURS',
        podiumsTitle: 'PODIUMS, EXPERTISE & PROFIL',
        podiumsSubtitle: 'Rigueur scientifique, pensée scalable et résultats prouvés en compétition nationale comme en environnement métier.',
        profileSchool: 'ENP Lomé (ex-EPL) · IA & Big Data',
        profileLangs: 'FR (Maternel) · EN (Professionnel)',
        profileBio: 'Formé en Intelligence Artificielle & Big Data à l\'École Nationale Polytechnique de Lomé (Délégué de promotion), je couvre tout le cycle de vie de la donnée avec une exigence d\'architecture Senior : idempotence, gouvernance DLP/PII et observabilité.',
        podium1Sub: 'NATIONALE AU TOGO · DATATOUR 2026',
        podium1Title: 'COMPÉTITION PANAFRICAINE DATA SCIENCE',
        podium1Desc: 'Team Leader · Audit, nettoyage et modélisation de plus de 1,7 million de transactions avec isolation stricte des anomalies pour garantir la fiabilité du pipeline.',
        podium2Sub: 'TOGO AI LAB DATA CHALLENGE',
        podium2Title: 'DÉMOGRAPHIE RGPH & SERVICES PUBLICS',
        podium2Desc: 'Pipeline ETL automatisé (8 tables vérifiées par assertions mathématiques sur 39 préfectures, 117 communes et 8M+ habitants) + dashboard Power BI (16 mesures DAX).',
        podium3Sub: 'PLAINTES FINANCIÈRES · LAKEHOUSE NLP',
        podium3Title: 'ARCHITECTURE LAKEHOUSE & QUALITÉ CI/CD',
        podium3Desc: 'Ingestion streaming out-of-core (DuckDB, Parquet Zstd, Polars), modélisation dbt (Schéma en Étoile & Médaille), gouvernance DLP/PII et 35+ tests unitaires GitHub Actions.',
        podium4Sub: 'FAILOVER AUTOMATIQUE POSTGRESQL 16',
        podium4Title: 'INGÉNIERIE HAUTE DISPONIBILITÉ & LAKEHOUSE',
        podium4Desc: 'Clusters Patroni + etcd, sauvegardes PITR pgBackRest (RPO < 5 min), ingestion streaming out-of-core Parquet Zstd et tests CI/CD GitHub Actions.',
        // Contact section
        contactKicker: 'COLLABORATION & FREELANCE',
        formHeaderTitle: '> ENVOYER UN MESSAGE DIRECT',
        lblName: 'NOM COMPLET',
        lblEmail: 'EMAIL',
        lblSubject: 'SUJET / MISSION',
        lblMessage: 'DÉTAILS DU BESOIN',
        placeholderName: 'Votre nom',
        placeholderEmail: 'vous@entreprise.com',
        placeholderSubject: 'Pipeline ELT / Entrepôt dbt / Dashboard BI / Opportunité',
        placeholderMessage: 'Décrivez votre projet, vos sources de données ou votre besoin...',
        // Mobile data lab cards
        mobileCard1: '[01-03] ENTRÉES : OLTP, IOT, ZIP & APIS',
        mobileCard1Desc: 'PostgreSQL, SQL Server, 47 capteurs IoT, archives CFPB (+500k) et flux VdPA.',
        mobileCard2: '[04-05] STOCKAGE HA & ORCHESTRATION ELT',
        mobileCard2Desc: 'Cluster PostgreSQL 16 Patroni (failover < 30s), DuckDB, Parquet Zstd, Airflow & Polars.',
        mobileCard3: '[06-07] MODÉLISATION DBT, DLP & TESTS CI/CD',
        mobileCard3Desc: 'Architecture Médaille, Schéma en Étoile Kimball, nettoyage PII et assertions bloquantes.',
        mobileCard4: '[08-OUT] IA MULTIMODALE, NLP & BI DÉCISIONNELLE',
        mobileCard4Desc: 'Power BI (16 mesures DAX), Metabase, Streamlit, pgvector et Scikit-learn.',
        // Mobile nav links
        mobileNav1: '[01] DATA LAB',
        mobileNav2: '[02] MISSIONS & PIPELINES',
        mobileNav3: '[03] ARCHITECTURE SIKAPAY',
        mobileNav4: '[04] PODIUMS & PROFIL',
        mobileNav5: '[05] CONTACT',
        // Identity card modal
        idCardStack: '[STACK PRINCIPALE]',
        idCardDistinctions: '[DISTINCTIONS & EXPÉRIENCE]',
        idCardStackContent: 'PostgreSQL 16 HA (Patroni) · SQL Server · DuckDB · Parquet Zstd · dbt · Apache Airflow · Polars · Python · Power BI (DAX) · Metabase · Docker · Linux',
        idCardDistinctionsContent: '• Architectures Data Warehouse & Lakehouse — SikaPay UEMOA, Supply Chain DW & CFPB NLP<br/>• 2e Place Nationale au Togo — Datatour 2026 (1,7M+ transactions)<br/>• 3e Place Nationale — Togo AI Lab Challenge (RGPH 8M+ hab. & Power BI)<br/>• Licence IA & Big Data — École Nationale Polytechnique (ENP Lomé)',
        idCardCvBtn: 'Recevoir le CV PDF complet →',
        // Footer
        footerRight: 'CHARTE PERVENCHE & BLEU ROYAL · ARCHITECTURE LAB',
      },
      en: {
        navSubtitle: 'Useful Data · pipelines · BI',
        navLab: '[01] DATA LAB',
        navMissions: '[02] SYSTEMS',
        navFlagship: '[03] ARCHITECTURE',
        navPodiums: '[04] AWARDS & BIO',
        navContact: '[05] CONTACT',
        btnIdCard: 'ID CARD & CV',
        heroStatus: 'Lomé, Togo (GMT) · Available for Data & BI engagements',
        heroRole: 'Data Engineer & Analytics Specialist',
        heroDesc: 'I build reliable ETL/ELT pipelines, high-availability data warehouses (PostgreSQL HA, DuckDB, Parquet, dbt), and executive BI dashboards that turn raw data into measurable decisions.',
        metric1: 'DELIVERED SYSTEMS',
        metric2: 'NATIONAL PODIUMS',
        metric3: 'AUDITED RECORDS',
        ctaPrimary: 'Inspect pipelines',
        ctaSecondary: 'Explore Data Lab',
        ctaCard: 'Data Identity Card',
        labKicker: 'END-TO-END ARCHITECTURE',
        labTitle: 'DATA & AI LAB',
        labSubtitle: 'Ingest. Secure. Model. Deliver.',
        labDesc: 'My Data Engineering ecosystem: connecting raw operational streams (OLTP, IoT sensors, massive archives) to executive decisions through tested, idempotent, and governed pipelines.',
        legendHeader: 'TECHNICAL ECOSYSTEM (HOVER OR CLICK)',
        missionsKicker: 'APPLIED ENGINEERING & PROOF OF WORK',
        missionsTitle: 'ARCHITECTURES & PROJECTS',
        missionsSubtitle: 'Select a project to inspect its 5-stage technical pipeline, quality guarantees, and GitHub repository.',
        filterAll: 'All systems (5)',
        filterAnalytics: 'Analytics & BI (2)',
        filterData: 'Data Eng. & HA DBA (1)',
        filterAi: 'NLP Lakehouse & AI (2)',
        inspectBtn: 'Inspect pipeline →',
        pipelineHeader: '5-STAGE ARCHITECTURE PIPELINE',
        codeLabel: 'GitHub Code →',
        docLabel: 'Documentation →',
        closeModal: 'CLOSE DOSSIER',
        contactTitle: 'LET\'S WORK<br />TOGETHER.',
        contactDesc: 'Looking for an engineer to structure messy data flows, automate pipelines, or build reliable decision dashboards without unnecessary jargon? Reach out directly.',
        submitBtn: 'SEND MESSAGE',
        sentConfirm: 'Thank you! Your message has been prepared/sent. You can also reach me directly at angelobtma@gmail.com.',
        // Hero lab board nodes
        heroNodeInLbl: 'Raw Streams & Field Data',
        heroNodeGovLbl: 'Governance & DLP',
        heroNodeObsLbl: 'Observability & SLA',
        heroNodeOut1Lbl: 'Lakehouse & PG16 HA',
        heroNodeOut2Lbl: 'Analytics Engineering',
        heroNodeOut3Lbl: 'Decision BI & AI',
        // Flagship section
        flagshipKicker: 'FOCUS — MULTI-COUNTRY WAREHOUSE',
        flagshipSubtitle: 'Mobile Money Data Warehouse — WAEMU (4 countries)',
        flagshipDesc: 'Full design of a Mobile Money analytical Data Warehouse covering Togo, Benin, Ivory Coast, and Senegal: migrating from an 11-table 3NF OLTP schema (60,000+ transactions) to a dbt-tested Kimball Star Schema.',
        flagshipProof1: '11 OLTP tables converted into analytical facts & dimensions',
        flagshipProof2: 'Controlled anomaly injection (duplicates, nulls, formats)',
        flagshipProof3: 'Apache Airflow DAGs (CeleryExecutor) & Metabase BI',
        flagshipRepoLink: 'GitHub Repository →',
        flagshipFlowTitle: 'END-TO-END ARCHITECTURE FLOW',
        fpStep1Lbl: '3NF OLTP (11 tables)',
        fpStep1Desc: '60k+ Mobile Money WAEMU transactions.',
        fpStep2Lbl: 'Airflow Celery',
        fpStep2Desc: 'Scheduled extraction & loading.',
        fpStep3Lbl: 'Quality & Cleaning',
        fpStep3Desc: 'Duplicate filtering, dbt tests & integrity.',
        fpStep4Lbl: 'Star Schema',
        fpStep4Desc: 'Kimball fact & dimension tables.',
        fpStep5Lbl: 'Metabase BI',
        fpStep5Desc: 'Multi-country volume & fee dashboards.',
        // Podiums section
        podiumsKicker: 'VERIFIED IMPACT & BACKGROUND',
        podiumsTitle: 'AWARDS, EXPERTISE & PROFILE',
        podiumsSubtitle: 'Scientific rigor, scalable thinking, and proven results in national competitions and business environments.',
        profileSchool: 'ENP Lomé (ex-EPL) · AI & Big Data',
        profileLangs: 'FR (Native) · EN (Professional)',
        profileBio: 'Trained in Artificial Intelligence & Big Data at the École Nationale Polytechnique de Lomé (Class Representative), I cover the full data lifecycle with senior-level architecture standards: idempotency, DLP/PII governance, and observability.',
        podium1Sub: 'NATIONAL — TOGO · DATATOUR 2026',
        podium1Title: 'PAN-AFRICAN DATA SCIENCE COMPETITION',
        podium1Desc: 'Team Leader · Audit, cleaning, and modeling of 1.7M+ transactions with strict anomaly isolation to guarantee pipeline reliability.',
        podium2Sub: 'TOGO AI LAB DATA CHALLENGE',
        podium2Title: 'RGPH DEMOGRAPHICS & PUBLIC SERVICES',
        podium2Desc: 'Automated ETL pipeline (8 tables verified with mathematical assertions across 39 prefectures, 117 municipalities, 8M+ residents) + Power BI dashboard (16 DAX measures).',
        podium3Sub: 'FINANCIAL COMPLAINTS · NLP LAKEHOUSE',
        podium3Title: 'LAKEHOUSE ARCHITECTURE & CI/CD QUALITY',
        podium3Desc: 'Out-of-core streaming ingestion (DuckDB, Parquet Zstd, Polars), dbt modeling (Star Schema & Medallion), DLP/PII governance, and 35+ GitHub Actions unit tests.',
        podium4Sub: 'AUTOMATIC FAILOVER — POSTGRESQL 16',
        podium4Title: 'HIGH-AVAILABILITY ENGINEERING & LAKEHOUSE',
        podium4Desc: 'Patroni + etcd clusters, pgBackRest PITR backups (RPO < 5 min), out-of-core Parquet Zstd streaming ingestion, and GitHub Actions CI/CD tests.',
        // Contact section
        contactKicker: 'COLLABORATION & FREELANCE',
        formHeaderTitle: '> SEND A DIRECT MESSAGE',
        lblName: 'FULL NAME',
        lblEmail: 'EMAIL',
        lblSubject: 'SUBJECT / PROJECT',
        lblMessage: 'PROJECT DETAILS',
        placeholderName: 'Your name',
        placeholderEmail: 'you@company.com',
        placeholderSubject: 'ELT Pipeline / dbt Warehouse / BI Dashboard / Opportunity',
        placeholderMessage: 'Describe your project, data sources, or requirements...',
        // Mobile data lab cards
        mobileCard1: '[01-03] INPUTS: OLTP, IOT, ZIP & APIS',
        mobileCard1Desc: 'PostgreSQL, SQL Server, 47 IoT sensors, CFPB archives (500k+) and VdPA feeds.',
        mobileCard2: '[04-05] HA STORAGE & ELT ORCHESTRATION',
        mobileCard2Desc: 'PostgreSQL 16 Patroni cluster (failover < 30s), DuckDB, Parquet Zstd, Airflow & Polars.',
        mobileCard3: '[06-07] DBT MODELING, DLP & CI/CD TESTS',
        mobileCard3Desc: 'Medallion Architecture, Kimball Star Schema, PII cleaning, and blocking assertions.',
        mobileCard4: '[08-OUT] MULTIMODAL AI, NLP & DECISION BI',
        mobileCard4Desc: 'Power BI (16 DAX measures), Metabase, Streamlit, pgvector, and Scikit-learn.',
        // Mobile nav links
        mobileNav1: '[01] DATA LAB',
        mobileNav2: '[02] SYSTEMS & PIPELINES',
        mobileNav3: '[03] SIKAPAY ARCHITECTURE',
        mobileNav4: '[04] AWARDS & PROFILE',
        mobileNav5: '[05] CONTACT',
        // Identity card modal
        idCardStack: '[MAIN STACK]',
        idCardDistinctions: '[AWARDS & EXPERIENCE]',
        idCardStackContent: 'PostgreSQL 16 HA (Patroni) · SQL Server · DuckDB · Parquet Zstd · dbt · Apache Airflow · Polars · Python · Power BI (DAX) · Metabase · Docker · Linux',
        idCardDistinctionsContent: '• Data Warehouse & Lakehouse Architectures — SikaPay WAEMU, Supply Chain DW & CFPB NLP<br/>• 2nd Place National (Togo) — Datatour 2026 (1.7M+ transactions)<br/>• 3rd Place National — Togo AI Lab Challenge (RGPH 8M+ residents & Power BI)<br/>• BSc AI & Big Data — École Nationale Polytechnique (ENP Lomé)',
        idCardCvBtn: 'Request Full PDF CV →',
        // Footer
        footerRight: 'PERIWINKLE & ROYAL BLUE CHARTER · ARCHITECTURE LAB',
      }
    };

    let currentLang = 'fr';
    let currentFilter = 'all';
    let selectedMissionId = 'sikapay';

    // ==========================================================================
    // RENDU MASTER-DETAIL DES MISSIONS (PATTERN BORIS KOULEVO)
    // ==========================================================================
    function renderMissionsGrid() {
      const grid = document.getElementById('missions-grid');
      if (!grid) return;

      const filtered = missionsData.filter(m => currentFilter === 'all' || m.category === currentFilter);
      if (!filtered.some(m => m.id === selectedMissionId) && filtered.length > 0) {
        selectedMissionId = filtered[0].id;
      }

      grid.innerHTML = filtered.map(m => {
        const isActive = m.id === selectedMissionId;
        return `
          <button type="button" class="missions__card ${isActive ? 'active' : ''}" data-mission-id="${m.id}" role="tab" aria-selected="${isActive}">
            <div>
              <div class="missions__card-top">
                <span class="missions__card-badge">${m.badge}</span>
                <span class="missions__card-tag ${m.tagClass}">${m.tag[currentLang]}</span>
              </div>
              <div class="missions__card-icon" style="margin: 0.65rem 0;">
                ${SVGIcons[m.icon] || SVGIcons.database}
              </div>
              <h3 class="missions__card-title">${m.title[currentLang]}</h3>
              <p class="missions__card-summary" style="margin-top: 0.35rem;">${m.summary[currentLang]}</p>
            </div>
            <div class="missions__card-cta">
              <span>${i18nDict[currentLang].inspectBtn}</span>
            </div>
          </button>
        `;
      }).join('');

      grid.querySelectorAll('.missions__card').forEach(card => {
        card.addEventListener('click', () => {
          selectedMissionId = card.getAttribute('data-mission-id');
          renderMissionsGrid();
          renderMissionDetail();
          if (window.innerWidth <= 768) {
            openMobileMissionModal(selectedMissionId);
          }
        });
      });
    }

    function buildPipelineStepsHtml(mission) {
      const parts = [];
      mission.pipeline.forEach((step, idx) => {
        parts.push(`
          <div class="pipeline-step ${step.core ? 'pipeline-step--core' : ''}">
            <div class="pipeline-step__top">
              <span class="pipeline-step__num">${step.step}</span>
              <span class="pipeline-step__icon">${SVGIcons[step.icon] || SVGIcons.code}</span>
            </div>
            <div class="pipeline-step__label">${step.label[currentLang]}</div>
            <div class="pipeline-step__desc">${step.desc[currentLang]}</div>
          </div>
        `);
        if (idx < mission.pipeline.length - 1) {
          parts.push('<div class="pipeline-arrow">&rarr;</div>');
        }
      });
      return parts.join('');
    }

    function renderMissionDetail() {
      const detail = document.getElementById('missions-detail');
      if (!detail) return;
      const mission = missionsData.find(m => m.id === selectedMissionId) || missionsData[0];

      const guaranteesHtml = mission.guarantees[currentLang]
        .map(g => `<span class="detail__guarantee-pill">&#10003; ${g}</span>`)
        .join('');

      detail.innerHTML = `
        <div class="lab-board__corner lab-board__corner--tl"></div>
        <div class="lab-board__corner lab-board__corner--tr"></div>
        <div class="lab-board__corner lab-board__corner--bl"></div>
        <div class="lab-board__corner lab-board__corner--br"></div>

        <div class="detail__header">
          <div class="detail__title-group">
            <div class="detail__badges">
              <span class="section-header__badge">${mission.badge}</span>
              <span class="missions__card-tag ${mission.tagClass}">${mission.tag[currentLang]}</span>
            </div>
            <h3 class="detail__title">${mission.title[currentLang]}</h3>
            <span class="detail__metric-bar">${mission.metric[currentLang]}</span>
          </div>
          <div class="detail__links">
            <a href="${mission.codeUrl}" target="_blank" rel="noopener noreferrer" class="detail__link-btn btn-hover-effect">
              ${i18nDict[currentLang].codeLabel}
            </a>
            <a href="${mission.docUrl}" target="_blank" rel="noopener noreferrer" class="detail__link-btn detail__link-btn--secondary btn-hover-effect">
              ${i18nDict[currentLang].docLabel}
            </a>
          </div>
        </div>

        <p class="detail__desc">${mission.desc[currentLang]}</p>

        <div class="detail__guarantees">${guaranteesHtml}</div>

        <h4 class="pipeline-title">${i18nDict[currentLang].pipelineHeader}</h4>
        <div class="pipeline-flow">
          ${buildPipelineStepsHtml(mission)}
        </div>
      `;
    }

    // ==========================================================================
    // MODAL MOBILE & FICHE D'IDENTITÉ DATA ( INSPIRÉE DE CARTE_IDENTITE.HTML )
    // ==========================================================================
    const overlay = document.getElementById('mobile-mission-overlay');
    const dialogContent = document.getElementById('mobile-dialog-content');

    function closeOverlay() {
      if (!overlay) return;
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    }

    function openMobileMissionModal(missionId) {
      const mission = missionsData.find(m => m.id === missionId) || missionsData[0];
      if (!overlay || !dialogContent) return;

      dialogContent.innerHTML = `
        <div class="mobile-dialog__header">
          <div>
            <span class="section-header__badge">${mission.badge}</span>
            <h3 style="font-family: var(--font-heading); font-size: 1.3rem; margin-top: 0.35rem;">${mission.title[currentLang]}</h3>
          </div>
          <button type="button" class="mobile-dialog__close-x" id="modal-close-x">X</button>
        </div>
        <p style="font-family: var(--font-mono); font-size: 0.74rem; background: var(--royal-pale); padding: 0.45rem; border: 1.5px solid var(--text-ink); margin-bottom: 0.85rem;">
          ${mission.metric[currentLang]}
        </p>
        <p style="font-size: 0.9rem; margin-bottom: 1rem;">${mission.desc[currentLang]}</p>
        <div class="pipeline-flow" style="grid-template-columns: 1fr; margin-bottom: 1rem;">
          ${buildPipelineStepsHtml(mission)}
        </div>
        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
          <a href="${mission.codeUrl}" target="_blank" rel="noopener noreferrer" class="detail__link-btn">${i18nDict[currentLang].codeLabel}</a>
          <button type="button" class="detail__link-btn detail__link-btn--secondary" id="modal-close-btn">${i18nDict[currentLang].closeModal}</button>
        </div>
      `;
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');

      document.getElementById('modal-close-x').addEventListener('click', closeOverlay);
      document.getElementById('modal-close-btn').addEventListener('click', closeOverlay);
    }

    function openIdentityCardModal() {
      if (!overlay || !dialogContent) return;
      const t = i18nDict[currentLang];
      dialogContent.innerHTML = `
        <div class="mobile-dialog__header">
          <div>
            <span class="section-header__badge">TM//BILAKE</span>
            <h3 style="font-family: var(--font-heading); font-size: 1.35rem; margin-top: 0.35rem;">Tchaa Mèwè Angelo BILAKE</h3>
            <p style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--royal-dark); font-weight: 700;">${currentLang === 'fr' ? 'Data Engineer &amp; Expert en Analytics · IA &amp; Big Data' : 'Data Engineer &amp; Analytics Specialist · AI &amp; Big Data'}</p>
          </div>
          <button type="button" class="mobile-dialog__close-x" id="id-close-x">X</button>
        </div>
        <div style="display: grid; gap: 0.65rem; font-size: 0.86rem; margin-bottom: 1.1rem;">
          <div style="background: var(--bg-subtle); border: 1.5px solid var(--text-ink); padding: 0.65rem;">
            <strong style="color: var(--royal-dark); font-family: var(--font-mono);">${t.idCardStack}</strong><br />
            ${t.idCardStackContent}
          </div>
          <div style="background: var(--royal-pale); border: 1.5px solid var(--text-ink); padding: 0.65rem;">
            <strong style="color: var(--royal-dark); font-family: var(--font-mono);">${t.idCardDistinctions}</strong><br />
            ${t.idCardDistinctionsContent}
          </div>
          <div style="background: var(--surface); border: 1.5px solid var(--text-ink); padding: 0.65rem; font-family: var(--font-mono); font-size: 0.76rem;">
            Email : angelobtma@gmail.com · ${currentLang === 'fr' ? 'Tél/WhatsApp' : 'Phone/WhatsApp'} : +228 93 10 66 65<br />
            GitHub : github.com/AngeloEngineer
          </div>
        </div>
        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
          <a href="mailto:angelobtma@gmail.com?subject=${encodeURIComponent(currentLang === 'fr' ? 'Demande de CV - Angelo BILAKE' : 'CV Request - Angelo BILAKE')}" class="detail__link-btn">${t.idCardCvBtn}</a>
          <button type="button" class="detail__link-btn detail__link-btn--secondary" id="id-close-btn">${t.closeModal}</button>
        </div>
      `;
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');

      document.getElementById('id-close-x').addEventListener('click', closeOverlay);
      document.getElementById('id-close-btn').addEventListener('click', closeOverlay);
    }

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeOverlay();
      });
    }

    // ==========================================================================
    // INTERACTIONS DATA LAB (SURBRILLANCE BIDIRECTIONNELLE LÉGENDE <-> NOEUDS)
    // ==========================================================================
    function setupDataLabInteractions() {
      const legendItems = document.querySelectorAll('.agentic-legend__item');
      const calloutBadge = document.getElementById('lab-callout-badge');
      const calloutText = document.getElementById('lab-callout-text');

      function activateModule(item) {
        legendItems.forEach(el => el.classList.remove('active'));
        document.querySelectorAll('#data-lab .agent-node').forEach(el => el.classList.remove('highlighted'));

        item.classList.add('active');
        const targetId = item.getAttribute('data-target');
        const targetNode = document.getElementById(targetId);
        if (targetNode) targetNode.classList.add('highlighted');

        const badge = item.querySelector('.agentic-legend__badge');
        if (calloutBadge && badge) calloutBadge.textContent = 'MODULE ' + badge.textContent;
        if (calloutText) calloutText.textContent = item.getAttribute('data-detail') || '';
      }

      legendItems.forEach(item => {
        item.addEventListener('mouseenter', () => activateModule(item));
        item.addEventListener('click', () => activateModule(item));

        const targetId = item.getAttribute('data-target');
        const targetNode = document.getElementById(targetId);
        if (targetNode) {
          targetNode.addEventListener('mouseenter', () => activateModule(item));
          targetNode.addEventListener('click', () => activateModule(item));
        }
      });
    }

    // ==========================================================================
    // CHANGEMENT DE LANGUE FR / EN
    // ==========================================================================
    function applyLanguage(lang) {
      currentLang = lang === 'en' ? 'en' : 'fr';
      const t = i18nDict[currentLang];
      document.documentElement.lang = currentLang;

      document.querySelectorAll('[data-lang-option]').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang-option') === currentLang);
      });

      // ---- Textes simples par ID ----
      const mapText = {
        'nav-subtitle-text': t.navSubtitle,
        'hero-status-text': t.heroStatus,
        'hero-role-text': t.heroRole,
        'hero-desc-text': t.heroDesc,
        'metric-lbl-1': t.metric1,
        'metric-lbl-2': t.metric2,
        'metric-lbl-3': t.metric3,
        'cta-primary-text': t.ctaPrimary,
        'cta-secondary-text': t.ctaSecondary,
        'cta-card-text': t.ctaCard,
        // Data Lab
        'lab-kicker': t.labKicker,
        'lab-title': t.labTitle,
        'lab-subtitle': t.labSubtitle,
        'lab-desc': t.labDesc,
        'legend-header': t.legendHeader,
        // Missions
        'missions-kicker': t.missionsKicker,
        'missions-title': t.missionsTitle,
        'missions-subtitle': t.missionsSubtitle,
        'filter-all': t.filterAll,
        'filter-analytics': t.filterAnalytics,
        'filter-data': t.filterData,
        'filter-ai': t.filterAi,
        // Flagship
        'flagship-kicker': t.flagshipKicker,
        'flagship-subtitle': t.flagshipSubtitle,
        'flagship-desc': t.flagshipDesc,
        'flagship-proof-1': t.flagshipProof1,
        'flagship-proof-2': t.flagshipProof2,
        'flagship-proof-3': t.flagshipProof3,
        'flagship-flow-title': t.flagshipFlowTitle,
        'fp-step1-lbl': t.fpStep1Lbl,
        'fp-step1-desc': t.fpStep1Desc,
        'fp-step2-lbl': t.fpStep2Lbl,
        'fp-step2-desc': t.fpStep2Desc,
        'fp-step3-lbl': t.fpStep3Lbl,
        'fp-step3-desc': t.fpStep3Desc,
        'fp-step4-lbl': t.fpStep4Lbl,
        'fp-step4-desc': t.fpStep4Desc,
        'fp-step5-lbl': t.fpStep5Lbl,
        'fp-step5-desc': t.fpStep5Desc,
        // Hero board nodes
        'hero-node-in-lbl': t.heroNodeInLbl,
        'hero-node-gov-lbl': t.heroNodeGovLbl,
        'hero-node-obs-lbl': t.heroNodeObsLbl,
        'hero-node-out1-lbl': t.heroNodeOut1Lbl,
        'hero-node-out2-lbl': t.heroNodeOut2Lbl,
        'hero-node-out3-lbl': t.heroNodeOut3Lbl,
        // Podiums
        'podiums-kicker': t.podiumsKicker,
        'podiums-title': t.podiumsTitle,
        'podiums-subtitle': t.podiumsSubtitle,
        'profile-school': t.profileSchool,
        'profile-langs': t.profileLangs,
        'profile-bio': t.profileBio,
        'podium1-sub': t.podium1Sub,
        'podium1-title': t.podium1Title,
        'podium1-desc': t.podium1Desc,
        'podium2-sub': t.podium2Sub,
        'podium2-title': t.podium2Title,
        'podium2-desc': t.podium2Desc,
        'podium3-sub': t.podium3Sub,
        'podium3-title': t.podium3Title,
        'podium3-desc': t.podium3Desc,
        'podium4-sub': t.podium4Sub,
        'podium4-title': t.podium4Title,
        'podium4-desc': t.podium4Desc,
        // Contact
        'contact-kicker': t.contactKicker,
        'form-header-title': t.formHeaderTitle,
        'lbl-name': t.lblName,
        'lbl-email': t.lblEmail,
        'lbl-subject': t.lblSubject,
        'lbl-message': t.lblMessage,
        'btn-submit-text': t.submitBtn,
      };

      Object.keys(mapText).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = mapText[id];
      });

      // ---- Éléments avec innerHTML (HTML entities) ----
      const contactTitle = document.getElementById('contact-title');
      if (contactTitle) contactTitle.innerHTML = t.contactTitle;
      const contactDesc = document.getElementById('contact-desc');
      if (contactDesc) contactDesc.textContent = t.contactDesc;

      // ---- Flagship repo link ----
      const flagshipRepoLink = document.getElementById('flagship-repo-link');
      if (flagshipRepoLink) flagshipRepoLink.textContent = t.flagshipRepoLink;

      // ---- Placeholders formulaire ----
      const fieldPlaceholders = {
        'name': t.placeholderName,
        'email': t.placeholderEmail,
        'subject': t.placeholderSubject,
        'message': t.placeholderMessage,
      };
      Object.keys(fieldPlaceholders).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.placeholder = fieldPlaceholders[id];
      });

      // ---- Liens du tiroir mobile ----
      const mobileLinks = document.querySelectorAll('.mobile-nav-drawer__link');
      const mobileNavKeys = ['mobileNav1', 'mobileNav2', 'mobileNav3', 'mobileNav4', 'mobileNav5'];
      mobileLinks.forEach((link, i) => {
        if (mobileNavKeys[i]) link.textContent = t[mobileNavKeys[i]];
      });

      // ---- Cartes mobiles Data Lab ----
      const mobileCards = document.querySelectorAll('.agentic-lab__mobile-flow .agent-mobile-card');
      const mobileCardKeys = [
        { strong: 'mobileCard1', p: 'mobileCard1Desc' },
        { strong: 'mobileCard2', p: 'mobileCard2Desc' },
        { strong: 'mobileCard3', p: 'mobileCard3Desc' },
        { strong: 'mobileCard4', p: 'mobileCard4Desc' },
      ];
      mobileCards.forEach((card, i) => {
        if (mobileCardKeys[i]) {
          const strong = card.querySelector('strong');
          const p = card.querySelector('p');
          if (strong) strong.textContent = t[mobileCardKeys[i].strong];
          if (p) p.textContent = t[mobileCardKeys[i].p];
        }
      });

      // ---- data-i18n générique ----
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
      });

      renderMissionsGrid();
      renderMissionDetail();
    }

    // ==========================================================================
    // INITIALISATION GLOBALE
    // ==========================================================================
    document.addEventListener('DOMContentLoaded', () => {
      renderMissionsGrid();
      renderMissionDetail();
      setupDataLabInteractions();

      // Filtres projets
      document.querySelectorAll('.missions__filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.missions__filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentFilter = btn.getAttribute('data-filter') || 'all';
          renderMissionsGrid();
          renderMissionDetail();
        });
      });

      // Switch langue
      document.querySelectorAll('[data-lang-option]').forEach(btn => {
        btn.addEventListener('click', () => {
          applyLanguage(btn.getAttribute('data-lang-option'));
        });
      });

      // Menu mobile
      const menuBtn = document.getElementById('mobile-menu-toggle');
      const mobileDrawer = document.getElementById('mobile-nav-drawer');
      if (menuBtn && mobileDrawer) {
        menuBtn.addEventListener('click', () => {
          mobileDrawer.classList.toggle('open');
        });
        mobileDrawer.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => mobileDrawer.classList.remove('open'));
        });
      }

      // Boutons Fiche d'identité & CV
      ['btn-open-id-card', 'btn-open-id-card-mobile', 'btn-hero-id-card'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', openIdentityCardModal);
      });

      // Barre de progression de scroll
      const progressBar = document.getElementById('scroll-progress');
      window.addEventListener('scroll', () => {
        if (!progressBar) return;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
        progressBar.style.width = Math.min(100, Math.max(0, pct)) + '%';
      }, { passive: true });

      // Formulaire Formspree avec retour visuel sans rechargement brutal
      const form = document.getElementById('contact-form');
      const statusMsg = document.getElementById('form-status-msg');
      if (form && statusMsg) {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          statusMsg.textContent = i18nDict[currentLang].sentConfirm;
          statusMsg.classList.add('visible');
          try {
            const data = new FormData(form);
            await fetch(form.action, {
              method: 'POST',
              body: data,
              headers: { 'Accept': 'application/json' }
            });
            form.reset();
          } catch (err) {
            // En aperçu isolé, le message de confirmation reste visible
          }
        });
      }
    });
