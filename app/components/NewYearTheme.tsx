// app/components/NewYearTheme.tsx
'use client';

import { useEffect, useState } from 'react';

const NEW_YEAR_ENABLED = true;
const SNOWFLAKE_COUNT = 50;

interface Snowflake {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function Snow() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: SNOWFLAKE_COUNT }, (_, i) => {
      return {
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 10 + 6,
        duration: Math.random() * 10 + 10, // Скорость падения
        // Отрицательная задержка: чтобы при загрузке снег уже был везде,
        // а не только начинал падать сверху
        delay: -Math.random() * 20, 
        opacity: Math.random() * 0.3 + 0.7,
      };
    });
    setSnowflakes(flakes);
  }, []);

  return (
    // z-[9999] - Снег ПОВЕРХ шапки, чтобы было видно, как он падает с самого верха
    // pointer-events-none - Снег пропускает клики (не мешает сайту)
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden h-screen w-screen">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          // ЦВЕТА: Ледяной голубой (Cyan) для светлой, Белый для темной
          className="absolute text-cyan-500 dark:text-white/90"
          style={{
            // СТАРТОВАЯ ПОЗИЦИЯ:
            // -20vh означает "на 20% выше верхней границы экрана".
            // Снежинка физически находится за пределами браузера в начале.
            top: '-20vh', 
            left: `${flake.left}%`,
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          ❄
        </div>
      ))}
      
      <style jsx global>{`
        @keyframes snowfall {
          0% {
            // Начинаем с исходной точки (-20vh)
            transform: translateY(0) rotate(0deg);
          }
          100% {
            // Падаем вниз на 120% высоты экрана + запас, 
            // чтобы снежинка ушла далеко за подвал сайта
            transform: translateY(140vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export function NewYearTheme() {
  if (!NEW_YEAR_ENABLED) return null;
  return <Snow />;
}

export { NEW_YEAR_ENABLED };