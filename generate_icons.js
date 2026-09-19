import fs from 'fs';
import path from 'path';

// Valid 16x16 transparent PNG base64 string
const pngBase64 = "iVBORw0KGgoAAAANSU5EUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZSURBVDhPY2AYBaNgFIyCwSAgYEAw0AAAD0QAAY7b3i4AAAAASUVORK5CYII=";
const buffer = Buffer.from(pngBase64, 'base64');

['public', 'dist'].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'icon16.png'), buffer);
  fs.writeFileSync(path.join(dir, 'icon48.png'), buffer);
  fs.writeFileSync(path.join(dir, 'icon128.png'), buffer);
});

console.log('Icon PNG files successfully created in public/ and dist/');
