// src/data/curriculum.js

export const curriculum = [
  {
    id: 'html-1',
    title: 'Principios de HTML',
    description: 'Aprende los fundamentos del lenguaje de marcado web',
    color: '#00d4ff',
    icon: '🌐',
    language: 'HTML',
    lessons: [
      {
        id: 'html-1-1',
        title: 'Estructura básica',
        type: 'multiple-choice',
        xpReward: 15,
        coins: 10,
        exercises: [
          {
            id: 'ex1',
            question: '¿Cuál es la etiqueta raíz de todo documento HTML?',
            options: ['<body>', '<html>', '<head>', '<root>'],
            correct: 1,
          },
          {
            id: 'ex2',
            question: '¿Dónde se coloca el contenido visible de una página web?',
            options: ['<head>', '<meta>', '<body>', '<title>'],
            correct: 2,
          },
          {
            id: 'ex3',
            question: '¿Qué etiqueta define el título de la pestaña del navegador?',
            options: ['<header>', '<h1>', '<title>', '<name>'],
            correct: 2,
          },
          {
            id: 'ex4',
            question: '¿Cuál es la declaración correcta al inicio de un HTML5?',
            options: ['<!HTML>', '<!DOCTYPE html>', '<html5>', '<?xml version="1.0">'],
            correct: 1,
          },
        ],
      },
      {
        id: 'html-1-2',
        title: 'Etiquetas de texto',
        type: 'code-fill',
        xpReward: 15,
        coins: 10,
        exercises: [
          {
            id: 'ex1',
            instruction: 'Completa las etiquetas de cierre correctas',
            codeLines: [
              { text: '<!DOCTYPE html>', type: 'code' },
              { text: '<html>', type: 'code' },
              { text: '  <head>', type: 'code' },
              { text: '    <title>Mi página</title>', type: 'code' },
              { text: '  </head>', type: 'code' },
              { text: '  <body>', type: 'code' },
              { text: '    <h1>Hola Mundo!</h1>', type: 'code' },
              { text: '    <p>Mi primer párrafo', type: 'code' },
              { text: '    ', type: 'blank', answer: '</p>', blankId: 0 },
              { text: '  ', type: 'blank', answer: '</body>', blankId: 1 },
              { text: '', type: 'blank', answer: '</html>', blankId: 2 },
            ],
            options: ['</html>', '</div>', '</body>', '</h1>', '</p>', '</head>'],
            answers: ['</p>', '</body>', '</html>'],
          },
          {
            id: 'ex2',
            instruction: 'Completa el código para crear un enlace',
            codeLines: [
              { text: '<a ', type: 'code' },
              { text: '', type: 'blank', answer: 'href', blankId: 0 },
              { text: '="https://google.com">', type: 'code' },
              { text: '  Ir a Google', type: 'code' },
              { text: '', type: 'blank', answer: '</a>', blankId: 1 },
            ],
            options: ['href', 'src', '</a>', '</div>', 'link', 'url'],
            answers: ['href', '</a>'],
          },
        ],
      },
      {
        id: 'html-1-3',
        title: 'Listas y enlaces',
        type: 'multiple-choice',
        xpReward: 15,
        coins: 10,
        exercises: [
          {
            id: 'ex1',
            question: '¿Qué etiqueta crea una lista ordenada (1, 2, 3...)?',
            options: ['<ul>', '<li>', '<ol>', '<list>'],
            correct: 2,
          },
          {
            id: 'ex2',
            question: '¿Qué etiqueta representa un elemento dentro de una lista?',
            options: ['<item>', '<li>', '<ul>', '<dt>'],
            correct: 1,
          },
          {
            id: 'ex3',
            question: '¿Cuál atributo define la URL destino de un enlace <a>?',
            options: ['src', 'link', 'href', 'url'],
            correct: 2,
          },
          {
            id: 'ex4',
            question: 'Para abrir un enlace en una pestaña nueva, usamos:',
            options: ['target="_new"', 'target="_blank"', 'open="tab"', 'new-tab="true"'],
            correct: 1,
          },
        ],
      },
      {
        id: 'html-1-4',
        title: 'Imágenes y formularios',
        type: 'code-fill',
        xpReward: 15,
        coins: 10,
        exercises: [
          {
            id: 'ex1',
            instruction: 'Completa la etiqueta de imagen correctamente',
            codeLines: [
              { text: '<img ', type: 'code' },
              { text: '', type: 'blank', answer: 'src', blankId: 0 },
              { text: '="foto.jpg"', type: 'code' },
              { text: ' ', type: 'code' },
              { text: '', type: 'blank', answer: 'alt', blankId: 1 },
              { text: '="Mi foto"', type: 'code' },
              { text: ' ', type: 'code' },
              { text: '', type: 'blank', answer: '/>', blankId: 2 },
            ],
            options: ['src', 'href', 'alt', 'text', '/>', '</img>'],
            answers: ['src', 'alt', '/>'],
          },
          {
            id: 'ex2',
            instruction: 'Completa el formulario básico',
            codeLines: [
              { text: '<form ', type: 'code' },
              { text: '', type: 'blank', answer: 'action', blankId: 0 },
              { text: '="/enviar">', type: 'code' },
              { text: '  <input type="text" ', type: 'code' },
              { text: '', type: 'blank', answer: 'name', blankId: 1 },
              { text: '="usuario">', type: 'code' },
              { text: '  <button type="', type: 'code' },
              { text: '', type: 'blank', answer: 'submit', blankId: 2 },
              { text: '">Enviar</button>', type: 'code' },
              { text: '</form>', type: 'code' },
            ],
            options: ['action', 'method', 'name', 'id', 'submit', 'send'],
            answers: ['action', 'name', 'submit'],
          },
        ],
      },
      {
        id: 'html-1-5',
        title: 'Semántica HTML5',
        type: 'multiple-choice',
        xpReward: 20,
        coins: 15,
        exercises: [
          {
            id: 'ex1',
            question: '¿Qué etiqueta semántica representa la cabecera de la página?',
            options: ['<top>', '<head>', '<header>', '<nav>'],
            correct: 2,
          },
          {
            id: 'ex2',
            question: '¿Cuál etiqueta define la barra de navegación?',
            options: ['<menu>', '<nav>', '<links>', '<navigation>'],
            correct: 1,
          },
          {
            id: 'ex3',
            question: '¿Qué etiqueta marca el contenido principal de la página?',
            options: ['<content>', '<section>', '<main>', '<article>'],
            correct: 2,
          },
          {
            id: 'ex4',
            question: '¿Cuál etiqueta representa el pie de página?',
            options: ['<bottom>', '<footer>', '<end>', '<base>'],
            correct: 1,
          },
          {
            id: 'ex5',
            question: 'El elemento <article> es ideal para:',
            options: [
              'Menús de navegación',
              'Contenido independiente y reutilizable',
              'El pie de página',
              'Imágenes decorativas',
            ],
            correct: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'css-1',
    title: 'CSS Esencial',
    description: 'Dale estilo y vida a tus páginas web',
    color: '#9b59b6',
    icon: '🎨',
    language: 'CSS',
    lessons: [
      {
        id: 'css-1-1',
        title: 'Selectores y propiedades',
        type: 'multiple-choice',
        xpReward: 15,
        coins: 10,
        exercises: [
          {
            id: 'ex1',
            question: '¿Cómo seleccionamos todos los elementos <p> en CSS?',
            options: ['.p', '#p', 'p', 'element(p)'],
            correct: 2,
          },
          {
            id: 'ex2',
            question: '¿Cómo seleccionamos un elemento con clase "titulo"?',
            options: ['#titulo', '.titulo', 'titulo', '*titulo'],
            correct: 1,
          },
          {
            id: 'ex3',
            question: '¿Cómo seleccionamos un elemento con id "header"?',
            options: ['.header', '#header', 'header', '@header'],
            correct: 1,
          },
          {
            id: 'ex4',
            question: '¿Qué propiedad cambia el color del texto?',
            options: ['text-color', 'font-color', 'color', 'foreground'],
            correct: 2,
          },
        ],
      },
      {
        id: 'css-1-2',
        title: 'Modelo de caja',
        type: 'code-fill',
        xpReward: 15,
        coins: 10,
        exercises: [
          {
            id: 'ex1',
            instruction: 'Completa el modelo de caja CSS',
            codeLines: [
              { text: '.caja {', type: 'code' },
              { text: '  width: 200px;', type: 'code' },
              { text: '  height: 100px;', type: 'code' },
              { text: '  ', type: 'blank', answer: 'padding', blankId: 0 },
              { text: ': 16px;', type: 'code' },
              { text: '  ', type: 'blank', answer: 'margin', blankId: 1 },
              { text: ': auto;', type: 'code' },
              { text: '  ', type: 'blank', answer: 'border', blankId: 2 },
              { text: ': 2px solid black;', type: 'code' },
              { text: '}', type: 'code' },
            ],
            options: ['padding', 'spacing', 'margin', 'gap', 'border', 'outline'],
            answers: ['padding', 'margin', 'border'],
          },
        ],
      },
      {
        id: 'css-1-3',
        title: 'Flexbox',
        type: 'multiple-choice',
        xpReward: 15,
        coins: 10,
        exercises: [
          {
            id: 'ex1',
            question: '¿Cómo activas Flexbox en un contenedor?',
            options: ['display: flex-box', 'display: flex', 'flex: true', 'layout: flex'],
            correct: 1,
          },
          {
            id: 'ex2',
            question: '¿Qué propiedad centra elementos horizontalmente en flex?',
            options: ['align-items', 'justify-content', 'text-align', 'flex-center'],
            correct: 1,
          },
          {
            id: 'ex3',
            question: 'Para apilar elementos en columna en flex, usamos:',
            options: [
              'flex-direction: row',
              'flex-direction: column',
              'flex-wrap: column',
              'display: column',
            ],
            correct: 1,
          },
        ],
      },
      {
        id: 'css-1-4',
        title: 'Grid Layout',
        type: 'code-fill',
        xpReward: 15,
        coins: 10,
        exercises: [
          {
            id: 'ex1',
            instruction: 'Completa el CSS para crear un grid de 3 columnas',
            codeLines: [
              { text: '.contenedor {', type: 'code' },
              { text: '  display: ', type: 'blank', answer: 'grid', blankId: 0 },
              { text: ';', type: 'code' },
              { text: '  grid-template-', type: 'blank', answer: 'columns', blankId: 1 },
              { text: ': 1fr 1fr 1fr;', type: 'code' },
              { text: '  ', type: 'blank', answer: 'gap', blankId: 2 },
              { text: ': 20px;', type: 'code' },
              { text: '}', type: 'code' },
            ],
            options: ['grid', 'flex', 'columns', 'rows', 'gap', 'spacing'],
            answers: ['grid', 'columns', 'gap'],
          },
        ],
      },
      {
        id: 'css-1-5',
        title: 'Responsive Design',
        type: 'multiple-choice',
        xpReward: 20,
        coins: 15,
        exercises: [
          {
            id: 'ex1',
            question: '¿Qué regla CSS permite aplicar estilos según el tamaño de pantalla?',
            options: ['@screen', '@media', '@responsive', '@breakpoint'],
            correct: 1,
          },
          {
            id: 'ex2',
            question: 'La unidad "vw" representa:',
            options: [
              'Vertical width',
              'Viewport width (% del ancho de pantalla)',
              'Variable width',
              'Visible width',
            ],
            correct: 1,
          },
          {
            id: 'ex3',
            question: 'El meta tag esencial para el diseño responsive es:',
            options: [
              '<meta name="screen" content="mobile">',
              '<meta name="viewport" content="width=device-width">',
              '<meta name="responsive" content="true">',
              '<meta name="mobile" content="yes">',
            ],
            correct: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'js-1',
    title: 'JavaScript Básico',
    description: 'Próximamente — ¡Haz que tu web cobre vida!',
    color: '#f39c12',
    icon: '⚡',
    language: 'JS',
    locked: true,
    lessons: [],
  },
];

export const getLessonById = (lessonId) => {
  for (const module of curriculum) {
    const lesson = module.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, module };
  }
  return null;
};

export const getModuleProgress = (moduleId, progress) => {
  const module = curriculum.find((m) => m.id === moduleId);
  if (!module || module.lessons.length === 0) return 0;
  const completed = module.lessons.filter((l) => progress[l.id]?.completed).length;
  return Math.round((completed / module.lessons.length) * 100);
};
