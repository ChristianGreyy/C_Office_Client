import acceptLanguage from 'accept-language';
import { NextRequest, NextResponse } from 'next/server';

import {
  FallbackLang,
  I18nCookieName,
  I18nHeaderName,
  SupportLocales,
} from '@/i18n/configs';

acceptLanguage.languages(SupportLocales);

export const config = {
  // matcher: '/:lng*'
  matcher: [
    '/((?!api|_next/static|_next/images|icons|images|assets|.favicon|sw.js|ads.txt|(?:.*)sitemap.xml|(?:.*)category.xml).*)',
  ],
};

export function middleware(req: NextRequest) {
  let lng: string | undefined | null = req.cookies.get(I18nCookieName)?.value;
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = FallbackLang;

  const paramLng = SupportLocales.find((loc) =>
    req.nextUrl.pathname.startsWith(`/${loc}`),
  );

  // Redirect if lng in path is not supported
  if (!paramLng) {
    const response = NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url),
    );

    response.cookies.set(I18nCookieName, lng);
    response.headers.set(I18nHeaderName, lng);

    return response;
  }

  const response = NextResponse.next();
  response.cookies.set(I18nCookieName, paramLng);
  response.headers.set(I18nHeaderName, paramLng);

  return response;
}
