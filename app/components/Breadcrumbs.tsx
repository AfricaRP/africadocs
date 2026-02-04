// app/components/Breadcrumbs.tsx
'use client';

import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

// Структура навигации - такая же как в Sidebar
const navigation = [
  {
    title: 'Главная',
    href: '/',
  },
  {
    title: 'Начало работы',
    children: ['/docs/intro', '/docs/installation', '/docs/quickstart'],
  },
  {
    title: 'Игровые системы',
    children: ['/docs/character', '/docs/inventory', '/docs/crafting'],
  },
  {
    title: 'Экономика',
    children: ['/docs/banking', '/docs/jobs', '/docs/business'],
  },
  {
    title: 'Транспорт',
    children: ['/docs/vehicles', '/docs/garage', '/docs/tuning'],
  },
  {
    title: 'Фракции',
    children: ['/docs/police', '/docs/medics', '/docs/gangs'],
  },
  {
    title: 'Недвижимость',
    children: ['/docs/houses', '/docs/apartments'],
  },
  {
    title: 'API Reference',
    children: ['/docs/api/server-events', '/docs/api/client-events', '/docs/api/exports'],
  },
  {
    title: 'Для разработчиков',
    children: ['/docs/dev/guidelines', '/docs/dev/structure', '/docs/dev/contributing'],
  },
  {
    title: 'Настройки',
    children: ['/docs/config', '/docs/permissions'],
  },
];

export function Breadcrumbs() {
  const pathname = usePathname();

  // Ищем категорию
  let category = '';
  
  for (const item of navigation) {
    if (item.href === pathname) {
      category = item.title;
      break;
    }
    if (item.children?.includes(pathname)) {
      category = item.title;
      break;
    }
  }

  // Если не нашли категорию
  if (!category) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-4">
      <span>{category}</span>
    </div>
  );
}