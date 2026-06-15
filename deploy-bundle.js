import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BUILD_DIR = path.join(__dirname, 'dist-production');
const APPS = {
  web: path.join(__dirname, 'apps', 'web', 'dist'),
  docs: path.join(__dirname, 'apps', 'docs', '.vitepress', 'dist'),
  verify: path.join(__dirname, 'apps', 'verify-glissix', 'dist'),
};

console.log('--- Starting Unified Deployment Bundle Assembly ---');

// 1. Clean and recreate dist-production folder
if (fs.existsSync(BUILD_DIR)) {
  console.log(`Cleaning existing directory: ${BUILD_DIR}`);
  fs.rmSync(BUILD_DIR, { recursive: true, force: true });
}
fs.mkdirSync(BUILD_DIR, { recursive: true });

// 2. Copy compiled applications to subfolders
for (const [name, srcDir] of Object.entries(APPS)) {
  const destDir = path.join(BUILD_DIR, name);
  
  if (!fs.existsSync(srcDir)) {
    console.error(`Error: Source directory not found for ${name} at ${srcDir}. Did the build run first?`);
    process.exit(1);
  }
  
  console.log(`Copying ${name} build from ${srcDir} to ${destDir}...`);
  fs.cpSync(srcDir, destDir, { recursive: true });
}

// 3. Create root redirect index.html
const redirectHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=/web/">
  <title>Redirecting to Glissix...</title>
  <style>
    body {
      background-color: #09090b;
      color: #f4f4f5;
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }
    a { color: #3b82f6; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <p>Redirecting to <a href="/web/">Visual Playground</a>...</p>
  <script>
    window.location.replace("/web/");
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), redirectHtml, 'utf8');
console.log('Created root index.html redirect.');
console.log('✦ SUCCESS: Unified bundle created successfully at dist-production/!');
