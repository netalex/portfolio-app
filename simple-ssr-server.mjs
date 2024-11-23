// simple-ssr-server.mjs
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 4000;

// Serve static files
app.use(express.static(join(__dirname, 'dist/portfolio-app/browser')));

// Basic route handler
app.get('*', (req, res) => {
  console.log('Request received:', req.url);
  res.sendFile(join(__dirname, 'dist/portfolio-app/browser/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Directory:', __dirname);
});