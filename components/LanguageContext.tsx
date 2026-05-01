'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Locale = 'en' | 'ru' | 'ua'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    'nav.howItWorks': 'How it works',
    'nav.docs': 'Docs',
    'nav.pricing': 'Pricing',
    'nav.login': 'Log in',
    'nav.signup': 'Get started',
    'nav.joinWaitlist': 'Join to whitelist',

    // Hero
    'hero.badge': 'Built for Upwork freelancers',
    'hero.title.part1': 'Write proposals',
    'hero.title.part2': 'that actually',
    'hero.title.part3': 'get replies.',
    'hero.desc.part1': 'Paste any job description. Get a personalized proposal in seconds — not a template.',
    'hero.desc.part2': ' A message that converts.',
    'hero.stats.proposals': 'proposals generated',
    'hero.stats.replyRate': 'avg. reply rate',
    'hero.stats.pricing': 'Plans & pricing',
    'hero.stats.comingSoon': 'Coming soon',

    // Hero Journey
    'journey.badge': "The Freelancer's Evolution",
    'journey.scroll': 'Scroll to Evolve',
    'journey.step1.title': 'The Chaos',
    'journey.step1.desc': 'Manual bidding is a race to the bottom. Low conversion rates and wasted hours lead to burnout.',
    'journey.step2.title': 'The Insight',
    'journey.step2.desc': 'RelateEdge identifies high-value opportunities by analyzing client history and project fit.',
    'journey.step3.title': 'The Quality',
    'journey.step3.desc': 'Our AI generates proposals that outscore 95% of competitors on personalization and relevance.',
    'journey.step4.title': 'The Growth',
    'journey.step4.desc': 'Watch your income and reply rate soar as you focus on high-paying jobs that match your skills.',
    'journey.metric.label': 'Current Metric',
    'journey.metric.step1': 'Burnout Risk: High',
    'journey.metric.step2': 'Fit Accuracy: 92%',
    'journey.metric.step3': 'Quality: Elite',
    'journey.metric.step4': 'ROI: +320%',
    'journey.analytics.label': 'Live Analytics Engine',

    // Hero Section Extra
    'hero.trustedBy': 'Trusted by freelancers on',

    // Features Section
    'features.badge': 'Features',
    'features.title': 'Everything you need to win on Upwork',
    'features.desc': 'From raw job post to winning proposal — RelateEdge handles the whole flow.',

    // Stacking Cards
    'cards.card1.title': 'Analyze any job instantly',
    'cards.card1.desc': 'Understand client quality, win chance, budget signals, and red flags — before you spend a second writing.',
    'cards.card1.tag1': 'Client score',
    'cards.card1.tag2': 'Win chance',
    'cards.card1.tag3': 'Red flags',
    'cards.card1.statLabel': 'Avg analysis time',
    'cards.card2.title': 'Generate proposals that convert',
    'cards.card2.desc': "AI crafts a personalized, structured proposal with a hook that speaks directly to the client's pain — not a template.",
    'cards.card2.tag1': 'Hook',
    'cards.card2.tag2': 'Proof',
    'cards.card2.tag3': 'CTA',
    'cards.card2.statLabel': 'Avg hook score',
    'cards.card3.title': 'Track what wins',
    'cards.card3.desc': 'Log every proposal, see your reply rate, and get insights on what hooks and formats actually get responses.',
    'cards.card3.tag1': 'Reply rate',
    'cards.card3.tag2': 'A/B insights',
    'cards.card3.tag3': 'History',
    'cards.card3.statLabel': 'Reply rate boost',
    'cards.card4.title': 'Score before you send',
    'cards.card4.desc': 'Get a real-time quality score with actionable tips to improve your proposal before hitting send.',
    'cards.card4.tag1': 'Real-time score',
    'cards.card4.tag2': 'Tips',
    'cards.card4.tag3': 'Optimization',
    'cards.card4.statLabel': 'Top proposals',
    'cards.card5.title': 'Avoid bad clients',
    'cards.card5.desc': 'Red flag detection warns you about problematic jobs — unclear scope, low budgets, or clients with poor histories.',
    'cards.card5.tag1': 'Red flags',
    'cards.card5.tag2': 'Risk score',
    'cards.card5.tag3': 'Trust signals',
    'cards.card5.statLabel': 'Flags detected',
    'cards.card6.title': 'Win more, write less',
    'cards.card6.desc': 'Spend 30 seconds instead of 30 minutes. Generate, score, copy, and send — all in one flow.',
    'cards.card6.tag1': 'Automation',
    'cards.card6.tag2': 'Speed',
    'cards.card6.tag3': 'Efficiency',
    'cards.card6.statLabel': 'Time saved',

    // Process Steps
    'steps.step1.title': 'Sync Job',
    'steps.step1.desc': 'Copy and paste the job description or sync directly. We extract the core requirements automatically.',
    'steps.step2.title': 'AI Draft',
    'steps.step2.desc': 'Our engine crafts a personalized proposal based on your profile and the client\'s specific needs.',
    'steps.step3.title': 'Score & Send',
    'steps.step3.desc': 'Check the quality score, make final tweaks, and send with confidence.',

    // CTA Section
    'cta.title.part1': 'Invest in your',
    'cta.title.part2': 'career growth.',
    'cta.desc': 'Join 6,000+ freelancers who have doubled their conversion rates.',
    'cta.feature1': 'Unlimited AI-Generated Proposals',
    'cta.feature2': 'Advanced Proposal Analytics',
    'cta.feature3': '24/7 Priority AI Coaching',

    // Pricing Card
    'pricing.popular': 'Most Popular',
    'pricing.planName': 'Professional Plan',
    'pricing.announced': 'Pricing will be announced with public launch.',
    'pricing.desc': 'Everything you need to turn proposal writing into your greatest advantage.',
    'pricing.noCard': 'No credit card required.',

    // Footer
    'footer.desc': 'The premium proposal engine for modern freelancers. Generate high-converting copy, score your results, and track performance.',
    'footer.col1': 'Product',
    'footer.col1.link1': 'How it works',
    'footer.col1.link2': 'Pricing',
    'footer.col1.link3': 'Live Demo',
    'footer.col2': 'For Devs',
    'footer.col2.link1': 'API Docs',
    'footer.col2.link2': 'GitHub Repository',
    'footer.col2.link3': 'Integrations',
    'footer.col3': 'Legal',
    'footer.col3.link1': 'Privacy Policy',
    'footer.col3.link2': 'Terms of Service',
    'footer.col3.link3': 'Cookie Guidelines',
    'footer.rights': 'All rights reserved.',

    // Signup Page
    'signup.title': 'Create your account',
    'signup.desc': 'Join the elite freelancers using RelateEdge to dominate Upwork.',
    'signup.name': 'Full Name',
    'signup.company': 'Company Name',
    'signup.website': 'Website (optional)',
    'signup.email': 'Email Address',
    'signup.password': 'Password',
    'signup.button': 'Create Account',
    'signup.already': 'Already have an account?',
    'signup.login': 'Log in',
    'signup.error.email': 'Please enter a valid email',
    'signup.error.password': 'Password must be at least 8 characters',
    'signup.error.name': 'Name is required',
    'signup.error.company': 'Company name is required',
  },
  ru: {
    // Header
    'nav.howItWorks': 'Как это работает',
    'nav.docs': 'Доки',
    'nav.pricing': 'Цены',
    'nav.login': 'Войти',
    'nav.signup': 'Регистрация',
    'nav.joinWaitlist': 'В лист ожидания',

    // Hero
    'hero.badge': 'Создано для фрилансеров Upwork',
    'hero.title.part1': 'Пишите отклики,',
    'hero.title.part2': 'которые реально',
    'hero.title.part3': 'получают ответы.',
    'hero.desc.part1': 'Вставьте описание вакансии. Получите персонализированный отклик за секунды — никакой шаблонности.',
    'hero.desc.part2': ' Сообщение, которое конвертирует.',
    'hero.stats.proposals': 'откликов создано',
    'hero.stats.replyRate': 'средний reply rate',
    'hero.stats.pricing': 'Планы и цены',
    'hero.stats.comingSoon': 'Скоро',

    // Hero Journey
    'journey.badge': 'Эволюция фрилансера',
    'journey.scroll': 'Листай для эволюции',
    'journey.step1.title': 'Хаос',
    'journey.step1.desc': 'Ручные ставки — это путь в никуда. Низкая конверсия и потраченные часы ведут к выгоранию.',
    'journey.step2.title': 'Инсайт',
    'journey.step2.desc': 'RelateEdge находит ценные возможности, анализируя историю клиента и соответствие проекту.',
    'journey.step3.title': 'Качество',
    'journey.step3.desc': 'Наш AI создает отклики, которые превосходят 95% конкурентов по глубине и релевантности.',
    'journey.step4.title': 'Рост',
    'journey.step4.desc': 'Наблюдайте за ростом дохода и ответов, фокусируясь на высокооплачиваемых заказах.',
    'journey.metric.label': 'Текущая метрика',
    'journey.metric.step1': 'Риск выгорания: Высокий',
    'journey.metric.step2': 'Точность подбора: 92%',
    'journey.metric.step3': 'Качество: Элитное',
    'journey.metric.step4': 'ROI: +320%',
    'journey.analytics.label': 'Аналитический движок',

    // Hero Section Extra
    'hero.trustedBy': 'Нам доверяют фрилансеры из',

    // Features Section
    'features.badge': 'Функции',
    'features.title': 'Все, что нужно для победы на Upwork',
    'features.desc': 'От сырого описания вакансии до победного отклика — RelateEdge берет на себя весь процесс.',

    // Stacking Cards
    'cards.card1.title': 'Мгновенный анализ вакансии',
    'cards.card1.desc': 'Поймите качество клиента, шансы на победу и красные флаги — прежде чем тратить время на написание.',
    'cards.card1.tag1': 'Счет клиента',
    'cards.card1.tag2': 'Шанс на успех',
    'cards.card1.tag3': 'Красные флаги',
    'cards.card1.statLabel': 'Ср. время анализа',
    'cards.card2.title': 'Создавайте отклики, которые конвертируют',
    'cards.card2.desc': 'AI создает персонализированный отклик с "крючком", который бьет точно в боли клиента.',
    'cards.card2.tag1': 'Крючок',
    'cards.card2.tag2': 'Пруфы',
    'cards.card2.tag3': 'Призыв',
    'cards.card2.statLabel': 'Ср. оценка крючка',
    'cards.card3.title': 'Отслеживайте победы',
    'cards.card3.desc': 'Логируйте каждый отклик, следите за reply rate и получайте инсайты о том, что реально работает.',
    'cards.card3.tag1': 'Reply rate',
    'cards.card3.tag2': 'A/B инсайты',
    'cards.card3.tag3': 'История',
    'cards.card3.statLabel': 'Рост ответов',
    'cards.card4.title': 'Оценка перед отправкой',
    'cards.card4.desc': 'Получайте оценку качества в реальном времени с советами по улучшению вашего отклика.',
    'cards.card4.tag1': 'Live оценка',
    'cards.card4.tag2': 'Советы',
    'cards.card4.tag3': 'Оптимизация',
    'cards.card4.statLabel': 'Топ откликов',
    'cards.card5.title': 'Избегайте плохих клиентов',
    'cards.card5.desc': 'Детектор красных флагов предупредит о проблемных вакансиях — низкий бюджет или плохая история.',
    'cards.card5.tag1': 'Красные флаги',
    'cards.card5.tag2': 'Риск-скор',
    'cards.card5.tag3': 'Доверие',
    'cards.card5.statLabel': 'Флагов найдено',
    'cards.card6.title': 'Побеждайте больше, пишите меньше',
    'cards.card6.desc': 'Тратьте 30 секунд вместо 30 минут. Создавайте, оценивайте и отправляйте в один клик.',
    'cards.card6.tag1': 'Автоматизация',
    'cards.card6.tag2': 'Скорость',
    'cards.card6.tag3': 'Эффективность',
    'cards.card6.statLabel': 'Времени сэкономлено',

    // Process Steps
    'steps.step1.title': 'Синхронизация',
    'steps.step1.desc': 'Скопируйте описание вакансии или синхронизируйте напрямую. Мы выделим главное автоматически.',
    'steps.step2.title': 'AI Черновик',
    'steps.step2.desc': 'Наш движок создаст персонализированный отклик на основе вашего профиля и нужд клиента.',
    'steps.step3.title': 'Оценка и отправка',
    'steps.step3.desc': 'Проверьте оценку качества, внесите финальные правки и отправляйте с уверенностью.',

    // CTA Section
    'cta.title.part1': 'Инвестируйте в свой',
    'cta.title.part2': 'карьерный рост.',
    'cta.desc': 'Присоединяйтесь к 6,000+ фрилансеров, которые удвоили свою конверсию.',
    'cta.feature1': 'Безлимитные AI-отклики',
    'cta.feature2': 'Продвинутая аналитика',
    'cta.feature3': '24/7 AI-коучинг',

    // Pricing Card
    'pricing.popular': 'Популярный',
    'pricing.planName': 'Профессиональный план',
    'pricing.announced': 'Цены будут объявлены при запуске.',
    'pricing.desc': 'Все, что нужно, чтобы превратить написание откликов в ваше главное преимущество.',
    'pricing.noCard': 'Карта не требуется.',

    // Footer
    'footer.desc': 'Премиальный движок откликов для современных фрилансеров. Создавайте контент, который конвертирует.',
    'footer.col1': 'Продукт',
    'footer.col1.link1': 'Как это работает',
    'footer.col1.link2': 'Цены',
    'footer.col1.link3': 'Демо',
    'footer.col2': 'Для разрабов',
    'footer.col2.link1': 'API Доки',
    'footer.col2.link2': 'GitHub Репозиторий',
    'footer.col2.link3': 'Интеграции',
    'footer.col3': 'Юридическое',
    'footer.col3.link1': 'Приватность',
    'footer.col3.link2': 'Условия',
    'footer.col3.link3': 'Cookie',
    'footer.rights': 'Все права защищены.',

    // Signup Page
    'signup.title': 'Создайте аккаунт',
    'signup.desc': 'Присоединяйтесь к элитным фрилансерам, использующим RelateEdge для доминирования на Upwork.',
    'signup.name': 'Полное имя',
    'signup.company': 'Название компании',
    'signup.website': 'Ссылка на сайт (опционально)',
    'signup.email': 'Email адрес',
    'signup.password': 'Пароль',
    'signup.button': 'Создать аккаунт',
    'signup.already': 'Уже есть аккаунт?',
    'signup.login': 'Войти',
    'signup.error.email': 'Введите корректный email',
    'signup.error.password': 'Пароль должен быть не менее 8 символов',
    'signup.error.name': 'Имя обязательно',
    'signup.error.company': 'Название компании обязательно',
  },
  ua: {
    // Header
    'nav.howItWorks': 'Як це працює',
    'nav.docs': 'Доки',
    'nav.pricing': 'Ціни',
    'nav.login': 'Увійти',
    'nav.signup': 'Реєстрація',
    'nav.joinWaitlist': 'У лист очікування',

    // Hero
    'hero.badge': 'Створено для фрілансерів Upwork',
    'hero.title.part1': 'Пишіть відгуки,',
    'hero.title.part2': 'які реально',
    'hero.title.part3': 'отримують відповіді.',
    'hero.desc.part1': 'Вставте опис вакансії. Отримайте персоналізований відгук за секунди — жодної шаблонності.',
    'hero.desc.part2': ' Повідомлення, яке конвертує.',
    'hero.stats.proposals': 'відгуків створено',
    'hero.stats.replyRate': 'середній reply rate',
    'hero.stats.pricing': 'Плани та ціни',
    'hero.stats.comingSoon': 'Скоро',

    // Hero Journey
    'journey.badge': 'Еволюція фрілансера',
    'journey.scroll': 'Гортай для еволюції',
    'journey.step1.title': 'Хаос',
    'journey.step1.desc': 'Ручні ставки — це шлях в нікуди. Низька конверсія та витрачені години ведуть до вигорання.',
    'journey.step2.title': 'Інсайт',
    'journey.step2.desc': 'RelateEdge знаходить цінні можливості, аналізуючи історію клієнта та відповідність проекту.',
    'journey.step3.title': 'Якість',
    'journey.step3.desc': 'Наш AI створює відгуки, які перевершують 95% конкурентів за глибиною та релевантністю.',
    'journey.step4.title': 'Зростання',
    'journey.step4.desc': 'Спостерігайте за зростанням доходу та відповідей, фокусуючись на високооплачуваних замовленнях.',
    'journey.metric.label': 'Поточна метрика',
    'journey.metric.step1': 'Ризик вигорання: Високий',
    'journey.metric.step2': 'Точність підбору: 92%',
    'journey.metric.step3': 'Якість: Елітна',
    'journey.metric.step4': 'ROI: +320%',
    'journey.analytics.label': 'Аналітичний движок',

    // Hero Section Extra
    'hero.trustedBy': 'Нам довіряють фрілансери з',

    // Features Section
    'features.badge': 'Функції',
    'features.title': 'Все, що потрібно для перемоги на Upwork',
    'features.desc': 'Від сирого опису вакансії до переможного відгуку — RelateEdge бере на себе весь процес.',

    // Stacking Cards
    'cards.card1.title': 'Миттєвий аналіз вакансії',
    'cards.card1.desc': 'Зрозумійте якість клієнта, шанси на перемогу та червоні прапорці — перш ніж витрачати час на написання.',
    'cards.card1.tag1': 'Рахунок клієнта',
    'cards.card1.tag2': 'Шанс на успіх',
    'cards.card1.tag3': 'Червоні прапорці',
    'cards.card1.statLabel': 'Сер. час аналізу',
    'cards.card2.title': 'Створюйте відгуки, які конвертують',
    'cards.card2.desc': 'AI створює персоналізований відгук з "гачком", який б’є точно в болі клієнта.',
    'cards.card2.tag1': 'Гачок',
    'cards.card2.tag2': 'Пруфи',
    'cards.card2.tag3': 'Заклик',
    'cards.card2.statLabel': 'Сер. оцінка гачка',
    'cards.card3.title': 'Відстежуйте перемоги',
    'cards.card3.desc': 'Логуйте кожен відгук, стежте за reply rate та отримуйте інсайти про те, що реально працює.',
    'cards.card3.tag1': 'Reply rate',
    'cards.card3.tag2': 'A/B інсайти',
    'cards.card3.tag3': 'Історія',
    'cards.card3.statLabel': 'Зростання відповідей',
    'cards.card4.title': 'Оцінка перед відправкою',
    'cards.card4.desc': 'Отримуйте оцінку якості в реальному часі з порадами щодо покращення вашого відгуку.',
    'cards.card4.tag1': 'Live оцінка',
    'cards.card4.tag2': 'Поради',
    'cards.card4.tag3': 'Оптимізація',
    'cards.card4.statLabel': 'Топ відгуків',
    'cards.card5.title': 'Уникайте поганих клієнтів',
    'cards.card5.desc': 'Детектор червоних прапорців попередить про проблемні вакансії — низький бюджет або погана історія.',
    'cards.card5.tag1': 'Червоні прапорці',
    'cards.card5.tag2': 'Ризик-скор',
    'cards.card5.tag3': 'Довіра',
    'cards.card5.statLabel': 'Прапорців знайдено',
    'cards.card6.title': 'Перемагайте більше, пишіть менше',
    'cards.card6.desc': 'Витрачайте 30 секунд замість 30 хвилин. Створюйте, оцінюйте та відправляйте в один клік.',
    'cards.card6.tag1': 'Автоматизація',
    'cards.card6.tag2': 'Швидкість',
    'cards.card6.tag3': 'Ефективність',
    'cards.card6.statLabel': 'Часу заощаджено',

    // Process Steps
    'steps.step1.title': 'Синхронізація',
    'steps.step1.desc': 'Скопіюйте опис вакансії або синхронізуйте напряму. Ми виділимо головне автоматично.',
    'steps.step2.title': 'AI Чернетка',
    'steps.step2.desc': 'Наш движок створить персоналізований відгук на основі вашого профілю та потреб клієнта.',
    'steps.step3.title': 'Оцінка та відправка',
    'steps.step3.desc': 'Перевірте оцінку якості, внесіть фінальні правки та відправляйте з впевненістю.',

    // CTA Section
    'cta.title.part1': 'Інвестуйте у своє',
    'cta.title.part2': 'кар’єрне зростання.',
    'cta.desc': 'Приєднуйтесь до 6,000+ фрілансерів, які подвоїли свою конверсію.',
    'cta.feature1': 'Безлімітні AI-відгуки',
    'cta.feature2': 'Просунута аналітика',
    'cta.feature3': '24/7 AI-коучинг',

    // Pricing Card
    'pricing.popular': 'Популярний',
    'pricing.planName': 'Професійний план',
    'pricing.announced': 'Ціни будуть оголошені при запуску.',
    'pricing.desc': 'Все, що потрібно, щоб перетворити написання відгуків на вашу головну перевагу.',
    'pricing.noCard': 'Карта не потрібна.',

    // Footer
    'footer.desc': 'Преміальний двигун відгуків для сучасних фрілансерів. Створюйте контент, який конвертує.',
    'footer.col1': 'Продукт',
    'footer.col1.link1': 'Як це працює',
    'footer.col1.link2': 'Ціни',
    'footer.col1.link3': 'Демо',
    'footer.col2': 'Для розробників',
    'footer.col2.link1': 'API Доки',
    'footer.col2.link2': 'GitHub Репозиторій',
    'footer.col2.link3': 'Інтеграції',
    'footer.col3': 'Юридичне',
    'footer.col3.link1': 'Приватність',
    'footer.col3.link2': 'Умови',
    'footer.col3.link3': 'Cookie',
    'footer.rights': 'Всі права захищені.',

    // Signup Page
    'signup.title': 'Створіть аккаунт',
    'signup.desc': 'Приєднуйтесь до елітних фрілансерів, що використовують RelateEdge для домінування на Upwork.',
    'signup.name': 'Повне ім\'я',
    'signup.company': 'Назва компанії',
    'signup.website': 'Посилання на сайт (опціонально)',
    'signup.email': 'Email адреса',
    'signup.password': 'Пароль',
    'signup.button': 'Створити аккаунт',
    'signup.already': 'Вже є аккаунт?',
    'signup.login': 'Увійти',
    'signup.error.email': 'Введіть коректний email',
    'signup.error.password': 'Пароль має бути не менше 8 символів',
    'signup.error.name': 'Ім\'я обов\'язкове',
    'signup.error.company': 'Назва компанії обов\'язкова',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'ru')) {
      setLocaleState(savedLocale)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const t = (key: string) => {
    return translations[locale][key as keyof typeof translations['en']] || key
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
