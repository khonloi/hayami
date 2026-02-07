import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const excludeDirs = ['.git', 'node_modules', 'dist', '.next', '.gemini', '.github', '.agent', '.vscode', 'package-lock.json', '.DS_Store'];

function buildTree(dir, relativePath = '') {
  const stats = fs.statSync(dir);
  const name = path.basename(dir);
  
  if (stats.isDirectory()) {
    const children = fs.readdirSync(dir)
      .filter(item => !excludeDirs.includes(item))
      .map(item => buildTree(path.join(dir, item), path.join(relativePath, item)));
    
    return {
      id: relativePath || 'root',
      name: name === 'hayami' ? 'hayami' : name,
      type: 'folder',
      children: children.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === 'folder' ? -1 : 1;
      })
    };
  } else {
    return {
      id: relativePath,
      name: name,
      type: 'file',
      size: (stats.size / 1024).toFixed(1) + ' KB',
      date: stats.mtime.toISOString().split('T')[0]
    };
  }
}

try {
  const tree = buildTree(rootDir);
  const dataDir = path.join(rootDir, 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(dataDir, 'filesystem.json'),
    JSON.stringify(tree, null, 2)
  );

  console.log('Filesystem JSON generated successfully!');
} catch (error) {
  console.error('Error generating filesystem JSON:', error);
  process.exit(1);
}
