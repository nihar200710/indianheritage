import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  // This MUST match your GitHub repository name exactly!
  base: '/indianheritage/' 
})