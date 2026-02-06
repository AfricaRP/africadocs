// app/layout.tsx
import type { Metadata } from 'next';
import { ThemeProvider } from './context/ThemeContext';
import { AppLayout } from './components/AppLayout';
import { NewYearTheme } from './components/NewYearTheme'; // Импортируем снег
import './globals.css';

export const metadata: Metadata = {
  title: 'Документация Africa RP',
  description: 'Официальная документация проекта',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-950">
        <ThemeProvider>
          {/* 1. Снег лежит на уровне z-0 (фон) */}
          <NewYearTheme />
          
          {/* 2. Контент поднимаем на уровень z-10, чтобы он перекрывал снег */}
          <div className="relative z-10">
            <AppLayout>
              {children}
            </AppLayout>
          </div>
          
        </ThemeProvider>
      </body>
    </html>
  );
}