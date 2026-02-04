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
  output: 'export',
  basePath: '/my-docs',
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'], // Добавьте эту строку
}

// Создаём конфигурацию MDX с нашими опциями
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: mdxOptions,
})

// Объединяем конфигурацию Next.js с MDX
export default withMDX(nextConfig)