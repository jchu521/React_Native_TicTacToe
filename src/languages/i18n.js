import I18n from 'react-native-i18n';
import en from './en';
import zh_cn from './zh_cn';
import zh_tw from './zh_tw';

I18n.defaultLocale = 'en';
I18n.Locale = 'en';

I18n.fallbacks = true;

I18n.translations = {
  'en': en,
  'zh-Hant': zh_tw,
  'zh-Hans': zh_cn,
  'zh_tw': zh_tw,
  'zh_cn': zh_cn,
};

export default I18n;
