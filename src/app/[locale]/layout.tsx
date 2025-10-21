import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Link from 'next/link';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const { locale } = params;

  return (
    <html lang={locale}>
      <body>
        <header className="p-4 border-b border-gray-700 flex items-center gap-4">
          <Link href="/" className="font-semibold">
            仪表盘
          </Link>
          <Link href="/market/BTC" className="opacity-80 hover:opacity-100">
            市场
          </Link>
          <div className="ml-auto text-sm opacity-70">默认语言：zh-CN（中文-中国）</div>
        </header>
        <main className="p-6">
          <NextIntlClientProvider messages={messages} locale={locale} timeZone="Asia/Shanghai">
            {children}
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
