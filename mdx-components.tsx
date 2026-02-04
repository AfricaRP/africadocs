// mdx-components.tsx (в корне проекта, рядом с app/)
import type { MDXComponents } from 'mdx/types';
import { Code } from './app/components/Code';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Заголовки
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 mt-8 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4 mt-8 pb-2 border-b border-gray-200 dark:border-gray-700">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-2 mt-4">
        {children}
      </h4>
    ),
    
    // Параграфы
    p: ({ children }) => (
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-7">
        {children}
      </p>
    ),
    
    // Ссылки
    a: ({ href, children }) => (
      <a 
        href={href} 
        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    
    // Списки
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-gray-700 dark:text-gray-300">
        {children}
      </li>
    ),
    
    // Код
    code: ({ children, className }) => {
      // Инлайн код (без языка)
      if (!className) {
        return (
          <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 rounded text-sm font-mono">
            {children}
          </code>
        );
      }
      // Блок кода - используй Code Hike компонент
      return <code className={className}>{children}</code>;
    },
    
    pre: ({ children }) => (
      <pre className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    
    // Цитаты
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
        {children}
      </blockquote>
    ),
    
    // Горизонтальная линия
    hr: () => (
      <hr className="my-8 border-gray-200 dark:border-gray-700" />
    ),
    
    // Таблицы
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-50 dark:bg-gray-800">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr>{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
        {children}
      </td>
    ),
    
    // Изображения
    img: ({ src, alt }) => (
      <img 
        src={src} 
        alt={alt} 
        className="rounded-lg shadow-md my-4 max-w-full h-auto"
      />
    ),
    
    // Жирный текст
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900 dark:text-white">
        {children}
      </strong>
    ),
    
    // Курсив
    em: ({ children }) => (
      <em className="italic text-gray-700 dark:text-gray-300">
        {children}
      </em>
    ),
    
    // Code Hike компонент
    Code,
    
    ...components,
  };
}