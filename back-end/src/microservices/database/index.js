const fs = require('fs');

try {
    const data = fs.readFileSync('./estudio_equipamentos.md', 'utf8');

    data.split(/\r?\n/).forEach(line => {
        console.log(`Line: ${line}`);
    });
} catch (err) {
    console.error(err);
}