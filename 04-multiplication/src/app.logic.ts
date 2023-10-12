import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

let outputMessage = '';
const { b: base, l: limit, s: show } = yarg;
const headerMessage = `
===========================
    Table of ${base}
===========================\n
`;

for (let i = 1; i <= limit; i++) {
  outputMessage += `${i} x ${base} = ${i * base}\n`;
}

outputMessage = headerMessage + outputMessage;

if (show) console.log(outputMessage);

const outputPath = `out`;
// Crear directorias de forma recursiva
fs.mkdirSync(outputPath, { recursive: true });

fs.writeFileSync(`${outputPath}/table-${base}.txt`, outputMessage);
console.log(`File table-${base}.txt created!`);
