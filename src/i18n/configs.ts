import { InitOptions } from 'i18next';

export enum Language {
  EN = 'en',
  VN = 'vn',
}

export const SupportLocales = [Language.EN, Language.VN];

export const FallbackLang = Language.EN;

export const DefaultNameSpace = 'Common';

export const I18nCookieName = 'i18next';

export const I18nHeaderName = 'x-i18next';

export const getI18nOptions = (
  lang: Language = FallbackLang,
  ns: string | string[] = DefaultNameSpace,
): InitOptions => ({
  // debug: true,
  supportedLngs: SupportLocales,
  fallbackLng: FallbackLang,
  lng: lang,
  fallbackNS: DefaultNameSpace,
  defaultNS: DefaultNameSpace,
  ns:
    typeof ns === 'string' ? [ns, DefaultNameSpace] : [...ns, DefaultNameSpace],
});
