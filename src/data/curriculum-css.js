export const curriculumCss = [
  {
    id: 'css-1',
    title: 'CSS: Pintando la Web',
    description: 'Transforma tus sitios web estructurados en experiencias visuales modernas e interactivas.',
    color: '#8b5cf6',
    language: 'CSS',
    lessons: [
      // ── LECCIÓN 1: Sintaxis y Fundamentos ─────────────────────────────────
      {
        id: 'css-1-1',
        title: 'El Pintor y su Brocha (Sintaxis)',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'La Regla de Oro', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Palette', color: '#8b5cf6', title: '¿Qué es CSS?', subtitle: 'El diseño y la personalidad visual', body: 'CSS son las siglas de **Cascading Style Sheets** (Hojas de Estilo en Cascada). Mientras HTML crea el esqueleto rígido de la web, CSS determina su apariencia: colores, fuentes, tamaños, márgenes y posicionamiento.' },
              { id: 't2', type: 'concept', icon: 'Brush', color: '#8b5cf6', title: 'La anatomía de una regla CSS', body: 'Para aplicar estilos a un elemento en CSS escribimos una **regla de diseño**. Consta de tres partes:\n1. **Selector**: Indica a qué elemento le daremos estilo.\n2. **Propiedad**: Qué aspecto queremos cambiar (color, font-size, etc.).\n3. **Valor**: El ajuste específico (red, 16px, center).', code: 'selector {\n  propiedad: valor;\n}', codeCaption: 'El bloque de estilos se encierra entre llaves { }' },
              { id: 't3', type: 'tip', icon: 'Zap', color: '#eab308', title: 'El sagrado punto y coma ;', body: 'Cada declaración dentro de una regla CSS **debe finalizar obligatoriamente con punto y coma `;`**. Si olvidas el punto y coma, las reglas siguientes no se aplicarán.' },
              { id: 't4', type: 'compare', icon: 'SplitSquareHorizontal', color: '#8b5cf6', title: 'Dos puntos vs Punto y coma', body: 'En CSS, se usan los **dos puntos `:`** para separar la propiedad de su valor, y el **punto y coma `;`** para marcar el fin de la línea.', leftLabel: 'Separador de valor', leftItems: ['color: red', 'font-size: 18px', 'background: blue'], rightLabel: 'Cierre de declaración', rightItems: ['color: red;', 'font-size: 18px;', 'background: blue;'] }
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Clasifica los componentes de esta regla CSS: h1 { color: blue; }', categories: [{id: 'sel', title: 'Selector (A quién)', color: '#3b82f6'}, {id: 'prop', title: 'Propiedad (Qué cambiar)', color: '#8b5cf6'}, {id: 'val', title: 'Valor (Resultado)', color: '#10b981'}], items: [{text: 'h1', category: 'sel'}, {text: 'color', category: 'prop'}, {text: 'blue', category: 'val'}, {text: 'p', category: 'sel'}, {text: 'font-size', category: 'prop'}, {text: '20px', category: 'val'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca las LLAVES { } que delimitan el bloque de declaración.', code: '[[h1]] [[{]]\n  [[color]]: [[red]];\n[[}]]', correctIndex: 1 },
              { id: 'ex3', type: 'code-highlight', instruction: 'Toca los DOS PUNTOS que separan la propiedad del valor.', code: '[[p]] [[{]]\n  [[color]][[:]] [[blue]];\n[[}]]', correctIndex: 3 },
              { id: 'ex4', type: 'code-error', instruction: 'Encuentra la línea a la que le falta el punto y coma final.', filename: 'style.css', lines: ['h1 {', '  color: red', '}'], errorLineIndex: 1, explanation: 'Recuerda que toda declaración de propiedad y valor en CSS debe terminar con un punto y coma (;).' },
              { id: 'ex5', type: 'drag-sort', prompt: 'Ordena los fragmentos para formar una regla CSS válida', items: ['color: blue;', 'h1', '}', '{'], correctOrder: ['h1', '{', 'color: blue;', '}'] },
              { id: 'ex6', type: 'code-typing', instruction: 'Completa la declaración asignando el color rojo (red).', startingCode: '  color: ', validationRegex: '^\\s*color:\\s*red;$', explanationIncorrect: 'Asegúrate de escribir red; incluyendo el punto y coma final.' },
              { id: 'ex7', type: 'word-bank', instruction: 'Arma una regla que cambie el tamaño de texto a 18px', filename: 'style.css', parts: ['p {\n  ', '___', ':', '___', ';\n}'], words: ['font-size', '18px', 'color', '18'], answers: ['font-size', '18px'] },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de los siguientes son símbolos indispensables en la sintaxis de CSS?', options: ['Llaves { }', 'Punto y coma ;', 'Dos puntos :', 'Etiqueta <css>'], correctAnswers: [0, 1, 2] }
            ]
          },
          {
            roundNum: 2, label: 'Enlazando CSS', xpReward: 18, coins: 14,
            theory: [
              { id: 't1', type: 'concept', icon: 'Link', color: '#8b5cf6', title: 'Tres formas de añadir CSS', body: 'Existen tres formas de vincular CSS con HTML:\n1. **External CSS** (Archivos separados `.css`) — La mejor práctica profesional.\n2. **Internal CSS** (Dentro de etiquetas `<style>` en la misma página).\n3. **Inline CSS** (Directo en el atributo `style="..."` de un elemento).' },
              { id: 't2', type: 'code', icon: 'Code', color: '#8b5cf6', title: 'La etiqueta <link> en el Head', body: 'En hojas externas, enlazamos el archivo `.css` escribiendo una etiqueta `<link>` dentro del `<head>` del HTML.', code: '<head>\n  <link rel="stylesheet" href="styles.css">\n</head>' },
              { id: 't3', type: 'tip', icon: 'Zap', color: '#eab308', title: 'Por qué separar HTML y CSS', body: 'Separar la estructura (HTML) de la presentación (CSS) permite reutilizar una sola hoja de estilos para cientos de páginas web y mantener código limpio.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la etiqueta que vincula la hoja de estilos externa.', code: '[[<head>]]\n  [[<title>]]Mi Sitio Web[[</title>]]\n  [[<link rel="stylesheet" href="style.css">]]\n[[</head>]]', correctIndex: 3 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Por qué la arquitectura profesional exige separar el archivo .css del HTML?', options: ['Porque HTML no soporta colores', 'Para separar responsabilidades: HTML estructura y CSS maquilla', 'Porque es una ley oficial de los navegadores', 'Porque los estilos pesan demasiado'], correct: 1 },
              {
                id: 'ex3', type: 'code-fill', instruction: 'Completa la etiqueta de enlace de estilos externos',
                codeLines: [
                  { text: '<', type: 'code' },
                  { text: '', type: 'blank', answer: 'link', blankId: 0 }, { text: ' rel="', type: 'code' },
                  { text: '', type: 'blank', answer: 'stylesheet', blankId: 1 }, { text: '" ', type: 'code' },
                  { text: '', type: 'blank', answer: 'href', blankId: 2 }, { text: '="style.css">\n', type: 'code' }
                ],
                options: ['link', 'style', 'stylesheet', 'href', 'src'], answers: ['link', 'stylesheet', 'href']
              },
              { id: 'ex4', type: 'categorize', instruction: 'Clasifica los métodos de inclusión de CSS', categories: [{id: 'ext', title: 'Externo (Recomendado)', color: '#10b981'}, {id: 'inline', title: 'Inline (No recomendado)', color: '#ef4444'}], items: [{text: '<link rel="stylesheet" href="a.css">', category: 'ext'}, {text: '<p style="color:red">', category: 'inline'}, {text: 'Archivo styles.css separado', category: 'ext'}, {text: 'Atributo style directo', category: 'inline'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea se usó src en lugar de href para el archivo CSS?', filename: 'index.html', lines: ['<head>', '  <title>Tienda</title>', '  <link rel="stylesheet" src="estilos.css">', '</head>'], errorLineIndex: 2, explanation: 'Recuerda que la etiqueta <link> utiliza el atributo href="..." para definir la ruta de la hoja de estilos.' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena los atributos dentro de la etiqueta link', items: ['href="styles.css">', '<link', 'rel="stylesheet"'], correctOrder: ['<link', 'rel="stylesheet"', 'href="styles.css">'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Indica la ruta hacia el archivo app.css usando el atributo correspondiente.', startingCode: 'href="', validationRegex: '^href="app\\.css"$', explanationIncorrect: 'Debe ser href="app.css"' },
              { id: 'ex8', type: 'multi-select', prompt: '¿En qué lugar del documento HTML se ubica la etiqueta <link>?', options: ['Dentro del <head>', 'Al final del <body>', 'En el archivo .css', 'Antes del <!DOCTYPE>'], correctAnswers: [0] }
            ]
          },
          {
            roundNum: 3, label: 'Comentarios y Buenas Prácticas', xpReward: 22, coins: 16,
            theory: [
              { id: 't1', type: 'concept', icon: 'MessageSquare', color: '#8b5cf6', title: 'Comentarios en CSS', body: 'Los comentarios en CSS permiten documentar tu código para explicar qué hace cada sección. El navegador los omite al renderizar.' },
              { id: 't2', type: 'code', icon: 'Code', color: '#8b5cf6', title: 'Sintaxis /* */', body: 'En CSS, todo texto que se encuentre entre `/*` y `*/` será tratado como comentario.', code: '/* Estilos de la barra de navegación */\nnav {\n  background: #333;\n}' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el comentario dentro del bloque CSS.', code: '[[h1]] [[{]]\n  [[/* Titulo de portada */]]\n  [[color]]: [[red]];\n[[}]]', correctIndex: 2 },
              { id: 'ex2', type: 'categorize', instruction: 'Determina si la instrucción se ejecuta o es ignorada', categories: [{id: 'exec', title: 'El navegador la ejecuta', color: '#10b981'}, {id: 'ignore', title: 'El navegador la ignora', color: '#8b5cf6'}], items: [{text: 'color: blue;', category: 'exec'}, {text: '/* color: blue; */', category: 'ignore'}, {text: '/* Todo: cambiar tipografía */', category: 'ignore'}, {text: 'font-size: 16px;', category: 'exec'}] },
              { id: 'ex3', type: 'multiple-choice', question: 'Si colocas una regla CSS válida entre los símbolos /* y */, ¿qué ocurrirá?', options: ['Producirá un error sintáctico', 'El navegador la ignorará como si no existiera', 'Se eliminará del disco duro', 'La aplicará solo en modo noche'], correct: 1 },
              { id: 'ex4', type: 'word-bank', instruction: 'Comenta la regla de estilos para deshabilitarla', filename: 'style.css', parts: ['', '___', ' color: green; ', '___', ''], words: ['/*', '*/', '<!--', '-->'], answers: ['/*', '*/'] },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea se usó la sintaxis de comentarios de HTML dentro de CSS?', filename: 'style.css', lines: ['/* Estilos de cabecera */', 'header {', '  <!-- color: red; -->', '}'], errorLineIndex: 2, explanation: 'Recuerda que en archivos CSS los comentarios se escriben con /* ... */ y no con <!-- ... -->.' },
              { id: 'ex6', type: 'code-typing', instruction: 'Cierra el comentario en CSS.', startingCode: '*', validationRegex: '^\\*\\/$', explanationIncorrect: 'Recuerda que los comentarios en CSS se cierran con */' },
              { id: 'ex7', type: 'drag-sort', prompt: 'Ordena la apertura y cierre de un comentario CSS', items: ['nota */', '/*', 'Esta es una'], correctOrder: ['/*', 'Esta es una', 'nota */'] },
              { id: 'ex8', type: 'multi-select', prompt: '¿Para qué resulta útil usar comentarios en hojas CSS?', options: ['Explicar la estructura de secciones a otros desarrolladores', 'Desactivar reglas temporalmente mientras pruebas', 'Aumentar la velocidad de descarga', 'Cambiar dinámicamente los colores'], correctAnswers: [0, 1] }
            ]
          }
        ]
      },

      // ── LECCIÓN 2: Colores y Fondos ───────────────────────────────────────
      {
        id: 'css-1-2',
        title: 'Colores y Fondos',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Paleta de Colores', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Palette', color: '#8b5cf6', title: 'Sistemas de Color en CSS', subtitle: 'Expresando tonos en pantalla', body: 'En CSS podemos definir colores usando tres formatos principales:\n1. Nombres clave (`red`, `blue`, `gold`).\n2. Códigos Hexadecimales (`#ff0000`, `#3b82f6`).\n3. Funciones RGB / HSL (`rgb(255, 0, 0)`).' },
              { id: 't2', type: 'concept', icon: 'Sun', color: '#8b5cf6', title: 'Propiedades color y background-color', body: '- `color`: Determina el color del **texto**.\n- `background-color`: Determina el color de **fondo** del contenedor.', code: 'p {\n  color: white;\n  background-color: #1e1e2e;\n}' }
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Clasifica según la propiedad adecuada', categories: [{id: 'text', title: 'color (Texto)', color: '#ec4899'}, {id: 'bg', title: 'background-color (Fondo)', color: '#3b82f6'}], items: [{text: 'Pintar las letras de negro', category: 'text'}, {text: 'Rellenar la tarjeta de gris', category: 'bg'}, {text: 'Pintar el título de azul', category: 'text'}, {text: 'Pintar el fondo de la pantalla', category: 'bg'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la propiedad que modifica el color del TEXTO.', code: 'p {\n  [[background-color]]: #fff;\n  [[color]]: #000;\n}', correctIndex: 1 },
              { id: 'ex3', type: 'multiple-choice', question: '¿Cuál de los siguientes es un valor de color escrito en código Hexadecimal?', options: ['red', '#ff5733', 'rgb(0,0,0)', 'hsl(120, 100%, 50%)'], correct: 1 },
              {
                id: 'ex4', type: 'code-fill', instruction: 'Establece texto blanco sobre fondo oscuro',
                codeLines: [
                  { text: 'div {\n  ', type: 'code' },
                  { text: '', type: 'blank', answer: 'color', blankId: 0 }, { text: ': white;\n  ', type: 'code' },
                  { text: '', type: 'blank', answer: 'background-color', blankId: 1 }, { text: ': black;\n}\n', type: 'code' }
                ],
                options: ['color', 'background-color', 'text-color', 'bg'], answers: ['color', 'background-color']
              },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea falta el carácter # del código Hexadecimal?', filename: 'style.css', lines: ['body {', '  color: 333333;', '  background-color: #f5f5f5;', '}'], errorLineIndex: 1, explanation: 'Recuerda que los códigos de color hexadecimales deben comenzar siempre con el signo de numeral (#).' },
              { id: 'ex6', type: 'code-typing', instruction: 'Añade la propiedad para cambiar el color del texto a azul (blue).', startingCode: '  ', validationRegex: '^color:\\s*blue;$', explanationIncorrect: 'Debe ser color: blue;' },
              { id: 'ex7', type: 'drag-sort', prompt: 'Ordena la regla para aplicar fondo amarillo', items: ['background-color: yellow;', 'body {', '}'], correctOrder: ['body {', 'background-color: yellow;', '}'] },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles son formatos de representación de color válidos en CSS?', options: ['Hexadecimal (#000)', 'Nombres en inglés (red)', 'RGB rgb(0,0,0)', 'Puntos cardinales (Norte)'], correctAnswers: [0, 1, 2] }
            ]
          },
          {
            roundNum: 2, label: 'Opacidad y Gradientes', xpReward: 18, coins: 14,
            theory: [
              { id: 't1', type: 'concept', icon: 'Eye', color: '#8b5cf6', title: 'Transparencia con RGBA', body: 'La "a" en `rgba(r, g, b, alfa)` controla la opacidad, con valores entre `0` (100% transparente) y `1` (completamente opaco).' },
              { id: 't2', type: 'code', icon: 'Sparkles', color: '#8b5cf6', title: 'Degradados de Color (linear-gradient)', body: 'Podemos crear fondos con transiciones suaves entre varios colores usando la función `linear-gradient()`.', code: 'div {\n  background: linear-gradient(to right, #6366f1, #ec4899);\n}' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el parámetro que indica la transparencia (alfa).', code: 'p {\n  color: rgba(255, 0, 0, [[0.5]]);\n}', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: 'Si la opacidad alfa en rgba() vale 0, ¿cómo se verá el elemento?', options: ['Completamente opaco', 'Completamente transparente e invisible', 'De color negro', 'De color blanco'], correct: 1 },
              { id: 'ex3', type: 'categorize', instruction: 'Clasifica los valores del canal Alfa (opacidad)', categories: [{id: 'trans', title: 'Transparente', color: '#ec4899'}, {id: 'opac', title: 'Opaco', color: '#10b981'}], items: [{text: '0.0', category: 'trans'}, {text: '1.0', category: 'opac'}, {text: '0.2', category: 'trans'}, {text: '0.9', category: 'opac'}] },
              { id: 'ex4', type: 'word-bank', instruction: 'Crea un fondo en degradado lineal', filename: 'style.css', parts: ['button {\n  background: ', '___', '(to right, red, blue);\n}'], words: ['linear-gradient', 'gradient', 'rgba', 'color'], answers: ['linear-gradient'] },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea está mal formulada la función rgba?', filename: 'style.css', lines: ['header {', '  background: rgba(0, 0, 0);', '}'], errorLineIndex: 1, explanation: 'Recuerda que rgba() requiere 4 parámetros (rojo, verde, azul y opacidad alfa).' },
              { id: 'ex6', type: 'code-typing', instruction: 'Añade la propiedad para aplicar una opacidad del 50% (0.5).', startingCode: '  opacity: ', validationRegex: '^opacity:\\s*0\\.5;$', explanationIncorrect: 'Debe ser opacity: 0.5;' },
              { id: 'ex7', type: 'drag-sort', prompt: 'Ordena los parámetros de rgba(0, 128, 255, 0.8)', items: ['0.8)', 'rgba(0, 128, 255,'], correctOrder: ['rgba(0, 128, 255,', '0.8)'] },
              { id: 'ex8', type: 'multi-select', prompt: '¿Qué propiedades admiten valores de degradados?', options: ['background', 'background-image', 'color', 'font-family'], correctAnswers: [0, 1] }
            ]
          },
          {
            roundNum: 3, label: 'Dominando Fondos', xpReward: 22, coins: 16,
            theory: [
              { id: 't1', type: 'concept', icon: 'Image', color: '#8b5cf6', title: 'Imágenes de Fondo', body: 'Podemos usar imágenes como fondo de cualquier contenedor mediante la propiedad `background-image: url("ruta.jpg")`.' },
              { id: 't2', type: 'code', icon: 'Maximize', color: '#8b5cf6', title: 'background-size: cover', body: 'Para asegurar que la imagen de fondo cubra todo el contenedor sin deformarse, la propiedad clave es `background-size: cover;`.', code: 'header {\n  background-image: url("foto.jpg");\n  background-size: cover;\n  background-position: center;\n}' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la propiedad que define la imagen de fondo.', code: 'header {\n  [[background-image]]: url("banner.jpg");\n  [[background-size]]: cover;\n}', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Qué hace la propiedad background-size: cover;?', options: ['Repite la imagen en mosaico', 'Escala la imagen para cubrir todo el contenedor sin deformarse', 'Hace la imagen transparente', 'Oculta la imagen'], correct: 1 },
              { id: 'ex3', type: 'categorize', instruction: 'Clasifica según la propiedad de fondo correspondiente', categories: [{id: 'img', title: 'background-image', color: '#ec4899'}, {id: 'pos', title: 'background-position', color: '#3b82f6'}], items: [{text: 'url("foto.jpg")', category: 'img'}, {text: 'center', category: 'pos'}, {text: 'top left', category: 'pos'}, {text: 'url("pattern.png")', category: 'img'}] },
              { id: 'ex4', type: 'word-bank', instruction: 'Establece una imagen de fondo para el héroe', filename: 'style.css', parts: ['section {\n  background-image: ', '___', '("hero.jpg");\n}'], words: ['url', 'src', 'link', 'file'], answers: ['url'] },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea se olvidaron las comillas o la función url()?', filename: 'style.css', lines: ['header {', '  background-image: foto.jpg;', '}'], errorLineIndex: 1, explanation: 'Recuerda que las imágenes de fondo deben ir envueltas en la función url("...").' },
              { id: 'ex6', type: 'code-typing', instruction: 'Configura el tamaño del fondo para que cubra todo el contenedor.', startingCode: '  background-size: ', validationRegex: '^background-size:\\s*cover;$', explanationIncorrect: 'Debe ser background-size: cover;' },
              { id: 'ex7', type: 'drag-sort', prompt: 'Ordena la regla completa de fondo con imagen', items: ['background-size: cover;', 'background-image: url("bg.jpg");', 'div {', '}'], correctOrder: ['div {', 'background-image: url("bg.jpg");', 'background-size: cover;', '}'] },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de estas propiedades pertenecen al módulo de fondos de CSS?', options: ['background-color', 'background-image', 'background-size', 'text-align'], correctAnswers: [0, 1, 2] }
            ]
          }
        ]
      },

      // ── DESAFÍO PRÁCTICO 1 ────────────────────────────────────────────────
      {
        id: 'css-chal-1',
        type: 'challenge',
        title: 'Desafío: Tarjeta de Presentación',
        language: 'CSS',
        xpReward: 250,
        coins: 50,
        instruction: 'Crea reglas de estilo para una tarjeta de perfil. El .card debe tener background-color oscuro (#1e1e2e) y color de texto blanco (#ffffff). El h1 interno debe tener color dorado (#f59e0b).',
        startingCode: '.card {\n  \n}\n\n.card h1 {\n  \n}',
        validators: [
          {
            description: 'El .card debe tener background-color: #1e1e2e',
            test: (doc, code) => code.toLowerCase().includes('.card') && code.toLowerCase().includes('background-color') && code.toLowerCase().includes('#1e1e2e')
          },
          {
            description: 'El .card debe tener color: #ffffff (o white)',
            test: (doc, code) => code.toLowerCase().includes('color') && (code.toLowerCase().includes('#ffffff') || code.toLowerCase().includes('white'))
          },
          {
            description: 'El .card h1 debe tener color: #f59e0b',
            test: (doc, code) => code.toLowerCase().includes('h1') && code.toLowerCase().includes('#f59e0b')
          }
        ]
      },

      // ── LECCIÓN 3: El Modelo de Caja (Box Model) ──────────────────────────
      {
        id: 'css-1-3',
        title: 'El Modelo de Caja (Box Model)',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Padding vs Margin', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Box', color: '#8b5cf6', title: 'Todo en CSS es una caja', subtitle: 'El secreto del maquetado', body: 'En CSS, **absolutamente todos los elementos** son cajas rectangulares concéntricas.\n- `padding`: Espacio INTERNO (entre el contenido y el borde).\n- `margin`: Espacio EXTERNO (entre el borde y otros elementos vecinos).' }
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Clasifica el tipo de espacio', categories: [{id: 'pad', title: 'padding (Espacio Interno)', color: '#10b981'}, {id: 'mar', title: 'margin (Espacio Externo)', color: '#ec4899'}], items: [{text: 'Alejar la tarjeta de otros elementos', category: 'mar'}, {text: 'Separar el texto del borde de la caja', category: 'pad'}, {text: 'Relleno por dentro del botón', category: 'pad'}, {text: 'Separación entre párrafos', category: 'mar'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la propiedad que añade espacio por DENTRO del contenedor.', code: 'div {\n  [[margin]]: 20px;\n  [[padding]]: 15px;\n}', correctIndex: 1 },
              { id: 'ex3', type: 'multiple-choice', question: 'Si quieres aumentar el colchón interno de un botón para que el texto no toque sus bordes, usas:', options: ['margin', 'padding', 'border', 'width'], correct: 1 },
              { id: 'ex4', type: 'word-bank', instruction: 'Establece un relleno interno de 20px', filename: 'style.css', parts: ['button {\n  ', '___', ': 20px;\n}'], words: ['padding', 'margin', 'border', 'spacing'], answers: ['padding'] },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea falta el punto y coma?', filename: 'style.css', lines: ['.caja {', '  padding: 10px', '  margin: 20px;', '}'], errorLineIndex: 1, explanation: 'Toda propiedad en CSS debe finalizar obligatoriamente con punto y coma (;).' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena de afuera hacia adentro en el Box Model', items: ['Content (Contenido)', 'Margin (Margen externo)', 'Padding (Relleno interno)'], correctOrder: ['Margin (Margen externo)', 'Padding (Relleno interno)', 'Content (Contenido)'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Añade un margen exterior de 10 píxeles.', startingCode: '  margin: ', validationRegex: '^margin:\\s*10px;$', explanationIncorrect: 'Debe ser margin: 10px;' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de las siguientes son capas del Box Model de CSS?', options: ['Content', 'Padding', 'Border', 'Margin'], correctAnswers: [0, 1, 2, 3] }
            ]
          },
          {
            roundNum: 2, label: 'Lados Individuales', xpReward: 18, coins: 14,
            theory: [
              { id: 't1', type: 'concept', icon: 'Maximize2', color: '#8b5cf6', title: 'Control por cada lado', body: 'Podemos controlar individualmente cada lado: `padding-top`, `padding-right`, `padding-bottom`, `padding-left` (en sentido horario: arriba, derecha, abajo, izquierda).' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la propiedad que modifica únicamente el margen INFERIOR.', code: 'div {\n  [[margin-top]]: 10px;\n  [[margin-bottom]]: 30px;\n}', correctIndex: 1 },
              { id: 'ex2', type: 'multiple-choice', question: 'En el atajo padding: 10px 20px 30px 40px;, ¿a qué lado corresponde el valor 10px?', options: ['Arriba (Top)', 'Derecha (Right)', 'Abajo (Bottom)', 'Izquierda (Left)'], correct: 0 },
              { id: 'ex3', type: 'word-bank', instruction: 'Añade un margen superior de 50px', filename: 'style.css', parts: ['h1 {\n  ', '___', ': 50px;\n}'], words: ['margin-top', 'padding-top', 'margin-left', 'border-top'], answers: ['margin-top'] },
              { id: 'ex4', type: 'categorize', instruction: 'Clasifica la propiedad según el lado que modifica', categories: [{id: 'top', title: 'Arriba', color: '#3b82f6'}, {id: 'bot', title: 'Abajo', color: '#ec4899'}], items: [{text: 'padding-top', category: 'top'}, {text: 'margin-bottom', category: 'bot'}, {text: 'border-bottom', category: 'bot'}, {text: 'margin-top', category: 'top'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea está mal escrita la propiedad del margen izquierdo?', filename: 'style.css', lines: ['.box {', '  margin-izquierda: 10px;', '}'], errorLineIndex: 1, explanation: 'Las propiedades de CSS están en inglés: debe ser margin-left: 10px;.' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena la notación de reloj de 4 valores (Clockwise)', items: ['Left (Izquierda)', 'Right (Derecha)', 'Top (Arriba)', 'Bottom (Abajo)'], correctOrder: ['Top (Arriba)', 'Right (Derecha)', 'Bottom (Abajo)', 'Left (Izquierda)'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Añade un margen interior izquierdo de 15 píxeles.', startingCode: '  padding-left: ', validationRegex: '^padding-left:\\s*15px;$', explanationIncorrect: 'Debe ser padding-left: 15px;' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de los siguientes son nombres válidos de propiedades de lados en CSS?', options: ['margin-top', 'padding-right', 'margin-bottom', 'padding-left'], correctAnswers: [0, 1, 2, 3] }
            ]
          },
          {
            roundNum: 3, label: 'box-sizing: border-box', xpReward: 22, coins: 16,
            theory: [
              { id: 't1', type: 'concept', icon: 'Shield', color: '#8b5cf6', title: 'El salvavidas: box-sizing', body: 'Por defecto en CSS (`content-box`), al añadir padding a una caja de `width: 200px` su tamaño TOTAL aumenta. Usar `box-sizing: border-box;` obliga a que el tamaño total no cambie jamás.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el valor que mantiene el tamaño exacto del contenedor al añadir padding.', code: '* {\n  [[box-sizing]]: [[border-box]];\n}', correctIndex: 1 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Por qué todos los desarrolladores añaden * { box-sizing: border-box; } al inicio de su código?', options: ['Para que los anchos declarados en width incluyan el padding sin ensanchar la caja', 'Para cambiar los colores a pastel', 'Para eliminar el HTML', 'Para que las fuentes sean más grandes'], correct: 0 },
              { id: 'ex3', type: 'word-bank', instruction: 'Aplica el cálculo moderno de cajas a todo el documento', filename: 'style.css', parts: ['* {\n  box-sizing: ', '___', ';\n}'], words: ['border-box', 'content-box', 'padding-box', 'fit-content'], answers: ['border-box'] },
              { id: 'ex4', type: 'categorize', instruction: 'Compara los modos de box-sizing', categories: [{id: 'bb', title: 'border-box (Recomendado)', color: '#10b981'}, {id: 'cb', title: 'content-box (Defecto)', color: '#ef4444'}], items: [{text: 'El padding no aumenta el width total', category: 'bb'}, {text: 'El padding suma y ensancha la caja', category: 'cb'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea está mal escrito el valor de box-sizing?', filename: 'style.css', lines: ['* {', '  box-sizing: borderbox;', '}'], errorLineIndex: 1, explanation: 'Recuerda que el valor lleva guion entre las palabras: border-box.' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena la regla global de box-sizing', items: ['box-sizing: border-box;', '* {', '}'], correctOrder: ['* {', 'box-sizing: border-box;', '}'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Cambia el modelo de caja para que incluya los bordes y el padding en el tamaño total.', startingCode: '  box-sizing: ', validationRegex: '^box-sizing:\\s*border-box;$', explanationIncorrect: 'Debe ser box-sizing: border-box;' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Qué ventajas ofrece usar box-sizing: border-box;?', options: ['Evita descuadres al diseñar layouts', 'Mantiene los anchos exactos al añadir padding o border', 'Facilita la maquetación responsive', 'Cambia el idioma a español'], correctAnswers: [0, 1, 2] }
            ]
          }
        ]
      },

      // ── LECCIÓN 4: Tipografía y Estilo de Texto ───────────────────────────
      {
        id: 'html-1-4',
        title: 'Tipografía y Estilo de Texto',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Fuentes y Tamaños', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Type', color: '#8b5cf6', title: 'Fuentes Tipográficas', subtitle: 'Personalidad en las letras', body: '- `font-family`: Tipo de letra (Roboto, Arial, sans-serif).\n- `font-size`: Tamaño del texto (`16px`, `1.2rem`).' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la propiedad que define la fuente tipográfica.', code: 'body {\n  [[font-family]]: "Inter", sans-serif;\n  [[font-size]]: 16px;\n}', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Cuál es la unidad recomendada para la accesibilidad en font-size en vez de px?', options: ['rem', 'cm', 'in', 'pt'], correct: 0 },
              { id: 'ex3', type: 'word-bank', instruction: 'Establece el tamaño del título en 2rem', filename: 'style.css', parts: ['h1 {\n  ', '___', ': 2rem;\n}'], words: ['font-size', 'font-family', 'text-size', 'size'], answers: ['font-size'] },
              { id: 'ex4', type: 'categorize', instruction: 'Clasifica la propiedad tipográfica', categories: [{id: 'ff', title: 'font-family (Familia)', color: '#3b82f6'}, {id: 'fs', title: 'font-size (Tamaño)', color: '#ec4899'}], items: [{text: '"Arial", sans-serif', category: 'ff'}, {text: '1.5rem', category: 'fs'}, {text: '24px', category: 'fs'}, {text: '"Roboto", serif', category: 'ff'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿Dónde está el error de sintaxis en font-size?', filename: 'style.css', lines: ['p {', '  font-size: 16;', '}'], errorLineIndex: 1, explanation: 'Recuerda especificar la unidad de medida (por ejemplo 16px o 1rem).' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena los estilos tipográficos básicos', items: ['font-size: 1rem;', 'font-family: sans-serif;', 'p {', '}'], correctOrder: ['p {', 'font-family: sans-serif;', 'font-size: 1rem;', '}'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Cambia el tamaño de fuente a 1.2rem.', startingCode: '  font-size: ', validationRegex: '^font-size:\\s*1\\.2rem;$', explanationIncorrect: 'Debe ser font-size: 1.2rem;' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles son propiedades válidas para modificar el texto en CSS?', options: ['font-family', 'font-size', 'font-weight', 'text-align'], correctAnswers: [0, 1, 2, 3] }
            ]
          },
          {
            roundNum: 2, label: 'Grosor y Alineación', xpReward: 18, coins: 14,
            theory: [
              { id: 't1', type: 'concept', icon: 'Bold', color: '#8b5cf6', title: 'font-weight y text-align', body: '- `font-weight`: Grosor del texto (`normal`, `bold`, `400`, `700`).\n- `text-align`: Alineación (`left`, `center`, `right`, `justify`).' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la propiedad que centra el texto en pantalla.', code: 'h1 {\n  [[text-align]]: [[center]];\n  [[font-weight]]: bold;\n}', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿A qué equivale numéricamente un font-weight: bold; estándar?', options: ['100', '400', '700', '900'], correct: 2 },
              { id: 'ex3', type: 'word-bank', instruction: 'Alinea el texto del título al centro', filename: 'style.css', parts: ['h1 {\n  ', '___', ': ', '___', ';\n}'], words: ['text-align', 'center', 'font-weight', 'bold'], answers: ['text-align', 'center'] },
              { id: 'ex4', type: 'categorize', instruction: 'Clasifica según el valor pertenezca a font-weight o text-align', categories: [{id: 'fw', title: 'font-weight', color: '#f59e0b'}, {id: 'ta', title: 'text-align', color: '#10b981'}], items: [{text: 'bold', category: 'fw'}, {text: 'center', category: 'ta'}, {text: '700', category: 'fw'}, {text: 'justify', category: 'ta'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea la propiedad está mal escrita?', filename: 'style.css', lines: ['h1 {', '  align-text: center;', '}'], errorLineIndex: 1, explanation: 'La propiedad correcta en CSS es text-align, no align-text.' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena la regla para texto centrado y en negrita', items: ['font-weight: bold;', 'text-align: center;', 'h2 {', '}'], correctOrder: ['h2 {', 'text-align: center;', 'font-weight: bold;', '}'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Haz que la fuente se muestre en negrita.', startingCode: '  font-weight: ', validationRegex: '^font-weight:\\s*bold;$', explanationIncorrect: 'Debe ser font-weight: bold;' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de los siguientes son valores válidos para text-align?', options: ['left', 'center', 'right', 'justify'], correctAnswers: [0, 1, 2, 3] }
            ]
          },
          {
            roundNum: 3, label: 'Interlineado y Mayúsculas', xpReward: 22, coins: 16,
            theory: [
              { id: 't1', type: 'concept', icon: 'AlignJustify', color: '#8b5cf6', title: 'line-height y text-transform', body: '- `line-height`: Separa las líneas de texto del párrafo.\n- `text-transform`: Convierte a `uppercase`, `lowercase` o `capitalize`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la propiedad que fuerza la conversión del texto a MAYÚSCULAS.', code: 'button {\n  [[text-transform]]: [[uppercase]];\n}', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Por qué es mejor usar text-transform: uppercase en CSS en vez de escribir en mayúsculas en el HTML?', options: ['Mantiene el contenido semántico limpio en HTML y controla la presentación visual en CSS', 'Para que la imagen cargue rápido', 'No hay diferencia', 'Porque el HTML no lo permite'], correct: 0 },
              { id: 'ex3', type: 'word-bank', instruction: 'Establece un interlineado de 1.6 en el párrafo', filename: 'style.css', parts: ['p {\n  ', '___', ': 1.6;\n}'], words: ['line-height', 'letter-spacing', 'font-size', 'margin'], answers: ['line-height'] },
              { id: 'ex4', type: 'categorize', instruction: 'Clasifica los valores de text-transform', categories: [{id: 'up', title: 'uppercase', color: '#ec4899'}, {id: 'cap', title: 'capitalize', color: '#3b82f6'}], items: [{text: 'TODO EN MAYÚSCULAS', category: 'up'}, {text: 'Primera Letra De Cada Palabra', category: 'cap'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿Dónde está el error de sintaxis?', filename: 'style.css', lines: ['p {', '  line-height: 1,6;', '}'], errorLineIndex: 1, explanation: 'En CSS los decimales utilizan punto en lugar de coma: line-height: 1.6;' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena las propiedades tipográficas avanzadas', items: ['text-transform: uppercase;', 'line-height: 1.5;', 'p {', '}'], correctOrder: ['p {', 'line-height: 1.5;', 'text-transform: uppercase;', '}'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Transforma el texto a mayúsculas.', startingCode: '  text-transform: ', validationRegex: '^text-transform:\\s*uppercase;$', explanationIncorrect: 'Debe ser text-transform: uppercase;' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de estos ajustes mejoran la legibilidad de párrafos largos?', options: ['Aumentar el line-height a 1.5 o 1.6', 'Usar un tamaño de fuente accesible (1rem)', 'Poner todo el texto en mayúsculas sostenidas', 'Limitar el ancho del contenedor de lectura'], correctAnswers: [0, 1, 3] }
            ]
          }
        ]
      },

      // ── LECCIÓN 5: Bordes, Sombras y Efectos ──────────────────────────────
      {
        id: 'css-1-5',
        title: 'Bordes, Sombras y Efectos',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Bordes y Esquinas', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Square', color: '#8b5cf6', title: 'Bordes y Redondeos', subtitle: 'Definiendo contornos', body: '- `border`: Grueso, estilo y color (`1px solid #ccc`).\n- `border-radius`: Redondea las esquinas (`8px`, `50%` para círculos).' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la propiedad que convierte una caja cuadrada en un círculo perfecto.', code: '.avatar {\n  width: 100px;\n  height: 100px;\n  [[border-radius]]: [[50%]];\n}', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Cuáles son las 3 partes requeridas del atajo de propiedad border?', options: ['ancho, estilo, color', 'fuente, tamaño, alineación', 'alto, sombra, opacidad', 'padding, margin, flex'], correct: 0 },
              { id: 'ex3', type: 'word-bank', instruction: 'Aplica un borde sólido de 2px en color azul', filename: 'style.css', parts: ['div {\n  ', '___', ': 2px ', '___', ' blue;\n}'], words: ['border', 'solid', 'dashed', 'radius'], answers: ['border', 'solid'] },
              { id: 'ex4', type: 'categorize', instruction: 'Clasifica los valores de border-style', categories: [{id: 'sol', title: 'Línea Continua', color: '#10b981'}, {id: 'dash', title: 'Línea Punteada', color: '#f59e0b'}], items: [{text: 'solid', category: 'sol'}, {text: 'dashed', category: 'dash'}, {text: 'dotted', category: 'dash'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea falta el estilo de borde (solid)?', filename: 'style.css', lines: ['button {', '  border: 2px red;', '}'], errorLineIndex: 1, explanation: 'Falta especificar el tipo de borde (por ejemplo: solid, dashed o dotted).' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena los valores del atajo border', items: ['#3b82f6;', 'solid', '2px'], correctOrder: ['2px', 'solid', '#3b82f6;'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Redondea los bordes del elemento con un radio de 8 píxeles.', startingCode: '  border-radius: ', validationRegex: '^border-radius:\\s*8px;$', explanationIncorrect: 'Debe ser border-radius: 8px;' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de los siguientes son estilos de borde válidos en CSS?', options: ['solid', 'dashed', 'dotted', 'double'], correctAnswers: [0, 1, 2, 3] }
            ]
          },
          {
            roundNum: 2, label: 'Sombras (box-shadow)', xpReward: 18, coins: 14,
            theory: [
              { id: 't1', type: 'concept', icon: 'Layers', color: '#8b5cf6', title: 'Profundidad con box-shadow', body: '`box-shadow` agrega sombras para dar sensación de elevación 3D.\nSintaxis: `box-shadow: X Y desfoque color;`' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la propiedad que otorga sombra y elevación a la tarjeta.', code: '.card {\n  [[box-shadow]]: 0 4px 10px rgba(0,0,0,0.1);\n}', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Para qué sirve el tercer valor numérico en box-shadow: 0 4px 10px black;?', options: ['Sombra en X', 'Sombra en Y', 'Radio de desfoque / difuminado (blur)', 'Color de fondo'], correct: 2 },
              { id: 'ex3', type: 'word-bank', instruction: 'Crea una sombra sutil para el contenedor', filename: 'style.css', parts: ['.card {\n  ', '___', ': 0 10px 20px rgba(0,0,0,0.15);\n}'], words: ['box-shadow', 'text-shadow', 'shadow', 'border-shadow'], answers: ['box-shadow'] },
              { id: 'ex4', type: 'categorize', instruction: '¿A qué elemento le aplicas la sombra?', categories: [{id: 'box', title: 'box-shadow (Contenedor)', color: '#3b82f6'}, {id: 'txt', title: 'text-shadow (Texto)', color: '#ec4899'}], items: [{text: 'Una tarjeta <div>', category: 'box'}, {text: 'Un botón de compra', category: 'box'}, {text: 'Un gran título <h1>', category: 'txt'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿Dónde está el error en la propiedad?', filename: 'style.css', lines: ['.btn {', '  card-shadow: 0 2px 4px #000;', '}'], errorLineIndex: 1, explanation: 'La propiedad correcta en CSS es box-shadow.' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena los parámetros de box-shadow', items: ['rgba(0,0,0,0.1);', '10px', '0 4px', 'box-shadow:'], correctOrder: ['box-shadow:', '0 4px', '10px', 'rgba(0,0,0,0.1);'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Escribe el nombre de la propiedad para agregar sombras de caja.', startingCode: '  box-', validationRegex: '^box-shadow:$', explanationIncorrect: 'Debe ser box-shadow:' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Qué efectos visuales aporta usar box-shadow?', options: ['Efecto de elevación o flotación sobre el fondo', 'Profundidad de interfaz moderna', 'Destacar tarjetas activas o en hover', 'Reconocer el código de barras'], correctAnswers: [0, 1, 2] }
            ]
          },
          {
            roundNum: 3, label: 'Transiciones e Interacción', xpReward: 22, coins: 16,
            theory: [
              { id: 't1', type: 'concept', icon: 'Zap', color: '#8b5cf6', title: 'Transiciones suaves (:hover)', body: 'Al pasar el cursor sobre un botón (`:hover`), la propiedad `transition: all 0.3s ease;` hace que el cambio de color o tamaño no sea brusco, sino una animación fluida.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la pseudoclase que detecta cuando el ratón está SOBRE el botón.', code: 'button[[:hover]] {\n  background-color: blue;\n}', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Para qué sirve la propiedad transition: all 0.3s ease;?', options: ['Hace que los cambios de estilo al pasar el cursor sean suaves y animados', 'Oculta el botón', 'Elimina el CSS', 'Descarga un gif'], correct: 0 },
              { id: 'ex3', type: 'word-bank', instruction: 'Aplica una transición suave de 0.2 segundos', filename: 'style.css', parts: ['button {\n  ', '___', ': all 0.2s ease;\n}'], words: ['transition', 'animation', 'transform', 'hover'], answers: ['transition'] },
              { id: 'ex4', type: 'categorize', instruction: 'Clasifica los estados', categories: [{id: 'norm', title: 'Estado Normal', color: '#3b82f6'}, {id: 'hov', title: 'Estado :hover (Cursor encima)', color: '#10b981'}], items: [{text: 'button { background: red; }', category: 'norm'}, {text: 'button:hover { background: darkred; }', category: 'hov'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿Dónde está el error de sintaxis en el hover?', filename: 'style.css', lines: ['button.hover {', '  background: blue;', '}'], errorLineIndex: 0, explanation: 'Las pseudoclases en CSS usan dos puntos (:) antes del nombre: button:hover.' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena la regla de transición en el elemento base', items: ['background: blue;', 'transition: background 0.3s;', 'button {', '}'], correctOrder: ['button {', 'background: blue;', 'transition: background 0.3s;', '}'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Añade la pseudoclase que detecta cuando el mouse pasa por encima.', startingCode: ':', validationRegex: '^:hover$', explanationIncorrect: 'Debe ser :hover' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Qué propiedades se pueden animar con transition?', options: ['background-color', 'opacity', 'transform', 'border-radius'], correctAnswers: [0, 1, 2, 3] }
            ]
          }
        ]
      },

      // ── LECCIÓN 6: Flexbox Fundamentos ────────────────────────────────────
      {
        id: 'css-1-6',
        title: 'Flexbox: El Ordenador',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'El Contenedor Padre', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'LayoutTemplate', color: '#8b5cf6', title: 'La Magia de Flexbox', subtitle: 'Alineación de elementos', body: 'Flexbox es un modelo de maquetado unidimensional. Permite distribuir espacio y alinear elementos dentro de un contenedor de forma dinámica.' },
              { id: 't2', type: 'concept', icon: 'Power', color: '#8b5cf6', title: 'display: flex', body: 'Para activar Flexbox, seleccionamos el contenedor **PADRE** y declaramos `display: flex;`. De inmediato, sus hijos se colocan en fila.', code: '.padre {\n  display: flex;\n}' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la propiedad que enciende Flexbox en el contenedor.', code: '.contenedor {\n  [[display]]: [[flex]];\n}', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿A quién debes aplicarle la declaración display: flex;?', options: ['Al contenedor PADRE que envuelve a los elementos', 'A cada elemento hijo individualmente', 'Al <body> siempre', 'Al archivo HTML'], correct: 0 },
              { id: 'ex3', type: 'word-bank', instruction: 'Activa Flexbox en la barra de navegación', filename: 'style.css', parts: ['nav {\n  ', '___', ': ', '___', ';\n}'], words: ['display', 'flex', 'block', 'grid'], answers: ['display', 'flex'] },
              { id: 'ex4', type: 'categorize', instruction: 'Clasifica el rol de los elementos en Flexbox', categories: [{id: 'padre', title: 'Contenedor Padre (display: flex)', color: '#3b82f6'}, {id: 'hijo', title: 'Elementos Hijos (Flex items)', color: '#10b981'}], items: [{text: 'Contiene las reglas de alineación', category: 'padre'}, {text: 'Se ordenan en fila o columna', category: 'hijo'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿En qué línea está mal escrita la propiedad?', filename: 'style.css', lines: ['.padre {', '  flex-display: true;', '}'], errorLineIndex: 1, explanation: 'La propiedad correcta para encender Flexbox es display: flex;.' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena la regla para encender Flexbox', items: ['display: flex;', '.box {', '}'], correctOrder: ['.box {', 'display: flex;', '}'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Activa el modelo Flexbox en este contenedor.', startingCode: '  display: ', validationRegex: '^display:\\s*flex;$', explanationIncorrect: 'Debe ser display: flex;' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Qué sucede inmediatamente al aplicar display: flex a un contenedor?', options: ['Los hijos directos se colocan en fila horizontal', 'Los hijos se convierten en elementos flex items', 'Se borra el texto del navegador', 'Se habilita la alineación con justify-content'], correctAnswers: [0, 1, 3] }
            ]
          },
          {
            roundNum: 2, label: 'Justificar y Alinear', xpReward: 18, coins: 14,
            theory: [
              { id: 't1', type: 'concept', icon: 'AlignHorizontalJustifyCenter', color: '#8b5cf6', title: 'Los dos ejes de Flexbox', body: '- `justify-content`: Alinea en el eje principal (horizontal por defecto).\n- `align-items`: Alinea en el eje cruzado (vertical por defecto).' },
              { id: 't2', type: 'code', icon: 'Code', color: '#8b5cf6', title: 'El Centrado Perfecto', body: 'Combinar ambos ejes con `center` logra el famoso centrado perfecto en CSS.', code: '.padre {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca la propiedad que centra los elementos HORIZONTALMENTE.', code: '.padre {\n  display: flex;\n  [[justify-content]]: [[center]];\n  [[align-items]]: center;\n}', correctIndex: 0 },
              { id: 'ex2', type: 'multiple-choice', question: '¿Qué propiedad de Flexbox controla la alineación VERTICAL por defecto?', options: ['justify-content', 'align-items', 'flex-direction', 'margin'], correct: 1 },
              { id: 'ex3', type: 'word-bank', instruction: 'Centra totalmente el contenido en ambos ejes', filename: 'style.css', parts: ['.hero {\n  display: flex;\n  justify-content: ', '___', ';\n  align-items: ', '___', ';\n}'], words: ['center', 'center', 'flex-start', 'flex-end'], answers: ['center', 'center'] },
              { id: 'ex4', type: 'categorize', instruction: 'Asigna la propiedad según su eje', categories: [{id: 'horiz', title: 'Eje Principal (justify-content)', color: '#3b82f6'}, {id: 'vert', title: 'Eje Cruzado (align-items)', color: '#ec4899'}], items: [{text: 'Alineación horizontal', category: 'horiz'}, {text: 'Alineación vertical', category: 'vert'}] },
              { id: 'ex5', type: 'code-error', instruction: '¿Dónde se confundieron los nombres de las propiedades?', filename: 'style.css', lines: ['.caja {', '  display: flex;', '  align-content: center;', '}'], errorLineIndex: 2, explanation: 'Para alinear los items en el eje cruzado la propiedad es align-items: center;.' },
              { id: 'ex6', type: 'drag-sort', prompt: 'Ordena el centrado total con Flexbox', items: ['align-items: center;', 'justify-content: center;', 'display: flex;', '.hero {'], correctOrder: ['.hero {', 'display: flex;', 'justify-content: center;', 'align-items: center;'] },
              { id: 'ex7', type: 'code-typing', instruction: 'Centra los elementos a lo largo del eje principal.', startingCode: '  justify-content: ', validationRegex: '^justify-content:\\s*center;$', explanationIncorrect: 'Debe ser justify-content: center;' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de los siguientes son valores válidos para justify-content?', options: ['flex-start', 'center', 'flex-end', 'space-between'], correctAnswers: [0, 1, 2, 3] }
            ]
          },
          {
            roundNum: 3, label: 'Espaciado y Brecha (gap)', xpReward: 22, coins: 16,
            theory: [
              { id: 't1', type: 'concept', icon: 'SplitSquareHorizontal', color: '#8b5cf6', title: 'space-between y gap', body: '- `justify-content: space-between`: Pega los extremos y reparte el espacio restante en medio.\n- `gap: 20px`: Añade un espacio constante entre todos los elementos sin márgenes raros.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-highlight', instruction: 'Toca el valor de justify-content que empuja los elementos hacia los extremos.', code: 'nav {\n  display: flex;\n  [[justify-content]]: [[space-between]];\n}', correctIndex: 0 },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la propiedad que crea un espacio exacto de 20px entre los ítems.', code: '.galeria {\n  display: flex;\n  [[gap]]: [[20px]];\n}', correctIndex: 0 },
              { id: 'ex3', type: 'multiple-choice', question: '¿Por qué la propiedad gap es superior a usar margin en los elementos hijos?', options: ['Porque gap solo añade espacio ENTRE los hijos y no en los bordes exteriores', 'Porque gap cambia los colores', 'Porque margin no funciona con flexbox', 'No hay diferencia'], correct: 0 },
              { id: 'ex4', type: 'word-bank', instruction: 'Añade una separación de 15px entre elementos flex', filename: 'style.css', parts: ['.row {\n  display: flex;\n  ', '___', ': 15px;\n}'], words: ['gap', 'spacing', 'padding', 'margin'], answers: ['gap'] },
              { id: 'ex5', type: 'categorize', instruction: 'Clasifica los tipos de espaciado', categories: [{id: 'space', title: 'Distribución (justify-content)', color: '#10b981'}, {id: 'gap', title: 'Separación fija (gap)', color: '#f59e0b'}], items: [{text: 'space-between', category: 'space'}, {text: 'gap: 24px', category: 'gap'}, {text: 'space-around', category: 'space'}] },
              { id: 'ex6', type: 'code-error', instruction: '¿En qué línea está mal aplicada la propiedad gap?', filename: 'style.css', lines: ['.box {', '  flex-gap: 20px;', '}'], errorLineIndex: 1, explanation: 'La propiedad se llama simplemente gap: 20px;.' },
              { id: 'ex7', type: 'code-typing', instruction: 'Añade una separación de 20 píxeles entre los elementos de la caja flexible.', startingCode: '  gap: ', validationRegex: '^gap:\\s*20px;$', explanationIncorrect: 'Debe ser gap: 20px;' },
              { id: 'ex8', type: 'multi-select', prompt: '¿Cuáles de estos valores de justify-content distribuyen espacio automáticamente?', options: ['space-between', 'space-around', 'space-evenly', 'center'], correctAnswers: [0, 1, 2] }
            ]
          }
        ]
      },

      // ── DESAFÍO FINAL CSS ─────────────────────────────────────────────────
      {
        id: 'css-chal-final',
        type: 'challenge',
        title: 'Desafío Final CSS',
        language: 'CSS',
        xpReward: 500,
        coins: 100,
        instruction: '¡Crea una barra de navegación profesional! El .nav debe ser flex (display: flex) con espacio entre elementos (justify-content: space-between) y centrado vertical (align-items: center). El .logo debe tener font-weight: bold.',
        startingCode: '.nav {\n  \n}\n\n.logo {\n  \n}',
        validators: [
          {
            description: 'El .nav debe incluir display: flex',
            test: (doc, code) => code.toLowerCase().includes('.nav') && code.toLowerCase().includes('display') && code.toLowerCase().includes('flex')
          },
          {
            description: 'El .nav debe incluir justify-content: space-between',
            test: (doc, code) => code.toLowerCase().includes('justify-content') && code.toLowerCase().includes('space-between')
          },
          {
            description: 'El .nav debe incluir align-items: center',
            test: (doc, code) => code.toLowerCase().includes('align-items') && code.toLowerCase().includes('center')
          },
          {
            description: 'El .logo debe incluir font-weight: bold (o 700)',
            test: (doc, code) => code.toLowerCase().includes('.logo') && code.toLowerCase().includes('font-weight')
          }
        ]
      }
    ]
  }
];
