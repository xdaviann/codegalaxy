export const curriculumCss = [
  {
    id: 'css-1',
    title: 'CSS: Pintando la Web',
    description: 'Transforma tus sitios web aburridos en obras de arte modernas.',
    color: '#8b5cf6',
    language: 'CSS',
    lessons: [
      {
        id: 'css-1-1',
        title: 'El Pintor y su Brocha (Sintaxis)',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'La Regla de Oro', xpReward: 10, coins: 8,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Palette', color: '#8b5cf6', title: '¿Qué es CSS?', subtitle: 'La ropa y el maquillaje', body: 'Si HTML es el esqueleto de tu web (sin color ni forma), CSS es la ropa, el peinado y el maquillaje. CSS (*Cascading Style Sheets*) decide cómo se ve todo.' },
              { id: 't2', type: 'concept', icon: 'Brush', color: '#8b5cf6', title: 'La anatomía de una regla', body: 'Para pintar algo con CSS, escribimos una **regla**. Tiene tres partes:\n1. El **Selector**: A quién quieres pintar.\n2. La **Propiedad**: Qué le quieres cambiar (color, tamaño).\n3. El **Valor**: Cómo debe quedar (rojo, grande).', code: 'selector {\n  propiedad: valor;\n}', codeCaption: 'Cada línea de propiedad termina en punto y coma ;' },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Imagina que ordenas a un pintor. Clasifica estas palabras.', categories: [{id: 'sel', title: 'Selector (A quién)', color: '#3b82f6'}, {id: 'prop', title: 'Propiedad (Qué cambiar)', color: '#8b5cf6'}, {id: 'val', title: 'Valor (Cómo dejarlo)', color: '#10b981'}], items: [{text: 'El título <h1>', category: 'sel'}, {text: 'Color del texto', category: 'prop'}, {text: 'Azul', category: 'val'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca el SÍMBOLO que encierra a todas las propiedades (las llaves).', code: '[[h1]] [[{]]\n  [[color]]: [[red]];\n[[}]]', correctIndex: 1 },
              { id: 'ex3', type: 'code-highlight', instruction: 'Toca el SÍMBOLO que separa la propiedad del valor.', code: '[[p]] [[{]]\n  [[color]][[:]] [[blue]];\n[[}]]', correctIndex: 3 },
              { id: 'ex4', type: 'code-error', instruction: 'Encuentra el olvido más común en CSS', filename: 'style.css', lines: ['h1 {', '  color: red', '}'], errorLineIndex: 1, explanation: 'Toda declaración en CSS (la pareja de propiedad y valor) DEBE terminar con un punto y coma (;).' },
              { id: 'ex5', type: 'drag-sort', prompt: 'Ordena la regla CSS desde el inicio hasta el final', items: ['color: blue;', 'h1', '}', '{'], correctOrder: ['h1', '{', 'color: blue;', '}'] },
            ],
          },
          {
            roundNum: 2, label: 'Enlazando CSS', xpReward: 12, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'Link', color: '#8b5cf6', title: 'Conectando HTML y CSS', body: 'CSS se escribe en un archivo separado (ej: `style.css`). Para que el HTML sepa dónde están sus estilos, usamos una "tubería" invisible: la etiqueta `<link>` dentro del `<head>`.' },
              { id: 't2', type: 'code', icon: 'Code', color: '#8b5cf6', title: 'La etiqueta Link', body: 'Se coloca en el archivo HTML. `rel="stylesheet"` significa "Relación: Hoja de Estilos", y el `href` es la ruta del archivo.', code: '<head>\n  <link rel="stylesheet" href="style.css">\n</head>' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la etiqueta que "importa" los colores y estilos a tu web.', code: '[[<head>]]\n  [[<title>]]Mi Web[[</title>]]\n  [[<link rel="stylesheet" href="style.css">]]\n[[</head>]]', correctIndex: 3 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Por qué es mejor tener el CSS en un archivo separado (.css) en vez de escribirlo directo en el HTML?', options: ['Porque el HTML no soporta colores', 'Para mantener el orden: el HTML solo estructura, el CSS solo pinta.', 'Es una regla legal de internet', 'No es mejor, es peor'], correct: 1 },
              {
                id: 'ex3', type: 'code-fill', instruction: 'Construye la conexión CSS',
                codeLines: [
                  { text: '<', type: 'code' },
                  { text: '', type: 'blank', answer: 'link', blankId: 0 }, { text: ' rel="', type: 'code' },
                  { text: '', type: 'blank', answer: 'stylesheet', blankId: 1 }, { text: '" ', type: 'code' },
                  { text: '', type: 'blank', answer: 'href', blankId: 2 }, { text: '="style.css">\n', type: 'code' }
                ],
                options: ['link', 'style', 'stylesheet', 'href', 'src'], answers: ['link', 'stylesheet', 'href']
              },
            ],
          },
          {
            roundNum: 3, label: 'Comentarios', xpReward: 15, coins: 12,
            theory: [
              { id: 't1', type: 'concept', icon: 'MessageSquare', color: '#8b5cf6', title: 'Notas Invisibles', body: 'A veces quieres dejarte una nota a ti mismo o a otros programadores en el código ("¡No borrar esto!"). Para eso usamos los **comentarios**. El navegador los ignora por completo.' },
              { id: 't2', type: 'code', icon: 'Code', color: '#8b5cf6', title: 'Sintaxis de comentarios CSS', body: 'En CSS, todo lo que esté entre `/*` y `*/` será invisible para la página.', code: '/* Esto es un comentario. El navegador no lo lee */\nh1 {\n  color: red; /* Letras rojas */\n}' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el comentario CSS.', code: '[[h1]] [[{]]\n  [[/* Título principal */]]\n  [[color]]: [[red]];\n[[}]]', correctIndex: 2 },
              { id: 'ex2', type: 'categorize', instruction: '¿Se ve o no se ve?', categories: [{id: 'visible', title: 'Afecta la web', color: '#10b981'}, {id: 'oculto', title: 'El navegador lo ignora', color: '#6366f1'}], items: [{text: 'color: blue;', category: 'visible'}, {text: '/* color: blue; */', category: 'oculto'}, {text: '/* Cambiar después */', category: 'oculto'}] },
              { id: 'ex3', type: 'multiple-choice', question: 'Si envuelves código funcional dentro de /* y */, ¿qué sucederá?', options: ['Dará un error', 'Ese código dejará de funcionar temporalmente (se "comenta")', 'Se borrará del archivo', 'Explotará'], correct: 1 },
            ],
          },
        ],
      },
      {
        id: 'css-1-2',
        title: 'Selectores: Eligiendo el objetivo',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Etiquetas y Clases', xpReward: 10, coins: 8,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Target', color: '#8b5cf6', title: 'Afinando la puntería', subtitle: 'A quién vamos a afectar', body: 'En HTML puedes tener cien párrafos `<p>`, pero quizás solo quieres pintar de rojo UNO de ellos. Los selectores CSS son la mira de francotirador.' },
              { id: 't2', type: 'concept', icon: 'Tag', color: '#8b5cf6', title: 'Selector de Etiqueta', body: 'Si escribes directamente la etiqueta HTML (ej: `p { }`), CSS afectará a **TODOS** los párrafos de tu página entera. Es como pintar la pared entera.' },
              { id: 't3', type: 'concept', icon: 'Users', color: '#8b5cf6', title: 'Selector de Clase (El punto .)', body: 'Las **clases** son como clubes. Le das una clase al elemento HTML (`class="rojo"`) y en CSS usas un **punto** (`.rojo`) para referirte al club entero.', code: '/* CSS */\n.rojo { color: red; }\n\n<!-- HTML -->\n<p class="rojo">Hola</p>' },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Empareja el selector CSS con a cuántos afecta', categories: [{id: 'todos', title: 'Selector Etiqueta (Todos)', color: '#ef4444'}, {id: 'grupo', title: 'Selector Clase (Grupo específico)', color: '#3b82f6'}], items: [{text: 'p { }', category: 'todos'}, {text: '.destacado { }', category: 'grupo'}, {text: 'h1 { }', category: 'todos'}, {text: '.boton-azul { }', category: 'grupo'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca el selector que usa el PUNTO para apuntar a una clase.', code: '[[.alerta]] [[{]]\n  [[color]]: [[red]];\n[[}]]\n\n[[h2]] [[{]]\n  [[color]]: [[blue]];\n[[}]]', correctIndex: 0 },
              { id: 'ex3', type: 'word-bank', instruction: 'Aplica el selector de clase "tarjeta"', filename: 'style.css', parts: ['/* CSS de la clase tarjeta */\n', '___', ' {\n  background: white;\n}'], words: ['.tarjeta', 'tarjeta', '#tarjeta'], answers: ['.tarjeta'] },
              { id: 'ex4', type: 'multiple-choice', question: '¿Puedes tener múltiples elementos HTML con la MISMA clase?', options: ['No, está prohibido', 'Sí, las clases están hechas exactamente para reutilizar estilos en muchos elementos', 'Sí, pero solo si están en páginas distintas'], correct: 1 },
            ],
          },
          {
            roundNum: 2, label: 'El ID Único', xpReward: 12, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'Fingerprint', color: '#8b5cf6', title: 'Selector de ID (El hashtag #)', body: 'Mientras que la "clase" es un club, el "ID" es el **documento de identidad**. Debe ser **único** en toda la página (solo un elemento puede tenerlo). En CSS se selecciona con el hashtag `#`.' },
              { id: 't2', type: 'compare', icon: 'GitMerge', color: '#8b5cf6', title: 'Clase vs ID', body: 'Usa clases para cosas repetitivas (botones, tarjetas). Usa ID para piezas únicas del rompecabezas (el menú principal, el pie de página).', leftLabel: 'Usar Clase (.)', leftItems: ['Muchos botones iguales', 'Lista de productos', 'Textos destacados'], rightLabel: 'Usar ID (#)', rightItems: ['El logo del sitio', 'El menú principal', 'El pie de página'] },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Clasifica según el símbolo usado en CSS', categories: [{id: 'class', title: 'Clase (Usa punto .)', color: '#3b82f6'}, {id: 'id', title: 'ID (Usa hashtag #)', color: '#f59e0b'}], items: [{text: '.btn-azul', category: 'class'}, {text: '#menu-principal', category: 'id'}, {text: '.producto', category: 'class'}, {text: '#logo', category: 'id'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca el selector que aplica a un elemento ÚNICO en toda la web.', code: '[[#navegacion]] [[{]]\n  [[height]]: [[50px]];\n[[}]]\n\n[[.enlace]] [[{]]\n  [[color]]: [[red]];\n[[}]]', correctIndex: 0 },
              { id: 'ex3', type: 'code-error', instruction: 'Encuentra el problema lógico/HTML.', filename: 'index.html', lines: ['<body>', '  <div id="caja">A</div>', '  <div id="caja">B</div>', '</body>'], errorLineIndex: 2, explanation: 'Los IDs deben ser únicos. No puedes tener dos elementos con id="caja" en la misma página. Deberías usar clases (class="caja") si quieres repetirlo.' },
            ],
          },
          {
            roundNum: 3, label: 'Pseudoclases', xpReward: 15, coins: 12,
            theory: [
              { id: 't1', type: 'concept', icon: 'MousePointer', color: '#8b5cf6', title: 'Estilos por interacción', body: '¿Has notado que los botones cambian de color cuando les pasas el ratón por encima? CSS puede saber lo que hace el usuario usando las **pseudoclases**, que llevan dos puntos `:hover`.' },
              { id: 't2', type: 'code', icon: 'Code', color: '#8b5cf6', title: 'El estado :hover', body: 'Si añades `:hover` a tu selector, esas reglas SOLO se aplicarán mientras el ratón esté flotando encima del elemento.', code: '.boton { \n  background: blue; \n}\n\n.boton:hover {\n  background: red; /* Se vuelve rojo al pasar el ratón */\n}' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el selector que se activa mágicamente al pasar el ratón.', code: '[[.card]] [[{]]\n  [[border]]: [[1px]];\n[[}]]\n\n[[.card:hover]] [[{]]\n  [[border]]: [[2px]];\n[[}]]', correctIndex: 5 },
              { id: 'ex2', type: 'multiple-choice', question: 'Si un enlace tiene "a:hover { color: orange; }", ¿cuándo se verá naranja?', options: ['Siempre', 'Solo cuando le des clic', 'Mientras el cursor del ratón esté descansando sobre el enlace', 'Solo si estás en un celular'], correct: 2 },
              { id: 'ex3', type: 'code-fill', instruction: 'Completa la pseudoclase', codeLines: [{text: '.menu-item:', type: 'code'}, {text: '', type: 'blank', answer: 'hover', blankId: 0}, {text: ' {\n  background: gray;\n}', type: 'code'}], options: ['hover', 'mouse', 'over'], answers: ['hover'] },
            ],
          },
        ],
      },
      {
        id: 'css-chal-1',
        type: 'challenge',
        title: 'Estilista Profesional',
        language: 'CSS',
        xpReward: 200,
        coins: 40,
        instruction: 'Crea una clase llamada "boton" que tenga fondo azul, texto blanco y texto centrado.',
        dummyHtml: '<div class="boton">Haz clic aquí</div>',
        startingCode: '.boton {\n  \n}',
        validators: [
          {
            description: 'La regla debe apuntar a la clase .boton',
            test: (doc, code) => /\.botons*{/.test(code)
          },
          {
            description: 'El fondo debe ser azul (background o background-color)',
            test: (doc, code) => /background(-color)?s*:s*blues*;?/i.test(code)
          },
          {
            description: 'El texto debe ser blanco (color)',
            test: (doc, code) => /colors*:s*whites*;?/i.test(code)
          },
          {
            description: 'El texto debe estar centrado (text-align)',
            test: (doc, code) => /text-aligns*:s*centers*;?/i.test(code)
          }
        ]
      },
      {
        id: 'css-1-3',
        title: 'Colores y Fondos',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Textos y Cajas', xpReward: 10, coins: 8,
            theory: [
              { id: 't1', type: 'concept', icon: 'PaintBucket', color: '#8b5cf6', title: 'Los dos colores principales', body: 'En CSS hay dos propiedades que usarás todo el tiempo:\n- `color`: Pinta el texto o las letras.\n- `background-color`: Pinta el fondo (la caja) detrás del texto.' },
              { id: 't2', type: 'code', icon: 'Hash', color: '#8b5cf6', title: 'Nombres y HEX', body: 'Puedes usar colores en inglés (`red`, `blue`) pero los profesionales usan códigos Hexadecimales. Son un hashtag y 6 letras/números (`#ff0000` es rojo).', code: 'h1 {\n  color: #ffffff; /* Letras blancas */\n  background-color: #000000; /* Fondo negro */\n}' },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: '¿Qué pinta cada propiedad?', categories: [{id: 'texto', title: 'Texto / Letras', color: '#10b981'}, {id: 'fondo', title: 'El fondo', color: '#3b82f6'}], items: [{text: 'color', category: 'texto'}, {text: 'background-color', category: 'fondo'}, {text: 'background', category: 'fondo'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca el valor en formato HEXADECIMAL.', code: '[[.caja]] [[{]]\n  [[color]]: [[white]];\n  [[background]]: [[#ff5500]];\n[[}]]', correctIndex: 5 },
              { id: 'ex3', type: 'code-error', instruction: 'El programador quería texto negro, pero la caja entera se puso negra. ¿Dónde está el error?', filename: 'style.css', lines: ['p {', '  background-color: black;', '}'], errorLineIndex: 1, explanation: '"background-color" pinta el fondo de la caja. Si solo quería pintar el texto o letras, debía usar la propiedad "color".' },
            ],
          },
          {
            roundNum: 2, label: 'La Opacidad (Transparencia)', xpReward: 12, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'Droplets', color: '#8b5cf6', title: 'Colores Fantasma (RGBA)', body: 'Además de HEX, existe RGBA (Red, Green, Blue, Alpha). El "Alpha" controla la transparencia, de 0 (invisible) a 1 (sólido). Ideal para crear efectos de vidrio o fondos oscurecidos.' },
              { id: 't2', type: 'code', icon: 'Code', color: '#8b5cf6', title: 'Sintaxis RGBA', body: 'Ejemplo: `rgba(0, 0, 0, 0.5)` significa "Negro, al 50% de transparencia".', code: '.vidrio {\n  background-color: rgba(255, 255, 255, 0.8);\n}' },
            ],
            exercises: [
              { id: 'ex_typing_c1', type: 'code-typing', language: 'CSS', instruction: 'Escribe una regla para pintar el color de texto a rojo (red). ¡No olvides el punto y coma!', startingCode: 'color:', validationRegex: '^color\\\\s*:\\\\s*red\\\\s*;?$', explanationIncorrect: 'Escribe color: red; asegurándote de usar dos puntos y punto y coma.' },
              { id: 'ex1', type: 'multiple-choice', question: 'En rgbA(255, 0, 0, 0.5), ¿qué significa el 0.5 final?', options: ['Que es 50% rojo', 'Que el color es 50% transparente (Alpha)', 'Que ocupa el 50% de la pantalla'], correct: 1 },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca el valor numérico que controla la transparencia del color.', code: '[[.overlay]] [[{]]\\n  [[background]]: [[rgba(0, 0, 0, ]] [[0.8]] [[)]];\\n[[}]]', correctIndex: 4 },
            ],
          },
          {
            roundNum: 3, label: 'Gradientes', xpReward: 15, coins: 12,
            theory: [
              { id: 't1', type: 'concept', icon: 'Sunrise', color: '#8b5cf6', title: 'Degradados de colores', body: 'Un fondo no tiene por qué ser plano. `linear-gradient` permite mezclar varios colores en una transición suave.' },
              { id: 't2', type: 'code', icon: 'Code', color: '#8b5cf6', title: 'Sintaxis de gradiente', body: 'Se usa dentro de la propiedad `background`.', code: '.arcoiris {\n  /* De rojo a azul, hacia la derecha */\n  background: linear-gradient(to right, red, blue);\n}' },
            ],
            exercises: [
              { id: 'ex1', type: 'word-bank', instruction: 'Crea un gradiente que vaya de arriba a abajo con dos colores', filename: 'style.css', parts: ['body {\n  background: ', '___', '(', '___', ', blue);\n}'], words: ['linear-gradient', 'to bottom', 'red', 'to right', 'color'], answers: ['linear-gradient', 'red'] }, // using default vertical if no direction, but let's make it simpler:
              { id: 'ex1_b', type: 'code-fill', instruction: 'Completa la función de degradado lineal', codeLines: [{text: 'background: ', type: 'code'}, {text: '', type: 'blank', answer: 'linear', blankId: 0}, {text: '-gradient(to right, red, yellow);', type: 'code'}], options: ['linear', 'circle', 'box'], answers: ['linear'] },
            ],
          },
        ],
      },
      {
        id: 'css-1-4',
        title: 'El Box Model (El modelo de caja)',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Cajas Invisibles', xpReward: 10, coins: 8,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Box', color: '#8b5cf6', title: 'El secreto de la Matrix web', subtitle: 'Todo, absolutamente todo, es un rectángulo.', body: 'En HTML y CSS, un botón circular sigue siendo una caja cuadrada invisible. Todo elemento de la página es una caja con capas protectoras como una muñeca Matryoshka.' },
              { id: 't2', type: 'concept', icon: 'Layers', color: '#8b5cf6', title: 'Las Capas de la Caja', body: 'Desde adentro hacia afuera:\n1. **Content**: El texto/imagen real.\n2. **Padding**: El espacio de respiración *interno*.\n3. **Border**: El marco *visible*.\n4. **Margin**: El espacio *externo* que lo separa de otros elementos.' },
            ],
            exercises: [
              { id: 'ex1', type: 'drag-sort', prompt: 'Ordena las capas de la caja de ADENTRO hacia AFUERA', items: ['Margin (Margen)', 'Border (Borde)', 'Content (Contenido)', 'Padding (Relleno)'], correctOrder: ['Content (Contenido)', 'Padding (Relleno)', 'Border (Borde)', 'Margin (Margen)'] },
              { id: 'ex2', type: 'categorize', instruction: '¿Es espacio interno o externo?', categories: [{id: 'in', title: 'Interno (Afecta el tamaño del botón)', color: '#10b981'}, {id: 'out', title: 'Externo (Empuja cosas ajenas)', color: '#f59e0b'}], items: [{text: 'Padding', category: 'in'}, {text: 'Margin', category: 'out'}] },
              { id: 'ex3', type: 'multiple-choice', question: 'Si quieres que el texto de un botón esté más separado de sus bordes, para que el botón se vea más "gordito", ¿qué propiedad usas?', options: ['margin', 'padding', 'border', 'spacing'], correct: 1 },
            ],
          },
          {
            roundNum: 2, label: 'Bordes y Shorthands', xpReward: 12, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'Maximize', color: '#8b5cf6', title: 'Construyendo el Borde', body: 'La propiedad `border` requiere tres ingredientes en una sola línea: el grosor, el estilo y el color. Ejemplo: `border: 2px solid black;`.' },
              { id: 't2', type: 'tip', icon: 'Clock', color: '#eab308', title: 'El truco del Reloj', body: 'Si le das 4 números al margin o padding, CSS los aplica como las manecillas del reloj (Arriba, Derecha, Abajo, Izquierda).', code: '/* Arriba: 10px, Derecha: 20px, Abajo: 30px, Izq: 40px */\nmargin: 10px 20px 30px 40px;' },
            ],
            exercises: [
              { id: 'ex1', type: 'drag-sort', prompt: 'Ordena la declaración del borde: grosor, estilo, color', items: ['black;', 'solid', '2px', 'border:'], correctOrder: ['border:', '2px', 'solid', 'black;'] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca el valor que define el margen de la DERECHA según la regla del reloj.', code: '[[margin]]: [[10px]] [[20px]] [[30px]] [[40px]];', correctIndex: 2 },
              { id: 'ex3', type: 'word-bank', instruction: 'Aplica un borde de puntos rojos de 1px', filename: 'style.css', parts: ['border: ', '___', ' ', '___', ' red;'], words: ['1px', 'dotted', 'solid', '5px'], answers: ['1px', 'dotted'] },
            ],
          },
          {
            roundNum: 3, label: 'La Caja Mágica', xpReward: 15, coins: 12,
            theory: [
              { id: 't1', type: 'concept', icon: 'AlertTriangle', color: '#8b5cf6', title: 'El defecto de CSS', body: 'Históricamente, si un elemento tenía un `width: 100px` y le agregabas `padding: 20px`, CSS sumaba todo (140px totales). Esto rompía los diseños enteros.' },
              { id: 't2', type: 'code', icon: 'CheckCircle', color: '#8b5cf6', title: 'El Reset Mágico', body: 'Para arreglar esto, TODOS los sitios web usan `box-sizing: border-box`. Hace que el padding "empuje hacia adentro", respetando el ancho que le diste.', code: '* {\n  box-sizing: border-box;\n}' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la propiedad que arregla el modelo de caja de CSS para que el ancho definido sea el real.', code: '[[*]] [[{]]\n  [[box-sizing]]: [[border-box]];\n[[}]]', correctIndex: 2 },
              { id: 'ex2', type: 'multiple-choice', question: 'Sin usar border-box, ¿cuánto medirá físicamente una caja con width: 100px y un padding izquierdo y derecho de 10px cada uno?', options: ['100px', '120px (100 + 10 + 10)', '80px', '110px'], correct: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Aplica el "reset" a todos los elementos usando el selector universal asterisco', filename: 'style.css', parts: ['___', ' {\n  box-sizing: ', '___', ';\n}'], words: ['*', 'border-box', 'html', 'content-box'], answers: ['*', 'border-box'] },
            ],
          },
        ],
      },
      {
        id: 'css-1-5',
        title: 'Tipografía',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Controlando el Texto', xpReward: 10, coins: 8,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Type', color: '#8b5cf6', title: 'Diseño Editorial', subtitle: 'Haciendo la web legible', body: 'CSS nos permite ser verdaderos diseñadores gráficos manipulando la fuente (familia), su tamaño, su grosor y alineación.' },
              { id: 't2', type: 'concept', icon: 'FileText', color: '#8b5cf6', title: 'Las propiedades base', body: '- `font-family`: Qué fuente usas (Arial, Helvetica).\n- `font-size`: Qué tan grande es (en pixeles o `rem`).\n- `font-weight`: El grosor (normal, bold).' },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Asigna cada tarea a su propiedad CSS', categories: [{id: 'size', title: 'Tamaño de Letra', color: '#3b82f6'}, {id: 'weight', title: 'Grosor (Negrita)', color: '#10b981'}, {id: 'align', title: 'Alineación', color: '#f59e0b'}], items: [{text: 'font-size', category: 'size'}, {text: 'font-weight', category: 'weight'}, {text: 'text-align', category: 'align'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la propiedad que convierte el texto normal en un texto GRUESO (Bold).', code: '[[h1]] [[{]]\n  [[font-weight]]: [[bold]];\n[[}]]', correctIndex: 2 },
              { id: 'ex3', type: 'code-error', instruction: 'El texto no se centra. ¿Dónde está el error de sintaxis CSS?', filename: 'style.css', lines: ['p {', '  text-decoration: center;', '}'], errorLineIndex: 1, explanation: 'La propiedad para centrar u orillar texto es "text-align". "text-decoration" sirve para subrayados.' },
            ],
          },
          {
            roundNum: 2, label: 'Detalles visuales', xpReward: 12, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'CaseUpper', color: '#8b5cf6', title: 'Transformar texto', body: 'Con `text-transform: uppercase;` puedes hacer que el texto se vea en MAYÚSCULAS sin importar cómo el usuario lo haya escrito en el HTML original.' },
              { id: 't2', type: 'concept', icon: 'AlignJustify', color: '#8b5cf6', title: 'Respiración del texto', body: 'Un texto es ilegible si las líneas están muy juntas. Usa `line-height` para separar las líneas de texto (como el interlineado en Word).' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la propiedad que aumenta la separación entre los renglones del párrafo.', code: '[[p]] [[{]]\n  [[line-height]]: [[1.6]];\n[[}]]', correctIndex: 2 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Por qué usar text-transform: uppercase en CSS en vez de escribir las mayúsculas directamente en el HTML?', options: ['Porque CSS es el encargado del estilo visual y el HTML del contenido original.', 'Porque escribir mayúsculas en HTML daña el teclado', 'No hay diferencia, pero en HTML es más aburrido', 'Porque Google odia el HTML en mayúsculas'], correct: 0 },
            ],
          },
          {
            roundNum: 3, label: 'Unidades de Tamaño', xpReward: 15, coins: 12,
            theory: [
              { id: 't1', type: 'concept', icon: 'Ruler', color: '#8b5cf6', title: 'El mundo del REM', body: 'A los principiantes les encantan los pixeles (`px`), pero los profesionales usan `rem`. 1 rem equivale al tamaño por defecto del navegador (usualmente 16px). Es genial porque si un usuario con mala vista sube el tamaño de su navegador, los `rem` escalan automáticamente.' },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Clasifica las unidades de medida CSS', categories: [{id: 'fija', title: 'Fija / Rígida', color: '#ef4444'}, {id: 'flexible', title: 'Relativa / Accesible', color: '#10b981'}], items: [{text: 'px (Pixeles)', category: 'fija'}, {text: 'rem', category: 'flexible'}, {text: '% (Porcentajes)', category: 'flexible'}] },
              { id: 'ex2', type: 'multiple-choice', question: 'Si el tamaño base del navegador es 16px, ¿a cuánto equivalen 2rem?', options: ['2 pixeles', '16 pixeles', '32 pixeles', '200 pixeles'], correct: 2 },
            ],
          },
        ],
      },
      {
        id: 'css-1-6',
        title: 'Flexbox: El Ordenador',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'El Contenedor Padre', xpReward: 10, coins: 8,
            theory: [
              { id: 't1', type: 'welcome', icon: 'LayoutTemplate', color: '#8b5cf6', title: 'La magia de Flexbox', subtitle: 'Alineando cajas', body: 'Antes, poner dos elementos uno al lado del otro era una pesadilla. Flexbox revolucionó todo. Convierte un contenedor padre en una cuadrícula flexible.' },
              { id: 't2', type: 'concept', icon: 'Power', color: '#8b5cf6', title: 'El Botón de Encendido', body: 'Para que la magia ocurra, debes ir al elemento PADRE (el que envuelve a los hijos) y decirle `display: flex;`. Inmediatamente, todos sus hijos se colocarán en una sola fila.', code: '.padre {\n  display: flex;\n}' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la propiedad que enciende Flexbox y pone a todos los hijos en fila.', code: '[[.contenedor]] [[{]]\n  [[display]]: [[flex]];\n[[}]]', correctIndex: 2 },
              { id: 'ex2', type: 'multiple-choice', question: '¿A quién debes aplicarle "display: flex"?', options: ['A los elementos hijos individualmente', 'Al contenedor padre que los envuelve', 'Al elemento <body> siempre', 'A la etiqueta <link>'], correct: 1 },
              { id: 'ex3', type: 'code-error', instruction: 'Flexbox no está funcionando. ¿Por qué?', filename: 'style.css', lines: ['.padre {', '  flex-display: true;', '}'], errorLineIndex: 1, explanation: 'La propiedad correcta es "display" con el valor "flex". Es decir: display: flex;' },
            ],
          },
          {
            roundNum: 2, label: 'Justificar y Alinear', xpReward: 12, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'AlignHorizontalJustifyCenter', color: '#8b5cf6', title: 'Moviendo los hilos', body: 'Una vez activado flexbox, tienes dos palancas principales:\n- `justify-content`: Alinea en el eje principal (horizontal, de izq a der).\n- `align-items`: Alinea en el eje cruzado (vertical, de arriba a abajo).' },
              { id: 't2', type: 'code', icon: 'Code', color: '#8b5cf6', title: 'El Centro del Universo', body: 'Si combinas ambas propiedades con el valor `center`, el elemento hijo quedará perfectamente centrado en el medio de la caja. ¡El Santo Grial del CSS!', code: '.padre {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}' },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: '¿En qué dirección mueven las cosas?', categories: [{id: 'horiz', title: 'Eje Principal (Horizontal)', color: '#3b82f6'}, {id: 'vert', title: 'Eje Cruzado (Vertical)', color: '#f59e0b'}], items: [{text: 'justify-content', category: 'horiz'}, {text: 'align-items', category: 'vert'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la propiedad que centra los elementos de IZQUIERDA a DERECHA.', code: '[[.caja]] [[{]]\n  [[display]]: [[flex]];\n  [[justify-content]]: [[center]];\n[[}]]', correctIndex: 4 },
              { id: 'ex3', type: 'word-bank', instruction: 'Centra los elementos tanto vertical como horizontalmente', filename: 'style.css', parts: ['.hero {\n  display: flex;\n  justify-content: ', '___', ';\n  align-items: ', '___', ';\n}'], words: ['center', 'flex-start', 'center', 'space-between'], answers: ['center', 'center'] },
            ],
          },
          {
            roundNum: 3, label: 'Espaciando Elementos', xpReward: 15, coins: 12,
            theory: [
              { id: 't1', type: 'concept', icon: 'SplitSquareHorizontal', color: '#8b5cf6', title: 'Separaciones automáticas', body: '`justify-content` tiene valores mágicos:\n- `space-between`: Pega el primer hijo a la izquierda, el último a la derecha, y distribuye el resto en medio.\n- `space-around`: Pone un colchón de espacio alrededor de cada elemento.' },
              { id: 't2', type: 'concept', icon: 'Spacing', color: '#8b5cf6', title: 'El bendito GAP', body: 'Si solo quieres forzar un espacio exacto entre hijos sin depender de margins locos, usa la propiedad `gap` (ej: `gap: 20px`). ¡Súper limpio!' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el valor de justify-content que empuja los elementos hacia los bordes extremos (izquierda y derecha).', code: '[[.nav]] [[{]]\n  [[display]]: [[flex]];\n  [[justify-content]]: [[space-between]];\n[[}]]', correctIndex: 5 },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la propiedad que crea un hueco estricto de 20px entre cada hijo.', code: '[[.padre]] [[{]]\n  [[display]]: [[flex]];\n  [[gap]]: [[20px]];\n[[}]]', correctIndex: 4 },
              { id: 'ex3', type: 'multiple-choice', question: '¿Por qué `gap` en Flexbox es mejor que ponerle `margin-right` a todos los hijos?', options: ['Porque `gap` no le añade margen sobrante al último elemento de la fila', 'Porque el margen atrae virus', 'Porque margin requiere de cálculos matemáticos avanzados', 'No es mejor, es igual'], correct: 0 },
            ],
          },
        ],
      },
    ],
  },
];
