// app/components/Sidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, 
  BookOpen, 
  Code, 
  Settings, 
  Users, 
  FileText,
  Home,
  Gamepad2,
  Shield,
  Coins,
  Car,
  Building2,
  Menu,
  X
} from 'lucide-react';

// Структура навигации
interface NavItem {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    title: 'Главная',
    href: '/',
    icon: <Home className="w-4 h-4" />,
  },
  {
    title: 'Начало работы',
    icon: <BookOpen className="w-4 h-4" />,
    children: [
      { title: 'Введение', href: '/guides/guide-1' },
      { title: 'Установка', href: '/guides/guide-2' },
    ],
  },
];

// Компонент элемента аккордеона
function AccordionItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href === pathname;
  const hasActiveChild = item.children?.some(child => child.href === pathname);
  
  const [isOpen, setIsOpen] = useState(hasActiveChild);

  useEffect(() => {
    if (hasActiveChild) {
      setIsOpen(true);
    }
  }, [hasActiveChild, pathname]);

  if (hasChildren) {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg
                     transition-all duration-150
                     ${hasActiveChild 
                       ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium' 
                       : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                     }`}
        >
          <span className="flex items-center gap-2.5">
            {item.icon}
            <span>{item.title}</span>
          </span>
          <ChevronDown 
            className={`w-4 h-4 text-gray-500 transition-transform duration-200
                       ${isOpen ? 'rotate-0' : '-rotate-90'}`} 
          />
        </button>
        
        <div
          className={`overflow-hidden transition-all duration-200 ease-in-out
                     ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="ml-4 pl-3 border-l-2 border-gray-200 dark:border-gray-700 mt-1 space-y-1">
            {item.children?.map((child, index) => (
              <AccordionItem key={index} item={child} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href || '#'}
      className={`flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg
                 transition-all duration-150 relative
                 ${isActive 
                   ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-md shadow-blue-500/25' 
                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                 }`}
    >
      {item.icon && (
        <span className={isActive ? 'text-white' : ''}>
          {item.icon}
        </span>
      )}
      <span>{item.title}</span>
      
      {isActive && (
        <span className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
      )}
    </Link>
  );
}

export function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Кнопка мобильного меню */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg 
                   bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700
                   shadow-lg"
        aria-label="Открыть меню"
      >
        <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      {/* Оверлей для мобильного */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 
                   bg-white dark:bg-gray-900 
                   border-r border-gray-200 dark:border-gray-800
                   flex flex-col z-50
                   transition-transform duration-300 ease-in-out
                   ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Заголовок - ТОЛЬКО ЛОГОТИП */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Logo"
              className="w-full h-auto px-4"
            />
          </Link>
          
          {/* Кнопка закрытия на мобильном */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                      transition-colors"
            aria-label="Закрыть меню"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Навигация */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navigation.map((item, index) => (
            <AccordionItem key={index} item={item} />
          ))}
        </nav>

        {/* Футер сайдбара */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Users className="w-4 h-4" />
            <span>Версия: 1.0.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}