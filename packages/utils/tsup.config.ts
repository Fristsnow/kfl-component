import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts', 'autoRouter.ts', 'create.ts', 'with-install.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['vue', 'vue-router']
})