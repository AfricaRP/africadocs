// app/components/Expandable.tsx
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ExpandableProps {
  title: string;
  titleOpen?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Expandable({ title, titleOpen, children, defaultOpen = false }: ExpandableProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const displayTitle = isOpen ? (titleOpen || title) : title;

  return (
    <div className="my-4 rounded-xl border-2 border-indigo-300 dark:border-indigo-600 overflow-hidden shadow-lg shadow-indigo-100 dark:shadow-indigo-950/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-4 bg-indigo-100 dark:bg-indigo-900/40 hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition-colors text-left"
      >
        <span className="font-semibold text-indigo-900 dark:text-indigo-100">
          {displayTitle}
        </span>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-200 dark:bg-indigo-800">
          <ChevronDown
            className={`w-5 h-5 text-indigo-700 dark:text-indigo-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 bg-indigo-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm leading-relaxed border-t-2 border-indigo-300 dark:border-indigo-600">
          {children}
        </div>
      </div>
    </div>
  );
}