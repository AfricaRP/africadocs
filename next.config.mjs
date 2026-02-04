import { remarkCodeHike, recmaCodeHike } from "codehike/mdx"
import createMDX from '@next/mdx'

/** @type {import('codehike/mdx').CodeHikeConfig} */
const chConfig = {
  components: { code: "Code" },
}

const mdxOptions = {
  remarkPlugins: [[remarkCodeHike, chConfig]],
  recmaPlugins: [[recmaCodeHike, chConfig]],
  jsx: true,
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Критически важно для GitHub Pages:
  output: 'export',
  // Базовая настройка для кастомного домена (можно оставить пустым):
  basePath: '',
  // Для корректной работы навигации со статическим экспортом:
  trailingSlash: true,
}

// Создаём конфигурацию MDX с нашими опциями
const withMDX = createMDX({
  extension: /\.mdx$/,
  options: mdxOptions,
})

// Объединяем конфигурацию Next.js с MDX
export default withMDX(nextConfig)