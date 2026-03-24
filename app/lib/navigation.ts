import {  
  Home,
  Footprints,
  Stone,
  Pickaxe,
  Info,
  BookAlert,
  Settings,
  Archive,
  LucideIcon
} from 'lucide-react';

export interface NavItem {
  title: string;
  href?: string;
  icon?: LucideIcon; // <-- Меняем тип с string на компонент иконки
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    title: 'Главная',
    href: '/',
    icon: Home,
  },
  {
    title: 'Правила',
    href: 'https://legal.africa-rp.su/',
    icon: BookAlert,
  },
  {
    title: 'Первые шаги',
    href: '/pages/first-steps',
    icon: Footprints,
  },
  {
    title: 'ЧаВо',
    href: '/pages/faq',
    icon: Info,
  },
  {
    title: 'Механики',
    icon: Settings,
    children: [
      { title: 'Уровни', href: '/pages/mechanics/levels' },
    ],
  },
  {
    title: 'Ресурсы',
    icon: Stone,
    children: [
      { title: 'Камень', href: '/pages/materials/rock' },
      { title: 'Палки', href: '/pages/materials/stick' },
      { title: 'Кожа', href: '/pages/materials/leather' },
      { title: 'Трава', href: '/pages/materials/grass' },
    ],
  },
  {
    title: 'Инструменты',
    icon: Pickaxe,
    children: [
      { title: 'Киянка', href: '/pages/tools/mallet' },
      { title: 'Фляга', href: '/pages/tools/flask' },
    ],
  },
  {
    title: 'Шаблоны',
    icon: Archive,
    children: [
      { title: 'Форматирование' , href: '/pages/templates/formatting' },
      { title: 'Правила' , href: '/pages/templates/moderations' }, 
      { title: 'Инструменты', href: '/pages/templates/tools' }
    ],
  },
];

export function findCategoryByPath(pathname: string): string | null {
  const normalizedPathname = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;

  function search(items: NavItem[], parentTitle?: string): string | null {
    for (const item of items) {
      if (item.href) {
        const normalizedHref = item.href.endsWith('/') && item.href !== '/'
          ? item.href.slice(0, -1)
          : item.href;
        if (normalizedHref === normalizedPathname) {
          return parentTitle ?? item.title;
        }
      }
      if (item.children) {
        const result = search(item.children, item.title);
        if (result) return result;
      }
    }
    return null;
  }

  return search(navigation);
}
