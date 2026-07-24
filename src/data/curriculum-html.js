export const curriculumHtml = [
  {
    id: 'html-1',
    title: 'HTML: El Esqueleto de la Web',
    description: 'Aprende los fundamentos construyendo páginas web desde cero, sin conocimiento previo.',
    color: '#6366f1',
    language: 'HTML',
    lessons: [
      // ── LECCIÓN 1: Los Cimientos (Fundamentos) ────────────────────────────
      {
        id: 'html-1-1',
        title: 'Los Cimientos (Fundamentos)',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Aprendiendo', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Globe', color: '#6366f1', title: '¿Qué es HTML realmente?', subtitle: 'El lenguaje de estructura universal', body: 'HTML significa **HyperText Markup Language** (Lenguaje de Marcado de Hipertexto). No es un lenguaje de programación con lógica como Python o JavaScript, sino un **lenguaje de marcas y etiquetas** que define la estructura física y el contenido de una página web.' },
              { id: 't2', type: 'concept', icon: 'Home', color: '#6366f1', title: 'La analogía de la casa', body: 'Si una página web fuera una vivienda física:\n- **HTML** son las columnas, ladrillos, vigas y paredes (la estructura básica).\n- **CSS** es la pintura, decoración, muebles y diseño estético.\n- **JavaScript** son la electricidad, tuberías, sensores y puertas automáticas.' },
              { id: 't3', type: 'concept', icon: 'Tag', color: '#6366f1', title: 'Las "Etiquetas" (Tags)', body: 'El HTML se escribe mediante **etiquetas**. Una etiqueta le dice al navegador qué tipo de contenido hay en su interior. Se delimitan siempre con los signos de menor `<` y mayor `>`.', code: '<etiqueta>Contenido interno aquí</etiqueta>', codeCaption: 'Estructura estándar de un elemento HTML' },
              { id: 't4', type: 'compare', icon: 'SplitSquareHorizontal', color: '#6366f1', title: 'Apertura y Cierre obligatorios', body: 'Casi todas las etiquetas en HTML funcionan en parejas: una etiqueta de **apertura** que inicia el elemento y una etiqueta de **cierre** que incluye una barra diagonal `/` antes del nombre.', leftLabel: 'Etiqueta de Apertura', leftItems: ['<h1>', '<p>', '<div>', '<body>'], rightLabel: 'Etiqueta de Cierre (con /)', rightItems: ['</h1>', '</p>', '</div>', '</body>'] },
              { id: 't5', type: 'tip', icon: 'Zap', color: '#eab308', title: 'Sensibilidad a Mayúsculas', body: 'Aunque HTML no distingue entre `<P>` y `<p>`, **la regla de oro profesional es escribir SIEMPRE las etiquetas en minúsculas**. Esto garantiza código limpio y compatible.' }
            ],
            exercises: [
              { id: 'ex_typing_1', type: 'code-typing', instruction: '¡Escribe tu primera etiqueta! Abre y cierra una etiqueta de párrafo (p) con el texto Hola.', startingCode: '<p>Hola', validationRegex: '^<p>\\s*Hola\\s*<\\/p>$', explanationIncorrect: 'Recuerda que las etiquetas de cierre siempre llevan una barra diagonal antes del nombre: </p>' },
              { id: 'ex1', type: 'multiple-choice', question: 'Si HTML fuera la construcción de un edificio, ¿qué rol cumple?', options: ['La pintura y color de las paredes', 'Los ladrillos, vigas y cimientos', 'Los ascensores automáticos', 'Las cortinas y muebles'], correct: 1 },
              { id: 'ex2', type: 'categorize', instruction: 'Clasifica estas etiquetas entre las que abren y las que cierran', categories: [{id: 'open', title: 'Apertura (Sin /)', color: '#3b82f6'}, {id: 'close', title: 'Cierre (Con /)', color: '#ec4899'}], items: [{text: '<p>', category: 'open'}, {text: '</h1>', category: 'close'}, {text: '<body>', category: 'open'}, {text: '</div>', category: 'close'}, {text: '<span>', category: 'open'}, {text: '</main>', category: 'close'}] },
              { id: 'ex3', type: 'code-highlight', instruction: 'Toca la barra diagonal que convierte esta etiqueta en una ETIQUETA DE CIERRE.', code: '<[[p]]>Hola mundo<[[/]][[p]]>', correctIndex: 1 },
              { id: 'ex4', type: 'drag-sort', prompt: 'Ordena el código para que la etiqueta se abra, contenga el texto y luego se cierre.', items: ['</h1>', 'Bienvenidos', '<h1>'], correctOrder: ['<h1>', 'Bienvenidos', '</h1>'] },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea está el error de sintaxis?', filename: 'index.html', lines: ['<title>', '  Mi primera web', '<title>'], errorLineIndex: 2, explanation: 'Recuerda que la etiqueta de cierre debe incluir la barra diagonal: </title>.' },
              { id: 'ex6', type: 'code-highlight', instruction: 'Toca la etiqueta de APERTURA en este código.', code: '[[<button>]]\n  Enviar Datos\n[[</button>]]', correctIndex: 0, linkPairs: false },
              { id: 'ex7', type: 'word-bank', instruction: 'Arma un elemento completo de título de nivel 1', filename: 'index.html', parts: ['', '___', 'Título Principal', '___', ''], words: ['<h1>', '</h1>', '<head>', '</head>'], answers: ['<h1>', '</h1>'] },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de los siguientes son nombres válidos de etiquetas HTML en minúsculas?', options: ['<p>', '<h1>', '<BARRA>', '<div>'], correctAnswers: [0, 1, 3] }
            ]
          },
          {
            roundNum: 2, label: 'Estructurando', xpReward: 18, coins: 14,
            theory: [
              { id: 't1', type: 'concept', icon: 'Layout', color: '#6366f1', title: 'El Esqueleto Básico (Documento Mínimo)', body: 'Toda página web oficial debe incluir tres secciones estructuradas esenciales:\n1. `<html>`: El contenedor raíz de todo el documento.\n2. `<head>`: Los metadatos y configuraciones invisibles.\n3. `<body>`: Todo el contenido visible para los usuarios.' },
              { id: 't2', type: 'code', icon: 'FileJson', color: '#6366f1', title: 'Diferencia crucial: Head vs Body', body: 'El `<head>` actúa como la ficha técnica (el título en la pestaña, enlaces a fuentes o estilos). El `<body>` aloja todo lo que los usuarios ven y tocan en pantalla.', code: '<head>\n  <title>Título en la pestaña</title>\n</head>\n<body>\n  <h1>Contenido visible</h1>\n  <p>Párrafo que el usuario lee.</p>\n</body>' },
              { id: 't3', type: 'tip', icon: 'Zap', color: '#eab308', title: 'La regla del anidamiento (Muñecas Matrioshka)', body: 'Las etiquetas pueden ir dentro de otras etiquetas. La regla sintáctica sagrada es: **La última etiqueta que se abre debe ser la primera que se cierra**.', code: '<!-- CORRECTO -->\n<div><p>Texto</p></div>\n\n<!-- INCORRECTO (Etiquetas cruzadas) -->\n<div><p>Texto</div></p>' },
              { id: 't4', type: 'concept', icon: 'Code2', color: '#6366f1', title: 'La declaración <!DOCTYPE html>', body: 'En la primera línea de todo archivo HTML moderno se coloca `<!DOCTYPE html>`. Le informa al navegador que el archivo debe ser interpretado bajo el estándar moderno de HTML5.' }
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Clasifica según dónde debe ubicarse cada elemento', categories: [{id: 'head', title: '<head> (Invisible)', color: '#8b5cf6'}, {id: 'body', title: '<body> (Visible)', color: '#10b981'}], items: [{text: 'Título de la pestaña', category: 'head'}, {text: 'Imágenes y videos', category: 'body'}, {text: 'Párrafos de texto', category: 'body'}, {text: 'Información para buscadores', category: 'head'}, {text: 'Botones de acción', category: 'body'}] },
              { id: 'ex_typing_2', type: 'code-typing', instruction: 'Abre y cierra la estructura del cuerpo (body) de forma vacía.', startingCode: '', validationRegex: '^<body>\\s*<\\/body>$', explanationIncorrect: 'Recuerda que debes escribir la etiqueta de apertura <body> y su correspondiente cierre </body>.' },
              {
                id: 'ex2', type: 'code-fill', instruction: 'Completa la estructura separando el head del body',
                codeLines: [
                  { text: '<html>\n  ', type: 'code' },
                  { text: '', type: 'blank', answer: '<head>', blankId: 0 }, { text: '\n    <title>Pestaña</title>\n  </head>\n  ', type: 'code' },
                  { text: '', type: 'blank', answer: '<body>', blankId: 1 }, { text: '\n    Contenido de la web\n  ', type: 'code' },
                  { text: '', type: 'blank', answer: '</body>', blankId: 2 }, { text: '\n</html>\n', type: 'code' }
                ],
                options: ['<head>', '<body>', '</body>', '<html>', '<title>'], answers: ['<head>', '<body>', '</body>']
              },
              { id: 'ex3', type: 'code-highlight', instruction: 'Toca la etiqueta que contiene el contenido visible de la página.', code: '[[<html>]]\n  [[<head>]]\n    [[<title>]]Mi Web[[</title>]]\n  [[</head>]]\n  [[<body>]]\n    Hola Mundo\n  [[</body>]]\n[[</html>]]', correctIndex: 5 },
              { id: 'ex4', type: 'code-error', instruction: 'Encuentra la línea donde las etiquetas se cruzaron incorrectamente.', filename: 'index.html', lines: ['<body>', '  <div>', '    <p>Texto</p>', '  </body>', '</div>'], errorLineIndex: 3, explanation: 'Recuerda la regla de anidamiento: la etiqueta <div> se abrió dentro de <body>, por lo que </div> debe cerrarse antes de </body>.' },
              { id: 'ex5', type: 'drag-sort', prompt: 'Ordena las etiquetas de la MÁS EXTERNA a la MÁS INTERNA', items: ['<title>', '<head>', '<html>'], correctOrder: ['<html>', '<head>', '<title>'] },
              { id: 'ex6', type: 'multi-select', prompt: '¿Cuáles de estos elementos pertenecen exclusivamente al <body>?', options: ['<title>', 'Párrafos de texto', 'Botones interactivos', 'Metadatos de la página'], correctAnswers: [1, 2] },
              { id: 'ex7', type: 'word-bank', instruction: 'Agrega la instrucción inicial de HTML5 al inicio del archivo', filename: 'index.html', parts: ['', '___', '\n<html>\n  <head>...</head>\n</html>'], words: ['<!DOCTYPE html>', '<html>', '<head>', '<script>'], answers: ['<!DOCTYPE html>'] },
              { id: 'ex8', type: 'multiple-choice', question: '¿Qué le comunica la instrucción <!DOCTYPE html> al navegador?', options: ['Que la página requiere contraseña', 'Que la página debe ser interpretada como HTML5 moderno', 'Que el servidor está apagado', 'Que es un archivo de imagen'], correct: 1 }
            ]
          },
          {
            roundNum: 3, label: 'Dominando', xpReward: 22, coins: 16,
            theory: [
              { id: 't1', type: 'concept', icon: 'Fingerprint', color: '#6366f1', title: 'Los Atributos: Propiedades extra', body: 'Los atributos son pares de **nombre="valor"** que aportan información adicional a una etiqueta. Se escriben **siempre dentro de la etiqueta de apertura**.', code: '<etiqueta atributo="valor">Contenido</etiqueta>' },
              { id: 't2', type: 'concept', icon: 'Ghost', color: '#6366f1', title: 'Etiquetas "Huérfanas" (Void Elements)', body: 'Existen etiquetas especiales que NO encierran contenido ni llevan etiqueta de cierre. Se llaman etiquetas vacías o huérfanas. Ejemplos: `<br>` (salto de línea) e `<hr>` (línea divisoria horizontal).' },
              { id: 't3', type: 'tip', icon: 'Quote', color: '#eab308', title: 'Regla estricta de las comillas', body: 'En HTML, el valor de un atributo **debe ir siempre encerrado entre comillas dobles** `""`. Olvidar las comillas provoca errores de sintaxis y renderizado.' },
              { id: 't4', type: 'code', icon: 'Code', color: '#6366f1', title: 'Comentarios en HTML', body: 'Puedes dejar notas o explicaciones invisibles en tu código usando `<!-- comentario -->`. El navegador ignora por completo los comentarios.', code: '<!-- Esto es un comentario explicativo -->' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el ATRIBUTO en esta etiqueta de código.', code: '<[[button]] [[class]]="[[primario]]">\n  Aceptar\n<[[/button]]>', correctIndex: 1 },
              { id: 'ex2', type: 'word-bank', instruction: 'Construye el atributo de clase correctamente', filename: 'index.html', parts: ['<div ', '___', '=', '___', '>...</div>'], words: ['class', '"alerta"', 'class="', 'alerta'], answers: ['class', '"alerta"'], explanationIncorrect: 'Recuerda que los valores de los atributos en HTML siempre deben estar encerrados entre comillas dobles.' },
              { id: 'ex3', type: 'categorize', instruction: 'Clasifica entre etiquetas Normales y Etiquetas Huérfanas (sin cierre)', categories: [{id: 'normal', title: 'Normal (Lleva cierre)', color: '#3b82f6'}, {id: 'void', title: 'Huérfana (Solo apertura)', color: '#f59e0b'}], items: [{text: '<body>', category: 'normal'}, {text: '<br>', category: 'void'}, {text: '<p>', category: 'normal'}, {text: '<hr>', category: 'void'}, {text: '<h1>', category: 'normal'}] },
              { id: 'ex4', type: 'multiple-choice', question: '¿En qué lugar de la etiqueta se escriben siempre los atributos?', options: ['En la etiqueta de cierre', 'Dentro de la etiqueta de apertura, antes de cerrar el >', 'Por fuera de los corchetes angulares', 'Al final de todo el archivo'], correct: 1 },
              { id: 'ex5', type: 'code-error', instruction: '¿Qué línea tiene un error de sintaxis en la comilla del atributo?', filename: 'index.html', lines: ['<div class="caja">', '  <p color="rojo>', '    Hola', '  </p>', '</div>'], errorLineIndex: 1, explanation: 'Recuerda que a los valores de los atributos no les puede faltar la comilla de cierre: debe ser color="rojo".' },
              { id: 'ex6', type: 'code-highlight', instruction: 'Toca el VALOR del atributo en esta etiqueta.', code: '<[[input]] [[type]]="[[password]]">', correctIndex: 2 },
              { id: 'ex7', type: 'code-typing', instruction: 'Inserta un comentario en HTML con el texto Inicio.', startingCode: '<!-- ', validationRegex: '^<!--\\s*Inicio\\s*-->$', explanationIncorrect: 'Recuerda cerrar el comentario con -->' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de las siguientes son etiquetas huérfanas o vacías que NO tienen cierre?', options: ['<br>', '<p>', '<hr>', '<div>'], correctAnswers: [0, 2] }
            ]
          }
        ]
      },

      // ── LECCIÓN 2: Títulos y Textos ───────────────────────────────────────
      {
        id: 'html-1-2',
        title: 'Títulos y Textos',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Jerarquía', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Type', color: '#6366f1', title: 'Estructuración del Texto', subtitle: 'La jerarquía de un periódico', body: 'En HTML, el tamaño del texto refleja su **jerarquía e importancia semántica**. No se usan etiquetas de título solo por estética, sino para estructurar la lectura para humanos y buscadores.' },
              { id: 't2', type: 'concept', icon: 'Heading', color: '#6366f1', title: 'Los Headings (H1 a H6)', body: 'HTML ofrece 6 niveles de encabezados: `<h1>` es el más importante y `<h6>` el de menor jerarquía.', code: '<h1>Titular Principal</h1>\n<h2>Subtítulo de Sección</h2>\n<h3>Subtema secundario</h3>' },
              { id: 't3', type: 'tip', icon: 'Search', color: '#eab308', title: 'La Regla de Oro del H1', body: 'Para lograr un óptimo posicionamiento en buscadores (SEO), una página debe contener **un único `<h1>` por documento**. Usar múltiples h1 confunde a los motores de búsqueda.' },
              { id: 't4', type: 'concept', icon: 'List', color: '#6366f1', title: 'Sin saltar niveles', body: 'Para mantener la coherencia semántica, nunca debes saltar niveles de jerarquía (por ejemplo, pasar directamente de un `<h1>` a un `<h4>`).' }
            ],
            exercises: [
              { id: 'ex1', type: 'drag-sort', prompt: 'Ordena los encabezados de MÁS IMPORTANTE a MENOS IMPORTANTE', items: ['<h3>', '<h1>', '<h6>', '<h2>'], correctOrder: ['<h1>', '<h2>', '<h3>', '<h6>'] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la etiqueta de título que solo debe usarse UNA vez por página.', code: '<body>\n  [[<h1>]]Mi Blog de Tecnología[[</h1>]]\n  [[<h2>]]Últimas Noticias[[</h2>]]\n  [[<h2>]]Análisis[[</h2>]]\n</body>', correctIndex: 0 },
              { id: 'ex3', type: 'multiple-choice', question: 'Si deseas hacer un texto más grande pero NO es el título principal de la página, ¿cuál es la mejor práctica?', options: ['Usar <h1> de todos modos', 'Usar un párrafo <p> y cambiar su tamaño visual con CSS', 'Usar <h6>', 'Usar la etiqueta <grande>'], correct: 1 },
              { id: 'ex4', type: 'code-error', instruction: 'Identifica la línea con error SEO (uso repetido del H1).', filename: 'index.html', lines: ['<body>', '  <h1>Bienvenido a la Tienda</h1>', '  <h2>Sección Ofertas</h2>', '  <h1>Sección Calzado</h1>', '</body>'], errorLineIndex: 3, explanation: 'Recuerda que solo debe existir un <h1> por página. La sección "Calzado" debe ser un <h2>.' },
              { id: 'ex5', type: 'categorize', instruction: 'Clasifica los textos según su nivel correspondiente', categories: [{id: 'h1', title: 'Usar <h1>', color: '#ec4899'}, {id: 'h2', title: 'Usar <h2>', color: '#3b82f6'}], items: [{text: 'Título del artículo del blog', category: 'h1'}, {text: 'Nombre principal del sitio web', category: 'h1'}, {text: 'Subtítulo de una sección interna', category: 'h2'}, {text: 'Categoría secundaria de productos', category: 'h2'}] },
              { id: 'ex6', type: 'code-typing', instruction: 'Inserta el titular secundario (h2) con el texto Noticias.', startingCode: '', validationRegex: '^<h2>\\s*Noticias\\s*<\\/h2>$', explanationIncorrect: 'Recuerda abrir con <h2> y cerrar con </h2>.' },
              { id: 'ex7', type: 'multi-select', prompt: '¿Cuáles de los siguientes son niveles válidos de encabezados en HTML?', options: ['<h1>', '<h4>', '<h7>', '<h6>'], correctAnswers: [0, 1, 3] },
              { id: 'ex8', type: 'word-bank', instruction: 'Completa la estructura del encabezado principal', filename: 'index.html', parts: ['', '___', 'Mi Perfil Profesional', '___', ''], words: ['<h1>', '</h1>', '<h6>', '<head>'], answers: ['<h1>', '</h1>'] }
            ]
          },
          {
            roundNum: 2, label: 'Párrafos y Énfasis', xpReward: 18, coins: 14,
            theory: [
              { id: 't1', type: 'concept', icon: 'AlignLeft', color: '#6366f1', title: 'Párrafos de texto (<p>)', body: 'El texto estándar de lectura debe envolverse en etiquetas de párrafo `<p>`. Los navegadores añaden automáticamente un margen vertical antes y después de cada `<p>`.' },
              { id: 't2', type: 'concept', icon: 'Bold', color: '#6366f1', title: 'Negrita y Énfasis Semántico', body: 'Para otorgar importancia alta o urgente a un fragmento se usa `<strong>` (se dibuja en negrita). Para aplicar énfasis estilístico o modulación de voz se usa `<em>` (se dibuja en cursiva).', code: '<p>Este concepto es <strong>muy importante</strong> y debemos leerlo con <em>atención</em>.</p>' },
              { id: 't3', type: 'tip', icon: 'CornerDownLeft', color: '#eab308', title: 'Saltos de línea (<br>)', body: 'En HTML los saltos de línea producidos por la tecla "Enter" son ignorados. Para forzar un salto de línea dentro de un párrafo se usa la etiqueta huérfana `<br>`.' },
              { id: 't4', type: 'concept', icon: 'Minus', color: '#6366f1', title: 'Separadores horizontales (<hr>)', body: 'Para insertar una división de tema o línea divisoria visual entre párrafos, utilizamos la etiqueta vacía `<hr>`.' }
            ],
            exercises: [
              {
                id: 'ex1', type: 'code-fill', instruction: 'Escribe un párrafo con resaltado de importancia',
                codeLines: [
                  { text: '', type: 'blank', answer: '<p>', blankId: 0 }, { text: '\n  Aviso \n  ', type: 'code' },
                  { text: '', type: 'blank', answer: '<strong>', blankId: 1 }, { text: 'urgente', type: 'code' },
                  { text: '', type: 'blank', answer: '</strong>', blankId: 2 }, { text: '.\n', type: 'code' },
                  { text: '', type: 'blank', answer: '</p>', blankId: 3 }, { text: '\n', type: 'code' }
                ],
                options: ['<p>', '<strong>', '</strong>', '</p>', '<h1>'], answers: ['<p>', '<strong>', '</strong>', '</p>']
              },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la etiqueta huérfana que introduce un salto de línea dentro del párrafo.', code: '[[<p>]]\n  Línea uno.\n  [[<br>]]\n  Línea dos.\n[[</p>]]', correctIndex: 1 },
              { id: 'ex3', type: 'categorize', instruction: 'Empareja la etiqueta con su rol semántico', categories: [{id: 'strong', title: 'strong (Negrita / Importante)', color: '#f59e0b'}, {id: 'em', title: 'em (Cursiva / Énfasis)', color: '#10b981'}], items: [{text: 'Importancia y seriedad alta', category: 'strong'}, {text: 'Énfasis o tono de voz', category: 'em'}, {text: 'Advertencias de seguridad', category: 'strong'}, {text: 'Términos o tecnicismos', category: 'em'}] },
              { id: 'ex4', type: 'multiple-choice', question: 'Si colocas 5 saltos de línea con la tecla Enter dentro de tu archivo HTML, ¿cómo los interpreta el navegador?', options: ['Como 5 saltos de línea', 'Como un único espacio en blanco', 'Muestra un error en consola', 'Crea 5 párrafos nuevos'], correct: 1 },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea las etiquetas están mal anidadas?', filename: 'index.html', lines: ['<p>', '  Texto <em>destacado', '  <strong>relevante</em></strong>', '</p>'], errorLineIndex: 2, explanation: 'Recuerda la regla de anidamiento: si abriste <strong> dentro de <em>, debes cerrar </strong> antes de cerrar </em>.' },
              { id: 'ex6', type: 'code-typing', instruction: 'Abre un párrafo, escribe la palabra Hola y luego ciérralo.', startingCode: '', validationRegex: '^<p>\\s*Hola\\s*<\\/p>$', explanationIncorrect: 'Asegúrate de incluir la apertura <p> y cierre </p>.' },
              { id: 'ex7', type: 'word-bank', instruction: 'Inserta una línea divisoria entre dos párrafos', filename: 'index.html', parts: ['<p>Párrafo 1</p>\n', '___', '\n<p>Párrafo 2</p>'], words: ['<hr>', '<br>', '<line>', '<div>'], answers: ['<hr>'] },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de las siguientes son etiquetas huérfanas sin cierre?', options: ['<br>', '<p>', '<hr>', '<strong>'], correctAnswers: [0, 2] }
            ]
          },
          {
            roundNum: 3, label: 'Dominando Textos', xpReward: 22, coins: 16,
            theory: [
              { id: 't1', type: 'concept', icon: 'Quote', color: '#6366f1', title: 'Citas en bloque (<blockquote>)', body: 'Para incluir fragmentos citados de fuentes externas o declaraciones destacadas, se utiliza la etiqueta `<blockquote>`.' },
              { id: 't2', type: 'code', icon: 'Terminal', color: '#6366f1', title: 'Texto Preformateado (<pre>)', body: 'Dado que HTML ignora múltiples espacios y saltos de línea, la etiqueta `<pre>` permite conservar exactamente el espaciado original del texto.', code: '<pre>\n  Línea 1\n    Línea 2 con sangría\n</pre>' },
              { id: 't3', type: 'tip', icon: 'Code2', color: '#eab308', title: 'Etiqueta <code> para código', body: 'Para mostrar comandos o fragmentos de código de programación dentro del texto, usamos `<code>`, usualmente combinada con `<pre>`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Clasifica según la gestión del espacio en blanco', categories: [{id: 'ignora', title: 'Ignora espacios extra', color: '#ec4899'}, {id: 'respeta', title: 'Respeta espaciado original', color: '#3b82f6'}], items: [{text: '<p>', category: 'ignora'}, {text: '<h1>', category: 'ignora'}, {text: '<pre>', category: 'respeta'}, {text: '<blockquote>', category: 'ignora'}] },
              { id: 'ex2', type: 'multiple-choice', question: '¿Cuál es la etiqueta apropiada para representar una cita textual extensa de un autor?', options: ['<cita>', '<pre>', '<blockquote>', '<code>'], correct: 2 },
              { id: 'ex3', type: 'word-bank', instruction: 'Crea un bloque de código respetando sus saltos de línea', filename: 'index.html', parts: ['', '___', '\n  function suma() {\n    return a + b;\n  }\n', '___', ''], words: ['<pre>', '<code>', '</pre>', '</p>'], answers: ['<pre>', '</pre>'] },
              { id: 'ex4', type: 'multi-select', prompt: '¿Cuáles de las siguientes etiquetas se emplean para formatear texto?', options: ['<p>', '<img>', '<strong>', '<blockquote>'], correctAnswers: [0, 2, 3] },
              { id: 'ex5', type: 'code-highlight', instruction: 'Toca la etiqueta que indica fragmentos de código de programación.', code: '<p>\n  Usa el comando [[<code>]]npm install[[</code>]] para instalar.\n</p>', correctIndex: 0 },
              { id: 'ex6', type: 'code-error', instruction: '¿Dónde está el error al encerrar la cita?', filename: 'index.html', lines: ['<p>', '  El autor dijo:', '  <blockquote text="cita">Frase</blockquote>', '</p>'], errorLineIndex: 2, explanation: 'Recuerda que <blockquote> es un elemento de bloque y no debe anidarse dentro de un párrafo <p>.' },
              { id: 'ex7', type: 'drag-sort', prompt: 'Ordena de mayor jerarquía a menor jerarquía temática', items: ['<blockquote>', '<h2>', '<h1>'], correctOrder: ['<h1>', '<h2>', '<blockquote>'] },
              { id: 'ex8', type: 'code-typing', instruction: 'Crea una etiqueta de texto preformateado (pre) vacía.', startingCode: '', validationRegex: '^<pre>\\s*<\\/pre>$', explanationIncorrect: 'Recuerda abrir con <pre> y cerrar con </pre>.' }
            ]
          }
        ]
      },

      // ── LECCIÓN 3: Enlaces y Navegación ───────────────────────────────────
      {
        id: 'html-1-3',
        title: 'Enlaces y Navegación',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Los Enlaces (Links)', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Link', color: '#6366f1', title: 'La red del Hipertexto', subtitle: 'Conectando información en la Web', body: 'Los enlaces o hipervínculos son el concepto central de la Web. Permiten al usuario saltar de una página a otra al hacer clic. La etiqueta utilizada es `<a>` (Anchor / Ancla).' },
              { id: 't2', type: 'concept', icon: 'Link2', color: '#6366f1', title: 'El atributo href', body: 'Una etiqueta `<a>` requiere obligatoriamente el atributo `href` (Hypertext Reference) para definir la dirección de destino.', code: '<a href="https://google.com">Ir a Google</a>' },
              { id: 't3', type: 'tip', icon: 'Zap', color: '#eab308', title: 'Texto de enlace descriptivo', body: 'Evita colocar textos como "haz clic aquí". Los motores de búsqueda y lectores de pantalla prefieren textos descriptivos como "Ver nuestro catálogo de productos".' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el ATRIBUTO que define el sitio web de destino.', code: '<[[a]] [[href]]="https://netflix.com">\n  Ver películas\n<[[/a]]>', correctIndex: 1 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Qué origen tiene la letra "a" en la etiqueta de enlace?', options: ['Action (Acción)', 'Anchor (Ancla)', 'Active (Activo)', 'Address (Dirección)'], correct: 1 },
              {
                id: 'ex3', type: 'code-fill', instruction: 'Crea un enlace completo hacia la plataforma',
                codeLines: [
                  { text: '<a ', type: 'code' },
                  { text: '', type: 'blank', answer: 'href', blankId: 0 }, { text: '="https://youtube.com">\n  Ir a Youtube\n', type: 'code' },
                  { text: '', type: 'blank', answer: '</a>', blankId: 1 }, { text: '\n', type: 'code' }
                ],
                options: ['href', '</a>', 'src', '<link>'], answers: ['href', '</a>']
              },
              { id: 'ex4', type: 'code-error', instruction: '¿En qué línea se usó un atributo equivocado para el enlace?', filename: 'index.html', lines: ['<p>', '  Visita mi', '  <a src="miweb.com">página</a>', '</p>'], errorLineIndex: 2, explanation: 'Recuerda que los enlaces utilizan el atributo href="...". El atributo src se emplea en imágenes.' },
              { id: 'ex5', type: 'drag-sort', prompt: 'Ordena las partes para estructurar el enlace', items: ['>Visitar sitio</a>', '<a', 'href="https://web.com"'], correctOrder: ['<a', 'href="https://web.com"', '>Visitar sitio</a>'] },
              { id: 'ex6', type: 'code-typing', instruction: 'Crea un enlace con el texto Cody que redirija hacia https://cody.app', startingCode: '', validationRegex: '^<a\\s+href="https:\\/\\/cody\\.app">\\s*Cody\\s*<\\/a>$', explanationIncorrect: 'Recuerda utilizar la sintaxis <a href="URL">Texto</a>.' },
              { id: 'ex7', type: 'categorize', instruction: 'Clasifica los componentes de la etiqueta de enlace', categories: [{id: 'tag', title: 'Etiqueta', color: '#6366f1'}, {id: 'attr', title: 'Atributo', color: '#f59e0b'}], items: [{text: '<a>', category: 'tag'}, {text: 'href', category: 'attr'}, {text: 'target', category: 'attr'}, {text: '</a>', category: 'tag'}] },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de los siguientes elementos son indispensables para crear un enlace funcional?', options: ['Etiqueta <a>', 'Atributo href', 'Etiqueta <img>', 'Atributo target'], correctAnswers: [0, 1] }
            ]
          },
          {
            roundNum: 2, label: 'Nuevas Pestañas y Rutas', xpReward: 18, coins: 14,
            theory: [
              { id: 't1', type: 'concept', icon: 'ExternalLink', color: '#6366f1', title: 'Abrir enlaces en nueva pestaña', body: 'Para evitar que los usuarios salgan de tu sitio web al pulsar un enlace externo, añade el atributo `target="_blank"`.' },
              { id: 't2', type: 'tip', icon: 'Link', color: '#eab308', title: 'Rutas Absolutas vs Relativas', body: '- **Absolutas**: Apuntan a dominios externos completos (`https://sitio.com`).\n- **Relativas**: Apuntan a archivos internos dentro de tu proyecto (`/contacto.html`).', code: '<!-- Absoluta -->\n<a href="https://google.com">Google</a>\n\n<!-- Relativa -->\n<a href="/acerca.html">Acerca de mí</a>' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el valor que ordena la apertura en una pestaña nueva.', code: '<[[a]] [[href]]="https://google.com" [[target]]="[[_blank]]">\n  Google\n<[[/a]]>', correctIndex: 3 },
              { id: 'ex2', type: 'categorize', instruction: 'Clasifica entre rutas absolutas y relativas', categories: [{id: 'abs', title: 'Absoluta (Externa)', color: '#ec4899'}, {id: 'rel', title: 'Relativa (Interna)', color: '#3b82f6'}], items: [{text: '"https://facebook.com"', category: 'abs'}, {text: '"/nosotros.html"', category: 'rel'}, {text: '"/contacto"', category: 'rel'}, {text: '"http://sitio.org"', category: 'abs'}] },
              { id: 'ex3', type: 'word-bank', instruction: 'Completa para abrir el sitio en nueva pestaña', filename: 'index.html', parts: ['<a href="https://wikipedia.org"\n   ', '___', '="', '___', '">\n  Wiki\n</a>'], words: ['target', 'href', '_blank', '_self'], answers: ['target', '_blank'] },
              { id: 'ex4', type: 'code-error', instruction: '¿En qué línea faltan las comillas del atributo target?', filename: 'index.html', lines: ['<nav>', '  <a href="/inicio" target="_blank">Inicio</a>', '  <a href="/ayuda" target=_blank>Ayuda</a>', '</nav>'], errorLineIndex: 2, explanation: 'Recuerda que los valores de todos los atributos deben ir entre comillas: target="_blank".' },
              { id: 'ex5', type: 'multiple-choice', question: '¿Qué valor del atributo target abre el enlace en una nueva ventana o pestaña?', options: ['_self', '_blank', '_parent', '_top'], correct: 1 },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena la estructura completa de un enlace con target', items: ['target="_blank">Ir a sitio</a>', '<a href="https://web.com"'], correctOrder: ['<a href="https://web.com"', 'target="_blank">Ir a sitio</a>'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Añade el atributo que permite abrir el enlace en una pestaña nueva (_blank).', startingCode: 'target="', validationRegex: '^target="_blank"$', explanationIncorrect: 'Debe ser target="_blank"' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Qué beneficios ofrece utilizar rutas relativas en tu propio sitio?', options: ['Funciona sin conexión a internet externa', 'Permite mover el proyecto de carpeta sin romper los enlaces', 'Carga más rápido los servidores de Google', 'Obliga al navegador a pedir clave'], correctAnswers: [0, 1] }
            ]
          },
          {
            roundNum: 3, label: 'Enlaces Especiales', xpReward: 22, coins: 16,
            theory: [
              { id: 't1', type: 'concept', icon: 'PhoneCall', color: '#6366f1', title: 'Enlaces telefónicos y de correo', body: 'Puedes hacer que al pulsar un enlace en dispositivos móviles se inicie una llamada o se redacte un correo electrónico usando los prefijos `tel:` y `mailto:`.' },
              { id: 't2', type: 'code', icon: 'Hash', color: '#6366f1', title: 'Anclas internas (Navegación en la misma página)', body: 'Al añadir el carácter `#` seguido de un `id`, el navegador se desplaza de forma automática hacia la sección correspondiente de la página.', code: '<a href="#contacto">Ir a contacto</a>\n\n<section id="contacto">...</section>' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el prefijo especial para abrir la app de correo.', code: '<[[a]] [[href]]="[[mailto:]]info@sitio.com">\n  Enviar mensaje\n<[[/a]]>', correctIndex: 2 },
              { id: 'ex2', type: 'categorize', instruction: 'Asigna el prefijo según el uso', categories: [{id: 'tel', title: 'tel:', color: '#10b981'}, {id: 'mail', title: 'mailto:', color: '#f59e0b'}, {id: 'hash', title: '#', color: '#3b82f6'}], items: [{text: 'Abre la app de correo', category: 'mail'}, {text: 'Iniciar llamada telefónica', category: 'tel'}, {text: 'Desplazamiento interno por ID', category: 'hash'}] },
              {
                id: 'ex3', type: 'code-fill', instruction: 'Crea un enlace para desplazarse hasta la sección final',
                codeLines: [
                  { text: '<a href="', type: 'code' },
                  { text: '', type: 'blank', answer: '#final', blankId: 0 }, { text: '">Ir abajo</a>\n\n<footer ', type: 'code' },
                  { text: '', type: 'blank', answer: 'id', blankId: 1 }, { text: '="final">\n', type: 'code' }
                ],
                options: ['#final', 'final', 'id', 'class'], answers: ['#final', 'id']
              },
              { id: 'ex4', type: 'multiple-choice', question: 'Si un enlace tiene href="#seccion1", ¿qué respuesta dará el navegador al hacer clic?', options: ['Descargará un archivo .zip', 'Se desplazará al elemento que contenga id="seccion1"', 'Abrirá una ventana de chat', 'Redirigirá a Google'], correct: 1 },
              { id: 'ex5', type: 'word-bank', instruction: 'Completa el enlace para iniciar llamada telefónica', filename: 'index.html', parts: ['<a href="', '___', '5550199">\n  Llamar a soporte\n</a>'], words: ['tel:', 'call:', 'phone:', 'mailto:'], answers: ['tel:'] },
              { id: 'ex6', type: 'code-error', instruction: '¿Dónde está el error al declarar el enlace ancla?', filename: 'index.html', lines: ['<a href="contacto">Ir a contacto</a>', '<div id="contacto">', '  Contacto', '</div>'], errorLineIndex: 0, explanation: 'Recuerda que los enlaces ancla a un ID deben llevar el signo de gato o numeral # antes del nombre: href="#contacto".' },
              { id: 'ex7', type: 'code-typing', instruction: 'Configura el enlace (href) para que al pulsarlo abra el gestor de correo dirigido a hola@app.com', startingCode: 'mailto:', validationRegex: '^mailto:hola@app\\.com$', explanationIncorrect: 'Debe ser mailto:hola@app.com' },
              { id: 'ex8', type: 'drag-sort', prompt: 'Ordena la estructura para vincular un id interno', items: ['<h2 id="precios">Precios</h2>', '<a href="#precios">Ver precios</a>'], correctOrder: ['<a href="#precios">Ver precios</a>', '<h2 id="precios">Precios</h2>'] }
            ]
          }
        ]
      },

      // ── DESAFÍO PRÁCTICO 1 ────────────────────────────────────────────────
      {
        id: 'html-chal-1',
        type: 'challenge',
        title: 'Desafío: Tu Primer Documento',
        language: 'HTML',
        xpReward: 250,
        coins: 50,
        instruction: 'Construye la estructura básica completa de una página personal. Debe incluir <head> con <title>, un <body> con un <h1> con tu nombre, un párrafo <p> presentándote y un enlace <a> hacia tu red social.',
        startingCode: '<!DOCTYPE html>\n<html>\n  \n</html>',
        validators: [
          {
            description: 'Debe contener las etiquetas <head> y <title>',
            test: (doc, code) => code.toLowerCase().includes('<head') && code.toLowerCase().includes('<title')
          },
          {
            description: 'Debe contener un <body> con un <h1>',
            test: (doc, code) => code.toLowerCase().includes('<body') && code.toLowerCase().includes('<h1')
          },
          {
            description: 'Debe incluir un párrafo <p> y un enlace <a href="...">',
            test: (doc, code) => code.toLowerCase().includes('<p') && code.toLowerCase().includes('<a ') && code.toLowerCase().includes('href=')
          }
        ]
      },

      // ── LECCIÓN 4: Imágenes y Multimedia ──────────────────────────────────
      {
        id: 'html-1-4',
        title: 'Imágenes y Multimedia',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Insertar Imágenes', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Image', color: '#6366f1', title: 'Imágenes en la Web', subtitle: 'La etiqueta huérfana <img>', body: 'Para mostrar imágenes usamos la etiqueta `<img>`. Es una etiqueta huérfana (sin cierre) que requiere dos atributos fundamentales: `src` (la ruta de la imagen) y `alt` (el texto alternativo).' },
              { id: 't2', type: 'concept', icon: 'Eye', color: '#6366f1', title: 'La importancia del atributo alt', body: 'El atributo `alt` describe la imagen para personas con discapacidad visual que usan lectores de pantalla, y se muestra si la imagen falla al cargar.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el atributo que contiene la ruta o ubicación de la imagen.', code: '<[[img]] [[src]]="foto.jpg" [[alt]]="Mi foto">', correctIndex: 1 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Por qué la etiqueta <img> no lleva etiqueta de cierre </img>?', options: ['Porque es una etiqueta huérfana que no encierra texto directo', 'Porque las imágenes se cargan con CSS', 'Porque es un error de HTML5', 'Porque fue creada por Google'], correct: 0 },
              { id: 'ex3', type: 'word-bank', instruction: 'Completa la etiqueta de imagen con su descripción de accesibilidad', filename: 'index.html', parts: ['<img src="perro.jpg" ', '___', '="', '___', '">'], words: ['alt', 'Perro jugando', 'src', 'href'], answers: ['alt', 'Perro jugando'] },
              { id: 'ex4', type: 'code-error', instruction: '¿En qué línea se intentó cerrar la etiqueta img como si fuera normal?', filename: 'index.html', lines: ['<div>', '  <img src="logo.png"></img>', '</div>'], errorLineIndex: 1, explanation: 'Recuerda que <img> es una etiqueta huérfana y NO debe llevar </img>.' },
              { id: 'ex5', type: 'drag-sort', prompt: 'Ordena la sintaxis completa de una imagen', items: ['alt="Logo">', 'src="logo.png"', '<img'], correctOrder: ['<img', 'src="logo.png"', 'alt="Logo">'] },
              { id: 'ex6', type: 'categorize', instruction: 'Clasifica los atributos de <img>', categories: [{id: 'req', title: 'Obligatorio', color: '#ec4899'}, {id: 'dim', title: 'Dimensiones', color: '#3b82f6'}], items: [{text: 'src', category: 'req'}, {text: 'alt', category: 'req'}, {text: 'width', category: 'dim'}, {text: 'height', category: 'dim'}] },
              { id: 'ex7', type: 'code-typing', instruction: 'Añade el texto alternativo Foto para quienes no pueden ver la imagen.', startingCode: 'alt="', validationRegex: '^alt="Foto"$', explanationIncorrect: 'Debe ser alt="Foto"' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Qué funciones cumple el atributo alt?', options: ['Mejora la accesibilidad para usuarios ciegos', 'Se muestra si la imagen no carga', 'Ayuda al posicionamiento SEO en Google', 'Cambia los colores de la imagen'], correctAnswers: [0, 1, 2] }
            ]
          },
          {
            roundNum: 2, label: 'Audio y Video', xpReward: 18, coins: 14,
            theory: [
              { id: 't1', type: 'concept', icon: 'Video', color: '#6366f1', title: 'Reproductor de Video nativo', body: 'HTML5 introdujo las etiquetas `<video>` y `<audio>`. Al añadir el atributo `controls`, el navegador muestra automáticamente el reproductor con botones de play, volumen y pantalla completa.' },
              { id: 't2', type: 'code', icon: 'Play', color: '#6366f1', title: 'Sintaxis de Video', body: 'Puedes especificar múltiples fuentes `<source>` para asegurar que el video se reproduzca en cualquier dispositivo.', code: '<video controls width="400">\n  <source src="video.mp4" type="video/mp4">\n</video>' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el atributo que hace aparecer la barra con los botones de play y pausa.', code: '<[[video]] [[src]]="pelicula.mp4" [[controls]]>\n</[[video]]>', correctIndex: 2 },
              { id: 'ex2', type: 'multiple-choice', question: 'Si no agregas el atributo "controls" a una etiqueta <video>, ¿qué ocurrirá?', options: ['El video se reproduce solo a 100fps', 'El video aparece pero el usuario no tiene botones para darle play', 'Da un error de consola', 'Se convierte en una imagen'], correct: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Añade controles y ancho al reproductor de audio', filename: 'index.html', parts: ['<audio ', '___', '>\n  <source src="cancion.mp3">\n</audio>'], words: ['controls', 'autoplay', 'muted', 'href'], answers: ['controls'] },
              { id: 'ex4', type: 'categorize', instruction: 'Clasifica los atributos multimedia', categories: [{id: 'ctrl', title: 'Interacción', color: '#10b981'}, {id: 'auto', title: 'Reproducción', color: '#f59e0b'}], items: [{text: 'controls', category: 'ctrl'}, {text: 'autoplay', category: 'auto'}, {text: 'loop (repetir)', category: 'auto'}, {text: 'muted (silencio)', category: 'auto'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea está mal escrita la etiqueta de audio?', filename: 'index.html', lines: ['<audio controls>', '  <src="musica.mp3">', '</audio>'], errorLineIndex: 1, explanation: 'Recuerda que la etiqueta interna para fuentes de audio/video es <source src="...">.' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena la estructura de la etiqueta de video', items: ['</video>', '  <source src="clip.mp4">', '<video controls>'], correctOrder: ['<video controls>', '  <source src="clip.mp4">', '</video>'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Añade la fuente de un video que provenga del archivo a.mp4', startingCode: '<source ', validationRegex: '^<source\\s+src="a\\.mp4">$', explanationIncorrect: 'Asegúrate de escribir <source src="a.mp4">' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de las siguientes son etiquetas multimedia de HTML5?', options: ['<video>', '<audio>', '<radio>', '<source>'], correctAnswers: [0, 1, 3] }
            ]
          },
          {
            roundNum: 3, label: 'Figuras y Leyendas', xpReward: 22, coins: 16,
            theory: [
              { id: 't1', type: 'concept', icon: 'FileText', color: '#6366f1', title: 'Figure y Figcaption', body: 'Para agrupar una imagen con su pie de foto o leyenda explicativa de forma semántica, se envuelve la imagen en un `<figure>` y el texto en un `<figcaption>`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la etiqueta encargada del pie de foto o leyenda.', code: '<[[figure]]>\n  <[[img]] src="foto.jpg">\n  <[[figcaption]]>Plaza principal<[[/figcaption]]>\n<[[/figure]]>', correctIndex: 2 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Cuál es la ventaja semántica de usar <figure> y <figcaption> frente a un simple <div>?', options: ['Carga la imagen el doble de rápido', 'Relaciona explícitamente la imagen con su pie de foto informativo', 'Permite editar la foto en el navegador', 'Aplica filtros de color automáticamente'], correct: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Estructura una figura semántica completa', filename: 'index.html', parts: ['<figure>\n  <img src="mapa.png">\n  ', '___', 'Mapa del tesoro', '___', '\n</figure>'], words: ['<figcaption>', '</figcaption>', '<caption>', '</footer>'], answers: ['<figcaption>', '</figcaption>'] },
              { id: 'ex4', type: 'drag-sort', prompt: 'Ordena de afuera hacia adentro los elementos de la figura', items: ['<figcaption>Leyenda</figcaption>', '<figure>', '<img src="a.jpg">'], correctOrder: ['<figure>', '<img src="a.jpg">', '<figcaption>Leyenda</figcaption>'] },
              { id: 'ex5', type: 'code-error', instruction: '¿Dónde está el error de anidamiento de la leyenda?', filename: 'index.html', lines: ['<figcaption>', '  <figure>', '    <img src="a.jpg">', '  </figure>', '</figcaption>'], errorLineIndex: 0, explanation: 'Recuerda que <figcaption> debe ir DENTRO de <figure>, no al revés.' },
              { id: 'ex6', type: 'categorize', instruction: 'Empareja elemento con su significado', categories: [{id: 'fig', title: 'Contenedor', color: '#3b82f6'}, {id: 'cap', title: 'Leyenda', color: '#ec4899'}], items: [{text: '<figure>', category: 'fig'}, {text: '<figcaption>', category: 'cap'}, {text: 'Pie de foto informativo', category: 'cap'}] },
              { id: 'ex7', type: 'code-typing', instruction: 'Escribe la apertura de la etiqueta semántica para contener medios gráficos (figure).', startingCode: '<', validationRegex: '^<figure>$', explanationIncorrect: 'Debe ser <figure>' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Qué elementos suelen alojarse dentro de un <figure>?', options: ['Etiquetas <img>', 'Etiquetas <figcaption>', 'Diagramas e ilustraciones', 'Menús de navegación <nav>'], correctAnswers: [0, 1, 2] }
            ]
          }
        ]
      },

      // ── LECCIÓN 5: Listas y Estructuración ────────────────────────────────
      {
        id: 'html-1-5',
        title: 'Listas y Estructuración',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Listas Desordenadas (ul)', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'List', color: '#6366f1', title: 'Agrupando elementos', subtitle: 'Listas con viñetas', body: 'Para crear listas de compras, menús o características sin un orden numérico estricto, usamos `<ul>` (Unordered List). Cada elemento dentro de la lista requiere la etiqueta `<li>` (List Item).' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la etiqueta de CADA ELEMENTO dentro de la lista.', code: '<ul>\n  [[<li>]]Pan[[</li>]]\n  [[<li>]]Leche[[</li>]]\n</ul>', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Qué significa la sigla "ul" en HTML?', options: ['Universal List', 'Unordered List (Lista Desordenada)', 'User List', 'Underline List'], correct: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Crea una lista desordenada de 2 elementos', filename: 'index.html', parts: ['<ul>\n  ', '___', 'Manzanas', '___', '\n</ul>'], words: ['<li>', '</li>', '<ol>', '</ol>'], answers: ['<li>', '</li>'] },
              { id: 'ex4', type: 'code-error', instruction: '¿En qué línea se colocó texto directo en ul sin usar li?', filename: 'index.html', lines: ['<ul>', '  <li>Item 1</li>', '  Texto sin li', '</ul>'], errorLineIndex: 2, explanation: 'Recuerda que todos los elementos directos de una lista <ul> deben ir envueltos en etiquetas <li>.' },
              { id: 'ex5', type: 'drag-sort', prompt: 'Ordena la estructura de la lista', items: ['<li>Elemento</li>', '</ul>', '<ul>'], correctOrder: ['<ul>', '<li>Elemento</li>', '</ul>'] },
              { id: 'ex6', type: 'categorize', instruction: 'Clasifica las etiquetas de listas', categories: [{id: 'parent', title: 'Padre (Contenedor)', color: '#3b82f6'}, {id: 'child', title: 'Hijo (Elemento)', color: '#ec4899'}], items: [{text: '<ul>', category: 'parent'}, {text: '<li>', category: 'child'}] },
              { id: 'ex7', type: 'code-typing', instruction: 'Añade un elemento a la lista con el texto Item', startingCode: '', validationRegex: '^<li>\\s*Item\\s*<\\/li>$', explanationIncorrect: 'Asegúrate de escribir <li>Item</li>' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Para qué casos de uso en desarrollo web se utilizan las listas <ul>?', options: ['Menús de navegación principales', 'Listas de viñetas de compras', 'Listados de tarjetas de productos', 'Videos de Youtube'], correctAnswers: [0, 1, 2] }
            ]
          },
          {
            roundNum: 2, label: 'Listas Ordenadas (ol)', xpReward: 18, coins: 14,
            theory: [
              { id: 't1', type: 'concept', icon: 'ListOrdered', color: '#6366f1', title: 'Listas con Numeración (<ol>)', body: 'Cuando la secuencia o el orden de los pasos es fundamental (recetas de cocina, ránkings, instrucciones), se usa `<ol>` (Ordered List). El navegador las numera automáticamente 1, 2, 3...' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la etiqueta contenedora que numera automáticamente los elementos.', code: '[[<ol>]]\n  <li>Paso 1</li>\n  <li>Paso 2</li>\n[[</ol>]]', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Cuál es la diferencia entre <ul> y <ol>?', options: ['<ul> es para imágenes y <ol> para textos', '<ol> numera los elementos (1, 2, 3) y <ul> usa viñetas de puntos', 'No hay diferencia', '<ul> requiere CSS obligatorio'], correct: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Crea una receta numerada', filename: 'index.html', parts: ['', '___', '\n  <li>Mezclar harina</li>\n  <li>Hornear</li>\n', '___', ''], words: ['<ol>', '</ol>', '<ul>', '</ul>'], answers: ['<ol>', '</ol>'] },
              { id: 'ex4', type: 'categorize', instruction: '¿Qué tipo de lista deberías usar?', categories: [{id: 'ol', title: 'Usar <ol> (Ordenado)', color: '#10b981'}, {id: 'ul', title: 'Usar <ul> (Sin orden)', color: '#8b5cf6'}], items: [{text: 'Pasos de una receta de cocina', category: 'ol'}, {text: 'Lista de ingredientes de compra', category: 'ul'}, {text: 'Top 10 canciones más escuchadas', category: 'ol'}, {text: 'Menú superior de navegación', category: 'ul'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿Dónde está el error sintáctico?', filename: 'index.html', lines: ['<ol>', '  <li>Paso 1</li>', '  <li>Paso 2</ol>', '</ol>'], errorLineIndex: 2, explanation: 'Recuerda cerrar la etiqueta <li> con </li> y no con </ol>.' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena de mayor a menor el nivel del contenedor', items: ['<li>Texto</li>', '<ol>'], correctOrder: ['<ol>', '<li>Texto</li>'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Abre la etiqueta contenedora de una lista ordenada.', startingCode: '<', validationRegex: '^<ol>$', explanationIncorrect: 'Debe ser <ol>' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de las siguientes afirmaciones sobre <ol> son verdaderas?', options: ['Numera los elementos automáticamente', 'Requiere etiquetas <li> en su interior', 'Solo permite máximo 3 elementos', 'Se usa para secuencias de pasos ordenados'], correctAnswers: [0, 1, 3] }
            ]
          },
          {
            roundNum: 3, label: 'Listas de Descripción (dl)', xpReward: 22, coins: 16,
            theory: [
              { id: 't1', type: 'concept', icon: 'BookOpen', color: '#6366f1', title: 'Glosarios y Diccionarios (<dl>)', body: 'Para listas de término y definición (diccionarios, preguntas frecuentes, especificaciones técnicas) usamos `<dl>` con `<dt>` (término) y `<dd>` (descripción).' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la etiqueta que contiene la DEFINICIÓN o explicación del término.', code: '<dl>\n  [[<dt>]]HTML[[</dt>]]\n  [[<dd>]]Lenguaje de marcas[[</dd>]]\n</dl>', correctIndex: 1 },
              { id: 'ex2', type: 'multiple-choice', question: 'En una lista de descripción <dl>, ¿qué etiqueta encierra el TÉRMINO a definir?', options: ['<dd>', '<dt>', '<li>', '<term>'], correct: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Crea una pregunta frecuente con término y definición', filename: 'index.html', parts: ['<dl>\n  ', '___', '¿Qué es CSS?', '___', '\n  <dd>Lenguaje de estilos</dd>\n</dl>'], words: ['<dt>', '</dt>', '<dd>', '</dd>'], answers: ['<dt>', '</dt>'] },
              { id: 'ex4', type: 'categorize', instruction: 'Asigna cada etiqueta a su significado', categories: [{id: 'dt', title: '<dt> (Término)', color: '#ec4899'}, {id: 'dd', title: '<dd> (Definición)', color: '#3b82f6'}], items: [{text: 'El título de la palabra', category: 'dt'}, {text: 'El significado o explicación', category: 'dd'}, {text: 'Nombre de un producto', category: 'dt'}, {text: 'Descripción de características', category: 'dd'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿Dónde está el error de etiqueta?', filename: 'index.html', lines: ['<dl>', '  <dt>HTML</dt>', '  <dt>Lenguaje de marcas</dt>', '</dl>'], errorLineIndex: 2, explanation: 'La explicación del término debe ir dentro de <dd>, no dentro de <dt>.' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena los elementos de un glosario', items: ['<dd>Definición</dd>', '<dl>', '<dt>Término</dt>'], correctOrder: ['<dl>', '<dt>Término</dt>', '<dd>Definición</dd>'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Abre la etiqueta para la definición del término en la lista (dd).', startingCode: '<', validationRegex: '^<dd>$', explanationIncorrect: 'Debe ser <dd>' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Qué etiquetas forman la familia de listas de descripción?', options: ['<dl>', '<dt>', '<dd>', '<ul>'], correctAnswers: [0, 1, 2] }
            ]
          }
        ]
      },

      // ── LECCIÓN 6: Tablas de Datos ────────────────────────────────────────
      {
        id: 'html-1-6',
        title: 'Tablas de Datos',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Estructura de Tabla', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Table', color: '#6366f1', title: 'Tablas de Datos en HTML', subtitle: 'Filas y Celdas', body: 'Para mostrar información en cuadrículas (como hojas de cálculo o calendarios) usamos `<table>`. Cada fila se define con `<tr>` (Table Row) y las celdas con `<td>` (Table Data).' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la etiqueta que define una FILA completa en la tabla.', code: '<table>\n  [[<tr>]]\n    [[<td>]]Celda[[</td>]]\n  [[</tr>]]\n</table>', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Qué representa la etiqueta <tr> en una tabla HTML?', options: ['Table Rating', 'Table Row (Fila de la tabla)', 'Table Right', 'Table Reader'], correct: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Crea una tabla con una fila y una celda', filename: 'index.html', parts: ['<table>\n  ', '___', '\n    ', '___', 'Dato', '___', '\n  ', '___', '\n</table>'], words: ['<tr>', '<td>', '</td>', '</tr>'], answers: ['<tr>', '<td>', '</td>', '</tr>'] },
              { id: 'ex4', type: 'code-error', instruction: '¿En qué línea se puso texto directo en la tabla sin celda td?', filename: 'index.html', lines: ['<table>', '  <tr>', '    Texto directo sin td', '  </tr>', '</table>'], errorLineIndex: 2, explanation: 'Recuerda que el contenido de una fila debe ir siempre dentro de celdas <td>.' },
              { id: 'ex5', type: 'drag-sort', prompt: 'Ordena la jerarquía de una tabla', items: ['<td>Dato</td>', '<table>', '<tr>'], correctOrder: ['<table>', '<tr>', '<td>Dato</td>'] },
              { id: 'ex6', type: 'categorize', instruction: 'Clasifica los componentes de una tabla', categories: [{id: 'row', title: 'Fila (<tr>)', color: '#3b82f6'}, {id: 'cell', title: 'Celda (<td>)', color: '#ec4899'}], items: [{text: 'Contiene varias celdas horizontales', category: 'row'}, {text: 'Contiene el dato o texto', category: 'cell'}] },
              { id: 'ex7', type: 'code-typing', instruction: 'Inserta una celda de datos estándar en la tabla con el texto Dato.', startingCode: '', validationRegex: '^<td>\\s*Dato\\s*<\\/td>$', explanationIncorrect: 'Asegúrate de escribir <td>Dato</td>' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles son etiquetas indispensables en una tabla básica?', options: ['<table>', '<tr>', '<td>', '<video>'], correctAnswers: [0, 1, 2] }
            ]
          },
          {
            roundNum: 2, label: 'Encabezados (th)', xpReward: 18, coins: 14,
            theory: [
              { id: 't1', type: 'concept', icon: 'Heading', color: '#6366f1', title: 'Celdas de Encabezado (<th>)', body: 'Las celdas de la primera fila que actúan como títulos de columna se representan con `<th>` (Table Header). Se muestran en negrita y centradas por defecto.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la celda de ENCABEZADO de columna.', code: '<tr>\n  [[<th>]]Nombre[[</th>]]\n  [[<td>]]Juan[[</td>]]\n</tr>', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Cuál es la diferencia visual y semántica entre <th> y <td>?', options: ['<th> es para videos y <td> para texto', '<th> representa títulos de columna en negrita y <td> celdas de datos normales', 'No hay diferencia', '<td> solo funciona en Excel'], correct: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Crea una fila de títulos para Nombre y Edad', filename: 'index.html', parts: ['<tr>\n  ', '___', 'Nombre', '___', '\n  ', '___', 'Edad', '___', '\n</tr>'], words: ['<th>', '</th>', '<th>', '</th>'], answers: ['<th>', '</th>', '<th>', '</th>'] },
              { id: 'ex4', type: 'categorize', instruction: '¿Qué celda deberías usar en cada caso?', categories: [{id: 'th', title: '<th> (Encabezado)', color: '#f59e0b'}, {id: 'td', title: '<td> (Dato normal)', color: '#10b981'}], items: [{text: 'Título de la columna "Precio"', category: 'th'}, {text: 'El valor "$100"', category: 'td'}, {text: 'Título de la columna "Producto"', category: 'th'}, {text: 'El nombre "Zapatos"', category: 'td'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea está mal cerrada la celda th?', filename: 'index.html', lines: ['<tr>', '  <th>Precio</td>', '</tr>'], errorLineIndex: 1, explanation: 'Recuerda cerrar la etiqueta <th> con </th> y no con </td>.' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena la fila de encabezados', items: ['<th>Edad</th>', '<tr>', '<th>Nombre</th>'], correctOrder: ['<tr>', '<th>Nombre</th>', '<th>Edad</th>'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Inserta una celda de encabezado en la tabla con el texto ID.', startingCode: '', validationRegex: '^<th>\\s*ID\\s*<\\/th>$', explanationIncorrect: 'Debe ser <th>ID</th>' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Qué características aplican a la etiqueta <th>?', options: ['Texto en negrita por defecto', 'Alineado al centro por defecto', 'Define títulos de columna o fila', 'Crea botones automáticos'], correctAnswers: [0, 1, 2] }
            ]
          },
          {
            roundNum: 3, label: 'Estructura Avanzada (thead, tbody)', xpReward: 22, coins: 16,
            theory: [
              { id: 't1', type: 'concept', icon: 'Layers', color: '#6366f1', title: 'Secciones semánticas de una tabla', body: 'Para tablas complejas se organizan en:\n- `<thead>`: Cabecera superior.\n- `<tbody>`: Cuerpo de datos.\n- `<tfoot>`: Pie de tabla (totales, sumas).' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la etiqueta contenedora de la CABECERA de la tabla.', code: '<table>\n  [[<thead>]]\n    <tr><th>Nombre</th></tr>\n  [[</thead>]]\n</table>', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Para qué sirve <tfoot> en una tabla?', options: ['Para poner imágenes de pies', 'Para mostrar pies de página, totales o sumas acumuladas', 'Para ocultar la tabla', 'Para eliminar filas'], correct: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Estructura semánticamente el cuerpo de la tabla', filename: 'index.html', parts: ['<table>\n  <thead>...</thead>\n  ', '___', '\n    <tr><td>Dato</td></tr>\n  ', '___', '\n</table>'], words: ['<tbody>', '</tbody>', '<footer>', '</html>'], answers: ['<tbody>', '</tbody>'] },
              { id: 'ex4', type: 'categorize', instruction: 'Asigna las secciones de la tabla', categories: [{id: 'head', title: '<thead>', color: '#3b82f6'}, {id: 'body', title: '<tbody>', color: '#10b981'}, {id: 'foot', title: '<tfoot>', color: '#f59e0b'}], items: [{text: 'Títulos de columnas', category: 'head'}, {text: 'Filas de productos', category: 'body'}, {text: 'Fila con el Total General', category: 'foot'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿Dónde se ubicó erróneamente el thead?', filename: 'index.html', lines: ['<tbody>', '  <thead><tr><th>Título</th></tr></thead>', '</tbody>'], errorLineIndex: 1, explanation: 'Recuerda que <thead> debe ir fuera y antes de <tbody>, no dentro.' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena las secciones principales de la tabla', items: ['<tfoot>...</tfoot>', '<tbody>...</tbody>', '<thead>...</thead>'], correctOrder: ['<thead>...</thead>', '<tbody>...</tbody>', '<tfoot>...</tfoot>'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Abre la etiqueta contenedora para el cuerpo de datos de la tabla.', startingCode: '<', validationRegex: '^<tbody>$', explanationIncorrect: 'Debe ser <tbody>' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de estas etiquetas forman parte de la semántica avanzada de tablas?', options: ['<thead>', '<tbody>', '<tfoot>', '<head>'], correctAnswers: [0, 1, 2] }
            ]
          }
        ]
      },

      // ── DESAFÍO PRÁCTICO 2 ────────────────────────────────────────────────
      {
        id: 'html-chal-2',
        type: 'challenge',
        title: 'Desafío: Maquetación de Datos',
        language: 'HTML',
        xpReward: 300,
        coins: 60,
        instruction: 'Crea una tabla semántica de productos con <thead> y <tbody>. La cabecera debe tener <th> para "Producto" y "Precio". El cuerpo debe tener al menos 2 filas <tr> con sus respectivas celdas <td>.',
        startingCode: '<table>\n  \n</table>',
        validators: [
          {
            description: 'Debe contener las etiquetas <thead> y <tbody>',
            test: (doc, code) => code.toLowerCase().includes('<thead') && code.toLowerCase().includes('<tbody')
          },
          {
            description: 'Debe tener celdas de encabezado <th> para Producto y Precio',
            test: (doc, code) => code.toLowerCase().includes('<th') && code.toLowerCase().includes('producto') && code.toLowerCase().includes('precio')
          },
          {
            description: 'Debe incluir al menos 2 filas <tr> dentro de <tbody> con sus celdas <td>',
            test: (doc, code) => {
              const tbody = doc.querySelector('tbody');
              if (!tbody) return false;
              const rows = tbody.querySelectorAll('tr');
              return rows.length >= 2 && doc.querySelectorAll('td').length >= 4;
            }
          }
        ]
      },

      // ── LECCIÓN 7: Formularios I ───────────────────────────────────────────
      {
        id: 'html-1-7',
        title: 'Formularios I',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Entradas de Texto', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Edit3', color: '#6366f1', title: 'Interactividad con Formularios', subtitle: 'Capturando datos del usuario', body: 'Los formularios `<form>` permiten recopilar información introducida por el usuario (registro, login, búsquedas). La etiqueta central de entrada es `<input>`.' },
              { id: 't2', type: 'concept', icon: 'Type', color: '#6366f1', title: 'El atributo type', body: 'El atributo `type` cambia por completo el comportamiento del input (`type="text"`, `type="password"`, `type="email"`).' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el atributo que oculta los caracteres tipeados como puntos (contraseña).', code: '<[[input]] [[type]]="[[password]]" [[placeholder]]="Clave">', correctIndex: 2 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Para qué sirve el atributo placeholder en un <input>?', options: ['Establece el valor que se envía al servidor', 'Muestra un texto de sugerencia o pista borrosa antes de escribir', 'Bloquea el teclado del usuario', 'Cambia el color de fondo'], correct: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Crea un campo para capturar el correo electrónico', filename: 'index.html', parts: ['<input ', '___', '="', '___', '" placeholder="tu@email.com">'], words: ['type', 'email', 'text', 'name'], answers: ['type', 'email'] },
              { id: 'ex4', type: 'code-error', instruction: '¿En qué línea se intentó cerrar la etiqueta input como si no fuera huérfana?', filename: 'index.html', lines: ['<form>', '  <input type="text"></input>', '</form>'], errorLineIndex: 1, explanation: 'Recuerda que <input> es una etiqueta huérfana y NO debe llevar </input>.' },
              { id: 'ex5', type: 'drag-sort', prompt: 'Ordena los atributos del input de texto', items: ['placeholder="Nombre">', 'type="text"', '<input'], correctOrder: ['<input', 'type="text"', 'placeholder="Nombre">'] },
              { id: 'ex6', type: 'categorize', instruction: 'Clasifica según el tipo de input apropiado', categories: [{id: 'text', title: 'type="text"', color: '#3b82f6'}, {id: 'pass', title: 'type="password"', color: '#ec4899'}], items: [{text: 'Nombre de usuario', category: 'text'}, {text: 'Contraseña de acceso', category: 'pass'}, {text: 'Código PIN secreto', category: 'pass'}, {text: 'Ciudad de residencia', category: 'text'}] },
              { id: 'ex7', type: 'code-typing', instruction: 'Configura el input para que solo acepte correos electrónicos.', startingCode: 'type="', validationRegex: '^type="email"$', explanationIncorrect: 'Debe ser type="email"' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de los siguientes son tipos de input válidos en HTML?', options: ['text', 'password', 'email', 'secret-code'], correctAnswers: [0, 1, 2] }
            ]
          },
          {
            roundNum: 2, label: 'Etiquetas de Campo (label)', xpReward: 18, coins: 14,
            theory: [
              { id: 't1', type: 'concept', icon: 'Tag', color: '#6366f1', title: 'Vinculación con <label>', body: 'Para que un formulario sea accesible y usable se conecta cada entrada con su etiqueta mediante el atributo `for` del `<label>` e `id` del `<input>`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el atributo del label que se conecta con el id del input.', code: '<[[label]] [[for]]="email">Correo</[[label]]>\n<[[input]] [[id]]="email" type="email">', correctIndex: 1 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Por qué es indispensable usar <label> con el atributo "for"?', options: ['Permite hacer clic en el texto para enfocar el campo de texto', 'Mejora la accesibilidad para usuarios ciegos', 'Es una buena práctica recomendada', 'Todas las anteriores son correctas'], correct: 3 },
              { id: 'ex3', type: 'word-bank', instruction: 'Conecta el label con el input correspondiente', filename: 'index.html', parts: ['<label ', '___', '="usuario">Usuario:</label>\n<input ', '___', '="usuario" type="text">'], words: ['for', 'id', 'name', 'href'], answers: ['for', 'id'] },
              { id: 'ex4', type: 'code-error', instruction: '¿En qué línea no coinciden los valores de for e id?', filename: 'index.html', lines: ['<label for="clave">Contraseña</label>', '<input id="password" type="password">'], errorLineIndex: 1, explanation: 'El atributo "for" del label ("clave") debe coincidir exactamente con el "id" del input ("password").' },
              { id: 'ex5', type: 'drag-sort', prompt: 'Ordena la pareja label e input', items: ['<input id="nombre" type="text">', '<label for="nombre">Nombre:</label>'], correctOrder: ['<label for="nombre">Nombre:</label>', '<input id="nombre" type="text">'] },
              { id: 'ex6', type: 'categorize', instruction: 'Relaciona atributo con la etiqueta que lo posee', categories: [{id: 'lbl', title: 'Etiqueta <label>', color: '#ec4899'}, {id: 'inp', title: 'Etiqueta <input>', color: '#3b82f6'}], items: [{text: 'Atributo for="..."', category: 'lbl'}, {text: 'Atributo id="..."', category: 'inp'}, {text: 'Atributo placeholder="..."', category: 'inp'}] },
              { id: 'ex7', type: 'code-typing', instruction: 'Enlaza este label al input de correo indicando su id ("email").', startingCode: 'for="', validationRegex: '^for="email"$', explanationIncorrect: 'Debe ser for="email"' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Qué ventajas ofrece hacer clic en un <label>?', options: ['Foca automáticamente el campo <input> vinculado', 'Marca el checkbox o radio asociado', 'Facilita la interacción en pantallas táctiles móviles', 'Borra los datos del servidor'], correctAnswers: [0, 1, 2] }
            ]
          },
          {
            roundNum: 3, label: 'Botón de Envio', xpReward: 22, coins: 16,
            theory: [
              { id: 't1', type: 'concept', icon: 'Send', color: '#6366f1', title: 'Enviar Formularios', body: 'Para enviar los datos recopilados se usa `<button type="submit">` o bien `<input type="submit">` dentro del `<form>`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el atributo que hace que el botón procese y envíe el formulario.', code: '<[[button]] [[type]]="[[submit]]">\n  Guardar Datos\n<[[/button]]>', correctIndex: 2 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Cuál es el valor del atributo type para que un botón envíe un formulario?', options: ['send', 'submit', 'post', 'execute'], correct: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Crea el botón de envío del formulario', filename: 'index.html', parts: ['<button ', '___', '="', '___', '">Registrarse</button>'], words: ['type', 'submit', 'click', 'send'], answers: ['type', 'submit'] },
              { id: 'ex4', type: 'code-error', instruction: '¿Dónde está el error en el tipo de botón?', filename: 'index.html', lines: ['<form>', '  <button type="send">Enviar</button>', '</form>'], errorLineIndex: 1, explanation: 'El tipo estándar para enviar formularios es type="submit", no type="send".' },
              { id: 'ex5', type: 'drag-sort', prompt: 'Ordena la estructura del formulario con botón', items: ['  <button type="submit">Enviar</button>', '</form>', '<form>'], correctOrder: ['<form>', '  <button type="submit">Enviar</button>', '</form>'] },
              { id: 'ex6', type: 'categorize', instruction: 'Clasifica los tipos de botones', categories: [{id: 'sub', title: 'Enviar Formulario', color: '#10b981'}, {id: 'btn', title: 'Acción genérica', color: '#3b82f6'}], items: [{text: 'type="submit"', category: 'sub'}, {text: 'type="button"', category: 'btn'}] },
              { id: 'ex7', type: 'code-typing', instruction: 'Convierte este input en un botón de envío (submit) para procesar el formulario.', startingCode: 'type="', validationRegex: '^type="submit"$', explanationIncorrect: 'Debe ser type="submit"' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de las siguientes etiquetas pueden desencadenar el envío de un formulario?', options: ['<button type="submit">', '<input type="submit">', '<p>', '<div>'], correctAnswers: [0, 1] }
            ]
          }
        ]
      },

      // ── LECCIÓN 8: Formularios II ──────────────────────────────────────────
      {
        id: 'html-1-8',
        title: 'Formularios II',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Selección Única y Múltiple', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'CheckSquare', color: '#6366f1', title: 'Radio Buttons y Checkboxes', body: '- `type="radio"`: Permite seleccionar **únicamente una opción** de un grupo (comparten el mismo `name`).\n- `type="checkbox"`: Permite marcar **múltiples casillas independientes**.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el atributo name que agrupa los radio buttons.', code: '<input type="radio" [[name]]="genero" value="m">\n<input type="radio" [[name]]="genero" value="f">', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Cómo logras que dos radio buttons formen parte del mismo grupo (para que solo se pueda elegir uno)?', options: ['Poniéndoles el mismo id', 'Dándoles el mismo valor en el atributo name', 'Poniéndoles el mismo placeholder', 'Con CSS'], correct: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Crea una casilla de verificación de términos', filename: 'index.html', parts: ['<input ', '___', '="', '___', '"> Acepto los términos'], words: ['type', 'checkbox', 'radio', 'check'], answers: ['type', 'checkbox'] },
              { id: 'ex4', type: 'categorize', instruction: '¿Qué tipo de entrada debes usar?', categories: [{id: 'rad', title: 'type="radio" (1 sola)', color: '#ec4899'}, {id: 'chk', title: 'type="checkbox" (Varias)', color: '#3b82f6'}], items: [{text: 'Seleccionar género (M / F / Otro)', category: 'rad'}, {text: 'Elegir tus pasatiempos favoritos', category: 'chk'}, {text: 'Aceptar términos y condiciones', category: 'chk'}, {text: 'Método de pago único (Tarjeta o Efectivo)', category: 'rad'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿Por qué estos dos radio buttons se pueden seleccionar al mismo tiempo?', filename: 'index.html', lines: ['<input type="radio" name="pago1"> Tarjeta', '<input type="radio" name="pago2"> Efectivo'], errorLineIndex: 1, explanation: 'Para pertenecer al mismo grupo y permitir una sola opción, ambos radio buttons deben tener el mismo atributo name="pago".' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena la casilla marcada por defecto', items: ['checked>', 'type="checkbox"', '<input'], correctOrder: ['<input', 'type="checkbox"', 'checked>'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Convierte este input en una casilla de verificación (checkbox).', startingCode: 'type="', validationRegex: '^type="checkbox"$', explanationIncorrect: 'Debe ser type="checkbox"' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Qué atributo permite marcar por defecto una casilla o radio button?', options: ['checked', 'selected', 'active', 'open'], correctAnswers: [0] }
            ]
          },
          {
            roundNum: 2, label: 'Desplegables y Áreas de Texto', xpReward: 18, coins: 14,
            theory: [
              { id: 't1', type: 'concept', icon: 'List', color: '#6366f1', title: 'Menús Desplegables (<select>)', body: 'Para listas largas de opciones usamos la combinación de `<select>` con sus opciones `<option>`.' },
              { id: 't2', type: 'concept', icon: 'FileText', color: '#6366f1', title: 'Textos multilÍnea (<textarea>)', body: 'Para comentarios o mensajes largos de varias líneas usaremos la etiqueta `<textarea>`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la etiqueta contenedora del menú desplegable.', code: '[[<select>]]\n  <option>Chile</option>\n  <option>México</option>\n[[</select>]]', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Cuál es la etiqueta adecuada para que el usuario escriba un comentario extenso de varios párrafos?', options: ['<input type="text">', '<textarea>', '<label>', '<input type="long">'], correct: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Construye un menú desplegable de países', filename: 'index.html', parts: ['<select>\n  ', '___', 'España', '___', '\n</select>'], words: ['<option>', '</option>', '<item>', '</item>'], answers: ['<option>', '</option>'] },
              { id: 'ex4', type: 'code-error', instruction: '¿Dónde está el error en el cierre del área de texto?', filename: 'index.html', lines: ['<textarea placeholder="Mensaje">', '</input>'], errorLineIndex: 1, explanation: 'Recuerda que <textarea> es una etiqueta normal y debe cerrarse con </textarea>.' },
              { id: 'ex5', type: 'categorize', instruction: 'Asigna el control según el tipo de datos', categories: [{id: 'sel', title: '<select>', color: '#f59e0b'}, {id: 'area', title: '<textarea>', color: '#10b981'}], items: [{text: 'Seleccionar país de origen', category: 'sel'}, {text: 'Escribir carta de presentación', category: 'area'}, {text: 'Elegir año de nacimiento', category: 'sel'}, {text: 'Mensaje de soporte técnico', category: 'area'}] },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena la estructura del select', items: ['</select>', '<option>Opción 1</option>', '<select>'], correctOrder: ['<select>', '<option>Opción 1</option>', '</select>'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Abre la etiqueta para un área de texto multilinea (textarea).', startingCode: '<', validationRegex: '^<textarea>$', explanationIncorrect: 'Debe ser <textarea>' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Qué etiquetas se combinan para crear un menú desplegable?', options: ['<select>', '<option>', '<input>', '<textarea>'], correctAnswers: [0, 1] }
            ]
          },
          {
            roundNum: 3, label: 'Validaciones de Formulario', xpReward: 22, coins: 16,
            theory: [
              { id: 't1', type: 'concept', icon: 'ShieldCheck', color: '#6366f1', title: 'Validación HTML5 Nativa', body: 'HTML5 permite validar datos antes de enviarlos sin necesidad de JavaScript:\n- `required`: Obliga a rellenar el campo.\n- `minlength` / `maxlength`: Limita la cantidad de caracteres.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el atributo que hace que el campo sea OBLIGATORIO.', code: '<input type="text" [[required]] [[placeholder]]="Tu nombre">', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Qué atributo de HTML5 impide que el usuario envíe un formulario dejando un campo en blanco?', options: ['mandatory', 'required', 'blocked', 'validate'], correct: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Haz que la contraseña pida mínimo 8 caracteres y sea obligatoria', filename: 'index.html', parts: ['<input type="password" ', '___', ' ', '___', '="8">'], words: ['required', 'minlength', 'maxlength', 'important'], answers: ['required', 'minlength'] },
              { id: 'ex4', type: 'categorize', instruction: 'Clasifica los atributos de validación nativa', categories: [{id: 'obl', title: 'Obligatoriedad', color: '#ec4899'}, {id: 'len', title: 'Longitud de caracteres', color: '#3b82f6'}], items: [{text: 'required', category: 'obl'}, {text: 'minlength', category: 'len'}, {text: 'maxlength', category: 'len'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea está mal escrito el atributo de obligatoriedad?', filename: 'index.html', lines: ['<form>', '  <input type="text" obligatori="true">', '</form>'], errorLineIndex: 1, explanation: 'El atributo estándar de HTML5 para campos obligatorios es simplemente required.' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena los atributos de validación', items: ['minlength="5">', 'required', '<input type="text"'], correctOrder: ['<input type="text"', 'required', 'minlength="5">'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Añade el atributo que hace que completar este campo sea obligatorio.', startingCode: 'r', validationRegex: '^required$', explanationIncorrect: 'Debe ser required' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de estos atributos validan datos de forma nativa en HTML5?', options: ['required', 'minlength', 'maxlength', 'src'], correctAnswers: [0, 1, 2] }
            ]
          }
        ]
      },

      // ── LECCIÓN 9: Semántica HTML5 ─────────────────────────────────────────
      {
        id: 'html-1-9',
        title: 'Semántica HTML5',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'La era del DIV', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Box', color: '#6366f1', title: 'El contenedor genérico (<div>)', body: 'La etiqueta `<div>` (division) es un contenedor neutro sin significado semántico. Sirve únicamente para agrupar elementos y aplicar estilos con CSS.' },
              { id: 't2', type: 'concept', icon: 'AlertTriangle', color: '#6366f1', title: 'El problema de la Sopa de Divs', body: 'Antes de HTML5, todo se construía con miles de `<div>`. Esto dificultaba que los motores de búsqueda y lectores de pantalla comprendieran qué parte era la cabecera, el menú o la noticia.' }
            ],
            exercises: [
              { id: 'ex1', type: 'multiple-choice', question: '¿Para qué sirve semánticamente la etiqueta <div>?', options: ['Para representar enlaces', 'No tiene significado semántico, es solo un contenedor genérico', 'Para crear tablas de datos', 'Para vídeos'], correct: 1 },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la etiqueta genérica sin significado usada para agrupar.', code: '[[<body>]]\n  [[<div>]]\n    [[<h1>]]Hola[[</h1>]]\n  [[</div>]]\n[[</body>]]', correctIndex: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Agrupa dos párrafos en un div genérico', filename: 'index.html', parts: ['', '___', '\n  <p>Párrafo 1</p>\n  <p>Párrafo 2</p>\n', '___', ''], words: ['<div>', '</div>', '<main>', '</main>'], answers: ['<div>', '</div>'] },
              { id: 'ex4', type: 'categorize', instruction: 'Clasifica los contenedores', categories: [{id: 'gen', title: 'Genérico (Sin significado)', color: '#8b5cf6'}, {id: 'sem', title: 'Semántico (Con significado)', color: '#10b981'}], items: [{text: '<div>', category: 'gen'}, {text: '<header>', category: 'sem'}, {text: '<span>', category: 'gen'}, {text: '<nav>', category: 'sem'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿Dónde está el error al cerrar el div?', filename: 'index.html', lines: ['<div>', '  <p>Contenido</p>', '</span >'], errorLineIndex: 2, explanation: 'Recuerda cerrar la etiqueta <div> con </div>.' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena la envoltura de un div', items: ['</div>', '  <p>Texto</p>', '<div>'], correctOrder: ['<div>', '  <p>Texto</p>', '</div>'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Abre una etiqueta contenedora genérica (div).', startingCode: '<', validationRegex: '^<div>$', explanationIncorrect: 'Debe ser <div>' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles son características del elemento <div>?', options: ['Es un elemento de bloque', 'No tiene significado semántico por sí mismo', 'Sirve para agrupar elementos y aplicar estilos', 'Cambia el texto a negrita automáticamente'], correctAnswers: [0, 1, 2] }
            ]
          },
          {
            roundNum: 2, label: 'Etiquetas con Sentido', xpReward: 18, coins: 14,
            theory: [
              { id: 't1', type: 'concept', icon: 'Layers', color: '#6366f1', title: 'El esqueleto semántico', body: 'HTML5 introdujo etiquetas con significado claro:\n- `<header>`: Cabecera superior.\n- `<nav>`: Barra de navegación.\n- `<main>`: Contenido principal (único).\n- `<footer>`: Pie de página.' }
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Relaciona la sección web con su etiqueta semántica', categories: [{id: 'top', title: 'Arriba (Cabecera)', color: '#3b82f6'}, {id: 'bottom', title: 'Abajo (Pie)', color: '#ec4899'}], items: [{text: '<header>', category: 'top'}, {text: '<footer>', category: 'bottom'}, {text: 'Logo y título de la web', category: 'top'}, {text: 'Derechos de autor (Copyright)', category: 'bottom'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la etiqueta que indica los enlaces de navegación.', code: '[[<header>]]\n  [[<nav>]]\n    [[<a href="/inicio">]]Inicio[[</a>]]\n  [[</nav>]]\n[[</header>]]', correctIndex: 1 },
              { id: 'ex3', type: 'drag-sort', prompt: 'Ordena la estructura semántica de arriba hacia abajo', items: ['<footer>', '<main>', '<nav>', '<header>'], correctOrder: ['<header>', '<nav>', '<main>', '<footer>'] },
              { id: 'ex4', type: 'code-error', instruction: '¿En qué línea se violó la regla del <main> único?', filename: 'index.html', lines: ['<body>', '  <main>Noticia 1</main>', '  <main>Noticia 2</main>', '</body>'], errorLineIndex: 2, explanation: 'Solo puede haber UN elemento <main> por página web.' },
              { id: 'ex5', type: 'word-bank', instruction: 'Envuelve la barra de navegación en su etiqueta semántica', filename: 'index.html', parts: ['', '___', '\n  <a href="/inicio">Inicio</a>\n', '___', ''], words: ['<nav>', '</nav>', '<header>', '</header>'], answers: ['<nav>', '</nav>'] },
              { id: 'ex6', type: 'multiple-choice', question: '¿Cuántos elementos <main> deben existir por documento HTML?', options: ['Uno solo por página', 'Tantos como quieras', 'Dos (uno arriba y uno abajo)', 'Ninguno'], correct: 0 },
              { id: 'ex7', type: 'code-typing', instruction: 'Abre la etiqueta semántica que representa el encabezado principal del sitio (header).', startingCode: '<', validationRegex: '^<header>$', explanationIncorrect: 'Debe ser <header>' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de las siguientes son etiquetas semánticas de estructura en HTML5?', options: ['<header>', '<nav>', '<main>', '<footer>'], correctAnswers: [0, 1, 2, 3] }
            ]
          },
          {
            roundNum: 3, label: 'Contenido Profundo', xpReward: 22, coins: 16,
            theory: [
              { id: 't1', type: 'concept', icon: 'FileText', color: '#6366f1', title: 'Article, Section y Aside', body: 'Dentro de `<main>` organizamos con:\n- `<article>`: Contenido autónomo e independiente (post, noticia).\n- `<section>`: Sección temática.\n- `<aside>`: Contenido secundario o barra lateral.' }
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: '¿Qué etiqueta semántica usarías?', categories: [{id: 'art', title: 'Contenido Independiente', color: '#10b981'}, {id: 'aside', title: 'Contenido Secundario', color: '#f59e0b'}], items: [{text: '<article>', category: 'art'}, {text: '<aside>', category: 'aside'}, {text: 'Post de un blog', category: 'art'}, {text: 'Banners de publicidad lateral', category: 'aside'}] },
              { id: 'ex2', type: 'multiple-choice', question: 'Si un contenido es tan independiente que podrías republicarlo en otro sitio web (como una entrada de blog), usamos:', options: ['<article>', '<section>', '<div>', '<aside>'], correct: 0 },
              { id: 'ex3', type: 'word-bank', instruction: 'Completa la estructura del post y la barra lateral', filename: 'index.html', parts: ['<main>\n  ', '___', '\n    <h2>Noticia</h2>\n  </article>\n  ', '___', '\n    <p>Publicidad</p>\n  </aside>\n</main>'], words: ['<article>', '<aside>', '<section>', '<div>'], answers: ['<article>', '<aside>'] },
              { id: 'ex4', type: 'code-highlight', instruction: 'Toca la etiqueta reservada para barras laterales o información secundaria.', code: '<main>\n  <article>Noticia</article>\n  [[<aside>]]Links relacionados[[</aside>]]\n</main>', correctIndex: 0 },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea está mal cerrada la etiqueta de artículo?', filename: 'index.html', lines: ['<main>', '  <article>', '    <h2>Título</h2>', '  </section>', '</main>'], errorLineIndex: 3, explanation: 'Recuerda cerrar la etiqueta <article> con </article> y no con </section>.' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena de mayor jerarquía a menor jerarquía semántica', items: ['<article>', '<main>', '<body>'], correctOrder: ['<body>', '<main>', '<article>'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Abre la etiqueta semántica que representa un artículo independiente (article).', startingCode: '<', validationRegex: '^<article>$', explanationIncorrect: 'Debe ser <article>' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de las siguientes etiquetas estructuran el contenido interno en HTML5?', options: ['<article>', '<section>', '<aside>', '<html>'], correctAnswers: [0, 1, 2] }
            ]
          }
        ]
      },

      // ── DESAFÍO FINAL HTML ────────────────────────────────────────────────
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
    ]
  }
];
