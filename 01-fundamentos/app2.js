// importar un paquete de node:
// paquete para trabajar con el file system
const fs = require('fs');

const data = fs.readFileSync('Readme.md', 'utf-8');
const newData = data.replace('React', 'Angular');

fs.writeFileSync('Readme-Angular.md', newData);
