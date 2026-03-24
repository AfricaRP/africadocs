'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Users } from 'lucide-react';
import { navigation, NavItem } from '../lib/navigation';

function normalizePath(path: string): string {
  if (path === '/') return path;
  return path.endsWith('/') ? path.slice(0, -1) : path;
}

function isLinkActive(href: string | undefined, pathname: string): boolean {
  if (!href) return false;
  return normalizePath(href) === normalizePath(pathname);
}

// Рекурсивная проверка активности любого потомка (включая самого себя)
function isAnyChildActive(item: NavItem, pathname: string): boolean {
  if (item.href && isLinkActive(item.href, pathname)) return true;
  if (item.children) {
    return item.children.some(child => isAnyChildActive(child, pathname));
  }
  return false;
}

// Компонент для обычной ссылки (без детей)
function LinkItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = isLinkActive(item.href, pathname);
  const Icon = item.icon;
  return (
    <Link
      href={item.href || '/'}
      className={`flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-500 text-white font-semibold' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{item.title}</span>
    </Link>
  );
}

// Рекурсивный компонент для любого элемента навигации
function NavItemRenderer({ item, pathname }: { item: NavItem; pathname: string }) {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return <LinkItem item={item} pathname={pathname} />;
  }

  const hasActive = isAnyChildActive(item, pathname);
  const [isOpen, setIsOpen] = useState(hasActive);
  const Icon = item.icon;

  useEffect(() => {
    if (hasActive) {
      setIsOpen(true);
    }
  }, [hasActive]);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors ${
          hasActive 
            ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        <span className="flex items-center gap-2.5">
          {Icon && <Icon className="w-4 h-4" />}
          <span>{item.title}</span>
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && item.children && (
        <div className="ml-4 mt-1 pl-3 space-y-1 border-l-2 border-gray-200 dark:border-gray-700">
          {item.children.map((child, idx) => (
            <NavItemRenderer key={idx} item={child} pathname={pathname} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const renderNavigation = () => (
    <div className="space-y-1">
      {navigation.map((item, idx) => (
        <NavItemRenderer key={idx} item={item} pathname={pathname} />
      ))}

      <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 px-3 text-xs text-gray-500 dark:text-gray-400">
          <Users className="w-4 h-4" />
          <span>Версия: 1.0.0</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-6 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-lg"
      >
        <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className={`lg:hidden fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-950 z-50 transform transition-transform ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-24 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/">
            <img src="/logo.svg" alt="Logo" className="h-12 w-auto" />
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-96px)]">
          {renderNavigation()}
        </div>
      </div>

      <div className="hidden lg:block">
        {renderNavigation()}
      </div>
    </>
  );
}