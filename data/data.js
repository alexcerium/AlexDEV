// Site Data Configuration
window.SITE = {
    // Hero Section
    hero: {
        title: "Александр Маткава — iOS разработчик",
        subtitle: "Создаю продуманные и современные мобильные приложения",
        portrait: "assets/Portrait.jpeg",
        flagship: {
            show: true,
            text: "Флагман-кейс: CoffeeDaily"
        }
    },

    // About Section
    about: {
        description: "Меня зовут Александр Маткава. Я создаю iOS-приложения и сайты, уделяя внимание каждой детали. Мне близка идея, что просто — значит гениально, ведь сделать сложное легко, а простое требует настоящего мастерства. Мой путь начался с высшего образования в сфере фармации, где я научился точности, системному мышлению и работе с ответственными задачами. Сегодня эти качества помогают мне разрабатывать цифровые решения, которые работают безупречно и выглядят гармонично."
    },

    // Skills Section
    skills: [
        "Swift",
        "SwiftUI", 
        "MVVM",
        "Combine",
        "REST API",
        "UI/UX Design",
        "Анимации",
        "Git/GitHub"
    ],

    // Education Section
    education: [
        {
            id: "programming",
            title: "Диплом по программированию",
            organization: "Институт программирования",
            year: "2022",
            icon: "fas fa-code",
            images: ["assets/IT-1.jpg", "assets/IT-2.jpg"]
        },
        {
            id: "pharmacy", 
            title: "Фармацевт (Высшее образование)",
            organization: "Фармацевтический университет",
            year: "2020",
            icon: "fas fa-graduation-cap",
            images: ["assets/Pharm-1.jpg", "assets/Pharm-2.jpg"]
        }
    ],

    // Projects Section
    projects: [
        {
            id: "coffeedaily",
            name: "CoffeeDaily",
            category: ["ios-apps"],
            preview: "assets/coffeedaily-preview.png",
            screenshots: ["assets/coffeedaily-1.png", "assets/coffeedaily-2.png", "assets/coffeedaily-3.png"],
            problem: "Ежедневный учёт кофе и расходов обычно перегружен и отталкивает от регулярного ведения.",
            hypothesis: "Минималистичный интерфейс с быстрым добавлением и наглядной историей повысит регулярность логирования.",
            solutions: "Крупные CTA «Заказать/Оплатить», жесты + плавные переходы, анимации появления карточек, аккуратные micro-interactions.",
            tech: ["Swift 6", "SwiftUI", "MVVM + Services", "Combine", "SwiftData/CoreData", "кастомные компоненты", "доступность", "theming"],
            result: "Прототип показывает быстрый сценарий добавления, удобную историю и готов к интеграции платёжного модуля. Упор на чистый дизайн и плавные анимации.",
            isFlagship: true
        },
        {
            id: "boopa",
            name: "Boopa",
            category: ["ios-apps"],
            preview: "assets/boopa-preview.png",
            screenshots: ["assets/boopa-1.png", "assets/boopa-2.png", "assets/boopa-3.png"],
            problem: "Тестирование идей визуальной соцсети без сложной серверной части.",
            hypothesis: "Прототип с плавной лентой, сторис и клипами поможет быстро проверить поведенческие паттерны.",
            solutions: "Кастомные переходы, лёгкие эффекты стеклянности, плавные скролл-анимации.",
            tech: ["Swift", "SwiftUI", "AVKit", "Combine", "модульная архитектура"],
            result: "Демо для питчинга и пользовательских интервью."
        },
        {
            id: "moviemate",
            name: "MovieMate",
            category: ["ios-apps"],
            preview: "assets/moviemate-preview.png",
            screenshots: ["assets/moviemate-1.png", "assets/moviemate-2.png", "assets/moviemate-3.png"],
            problem: "«Усталость выбора» в кино-приложениях.",
            hypothesis: "Фильтры по настроению и тегам вкусов снижают трение.",
            solutions: "Чистые карточки, анимации фильтров, избранное/очередь.",
            tech: ["SwiftUI", "TMDB API", "кэширование"],
            result: "Удобная выдача и быстрые подборки."
        },
        {
            id: "testgenius",
            name: "TestGenius",
            category: ["ios-apps"],
            preview: "assets/testgenius-preview.png",
            screenshots: ["assets/testgenius-1.png", "assets/testgenius-2.png", "assets/testgenius-3.png"],
            problem: "Сухие тесты без прогресс-фидбэка.",
            hypothesis: "Адаптивные уровни и понятная статистика удерживают дольше.",
            solutions: "Плавные state-анимации, карточки вопросов, прогресс-бар.",
            tech: ["SwiftUI", "локальное хранение", "модульные экраны"],
            result: "Готовый прототип учебного приложения."
        },
        {
            id: "smm-promo",
            name: "SMM Promo Site",
            category: ["websites"],
            preview: "assets/smm-promo-preview.png",
            screenshots: ["assets/smm-promo-1.png", "assets/smm-promo-2.png", "assets/smm-promo-3.png"],
            problem: "Нужен аккуратный лендинг для продаж услуг SMM.",
            hypothesis: "Минимализм + сильные акценты цвета + чёткие CTA повышают конверсию в заявки.",
            solutions: "Геро-секция с оффером «-50% первый месяц», блок кейсов, отзывы, FAQ, контактные CTA (Telegram/Email).",
            tech: ["HTML", "CSS", "JS (без фреймворков)", "плавные анимации"],
            result: "Быстрый сайт для портфолио/резюме с конверсионной структурой."
        }
    ],

    // Services Section
    services: {
        title: "Услуги и форматы работы",
        subtitle: "Ориентировочные цены и сроки (обсуждаются на старте)",
        packages: [
            {
                name: "MVP-прототип",
                duration: "1–2 недели",
                price: "от $800–1500",
                description: "Быстрый интерактивный прототип для проверки гипотез."
            },
            {
                name: "Разработка iOS под ключ",
                duration: "4–8 недель",
                price: "от $3000–8000",
                description: "Полный цикл от дизайна до публикации."
            },
            {
                name: "Редизайн / аудит",
                duration: "3–10 дней",
                price: "от $400–1200",
                description: "Улучшение UX/UI, производительности, доступности."
            },
            {
                name: "Поддержка",
                duration: "от $300/мес или почасово",
                price: "договорная",
                description: "Выпуск обновлений, мелкие доработки."
            }
        ]
    },

    // Process Section
    process: {
        title: "Процесс работы",
        steps: [
            {
                number: "01",
                title: "Бриф",
                description: "Обсуждение требований и целей проекта"
            },
            {
                number: "02",
                title: "Оценка/смета",
                description: "Детальная оценка сроков и стоимости"
            },
            {
                number: "03",
                title: "Прототип/дизайн",
                description: "Создание макетов и прототипов"
            },
            {
                number: "04",
                title: "Разработка",
                description: "Программирование и интеграция"
            },
            {
                number: "05",
                title: "Тестирование",
                description: "Проверка функциональности и качества"
            },
            {
                number: "06",
                title: "Релиз/сопровождение",
                description: "Публикация и дальнейшая поддержка"
            }
        ],
        sla: {
            title: "SLA по коммуникациям",
            items: [
                "Ответ в течение рабочего дня (Пн-Пт, 10:00–19:00, America/New_York)",
                "Созвоны по договорённости 1–2 раза в неделю",
                "Основные каналы: Telegram (@alexcerium), email (alexmatkava@gmail.com)"
            ]
        }
    },

    // FAQ Section
    faq: {
        title: "Часто задаваемые вопросы",
        items: [
            {
                question: "Как происходит оплата?",
                answer: "Предоплата 30–50%, далее по этапам/майлстонам."
            },
            {
                question: "Какие сроки разработки?",
                answer: "Зависят от объёма; фиксируются в ТЗ и календарном плане."
            },
            {
                question: "Предоставляется ли поддержка?",
                answer: "По пакету или почасово; договорная."
            },
            {
                question: "Кто владеет правами на проект?",
                answer: "IP передаются по договору после финального расчёта; код в приватном репозитории."
            },
            {
                question: "Как с налогами и инвойсами?",
                answer: "Работаю как индивидуальный разработчик; детали по запросу."
            }
        ]
    },

    // Contact Section
    contact: {
        description: "Открыт к новым проектам и сотрудничеству. Выберите удобный способ связи:",
        methods: [
            {
                type: "telegram",
                url: "https://t.me/alexcerium",
                icon: "fab fa-telegram",
                title: "Telegram",
                description: "Быстрое общение и обмен файлами"
            },
            {
                type: "email",
                url: "mailto:alexmatkava@gmail.com",
                icon: "fas fa-envelope", 
                title: "Email",
                description: "Подробное обсуждение проекта"
            }
        ]
    },

    // Navigation
    navigation: [
        { id: "home", text: "Главная" },
        { id: "projects", text: "Проекты" },
        { id: "services", text: "Услуги" },
        { id: "process", text: "Процесс" },
        { id: "faq", text: "FAQ" },
        { id: "contact", text: "Контакты" }
    ],

    // Project Filters
    filters: [
        { id: "all", text: "Все" },
        { id: "ios-apps", text: "iOS-приложения" },
        { id: "websites", text: "Сайты" }
    ],

    // Legal Pages
    legal: {
        privacy: {
            title: "Политика конфиденциальности",
            content: "При обращении через контактные формы мы собираем только email и имя для ответа. Данные не передаются третьим лицам и используются исключительно для связи. Для удаления данных обратитесь по email."
        },
        terms: {
            title: "Условия использования",
            content: "Сайт предоставляется «как есть». Мы не гарантируем постоянную доступность. Контент демонстрационный. Права на проекты принадлежат их владельцам."
        }
    },

    // Footer
    footer: {
        author: "Сайт разработан Александром Маткавой",
        links: [
            { text: "Privacy Policy", href: "#privacy" },
            { text: "Terms of Use", href: "#terms" }
        ]
    },

    // Site Meta
    meta: {
        title: "Александр — iOS разработчик",
        description: "Александр - iOS разработчик, специализирующийся на Swift, SwiftUI и современных мобильных приложениях. Эксперт по чистой архитектуре, кастомному UI и оптимизации UX.",
        keywords: "iOS разработчик, Swift, SwiftUI, мобильная разработка, Александр",
        author: "Александр"
    }
};
