import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [siteData, setSiteData] = useState({
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
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
    } else {
      alert('Неверный пароль!');
    }
  };

  const handleLogout = () => {
    if (hasUnsavedChanges) {
      if (!confirm('У вас есть несохраненные изменения. Вы уверены, что хотите выйти?')) {
        return;
      }
    }
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  const handleSave = () => {
    console.log('Admin: Сохраняем данные:', siteData);
    localStorage.setItem('siteData', JSON.stringify(siteData));
    const saveCount = parseInt(localStorage.getItem('saveCount') || '0') + 1;
    localStorage.setItem('saveCount', saveCount.toString());
    localStorage.setItem('lastSave', new Date().toISOString());
    setHasUnsavedChanges(false);
    
    // Принудительно обновляем данные на основном сайте
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'siteData',
      newValue: JSON.stringify(siteData)
    }));
    
    // Дополнительно отправляем кастомное событие для надежности
    window.dispatchEvent(new CustomEvent('siteDataUpdated', {
      detail: { siteData: siteData }
    }));
    
    // Вызываем глобальную функцию обновления
    if (window.refreshSiteData) {
      window.refreshSiteData();
    }
    
    console.log('Admin: События отправлены');
    alert('Данные успешно сохранены!');
  };

  const handleReset = () => {
    if (confirm('Вы уверены, что хотите сбросить все изменения?')) {
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
      setSiteData(defaultData);
      localStorage.removeItem('siteData');
      setHasUnsavedChanges(false);
      alert('Данные сброшены к исходным значениям!');
    }
  };

  const handleDataChange = (newData) => {
    setSiteData(newData);
    setHasUnsavedChanges(true);
  };

  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuthenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }

    const savedData = localStorage.getItem('siteData');
    if (savedData) {
      setSiteData(JSON.parse(savedData));
    }
  }, []);

  // Предупреждение при попытке покинуть страницу с несохраненными изменениями
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <div className="login-header">
            <h2>🔐 Вход в админ-панель</h2>
            <p>Управление содержимым сайта</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Пароль администратора</label>
              <input
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">
              <span>🚀 Войти в админку</span>
            </button>
          </form>
          <div className="login-footer">
            <p className="login-hint">💡 Пароль: admin123</p>
            <Link to="/" className="back-to-site">
              ← Вернуться на сайт
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="header-left">
          <h1>🎛️ Админ-панель</h1>
          {hasUnsavedChanges && (
            <span className="unsaved-indicator">⚠️ Есть несохраненные изменения</span>
          )}
        </div>
        <div className="admin-actions">
          <button 
            onClick={() => setShowPreview(!showPreview)} 
            className={`preview-btn ${showPreview ? 'active' : ''}`}
          >
            👁️ {showPreview ? 'Скрыть' : 'Показать'} предпросмотр
          </button>
          <button onClick={handleSave} className="save-btn" disabled={!hasUnsavedChanges}>
            💾 Сохранить
          </button>
          <button onClick={handleReset} className="reset-btn">
            🔄 Сбросить
          </button>
          <Link to="/" className="view-site-btn">
            🌐 Посмотреть сайт
          </Link>
          <button 
            onClick={() => {
              // Отправляем события
              window.dispatchEvent(new StorageEvent('storage', {
                key: 'siteData',
                newValue: JSON.stringify(siteData)
              }));
              window.dispatchEvent(new CustomEvent('siteDataUpdated', {
                detail: { siteData: siteData }
              }));
              
              // Вызываем глобальную функцию обновления
              if (window.refreshSiteData) {
                window.refreshSiteData();
              }
              
              console.log('Admin: Обновление данных на основном сайте');
              alert('Данные обновлены на основном сайте!');
            }} 
            className="refresh-btn"
            title="Обновить данные на основном сайте"
          >
            🔄 Обновить
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Выйти
          </button>
        </div>
      </header>

      <div className="admin-content">
        <nav className="admin-nav">
          <div className="nav-section">
            <h3>📝 Редактирование</h3>
            <button 
              className={activeTab === 'hero' ? 'active' : ''} 
              onClick={() => setActiveTab('hero')}
            >
              🏠 Главная секция
            </button>
            <button 
              className={activeTab === 'about' ? 'active' : ''} 
              onClick={() => setActiveTab('about')}
            >
              👤 О себе
            </button>
            <button 
              className={activeTab === 'services' ? 'active' : ''} 
              onClick={() => setActiveTab('services')}
            >
              🛠️ Услуги
            </button>
            <button 
              className={activeTab === 'testimonials' ? 'active' : ''} 
              onClick={() => setActiveTab('testimonials')}
            >
              💬 Отзывы
            </button>
            <button 
              className={activeTab === 'contact' ? 'active' : ''} 
              onClick={() => setActiveTab('contact')}
            >
              📞 Контакты
            </button>
          </div>
          
          <div className="nav-section">
            <h3>📊 Статистика</h3>
            <div className="stats-item">
              <span>Сохранений:</span>
              <span className="stats-value">{localStorage.getItem('saveCount') || 0}</span>
            </div>
            <div className="stats-item">
              <span>Последнее обновление:</span>
              <span className="stats-value">
                {localStorage.getItem('lastSave') ? 
                  new Date(localStorage.getItem('lastSave')).toLocaleString('ru-RU') : 
                  'Нет данных'
                }
              </span>
            </div>
          </div>
        </nav>

        <div className="admin-main">
          {showPreview && (
            <div className="preview-panel">
              <h3>👁️ Предварительный просмотр</h3>
              <div className="preview-content">
                {activeTab === 'hero' && <HeroPreview data={siteData.hero} />}
                {activeTab === 'about' && <AboutPreview data={siteData.about} />}
                {activeTab === 'services' && <ServicesPreview data={siteData.services} />}
                {activeTab === 'testimonials' && <TestimonialsPreview data={siteData.testimonials} />}
                {activeTab === 'contact' && <ContactPreview data={siteData.contact} />}
              </div>
            </div>
          )}

          <div className="editor-section">
            {activeTab === 'hero' && (
              <HeroEditor data={siteData.hero} onChange={(hero) => handleDataChange({...siteData, hero})} />
            )}
            {activeTab === 'about' && (
              <AboutEditor data={siteData.about} onChange={(about) => handleDataChange({...siteData, about})} />
            )}
            {activeTab === 'services' && (
              <ServicesEditor data={siteData.services} onChange={(services) => handleDataChange({...siteData, services})} />
            )}
            {activeTab === 'testimonials' && (
              <TestimonialsEditor data={siteData.testimonials} onChange={(testimonials) => handleDataChange({...siteData, testimonials})} />
            )}
            {activeTab === 'contact' && (
              <ContactEditor data={siteData.contact} onChange={(contact) => handleDataChange({...siteData, contact})} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Компоненты предварительного просмотра
const HeroPreview = ({ data }) => {
  return (
    <div className="preview-section">
      <h3>Главная секция</h3>
      <h1>{data.title1}</h1>
      <h2>{data.title2}</h2>
      <p>{data.subtitle}</p>
      <p>{data.description}</p>
      <p><strong>Интересы:</strong> {data.interests}</p>
      <p><strong>Миссия:</strong> {data.mission}</p>
    </div>
  );
};

const AboutPreview = ({ data }) => {
  return (
    <div className="preview-section">
      <h3>О себе</h3>
      <h4>Опыт работы:</h4>
      <ul>
        {data.experience.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p><strong>Авторская методика:</strong> {data.methodology}</p>
      <p><strong>Энергия и интуиция:</strong> {data.energy}</p>
      <p><strong>Партнерство и поддержка:</strong> {data.partnership}</p>
    </div>
  );
};

const ServicesPreview = ({ data }) => {
  return (
    <div className="preview-section">
      <h3>Услуги</h3>
      <h4>Основные услуги:</h4>
      <ul>
        {data.main.map((service, index) => (
          <li key={index}>
            <strong>{service.title}:</strong> {service.description}
          </li>
        ))}
      </ul>
      <h4>Дополнительные услуги:</h4>
      <ul>
        {data.additional.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const TestimonialsPreview = ({ data }) => {
  return (
    <div className="preview-section">
      <h3>Отзывы</h3>
      {data.map((testimonial, index) => (
        <div key={index} className="testimonial-preview-item">
          <h4>{testimonial.name} ({testimonial.position})</h4>
          <p>{testimonial.quote}</p>
        </div>
      ))}
    </div>
  );
};

const ContactPreview = ({ data }) => {
  return (
    <div className="preview-section">
      <h3>Контакты</h3>
      <p><strong>Название компании:</strong> {data.company}</p>
      <p><strong>ИНН:</strong> {data.inn}</p>
      <p><strong>ОГРНИП:</strong> {data.ogrnip}</p>
      <p><strong>Телефон:</strong> {data.phone}</p>
      <p><strong>Telegram:</strong> {data.telegram}</p>
      <p><strong>Email:</strong> {data.email}</p>
    </div>
  );
};

// Компоненты редакторов
const HeroEditor = ({ data, onChange }) => {
  return (
    <div className="editor-section">
      <h3>Редактирование главной секции</h3>
      <div className="form-group">
        <label>Заголовок 1:</label>
        <input
          type="text"
          value={data.title1}
          onChange={(e) => onChange({...data, title1: e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>Заголовок 2:</label>
        <input
          type="text"
          value={data.title2}
          onChange={(e) => onChange({...data, title2: e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>Подзаголовок:</label>
        <textarea
          value={data.subtitle}
          onChange={(e) => onChange({...data, subtitle: e.target.value})}
          rows="2"
        />
      </div>
      <div className="form-group">
        <label>Описание:</label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({...data, description: e.target.value})}
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Интересы:</label>
        <textarea
          value={data.interests}
          onChange={(e) => onChange({...data, interests: e.target.value})}
          rows="2"
        />
      </div>
      <div className="form-group">
        <label>Миссия:</label>
        <textarea
          value={data.mission}
          onChange={(e) => onChange({...data, mission: e.target.value})}
          rows="2"
        />
      </div>
    </div>
  );
};

const AboutEditor = ({ data, onChange }) => {
  const updateExperience = (index, value) => {
    const newExperience = [...data.experience];
    newExperience[index] = value;
    onChange({...data, experience: newExperience});
  };

  return (
    <div className="editor-section">
      <h3>Редактирование раздела "О себе"</h3>
      
      <div className="form-group">
        <label>Опыт работы:</label>
        {data.experience.map((item, index) => (
          <textarea
            key={index}
            value={item}
            onChange={(e) => updateExperience(index, e.target.value)}
            rows="2"
            placeholder={`Пункт ${index + 1}`}
          />
        ))}
      </div>

      <div className="form-group">
        <label>Авторская методика:</label>
        <textarea
          value={data.methodology}
          onChange={(e) => onChange({...data, methodology: e.target.value})}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>Энергия и интуиция:</label>
        <textarea
          value={data.energy}
          onChange={(e) => onChange({...data, energy: e.target.value})}
          rows="4"
        />
      </div>

      <div className="form-group">
        <label>Партнерство и поддержка:</label>
        <textarea
          value={data.partnership}
          onChange={(e) => onChange({...data, partnership: e.target.value})}
          rows="3"
        />
      </div>
    </div>
  );
};

const ServicesEditor = ({ data, onChange }) => {
  const updateMainService = (index, field, value) => {
    const newMain = [...data.main];
    newMain[index] = {...newMain[index], [field]: value};
    onChange({...data, main: newMain});
  };

  const updateAdditionalService = (index, value) => {
    const newAdditional = [...data.additional];
    newAdditional[index] = value;
    onChange({...data, additional: newAdditional});
  };

  return (
    <div className="editor-section">
      <h3>Редактирование услуг</h3>
      
      <div className="services-section">
        <h4>Основные услуги:</h4>
        {data.main.map((service, index) => (
          <div key={index} className="service-item">
            <h5>Услуга {index + 1}</h5>
            <div className="form-group">
              <label>Название:</label>
              <input
                type="text"
                value={service.title}
                onChange={(e) => updateMainService(index, 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Описание:</label>
              <textarea
                value={service.description}
                onChange={(e) => updateMainService(index, 'description', e.target.value)}
                rows="3"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="services-section">
        <h4>Дополнительные услуги:</h4>
        {data.additional.map((service, index) => (
          <div key={index} className="form-group">
            <label>Услуга {index + 1}:</label>
            <textarea
              value={service}
              onChange={(e) => updateAdditionalService(index, e.target.value)}
              rows="3"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const TestimonialsEditor = ({ data, onChange }) => {
  const updateTestimonial = (index, field, value) => {
    const newTestimonials = [...data];
    newTestimonials[index] = {...newTestimonials[index], [field]: value};
    onChange(newTestimonials);
  };

  return (
    <div className="editor-section">
      <h3>Редактирование отзывов</h3>
      
      {data.map((testimonial, index) => (
        <div key={index} className="testimonial-item">
          <h4>Отзыв {index + 1}</h4>
          <div className="form-group">
            <label>Имя:</label>
            <input
              type="text"
              value={testimonial.name}
              onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Должность:</label>
            <input
              type="text"
              value={testimonial.position}
              onChange={(e) => updateTestimonial(index, 'position', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Отзыв:</label>
            <textarea
              value={testimonial.quote}
              onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
              rows="4"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const ContactEditor = ({ data, onChange }) => {
  return (
    <div className="editor-section">
      <h3>Редактирование контактов</h3>
      
      <div className="form-group">
        <label>Название компании:</label>
        <input
          type="text"
          value={data.company}
          onChange={(e) => onChange({...data, company: e.target.value})}
        />
      </div>
      
      <div className="form-group">
        <label>ИНН:</label>
        <input
          type="text"
          value={data.inn}
          onChange={(e) => onChange({...data, inn: e.target.value})}
        />
      </div>
      
      <div className="form-group">
        <label>ОГРНИП:</label>
        <input
          type="text"
          value={data.ogrnip}
          onChange={(e) => onChange({...data, ogrnip: e.target.value})}
        />
      </div>
      
      <div className="form-group">
        <label>Телефон:</label>
        <input
          type="text"
          value={data.phone}
          onChange={(e) => onChange({...data, phone: e.target.value})}
        />
      </div>
      
      <div className="form-group">
        <label>Telegram:</label>
        <input
          type="text"
          value={data.telegram}
          onChange={(e) => onChange({...data, telegram: e.target.value})}
        />
      </div>
      
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange({...data, email: e.target.value})}
        />
      </div>
    </div>
  );
};

export default Admin; 