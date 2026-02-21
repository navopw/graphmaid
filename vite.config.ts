import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/graphmaid/',
  plugins: [react()],
  optimizeDeps: {
    include: ['mermaid', '@monaco-editor/react']
  },
  build: {
    target: 'esnext',
    sourcemap: true,
  }
})
