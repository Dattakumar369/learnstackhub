// Script to remove emojis and update content style
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Patterns to replace
const replacements = [
  // Remove checkmarks and X marks
  { pattern: /- ✅ /g, replacement: '- ' },
  { pattern: /✅ /g, replacement: '' },
  { pattern: /- ❌ /g, replacement: '- ' },
  { pattern: /❌ /g, replacement: '' },
  { pattern: /⚠️ /g, replacement: 'Note: ' },
  { pattern: /📚|🎯|💡|🔍|🔒|📄|📢|🏦|🌐|🎨|☕|🗄️|📄|🔗|🐬/g, replacement: '' },
  
  // Update summary sections to be more human
  { pattern: /## Summary\n\n- ✅ /g, replacement: '## Summary\n\n' },
  { pattern: /- ✅ \*\*/g, replacement: '- **' },
  
  // Remove emojis from code comments
  { pattern: /\/\/ ✅/g, replacement: '//' },
  { pattern: /\/\/ ❌/g, replacement: '//' },
];

async function processFiles() {
  const dataDir = path.join(__dirname, '../src/data');
  const files = await glob('**/*.js', { cwd: dataDir });
  
  for (const file of files) {
    const filePath = path.join(dataDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    for (const { pattern, replacement } of replacements) {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${file}`);
    }
  }
}

processFiles().catch(console.error);


