import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['mermaid', '@monaco-editor/react']
  },
  build: {
    target: 'esnext',
    sourcemap: true,
  }
})
