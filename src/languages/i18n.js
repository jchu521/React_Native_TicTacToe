import I18n from 'react-native-i18n';
import en from './en';
import zh from './zh';

I18n.defaultLocale = 'en';
I18n.Locale = 'en';

I18n.fallbacks = true;

I18n.translations = {
  en,
  zh,
};

export default I18n;
