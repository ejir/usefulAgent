import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '示例应用',
  description: 'Next.js 14 中文（中国）模板，包含 Prisma + SQLite、next-intl、Tailwind 等配置'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
