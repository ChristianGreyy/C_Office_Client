'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Language } from './configs';

export const useLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const langParams = params.lang as Language;

  const onChangeLanguage = (lang: Language) => {
    const newPath = pathname.replace(langParams, lang);
    router.replace(newPath);
  };

  return {
    onChangeLanguage,
  };
};
