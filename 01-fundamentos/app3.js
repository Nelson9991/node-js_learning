// importar un paquete de node:
// paquete para trabajar con el file system
const fs = require('fs');

const data = fs.readFileSync('Readme.md', 'utf-8');
const wordCount = data.split('').length;
const reactWordCount = data.match(/react/gi ?? []).length;

console.log('Palabras:', wordCount);
console.log('Palabras React:', reactWordCount);
