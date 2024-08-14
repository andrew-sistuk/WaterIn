import { useTranslation } from 'react-i18next';
import style from './Languages.module.css';
import { useEffect, useState } from 'react';

const Languages = ({ type }) => {
  const { i18n, t } = useTranslation();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const lang = localStorage.getItem('i18nextLng');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function changeLanguageStyle(lang) {
    const h1 = document.querySelector('h1');
    const settingsClassName = style.settings;
    const settingsEl = document.querySelector(`.${settingsClassName}`);

    if (h1) {
      if (viewportWidth < 768) {
        if (lang === 'de' || lang === 'fr') {
          h1.style.fontSize = '30px';
        } else {
          h1.style.fontSize = '38px';
        }
      } else if (viewportWidth >= 768 && viewportWidth < 1440) {
        if (lang === 'de' || lang === 'fr') {
          h1.style.fontSize = '58px';
        } else {
          h1.style.fontSize = '64px';
        }
      } else {
        if (lang === 'de' || lang === 'fr') {
          h1.style.fontSize = '62px';
        } else {
          h1.style.fontSize = '80px';
        }
      }
    }

    if (settingsEl) {
      if (viewportWidth < 768) {
        setShow(false);
      } else {
        setShow(true);
      }
    } else {
      setShow(false);
    }
    // document.body.style.fontFamily = lang === 'ua' ? 'Oswald, sans-serif' : 'Poppins, sans-serif';
  }

  const changeLanguage = lng => {
    changeLanguageStyle(lng);
    i18n.changeLanguage(lng);
  };

  const handleLanguageChange = event => {
    changeLanguage(event.target.value);
  };

  useEffect(() => {
    changeLanguageStyle(lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewportWidth]);

  return (
    <div className={type ? style.settings : style.languageSelector}>
      <span className={style.languageLabel}>{show === true && t('language')}</span>

      <select
        value={i18n.language || 'en'}
        onChange={handleLanguageChange}
        className={style.languageSelect}
      >
        <option value="en">ENG</option>
        <option value="ua">UKR</option>
        <option value="pl">POL</option>
        <option value="de">GER</option>
        <option value="fr">FRA</option>
        <option value="it">ITA</option>
        <option value="no">NOR</option>
      </select>
    </div>
  );
};

export default Languages;
