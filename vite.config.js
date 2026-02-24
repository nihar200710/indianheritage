import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  // Replace 'indian-heritage-frontend' with your EXACT GitHub repository name
  base: '/indian-heritage-frontend/' 
})