import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ]
  },
  define: {
    'process.env.REACT_APP_SECRET_KEY': JSON.stringify(process.env.VITE_REACT_APP_SECRET_KEY),
  },
});