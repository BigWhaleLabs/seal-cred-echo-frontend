import { defineConfig, Plugin } from 'vite'
import preact from '@preact/preset-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
import inject from '@rollup/plugin-inject'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import removeConsole from 'vite-plugin-remove-console'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  resolve: {
    alias: {
      http: 'rollup-plugin-node-polyfills/polyfills/http',
      https: 'rollup-plugin-node-polyfills/polyfills/http',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
    },
  },
  server: { https: false },
  plugins: [mkcert, preact(), tsconfigPaths()],
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          gzipSize: true,
          brotliSize: true,
        }) as unknown as Plugin,
        nodePolyfills() as unknown as Plugin,
        inject({
          Buffer: ['buffer', 'Buffer'],
        }),
        removeConsole(),
      ],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [GlobalsPolyfills({ buffer: true })],
    },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
})
