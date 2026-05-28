const fs = require('fs');

let html = fs.readFileSync('src/data/curriculum-html.js', 'utf8');

const htmlChallenge = `
      {
        id: 'html-chal-1',
        type: 'challenge',
        title: 'Tu Primera Página',
        language: 'HTML',
        xpReward: 150,
        coins: 30,
        instruction: '¡Pon a prueba lo aprendido! Crea la estructura básica de una web, pon un título grande y un párrafo de texto.',
        startingCode: '<html>\\n  <head>\\n    <title>Mi Web</title>\\n  </head>\\n  <body>\\n    \\n  </body>\\n</html>',
        validators: [
          {
            description: 'Debe existir la etiqueta <html>',
            test: (doc) => doc.documentElement.nodeName.toLowerCase() === 'html'
          },
          {
            description: 'Debe haber un <h1> con algún texto',
            test: (doc) => {
              const h1 = doc.querySelector('h1');
              return h1 !== null && h1.textContent.trim().length > 0;
            }
          },
          {
            description: 'Debe haber un <p> con algún texto',
            test: (doc) => {
              const p = doc.querySelector('p');
              return p !== null && p.textContent.trim().length > 0;
            }
          }
        ]
      },`;

html = html.replace(`        id: 'html-1-4',`, htmlChallenge + `\n      {\n        id: 'html-1-4',`);
fs.writeFileSync('src/data/curriculum-html.js', html, 'utf8');

let css = fs.readFileSync('src/data/curriculum-css.js', 'utf8');

const cssChallenge = `
      {
        id: 'css-chal-1',
        type: 'challenge',
        title: 'Estilista Profesional',
        language: 'CSS',
        xpReward: 200,
        coins: 40,
        instruction: 'Crea una clase llamada "boton" que tenga fondo azul, texto blanco y texto centrado.',
        dummyHtml: '<div class="boton">Haz clic aquí</div>',
        startingCode: '.boton {\\n  \\n}',
        validators: [
          {
            description: 'La regla debe apuntar a la clase .boton',
            test: (doc, code) => /\\.boton\s*\{/.test(code)
          },
          {
            description: 'El fondo debe ser azul (background o background-color)',
            test: (doc, code) => /background(-color)?\s*:\s*blue\s*;?/i.test(code)
          },
          {
            description: 'El texto debe ser blanco (color)',
            test: (doc, code) => /color\s*:\s*white\s*;?/i.test(code)
          },
          {
            description: 'El texto debe estar centrado (text-align)',
            test: (doc, code) => /text-align\s*:\s*center\s*;?/i.test(code)
          }
        ]
      },`;

css = css.replace(`        id: 'css-1-3',`, cssChallenge + `\n      {\n        id: 'css-1-3',`);
fs.writeFileSync('src/data/curriculum-css.js', css, 'utf8');

console.log('Challenges injected successfully');
