import { defineConfig, Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import Markdown from './plugins/md-loader.js';
import Binary from './plugins/binary-loader.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    {
      name: 'vite-plugin-binary',
      transform(code: string, id: string) {
        if (id.endsWith('?binary')) {
          const buffer = Buffer.from(code);
          return {
            code: `export default new Uint8Array(${JSON.stringify(Array.from(buffer))})`,
            map: null
          };
        }
      }
    },
    Markdown() as Plugin,
    Binary() as Plugin,
  ],
  base: '/wscrcpy/', // 设置为您的 GitHub 仓库名
});
