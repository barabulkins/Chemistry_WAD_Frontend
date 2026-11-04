import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function mockApiPlugin(): Plugin {
  return {
    name: 'mock-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/api/samples')) {
          return next();
        }

        const url = new URL(req.url, 'http://localhost');
        const jsonPath = path.resolve(import.meta.dirname, 'public/api/samples.json');

        if (!fs.existsSync(jsonPath)) {
          return next();
        }

        const raw = fs.readFileSync(jsonPath, 'utf-8');
        let data = JSON.parse(raw);

        if (url.pathname === '/api/samples/feed') {
          const id = Number(url.searchParams.get('id'));
          const nextFlag = url.searchParams.get('next') === 'true';
          const published = data.filter((item: any) => item.status !== 'deleted');
          let index = 0;
          if (id) {
            const foundIdx = published.findIndex((i: any) => i.id === id);
            if (foundIdx !== -1) index = foundIdx;
          }
          if (nextFlag) {
            index = (index + 1) % published.length;
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(published[index] || null));
          return;
        }

        const gasVolume = url.searchParams.get('gas_volume');
        if (gasVolume !== null && gasVolume !== '') {
          const volNum = Number(gasVolume);
          data = data.filter((item: any) => item.gas_volume === volNum);
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), mockApiPlugin()],
  server: {
    port: 5173,
    host: true,
    open: false
  }
});
