import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { stylex } from 'vite-plugin-stylex-dev';
import fs from 'fs';

export default defineConfig({
 plugins: [
  react(),
  stylex({
   classNamePrefix: 'u',
  }),
 ],
 build: {
  outDir: 'dist',
  minify: 'terser',
  terserOptions: {
   compress: {
    drop_console: true,
    drop_debugger: true,
    passes: 2,
   },
   mangle: {
    toplevel: true,
    safari10: true,
   },
   format: {
    comments: false,
   },
  },
  rollupOptions: {
   output: {
    assetFileNames: 'assets/[name]-[hash][extname]',
    chunkFileNames: 'assets/[name]-[hash].js',
    entryFileNames: 'assets/[name]-[hash].js',
    manualChunks(id) {
      if (id.includes('node_modules')) {
        return 'vendor';
      }
    }
   },
  },
 },
 server: {
  ...(fs.existsSync('./192.168.1.48+3-key.pem') &&
   fs.existsSync('./192.168.1.48+3.pem')
   ? {
    https: {
     key: fs.readFileSync('./192.168.1.48+3-key.pem'),
     cert: fs.readFileSync('./192.168.1.48+3.pem'),
    },
   }
   : {}),
  host: '0.0.0.0',
  port: 5175,
 },
});