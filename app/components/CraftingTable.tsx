import craftingTableBg from '../images/crafting_table.png';

// ===== Размеры оригинальной текстуры =====
const BG_WIDTH = 118;
const BG_HEIGHT = 56;
const SLOT_SIZE = 16;
const RESULT_SLOT_SIZE = 24;

// ===== Координаты слотов =====
const GRID_POSITIONS: [number, number][] = [
  [2, 2],  [20, 2],  [38, 2],
  [2, 20], [20, 20], [38, 20],
  [2, 38], [20, 38], [38, 38],
];

const RESULT_POSITION: [number, number] = [92, 16];

// ===== Типы =====

/**
 * Формат ячейки — простая строка с разделителем "|":
 *
 *   "diamond"                        → только картинка
 *   "diamond|Алмаз"                  → картинка + тултип
 *   "diamond|Алмаз|/items/diamond"   → картинка + тултип + ссылка
 *
 *   null / undefined                 → пустой слот
 */
type CraftingCell = string | null | undefined;

interface CraftingTableProps {
  /** 3×3 сетка. Каждая ячейка — "src", "src|name" или "src|name|link" */
  grid?: CraftingCell[][];
  /** Результат — тот же формат строки */
  result?: CraftingCell;
  /** Количество предметов в результате (отображается если > 1) */
  resultCount?: number;
  /** Масштаб пиксель-арта. По умолчанию 4 */
  scale?: number;
  /** Заголовок над верстаком */
  title?: string;
  /** Размещение: left (по умолчанию), center, right */
  align?: 'left' | 'center' | 'right';
}

// ===== Хелперы =====

function resolveImageSrc(src: string): string {
  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('/') ||
    src.startsWith('./') ||
    src.startsWith('../')
  ) {
    return src;
  }
  const hasExtension = /\.\w+$/.test(src);
  return `/images/${hasExtension ? src : `${src}.png`}`;
}

interface ResolvedItem {
  src: string;
  name?: string;
  link?: string;
}

/**
 * Парсит строку "src|name|link" в объект.
 */
function parseCell(cell: CraftingCell): ResolvedItem | null {
  if (!cell) return null;

  const parts = cell.split('|').map((s) => s.trim());
  const [rawSrc, name, link] = parts;

  if (!rawSrc) return null;

  return {
    src: resolveImageSrc(rawSrc),
    name: name || undefined,
    link: link || undefined,
  };
}

const ALIGN_CLASS = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
} as const;

// ===== Компонент слота =====

interface SlotProps {
  item: ResolvedItem;
  size: number;
  scale: number;
  containerSize?: number;
  count?: number;
}

function Slot({ item, size, scale, containerSize, count }: SlotProps) {
  const container = containerSize ?? size;
  const offset = ((container - size) / 2) * scale;

  // ===== Minecraft stack count sizing =====
  // MC: 8px font при 16px слоте (1x GUI), shadow = 1px → всё × scale
  const stackFontSize = size * scale * 0.5;       // 32px при scale=4
  const stackShadow = scale;                       // 4px при scale=4 (= 1 MC-пиксель)
  const stackOffsetRight = scale;                  // отступ от правого края
  const stackOffsetBottom = Math.round(scale * 0.5); // отступ от нижнего края

  // ===== Tooltip sizing =====
  const tooltipFontSize = Math.max(12, scale * 4);
  const tooltipShadow = Math.max(1, Math.floor(tooltipFontSize / 8));
  const tooltipPadX = Math.max(6, Math.round(tooltipFontSize * 0.5));
  const tooltipPadY = Math.max(4, Math.round(tooltipFontSize * 0.35));
  const innerBorder = Math.max(2, Math.round(scale * 0.5));
  const outerBorder = Math.max(1, Math.round(scale * 0.25));

  const img = (
    <img
      src={item.src}
      alt={item.name ?? ''}
      style={{
        position: 'absolute',
        left: offset,
        top: offset,
        width: size * scale,
        height: size * scale,
        imageRendering: 'pixelated',
      }}
      draggable={false}
    />
  );

  const highlight = (
    <div
      className="absolute opacity-0 group-hover/slot:opacity-100 transition-opacity duration-75 pointer-events-none"
      style={{
        left: 0,
        top: 0,
        width: container * scale,
        height: container * scale,
        backgroundColor: 'rgba(255,255,255,0.25)',
      }}
    />
  );

  const hitbox = item.link ? (
    <a href={item.link} className="absolute inset-0 z-10">
      {highlight}
    </a>
  ) : (
    <div className="absolute inset-0 z-10">
      {highlight}
    </div>
  );

  return (
    <div
      className="group/slot absolute"
      style={{
        width: container * scale,
        height: container * scale,
      }}
    >
      {img}
      {hitbox}

      {/* ====== Minecraft Stack Count ====== */}
      {count != null && count > 1 && (
        <span
          className="absolute pointer-events-none z-20"
          style={{
            right: stackOffsetRight,
            bottom: stackOffsetBottom,
            fontSize: stackFontSize,
            lineHeight: 1,
            fontFamily: "'MyFont', monospace",
            color: '#FFFFFF',
            textShadow: `${stackShadow}px ${stackShadow}px 0px #3F3F3F`,
            // Убираем сглаживание — пиксельный шрифт должен быть чётким
            WebkitFontSmoothing: 'none' as any,
            MozOsxFontSmoothing: 'grayscale' as any,
            fontSmooth: 'never' as any,
          }}
        >
          {count}
        </span>
      )}

      {/* ====== Minecraft Tooltip ====== */}
      {item.name && (
        <div
          className="
            absolute left-1/2 -translate-x-1/2 bottom-full mb-1
            opacity-0 invisible
            group-hover/slot:opacity-100 group-hover/slot:visible
            transition-opacity duration-100
            z-50 pointer-events-none whitespace-nowrap
          "
        >
          <div
            style={{
              padding: outerBorder,
              background: '#000000',
              borderRadius: 0,
            }}
          >
            <div
              style={{
                padding: innerBorder,
                background: '#100010',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#100010',
                  borderWidth: innerBorder,
                  borderStyle: 'solid',
                  borderImage: 'linear-gradient(180deg, #5000FF80, #28007F80) 1',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'relative',
                  background: '#100010',
                  paddingLeft: tooltipPadX,
                  paddingRight: tooltipPadX,
                  paddingTop: tooltipPadY,
                  paddingBottom: tooltipPadY,
                }}
              >
                <span
                  style={{
                    color: '#FFFFFF',
                    fontSize: tooltipFontSize,
                    lineHeight: 1,
                    fontFamily: "'MyFont', monospace",
                    textShadow: `${tooltipShadow}px ${tooltipShadow}px 0px #3F3F3F`,
                    letterSpacing: '0.5px',
                  }}
                >
                  {item.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== Основной компонент =====

export function CraftingTable({
  grid = [],
  result,
  resultCount,
  scale = 4,
  title,
  align = 'left',
}: CraftingTableProps) {
  const width = BG_WIDTH * scale;
  const height = BG_HEIGHT * scale;

  const resolvedResult = parseCell(result);

  return (
    <div className={`my-6 flex ${ALIGN_CLASS[align]} not-prose`}>
      <div className="inline-flex flex-col items-start">
        {title && (
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {title}
          </div>
        )}

        <div className="relative select-none" style={{ width, height }}>
          <img
            src={craftingTableBg.src}
            alt="Crafting Table"
            width={width}
            height={height}
            className="block"
            style={{ imageRendering: 'pixelated' }}
            draggable={false}
          />

          {/* Сетка 3×3 */}
          {GRID_POSITIONS.map(([x, y], index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const item = parseCell(grid[row]?.[col]);

            if (!item) return null;

            return (
              <div
                key={`slot-${index}`}
                style={{
                  position: 'absolute',
                  left: x * scale,
                  top: y * scale,
                }}
              >
                <Slot item={item} size={SLOT_SIZE} scale={scale} />
              </div>
            );
          })}

          {/* Результат */}
          {resolvedResult && (
            <div
              style={{
                position: 'absolute',
                left: RESULT_POSITION[0] * scale,
                top: RESULT_POSITION[1] * scale,
              }}
            >
              <Slot
                item={resolvedResult}
                size={SLOT_SIZE}
                containerSize={RESULT_SLOT_SIZE}
                scale={scale}
                count={resultCount}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}