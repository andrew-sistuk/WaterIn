import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgSpritePlugin from 'vite-plugin-svg-sprite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
     svgSpritePlugin({
      symbolId: 'icon-[name]', // Налаштуйте ідентифікатори символів
    })
  ],
  build: {
    sourcemap: true,
  }
})
