import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts"
import {resolve} from 'path'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      // insertTypesEntry: true,
      // outputDir: 'dist/types',
      // copyDtsFiles: true,
      rollupTypes: true, // 整合.d.ts文件
      // cleanVueFileName: true, // 将.vue.d.ts 改为.d.ts
      include: 'packages', // 包含的文件目录
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './packages/index.ts'),
      name: pkg.name,
      formats: ['cjs', 'es', 'umd'],
      // fileName: format => `${pkg.name}.${format}.js`
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
