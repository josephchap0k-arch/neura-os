import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { codexEndpointPlugin } from './server/codexEndpoint.js';

export default defineConfig({
  plugins: [react(), codexEndpointPlugin()],
});
