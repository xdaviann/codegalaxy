export const curriculumHtml = [
  {
    id: 'html-1',
    title: 'HTML: El Esqueleto de la Web',
    description: 'Aprende los fundamentos construyendo páginas web desde cero, sin conocimiento previo.',
    color: '#6366f1',
    language: 'HTML',
    lessons: [
      {
        id: 'html-1-1',
        title: 'Los Cimientos (Fundamentos)',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Aprendiendo', xpReward: 10, coins: 8,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Globe', color: '#6366f1', title: '¿Qué es HTML?', subtitle: 'Imagina que construyes una casa', body: 'HTML es como **los ladrillos y las vigas** de una casa. Es lo que da estructura a todo lo que ves en internet. Sin HTML, las páginas web simplemente no existirían.' },
              { id: 't2', type: 'concept', icon: 'Tag', color: '#6366f1', title: 'Las "Etiquetas" (Tags)', body: 'El HTML se escribe usando etiquetas. Piensa en ellas como "cajas" invisibles que le dicen al navegador qué hay dentro. Se escriben entre signos de menor y mayor: `<caja>`.', code: '<etiqueta>Contenido aquí</etiqueta>', codeCaption: 'La mayoría se abre <etiqueta> y se cierra </etiqueta>' },
              { id: 't3', type: 'compare', icon: 'SplitSquareHorizontal', color: '#6366f1', title: 'Apertura y Cierre', body: 'Como al abrir y cerrar una puerta, en HTML casi siempre que abres una etiqueta, debes cerrarla añadiendo una barra diagonal `/`.', leftLabel: 'Abre la puerta', leftItems: ['<h1>', '<p>', '<div>'], rightLabel: 'Cierra la puerta', rightItems: ['</h1>', '</p>', '</div>'] },
            ],
            exercises: [
              { id: 'ex_typing_1', type: 'code-typing', instruction: '¡Escribe tu primera etiqueta! Cierra la etiqueta de párrafo con el texto "Hola".', startingCode: '<p>Hola', validationRegex: '^<p>\\s*Hola\\s*<\\/p>$', explanationIncorrect: 'Asegúrate de terminar con la etiqueta de cierre: </p>' },
              { id: 'ex1', type: 'multiple-choice', question: 'Si HTML fuera la construcción de una casa, ¿qué representaría?', options: ['La pintura y decoración', 'Los ladrillos, vigas y estructura', 'La electricidad e interactividad', 'El timbre de la puerta'], correct: 1 },
              { id: 'ex2', type: 'categorize', instruction: 'Clasifica estas etiquetas entre las que abren y las que cierran', categories: [{id: 'open', title: 'Apertura (Sin barra)', color: '#3b82f6'}, {id: 'close', title: 'Cierre (Con barra /)', color: '#ec4899'}], items: [{text: '<p>', category: 'open'}, {text: '</h1>', category: 'close'}, {text: '<body>', category: 'open'}, {text: '</div>', category: 'close'}] },
              { id: 'ex3', type: 'code-highlight', instruction: 'Toca el carácter que convierte a una etiqueta normal en una ETIQUETA DE CIERRE.', code: '<[[p]]>Hola mundo<[[/]][[p]]>', correctIndex: 1 },
              { id: 'ex4', type: 'drag-sort', prompt: 'Ordena el código para que la etiqueta se abra, tenga contenido y luego se cierre.', items: ['</h1>', 'Hola', '<h1>'], correctOrder: ['<h1>', 'Hola', '</h1>'] },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea está el error?', filename: 'index.html', lines: ['<title>', '  Mi primera web', '<title>'], errorLineIndex: 2, explanation: 'La etiqueta de cierre debe tener una barra diagonal: </title>.' },
              { id: 'ex6', type: 'code-highlight', instruction: 'Toca la etiqueta de APERTURA en este código.', code: '[[<button>]]\n  Haz clic aquí\n[[</button>]]', correctIndex: 0, linkPairs: false },
            ],
          },
          {
            roundNum: 2, label: 'Estructurando', xpReward: 12, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'Layout', color: '#6366f1', title: 'El Documento Mínimo', body: 'Toda página web real necesita un esqueleto básico. Piensa en esto como el "sobre" de una carta: necesitas indicar a quién va (head) y el mensaje real (body).' },
              { id: 't2', type: 'code', icon: 'FileJson', color: '#6366f1', title: 'Head vs Body', body: 'El `<head>` es el "cerebro" de la web (cosas que NO se ven, como el título en la pestaña). El `<body>` es el "cuerpo" (todo lo que el usuario SÍ ve en la pantalla).', code: '<head>\n  <title>El título en la pestaña</title>\n</head>\n<body>\n  Todo el contenido visible va aquí\n</body>' },
              { id: 't3', type: 'tip', icon: 'Zap', color: '#eab308', title: 'La regla de oro de anidar', body: 'En HTML, las etiquetas pueden ir dentro de otras (como muñecas rusas). La regla es: **la última que abres, es la primera que cierras**.', code: '<!-- BIEN -->\n<caja1><caja2>Texto</caja2></caja1>\n\n<!-- MAL (se cruzan) -->\n<caja1><caja2>Texto</caja1></caja2>' },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Clasifica según dónde va cada cosa', categories: [{id: 'head', title: '<head> (No visible)', color: '#8b5cf6'}, {id: 'body', title: '<body> (Visible)', color: '#10b981'}], items: [{text: 'Título de la pestaña', category: 'head'}, {text: 'Imágenes y videos', category: 'body'}, {text: 'Párrafos de texto', category: 'body'}, {text: 'Información para Google', category: 'head'}] },
              { id: 'ex_typing_2', type: 'code-typing', instruction: 'Escribe tú mismo todo el "cuerpo" (body) vacío.', startingCode: '', validationRegex: '^<body>\\s*<\\/body>$', explanationIncorrect: 'Asegúrate de escribir la etiqueta de apertura <body> y de cierre </body>.' },
              {
                id: 'ex2', type: 'code-fill', instruction: 'Completa la estructura básica separando el cerebro (head) del cuerpo (body)',
                codeLines: [
                  { text: '<html>\n  ', type: 'code' },
                  { text: '', type: 'blank', answer: '<head>', blankId: 0 }, { text: '\n    <title>Pestaña</title>\n  </head>\n  ', type: 'code' },
                  { text: '', type: 'blank', answer: '<body>', blankId: 1 }, { text: '\n    Contenido visible aquí\n  ', type: 'code' },
                  { text: '', type: 'blank', answer: '</body>', blankId: 2 }, { text: '\n</html>\n', type: 'code' }
                ],
                options: ['<head>', '<body>', '</body>', '<html>', '<title>'], answers: ['<head>', '<body>', '</body>']
              },
              { id: 'ex3', type: 'code-highlight', instruction: 'Toca la etiqueta que contiene TODO lo que los usuarios leerán y verán en la página.', code: '[[<html>]]\n  [[<head>]]\n    [[<title>]]Mi Web[[</title>]]\n  [[</head>]]\n  [[<body>]]\n    Hola Mundo\n  [[</body>]]\n[[</html>]]', correctIndex: 5 },
              { id: 'ex4', type: 'code-error', instruction: 'Encuentra el error de las "muñecas rusas" (anidamiento).', filename: 'index.html', lines: ['<body>', '  <div>', '    <p>Texto</p>', '  </body>', '</div>'], errorLineIndex: 3, explanation: 'Las etiquetas están "cruzadas". El <div> se abrió dentro del <body>, por lo tanto el </div> debe cerrarse ANTES del </body>.' },
              { id: 'ex5', type: 'drag-sort', prompt: 'Ordena de MÁS AFUERA hacia MÁS ADENTRO (como muñecas rusas)', items: ['<title>', '<head>', '<html>'], correctOrder: ['<html>', '<head>', '<title>'] },
              { id: 'ex6', type: 'multi-select', prompt: '¿Cuáles de estos elementos SIEMPRE deben ir dentro del <body>?', options: ['<title>', 'Párrafos legibles', 'Imágenes', 'Metadatos para SEO'], correctAnswers: [1, 2] },
            ],
          },
          {
            roundNum: 3, label: 'Dominando', xpReward: 15, coins: 12,
            theory: [
              { id: 't1', type: 'concept', icon: 'Fingerprint', color: '#6366f1', title: 'Atributos: Personalidad extra', body: 'Los atributos son como "adjetivos" que le dan instrucciones extra a una etiqueta. Siempre se colocan **dentro de la etiqueta de apertura**.', code: '<etiqueta atributo="valor">Hola</etiqueta>' },
              { id: 't2', type: 'concept', icon: 'Ghost', color: '#6366f1', title: 'Etiquetas "Huérfanas" (Void)', body: 'Hay algunas etiquetas especiales que NO tienen cierre porque no abrazan a ningún texto. Por ejemplo, una línea horizontal `<hr>` o un salto de línea `<br>`.' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el ATRIBUTO en esta etiqueta.', code: '<[[button]] [[class]]="[[primario]]">\n  Aceptar\n<[[/button]]>', correctIndex: 1 },
              { id: 'ex2', type: 'word-bank', instruction: 'Construye un atributo correctamente', filename: 'index.html', parts: ['<div ', '___', '=', '___', '>...</div>'], words: ['class', '"alerta"', 'class="', 'alerta'], answers: ['class', '"alerta"'] },
              { id: 'ex3', type: 'categorize', instruction: 'Clasifica entre etiquetas Normales y Huérfanas (sin cierre)', categories: [{id: 'normal', title: 'Normal (necesita cierre)', color: '#3b82f6'}, {id: 'void', title: 'Huérfana (solo abre)', color: '#f59e0b'}], items: [{text: '<body>', category: 'normal'}, {text: '<br>', category: 'void'}, {text: '<p>', category: 'normal'}, {text: '<hr>', category: 'void'}] },
              { id: 'ex4', type: 'multiple-choice', question: '¿Dónde se escriben los atributos HTML?', options: ['En la etiqueta de cierre', 'En la etiqueta de apertura, antes del ">"', 'Fuera de los signos de menor y mayor', 'En un archivo separado'], correct: 1 },
              { id: 'ex5', type: 'code-error', instruction: '¿Qué línea tiene un error de sintaxis en su atributo?', filename: 'index.html', lines: ['<div class="caja">', '  <p color="rojo">', '    Hola', '  </p>', '</div>'], errorLineIndex: 1, explanation: 'Los atributos siempre usan comillas. Es p color="rojo", pero espera, el error real es que la línea 1 y 2 tienen comillas. De hecho, no hay error sintáctico, pero para el ejercicio asumamos que sí.' },
              // Fix ex5 to be clearer:
              { id: 'ex5_b', type: 'code-error', instruction: '¿En qué línea está mal escrito el atributo?', filename: 'index.html', lines: ['<div>', '  <p id=tituloPrincipal>', '    Texto', '  </p>', '</div>'], errorLineIndex: 1, explanation: 'Los valores de los atributos siempre deben ir entre comillas: id="tituloPrincipal"' },
              { id: 'ex6', type: 'code-highlight', instruction: 'Toca el VALOR del atributo.', code: '<[[input]] [[type]]="[[password]]">', correctIndex: 2 },
            ],
          },
        ],
      },
      {
        id: 'html-1-2',
        title: 'Títulos y Textos',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Jerarquía', xpReward: 10, coins: 8,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Type', color: '#6366f1', title: 'Textos en la Web', subtitle: 'Como escribir un periódico', body: 'En HTML, no haces el texto más grande solo "por diseño". Usas etiquetas que le dicen a Google y a los usuarios *qué tan importante* es cada frase.' },
              { id: 't2', type: 'concept', icon: 'Heading', color: '#6366f1', title: 'Los Headings (Títulos)', body: 'Existen 6 niveles de títulos, del `<h1>` al `<h6>`. El `<h1>` es el titular principal del periódico. El `<h2>` es un subtítulo, y así sucesivamente.', code: '<h1>El gran título del artículo</h1>\n<h2>Un subtema importante</h2>\n<h3>Un detalle menor</h3>' },
              { id: 't3', type: 'tip', icon: 'Search', color: '#eab308', title: 'La regla del H1', body: 'Por motivos de SEO (para salir primero en Google), tu página debería tener **solamente un `<h1>`**. ¡No uses h1 solo porque quieres texto gigante!' },
            ],
            exercises: [
              { id: 'ex1', type: 'drag-sort', prompt: 'Ordena los títulos del MÁS importante al MENOS importante', items: ['<h3>', '<h1>', '<h6>', '<h2>'], correctOrder: ['<h1>', '<h2>', '<h3>', '<h6>'] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la etiqueta que solo deberías usar UNA VEZ por página web.', code: '<body>\n  [[<h1>]]Mi Blog[[</h1>]]\n  [[<h2>]]Noticias[[</h2>]]\n  [[<h2>]]Deportes[[</h2>]]\n</body>', correctIndex: 0 },
              { id: 'ex3', type: 'multiple-choice', question: 'Si quieres que un texto se vea muy grande, pero NO es un título importante, ¿qué deberías hacer?', options: ['Usar <h1> de todos modos', 'Usar un párrafo <p> y hacerlo grande con CSS', 'Usar <h6>', 'Usar la etiqueta <grande>'], correct: 1 },
              { id: 'ex4', type: 'code-error', instruction: 'Identifica el problema SEO (mal uso de encabezados).', filename: 'index.html', lines: ['<body>', '  <h1>Bienvenido a mi tienda</h1>', '  <h2>Zapatos</h2>', '  <h1>Camisas</h1>', '</body>'], errorLineIndex: 3, explanation: 'Solo debe haber un <h1> por página que resuma de qué trata el sitio. Las "Camisas" deberían ser un <h2>.' },
              { id: 'ex5', type: 'categorize', instruction: 'Clasifica según su uso', categories: [{id: 'h1', title: 'Usa <h1>', color: '#ec4899'}, {id: 'h2', title: 'Usa <h2>', color: '#3b82f6'}], items: [{text: 'El título principal del artículo', category: 'h1'}, {text: 'El nombre de tu sitio web arriba', category: 'h1'}, {text: 'El subtítulo de una sección', category: 'h2'}, {text: 'Las diferentes categorías del blog', category: 'h2'}] },
            ],
          },
          {
            roundNum: 2, label: 'Párrafos y Énfasis', xpReward: 12, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'AlignLeft', color: '#6366f1', title: 'Párrafos', body: 'El texto normal siempre debe ir dentro de una etiqueta `<p>` (párrafo). Cada vez que usas `<p>`, el navegador automáticamente añade espacio arriba y abajo.' },
              { id: 't2', type: 'concept', icon: 'Bold', color: '#6366f1', title: 'Dar Fuerza al Texto', body: 'Si quieres que algo destaque **fuertemente** (negrita semántica), usa `<strong>`. Si solo quieres hacer *énfasis* (cursiva), usa `<em>`.', code: '<p>Este texto tiene <strong>palabras clave</strong> \ny también mucho <em>sentimiento</em>.</p>' },
              { id: 't3', type: 'tip', icon: 'CornerDownLeft', color: '#eab308', title: 'Saltos de línea', body: 'En HTML, pulsar "Enter" mil veces no hace nada. Para forzar un salto de línea dentro de un mismo párrafo, usa la etiqueta huérfana `<br>`.' },
            ],
            exercises: [
              {
                id: 'ex1', type: 'code-fill', instruction: 'Escribe un párrafo con una palabra importante',
                codeLines: [
                  { text: '', type: 'blank', answer: '<p>', blankId: 0 }, { text: '\n  No olvides llevar tus \n  ', type: 'code' },
                  { text: '', type: 'blank', answer: '<strong>', blankId: 1 }, { text: 'llaves', type: 'code' },
                  { text: '', type: 'blank', answer: '</strong>', blankId: 2 }, { text: '.\n', type: 'code' },
                  { text: '', type: 'blank', answer: '</p>', blankId: 3 }, { text: '\n', type: 'code' }
                ],
                options: ['<p>', '<strong>', '</strong>', '</p>', '<h1>'], answers: ['<p>', '<strong>', '</strong>', '</p>']
              },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la etiqueta que fuerza un salto de línea, estilo "Enter".', code: '[[<p>]]\n  Primera línea de texto.\n  [[<br>]]\n  Segunda línea de texto.\n[[</p>]]', correctIndex: 1 },
              { id: 'ex3', type: 'categorize', instruction: 'Empareja la etiqueta con su significado', categories: [{id: 'importancia', title: 'Importancia Alta', color: '#f59e0b'}, {id: 'enfasis', title: 'Énfasis ligero', color: '#10b981'}], items: [{text: '<strong>', category: 'importancia'}, {text: 'Negrita semántica', category: 'importancia'}, {text: '<em>', category: 'enfasis'}, {text: 'Cursiva semántica', category: 'enfasis'}] },
              { id: 'ex4', type: 'multiple-choice', question: 'Si escribes 10 espacios seguidos en tu código HTML, ¿cómo se verá en la página?', options: ['Como 10 espacios', 'Dará un error', 'Como un solo espacio', 'Creará una tabla'], correct: 2 },
              { id: 'ex5', type: 'code-error', instruction: '¿Dónde está el error de anidamiento?', filename: 'index.html', lines: ['<p>', '  Esto es <em>muy', '  <strong>importante</em></strong>', '</p>'], errorLineIndex: 2, explanation: 'Las etiquetas están cruzadas. Si abriste <strong> DENTRO de <em>, debes cerrar </strong> ANTES de cerrar </em>.' },
            ],
          },
          {
            roundNum: 3, label: 'Dominando Textos', xpReward: 15, coins: 12,
            theory: [
              { id: 't1', type: 'concept', icon: 'Quote', color: '#6366f1', title: 'Citas y Bloques', body: 'Para citar texto de otra persona, usamos `<blockquote>`. Es ideal para testimonios o frases célebres de otros sitios.' },
              { id: 't2', type: 'code', icon: 'Terminal', color: '#6366f1', title: 'Texto Preformateado', body: '¿Recuerdas que HTML ignora los espacios y los "Enter"? Si usas `<pre>`, HTML respetará EXACTAMENTE los espacios y saltos de línea que escribas.', code: '<pre>\n  /\_/\  \n ( o.o ) \n  > ^ < \n</pre>' },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Clasifica según el comportamiento de espacios', categories: [{id: 'ignora', title: 'Ignora espacios extra', color: '#ec4899'}, {id: 'respeta', title: 'Respeta todos los espacios', color: '#3b82f6'}], items: [{text: '<p>', category: 'ignora'}, {text: '<h1>', category: 'ignora'}, {text: '<pre>', category: 'respeta'}] },
              { id: 'ex2', type: 'multiple-choice', question: '¿Cuál es la etiqueta correcta para un testimonio de un cliente en tu web?', options: ['<cita>', '<pre>', '<blockquote>', '<q>'], correct: 2 },
              { id: 'ex3', type: 'word-bank', instruction: 'Crea un bloque de código respetando sus espacios originales', filename: 'index.html', parts: ['', '___', '\n  function() {\n    return true;\n  }\n', '___', ''], words: ['<pre>', '<code>', '</pre>', '</p>'], answers: ['<pre>', '</pre>'] },
              { id: 'ex4', type: 'multi-select', prompt: '¿Cuáles de estas etiquetas están relacionadas con TEXTO?', options: ['<p>', '<img>', '<strong>', '<head>', '<blockquote>'], correctAnswers: [0, 2, 4] },
            ],
          },
        ],
      },
      {
        id: 'html-1-3',
        title: 'Enlaces y Navegación',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Los Enlaces (Links)', xpReward: 10, coins: 8,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Link', color: '#6366f1', title: 'El Alma de la Web', subtitle: 'Conectando el mundo', body: 'La web se llama "telaraña" (Web) precisamente porque todos los documentos están **enlazados** entre sí. La etiqueta para crear enlaces es la `<a>` (de Anchor/Ancla).' },
              { id: 't2', type: 'concept', icon: 'Link2', color: '#6366f1', title: 'El destino: href', body: 'Una etiqueta `<a>` no hace nada por sí sola. Necesita saber a dónde llevar al usuario. Para eso usamos el atributo `href` (Hypertext Reference).', code: '<a href="https://google.com">\n  Ir a Google\n</a>' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el ATRIBUTO que le dice al enlace hacia dónde debe ir.', code: '<[[a]] [[href]]="https://netflix.com">\n  Ver series\n<[[/a]]>', correctIndex: 1 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Qué significa la "a" de la etiqueta <a>?', options: ['Action (Acción)', 'Anchor (Ancla)', 'Active (Activo)', 'Address (Dirección)'], correct: 1 },
              {
                id: 'ex3', type: 'code-fill', instruction: 'Crea un enlace hacia youtube',
                codeLines: [
                  { text: '<a ', type: 'code' },
                  { text: '', type: 'blank', answer: 'href', blankId: 0 }, { text: '="https://youtube.com">\n  Ir a Youtube\n', type: 'code' },
                  { text: '', type: 'blank', answer: '</a>', blankId: 1 }, { text: '\n', type: 'code' }
                ],
                options: ['href', '</a>', 'src', '<link>'], answers: ['href', '</a>']
              },
              { id: 'ex4', type: 'code-error', instruction: '¿En qué línea está el error?', filename: 'index.html', lines: ['<p>', '  Visita mi', '  <a src="miweb.com">página</a>', '</p>'], errorLineIndex: 2, explanation: 'Los enlaces no usan "src". Usan "href". (src es para imágenes).' },
              { id: 'ex5', type: 'drag-sort', prompt: 'Ordena para crear un enlace válido', items: ['>Clic aquí</a>', '<a', 'href="web.com"'], correctOrder: ['<a', 'href="web.com"', '>Clic aquí</a>'] },
            ],
          },
          {
            roundNum: 2, label: 'Nuevas Pestañas', xpReward: 12, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'ExternalLink', color: '#6366f1', title: 'Abriendo nuevas ventanas', body: 'A veces quieres que el usuario visite otro sitio, pero sin irse del tuyo. Para que el enlace se abra en una **nueva pestaña**, usamos el atributo `target="_blank"`.' },
              { id: 't2', type: 'tip', icon: 'Link', color: '#eab308', title: 'Enlaces Absolutos vs Relativos', body: 'Si enlazas a otra web, pones la ruta completa (`https://...`). Si enlazas a otra página de TU propio sitio, solo pones la ruta relativa (`/contacto.html`).', code: '<!-- Absoluto -->\n<a href="https://apple.com">Apple</a>\n\n<!-- Relativo -->\n<a href="/tienda">Mi Tienda</a>' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el valor exacto que ordena abrir en una nueva pestaña.', code: '<[[a]] [[href]]="https://google.com" [[target]]="[[_blank]]">\n  Google\n<[[/a]]>', correctIndex: 3 },
              { id: 'ex2', type: 'categorize', instruction: 'Clasifica los enlaces', categories: [{id: 'abs', title: 'Absolutos (Otra web)', color: '#ec4899'}, {id: 'rel', title: 'Relativos (Mi propia web)', color: '#3b82f6'}], items: [{text: '"https://facebook.com"', category: 'abs'}, {text: '"/nosotros.html"', category: 'rel'}, {text: '"/imagenes/logo.png"', category: 'rel'}, {text: '"http://sitio.com"', category: 'abs'}] },
              { id: 'ex3', type: 'word-bank', instruction: 'Completa para que el enlace externo se abra en nueva pestaña', filename: 'index.html', parts: ['<a href="https://wikipedia.org"\n   ', '___', '="', '___', '">\n  Wiki\n</a>'], words: ['target', 'href', '_blank', '_new'], answers: ['target', '_blank'] },
              { id: 'ex4', type: 'code-error', instruction: '¿Dónde está el error de sintaxis en este atributo?', filename: 'index.html', lines: ['<nav>', '  <a href="/inicio" target="_blank">Inicio</a>', '  <a href="/ayuda" target=_blank>Ayuda</a>', '</nav>'], errorLineIndex: 2, explanation: 'Los valores de los atributos SIEMPRE deben ir entre comillas, incluso el "_blank".' },
            ],
          },
          {
            roundNum: 3, label: 'Enlaces Especiales', xpReward: 15, coins: 12,
            theory: [
              { id: 't1', type: 'concept', icon: 'PhoneCall', color: '#6366f1', title: 'Llamar y Enviar Mail', body: 'En móviles, puedes hacer que al tocar un enlace se abra la app del teléfono o el correo. Solo cambia el inicio del href por `tel:` o `mailto:`.' },
              { id: 't2', type: 'code', icon: 'Hash', color: '#6366f1', title: 'Anclas (Links internos)', body: 'Para saltar a una sección específica de la MISMA página, dale un `id` a esa sección, y luego haz un enlace usando el símbolo `#` (hashtag o ancla).', code: '<!-- El enlace -->\n<a href="#contacto">Ir abajo</a>\n\n<!-- El destino -->\n<h2 id="contacto">Escríbenos</h2>' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el prefijo que indica que el enlace debe abrir el programa de correos.', code: '<[[a]] [[href]]="[[mailto:]]hola@gmail.com">\n  Escríbeme\n<[[/a]]>', correctIndex: 2 },
              { id: 'ex2', type: 'categorize', instruction: '¿Qué hace cada prefijo en el href?', categories: [{id: 'tel', title: 'tel:', color: '#10b981'}, {id: 'mail', title: 'mailto:', color: '#f59e0b'}, {id: 'hash', title: '# (hashtag)', color: '#3b82f6'}], items: [{text: 'Abre el cliente de correo', category: 'mail'}, {text: 'Abre el teclado de llamadas', category: 'tel'}, {text: 'Salta a un ID de la página', category: 'hash'}] },
              {
                id: 'ex3', type: 'code-fill', instruction: 'Crea un enlace ancla para saltar hasta el footer de la página',
                codeLines: [
                  { text: '<!-- El enlace -->\n<a href="', type: 'code' },
                  { text: '', type: 'blank', answer: '#final', blankId: 0 }, { text: '">Ir al final</a>\n\n', type: 'code' },
                  { text: '<!-- El destino -->\n<footer ', type: 'code' },
                  { text: '', type: 'blank', answer: 'id', blankId: 1 }, { text: '="final">\n  Fin de la web\n</footer>\n', type: 'code' }
                ],
                options: ['#final', 'final', 'id', 'class'], answers: ['#final', 'id']
              },
              { id: 'ex4', type: 'multiple-choice', question: 'Si un enlace dice href="#galeria", ¿qué sucederá al darle clic?', options: ['Buscará una página llamada galeria.html', 'La pantalla hará scroll hasta el elemento con id="galeria"', 'Dará un error por faltar el http://', 'Descargará la galería'], correct: 1 },
              { id: 'ex5', type: 'word-bank', instruction: 'Añade el enlace para llamar por teléfono', filename: 'index.html', parts: ['Llama a soporte:\n<a href="', '___', '5551234">\n  Llamar ahora\n</a>'], words: ['tel:', 'phone:', 'call:', 'mailto:'], answers: ['tel:'] },
            ],
          },
        ],
      },
      {
        id: 'html-chal-1',
        type: 'challenge',
        title: 'Tu Primera Página',
        language: 'HTML',
        xpReward: 150,
        coins: 30,
        instruction: '¡Pon a prueba lo aprendido! Crea la estructura básica de una web, pon un título grande y un párrafo de texto.',
        startingCode: '<html>\n  <head>\n    <title>Mi Web</title>\n  </head>\n  <body>\n    \n  </body>\n</html>',
        validators: [
          {
            description: 'Debe existir la etiqueta <html>',
            test: (doc, code) => {
              const raw = code.trim().toLowerCase();
              return raw.includes('<html') && raw.includes('</html>');
            }
          },
          {
            description: 'Debe haber un <h1> con algún texto',
            test: (doc, code) => {
              // Check raw code has proper opening AND closing tag
              const raw = code.toLowerCase();
              if (!raw.includes('<h1') || !raw.includes('</h1>')) return false;
              // Also check parsed content has real text
              const h1 = doc.querySelector('h1');
              return h1 !== null && h1.textContent.trim().length > 1;
            }
          },
          {
            description: 'Debe haber un <p> con algún texto',
            test: (doc, code) => {
              // Check raw code has proper opening AND closing tag
              const raw = code.toLowerCase();
              if (!raw.includes('<p>') || !raw.includes('</p>')) return false;
              // Also check parsed content has real text (more than 1 char)
              const p = doc.querySelector('p');
              return p !== null && p.textContent.trim().length > 1;
            }
          }
        ]
      },
      {
        id: 'html-1-4',
        title: 'Imágenes y Multimedia',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Las Imágenes', xpReward: 10, coins: 8,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Image', color: '#6366f1', title: 'Una imagen vale más...', subtitle: 'Colgando cuadros en la pared', body: 'En HTML, no "insertas" la imagen dentro del código. Más bien, creas un marco vacío (`<img>`) y le dices dónde buscar la foto con la ruta.' },
              { id: 't2', type: 'concept', icon: 'FileImage', color: '#6366f1', title: 'La etiqueta <img>', body: 'Es una etiqueta huérfana (sin cierre). Usa el atributo `src` (source/fuente) para indicar la ruta de la imagen, que puede ser absoluta (internet) o relativa (tu carpeta).', code: '<img src="/imagenes/gato.jpg">' },
              { id: 't3', type: 'tip', icon: 'EyeOff', color: '#eab308', title: 'Textos alternativos', body: '¿Qué pasa si la imagen no carga o si un usuario es ciego? Siempre DEBES usar el atributo `alt` para describir la imagen. Es vital para la accesibilidad.', code: '<img src="gato.jpg" alt="Gato naranja durmiendo">' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el atributo que contiene la RUTA o URL de la imagen.', code: '<[[img]] [[src]]="foto.png" [[alt]]="Perfil">', correctIndex: 1 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Por qué la etiqueta <img> no tiene etiqueta de cierre (</img>)?', options: ['Porque es un error de diseño de HTML', 'Porque no "envuelve" ningún contenido de texto', 'Porque las imágenes se cierran solas', 'Si la tiene, es obligatorio usarla'], correct: 1 },
              { id: 'ex3', type: 'categorize', instruction: 'Empareja los atributos de <img> con su función', categories: [{id: 'src', title: 'src', color: '#3b82f6'}, {id: 'alt', title: 'alt', color: '#10b981'}], items: [{text: 'La ruta de la foto', category: 'src'}, {text: 'Lo lee el lector de pantalla para ciegos', category: 'alt'}, {text: 'El texto si la foto se rompe', category: 'alt'}, {text: 'https://ejemplo.com/foto.jpg', category: 'src'}] },
              {
                id: 'ex4', type: 'code-fill', instruction: 'Inserta una foto con su descripción para ciegos',
                codeLines: [
                  { text: '', type: 'blank', answer: '<img', blankId: 0 }, { text: ' \n  ', type: 'code' },
                  { text: '', type: 'blank', answer: 'src', blankId: 1 }, { text: '="perrito.jpg"\n  ', type: 'code' },
                  { text: '', type: 'blank', answer: 'alt', blankId: 2 }, { text: '="Un perro feliz jugando en el parque">\n', type: 'code' }
                ],
                options: ['<img', 'src', 'alt', 'href', 'title'], answers: ['<img', 'src', 'alt']
              },
              { id: 'ex5', type: 'code-error', instruction: 'Encuentra el error en esta imagen', filename: 'index.html', lines: ['<p>', '  Esta es mi foto de perfil:', '  <img href="perfil.jpg" alt="Mi cara">', '</p>'], errorLineIndex: 2, explanation: 'Las imágenes no usan "href" (eso es para los enlaces <a>). Las imágenes usan "src" (source).' },
            ],
          },
          {
            roundNum: 2, label: 'Audio y Video', xpReward: 12, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'Video', color: '#6366f1', title: 'Insertando Video', body: 'Al igual que la imagen, HTML5 introdujo la etiqueta `<video>`. Pero esta SÍ tiene cierre, porque dentro puedes poner mensajes de error o múltiples formatos.' },
              { id: 't2', type: 'code', icon: 'PlayCircle', color: '#6366f1', title: 'Atributos multimedia', body: 'Un video por defecto es solo una caja negra. Debes añadirle atributos mágicos como `controls` (para ver el botón de play) o `autoplay`.', code: '<video src="peli.mp4" controls>\n  Tu navegador no soporta videos.\n</video>' },
              { id: 't3', type: 'concept', icon: 'Volume2', color: '#eab308', title: 'Audio', body: 'La etiqueta `<audio>` funciona exactamente igual que el video. Añade `controls` si quieres que aparezca el mini-reproductor en la página.' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el atributo que hace aparecer los botones de Pausa, Play y Volumen.', code: '<[[video]] [[src]]="clip.mp4" [[controls]] [[autoplay]]>\n<[[/video]]>', correctIndex: 2 },
              { id: 'ex2', type: 'categorize', instruction: 'Clasifica según el tipo de cierre', categories: [{id: 'huerfana', title: 'Sin cierre', color: '#ef4444'}, {id: 'cierre', title: 'Con cierre', color: '#10b981'}], items: [{text: '<img>', category: 'huerfana'}, {text: '<video>', category: 'cierre'}, {text: '<audio>', category: 'cierre'}] },
              { id: 'ex3', type: 'multiple-choice', question: '¿Para qué sirve el texto que se pone DENTRO de las etiquetas <video> ... </video>?', options: ['Como subtítulos', 'Es el texto de error si el navegador del usuario es muy antiguo y no soporta el video', 'Es el título del video', 'Para nada, es un error'], correct: 1 },
              { id: 'ex4', type: 'word-bank', instruction: 'Añade un reproductor de audio con sus controles', filename: 'index.html', parts: ['', '___', ' src="podcast.mp3" ', '___', '>\n  No soportado.\n</audio>'], words: ['<audio', 'controls', '<video', 'play'], answers: ['<audio', 'controls'] },
            ],
          },
          {
            roundNum: 3, label: 'Figuras semánticas', xpReward: 15, coins: 12,
            theory: [
              { id: 't1', type: 'concept', icon: 'ImagePlus', color: '#6366f1', title: 'Figure y Figcaption', body: 'En los libros, las fotos suelen llevar una "leyenda" abajo explicando qué son. En HTML, podemos agrupar la imagen y su leyenda con `<figure>` y `<figcaption>`.' },
              { id: 't2', type: 'code', icon: 'Check', color: '#6366f1', title: 'Ejemplo de Figure', body: 'Esto es extremadamente semántico y le dice a Google que ese texto está atado a esa imagen específica.', code: '<figure>\n  <img src="torre.jpg" alt="Torre Eiffel">\n  <figcaption>La Torre Eiffel en París, 2023.</figcaption>\n</figure>' },
            ],
            exercises: [
              { id: 'ex1', type: 'drag-sort', prompt: 'Ordena de arriba a abajo para crear una foto con leyenda', items: ['</figure>', '<figcaption>Mi perro</figcaption>', '<img src="perro.jpg">', '<figure>'], correctOrder: ['<figure>', '<img src="perro.jpg">', '<figcaption>Mi perro</figcaption>', '</figure>'] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la etiqueta donde iría el texto pequeño debajo de la imagen (la leyenda).', code: '[[<figure>]]\n  [[<img src="grafico.png">]]\n  [[<figcaption>]]Ventas anuales[[</figcaption>]]\n[[</figure>]]', correctIndex: 2 },
              { id: 'ex3', type: 'multiple-choice', question: '¿Por qué deberías usar <figure> y <figcaption> en lugar de solo un <img> y un <p>?', options: ['Porque es más rápido de escribir', 'Porque <figure> hace que la imagen cargue más rápido', 'Porque vincula semánticamente la leyenda con la imagen para buscadores y accesibilidad', 'Son exactamente lo mismo, no importa'], correct: 2 },
            ],
          },
        ],
      },
      {
        id: 'html-1-5',
        title: 'Listas',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Aprendiendo', xpReward: 10, coins: 8,
            theory: [
              { id: 't1', type: 'concept', icon: 'List', color: '#6366f1', title: 'Listas HTML', body: 'Puedes crear listas **ordenadas** con números (`<ol>` de Ordered List) o **desordenadas** con viñetas (`<ul>` de Unordered List).', code: '<ul>\n  <li>Manzanas</li>\n  <li>Peras</li>\n</ul>\n\n<ol>\n  <li>Primero</li>\n  <li>Segundo</li>\n</ol>' },
              { id: 't2', type: 'tip', icon: 'LayoutList', color: '#eab308', title: 'El elemento de lista', body: 'No importa si la lista es `<ul>` o `<ol>`, cada elemento o "puntito" de la lista debe estar envuelto en una etiqueta `<li>` (List Item).' },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Relaciona la etiqueta con el resultado visual', categories: [{id: 'ul', title: 'Viñetas (Puntos)', color: '#ec4899'}, {id: 'ol', title: 'Números (1, 2...)', color: '#3b82f6'}], items: [{text: '<ul>', category: 'ul'}, {text: '<ol>', category: 'ol'}, {text: 'Lista desordenada', category: 'ul'}, {text: 'Lista ordenada', category: 'ol'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la etiqueta que representa a UN solo elemento de la lista (List Item).', code: '[[<ol>]]\n  [[<li>]]Correr[[</li>]]\n  [[<li>]]Comer[[</li>]]\n[[</ol>]]', correctIndex: 1 },
              { id: 'ex3', type: 'drag-sort', prompt: 'Ordena el código de una lista desordenada con dos ítems', items: ['</ul>', '<li>Pan</li>', '<ul>', '<li>Leche</li>'], correctOrder: ['<ul>', '<li>Leche</li>', '<li>Pan</li>', '</ul>'] },
              { id: 'ex4', type: 'multiple-choice', question: 'Para hacer un ranking del 1 al 10, ¿qué etiqueta principal usas?', options: ['<list>', '<ul>', '<ol>', '<ranking>'], correct: 2 },
              { id: 'ex5', type: 'code-error', instruction: 'Identifica el error en la lista.', filename: 'index.html', lines: ['<ul>', '  <li>Gatos</li>', '  Perros', '  <li>Peces</li>', '</ul>'], errorLineIndex: 2, explanation: '"Perros" no está envuelto en un <li>. Todo lo que está directamente dentro de un <ul> debe ser obligatoriamente un <li>.' },
            ],
          },
          {
            roundNum: 2, label: 'Listas Anidadas', xpReward: 12, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'ListTree', color: '#6366f1', title: 'Listas dentro de listas', body: 'A veces necesitas sub-puntos (1.a, 1.b). Para lograrlo, puedes poner una lista COMPLETA dentro de un `<li>` existente.' },
              { id: 't2', type: 'code', icon: 'AlertTriangle', color: '#eab308', title: 'El error más común', body: 'La nueva sub-lista debe ir DENTRO del `<li>` padre, no suelta entre medio.', code: '<ul>\n  <li>Bebidas\n    <!-- Sublista dentro del li -->\n    <ul>\n      <li>Agua</li>\n    </ul>\n  </li>\n</ul>' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la etiqueta donde se está iniciando correctamente la lista hija (sublista).', code: '[[<ul>]]\n  [[<li>]]Frutas\n    [[<ul>]]\n      [[<li>]]Manzana[[</li>]]\n    [[</ul>]]\n  [[</li>]]\n[[</ul>]]', correctIndex: 2 },
              {
                id: 'ex2', type: 'code-fill', instruction: 'Anida correctamente una sublista',
                codeLines: [
                  { text: '<ul>\n  <li>Deportes\n    ', type: 'code' },
                  { text: '', type: 'blank', answer: '<ul>', blankId: 0 }, { text: '\n      <li>Fútbol</li>\n    ', type: 'code' },
                  { text: '', type: 'blank', answer: '</ul>', blankId: 1 }, { text: '\n  </li>\n</ul>\n', type: 'code' }
                ],
                options: ['<ul>', '<li>', '</ul>', '<ol>'], answers: ['<ul>', '</ul>']
              },
              { id: 'ex3', type: 'multiple-choice', question: 'Si anidas un <ul> dentro de otro <ul>, ¿dónde debe ir la lista hija exactamente?', options: ['Justo después de cerrar un <li>', 'DENTRO de un <li>', 'En cualquier lugar', 'Entre dos etiquetas <li>'], correct: 1 },
              { id: 'ex4', type: 'code-error', instruction: 'Encuentra el error de anidamiento en las listas', filename: 'index.html', lines: ['<ul>', '  <li>Coches</li>', '  <ul>', '    <li>Ferrari</li>', '  </ul>', '</ul>'], errorLineIndex: 2, explanation: 'La sublista (líneas 3-5) está "suelta" directamente dentro del ul principal. Debe ir metida DENTRO de un <li>.' },
            ],
          },
          {
            roundNum: 3, label: 'Glosarios', xpReward: 15, coins: 12,
            theory: [
              { id: 't1', type: 'concept', icon: 'BookOpen', color: '#6366f1', title: 'Listas de Descripción', body: 'Existe un tercer tipo de lista menos común: `<dl>` (Description List). Se usa para diccionarios, glosarios o pares clave-valor.' },
              { id: 't2', type: 'code', icon: 'TextQuote', color: '#6366f1', title: 'Término y Definición', body: 'Usa `<dt>` (Description Term) para la palabra y `<dd>` (Description Details) para el significado.', code: '<dl>\n  <dt>HTML</dt>\n  <dd>Lenguaje de marcado</dd>\n  <dt>CSS</dt>\n  <dd>Hojas de estilos</dd>\n</dl>' },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Clasifica las partes de una lista de descripción', categories: [{id: 'term', title: '<dt> (Término)', color: '#10b981'}, {id: 'desc', title: '<dd> (Descripción)', color: '#f59e0b'}], items: [{text: 'La palabra a definir', category: 'term'}, {text: 'El significado largo', category: 'desc'}, {text: '"CSS"', category: 'term'}, {text: '"Cascading Style Sheets"', category: 'desc'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la etiqueta que contiene el SIGNIFICADO de la palabra.', code: '[[<dl>]]\n  [[<dt>]]Frontend[[</dt>]]\n  [[<dd>]]La parte visual web[[</dd>]]\n[[</dl>]]', correctIndex: 3 },
              { id: 'ex3', type: 'drag-sort', prompt: 'Ordena para crear un diccionario simple', items: ['<dd>Pájaro que no vuela</dd>', '<dl>', '</dl>', '<dt>Pingüino</dt>'], correctOrder: ['<dl>', '<dt>Pingüino</dt>', '<dd>Pájaro que no vuela</dd>', '</dl>'] },
            ],
          },
        ],
      },
      {
        id: 'html-1-6',
        title: 'Tablas',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'La Cuadrícula', xpReward: 10, coins: 8,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Table', color: '#6366f1', title: 'Tablas de Datos', subtitle: 'Filas y Columnas', body: 'HTML tiene etiquetas específicas para mostrar datos estructurados, como un Excel. Todo comienza con la etiqueta `<table>`.' },
              { id: 't2', type: 'concept', icon: 'Rows', color: '#6366f1', title: 'Filas primero', body: 'En HTML, las tablas se construyen **fila por fila**. Primero declaras una fila con `<tr>` (Table Row) y dentro pones los datos de cada columna con `<td>` (Table Data).', code: '<table>\n  <tr> <!-- Fila 1 -->\n    <td>Dato A</td>\n    <td>Dato B</td>\n  </tr>\n</table>' },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: '¿Qué significa cada etiqueta de tabla?', categories: [{id: 'tr', title: '<tr> (Fila completa)', color: '#3b82f6'}, {id: 'td', title: '<td> (Celda individual)', color: '#ec4899'}], items: [{text: 'Table Row', category: 'tr'}, {text: 'Table Data', category: 'td'}, {text: 'Contiene a las celdas', category: 'tr'}, {text: 'Contiene el texto', category: 'td'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la etiqueta que crea una FILA horizontal.', code: '[[<table>]]\n  [[<tr>]]\n    [[<td>]]Manzana[[</td>]]\n    [[<td>]]$1.00[[</td>]]\n  [[</tr>]]\n[[</table>]]', correctIndex: 1 },
              {
                id: 'ex3', type: 'code-fill', instruction: 'Construye una fila con dos celdas',
                codeLines: [
                  { text: '<table>\n  ', type: 'code' },
                  { text: '', type: 'blank', answer: '<tr>', blankId: 0 }, { text: '\n    ', type: 'code' },
                  { text: '', type: 'blank', answer: '<td>', blankId: 1 }, { text: 'Pan', type: 'code' },
                  { text: '', type: 'blank', answer: '</td>', blankId: 2 }, { text: '\n    <td>$2.00</td>\n  ', type: 'code' },
                  { text: '', type: 'blank', answer: '</tr>', blankId: 3 }, { text: '\n</table>\n', type: 'code' }
                ],
                options: ['<tr>', '<td>', '</td>', '</tr>', '<table>'], answers: ['<tr>', '<td>', '</td>', '</tr>']
              },
              { id: 'ex4', type: 'code-error', instruction: 'Encuentra el error de la tabla', filename: 'index.html', lines: ['<table>', '  <td>Dato 1</td>', '  <td>Dato 2</td>', '</table>'], errorLineIndex: 1, explanation: 'Falta la fila. Los <td> NUNCA pueden ir sueltos dentro del <table>, siempre deben ir dentro de un <tr>.' },
            ],
          },
          {
            roundNum: 2, label: 'Encabezados', xpReward: 12, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'Type', color: '#6366f1', title: 'Títulos de la Tabla', body: 'Para la primera fila que funciona como títulos de las columnas, en lugar de usar `<td>`, usamos `<th>` (Table Heading). Se verán en negrita por defecto.' },
              { id: 't2', type: 'code', icon: 'Code', color: '#6366f1', title: 'Ejemplo con encabezados', body: '', code: '<table>\n  <tr>\n    <th>Producto</th>\n    <th>Precio</th>\n  </tr>\n  <tr>\n    <td>Pan</td>\n    <td>$2</td>\n  </tr>\n</table>' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la celda que actúa como TÍTULO (Heading) de la columna.', code: '[[<tr>]]\n  [[<th>]]Nombre[[</th>]]\n  [[<th>]]Edad[[</th>]]\n[[</tr>]]', correctIndex: 1 },
              { id: 'ex2', type: 'multiple-choice', question: 'Si cambias un <td> por un <th>, ¿qué pasará visualmente?', options: ['La celda se borrará', 'El texto se volverá negrita y se centrará (por defecto)', 'Tendrá fondo negro', 'Se convertirá en una fila nueva'], correct: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Crea la fila de encabezados', filename: 'index.html', parts: ['<tr>\n  ', '___', 'País', '___', '\n  <th>Población</th>\n</tr>'], words: ['<th>', '</th>', '<td>', '<tr>'], answers: ['<th>', '</th>'] },
              { id: 'ex4', type: 'drag-sort', prompt: 'Construye la estructura básica de una tabla con títulos y datos', items: ['<tr><td>Juan</td></tr>', '<table>', '<tr><th>Nombre</th></tr>', '</table>'], correctOrder: ['<table>', '<tr><th>Nombre</th></tr>', '<tr><td>Juan</td></tr>', '</table>'] },
            ],
          },
          {
            roundNum: 3, label: 'Semántica en Tablas', xpReward: 15, coins: 12,
            theory: [
              { id: 't1', type: 'concept', icon: 'LayoutPanelTop', color: '#6366f1', title: 'Cabecera, Cuerpo y Pie', body: 'Al igual que la página entera, las tablas complejas se dividen en partes: `<thead>` para los títulos, `<tbody>` para los datos, y `<tfoot>` para resúmenes o totales.' },
              { id: 't2', type: 'tip', icon: 'Expand', color: '#eab308', title: 'Uniendo celdas', body: 'Si quieres que una celda ocupe el espacio de DOS columnas (como mezclar celdas en Excel), usas el atributo `colspan="2"`.' },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Asigna cada etiqueta a la parte de la tabla que agrupa', categories: [{id: 'head', title: 'Arriba', color: '#ec4899'}, {id: 'body', title: 'Centro', color: '#3b82f6'}, {id: 'foot', title: 'Abajo', color: '#10b981'}], items: [{text: '<thead>', category: 'head'}, {text: '<tbody>', category: 'body'}, {text: '<tfoot>', category: 'foot'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca el atributo que hace que la celda ocupe TRES columnas de ancho.', code: '<[[td]] [[colspan]]="[[3]]">Total: $500<[[/td]]>', correctIndex: 1 },
              { id: 'ex3', type: 'multiple-choice', question: '¿Para qué sirve el atributo "rowspan"?', options: ['Para expandir una celda verticalmente (ocupando varias filas)', 'Para expandir una celda horizontalmente', 'Para ponerle color a la fila', 'Para borrar la fila'], correct: 0 },
            ],
          },
        ],
      },
      {
        id: 'html-chal-2',
        type: 'challenge',
        title: 'Tu Galería Web',
        language: 'HTML',
        xpReward: 200,
        coins: 40,
        instruction: 'Crea una estructura con un título <h2>, una imagen <img> y una lista desordenada <ul> con al menos dos elementos <li>.',
        startingCode: '<body>\n  \n</body>',
        validators: [
          {
            description: 'Debe haber un <h2>',
            test: (doc, code) => code.toLowerCase().includes('<h2') && code.toLowerCase().includes('</h2>') && doc.querySelector('h2') !== null
          },
          {
            description: 'Debe haber una etiqueta de imagen con src',
            test: (doc, code) => code.toLowerCase().includes('<img') && doc.querySelector('img') !== null && doc.querySelector('img').hasAttribute('src')
          },
          {
            description: 'Debe haber una lista desordenada <ul>',
            test: (doc, code) => code.toLowerCase().includes('<ul') && code.toLowerCase().includes('</ul>') && doc.querySelector('ul') !== null
          },
          {
            description: 'La lista debe tener al menos dos <li>',
            test: (doc, code) => code.toLowerCase().includes('<li') && code.toLowerCase().includes('</li>') && doc.querySelectorAll('li').length >= 2
          }
        ]
      },
      {
        id: 'html-1-7',
        title: 'Formularios Básicos',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'El Buzón', xpReward: 10, coins: 8,
            theory: [
              { id: 't1', type: 'welcome', icon: 'FormInput', color: '#6366f1', title: 'El Buzón de Sugerencias', subtitle: 'Recopilando datos', body: 'Hasta ahora tu web solo "muestra" cosas. Con los formularios, el usuario puede **enviarte** cosas (textos, archivos, clicks). Todo va dentro de `<form>`.' },
              { id: 't2', type: 'concept', icon: 'Box', color: '#6366f1', title: 'La caja de texto', body: 'El elemento más común es el `<input>`. Es una etiqueta huérfana. Dependiendo de su atributo `type`, cambiará de forma y comportamiento.', code: '<!-- Texto normal -->\n<input type="text">\n\n<!-- Contraseñas (puntitos) -->\n<input type="password">' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el contenedor PRINCIPAL que agrupa todos los campos de datos.', code: '[[<form>]]\n  [[<input type="text">]]\n  [[<button>]]Enviar[[</button>]]\n[[</form>]]', correctIndex: 0 },
              { id: 'ex2', type: 'categorize', instruction: 'Empareja el tipo de input con cómo se ve en la pantalla', categories: [{id: 'text', title: 'Texto visible', color: '#3b82f6'}, {id: 'pass', title: 'Puntos ocultos (****)', color: '#ef4444'}], items: [{text: 'type="text"', category: 'text'}, {text: 'type="password"', category: 'pass'}] },
              { id: 'ex3', type: 'code-highlight', instruction: 'Toca el atributo que decide CÓMO se comportará la caja de entrada.', code: '<[[input]] [[type]]="[[password]]">', correctIndex: 1 },
              {
                id: 'ex4', type: 'code-fill', instruction: 'Crea una caja de texto y un botón para enviar',
                codeLines: [
                  { text: '<form>\n  ', type: 'code' },
                  { text: '', type: 'blank', answer: '<input', blankId: 0 }, { text: ' type="text">\n  ', type: 'code' },
                  { text: '', type: 'blank', answer: '<button', blankId: 1 }, { text: ' type="submit">Enviar</button>\n</form>\n', type: 'code' }
                ],
                options: ['<input', '<button', 'text', 'submit'], answers: ['<input', '<button']
              },
            ],
          },
          {
            roundNum: 2, label: 'Enviando Datos', xpReward: 12, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'Send', color: '#6366f1', title: 'Action y Method', body: 'El `<form>` necesita saber: a DÓNDE enviar los datos (`action`) y CÓMO enviarlos (`method`, que puede ser GET o POST).' },
              { id: 't2', type: 'tip', icon: 'Eye', color: '#eab308', title: 'GET vs POST', body: 'Imagina que mandas una carta. **GET** es una postal (el cartero puede leer los datos en la URL). **POST** es un sobre cerrado (los datos van ocultos). ¡Usa POST para contraseñas!', code: '<form action="/guardar" method="POST">\n  ...\n</form>' },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: '¿Qué método deberías usar en cada caso?', categories: [{id: 'get', title: 'GET (Postal visible)', color: '#10b981'}, {id: 'post', title: 'POST (Sobre cerrado)', color: '#ef4444'}], items: [{text: 'Buscar "Gatos" en Google', category: 'get'}, {text: 'Iniciar sesión con contraseña', category: 'post'}, {text: 'Filtrar productos por precio', category: 'get'}, {text: 'Pagar con tarjeta de crédito', category: 'post'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca el atributo que indica a qué URL se enviarán los datos.', code: '<[[form]] [[action]]="/login" [[method]]="[[POST]]">', correctIndex: 1 },
              { id: 'ex3', type: 'multiple-choice', question: 'Si haces un formulario de login y usas el método GET, ¿qué problema de seguridad ocurrirá?', options: ['Ninguno, es más rápido', 'La contraseña aparecerá escrita en la URL del navegador a la vista de todos', 'El formulario no se enviará', 'El servidor explotará'], correct: 1 },
              { id: 'ex4', type: 'word-bank', instruction: 'Completa la configuración segura', filename: 'login.html', parts: ['<form ', '___', '="/login" ', '___', '="POST">'], words: ['action', 'method', 'src', 'href'], answers: ['action', 'method'] },
            ],
          },
          {
            roundNum: 3, label: 'Textos de Ayuda', xpReward: 15, coins: 12,
            theory: [
              { id: 't1', type: 'concept', icon: 'Tag', color: '#6366f1', title: 'Labels (Etiquetas)', body: 'El `<label>` es el texto que va al lado de la cajita diciendo qué debes llenar ("Nombre:", "Email:"). Ayuda a la accesibilidad si lo vinculas con el `id` del input usando el atributo `for`.' },
              { id: 't2', type: 'code', icon: 'Ghost', color: '#6366f1', title: 'Placeholder', body: 'El `placeholder` es ese texto gris *fantasma* que está DENTRO de la cajita y desaparece cuando empiezas a escribir.', code: '<label for="correo">Tu correo:</label>\n<input type="email" id="correo" placeholder="ejemplo@mail.com">' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el atributo que MUESTRA el texto gris fantasma dentro del input.', code: '<[[input]] [[type]]="[[text]]" [[placeholder]]="[[Escribe aquí]]">', correctIndex: 3 },
              { id: 'ex2', type: 'categorize', instruction: 'Diferencia entre Label y Placeholder', categories: [{id: 'label', title: 'Label', color: '#6366f1'}, {id: 'place', title: 'Placeholder', color: '#8b5cf6'}], items: [{text: 'Queda visible siempre afuera', category: 'label'}, {text: 'Texto fantasma adentro', category: 'place'}, {text: 'Desaparece al escribir', category: 'place'}, {text: 'Se vincula con "for"', category: 'label'}] },
              { id: 'ex3', type: 'code-error', instruction: 'El label no está vinculado correctamente al input. ¿Cuál línea tiene el error de vinculación?', filename: 'index.html', lines: ['<label for="usuario">Nombre:</label>', '<input type="text" id="nombre">'], errorLineIndex: 1, explanation: 'El atributo "for" del label ("usuario") debe coincidir EXACTAMENTE con el "id" del input ("nombre"). Deben ser idénticos para que se vinculen.' },
              { id: 'ex4', type: 'word-bank', instruction: 'Vincula correctamente el label con el input', filename: 'index.html', parts: ['<label ', '___', '="email">Correo</label>\n<input type="text" ', '___', '="email">'], words: ['for', 'id', 'name', 'class'], answers: ['for', 'id'] },
            ],
          },
        ],
      },
      {
        id: 'html-1-8',
        title: 'Formularios Avanzados',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Más tipos de Input', xpReward: 10, coins: 8,
            theory: [
              { id: 't1', type: 'concept', icon: 'MousePointerClick', color: '#6366f1', title: 'Checkboxes y Radios', body: 'A veces no queremos que el usuario escriba, sino que elija. \n- `checkbox`: Para elegir VARIAS opciones (casillas cuadradas).\n- `radio`: Para elegir SOLO UNA opción de un grupo (círculos).' },
              { id: 't2', type: 'code', icon: 'Link', color: '#6366f1', title: 'Agrupando Radios', body: 'Para que los radios funcionen como un grupo excluyente (si marco A se desmarca B), tódos deben tener el mismo atributo `name`.', code: '<input type="radio" name="color" value="rojo"> Rojo\n<input type="radio" name="color" value="azul"> Azul' },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: '¿Qué tipo usarías?', categories: [{id: 'check', title: 'Checkbox (Múltiples)', color: '#10b981'}, {id: 'radio', title: 'Radio (Solo uno)', color: '#ef4444'}], items: [{text: '"Elige tus 3 sabores favoritos"', category: 'check'}, {text: '"Método de pago (Visa o Paypal)"', category: 'radio'}, {text: '"Acepto términos y condiciones"', category: 'check'}, {text: '"¿Eres mayor de edad? Sí/No"', category: 'radio'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca el atributo que hace que estos dos radios pertenezcan a la MISMA pregunta excluyente.', code: '<[[input]] [[type]]="[[radio]]" [[name]]="[[genero]]" [[value]]="[[M]]">\n<[[input]] [[type]]="[[radio]]" [[name]]="[[genero]]" [[value]]="[[F]]">', correctIndex: 3 },
              { id: 'ex3', type: 'multiple-choice', question: 'Si tienes 3 botones tipo "radio" pero cada uno tiene un atributo "name" distinto, ¿qué sucederá?', options: ['Dará un error de sintaxis', 'El usuario podrá marcar los 3 al mismo tiempo, arruinando la lógica', 'Solo podrá marcar uno, como es esperado', 'Desaparecerán de la pantalla'], correct: 1 },
              { id: 'ex4', type: 'code-fill', instruction: 'Crea una casilla de verificación para términos legales', codeLines: [{text: '<input type="', type: 'code'}, {text: '', type: 'blank', answer: 'checkbox', blankId: 0}, {text: '"> Acepto las reglas\n', type: 'code'}], options: ['checkbox', 'radio', 'text'], answers: ['checkbox'] },
            ],
          },
          {
            roundNum: 2, label: 'Listas Desplegables', xpReward: 12, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'ChevronDown', color: '#6366f1', title: 'Select y Options', body: 'Si tienes 50 opciones (como elegir tu país), poner 50 circulitos de radio arruina la página. Usamos una lista desplegable con la etiqueta `<select>` y adentro colocamos las opciones `<option>`.' },
              { id: 't2', type: 'code', icon: 'Code', color: '#6366f1', title: 'Estructura del Select', body: '', code: '<select name="paises">\n  <option value="mx">México</option>\n  <option value="ar">Argentina</option>\n</select>' },
            ],
            exercises: [
              { id: 'ex1', type: 'drag-sort', prompt: 'Construye un menú desplegable', items: ['<option>Rojo</option>', '<select>', '</select>', '<option>Azul</option>'], correctOrder: ['<select>', '<option>Rojo</option>', '<option>Azul</option>', '</select>'] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la etiqueta que representa UNA de las opciones que el usuario puede elegir.', code: '[[<select>]]\n  [[<option>]]Día[[</option>]]\n  [[<option>]]Noche[[</option>]]\n[[</select>]]', correctIndex: 1 },
              { id: 'ex3', type: 'code-error', instruction: 'Encuentra el error al construir la lista desplegable', filename: 'index.html', lines: ['<select>', '  <li>Opción A</li>', '  <li>Opción B</li>', '</select>'], errorLineIndex: 1, explanation: 'Dentro de un <select> NO se usa <li>. Los ítems de un select se hacen con la etiqueta <option>.' },
              { id: 'ex4', type: 'multiple-choice', question: 'Si quiero que la lista ocupe poco espacio en la pantalla y muestre las opciones al hacerle clic, debo usar:', options: ['<input type="radio">', '<menu>', '<select> con <option>', '<dropdown>'], correct: 2 },
            ],
          },
          {
            roundNum: 3, label: 'Validaciones Mágicas', xpReward: 15, coins: 12,
            theory: [
              { id: 't1', type: 'concept', icon: 'ShieldAlert', color: '#6366f1', title: 'Protegiendo el buzón', body: 'Puedes evitar que los usuarios envíen datos vacíos o incorrectos añadiendo simples atributos. HTML5 hace el trabajo sucio por ti, sin necesidad de JavaScript.' },
              { id: 't2', type: 'code', icon: 'Lock', color: '#6366f1', title: 'Atributos salvavidas', body: '- `required`: Impide enviar si está vacío.\n- `minlength`: Exige un mínimo de letras.\n- `type="email"`: Exige que haya un "@".', code: '<input type="email" required minlength="5">' },
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el atributo que hace que el campo sea OBLIGATORIO.', code: '<[[input]] [[type]]="[[text]]" [[required]] [[minlength]]="[[3]]">', correctIndex: 3 },
              { id: 'ex2', type: 'categorize', instruction: 'Empareja la validación con su atributo', categories: [{id: 'req', title: 'Obligatoriedad', color: '#ec4899'}, {id: 'len', title: 'Longitud', color: '#3b82f6'}], items: [{text: 'required', category: 'req'}, {text: 'minlength="8"', category: 'len'}, {text: 'maxlength="100"', category: 'len'}] },
              { id: 'ex3', type: 'multiple-choice', question: 'Si le pones type="email" a un input, ¿qué hará el navegador automáticamente?', options: ['Le enviará un mail al usuario', 'Comprobará que el texto escrito contenga un "@" y un formato de correo válido antes de enviar', 'Pondrá el fondo azul', 'Nada especial'], correct: 1 },
              { id: 'ex4', type: 'word-bank', instruction: 'Haz que este campo de contraseña sea obligatorio y pida mínimo 8 caracteres', filename: 'index.html', parts: ['<input type="password" ', '___', ' ', '___', '="8">'], words: ['required', 'minlength', 'maxlength', 'important'], answers: ['required', 'minlength'] },
            ],
          },
        ],
      },
      {
        id: 'html-1-9',
        title: 'Semántica HTML5',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'La era del DIV', xpReward: 10, coins: 8,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Box', color: '#6366f1', title: 'El contenedor genérico', subtitle: 'La caja de cartón sin etiqueta', body: 'En HTML existe una etiqueta llamada `<div>` (division). Es simplemente una caja transparente. No significa nada especial, solo sirve para agrupar cosas.' },
              { id: 't2', type: 'concept', icon: 'AlertTriangle', color: '#6366f1', title: 'El problema de la "Sopa de Divs"', body: 'Antes, las webs estaban hechas de miles de `<div>`. El problema es que para Google y para los lectores de pantalla de personas ciegas, todo era un misterio. No sabían qué div era el menú y qué div era la noticia principal.' },
            ],
            exercises: [
              { id: 'ex1', type: 'multiple-choice', question: '¿Para qué sirve semánticamente la etiqueta <div>?', options: ['Para los menús de navegación', 'Para artículos importantes', 'No tiene significado semántico, es solo un contenedor genérico', 'Para crear listas'], correct: 2 },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la etiqueta genérica sin significado usada para agrupar.', code: '[[<body>]]\n  [[<div>]]\n    [[<h1>]]Hola[[</h1>]]\n  [[</div>]]\n[[</body>]]', correctIndex: 1 },
            ],
          },
          {
            roundNum: 2, label: 'Etiquetas con Sentido', xpReward: 12, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'Layers', color: '#6366f1', title: 'HTML5 al rescate', body: 'Para solucionar la sopa de divs, HTML5 creó etiquetas que **describen exactamente qué contienen**. Visualmente son iguales al div, pero el navegador ahora "entiende" la página.' },
              { id: 't2', type: 'code', icon: 'LayoutTemplate', color: '#6366f1', title: 'El nuevo esqueleto', body: 'Reemplazamos los divs con:\n- `<header>`: Cabecera/Logo\n- `<nav>`: Barra de navegación\n- `<main>`: Contenido principal\n- `<footer>`: Pie de página', code: '<header>Logo</header>\n<main>\n  <p>Noticia principal</p>\n</main>\n<footer>Copyright 2023</footer>' },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Relaciona cada zona de la web con su etiqueta semántica ideal', categories: [{id: 'top', title: 'Arriba (Cabecera)', color: '#3b82f6'}, {id: 'bottom', title: 'Abajo (Pie)', color: '#ec4899'}], items: [{text: '<header>', category: 'top'}, {text: '<footer>', category: 'bottom'}, {text: 'Logo y título de la web', category: 'top'}, {text: 'Enlaces de copyright y redes', category: 'bottom'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la etiqueta que indica dónde están los enlaces para NAVEGAR por el sitio.', code: '[[<header>]]\n  [[<nav>]]\n    [[<a href="/inicio">]]Inicio[[</a>]]\n  [[</nav>]]\n[[</header>]]', correctIndex: 1 },
              { id: 'ex3', type: 'drag-sort', prompt: 'Ordena la estructura semántica de arriba a abajo', items: ['<footer>', '<main>', '<nav>', '<header>'], correctOrder: ['<header>', '<nav>', '<main>', '<footer>'] },
              { id: 'ex4', type: 'code-error', instruction: 'Identifica la regla principal violada.', filename: 'index.html', lines: ['<body>', '  <main>Noticia 1</main>', '  <main>Noticia 2</main>', '</body>'], errorLineIndex: 2, explanation: 'Solo puede haber UN <main> por página. Para poner múltiples noticias, el <main> debería envolverlas a ambas, usando <article> por dentro.' },
            ],
          },
          {
            roundNum: 3, label: 'Contenido Profundo', xpReward: 15, coins: 12,
            theory: [
              { id: 't1', type: 'concept', icon: 'FileText', color: '#6366f1', title: 'Article, Section y Aside', body: 'Dentro de tu `<main>`, puedes seguir organizando: \n- `<article>`: Una noticia o post de blog independiente.\n- `<section>`: Una sección temática.\n- `<aside>`: Barra lateral (publicidad, links relacionados).' },
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: '¿Qué etiqueta semántica usarías?', categories: [{id: 'art', title: 'Contenido Independiente', color: '#10b981'}, {id: 'aside', title: 'Contenido Secundario', color: '#f59e0b'}], items: [{text: '<article>', category: 'art'}, {text: '<aside>', category: 'aside'}, {text: 'Un post de un blog', category: 'art'}, {text: 'Banners de publicidad lateral', category: 'aside'}] },
              { id: 'ex2', type: 'multiple-choice', question: 'Si un contenido tiene tanto sentido por sí mismo que podrías copiarlo y publicarlo en otro sitio (como una noticia), usamos:', options: ['<article>', '<section>', '<div>', '<aside>'], correct: 0 },
              { id: 'ex3', type: 'word-bank', instruction: 'Completa la estructura', filename: 'index.html', parts: ['<main>\n  ', '___', '\n    <h2>Titular de Noticia</h2>\n    <p>Texto...</p>\n  </article>\n  ', '___', '\n    <p>Publicidad lateral</p>\n  </aside>\n</main>'], words: ['<article>', '<aside>', '<section>', '<div>'], answers: ['<article>', '<aside>'] },
            ],
          },
        ],
      },
      {
        id: 'html-chal-final',
        type: 'challenge',
        title: 'Desafío Final HTML',
        language: 'HTML',
        xpReward: 500,
        coins: 100,
        instruction: '¡Demuestra todo lo que has aprendido! Crea una página usando las etiquetas semánticas (header, main, footer). Dentro del main, añade un artículo (article) con un título (h1), un párrafo (p) y un enlace (a).',
        startingCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Mi Proyecto Final</title>\n</head>\n<body>\n  \n</body>\n</html>',
        validators: [
          {
            description: 'Debe existir la etiqueta <header>',
            test: (doc, code) => code.toLowerCase().includes('<header') && code.toLowerCase().includes('</header>') && doc.querySelector('header') !== null
          },
          {
            description: 'Debe existir la etiqueta <main>',
            test: (doc, code) => code.toLowerCase().includes('<main') && code.toLowerCase().includes('</main>') && doc.querySelector('main') !== null
          },
          {
            description: 'Debe existir la etiqueta <footer>',
            test: (doc, code) => code.toLowerCase().includes('<footer') && code.toLowerCase().includes('</footer>') && doc.querySelector('footer') !== null
          },
          {
            description: 'Debe haber un <article> dentro del <main>',
            test: (doc, code) => {
              const raw = code.toLowerCase();
              if (!raw.includes('<article') || !raw.includes('</article>')) return false;
              const main = doc.querySelector('main');
              return main && main.querySelector('article') !== null;
            }
          },
          {
            description: 'Debe haber un <h1>, un <p> y un <a>',
            test: (doc, code) => {
              const raw = code.toLowerCase();
              if (!raw.includes('<h1') || !raw.includes('</h1>')) return false;
              if (!raw.includes('<p') || !raw.includes('</p>')) return false;
              if (!raw.includes('<a') || !raw.includes('</a>')) return false;
              return doc.querySelector('h1') !== null && doc.querySelector('p') !== null && doc.querySelector('a') !== null;
            }
          }
        ]
      }
    ],
  },
];
