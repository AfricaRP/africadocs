// app/components/Code.tsx
'use client';

import { highlight } from 'codehike/code';

interface CodeProps {
  codeblock: {
    value: string;
    lang: string;
    meta?: string;
  };
}

export async function Code({ codeblock }: CodeProps) {
  const highlighted = await highlight(codeblock, 'github-dark');
  
  return (
    <div className="my-4 rounded-lg overflow-hidden">
      {codeblock.meta && (
        <div className="bg-gray-800 px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
          {codeblock.meta}
        </div>
      )}
      <pre 
        className="bg-gray-900 p-4 overflow-x-auto"
        style={{ backgroundColor: highlighted.style?.backgroundColor }}
      >
        <code dangerouslySetInnerHTML={{ __html: highlighted.code }} />
      </pre>
    </div>
  );
}