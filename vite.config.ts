import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { generateSitemap } from './scripts/generateSitemap';
import { execSync } from 'child_process';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-sitemap',
      closeBundle: async () => {
        console.log('🔧 Running sitemap generation...');
        await generateSitemap();
      }
    },
    {
      name: 'generate-static-blogs',
      closeBundle: async () => {
        console.log('🔧 Running static blog generation...');
        try {
          execSync('npm run generate-blogs', { stdio: 'inherit' });
        } catch (error) {
          console.error('❌ Static blog generation failed:', error);
        }
      }
    },

  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:54321/functions/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          helmet: ['react-helmet-async']
        }
      },
      input: {
        main: 'index.html'
        // Static blog posts will be added dynamically during build
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
