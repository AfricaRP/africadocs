// app/components/AppLayout.tsx
'use client';

import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';
import { TableOfContents } from './TableOfContents';
import { Breadcrumbs } from './Breadcrumbs';
import { MinecraftStatus } from './MinecraftStatus';

// Иконка Discord
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar слева */}
      <Sidebar />
      
      {/* Основная область */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header с кнопками */}
        <header className="sticky top-0 z-30 h-16 flex items-center justify-end gap-4 px-4 lg:px-8 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          {/* Статус Minecraft сервера - ПЕРВЫЙ */}
          <MinecraftStatus />

          {/* Кнопка Discord - ВТОРОЙ */}
          <a
            href="https://discord.gg/MydsqBKh8P"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors duration-200 border-2 border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600 shadow-sm group"
            aria-label="Discord сервер"
          >
            <DiscordIcon className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
          </a>

          {/* Переключатель темы - ТРЕТИЙ */}
          <ThemeToggle />
        </header>
        
        {/* Контент + TOC */}
        <div className="flex-1 relative">
          {/* Контент страницы */}
          <main className="px-4 lg:px-8 xl:pr-72 py-8">
            <div className="max-w-3xl mx-auto">
              {/* Категория */}
              <Breadcrumbs />
              
              {/* MDX контент */}
              <div className="mdx-content">
                {children}
              </div>
            </div>
          </main>

          {/* Table of Contents справа */}
          <aside className="hidden xl:block fixed right-8 top-24 w-64">
            <TableOfContents />
          </aside>
        </div>

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