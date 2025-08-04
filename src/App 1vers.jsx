
import './App.css'
import React, { useState, useEffect, useRef } from 'react';
import Location from './images/Location.png';
import Front from './images/Front.png';
import Man from './images/Man.png';
import Women from './images/Women.png';
import Black from './images/Black.png';
import Gold from './images/Gold.png';
import Silver from './images/Silver.png';
import Set1 from './images/Set1.png';
import Set2 from './images/Set2.png';
import Set3 from './images/Set3.png';
import Set4 from './images/Set4.png';

const App = () => {
  const [showRSVP, setShowRSVP] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    drinks: [],
  });
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [visibleSections, setVisibleSections] = useState({});
  
  const targetDate = new Date('September 25, 2025 16:00:00').getTime();
  const sections = useRef({});

  // Обновление обратного отсчёта
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / (1000 * 60)) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Анимация при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sections.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sections.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const currentDrinks = [...formData.drinks];
    if (checked) {
      currentDrinks.push(value);
    } else {
      const index = currentDrinks.indexOf(value);
      if (index !== -1) {
        currentDrinks.splice(index, 1);
      }
    }
    setFormData({ ...formData, drinks: currentDrinks });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Спасибо за ваш ответ!');
    setFormData({ name: '', attending: '', drinks: [] });
    setShowRSVP(false);
  };

  const closeRSVP = () => {
    setShowRSVP(false);
  };

  const closeMap = () => {
    setShowMap(false);
  };

  return (
    <div className="bg-gradient-to-b from-rose-50 to-white text-gray-800 font-serif">
      {/* Hero Section */}
      <section 
        id="hero" 
        ref={el => sections.current.hero = el}
        className={`min-h-screen flex items-center justify-center bg-cover bg-center relative transition-all duration-1000 ${
          visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ 
          backgroundImage: `url(${Front})`,
          backgroundColor: 'rgba(255, 255, 255, 0.3)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-pink-100/60 to-rose-100/60"></div>
        <div className="text-center px-6 max-w-4xl z-10">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-rose-600 tracking-wide">WEDDING DAY</h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-800 tracking-wide">Артем & Кристина</h1>
          <div className="flex justify-center gap-6 mb-10 text-2xl font-semibold">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
              <span className="block text-3xl font-bold text-rose-600">{timeLeft.days}</span>
              <span className="text-sm text-gray-600">дней</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
              <span className="block text-3xl font-bold text-rose-600">{timeLeft.hours}</span>
              <span className="text-sm text-gray-600">часов</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
              <span className="block text-3xl font-bold text-rose-600">{timeLeft.minutes}</span>
              <span className="text-sm text-gray-600">минут</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
              <span className="block text-3xl font-bold text-rose-600">{timeLeft.seconds}</span>
              <span className="text-sm text-gray-600">секунд</span>
            </div>
          </div>
          <button 
            onClick={() => setShowRSVP(true)}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-4 px-10 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
          >
            Подтвердить участие
          </button>
        </div>
      </section>

      {/* Location Section */}
      <section 
        id="location" 
        ref={el => sections.current.location = el}
        className={`py-20 px-6 transition-all duration-1000 delay-300 ${
          visibleSections.location ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl shadow-2xl border border-rose-100 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-4xl font-bold mb-4 text-rose-600">ЛОКАЦИЯ</h2>
                <p className="text-2xl mb-4 text-gray-700">Ресторан Небо, отель Lotte Самара</p>
                <p className="text-lg text-gray-600 mb-6">Адрес: ул. Самарская, 110, Самара</p>
                <button 
                  onClick={() => setShowMap(true)}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full md:w-auto"
                >
                  ПОСМОТРЕТЬ НА КАРТЕ
                </button>
              </div>
              <div className="flex-1">
                <img src={Location} alt="Ресторан Небо" className="w-full h-64 object-cover rounded-2xl shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section 
        id="program" 
        ref={el => sections.current.program = el}
        className={`py-20 px-6 transition-all duration-1000 delay-500 ${
          visibleSections.program ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-rose-600">ПРОГРАММА</h2>
          <div className="space-y-8 relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-300 to-pink-300"></div>
            <div className="flex items-center space-x-8 bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-rose-100">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                1
              </div>
              <div className="flex-1">
                <span className="text-2xl font-bold text-rose-600 mr-4">16:30</span>
                <p className="text-lg text-gray-700">Welcome, сбор гостей</p>
              </div>
              <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center space-x-8 bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-rose-100">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                2
              </div>
              <div className="flex-1">
                <span className="text-2xl font-bold text-rose-600 mr-4">17:00</span>
                <p className="text-lg text-gray-700">Начало банкета</p>
              </div>
              <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center space-x-8 bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-rose-100">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                3
              </div>
              <div className="flex-1">
                <span className="text-2xl font-bold text-rose-600 mr-4">22:30</span>
                <p className="text-lg text-gray-700">Завершение торжества</p>
              </div>
              <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dress Code Section */}
      <section 
        id="dress" 
        ref={el => sections.current.dress = el}
        className={`py-20 px-6 transition-all duration-1000 delay-700 ${
          visibleSections.dress ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-rose-600">ДРЕСС - КОД</h2>
          <p className="text-xl mb-8 text-center text-gray-600">
            Мы будем очень рады, если вы поддержите стилистику нашей свадьбы своими нарядами:
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="text-center">
              <img src={Black} className="w-24 h-24 bg-black rounded-full mb-2 shadow-lg border-4 border-white"/>
              <p className="text-sm font-medium text-gray-700">Черный</p>
            </div>
            <div className="text-center">
              <img src={Gold} className="w-24 h-24 bg-amber-100 rounded-full mb-2 shadow-lg border-4 border-white"/>
              <p className="text-sm font-medium text-gray-700">Бежевый</p>
            </div>
            <div className="text-center">
              <img src={Silver} className="w-24 h-24 bg-gray-300 rounded-full mb-2 shadow-lg border-4 border-white"/>
              <p className="text-sm font-medium text-gray-700">Серый</p>
            </div>
            <div className="text-center">
              <img src={Gold} className="w-24 h-24 bg-rose-200 rounded-full mb-2 shadow-lg border-4 border-white"/>
              <p className="text-sm font-medium text-gray-700">Розовый</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img src={Man} alt="Мужчины" className="w-full h-full object-cover rounded-2xl shadow-lg" />
            <img src={Women} alt="Женщины" className="w-full h-full object-cover rounded-2xl shadow-lg" />
          </div>
          <p className="text-xl mt-8 text-center text-gray-600">
            Для вашего вдохновения:
          </p>
        </div>
      </section>

      {/* Photos Section */}
      <section 
        id="photos" 
        ref={el => sections.current.photos = el}
        className={`py-20 px-6 transition-all duration-1000 delay-900 ${
          visibleSections.photos ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-rose-600">НАШИ МОМЕНТЫ</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Подборка наших любимых моментов, которые привели нас к этой важной дате
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid grid-rows-2 gap-6">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                <img src={Set1} alt="Молодожены" className="w-full h-94 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Первая встреча</h3>
                  <p className="text-gray-600">Тот самый день, когда наши пути пересеклись впервые</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                <img src={Set2} alt="Молодожены" className="w-full h-94 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Предложение</h3>
                  <p className="text-gray-600">Самый волнительный момент в нашей жизни</p>
                </div>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-6">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                <img src={Set3} alt="Молодожены" className="w-full h-94 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Путешествие</h3>
                  <p className="text-gray-600">Наши любимые моменты за границей</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                <img src={Set4} alt="Молодожены" className="w-full h-94 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Семья</h3>
                  <p className="text-gray-600">Моменты с нашими близкими и родными</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section 
        id="gallery" 
        ref={el => sections.current.gallery = el}
        className={`py-20 px-6 transition-all duration-1000 delay-1100 ${
          visibleSections.gallery ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-rose-600">ФОТОГРАФИИ СО СВАДЬБЫ</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            После нашей свадьбы здесь появится ссылка на все фотографии, сделанные профессиональным фотографом. 
            Вы сможете скачать понравившиеся снимки и сохранить эти прекрасные моменты навсегда.
          </p>
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl shadow-2xl p-8 border border-rose-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-rose-200 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Фотографии скоро появятся!</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                После нашей свадебной церемонии здесь будет доступна ссылка на Яндекс.Диск с полной коллекцией фотографий. 
                Вы сможете скачать любые понравившиеся снимки и поделиться ими с друзьями.
              </p>
              <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md">
                <div className="flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-lg font-semibold text-gray-800">Ссылка на фото</span>
                </div>
                <p className="text-sm text-gray-500 mb-4 text-center">
                  Ссылка будет активирована после свадьбы
                </p>
                <button className="w-full bg-gradient-to-r from-rose-400 to-pink-400 text-white font-semibold py-3 px-6 rounded-xl opacity-50 cursor-not-allowed" disabled>
                  Скоро доступно
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wishes Section */}
      <section 
        id="wishes" 
        ref={el => sections.current.wishes = el}
        className={`py-20 px-6 transition-all duration-1000 delay-1300 ${
          visibleSections.wishes ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-rose-600">ПОЖЕЛАНИЯ</h2>
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl shadow-2xl border border-rose-100">
            <p className="text-xl mb-6 text-center text-gray-700 leading-relaxed">
              Мы очень ценим ваше присутствие и внимание, поэтому просим не обременять себя выбором подарка, будем благодарны за любой, даже символический, вклад в бюджет нашей будущей семьи.
            </p>
            <p className="text-xl mb-8 text-center text-gray-700 leading-relaxed">
              Если у вас возникнут какие-либо вопросы или вы захотите сделать нам сюрприз, то можете написать нашему организатору:
            </p>
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-2xl font-semibold text-gray-800">+7 917 777-77-77</p>
              </div>
              <p className="text-xl text-gray-600">Анастасия, организатор</p>
            </div>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="bg-white hover:bg-gray-50 text-rose-500 font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Написать</span>
              </a>
              <a href="#" className="bg-white hover:bg-gray-50 text-rose-500 font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
            <h2 className="text-5xl font-bold text-center text-rose-600 mb-4">ЖДЕМ ВАС!</h2>
            <p className="text-center text-gray-600">С любовью, Иван и Анна</p>
          </div>
        </div>
      </section>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[80vh] relative">
            <button 
              onClick={closeMap}
              className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A3a5d8c9d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2&source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Карта проезда"
              ></iframe>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Ресторан Небо, отель Lotte Самара</h3>
              <p className="text-gray-600">Адрес: ул. Самарская, 110, Самара</p>
            </div>
          </div>
        </div>
      )}

      {/* RSVP Section */}
      {showRSVP && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-all duration-500">
          <div className="bg-gradient-to-b from-white to-rose-50 rounded-3xl shadow-2xl p-8 max-w-md w-full transform animate-fadeInDown relative">
            <button 
              onClick={closeRSVP}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">АНКЕТА</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <p className="mb-6 text-center text-gray-600 text-sm">Просим подтвердить своё присутствие до 01.05.2025</p>
              <div className="mb-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Имя и фамилия"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent bg-white/80 backdrop-blur-sm"
                />
              </div>
              <div className="mb-6">
                <label className="block text-left mb-3 font-medium text-gray-700">Сможете ли вы присутствовать?</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100 hover:bg-rose-50 transition-colors">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      onChange={handleInputChange}
                      required
                      className="w-5 h-5 text-rose-500 border-rose-300 focus:ring-rose-500"
                    />
                    <span className="text-gray-700">Смогу/сможем</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100 hover:bg-rose-50 transition-colors">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      onChange={handleInputChange}
                      required
                      className="w-5 h-5 text-rose-500 border-rose-300 focus:ring-rose-500"
                    />
                    <span className="text-gray-700">Прийти не получится</span>
                  </label>
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-left mb-3 font-medium text-gray-700">Предпочтения по напиткам</label>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                  {['Шампанское', 'Белое вино', 'Красное вино', 'Коньяк', 'Водка', 'Виски', 'Не пью'].map((drink) => (
                    <label key={drink} className="flex items-center space-x-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100 hover:bg-rose-50 transition-colors">
                      <input
                        type="checkbox"
                        value={drink}
                        onChange={handleCheckboxChange}
                        className="w-5 h-5 text-rose-500 border-rose-300 rounded focus:ring-rose-500"
                      />
                      <span className="text-gray-700">{drink}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                ПОДТВЕРДИТЬ
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="py-8 text-center text-gray-500 text-sm border-t border-rose-100 bg-rose-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>© 2025 Все права защищены</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <p className="text-xs text-gray-400">Создано с любовью для самой важной даты в нашей жизни</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default App;