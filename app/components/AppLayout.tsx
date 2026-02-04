// app/components/AppLayout.tsx
'use client';

import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Основная область */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header с кнопкой темы */}
        <header className="sticky top-0 z-30 h-16 flex items-center justify-end px-4 lg:px-8
                         bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm
                         border-b border-gray-200 dark:border-gray-800">
          <ThemeToggle />
        </header>
        
        {/* Контент страницы с MDX стилями */}
        <main className="flex-1 px-4 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto mdx-content">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 py-6 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 Africa RP. Все права защищены.
          </div>
        </footer>
      </div>
    </div>
  );
}