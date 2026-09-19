import fs from 'fs';

const content = fs.readFileSync('world-map.png', 'utf8');
const regex = /<circle\s+cx="([\d\.]+)"\s+cy="([\d\.]+)"\s+r="([\d\.]+)"/g;
const circles: { cx: number; cy: number; r: number }[] = [];

let match: RegExpExecArray | null;
while ((match = regex.exec(content)) !== null) {
  circles.push({
    cx: parseFloat(match[1]),
    cy: parseFloat(match[2]),
    r: parseFloat(match[3])
  });
}

console.log('Total circles extracted:', circles.length);

const tsContent = `// Pre-parsed vector dots for world map
export const WORLD_MAP_DOTS: [number, number][] = [
${circles.map(c => `  [${c.cx}, ${c.cy}]`).join(',\n')}
];
`;

fs.writeFileSync('src/components/mapDotsData.ts', tsContent);
console.log('Saved src/components/mapDotsData.ts');
