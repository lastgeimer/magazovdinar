import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    'nav.about': 'Обо мне',
    'nav.works': 'Работы',
    'nav.services': 'Услуги',
    'nav.contact': 'Контакты',
    'nav.hire': 'Заказать монтаж',
    'hero.greeting': 'Привет, я',
    'hero.role1': 'Колорист',
    'hero.role2': 'Motion Designer',
    'hero.role3': 'Видеомонтажёр',
    'hero.role4': 'Звукорежиссёр',
    'hero.description': 'Создаю визуальные истории, которые вдохновляют и запоминаются. От концепции до финального рендера.',
    'hero.viewWork': 'Посмотреть работы',
    'hero.contact': 'Связаться',
    'hero.stat1': 'года опыта',
    'hero.stat2': 'проектов',
    'hero.stat3': 'довольных клиентов',
    'hero.portfolio': 'Полное портфолио в Telegram',
    'about.title': 'Обо мне',
    'about.subtitle': 'Человек, который меняет историю.',
    'about.headline': 'Делаю визуальную историю кадр за кадром',
    'about.description': 'Я специалист по постпродакшену, одержимый искусством монтажа. Каждый кадр, каждый переход, каждое цветовое решение — всё продумано до мелочей, призвано служить сюжету и усиливать эмоции.',
    'about.description2': 'В своей работе я сочетаю технические навыки с художественным видением: выстраиваю ритм, контролирую динамику повествования и создаю целостную визуальную идентичность задач проектов. Мой подход — это видеоконтент, который не просто смотрится, а запоминается и вовлекает зрителей.',
    'about.location': 'Живу в Казани, России. Работаю с клиентами по всему миру.',
    'about.experience': 'Опыт работы',
    'about.skills': 'Навыки',
    'about.year2023': '2023 год',
    'about.year2024': '2024 год',
    'about.year2025': '2025 год',
    'about.exp2023': 'Начало карьеры. Начал свой профессиональный путь в монтаже',
    'about.exp2024': 'Монтировал эдиты, музыкальные клипы, рекламные ролики для различных проектов',
    'about.exp2025': 'Работаю с YouTube, рилс-мейкерами и различными инфлюэнсерами',
    'works.title': 'Избранные работы',
    'works.subtitle': 'Посмотрите на некоторые из моих последних проектов',
    'works.all': 'Все',
    'works.commercial': 'Коммерция',
    'works.music': 'Музыка',
    'works.documentary': 'Документалка',
    'works.showreel': 'Смотреть мой Шоурил',
    'services.title': 'Услуги',
    'services.subtitle': 'Чем я могу вам помочь',
    'services.service1': 'Видеомонтаж',
    'services.desc1': 'Профессиональный монтаж для YouTube, соцсетей и рекламы с вниманием к ритму и storytelling',
    'services.service2': 'Цветокоррекция',
    'services.desc2': 'Точная цветокоррекция и грейдинг, который придаёт вашим видео кинематографический вид',
    'services.service3': 'Моушн-графика',
    'services.desc3': 'Создание динамичной графики, застав, титров и анимационных элементов',
    'services.service4': 'Звуковой дизайн',
    'services.desc4': 'Профессиональный звуковой дизайн и микс для усиления эмоционального воздействия видео',
    'services.cta': 'Заказать монтаж',
    'testimonials.title': 'Отзывы',
    'testimonials.subtitle': 'Что говорят клиенты',
    'testimonials.quote1': 'DINARIX превратил наш концепт в визуальный шедевр. Его внимание к деталям и понимание нашего видения были исключительными. Настоятельно рекомендую!',
    'testimonials.author1': 'Эмиль Гибадуллин',
    'testimonials.quote2': 'Работать с DINARIX было невероятно. Монтаж моего музыкального клипа превзошёл все ожидания!',
    'testimonials.author2': 'Артём Волков',
    'testimonials.quote3': 'Профессионализм и творческий подход на высшем уровне. Результат превзошёл ожидания!',
    'testimonials.author3': 'Максим Петров',
    'contact.subtitle': 'Давайте создадим что-то вместе',
    'contact.description': 'Готов к новым проектам и коллаборациям',
    'contact.getInTouch': 'Связаться со мной',
    'contact.name': 'Имя',
    'contact.email': 'Email',
    'contact.message': 'Сообщение',
    'contact.send': 'Отправить',
    'contact.response': 'Время ответа',
    'contact.responseTime': 'В течение часа',
    'footer.rights': '© 2025 DINARIX. Все права защищены.',
  },
  en: {
    'nav.about': 'About',
    'nav.works': 'Works',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.hire': 'Hire Me',
    'hero.greeting': 'Hello, I am',
    'hero.role1': 'Colorist',
    'hero.role2': 'Motion Designer',
    'hero.role3': 'Video Editor',
    'hero.role4': 'Sound Designer',
    'hero.description': 'I create visual stories that inspire and stick. From concept to final render.',
    'hero.viewWork': 'View My Work',
    'hero.contact': 'Get In Touch',
    'hero.stat1': 'years exp.',
    'hero.stat2': 'projects',
    'hero.stat3': 'happy clients',
    'hero.portfolio': 'Full portfolio on Telegram',
    'about.title': 'About Me',
    'about.subtitle': 'The person who changes the story.',
    'about.headline': 'Crafting visual stories frame by frame',
    'about.description': 'I am a post-production specialist obsessed with the art of editing. Every cut, every transition, every color decision — all thought through to serve the story and amplify emotion.',
    'about.description2': 'In my work I combine technical skills with artistic vision: building rhythm, controlling narrative dynamics and creating a cohesive visual identity. My approach — video content that doesn\'t just look good, it sticks in memory and engages viewers.',
    'about.location': 'Based in Kazan, Russia. Working with clients worldwide.',
    'about.experience': 'Experience',
    'about.skills': 'Skills',
    'about.year2023': '2023',
    'about.year2024': '2024',
    'about.year2025': '2025',
    'about.exp2023': 'Career start. Started my professional editing journey',
    'about.exp2024': 'Edited music videos, commercial spots for various projects',
    'about.exp2025': 'Working with YouTube creators, reels-makers and influencers',
    'works.title': 'Selected Works',
    'works.subtitle': 'Take a look at some of my latest projects',
    'works.all': 'All',
    'works.commercial': 'Commercial',
    'works.music': 'Music',
    'works.documentary': 'Documentary',
    'works.showreel': 'Watch my Showreel',
    'services.title': 'Services',
    'services.subtitle': 'What I can do for you',
    'services.service1': 'Video Editing',
    'services.desc1': 'Professional editing for YouTube, social media and ads with attention to rhythm and storytelling',
    'services.service2': 'Color Grading',
    'services.desc2': 'Precise color correction and grading that gives your videos a cinematic look',
    'services.service3': 'Motion Graphics',
    'services.desc3': 'Creating dynamic graphics, intros, titles and animated elements',
    'services.service4': 'Sound Design',
    'services.desc4': 'Professional sound design and mix to enhance the emotional impact of video',
    'services.cta': 'Book a Project',
    'testimonials.title': 'Testimonials',
    'testimonials.subtitle': 'What clients say',
    'testimonials.quote1': 'DINARIX transformed our concept into a visual masterpiece. His attention to detail and understanding of our vision were exceptional. Highly recommend!',
    'testimonials.author1': 'Emil Gibadullin',
    'testimonials.quote2': 'Working with DINARIX was incredible. The editing of my music video exceeded all expectations!',
    'testimonials.author2': 'Artyom Volkov',
    'testimonials.quote3': 'Professionalism and creativity at the highest level. The result exceeded expectations!',
    'testimonials.author3': 'Maxim Petrov',
    'contact.subtitle': "Let's create something together",
    'contact.description': 'Open to new projects and collaborations',
    'contact.getInTouch': 'Get In Touch',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.response': 'Response Time',
    'contact.responseTime': 'Within an hour',
    'footer.rights': '© 2025 DINARIX. All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}