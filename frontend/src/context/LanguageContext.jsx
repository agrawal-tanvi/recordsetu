import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  fontSizeLevel: 0,
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
  resetFontSize: () => {}
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('recordsetu_lang') || 'en';
  });

  const [fontSizeLevel, setFontSizeLevel] = useState(0);

  const setLanguage = (newLang) => {
    setLanguageState(newLang);
    localStorage.setItem('recordsetu_lang', newLang);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    if (fontSizeLevel === -1) root.style.fontSize = '14px';
    else if (fontSizeLevel === 0) root.style.fontSize = '16px';
    else if (fontSizeLevel === 1) root.style.fontSize = '18px';
    else if (fontSizeLevel === 2) root.style.fontSize = '20px';
  }, [fontSizeLevel]);

  const t = useCallback((key) => {
    if (translations[language] && translations[language][key] !== undefined) {
      return translations[language][key];
    }
    if (translations['en'] && translations['en'][key] !== undefined) {
      return translations['en'][key];
    }
    return key;
  }, [language]);

  const increaseFontSize = () => setFontSizeLevel(prev => Math.min(prev + 1, 2));
  const decreaseFontSize = () => setFontSizeLevel(prev => Math.max(prev - 1, -1));
  const resetFontSize = () => setFontSizeLevel(0);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      fontSizeLevel,
      increaseFontSize,
      decreaseFontSize,
      resetFontSize
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export { LanguageContext };
export default useLanguage;