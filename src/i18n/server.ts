import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { headers } from 'next/headers';
import { initReactI18next } from 'react-i18next/initReactI18next';

import {
  FallbackLang,
  I18nHeaderName,
  Language,
  getI18nOptions,
} from '@/i18n/configs';

const initI18next = async (lang: Language, ns?: string | string[]) => {
  const i18next = createInstance();

  await i18next
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init({
      ...getI18nOptions(lang, ns),
    });

  return i18next;
};

export const getServerTranslation = async (
  lang?: Language,
  ns?: string | string[],
  options: any = {},
): Promise<{ t: any; i18n: any }> => {
  const localLang = getAppLanguage();
  const i18nextInstance = await initI18next(lang ?? localLang, ns);
  return {
    t: i18nextInstance.t,
    i18n: i18nextInstance,
  };
};

export const getAppLanguage = (): Language => {
  const preference = headers().get(I18nHeaderName);
  const lng = (preference ?? FallbackLang) as Language;

  return lng;
};
