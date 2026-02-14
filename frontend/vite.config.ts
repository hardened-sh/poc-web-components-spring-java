import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Gera os arquivos na pasta que o Spring Boot lê
    outDir: '../src/main/resources/static/assets', // Safer: build only into assets subfolder
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // Bundle 1: Web Components para o Legado
        'legado-bundle': './src/entry-legado.tsx',
        // Bundle 2: App React Moderno
        'moderno-app': './src/main.tsx',
      },
      output: {
        // Garante nomes fixos para facilitar o import no Thymeleaf
        entryFileNames: '[name].js', // removed assets/ prefix since outDir is already assets
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        manualChunks: undefined,
      }
    }
  }
});
