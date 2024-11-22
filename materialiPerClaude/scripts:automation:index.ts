import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';

const execAsync = promisify(exec);

// Image optimization
async function optimizeImages() {
  const imageDir = path.join(__dirname, '../../src/assets/images');
  
  try {
    const files = await fs.readdir(imageDir, { recursive: true });
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        await execAsync(`imagemin ${file} --out-dir=dist/assets/images`);
      }
    }
  } catch (err) {
    console.error('Error optimizing images:', err);
    process.exit(1);
  }
}

// Bundle analysis
async function analyzeBundles() {
  try {
    await execAsync('webpack-bundle-analyzer dist/stats.json');
  } catch (err) {
    console.error('Error analyzing bundles:', err);
    process.exit(1);
  }
}

// Lighthouse CI
async function runLighthouse() {
  try {
    await execAsync('lhci autorun');
  } catch (err) {
    console.error('Error running Lighthouse:', err);
    process.exit(1);
  }
}

// Version bump
async function bumpVersion(type: 'patch' | 'minor' | 'major') {
  try {
    await execAsync(`npm version ${type}`);
    await execAsync('git push --follow-tags');
  } catch (err) {
    console.error('Error bumping version:', err);
    process.exit(1);
  }
}

// Generate changelog
async function generateChangelog() {
  try {
    await execAsync('conventional-changelog -p angular -i CHANGELOG.md -s');
  } catch (err) {
    console.error('Error generating changelog:', err);
    process.exit(1);
  }
}

// Main function
async function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'optimize-images':
      await optimizeImages();
      break;
    case 'analyze':
      await analyzeBundles();
      break;
    case 'lighthouse':
      await runLighthouse();
      break;
    case 'bump':
      const type = process.argv[3] as 'patch' | 'minor' | 'major';
      await bumpVersion(type);
      break;
    case 'changelog':
      await generateChangelog();
      break;
    default:
      console.error('Unknown command');
      process.exit(1);
  }
}

main().catch(console.error);
