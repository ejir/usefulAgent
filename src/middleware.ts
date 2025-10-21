import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['zh-CN'],
  defaultLocale: 'zh-CN',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|.*\\..*|api).*)'
  ]
};
