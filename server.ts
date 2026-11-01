import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const isProduction = process.env.NODE_ENV === 'production' || !process.env.VITE_DEV_SERVER;

  app.use(express.json());

  // Health and API routes
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      service: 'SearchEmbed & DocPulse Studio',
      timestamp: new Date().toISOString(),
      port: PORT,
      mode: isProduction ? 'production' : 'development'
    });
  });

  // Serve static public assets
  const publicDir = path.join(__dirname, 'public');
  if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));
  }

  if (!isProduction) {
    // In development mode, mount Vite middlewares
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: Number(PORT),
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production mode, serve compiled dist directory
    const distDir = path.join(__dirname, 'dist');
    if (fs.existsSync(distDir)) {
      app.use(express.static(distDir));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.join(distDir, 'index.html'));
      });
    } else {
      // Fallback if dist not built yet
      app.get('*', (_req: Request, res: Response) => {
        res.send(`
          <!doctype html>
          <html>
            <head><title>SearchEmbed Studio</title></head>
            <body style="background:#09090b;color:#fafafa;font-family:sans-serif;padding:40px;text-align:center;">
              <h2>SearchEmbed Production Node</h2>
              <p>Initializing production bundle... Please refresh in 5 seconds.</p>
            </body>
          </html>
        `);
      });
    }
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[SearchEmbed Server] Running on http://0.0.0.0:${PORT} in ${isProduction ? 'production' : 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error('[SearchEmbed Server] Fatal startup error:', err);
  process.exit(1);
});
