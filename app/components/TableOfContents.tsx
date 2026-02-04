// app/components/TableOfContents.tsx
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { List, ArrowUp } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const isClickingRef = useRef(false);
  const pathname = usePathname();

  // Собираем заголовки при монтировании и смене страницы
  useEffect(() => {
    // Небольшая задержка чтобы DOM успел обновиться
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.mdx-content h1, .mdx-content h2, .mdx-content h3');
      
      const items: TOCItem[] = Array.from(elements).map((element, index) => {
        if (!element.id) {
          element.id = `heading-${index}`;
        }
        
        return {
          id: element.id,
          text: element.textContent || '',
          level: parseInt(element.tagName[1]),
        };
      });

      setHeadings(items);
      
      if (items.length > 0) {
        setActiveId(items[0].id);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]); // Перезапускаем при смене страницы

  // Функция определения активного заголовка
  const updateActiveHeading = useCallback(() => {
    if (headings.length === 0 || isClickingRef.current) return;

    const headerOffset = 100;
    
    const isAtBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
    
    if (isAtBottom && headings.length > 0) {
      setActiveId(headings[headings.length - 1].id);
      return;
    }

    let currentActiveId = headings[0]?.id || '';

    for (let i = headings.length - 1; i >= 0; i--) {
      const heading = headings[i];
      const element = document.getElementById(heading.id);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        
        if (rect.top <= headerOffset) {
          currentActiveId = heading.id;
          break;
        }
      }
    }

    setActiveId(currentActiveId);
  }, [headings]);

  // Слушаем скролл
  useEffect(() => {
    if (headings.length === 0) return;

    updateActiveHeading();

    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveHeading();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings, updateActiveHeading]);

  // Сбрасываем скролл при смене страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveId(id);
      isClickingRef.current = true;

      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });

      setTimeout(() => {
        isClickingRef.current = false;
      }, 1000);
    }
  };

  const handleScrollToTop = () => {
    if (headings.length > 0) {
      setActiveId(headings[0].id);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="max-h-[calc(100vh-8rem)] overflow-y-auto">
      {/* Заголовок */}
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-900 dark:text-white">
        <List className="w-4 h-4" />
        <span>На этой странице</span>
      </div>

      {/* Список заголовков */}
      <ul className="space-y-1 text-sm border-l border-gray-200 dark:border-gray-700">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => handleClick(heading.id)}
              className={`
                block w-full text-left py-1.5 pr-2 transition-all duration-150
                border-l-2 -ml-px hover:text-gray-900 dark:hover:text-white
                ${activeId === heading.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                }
                ${heading.level === 1 ? 'pl-4 font-semibold' : ''}
                ${heading.level === 2 ? 'pl-4' : ''}
                ${heading.level === 3 ? 'pl-8 text-[13px]' : ''}
              `}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>

      {/* Кнопка "Наверх" */}
      <button
        onClick={handleScrollToTop}
        className="mt-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowUp className="w-4 h-4" />
        Наверх
      </button>
    </nav>
  );
}