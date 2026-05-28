const fs = require('fs');
const path = require('path');

let htmlPath = path.join(__dirname, 'src/data/curriculum-html.js');
let html = fs.readFileSync(htmlPath, 'utf8');

html = html.replace(`            exercises: [
              { id: 'ex1', type: 'multiple-choice',`,
`            exercises: [
              { id: 'ex_typing_1', type: 'code-typing', instruction: '¡Escribe tu primera etiqueta! Cierra la etiqueta de párrafo con el texto "Hola".', startingCode: '<p>Hola', validationRegex: '^<p>\\\\s*Hola\\\\s*<\\\\/p>$', explanationIncorrect: 'Asegúrate de terminar con la etiqueta de cierre: </p>' },
              { id: 'ex1', type: 'multiple-choice',`);

html = html.replace(`              { id: 'ex1', type: 'categorize', instruction: 'Clasifica según dónde va cada cosa', categories: [{id: 'head', title: '<head> (No visible)', color: '#8b5cf6'}, {id: 'body', title: '<body> (Visible)', color: '#10b981'}], items: [{text: 'Título de la pestaña', category: 'head'}, {text: 'Imágenes y videos', category: 'body'}, {text: 'Párrafos de texto', category: 'body'}, {text: 'Información para Google', category: 'head'}] },
              {
                id: 'ex2', type: 'code-fill',`,
`              { id: 'ex1', type: 'categorize', instruction: 'Clasifica según dónde va cada cosa', categories: [{id: 'head', title: '<head> (No visible)', color: '#8b5cf6'}, {id: 'body', title: '<body> (Visible)', color: '#10b981'}], items: [{text: 'Título de la pestaña', category: 'head'}, {text: 'Imágenes y videos', category: 'body'}, {text: 'Párrafos de texto', category: 'body'}, {text: 'Información para Google', category: 'head'}] },
              { id: 'ex_typing_2', type: 'code-typing', instruction: 'Escribe tú mismo todo el "cuerpo" (body) vacío.', startingCode: '', validationRegex: '^<body>\\\\s*<\\\\/body>$', explanationIncorrect: 'Asegúrate de escribir la etiqueta de apertura <body> y de cierre </body>.' },
              {
                id: 'ex2', type: 'code-fill',`);

fs.writeFileSync(htmlPath, html, 'utf8');

let cssPath = path.join(__dirname, 'src/data/curriculum-css.js');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(`            exercises: [
              { id: 'ex1', type: 'multiple-choice',`,
`            exercises: [
              { id: 'ex_typing_c1', type: 'code-typing', language: 'CSS', instruction: 'Escribe una regla para pintar el color de texto a rojo (red). ¡No olvides el punto y coma!', startingCode: 'color:', validationRegex: '^color\\\\s*:\\\\s*red\\\\s*;?$', explanationIncorrect: 'Escribe color: red; asegurándote de usar dos puntos y punto y coma.' },
              { id: 'ex1', type: 'multiple-choice',`);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Curriculums updated');
