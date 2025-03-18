import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '../../../food-delvo-react/food del assets/frontend_assets');
const targetDir = path.join(__dirname, '../../../public');

// Create directories if they don't exist
const directories = ['icons', 'images', 'food'];
for (const dir of directories) {
  const dirPath = path.join(targetDir, dir);
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

// Function to copy file
async function copyFile(source, target) {
  try {
    await fs.copyFile(source, target);
    console.log(`✓ Copied ${path.basename(source)} to ${path.relative(targetDir, target)}`);
  } catch (error) {
    console.error(`✗ Failed to copy ${path.basename(source)}: ${error.message}`);
  }
}

// Read source directory
try {
  const files = await fs.readdir(sourceDir);

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    let targetPath;

    // Skip if it's not a file
    const stats = await fs.stat(sourcePath);
    if (!stats.isFile()) continue;

    // Determine target directory based on file name
    if (file.includes('icon') || file.includes('app_store') || file.includes('play_store')) {
      targetPath = path.join(targetDir, 'icons', file);
    } else if (file.startsWith('food_')) {
      targetPath = path.join(targetDir, 'food', file);
    } else if (file === 'logo.png' || file === 'header_img.png') {
      targetPath = path.join(targetDir, 'images', file);
    } else {
      targetPath = path.join(targetDir, 'images', file);
    }

    await copyFile(sourcePath, targetPath);
  }

  console.log('\n✨ Assets copied successfully!');
} catch (error) {
  console.error(`Error reading source directory: ${error.message}`);
} 