
import './App.css'
import React, { useState, useRef, useEffect } from "react";
// Импортируем изображения
import Black from './images/Black.png';
import Front from './images/Front.png';
import Gold from './images/Gold.png';
import Location from './images/Location.png';
import Man from './images/Man.png';



const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [siteData, setSiteData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sections = ["home", "about", "work", "services", "additional", "testimonials", "contact"];
  const sectionRefs = sections.map(() => useRef(null));

  // Функция для принудительного обновления данных
  const refreshData = () => {
    const savedData = localStorage.getItem('siteData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log('App: Принудительное обновление данных:', parsedData);
        setSiteData(parsedData);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Ошибка при принудительном обновлении данных:', error);
      }
    }
  };

  // Добавляем функцию в глобальный объект для доступа из админки
  useEffect(() => {
    window.refreshSiteData = refreshData;
    return () => {
      delete window.refreshSiteData;
    };
  }, []);

  // Секретная комбинация клавиш для перехода в админку (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        window.location.href = '/admin';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Закрытие мобильного меню при клике вне его области и блокировка скролла
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('header')) {
        setIsMobileMenuOpen(false);
      }
    };

    // Блокировка скролла при открытом мобильном меню
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Загрузка данных из localStorage при инициализации
  useEffect(() => {
    const loadData = () => {
      const savedData = localStorage.getItem('siteData');
      if (savedData) {
        try {
                  const parsedData = JSON.parse(savedData);
        console.log('App: Загружены данные из localStorage:', parsedData);
        setSiteData(parsedData);
        setLastUpdate(new Date());
        } catch (error) {
          console.error('Ошибка при загрузке данных:', error);
        }
      }
    };
    
    loadData();
    
    // Периодически проверяем обновления данных (каждые 2 секунды)
    const interval = setInterval(loadData, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Слушаем изменения в localStorage и кастомные события
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'siteData' && e.newValue) {
        try {
          setSiteData(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Ошибка при обновлении данных:', error);
        }
      }
    };

    const handleCustomDataUpdate = (e) => {
      if (e.detail && e.detail.siteData) {
        try {
          console.log('App: Получено кастомное событие обновления данных:', e.detail.siteData);
          setSiteData(e.detail.siteData);
          setLastUpdate(new Date());
        } catch (error) {
          console.error('Ошибка при обновлении данных:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('siteDataUpdated', handleCustomDataUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('siteDataUpdated', handleCustomDataUpdate);
    };
  }, []);

  // Данные по умолчанию
  const defaultData = {
    hero: {
      title1: 'Интегративный',
      title2: 'консалтинг',
      subtitle: 'Мост между духовным и материальным в вашем бизнесе',
      description: 'Автор: Олеся Клем, более 10 лет опыта в подборе персонала, аудите команд, дизайне человека и других инструментах.',
      interests: 'Личные интересы: любит походы в горы, природу, автоспорт и классическую музыку.',
      mission: 'Миссия: соединять смыслы, энергию и результат.'
    },
    about: {
      experience: [
        'Более 10 лет опыта в HR и управлении персоналом (от классического подбора до комплексного аудита команд)',
        'Более 6 лет работы в качестве HR и руководителя отдела подбора персонала в разных нишах бизнеса',
        'Более 4 лет опыта работы в консалтинге как консультанта по формированию и управлению командами'
      ],
      methodology: 'Создатель методики «Интегративный аудит бизнеса» — выездная диагностика лидера, персонала и дальнейшая настройка взаимодействия.',
      energy: 'Опытный аналитик людей, структур и смыслов. Как сакральный генератор 4/6 чувствует, где и что нужно исправить, обладая большим количеством нужных и полезных связей. Регулярная работа с телом и личная духовная практика позволяют точно чувствовать «нужных» людей.',
      partnership: 'Альфа-лидер, ведущий рядышком (дружески) к изменениям в «светлое будущее». Все этапы проходят вместе, если для перезагрузки нужно идти в горы — собираются и идут вместе.'
    },
    services: {
      main: [
        {
          title: 'Точное закрытие вакансий',
          description: 'Находим идеальных кандидатов, соответствующих не только квалификации, но и энергетике вашей компании.'
        },
        {
          title: 'Формирование команды',
          description: 'Создание синергетических команд, способных вывести ваш бизнес на новый уровень показателей.'
        },
        {
          title: 'Живая диагностика бизнеса',
          description: 'Глубокий выездной аудит, выявляющий скрытые причины «пробуксовок» и потенциал роста в бизнесе.'
        },
        {
          title: 'Настройка лидера и команды',
          description: 'Аудит «природы» собственника и команды, дальнейшая настройка взаимодействия исходя из сильных сторон и талантов каждого с учетом возможных компромиссов. Когда 1+1 становится не 2, а 20.'
        }
      ],
      additional: [
        'Классический подбор персонала: Комплексный подбор линейных, ТОП-менеджеров, соответствующих вашим требованиям, ценностям и корпоративной культуре.',
        'Подбор персонала с применением системы Дизайна Человека: Современный подход к настройке кандидатов с руководителями, обеспечивающий максимальную гармонию и эффективность в дальнейшей работе.',
        'Аудит команды ТОПов и разработка ИПР: Глубокий аудит высшего менеджмента и разработка индивидуальных планов развития для каждого члена команды не только в рамках компетенций, но и в контексте личности.',
        'Аудит бизнес-процессов: Анализ и оптимизация бизнес-процессов для повышения эффективности взаимодействия и сокращения издержек.',
        'Сопровождение внедрения изменений: Поддержка и контроль на этапах внедрения новых стратегий и процессов (от 1 до 6 месяцев).',
        'Программы обучения HR: Разработка и проведение программ обучения и развития для вашей HR-службы. Повышение квалификации специалистов, а также обучение специалиста с «нуля».'
      ]
    },
    testimonials: [
      {
        name: 'Л.Н. Варенова',
        position: 'Генеральный директор ООО "Сталь-Про"',
        quote: 'С уверенностью можем рекомендовать Клем Олесю Александровну как надёжного и компетентного партнёра в области подбора персонала и управления командами.'
      },
      {
        name: 'Д.В. Николаев',
        position: 'Генеральный директор ООО "ГСП-Механизация"',
        quote: 'Олеся Александровна проявила себя как квалифицированный и надёжный специалист, способный принимать решения и нести ответственность за конечный результат.'
      },
      {
        name: 'А.Н. Дмитриенко',
        position: 'Генеральный директор ООО "СпецПромСтрой"',
        quote: 'Оперативность и эффективность — все вакансии были закрыты в оговорённые сроки, что позволило избежать простоев на объекте.'
      },
      {
        name: 'М.А. Маликов',
        position: 'Генеральный директор ООО "Сибирский Стандарт"',
        quote: 'Олеся Александровна продемонстрировала высокий профессионализм, гибкость и глубокое понимание специфики нашей отрасли. Индивидуальный подход — учтены все наши пожелания и требования к кандидатам. Мы планируем сотрудничать и в будущем.'
      }
    ],
    contact: {
      company: 'ИП Клем Олеся Александровна',
      inn: '381018937243',
      ogrnip: '324385000069218',
      phone: '+7 (914) 002-11-69',
      telegram: '@kelem_space',
      email: 'kelem.space@gmail.com'
    }
  };

  // Используем данные из админки или данные по умолчанию
  const data = siteData || defaultData;
  const testimonials = data.testimonials;

  const scrollToSection = (sectionId) => {
    const index = sections.indexOf(sectionId);
    if (index !== -1 && sectionRefs[index].current) {
      sectionRefs[index].current.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false); // Закрываем мобильное меню при клике
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sectionRefs[i].current;
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const testimonialsData = siteData?.testimonials || testimonials;
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [siteData?.testimonials]);

  const nextTestimonial = () => {
    const testimonialsData = siteData?.testimonials || testimonials;
    setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    const testimonialsData = siteData?.testimonials || testimonials;
    setCurrentTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D0BCAC] via-[#CBD5E1] to-[#D4D4D8]">
      {/* Скрытая кнопка админки - правый верхний угол */}
      <div className="fixed top-4 right-4 z-[60] group">
        <a
          href="/admin"
          className="w-3 h-3 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-600 hover:scale-125 cursor-pointer block"
          title="Админ-панель"
        />
      </div>
      
      {/* Скрытая кнопка админки - левый нижний угол */}
      <div className="fixed bottom-4 left-4 z-[60] group">
        <a
          href="/admin"
          className="w-2 h-2 bg-gray-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-700 hover:scale-150 cursor-pointer block"
          title="Админ-панель"
        />
      </div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-lg sm:text-2xl font-bold text-gray-800">Олеся Клем</div>
              {lastUpdate && (
                <div className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded-full hidden sm:block">
                  Обновлено: {lastUpdate.toLocaleTimeString()}
                </div>
              )}
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-all duration-300 pb-1 border-b-2 ${
                    activeSection === section 
                      ? "text-[#A8A29E] border-[#A8A29E]" 
                      : "text-gray-600 border-transparent hover:text-[#A8A29E] hover:border-[#C6C9D0]"
                  }`}
                >
                  {section === "home" && "Главная"}
                  {section === "about" && "Кто я"}
                  {section === "work" && "Как я работаю"}
                  {section === "services" && "Основные направления"}
                  {section === "additional" && "Дополнительные услуги"}
                  {section === "testimonials" && "Отзывы"}
                  {section === "contact" && "Контакты"}
                </button>
              ))}
            </nav>
            
            <div className="flex items-center gap-3">
              {/* Telegram Button */}
              <a
                href={`https://t.me/${siteData?.contact?.telegram?.replace('@', '') || 'kelem_space'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#A8A29E] text-white px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-[#C6C9D0] transition-all duration-300 hover:shadow-lg"
              >
                <span className="hidden sm:inline">Написать в Telegram</span>
                <span className="sm:hidden">Telegram</span>
              </a>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Открыть меню"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                  <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="bg-white border-t border-gray-200 shadow-lg">
            <nav className="px-4 py-6 space-y-4">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                    activeSection === section 
                      ? "bg-[#A8A29E] text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {section === "home" && "🏠 Главная"}
                  {section === "about" && "👤 Кто я"}
                  {section === "work" && "⚙️ Как я работаю"}
                  {section === "services" && "🛠️ Основные направления"}
                  {section === "additional" && "📋 Дополнительные услуги"}
                  {section === "testimonials" && "💬 Отзывы"}
                  {section === "contact" && "📞 Контакты"}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={sectionRefs[0]} id="home" className={`pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 min-h-screen flex items-center transition-all duration-300 ${isMobileMenuOpen ? 'pt-80' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="mb-6 sm:mb-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
                  {siteData?.hero?.title1 || 'Интегративный'}
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#A8A29E] mb-6 sm:mb-8 leading-tight">
                  {siteData?.hero?.title2 || 'консалтинг'}
                </h1>
              </div>
              
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-12 leading-relaxed">
                {siteData?.hero?.subtitle || 'Мост между духовным и материальным в вашем бизнесе'}
              </p>
              
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#C6C9D0] max-w-3xl transform hover:scale-105 transition-transform duration-500">
                <div className="space-y-4 sm:space-y-6 text-left">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    <strong>Автор:</strong> {siteData?.hero?.description || 'Олеся Клем, более 10 лет опыта в подборе персонала, аудите команд, дизайне человека и других инструментах.'}
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Консультирует собственников по вопросам управления, мотивации персонала, оптимизации бизнес-процессов и настройке взаимодействия команд.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    <strong>Личные интересы:</strong> {siteData?.hero?.interests || 'любит походы в горы, природу, автоспорт и классическую музыку.'}
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                    <strong>Миссия:</strong> {siteData?.hero?.mission || 'соединять смыслы, энергию и результат.'}
                  </p>
                </div>
                
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                  <a
                    href={`https://t.me/${siteData?.contact?.telegram?.replace('@', '') || 'kelem_space'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#A8A29E] text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-medium hover:bg-[#C6C9D0] transition-all duration-300 hover:shadow-xl inline-block transform hover:-translate-y-1 w-full sm:w-auto text-center"
                  >
                    Написать в Telegram
                  </a>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden mx-auto shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                  <img 
                    src={Front} 
                    alt="Олеся Клем" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-[#CBD5E1] rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-[#A8A29E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-10 h-10 sm:w-14 sm:h-14 bg-[#D4D4D8] rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-[#A8A29E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={sectionRefs[1]} id="about" className="py-16 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-white to-[#CBD5E1]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12 sm:mb-20">Кто я</h2>
          
          {/* Фотография в секции "Кто я" */}
          <div className="flex justify-center mb-12 sm:mb-16">
            <div className="relative">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-700">
                <img 
                  src={Gold} 
                  alt="Олеся Клем - профессиональный портрет" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-[#D4D4D8] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-[#A8A29E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>

                      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Left Column - Experience */}
              <div className="space-y-8 sm:space-y-12">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-[#C6C9D0] transform hover:shadow-xl transition-all duration-500">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#CBD5E1] rounded-full flex items-center justify-center mr-3 sm:mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-[#A8A29E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Опыт и экспертиза</h3>
                  </div>
                  <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-700">
                    {(siteData?.about?.experience || [
                      'Более 10 лет опыта в HR и управлении персоналом (от классического подбора до комплексного аудита команд)',
                      'Более 6 лет работы в качестве HR и руководителя отдела подбора персонала в разных нишах бизнеса',
                      'Более 4 лет опыта работы в консалтинге как консультанта по формированию и управлению командами'
                    ]).map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-[#A8A29E] rounded-full mt-3 mr-3 sm:mr-4 flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-[#D4D4D8] transform hover:shadow-xl transition-all duration-500">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D4D4D8] rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-[#A8A29E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Авторская методика</h3>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {siteData?.about?.methodology || 'Создатель методики «Интегративный аудит бизнеса» — выездная диагностика лидера, персонала и дальнейшая настройка взаимодействия.'}
                </p>
              </div>
            </div>

            {/* Right Column - Personal */}
            <div className="space-y-8 sm:space-y-12">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-[#C6C9D0] transform hover:shadow-xl transition-all duration-500">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#CBD5E1] rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-[#A8A29E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Энергия и интуиция</h3>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {siteData?.about?.energy || 'Опытный аналитик людей, структур и смыслов. Как сакральный генератор 4/6 чувствует, где и что нужно исправить, обладая большим количеством нужных и полезных связей. Регулярная работа с телом и личная духовная практика позволяют точно чувствовать «нужных» людей.'}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-[#D0BCAC] transform hover:shadow-xl transition-all duration-500">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D0BCAC] rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Партнерство и поддержка</h3>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {siteData?.about?.partnership || 'Альфа-лидер, ведущий рядышком (дружески) к изменениям в «светлое будущее». Все этапы проходят вместе, если для перезагрузки нужно идти в горы — собираются и идут вместе.'}
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 sm:mt-16 flex justify-center space-x-3 sm:space-x-4">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#D0BCAC] rounded-full animate-pulse"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#CBD5E1] rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#D4D4D8] rounded-full animate-pulse delay-200"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#A8A29E] rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </section>

      {/* How I Work Section */}
      <section ref={sectionRefs[2]} id="work" className="py-16 sm:py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12 sm:mb-16">Как я работаю</h2>
          
          <div className="text-center mb-12 sm:mb-20 max-w-4xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed">
              Не даю готовые шаблоны. Встраиваюсь в «тело» компании и чувствую, где она сбоит, предлагая глубокий и персонализированный подход.
            </p>
          </div>

          {/* Process Diagram */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-start">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#A8A29E] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4 shadow-lg">
                  1
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Контакт с собственником</h3>
                <p className="text-sm sm:text-base text-gray-600 max-w-xs">Диагностика по Дизайну Человека, детальная беседа и наблюдение</p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#A8A29E] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4 shadow-lg">
                  2
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Энергетическая карта</h3>
                <p className="text-sm sm:text-base text-gray-600 max-w-xs">Создание наглядной карты бизнеса, отражающей его энергетическое состояние</p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#A8A29E] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4 shadow-lg">
                  3
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Аудит команды и процессов</h3>
                <p className="text-sm sm:text-base text-gray-600 max-w-xs">Проведение аудита «в поле» для выявления реального положения дел</p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#A8A29E] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4 shadow-lg">
                  4
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Живая обратная связь</h3>
                <p className="text-sm sm:text-base text-gray-600 max-w-xs">Предоставление честной обратной связи и разработка плана действий</p>
              </div>
            </div>
          </div>

          {/* Фотография в секции "Как я работаю" */}
          <div className="flex justify-center my-12 sm:my-16">
            <div className="relative">
              <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:-rotate-2 transition-transform duration-700">
                <img 
                  src={Black} 
                  alt="Олеся Клем - работа с клиентами" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -left-2 w-8 h-8 sm:w-10 sm:h-10 bg-[#CBD5E1] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-[#A8A29E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Process Description */}
          <div className="mt-12 sm:mt-20 bg-[#CBD5E1] rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6 sm:mb-8">Интегративный подход</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#A8A29E] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-2">Духовная основа</h4>
                <p className="text-sm sm:text-base text-gray-700">Использование интуиции, энергетики и глубокого понимания природы людей</p>
              </div>
              <div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#A8A29E] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-2">Бизнес-анализ</h4>
                <p className="text-sm sm:text-base text-gray-700">Комплексный аудит бизнес-процессов, команд и организационной структуры</p>
              </div>
              <div className="sm:col-span-2 md:col-span-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#A8A29E] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-2">Результат</h4>
                <p className="text-sm sm:text-base text-gray-700">Синергия духовного и материального для достижения максимального результата</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section ref={sectionRefs[3]} id="services" className="py-32 px-6 bg-[#CBD5E1]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-16">Основные направления</h2>
          
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <p className="text-2xl text-gray-700 leading-relaxed">
              Комплексные решения, которые гармонично сочетают классические бизнес-инструменты с глубоким пониманием человеческого потенциала и энергии бизнеса.
            </p>
          </div>

          {/* Фотография в секции "Основные направления" */}
          <div className="flex justify-center mb-16">
            <div className="relative">
              <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl transform -rotate-1 hover:rotate-1 transition-transform duration-700">
                <img 
                  src={Location} 
                  alt="Олеся Клем - консультации" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-[#A8A29E] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {(siteData?.services?.main || [
              {
                title: "Точное закрытие вакансий",
                description: "Находим идеальных кандидатов, соответствующих не только квалификации, но и энергетике вашей компании."
              },
              {
                title: "Формирование команды",
                description: "Создание синергетических команд, способных вывести ваш бизнес на новый уровень показателей."
              },
              {
                title: "Живая диагностика бизнеса",
                description: "Глубокий выездной аудит, выявляющий скрытые причины «пробуксовок» и потенциал роста в бизнесе."
              },
              {
                title: "Настройка лидера и команды",
                description: "Аудит «природы» собственника и команды, дальнейшая настройка взаимодействия исходя из сильных сторон и талантов каждого с учетом возможных компромиссов. Когда 1+1 становится не 2, а 20."
              }
            ]).map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#C6C9D0]">
                <div className="w-12 h-12 bg-[#A8A29E] rounded-full flex items-center justify-center mb-6">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                <p className="text-lg text-gray-700 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section ref={sectionRefs[4]} id="additional" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-20">Дополнительные услуги</h2>
          
          {/* Фотография в секции "Дополнительные услуги" */}
          <div className="flex justify-center mb-16">
            <div className="relative">
              <div className="w-96 h-96 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:-rotate-3 transition-transform duration-700">
                <img 
                  src={Man} 
                  alt="Олеся Клем - профессиональная деятельность" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-3 -right-3 w-14 h-14 bg-[#C6C9D0] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#A8A29E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {(siteData?.services?.additional || [
              "Классический подбор персонала: Комплексный подбор линейных, ТОП-менеджеров, соответствующих вашим требованиям, ценностям и корпоративной культуре.",
              "Подбор персонала с применением системы Дизайна Человека: Современный подход к настройке кандидатов с руководителями, обеспечивающий максимальную гармонию и эффективность в дальнейшей работе.",
              "Аудит команды ТОПов и разработка ИПР: Глубокий аудит высшего менеджмента и разработка индивидуальных планов развития для каждого члена команды не только в рамках компетенций, но и в контексте личности.",
              "Аудит бизнес-процессов: Анализ и оптимизация бизнес-процессов для повышения эффективности взаимодействия и сокращения издержек.",
              "Сопровождение внедрения изменений: Поддержка и контроль на этапах внедрения новых стратегий и процессов (от 1 до 6 месяцев).",
              "Программы обучения HR: Разработка и проведение программ обучения и развития для вашей HR-службы. Повышение квалификации специалистов, а также обучение специалиста с «нуля»."
            ]).map((service, index) => (
              <div key={index} className="bg-[#CBD5E1] p-8 rounded-2xl hover:bg-[#D4D4D8] hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-[#D0BCAC]">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-[#A8A29E] rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">{service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={sectionRefs[5]} id="testimonials" className="py-32 px-6 bg-[#CBD5E1]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-20">Что говорят клиенты</h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Testimonial Slider */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {(siteData?.testimonials || testimonials).map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white p-12 rounded-3xl shadow-2xl border border-[#C6C9D0] relative">
                      <div className="text-8xl text-[#CBD5E1] font-bold absolute top-6 left-8 opacity-30 select-none">"</div>
                      <div className="pl-16">
                        <p className="text-2xl text-gray-700 italic mb-8 leading-relaxed">{testimonial.quote}</p>
                        <div className="border-t border-gray-200 pt-8">
                          <div className="font-bold text-2xl text-gray-800">{testimonial.name}</div>
                          <div className="text-xl text-gray-600 mt-2">{testimonial.position}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 z-10 border border-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 z-10 border border-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-12 space-x-3">
              {(siteData?.testimonials || testimonials).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index 
                      ? "bg-[#A8A29E] w-8" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Client Logos */}
          <div className="mt-20 text-center">
            <p className="text-gray-600 mb-8">Наши клиенты</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {(siteData?.testimonials || testimonials).map((testimonial, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-[#C6C9D0] rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-[#A8A29E] font-bold text-lg">{testimonial.name.split(" ")[0].charAt(0)}</span>
                  </div>
                  <p className="text-gray-700 font-medium">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={sectionRefs[6]} id="contact" className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-8">Готовы обсудить ваш запрос?</h2>
          <p className="text-2xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
            Перед началом работы, чтобы убедиться в совпадении наших ценностей, провожу краткое интервью.
            Направьте информацию о вас и вашей компании (ссылку на сайт) и краткий запрос — задачу, которую необходимо решить.
          </p>
          
          <a
            href={`https://t.me/${siteData?.contact?.telegram?.replace('@', '') || 'kelem_space'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#A8A29E] text-white px-12 py-5 rounded-full text-2xl font-medium hover:bg-[#C6C9D0] transition-all duration-300 hover:shadow-2xl inline-block transform hover:-translate-y-1 mb-6"
          >
            Отправить запрос в Telegram
          </a>
          
          <p className="text-xl text-gray-500">
            После получения запроса свяжусь с вами для согласования времени беседы.
          </p>

          <div className="mt-24 pt-12 border-t border-gray-200">
            <h3 className="text-4xl font-bold text-gray-800 mb-10">Контакты</h3>
            <div className="bg-[#CBD5E1] rounded-3xl p-12 shadow-xl max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{siteData?.contact?.company || 'ИП Клем Олеся Александровна'}</h4>
                    <p className="text-gray-700">ИНН: {siteData?.contact?.inn || '381018937243'}</p>
                    <p className="text-gray-700">ОГРНИП: {siteData?.contact?.ogrnip || '324385000069218'}</p>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Телефон:</strong> {siteData?.contact?.phone || '+7 (914) 002-11-69'}
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-700">
                      <strong>Telegram:</strong>{" "}
                      <a href={`https://t.me/${siteData?.contact?.telegram?.replace('@', '') || 'kelem_space'}`} target="_blank" rel="noopener noreferrer" className="text-[#A8A29E] hover:underline font-medium">
                        {siteData?.contact?.telegram || '@kelem_space'}
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Email:</strong>{" "}
                      <a href={`mailto:${siteData?.contact?.email || 'kelem.space@gmail.com'}`} className="text-[#A8A29E] hover:underline font-medium">
                        {siteData?.contact?.email || 'kelem.space@gmail.com'}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-800 text-white text-center relative group">
        <p className="text-gray-300 text-lg">
          © {new Date().getFullYear()} Олеся Клем. Все права защищены.
        </p>
        {/* Скрытая кнопка админки в футере */}
        <a
          href="/admin"
          className="absolute bottom-2 right-6 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-gray-400"
          title="Админ-панель"
        >
          ⚙️
        </a>
      </footer>
    </div>
  );
};

export default App;